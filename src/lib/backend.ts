import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

type BackendClient = SupabaseClient<Database>;

const hasBackendConfig = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

let backendClientPromise: Promise<BackendClient> | null = null;

export function isBackendConfigured() {
  return hasBackendConfig;
}

export async function getBackendClient(): Promise<BackendClient | null> {
  if (!hasBackendConfig) return null;

  if (!backendClientPromise) {
    backendClientPromise = import("@/integrations/supabase/client").then(
      ({ supabase }) => supabase
    );
  }

  return backendClientPromise;
}