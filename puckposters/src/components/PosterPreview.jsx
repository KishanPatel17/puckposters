// src/components/PosterPreview.jsx
import React from "react";
import { teamMeta } from "../data/teamMeta";
import { toPng } from "html-to-image";
import download from "downloadjs";

function PosterPreview({ teamCode, games, monthLabel }) {
  const meta = teamMeta[teamCode];
  const primary = meta?.primary || "#000";
  const secondary = meta?.secondary || "#fff";

  // Legend chip styles
  const homeStyle = { background: secondary, color: primary };
  const awayStyle = { background: primary, color: secondary };

  function getLocalLogoPath(teamCode) {
    return `/logos/${teamCode}.${teamCode === "UTA" ? "png" : "svg"}`;
  }

  const handleExport = async () => {
    const node = document.getElementById("poster-export-target");

    // Make sure fonts/images are ready so text doesn't render fuzzy/misaligned
    try {
      if (document.fonts?.ready) await document.fonts.ready;
    } catch {}
    await new Promise((r) => requestAnimationFrame(r)); // settle layout one frame

    const dataUrl = await toPng(node, {
      cacheBust: true,
      width: 1080,
      height: 1920,
      pixelRatio: window.devicePixelRatio > 2 ? 2 : 1,
      useCORS: true,
    });

    download(dataUrl, `${teamCode}-${monthLabel.replace(/\s+/g, "")}.png`);
  };

  return (
    <div id="poster-preview">
      <div className="poster-frame">
        <div className="poster-wrapper" id="poster-export-target">
          {/* Background image */}
          <img
            src={meta?.bg}
            alt={`${meta?.name} background`}
            className="poster-bg"
            crossOrigin="anonymous"
          />
          {/* Floating content over background */}
          <div className="poster-bottom updated-layout">
            {/* Header with month and legend */}
            <div className="poster-month-row">
              <span className="poster-month-pill">{monthLabel}</span>
              <span className="poster-legend-chip" style={homeStyle}>
                Home
              </span>
              <span className="poster-legend-chip" style={awayStyle}>
                Away
              </span>
            </div>
            {/* Games Grid */}
            <div className="poster-game-grid compact-grid">
              {games.map((g) => {
                console.log("Opponent code = " + g.abbrev.toLowerCase());
                const logoPath = `/nhl_logos/${g.abbrev.toLowerCase()}.${
                  g.abbrev.toLowerCase() === "uta" ? "png" : "svg"
                }`;
                console.log("logo path = " + logoPath);
                return (
                  <div
                    key={g.id}
                    className={`poster-game-tile compact-tile ${
                      g.isHome ? "home" : "away"
                    }`}
                    style={{
                      backgroundColor: g.isHome ? secondary : primary,
                      color: g.isHome ? primary : secondary,
                    }}
                  >
                    <img
                      src={logoPath}
                      alt={g.opponent}
                      className="opponent-logo"
                      crossOrigin="anonymous"
                    />
                    <span className="poster-game-date">{g.shortDate}</span>
                    <span className="poster-game-time">{g.localTimeShort}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="poster-footer">
            <span>puckposters.com | generated with ❤️</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PosterPreview;
