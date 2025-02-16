import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../supabase/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) return res.status(400).json({ error: error.message });
  
  res.status(200).json({ data });
}