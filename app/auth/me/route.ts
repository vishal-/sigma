import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { logger } from '@/lib/logger'
import { getAuthenticatedUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const authUser = await getAuthenticatedUser(request)

  if (!authUser) {
    logger.warn('Unauthorized attempt to fetch profile')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { externalAuthId: authUser.externalAuthId },
      include: {
        preferences: true,
        memberships: {
          where: { isActive: true },
          include: {
            tenant: true,
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    if (!user) {
      logger.warn({ externalAuthId: authUser.externalAuthId }, 'Authenticated user not found in application database')
      return NextResponse.json({ error: 'User Not Synced' }, { status: 404 })
    }

    // Determine current/active workspace
    const currentTenantId = user.preferences?.currentTenantId
    let activeMembership = user.memberships.find((m: any) => m.tenantId === currentTenantId)

    // Fallback if current tenant is not set or user is no longer a member
    if (!activeMembership && user.memberships.length > 0) {
      activeMembership = user.memberships[0]
      
      // Update user preference silently to keep it synced
      await prisma.userPreference.update({
        where: { userId: user.id },
        data: { currentTenantId: activeMembership.tenantId },
      })
    }

    const permissions = activeMembership
      ? activeMembership.role.permissions.map((rp: any) => rp.permission.code)
      : []

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
        phone: user.phone,
        timezone: user.timezone,
        language: user.language,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLoginAt: user.lastLoginAt,
      },
      preferences: user.preferences,
      currentTenant: activeMembership ? activeMembership.tenant : null,
      role: activeMembership
        ? {
            id: activeMembership.role.id,
            code: activeMembership.role.code,
            name: activeMembership.role.name,
            description: activeMembership.role.description,
          }
        : null,
      permissions,
    })
  } catch (error) {
    logger.error({ error }, 'Failed to fetch user profile')
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
