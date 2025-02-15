"use client";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase/supabase";
import { useAuth } from "../../../lib/supabase/useAuth";

export default function Dashboard() {
    const { user } = useAuth();
    const router = useRouter();
  
    const handleSignOut = async () => {
      await supabase.auth.signOut();
      router.push("/sign-in");
    };
  
    if (!user) return <p>Loading...</p>; // userがnullのときは表示しない
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Welcome, {user.email ?? "Guest"}</h1>
        <button
          className="bg-red-500 text-white px-4 py-2"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    );
  }