import Link from 'next/link';
import {
  getSignInUrl,
  getSignUpUrl,
  withAuth,
  signOut,
} from '@workos-inc/authkit-nextjs';

export default async function HomePage() {
  const { user } = await withAuth();
  const signInUrl = await getSignInUrl();
  const signUpUrl = await getSignUpUrl();

  if (!user) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center gap-4 p-8 max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4">Welcome</h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-600">to Supabase + WorkOS Authkit!</h2>
        <p className="text-gray-600 mb-8">Log in to view your Supabase records</p>
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

  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data } = await supabase.from('messages').select('*');

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 max-w-md mx-auto">
      <p className="text-xl mb-4 dark:text-zinc-200">
        Welcome back{user.firstName && `, ${user.firstName}`}
      </p>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2 dark:text-zinc-200">Messages from Supabase:</h3>
        <pre className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg overflow-auto dark:text-zinc-200">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Sign out
        </button>
      </form>
    </main>
  );
}
