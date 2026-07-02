import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { logger } from '@/lib/logger'
import { getAuthenticatedUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const authUser = await getAuthenticatedUser(request)

  if (!authUser) {
    logger.warn('Unauthorized sync attempt')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: any = {}
  try {
    body = await request.json()
  } catch (error) {
    // Body is optional
  }

  try {
    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { externalAuthId: authUser.externalAuthId },
      include: { preferences: true },
    })

    if (!user) {
      logger.info({ externalAuthId: authUser.externalAuthId }, 'First login: Creating user, default tenant and Owner role')

      // Perform user and default workspace creation in a transaction
      user = await prisma.$transaction(async (tx: any) => {
        const newUser = await tx.user.create({
          data: {
            externalAuthId: authUser.externalAuthId,
            email: authUser.email,
            name: authUser.name,
            avatarUrl: authUser.avatarUrl,
            phone: body.phone,
            timezone: body.timezone,
            language: body.language || 'en',
            lastLoginAt: new Date(),
          },
        })

        // Generate tenant slug
        const rawSlug = authUser.name || authUser.email.split('@')[0]
        const cleanSlug = rawSlug
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '')
        const tenantSlug = `${cleanSlug || 'workspace'}-${Math.random().toString(36).substring(2, 7)}`

        const newTenant = await tx.tenant.create({
          data: {
            name: `${authUser.name || authUser.email.split('@')[0]}'s Workspace`,
            slug: tenantSlug,
            createdById: newUser.id,
          },
        })

        const ownerRole = await tx.role.create({
          data: {
            tenantId: newTenant.id,
            code: 'owner',
            name: 'Owner',
            description: 'Workspace owner with full access',
          },
        })

        await tx.tenantMember.create({
          data: {
            tenantId: newTenant.id,
            userId: newUser.id,
            roleId: ownerRole.id,
            isActive: true,
          },
        })

        const preferences = await tx.userPreference.create({
          data: {
            userId: newUser.id,
            currentTenantId: newTenant.id,
            theme: body.theme || 'system',
            locale: body.locale || 'en',
          },
        })

        return {
          ...newUser,
          preferences,
        }
      })
    } else {
      logger.info({ userId: user.id }, 'Subsequent login: Updating profile info')

      // Update existing user details
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          email: authUser.email,
          name: authUser.name ?? user.name,
          avatarUrl: authUser.avatarUrl ?? user.avatarUrl,
          phone: body.phone ?? user.phone,
          timezone: body.timezone ?? user.timezone,
          language: body.language ?? user.language,
          lastLoginAt: new Date(),
        },
        include: { preferences: true },
      })
    }

    return NextResponse.json({ user })
  } catch (error) {
    logger.error({ error }, 'Failed to sync user')
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
