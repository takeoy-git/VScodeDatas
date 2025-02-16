"use client";

import { supabase } from "@/supabase/supabase";
import { useEffect, useState } from "react";

type Seat = {
  seat_number: number;
  reservation_code: string | null;
  visitor_name: string | null;
};

const timeSlots = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"]; // 固定の時間枠

export default function ReservationPage() {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("10:00"); // 初期値として最初の時間枠を設定
  const [reservationCode, setReservationCode] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeats = async () => {
      const { data, error } = await supabase
        .from("reservations")
        .select("seat_number, reservation_code, visitor_name, time_slot");

      if (!error) {
        setSeats(data || []);
      }
    };

    fetchSeats();
  }, []);

  const handleReserve = async (seatNumber: number, timeSlot: string) => {
    // 今日の日付を取得（YYYYMMDD 形式）
    const today = new Date().toISOString().split("T")[0].replace(/-/g, "");

    // 同じ日付・時間・座席の予約があるかチェック
    const { data: existingReservations, error } = await supabase
      .from("reservations")
      .select("reservation_code")
      .eq("time_slot", timeSlot) // 選択した予約時間
      .eq("seat_number", seatNumber)
      .eq("date", today)
      .limit(1);

    if (error) {
      alert("予約情報の取得に失敗しました");
      return;
    }

    if (existingReservations.length > 0) {
      alert("この席は本日すでに予約されています。");
      return;
    }

    // 新しい予約番号を生成（例: 10:00-1-20240217）
    const reservationCode = `${timeSlot}-${seatNumber}-${today}`;

    // 予約を追加
    const { error: insertError } = await supabase.from("reservations").insert({
      time_slot: timeSlot, // 選択した予約時間
      seat_number: seatNumber,
      reservation_code: reservationCode,
      date: today,
      created_at: new Date(),
    });

    if (!insertError) {
      setReservationCode(reservationCode);
      alert(`予約完了！ 予約番号: ${reservationCode}`);
      window.location.reload(); // ページをリフレッシュして予約状況を更新
    } else {
      alert("予約に失敗しました");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">アトラクション予約</h1>

      {reservationCode ? (
        <div className="bg-green-100 p-4 rounded">
          <p className="text-lg font-bold">予約完了！</p>
          <p>予約番号: <span className="text-xl font-bold">{reservationCode}</span></p>
          <p>この番号をスタッフに伝えてください。</p>
        </div>
      ) : (
        <>
          {/* 座席1と座席2の予約時間ボタンを縦に並べて表示 */}
          <div className="grid grid-cols-2 gap-4">
            {/* 座席1の予約時間ボタン */}
            <div className="flex flex-col gap-2">
              {timeSlots.map((timeSlot) => {
                const reserved = seats.some(
                  (s) => s.seat_number === 1 && s.time_slot === timeSlot && s.reservation_code
                );
                const reservedName = seats.find(
                  (s) => s.seat_number === 1 && s.time_slot === timeSlot
                )?.visitor_name;

                return (
                  <button
                    key={timeSlot}
                    className={`p-2 rounded ${
                      reserved ? "bg-gray-500 text-white" : "bg-white border"
                    }`}
                    onClick={() => !reserved && handleReserve(1, timeSlot)}
                    disabled={reserved}
                  >
                    {reserved ? `予約済み: ${reservedName}` : `${timeSlot} - 席 1`}
                  </button>
                );
              })}
            </div>

            {/* 座席2の予約時間ボタン */}
            <div className="flex flex-col gap-2">
              {timeSlots.map((timeSlot) => {
                const reserved = seats.some(
                  (s) => s.seat_number === 2 && s.time_slot === timeSlot && s.reservation_code
                );
                const reservedName = seats.find(
                  (s) => s.seat_number === 2 && s.time_slot === timeSlot
                )?.visitor_name;

                return (
                  <button
                    key={timeSlot}
                    className={`p-2 rounded ${
                      reserved ? "bg-gray-500 text-white" : "bg-white border"
                    }`}
                    onClick={() => !reserved && handleReserve(2, timeSlot)}
                    disabled={reserved}
                  >
                    {reserved ? `予約済み: ${reservedName}` : `${timeSlot} - 席 2`}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
