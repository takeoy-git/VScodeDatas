"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase/supabase";
import { useAuth } from "../../../lib/supabase/useAuth";

export default function Reserve() {
  const { user } = useAuth();
  const router = useRouter();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleReserve = async () => {
    if (!user) {
      alert("ログインが必要です");
      return;
    }

    const { error } = await supabase
      .from("reservations")
      .insert({ user_id: user.id, date, time });

    if (error) {
      alert(error.message);
    } else {
      alert("予約が完了しました！");
      router.push("/dashboard");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">予約を作成</h1>
      <input
        type="date"
        className="border p-2 w-full mb-2"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        className="border p-2 w-full mb-2"
        placeholder="予約時間 (例: 14:00)"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 w-full"
        onClick={handleReserve}
      >
        予約する
      </button>
    </div>
  );
}
