import { jwtVerify, createRemoteJWKSet } from 'jose'
import { NextRequest } from 'next/server'
import { logger } from '@/lib/logger'

const jwksUrl = process.env.NEON_AUTH_JWKS_URL

let jwksSet: any = null

if (jwksUrl) {
  try {
    jwksSet = createRemoteJWKSet(new URL(jwksUrl))
  } catch (error) {
    logger.error({ error }, 'Failed to initialize remote JWKS Set')
  }
}

export interface AuthUser {
  externalAuthId: string
  email: string
  name?: string
  avatarUrl?: string
}

export async function getAuthenticatedUser(request: NextRequest): Promise<AuthUser | null> {
  // Development mock fallback
  if (process.env.NODE_ENV === 'development' && process.env.MOCK_AUTH === 'true') {
    const mockId = request.headers.get('x-mock-user-id') || 'mock_user_123'
    const mockEmail = request.headers.get('x-mock-user-email') || 'mock@example.com'
    const mockName = request.headers.get('x-mock-user-name') || 'Mock User'
    const mockAvatar = request.headers.get('x-mock-user-avatar') || undefined
    return {
      externalAuthId: mockId,
      email: mockEmail,
      name: mockName,
      avatarUrl: mockAvatar,
    }
  }

  // 1. Get token from Authorization header
  let token = ''
  const authHeader = request.headers.get('Authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7)
  }

  // 2. Get token from cookies if not in header
  if (!token) {
    const cookieToken = request.cookies.get('__Secure-neonauth.session_token') || 
                        request.cookies.get('neonauth.session_token') ||
                        request.cookies.get('id_token') ||
                        request.cookies.get('access_token')
    if (cookieToken) {
      token = cookieToken.value
    }
  }

  if (!token) {
    logger.warn('No token found in request headers or cookies')
    return null
  }

  if (!jwksSet) {
    logger.error('JWKS URL not configured or invalid')
    return null
  }

  try {
    const { payload } = await jwtVerify(token, jwksSet)
    
    const externalAuthId = payload.sub
    const email = payload.email as string
    const name = payload.name as string | undefined
    const avatarUrl = (payload.picture || payload.avatar) as string | undefined

    if (!externalAuthId || !email) {
      logger.warn({ payload }, 'JWT missing required claims (sub, email)')
      return null
    }

    return {
      externalAuthId,
      email,
      name,
      avatarUrl,
    }
  } catch (error) {
    logger.error({ error }, 'JWT verification failed')
    return null
  }
}
