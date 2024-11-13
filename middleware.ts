import { authkitMiddleware } from '@workos-inc/authkit-nextjs';

export default authkitMiddleware();

// Match against root path and protected pages
export const config = {
  matcher: ['/', '/protected/:path*']
};
