import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { logger } from '@/lib/logger'
import { getAuthenticatedUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const authUser = await getAuthenticatedUser(request)

  if (!authUser) {
    logger.warn('Unauthorized attempt to switch tenant')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { tenantId } = await request.json()
    if (!tenantId) {
      return NextResponse.json({ error: 'Tenant ID is required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { externalAuthId: authUser.externalAuthId },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not synced' }, { status: 404 })
    }

    // Verify membership
    const membership = await prisma.tenantMember.findUnique({
      where: {
        tenantId_userId: {
          tenantId,
          userId: user.id,
        },
      },
    })

    if (!membership || !membership.isActive) {
      logger.warn({ userId: user.id, tenantId }, 'User attempted to switch to non-member/inactive tenant')
      return NextResponse.json(
        { error: 'Forbidden: You do not have access to this workspace' },
        { status: 403 }
      )
    }

    // Update the preference
    const preferences = await prisma.userPreference.update({
      where: { userId: user.id },
      data: { currentTenantId: tenantId },
    })

    logger.info({ userId: user.id, tenantId }, 'Successfully switched active tenant')
    return NextResponse.json({ success: true, preferences })
  } catch (error) {
    logger.error({ error }, 'Failed to switch tenant')
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
