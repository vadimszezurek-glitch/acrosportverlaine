import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !key) {
  // Message volontairement visible dans la console du navigateur pour aider au déploiement.
  console.error(
    "Configuration Supabase manquante. Renseigne VITE_SUPABASE_URL et " +
      "VITE_SUPABASE_ANON_KEY (fichier .env en local, ou variables d'environnement " +
      "sur l'hébergeur)."
  );
}

export const supabase = createClient(url || "", key || "", {
  auth: { persistSession: false },
});
