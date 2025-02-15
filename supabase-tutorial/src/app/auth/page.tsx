"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase/supabase";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <input
        className="border p-2 m-2"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 m-2"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2"
        onClick={handleSignIn}
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </div>
  );
}
