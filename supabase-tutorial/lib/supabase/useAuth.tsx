"use client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js"; // User 型
import { supabase } from "./supabase";// Supabase クライアント

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);  // ローディング状態を管理

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();  // getSession を使用
        console.log("Session data:", session);  // セッションデータをログに出力
        if (error) {
          console.error("Error fetching session:", error.message);
        }
        if (session?.user) {
          setUser(session.user);  // セッションがあればユーザー情報をセット
        } else {
          setUser(null);  // セッションが無ければnullをセット
        }
        setLoading(false);  // ローディング状態を解除
      } catch (error) {
        console.error("Error fetching session:", error);  // エラーログ
        setLoading(false);  // エラーが発生してもローディングを解除
      }
    };

    fetchSession();
  }, []);

  return { user, loading };  // user と loading を返す
}
