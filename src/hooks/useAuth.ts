import { useEffect, useState } from "react";
import { getBackendClient } from "@/lib/backend";
import type { Session, User } from "@supabase/supabase-js";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    (async () => {
      const client = await getBackendClient();
      if (cancelled) return;

      if (!client) {
        setLoading(false);
        return;
      }

      const { data: sub } = client.auth.onAuthStateChange((_event, s) => {
        setSession(s);
        setUser(s?.user ?? null);
      });
      unsubscribe = () => sub.subscription.unsubscribe();

      const { data } = await client.auth.getSession();
      if (cancelled) return;
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, []);

  return { session, user, loading };
}