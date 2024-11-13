import { withAuth, getSignInUrl, getSignUpUrl } from '@workos-inc/authkit-nextjs';
import Link from 'next/link';

export default async function ProtectedPage() {
  const { user } = await withAuth();
  const signInUrl = await getSignInUrl();
  const signUpUrl = await getSignUpUrl();
    
  if (!user) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center gap-4 p-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="mb-4">Please sign in to view this page</p>
        <div className="flex gap-4">
          <Link 
            href={signInUrl}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Sign in
          </Link>
          <Link 
            href={signUpUrl}
            className="bg-white hover:bg-gray-100 text-gray-900 font-semibold py-2 px-6 rounded-lg border border-gray-300 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </main>
    );
  }
  
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 dark:text-zinc-200">Protected Page</h1>
      <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg overflow-auto">
        <pre className="dark:text-zinc-200">{JSON.stringify(user, null, 2)}</pre>
      </div>
    </main>
  );
}