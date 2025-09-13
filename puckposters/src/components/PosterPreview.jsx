import { teamMeta } from "../data/teamMeta";

function PosterPreview({ teamCode, games, monthLabel, wallpaper_size }) {
  const meta = teamMeta[teamCode];
  const primary = meta?.primary || "#000";
  const secondary = meta?.secondary || "#fff";
  const size = wallpaper_size;
  const [w, h] = (size || "1080x1920").split("x").map(Number);
  //const bgSrc = meta?.bg?.[size] || meta?.bg?.["1080x1920"]; // fallback\
  const bgSrc = teamCode === "TOR" ? meta?.bg?.[size] : meta?.bg?.["1080x1920"];
  console.log("bgSrc = " + bgSrc);

  console.log("wallpaper_size = " + size);

  // Legend chip styles
  const homeStyle = { background: secondary, color: primary };
  const awayStyle = { background: primary, color: secondary };

  function getLocalLogoPath(teamCode) {
    return `/logos/${teamCode}.${teamCode === "UTA" ? "png" : "svg"}`;
  }

  return (
    <div id="poster-preview">
      <div
        className="poster-frame"
        style={{ "--pp-w": `${w}px`, "--pp-h": `${h}px` }}
      >
        <div className="poster-wrapper" id="poster-export-target">
          {/* Background image */}
          <img
            src={bgSrc}
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
