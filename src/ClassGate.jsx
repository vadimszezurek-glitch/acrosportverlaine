import React, { useState, useEffect } from "react";
import { Users, ArrowRight, LogOut } from "lucide-react";
import { setNamespace } from "./cloudStorage";

const LS_KEY = "acrosport:classe";

const C = {
  ink: "#2C3A49",
  accent: "#5B7C99",
  accentDark: "#3D6E8F",
  bg: "#EEF3F6",
  card: "#FFFFFF",
  line: "#D9E2E8",
  soft: "#F5F8FA",
  muted: "#6B7C8A",
};

/*
  Porte d'entrée : l'utilisateur saisit un "code de classe". Ce code sépare les
  données des différentes classes dans la base. Il est mémorisé sur la tablette
  et peut aussi être passé dans l'URL (?c=CODE) pour distribuer un simple lien.
*/
export default function ClassGate({ children }) {
  const [code, setCode] = useState(null);
  const [input, setInput] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("c");
    const saved = fromUrl || localStorage.getItem(LS_KEY);
    if (saved && saved.trim().length >= 4) {
      const v = saved.trim();
      setNamespace(v);
      localStorage.setItem(LS_KEY, v);
      setCode(v);
    }
  }, []);

  const enter = () => {
    const v = input.trim();
    if (v.length < 4) {
      setErr("Le code de classe doit comporter au moins 4 caractères.");
      return;
    }
    setNamespace(v);
    localStorage.setItem(LS_KEY, v);
    setCode(v);
  };

  const leave = () => {
    localStorage.removeItem(LS_KEY);
    setNamespace(null);
    setInput("");
    setErr("");
    setCode(null);
  };

  if (code) {
    return (
      <>
        {children}
        <button
          onClick={leave}
          title="Changer de classe"
          style={{
            position: "fixed",
            bottom: 12,
            left: 12,
            zIndex: 50,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 10px",
            borderRadius: 999,
            border: `1px solid ${C.line}`,
            background: "#FFFFFFDD",
            backdropFilter: "blur(4px)",
            color: C.muted,
            fontSize: 11.5,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <LogOut size={13} /> {code}
        </button>
      </>
    );
  }

  return (
    <div
      className="flex items-center justify-center px-4"
      style={{ minHeight: "100vh", background: C.bg }}
    >
      <div
        className="w-full"
        style={{
          maxWidth: 420,
          background: C.card,
          border: `1px solid ${C.line}`,
          borderRadius: 20,
          padding: 28,
          boxShadow: "0 10px 40px -20px rgba(44,58,73,.35)",
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: C.soft,
            border: `1px solid ${C.line}`,
            margin: "0 auto 14px",
          }}
        >
          <Users size={26} style={{ color: C.accent }} />
        </div>
        <h1
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: 800,
            color: C.ink,
            margin: 0,
          }}
        >
          Livret Acrosport
        </h1>
        <p
          style={{
            textAlign: "center",
            fontSize: 13,
            color: C.muted,
            margin: "6px 0 20px",
          }}
        >
          Entre le code de ta classe pour retrouver les troupes et le travail des
          séances.
        </p>

        <label
          style={{ fontSize: 11, fontWeight: 700, color: C.muted }}
          htmlFor="classcode"
        >
          Code de classe
        </label>
        <input
          id="classcode"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setErr("");
          }}
          onKeyDown={(e) => e.key === "Enter" && enter()}
          placeholder="ex. 4E2-ACRO"
          autoFocus
          className="w-full"
          style={{
            marginTop: 6,
            borderRadius: 12,
            border: `1px solid ${err ? "#C2553D" : C.line}`,
            background: "#fff",
            padding: "12px 14px",
            fontSize: 16,
            color: C.ink,
            outline: "none",
          }}
        />
        {err && (
          <div style={{ color: "#C2553D", fontSize: 12, marginTop: 8 }}>{err}</div>
        )}

        <button
          onClick={enter}
          className="w-full flex items-center justify-center gap-2"
          style={{
            marginTop: 16,
            borderRadius: 12,
            border: "none",
            background: C.accent,
            color: "#fff",
            padding: "12px 14px",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Continuer <ArrowRight size={17} />
        </button>

        <p style={{ fontSize: 11, color: C.muted, marginTop: 14, lineHeight: 1.5 }}>
          Le code est fourni par l'enseignant. Il est mémorisé sur cette tablette :
          tu n'auras à le saisir qu'une fois.
        </p>
      </div>
    </div>
  );
}
