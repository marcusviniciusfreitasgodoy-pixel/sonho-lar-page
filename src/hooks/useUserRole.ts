import { useEffect, useState } from "react";
import { getBackendClient } from "@/lib/backend";

export function useUserRole(userId: string | undefined) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsAdmin(null);
    if (userId === undefined) return; // auth still resolving
    if (userId === null) { setIsAdmin(false); return; }
    (async () => {
      const client = await getBackendClient();
      if (!client) {
        if (!cancelled) setIsAdmin(false);
        return;
      }

      const { data, error } = await client
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