import createMiddleware from 'next-intl/middleware';
import { locales } from './lib/i18n';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: 'en',

  // Locale detection optimized for serverless environments
  localeDetection: true,

  // Enable locale prefix for all paths
  localePrefix: 'always',
});

export default async function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ar|en|id|ms|th|vi|tl|my|km|lo)', '/(ar|en|id|ms|th|vi|tl|my|km|lo)/:path*']
};
