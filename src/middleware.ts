// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/webhooks")) {
    return NextResponse.next()
  }
}

export const config = {
  matcher: ["/((?!api/webhooks|_next/static|_next/image|favicon.ico).*)"],
}
