"use client"; // クライアントコンポーネントとして指定

import { useEffect } from "react"; 
import { useRouter } from "next/navigation";  
import { useAuth } from "../../lib/supabase/useAuth";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // useEffect 内でリダイレクト処理を行う
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Reservation System</h1>
      <p className="text-lg mb-4">You are logged in as {user?.email}</p>

      <div className="space-y-4">
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go to Dashboard
        </button>
        <button
          onClick={() => router.push("/reserve")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Make a Reservation
        </button>
      </div>
    </div>
  );
}
