import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { cloudStorage } from "./cloudStorage";
import ClassGate from "./ClassGate";
import AcrosportRoot from "./AcrosportApp";

// L'application a été écrite pour lire/écrire via window.storage.
// On y branche le stockage Supabase, sans rien changer à l'app elle-même.
window.storage = cloudStorage;

createRoot(document.getElementById("root")).render(
  <ClassGate>
    <AcrosportRoot />
  </ClassGate>
);
