import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useUserRole(userId: string | undefined) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (!userId) { setIsAdmin(false); return; }
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();
      if (cancelled) return;
      setIsAdmin(!error && !!data);
    })();
    return () => { cancelled = true; };
  }, [userId]);

  return isAdmin;
}