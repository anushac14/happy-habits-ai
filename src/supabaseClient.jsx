import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://opskawjxhhedlbpgiytw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wc2thd2p4aGhlZGxicGdpeXR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI3MTM5MzgsImV4cCI6MjAzODI4OTkzOH0.LiC9QQtxke_XvAIt8lJgYHe8Usl791RK69r7RUvAQ2w";

export const supabase = createClient(supabaseUrl, supabaseKey);
