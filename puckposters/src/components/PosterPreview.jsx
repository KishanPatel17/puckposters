// src/components/PosterPreview.jsx
import React from "react";
import { teamMeta } from "../data/teamMeta";

function PosterPreview({ teamCode, games, monthLabel }) {
  const meta = teamMeta[teamCode];
  const primary = meta?.primary || "#000";
  const secondary = meta?.secondary || "#fff";

  // Legend chip styles
  const homeStyle = { background: secondary, color: primary };
  const awayStyle = { background: primary, color: secondary };

  return (
    <div className="poster-wrapper" id="poster-export-target">
      {/* Background image */}
      <img
        src={meta?.bg}
        alt={`${meta?.name} background`}
        className="poster-bg"
      />

      {/* Floating content over background */}
      <div className="poster-bottom updated-layout">
        {/* Header with month and legend */}
        <div className="poster-month-row">
          <span className="poster-month-pill">{monthLabel}</span>
          <span className="poster-legend-chip" style={homeStyle}>Home</span>
          <span className="poster-legend-chip" style={awayStyle}>Away</span>
        </div>

        {/* Games Grid */}
        <div className="poster-game-grid compact-grid">
          {games.map((g) => (
            <div
              key={g.id}
              className={`poster-game-tile compact-tile ${g.isHome ? "home" : "away"}`}
              style={{
                backgroundColor: g.isHome ? secondary : primary,
                color: g.isHome ? primary : secondary,
              }}
            >
              {g.opponentLogo && (
                <img src={g.opponentLogo} alt={g.opponent} className="opponent-logo" />
              )}
              <span className="poster-game-date">{g.shortDate}</span>
              <span className="poster-game-time">{g.localTimeShort}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PosterPreview;
