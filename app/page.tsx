"use client";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black">
      <main className="flex flex-col items-center gap-6 p-10 bg-white dark:bg-zinc-900 shadow-2xl rounded-3xl border border-zinc-200 dark:border-zinc-800">
        
        {session ? (
          <div className="flex flex-col items-center text-center gap-4">
            {session.user?.image && (
              <Image 
                src={session.user.image} 
                alt="Profile" 
                width={90} 
                height={90} 
                className="rounded-full border-4 border-blue-500 shadow-sm"
              />
            )}
            
            <div className="space-y-1">
              <h1 className="text-xl font-medium text-zinc-500 dark:text-zinc-400">Welcome!</h1>
              <p className="text-2xl font-bold text-black dark:text-white">
                Logged in as: <span className="text-blue-600">{session.user?.name}</span>
              </p>
            </div>

            <button
              onClick={() => signOut()}
              className="mt-4 px-8 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600 transition-all font-semibold"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-3xl font-black tracking-tight">CS391 OAuth</h1>
            <button
              onClick={() => signIn("github")}
              className="px-8 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold hover:opacity-80 transition-opacity"
            >
              Sign in with GitHub
            </button>
          </div>
        )}
      </main>
    </div>
  );
}