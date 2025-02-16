"use client";


import { supabase } from "@/supabase/supabase";
import { useEffect, useState } from "react";

type Reservation = {
  id: number;
  time_slot: string;
  seat_number: number;
  visitor_name: string;
  reservation_code: string;
};

export default function AdminPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const { data, error } = await supabase.from("reservations").select("*");
      if (!error) {
        setReservations(data || []);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">予約管理</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">時間</th>
            <th className="border p-2">座席番号</th>
            <th className="border p-2">名前</th>
            <th className="border p-2">予約番号</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res.id}>
              <td className="border p-2">{res.time_slot}</td>
              <td className="border p-2">{res.seat_number}</td>
              <td className="border p-2">{res.visitor_name}</td>
              <td className="border p-2">{res.reservation_code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
