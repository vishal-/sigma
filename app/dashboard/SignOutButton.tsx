"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
            router.refresh();
          }
        }
      });
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 hover:text-white text-zinc-300 border border-zinc-800 hover:border-zinc-700 font-semibold text-sm transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group active:scale-[0.98]"
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4 text-zinc-300" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        <FaSignOutAlt className="text-zinc-400 group-hover:text-red-400 transition-colors duration-200" />
      )}
      <span>Sign Out</span>
    </button>
  );
}
