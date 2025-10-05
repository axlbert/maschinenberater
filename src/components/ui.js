import React from "react";

export function Tile({ sel, title, sub, image, onClick }) {
  return (
    <button onClick={onClick} className={`mb-tile ${sel ? "is-selected" : ""}`}>
      <div className="mb-tile__body">
        {image && <img src={image} alt="" className="mb-tile__img" />}
        <div>
          <div className="mb-tile__title">{title}</div>
          {sub && <div className="mb-tile__sub">{sub}</div>}
        </div>
      </div>
      <div className="mb-tile__check">✓</div>
    </button>
  );
}

export function MiniBar({ cap, req }) {
  const c = Math.max(0, Math.min(100, cap));
  const r = Math.max(0, Math.min(100, req));
  const diff = c - r;
  const state = diff >= 0 ? "ok" : diff > -10 ? "close" : "fail";
  const width = diff > -10 && diff < 0 ? 60 : c; // knapp = 60 %
  return (
    <div className={`mb-minibar mb-minibar--${state}`} title={`Maschine: ${Math.round(c)}% · Anforderung: ${Math.round(r)}%`}>
      <div className="mb-minibar__fill" style={{ width: `${width}%` }} />
      <div className="mb-minibar__marker" style={{ left: `${r}%` }} />
    </div>
  );
}
