import { supabase } from "./supabaseClient";

/*
  Adaptateur de stockage : reproduit l'interface window.storage utilisée par
  l'application (get / set / delete), mais enregistre les données dans Supabase.

  Toutes les données d'une même classe sont regroupées sous un "namespace"
  (le code de classe). L'app continue d'utiliser ses propres clés :
    - "acrosport:index"          → la liste des troupes
    - "acrosport:troupe:<id>"    → le livret de chaque troupe
  Chaque paire (namespace, clé) est une ligne de la table kv côté serveur.
*/

let NS = null;

export function setNamespace(ns) {
  NS = ns;
}
export function getNamespace() {
  return NS;
}

export const cloudStorage = {
  async get(key) {
    if (!NS) return null;
    const { data, error } = await supabase.rpc("app_get", {
      p_ns: NS,
      p_key: key,
    });
    if (error) throw error;
    return data == null ? null : { key, value: data };
  },

  async set(key, value) {
    if (!NS) throw new Error("Aucune classe sélectionnée");
    const { error } = await supabase.rpc("app_set", {
      p_ns: NS,
      p_key: key,
      p_value: value,
    });
    if (error) throw error;
    return { key, value };
  },

  async delete(key) {
    if (!NS) return { key, deleted: false };
    const { error } = await supabase.rpc("app_del", {
      p_ns: NS,
      p_key: key,
    });
    if (error) throw error;
    return { key, deleted: true };
  },
};
