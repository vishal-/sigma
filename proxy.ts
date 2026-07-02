import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
    : []

  const origin = request.headers.get('origin')

  // Create response
  const response = NextResponse.next()

  // Verify origin is allowed
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  } else if (process.env.NODE_ENV === 'development' && origin) {
    // Fallback for development to allow local frontend apps
    if (origin.startsWith('http://localhost:') || origin.startsWith('https://localhost:')) {
      response.headers.set('Access-Control-Allow-Origin', origin)
    }
  }

  // Set general CORS headers
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie, x-mock-user-id, x-mock-user-email, x-mock-user-name, x-mock-user-avatar')

  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: response.headers,
    })
  }

  return response
}

export const config = {
  matcher: ['/check', '/auth/:path*'],
}
