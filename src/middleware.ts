import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * The middleware function checks for a token in the request cookies and redirects to the login page if
 * not authenticated, or to the tasks page if authenticated, based on the URL path.
 * @param {NextRequest} request - The `request` parameter in the `middleware` function is an object
 * that represents the incoming request to the server. It contains information about the request, such
 * as headers, cookies, URL, and other request details. In this specific code snippet, the `request`
 * parameter is of type `NextRequest
 * @returns The `middleware` function is returning a `NextResponse` object with a redirect to either
 * '/login' or '/tasks' based on the conditions checked. If the user is not authenticated and not on
 * the login page, it redirects to the login page. If the user is authenticated and on the login page,
 * it redirects to the tasks page. If none of these conditions are met, it returns `
 */
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const isAuthPage = request.nextUrl.pathname.startsWith('/login');

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/tasks', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/tasks/:path*']
};