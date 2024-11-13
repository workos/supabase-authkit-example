import { getSignInUrl, getSignUpUrl } from '@workos-inc/authkit-nextjs';
import Link from 'next/link';

export default async function HeaderAuth() {
  const signInUrl = await getSignInUrl();
  const signUpUrl = await getSignUpUrl();

  return (
    <div className="flex items-center gap-4">
      <Link
        href={signInUrl}
        className="hover:underline"
      >
        Sign in
      </Link>
      <Link
        href={signUpUrl}
        className="hover:underline"
      >
        Sign up
      </Link>
    </div>
  );
}
