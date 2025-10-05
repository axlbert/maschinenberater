import React, { useState } from "react";
import "./maschinenberater.css";
import { verm } from "./config";
import Wizard from "./components/Wizard";
import Ranking from "./components/Ranking";
import useRanking from "./hooks/useRanking";

/* Initialzustand */
const initAnswers = () => ({
  super: { sortingType: null, quality: null, functionality: null },
  grob: null,
  klein: null,
  besonders: null,
  throughput: null,
  exits: null,
});

const isComplete = (ans) =>
  !!(ans.super.sortingType && ans.super.quality && ans.super.functionality) &&
  ans.grob !== null &&
  ans.klein !== null &&
  ans.besonders !== null &&
  ans.throughput !== null &&
  ans.exits !== null;

export default function Maschinenberater() {
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState(initAnswers);
  const [collapsed, setCollapsed] = useState(false); // <-- NEU

  const totalSteps = 8;
  const progress = Math.round((step / totalSteps) * 100);
  const { ranked } = useRanking(ans);

  const resetAll = () => {
    setAns(initAnswers());
    setStep(0);
    setCollapsed(false);
  };

  const handleComplete = () => {
    // Wird von Wizard aufgerufen, sobald die letzte Frage beantwortet ist
    setCollapsed(true);
  };

  return (
    <div style={{
        ...verm, // deine CSS-Variablen bleiben erhalten
        background: `
          linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.95)),
          url(/assets/bg/potato.png) center/cover no-repeat fixed
        `
      }} className="mb-app">
      {/* Topbar */}
      <div className="mb-topbar">
        <div className="mb-topbar__inner">
          <div className="mb-brand">
            <button className="mb-brand__logo" onClick={resetAll} title="Neu starten" aria-label="Neu starten">M</button>
            <div className="mb-brand__title">Maschinenberater</div>
            <span className="mb-sep">·</span>
            <div className="mb-brand__subtitle">Optische Kartoffelsortierung</div>
          </div>
          <div className="mb-topbar__right">
            {/* Start / Reset */}
            <button className="mb-iconbtn" title="Neu starten" onClick={resetAll} aria-label="Neu starten">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 5V2L7 7l5 5V9c3.31 0 6 2.69 6 6a6 6 0 1 1-12 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Start</span>
            </button>

            {/* Toggle Fragen ein/aus sobald vollständig */}
            {isComplete(ans) && (
              <button
                className="mb-iconbtn"
                onClick={() => setCollapsed((v) => !v)}
                title={collapsed ? "Fragen anzeigen" : "Fragen ausblenden"}
                aria-label={collapsed ? "Fragen anzeigen" : "Fragen ausblenden"}
              >
                {/* kleines Pfeil-Icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ transform: collapsed ? "rotate(180deg)" : "none" }}>
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{collapsed ? "Fragen" : "Einklappen"}</span>
              </button>
            )}

            <div className="mb-stepbadge">
              <span className="mb-stepbadge__dot">{Math.min(step + 1, totalSteps)}</span>
              Schritt {Math.min(step + 1, totalSteps)} / {totalSteps}
            </div>
          </div>
        </div>
        <div className="mb-progress">
          <div className="mb-progress__bar" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Content */}
      <div className="mb-container">
        {/* Wizard – collapsible */}
        {!collapsed && (
          <Wizard
            step={step}
            setStep={setStep}
            ans={ans}
            setAns={setAns}
            onComplete={handleComplete} // <-- NEU
          />
        )}
        <br/>
        {/* Ranking: immer sichtbar */}
        <Ranking ranked={ranked} ans={ans} />
      </div>
    </div>
  );
}
