import React from "react";
import { BANDS, SUPER } from "../config";
import { MiniBar } from "./ui";

export default function Ranking({ ranked, ans }) {
  return (
    <section className="mb-card">
      <h2 className="mb-h2">Maschinen-Übersicht (Ranking)</h2>
      <div className="mb-list">
        {ranked.map((m, idx) => {
          const overall = m.allOk ? { t: "passt", c: "mb-badge--ok" } : { t: "teilweise", c: "mb-badge--close" };
          return (
            <div key={m.id} className="mb-rankcard">
              <div className="mb-rankcard__head">
                {/* NEU: Bild/Thumbnail */}
                {m.img && (
                  <div className="mb-rankcard__media">
                    <img src={m.img} alt={m.name} />
                  </div>
                )}

                <div className="mb-rankcard__title">
                  <span className="mb-rankcard__pos">#{idx + 1}</span>
                  {m.name}
                  <span className={`mb-badge ${overall.c}`}>{overall.t}</span>
                </div>

                <div className="mb-rankcard__score">
                  <div className="mb-muted">Gesamt</div>
                  <div className="mb-score">{Math.round(m.score)}%</div>
                  <div className="mb-muted">
                    Defekte: {Math.round(m.defectScore)}% · Super (intern): {Math.round(m.superScore)}%
                  </div>
                </div>
              </div>

              {/* QUALITÄT */}
              <div className="mb-block">
                <div className="mb-block__title">Qualität</div>
                <div className="mb-grid mb-grid--2">
                  {m.groups.map((g) => (
                    <div key={g.id} className="mb-subcard">
                      <div className="mb-subcard__head">
                        <div className="mb-subcard__title">{g.label}</div>
                        <span className={`mb-badge ${g.s.b}`}>{g.s.t}</span>
                      </div>
                      <div className="mb-subcard__bar"><MiniBar cap={g.capAvg} req={g.req} /></div>
                      <div className="mb-subcard__meta">Anforderung: {g.req}% · Maschine (Ø): {Math.round(g.capAvg)}%</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* LEISTUNG */}
              <div className="mb-block">
                <div className="mb-block__title">Leistung</div>
                <div className="mb-grid mb-grid--2">
                  <div className="mb-subcard">
                    <div className="mb-subcard__title">Wochenkapazität</div>
                    <div className="mb-subcard__meta">
                      Bedarf: {(BANDS.find((b) => b.id === ans.throughput) || {}).label || "—"} · Maschine: bis {m.max_tpw} t/W
                    </div>
                    <div className="mb-subcard__bar"><MiniBar cap={m.tpCap} req={m.tpReq} /></div>
                    {!m.throughputOk && <div className="mb-warn">Hinweis: gewähltes Band über Maschinenobergrenze.</div>}
                  </div>
                </div>
              </div>

              {/* FUNKTIONSUMFANG */}
              <div className="mb-block">
                <div className="mb-block__title">Funktionsumfang</div>
                <div className="mb-grid mb-grid--2">
                  <div className="mb-subcard">
                    <div className="mb-subcard__head">
                      <div className="mb-subcard__title">Einsatzart</div>
                      <span className="mb-subcard__hint">
                        {ans.super.sortingType === "coarse" ? "Grob" : ans.super.sortingType === "fine" ? "Fein" : "—"}
                      </span>
                    </div>
                    <div className="mb-subcard__bar">
                      <div className="mb-minibar mb-minibar--neutral">
                        <div className="mb-minibar__fill" style={{ width: `${ans.super.sortingType ? (SUPER.sortingType[ans.super.sortingType] || {})[m.id] || 0 : 0}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="mb-subcard">
                    <div className="mb-subcard__head">
                      <div className="mb-subcard__title">Anspruch</div>
                      <span className="mb-subcard__hint">
                        {({ comparable: "Vergleichbar", stable: "Stabil", better: "Besser", perfect: "Perfekt" })[ans.super.quality] || "—"}
                      </span>
                    </div>
                    <div className="mb-subcard__bar">
                      <div className="mb-minibar mb-minibar--neutral">
                        <div className="mb-minibar__fill" style={{ width: `${ans.super.quality ? (SUPER.quality[ans.super.quality] || {})[m.id] || 0 : 0}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="mb-subcard">
                    <div className="mb-subcard__title">Sortierausgänge</div>
                    <div className="mb-subcard__meta">
                      Bedarf: {({ "2": "2", "2_4": "2–4", "4_8": "4–8" })[ans.exits] || "—"} · Maschine: {m.exit_min}–{m.exit_max}
                    </div>
                    <div className="mb-exits">
                      {[2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <span key={n} className={`mb-exit ${m.exit_min <= n && n <= m.exit_max ? "is-ok" : ""}`}>{n}</span>
                      ))}
                    </div>
                    {(() => {
                      const need = ans.exits;
                      const rng = need === "2" ? [2, 2] : need === "2_4" ? [2, 4] : need === "4_8" ? [4, 8] : null;
                      const ok = rng ? !(m.exit_max < rng[0] || m.exit_min > rng[1]) : true;
                      return !ok ? <div className="mb-warn">Hinweis: Bedarf außerhalb des Maschinenbereichs.</div> : null;
                    })()}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
