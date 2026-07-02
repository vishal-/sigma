import { NextRequest, NextResponse } from 'next/server'
import { logger } from '@/lib/logger'
import { getAuthenticatedUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const authUser = await getAuthenticatedUser(request)

  if (authUser) {
    logger.info({ email: authUser.email, externalAuthId: authUser.externalAuthId }, 'User logged out from application session')
  } else {
    logger.info('An unauthenticated user triggered logout (cleanup)')
  }

  // Neon Auth handles session cookie deletion on client/auth server,
  // this endpoint provides a hook for any app-specific server-side cleanup.
  return NextResponse.json({ success: true })
}
