"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";

type User = {
  id: string;
  email: string | undefined;
};

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user ? { id: user.id, email: user.email } : null);
    };

    checkUser();
  }, []);

  const handleAdminClick = () => router.push("/dashboard");
  const handleVisitorClick = () => router.push("/reserve");
  const handleMaintenanceClick = () => router.push("/maintenance");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
    } else {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user ? { id: user.id, email: user.email } : null);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="bg-gray-900 bg-opacity-80 p-8 rounded-xl shadow-lg text-center w-80">
        {!user ? (
          <>
            <h1 className="text-2xl font-bold mb-4">ログインしてください</h1>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleLogin} className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-200"
              >
                ログイン
              </button>
            </form>
          </>
        ) : (
          <>
            <button
              onClick={handleAdminClick}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-200 mb-2"
            >
              管理者専用
            </button>
            <button
              onClick={handleVisitorClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-200 mb-2"
            >
              席予約ページ
            </button>
            <button
              onClick={handleMaintenanceClick}
              className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200"
            >
              メンテナンス表示ページ
            </button>
          </>
        )}
      </div>
    </div>
  );
}