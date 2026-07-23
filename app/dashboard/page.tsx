import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import SignOutButton from "./SignOutButton";
import { FaUser, FaEnvelope, FaShieldAlt, FaCalendarAlt } from "react-icons/fa";

export default async function DashboardPage() {
  // Fetch session server-side
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect to login if not authenticated
  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  // Get user initials for avatar fallback
  const getInitials = (name?: string | null) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-50 font-sans overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(120,119,198,0.12),rgba(255,255,255,0))]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        {/* Header bar */}
        <header className="flex items-center justify-between pb-8 mb-12 border-b border-zinc-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/10">
              <span className="text-lg font-bold">Σ</span>
            </div>
            <div>
              <span className="font-bold text-lg text-white">Sigma</span>
              <span className="text-zinc-500 text-xs ml-1.5 uppercase tracking-wider font-semibold">Console</span>
            </div>
          </div>
          <SignOutButton />
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column - User Profile Card */}
          <div className="md:col-span-1 flex flex-col items-center p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xl h-fit">
            <div className="relative w-24 h-24 mb-4 group">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User avatar"}
                  fill
                  className="rounded-full object-cover border-2 border-zinc-800 group-hover:border-zinc-700 transition-colors"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 flex items-center justify-center border-2 border-zinc-800 text-2xl font-bold text-zinc-300">
                  {getInitials(user.name)}
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-4.5 h-4.5 bg-green-500 border-2 border-zinc-900 rounded-full" />
            </div>

            <h2 className="text-xl font-bold text-white text-center truncate max-w-full">
              {user.name || "Anonymous User"}
            </h2>
            <p className="text-zinc-500 text-xs mt-1 truncate max-w-full">
              {user.email}
            </p>

            <div className="mt-6 w-full pt-6 border-t border-zinc-800/80 flex flex-col gap-3.5 text-xs">
              <div className="flex items-center justify-between text-zinc-400">
                <span>Account Status</span>
                <span className="text-green-400 font-semibold px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Auth Provider</span>
                <span className="text-zinc-200 capitalize font-medium">
                  {session.session.id ? "OAuth" : "Unknown"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Account Info Details */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Profile Info Details Card */}
            <div className="p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <FaUser className="text-purple-500 text-sm" />
                Profile Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1.5">
                    User Identifier (UUID)
                  </label>
                  <div className="font-mono text-zinc-300 text-xs bg-zinc-950 p-2.5 rounded-lg border border-zinc-850 select-all overflow-x-auto whitespace-nowrap">
                    {user.id}
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="flex items-center gap-2 text-zinc-200 text-sm bg-zinc-950 p-2.5 rounded-lg border border-zinc-850">
                    <FaEnvelope className="text-zinc-600 text-xs" />
                    <span className="truncate">{user.email}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1.5">
                    Display Name
                  </label>
                  <div className="flex items-center gap-2 text-zinc-200 text-sm bg-zinc-950 p-2.5 rounded-lg border border-zinc-850">
                    <FaUser className="text-zinc-600 text-xs" />
                    <span>{user.name || "Not set"}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1.5">
                    Email Verification Status
                  </label>
                  <div className="flex items-center gap-2 text-zinc-200 text-sm bg-zinc-950 p-2.5 rounded-lg border border-zinc-850">
                    <FaShieldAlt className={user.emailVerified ? "text-green-500 text-xs" : "text-amber-500 text-xs"} />
                    <span>{user.emailVerified ? "Verified (Linked OAuth Account)" : "Unverified"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Session Info Card */}
            <div className="p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <FaCalendarAlt className="text-blue-500 text-sm" />
                Active Session
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div>
                  <span className="block text-zinc-550 text-xs font-semibold uppercase tracking-wider mb-1">
                    Session ID
                  </span>
                  <div className="font-mono text-zinc-400 text-xs truncate">
                    {session.session.id}
                  </div>
                </div>

                <div>
                  <span className="block text-zinc-555 text-xs font-semibold uppercase tracking-wider mb-1">
                    Expires At
                  </span>
                  <div className="text-zinc-350 flex items-center gap-2 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {new Date(session.session.expiresAt).toLocaleString()}
                  </div>
                </div>

                {session.session.ipAddress && (
                  <div>
                    <span className="block text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1">
                      IP Address
                    </span>
                    <div className="text-zinc-300 font-mono text-xs">
                      {session.session.ipAddress}
                    </div>
                  </div>
                )}

                {session.session.userAgent && (
                  <div className="sm:col-span-2">
                    <span className="block text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1">
                      Device / User Agent
                    </span>
                    <div className="text-zinc-400 text-xs truncate bg-zinc-950 p-2.5 rounded-lg border border-zinc-850 font-mono">
                      {session.session.userAgent}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
