import { NextRequest, NextResponse } from "next/server";
 
const locales = ['en', 'de']
 
// Get the preferred locale, similar to the above or using a library
function getLocale(request : NextRequest) { 
    const langHeader = request.headers.get('accept-language');

    const firstLanguage = langHeader?.split(',')[0]?.split('-')[0] || '';

    if (locales.includes(firstLanguage)) {
      return firstLanguage;
    }

    return 'en';
 }
 
export function middleware(request : NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
 
  if (pathnameHasLocale) return
 
  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}
 
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}