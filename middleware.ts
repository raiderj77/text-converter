import { NextRequest, NextResponse } from 'next/server'
import { NOINDEX_SLUGS } from '@/lib/noindex-slugs'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const blogMatch = pathname.match(/^\/blog\/([^/]+)\/?$/)
  if (blogMatch) {
    const slug = blogMatch[1]
    if (NOINDEX_SLUGS.has(slug)) {
      return new Response(null, { status: 410 })
    }
  }

  const response = NextResponse.next()
  const gpc = request.headers.get('sec-gpc') === '1'
  if (gpc) {
    // empire_gpc cookie is readable by the client-side consent banner.
    // httpOnly: false is intentional — the consent banner JS must read this value.
    response.cookies.set('empire_gpc', '1', {
      httpOnly: false,
      sameSite: 'lax',
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
    })
  }
  return response
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}
