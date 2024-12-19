import { NextResponse } from 'next/server';

export default function middleware(req) {
  const res = NextResponse.next();

  // Add security headers
  res.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-DNS-Prefetch-Control', 'on');
  res.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );

  // Add CORS header to allow specific origin
  const origin = req.headers.get('origin');
  const allowedOrigins = ['https://supercharger-site-b5d0440033ddb070d8c44.webflow.io'];

  if (origin && allowedOrigins.includes(origin)) {
    res.headers.set('Access-Control-Allow-Origin', origin);
  }

  // Add CORS headers for preflight requests
  if (req.method === 'OPTIONS') {
    res.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    res.headers.set('Access-Control-Max-Age', '86400');
    return res;
  }

  return res;
}
