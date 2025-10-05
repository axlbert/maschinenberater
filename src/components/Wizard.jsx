import React from "react";
import { GROUP_IMG, SUPER_IMG, BANDS, LEVELS } from "../config";
import { Tile } from "./ui";

/*function InfoBox({ g }) {
  const ex = GROUP_IMG[g];
  return (
    <aside className="mb-infobox">
      <div className="mb-infobox__head">
        <div className="mb-infobox__title">{ex.title}</div>
        <span className="mb-chip">Beispiel</span>
      </div>
      <figure className="mb-infobox__figure"><img src={ex.src} alt={ex.title} /></figure>
    </aside>
  );
}*/

export default function Wizard({ step, setStep, ans, setAns, onComplete }) {
  const totalSteps = 8;

  const canProceed = () => {
    if (step === 0) return !!ans.super.sortingType;
    if (step === 1) return !!ans.super.quality;
    if (step === 2) return !!ans.super.functionality;
    if (step === 3) return ans.grob !== null;
    if (step === 4) return ans.klein !== null;
    if (step === 5) return ans.besonders !== null;
    if (step === 6) return ans.throughput !== null;
    if (step === 7) return ans.exits !== null;
    return true;
  };

  const Render = () => {
    if (step === 0) {
      const v = ans.super.sortingType;
      return (
        <div className="mb-grid mb-grid--3">
          <div className="mb-grid__span-2 mb-grid mb-grid--2">
            <Tile sel={v === "coarse"} title="Grobe Vorsortierung" sub="z. B. Einlagerung & Handel" image={SUPER_IMG.sorting.coarse}
              onClick={() => setAns((p) => ({ ...p, super: { ...p.super, sortingType: "coarse" } }))} />
            <Tile sel={v === "rock"} title="Nur Steine und Kluten" sub="Einlagerung" image={SUPER_IMG.sorting.rock}
              onClick={() => setAns((p) => ({ ...p, super: { ...p.super, sortingType: "rock" } }))} />
              <Tile sel={v === "fine"} title="Feinsortierung" sub="für Direktvermarktung" image={SUPER_IMG.sorting.fine}
              onClick={() => setAns((p) => ({ ...p, super: { ...p.super, sortingType: "fine" } }))} />
          </div>
          
        </div>
      );
    }
    if (step === 1) {
      const v = ans.super.quality;
      return (
        <div className="mb-grid mb-grid--3">
          <div className="mb-grid__span-2 mb-grid mb-grid--1">
            <Tile sel={v === "comparable"} title="Vergleichbar sollte es sein" image={SUPER_IMG.quality.comparable}
              onClick={() => setAns((p) => ({ ...p, super: { ...p.super, quality: "comparable" } }))} />
            <Tile sel={v === "stable"} title="Vergleichbar, aber ohne Schwankungen" image={SUPER_IMG.quality.stable}
              onClick={() => setAns((p) => ({ ...p, super: { ...p.super, quality: "stable" } }))} />
            <Tile sel={v === "better"} title="Es sollte besser werden" image={SUPER_IMG.quality.better}
              onClick={() => setAns((p) => ({ ...p, super: { ...p.super, quality: "better" } }))} />
            <Tile sel={v === "perfect"} title="Es muss perfekt werden" image={SUPER_IMG.quality.perfect}
              onClick={() => setAns((p) => ({ ...p, super: { ...p.super, quality: "perfect" } }))} />
          </div>
          
        </div>
      );
    }
    if (step === 2) {
      const v = ans.super.functionality;
      return (
        <div className="mb-grid mb-grid--3">
          <div className="mb-grid__span-2 mb-grid mb-grid--2">
            <Tile sel={v === "quality_only"} title="Nur Qualität" sub="Defekt-/Qualitätssortierung"
              onClick={() => setAns((p) => ({ ...p, super: { ...p.super, functionality: "quality_only" } }))} />
            <Tile sel={v === "size_and_quality"} title="Größen und Qualitätssortierung" sub="Kalibrierung + Qualität"
              onClick={() => setAns((p) => ({ ...p, super: { ...p.super, functionality: "size_and_quality" } }))} />
          </div>
          
        </div>
      );
    }
    if (step === 3) {
      const v = ans.grob;
      return (
        <div className="mb-grid mb-grid--3">
          <div className="mb-grid__span-2 mb-grid mb-grid--2">
            {LEVELS.map((p) => (
              <Tile key={p.id} sel={v === p.val} title={`${p.label} (${p.val}%)`}
                onClick={() => setAns((prev) => ({ ...prev, grob: p.val }))} />
            ))}
          </div>
         
        </div>
      );
    }
    if (step === 4) {
      const v = ans.klein;
      return (
        <div className="mb-grid mb-grid--3">
          <div className="mb-grid__span-2 mb-grid mb-grid--2">
            {LEVELS.map((p) => (
              <Tile key={p.id} sel={v === p.val} title={`${p.label} (${p.val}%)`}
                onClick={() => setAns((prev) => ({ ...prev, klein: p.val }))} />
            ))}
          </div>
         
        </div>
      );
    }
    if (step === 5) {
      const v = ans.besonders;
      return (
        <div className="mb-grid mb-grid--3">
          <div className="mb-grid__span-2 mb-grid mb-grid--2">
            {LEVELS.map((p) => (
              <Tile key={p.id} sel={v === p.val} title={`${p.label} (${p.val}%)`}
                onClick={() => setAns((prev) => ({ ...prev, besonders: p.val }))} />
            ))}
          </div>
          
        </div>
      );
    }
    if (step === 6) {
      const v = ans.throughput;
      return (
        <div className="mb-grid mb-grid--3">
          <div className="mb-grid__span-2 mb-grid mb-grid--2">
            {BANDS.map((b) => (
              <Tile key={b.id} sel={v === b.id} title={b.label} sub={b.max === Infinity ? "skalierbar" : `bis ${b.max} t/W`}
                onClick={() => setAns((prev) => ({ ...prev, throughput: b.id }))} />
            ))}
          </div>
          
        </div>
      );
    }

    // step === 7 (LETZTE FRAGE)
    const v = ans.exits;
    const selectAndComplete = (value) => {
      setAns((prev) => ({ ...prev, exits: value }));
      // nach kurzer Tick die Completion melden (UI fühlt sich direkter an)
      setTimeout(() => onComplete && onComplete(), 0);
    };

    return (
      <div className="mb-grid mb-grid--3">
        <div className="mb-grid__span-2 mb-grid mb-grid--1">
          <Tile sel={v === "2"} title="2 Ausgänge" sub="Gut / Schlecht" onClick={() => selectAndComplete("2")} />
          <Tile sel={v === "2_4"} title="2–4 Ausgänge" sub="z. B. Steine, Futter, B-Ware, A-Ware" onClick={() => selectAndComplete("2_4")} />
          <Tile sel={v === "4_8"} title="4–8 Ausgänge" sub="Drilllinge, Übergrößen, Qualitäten" onClick={() => selectAndComplete("4_8")} />
        </div>
        
      </div>
    );
  };

  return (
    <section className="mb-card">
      <div className="mb-sectionhead">
        <div>
          <h2 className="mb-h2">
            {step === 0 ? "Welche Art von Sortierung suchen Sie?"
              : step === 1 ? "Anspruch im Vergleich zur Handsortierung"
              : step === 2 ? "Nur Qualitätssortierung oder auch Größensortierung?"
              : step === 3 ? GROUP_IMG.grob.title
              : step === 4 ? GROUP_IMG.klein.title
              : step === 5 ? GROUP_IMG.besonders.title
              : step === 6 ? "Wie viel willst du pro Woche sortieren?"
              : "Wie viele Sortierausgänge werden benötigt?"}
          </h2>
          
        </div>
      </div>
      <Render />
      <div className="mb-actions">
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className={`mb-btn mb-btn--secondary ${step === 0 ? "is-disabled" : ""}`}>Zurück</button>
        <button
          onClick={() => setStep(Math.min(step + 1, totalSteps - 1))}
          disabled={!canProceed()}
          className={`mb-btn mb-btn--primary ${!canProceed() ? "is-disabled" : ""}`}
        >
          Weiter
        </button>
      </div>
    </section>
  );
}
