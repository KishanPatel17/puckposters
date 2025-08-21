// import { useState } from "react";
// import axios from "axios";
// import "./App.css";
// import { convertScheduleToTimezone } from "./utils/scheduleUtils";
// import PosterPreview from "./components/PosterPreview";
// import { teamMeta } from "./data/teamMeta";

// function App() {
//   const [teamCode, setTeamCode] = useState("TOR");
//   const [games, setGames] = useState([]);
//   const [timezone, setTimezone] = useState(
//     Intl.DateTimeFormat().resolvedOptions().timeZone
//   ); // default is local time zone

//   const teamOptions = [
//     { code: "TOR", name: "Toronto Maple Leafs" },
//     { code: "MTL", name: "Montreal Canadiens" },
//     { code: "OTT", name: "Ottawa Senators" },
//     { code: "EDM", name: "Edmonton Oilers" },
//     { code: "VAN", name: "Vancouver Canucks" },
//     { code: "CGY", name: "Calgary Flames" },
//     { code: "WPG", name: "Winnipeg Jets" },
//     { code: "WSH", name: "Washington Capitals" },
//     { code: "VGK", name: "Vegas Golden Knights" },
//     { code: "DAL", name: "Dallas Stars" },
//     { code: "LAK", name: "Los Angeles Kings" },
//     { code: "TBL", name: "Tampa Bay Lightning" },
//     { code: "COL", name: "Colorado Avalanche" },
//     { code: "CAR", name: "Carolina Hurricanes" },
//     { code: "FLA", name: "Florida Panthers" },
//     { code: "MIN", name: "Minnesota Wild" },
//     { code: "STL", name: "St. Louis Blues" },
//     { code: "NJD", name: "New Jersey Devils" },
//     { code: "UTA", name: "Utah Mammoth" },
//     { code: "CBJ", name: "Columbus Blue Jackets" },
//     { code: "DET", name: "Detroit Red Wings" },
//     { code: "NYR", name: "New York Rangers" },
//     { code: "NYI", name: "New York Islanders" },
//     { code: "PIT", name: "Pittsburgh Penguins" },
//     { code: "ANA", name: "Anaheim Ducks" },
//     { code: "BUF", name: "Buffalo Sabres" },
//     { code: "SEA", name: "Seattle Kraken" },
//     { code: "BOS", name: "Boston Bruins" },
//     { code: "PHI", name: "Philadelphia Flyers" },
//     { code: "NSH", name: "Nashville Predators" },
//     { code: "CHI", name: "Chicago Blackhawks" },
//     { code: "SJS", name: "San Jose Sharks" },
//   ];

//   const fetchSchedule = async () => {
//     try {
//       const res = await axios.get(
//         `https://corsproxy.io/?https://api-web.nhle.com/v1/club-schedule/${teamCode}/month/now`
//       );

//       const rawSchedule = res.data.games;
//       const convertedSchedule = convertScheduleToTimezone(
//         rawSchedule,
//         timezone,
//         teamCode
//       );
//       setGames(convertedSchedule);
//     } catch (err) {
//       console.error("Error fetching schedule:", err);
//     }
//   };

//   return (
//     <div className="App">
//       <div className="container">
//         <h1>PuckPosters 🏒</h1>

//         <select value={teamCode} onChange={(e) => setTeamCode(e.target.value)}>
//           {teamOptions.map((team) => (
//             <option key={team.code} value={team.code}>
//               {team.name}
//             </option>
//           ))}
//         </select>

//         <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
//           <option value="America/St_Johns">Newfoundland (NST)</option>
//           <option value="America/Halifax">Halifax (AST)</option>
//           <option value="America/Toronto">New York, Toronto (EST)</option>
//           <option value="America/Chicago">Chicago, Winnipeg (CST)</option>
//           <option value="America/Denver">Denver, Edmonton (MST)</option>
//           <option value="America/Phoenix">Phoenix (MST, no DST)</option>
//           <option value="America/Los_Angeles">
//             Los Angeles, Vancouver (PST)
//           </option>
//           <option value="America/Anchorage">Anchorage (AKST)</option>
//           <option value="America/Adak">Adak (HAST)</option>
//           <option value="Pacific/Honolulu">Honolulu (HST)</option>
//           <option value="Europe/London">London (GMT)</option>
//           <option value="Europe/Paris">Paris, Berlin, Madrid (CET)</option>
//           <option value="Europe/Helsinki">Helsinki, Riga (EET)</option>
//           <option value="Europe/Moscow">Moscow (MSK)</option>
//           <option value="Asia/Dubai">Dubai (GST)</option>
//           <option value="Asia/Kolkata">Delhi, Kolkata (IST)</option>
//           <option value="Asia/Shanghai">Shanghai, Singapore (CST)</option>
//           <option value="Asia/Tokyo">Tokyo (JST)</option>
//           <option value="Asia/Seoul">Seoul (KST)</option>
//           <option value="Australia/Perth">Perth (AWST)</option>
//           <option value="Australia/Adelaide">Adelaide (ACST)</option>
//           <option value="Australia/Sydney">Sydney, Melbourne (AEST)</option>
//           <option value="Pacific/Auckland">Auckland (NZST)</option>
//           <option value="America/Sao_Paulo">SÃ£o Paulo (BRT)</option>
//           <option value="America/Argentina/Buenos_Aires">
//             Buenos Aires (ART)
//           </option>
//           <option value="Africa/Cairo">Cairo (EET)</option>
//           <option value="Africa/Johannesburg">Johannesburg (SAST)</option>

//           {/* add more as needed */}
//         </select>

//         <button onClick={fetchSchedule}>Get Schedule</button>

//         {games.length > 0 && (
//           <div className="poster">
//             <h2>{teamOptions.find((t) => t.code === teamCode)?.name}</h2>
//             <h3>Schedule for {games[0].gameDate.slice(0, 7)}</h3>

//             <div className="games">
//               {games.map((game) => (
//                 <div key={game.id} className="game">
//                   📅 {game.localTime} — {game.isHome ? "vs" : "@"}{" "}
//                   {game.opponent}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

//
// export default App;
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { convertScheduleToTimezone } from "./utils/scheduleUtils";
import PosterPreview from "./components/PosterPreview";
import { teamMeta } from "./data/teamMeta";
import { toPng } from "html-to-image";
import download from "downloadjs";

function App() {
  const [teamCode, setTeamCode] = useState("TOR");
  const [games, setGames] = useState([]);
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  // --- Season months: Sep–Apr only ---
  // AFTER
  const today = new Date();
  const thisYear = today.getFullYear();
  const thisMonthNum = today.getMonth() + 1; // 1..12
  const isInSeasonNow = thisMonthNum >= 9 || thisMonthNum <= 4; // Sep..Apr

  // If in season: start = thisYear (Sep–Dec) or lastYear (Jan–Apr path).
  // If out of season (May–Aug): start = THIS YEAR (upcoming season).

  const seasonStartYear = isInSeasonNow
    ? thisMonthNum >= 9
      ? thisYear
      : thisYear - 1
    : thisYear;

  const buildSeasonMonthOptions = (startYear) => {
    const months = [9, 10, 11, 12, 1, 2, 3, 4];
    return months.map((m) => {
      const year = m >= 9 ? startYear : startYear + 1;
      const value = `${year}-${String(m).padStart(2, "0")}`;
      const label = new Date(year, m - 1, 1).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });
      return { value, label };
    });
  };
  const monthOptions = buildSeasonMonthOptions(seasonStartYear);

  // Default: 'now' if in-season; otherwise September of the UPCOMING season
  const defaultMonth = isInSeasonNow ? "now" : `${seasonStartYear}-09`;

  const [month, setMonth] = useState(defaultMonth); // "now" or "YYYY-MM"

  // Build team options from meta
  const teamOptions = Object.entries(teamMeta).map(([code, data]) => ({
    code,
    name: data.name,
  }));

  // Month label helpers (avoid TZ drift)
  const MONTHS = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  const getMonthLabelFromGameDate = (gameDate) => {
    const d = new Date(gameDate);
    return MONTHS[d.getUTCMonth()];
  };

  const getMonthLabelFromValue = (ym) => {
    const [, mm] = ym.split("-");
    return MONTHS[Number(mm) - 1];
  };

  const fetchSchedule = async () => {
    try {
      const monthSegment = month === "now" ? "now" : month; // 'now' or 'YYYY-MM'
      const url = `https://corsproxy.io/?https://api-web.nhle.com/v1/club-schedule/${teamCode}/month/${monthSegment}`;
      const res = await axios.get(url);
      const raw = res.data.games || [];
      const converted = convertScheduleToTimezone(raw, timezone, teamCode);
      setGames(converted);
    } catch (err) {
      console.error("Error fetching schedule:", err);
    }
  };

  // Auto-fetch when team/month/timezone changes
  useEffect(() => {
    fetchSchedule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamCode, month, timezone]);

  // Poster header label
  const monthLabel =
    month !== "now"
      ? getMonthLabelFromValue(month)
      : games[0]
      ? getMonthLabelFromGameDate(games[0].gameDate)
      : "";

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
      pixelRatio: 2,
    });

    download(dataUrl, `${teamCode}-${monthLabel.replace(/\s+/g, "")}.png`);
  };

  return (
    <>
      {/* Main layout */}
      <main className="container">
        <div className="row g-4 align-items-start justify-content-center mt-1">
          {/* Controls column */}
          <div className="col-auto">
            <div className="card shadow-sm">
              <div className="card-body">

                <h1 id="puckposters-title" className="h4 btn btn-dark mb-3">PUCKPOSTERS 🏒</h1>

                <h2 className="h5 mb-3">Generate</h2>

                {/* Team selector */}
                <div className="mb-3">
                  <label className="form-label">Team</label>
                  <select
                    className="form-select"
                    value={teamCode}
                    onChange={(e) => setTeamCode(e.target.value)}
                  >
                    {teamOptions.map((team) => (
                      <option key={team.code} value={team.code}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Month selector */}
                <div className="mb-3">
                  <label className="form-label">Month</label>
                  <select
                    className="form-select"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    {isInSeasonNow && (
                      <option value="now">Current Month (auto)</option>
                    )}
                    {monthOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Timezone selector */}
                <div className="mb-3">
                  <label className="form-label">Timezone</label>
                  <select
                    className="form-select"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                  >
                    <option value="America/St_Johns">Newfoundland (NST)</option>
                    <option value="America/Halifax">Halifax (AST)</option>
                    <option value="America/Toronto">
                      New York, Toronto (EST)
                    </option>
                    <option value="America/Chicago">
                      Chicago, Winnipeg (CST)
                    </option>
                    <option value="America/Denver">
                      Denver, Edmonton (MST)
                    </option>
                    <option value="America/Phoenix">
                      Phoenix (MST, no DST)
                    </option>
                    <option value="America/Los_Angeles">
                      Los Angeles, Vancouver (PST)
                    </option>
                    <option value="America/Anchorage">Anchorage (AKST)</option>
                    <option value="America/Adak">Adak (HAST)</option>
                    <option value="Pacific/Honolulu">Honolulu (HST)</option>
                    <option value="Europe/London">London (GMT)</option>
                    <option value="Europe/Paris">
                      Paris, Berlin, Madrid (CET)
                    </option>
                    <option value="Europe/Helsinki">
                      Helsinki, Riga (EET)
                    </option>
                    <option value="Europe/Moscow">Moscow (MSK)</option>
                    <option value="Asia/Dubai">Dubai (GST)</option>
                    <option value="Asia/Kolkata">Delhi, Kolkata (IST)</option>
                    <option value="Asia/Shanghai">
                      Shanghai, Singapore (CST)
                    </option>
                    <option value="Asia/Tokyo">Tokyo (JST)</option>
                    <option value="Asia/Seoul">Seoul (KST)</option>
                    <option value="Australia/Perth">Perth (AWST)</option>
                    <option value="Australia/Adelaide">Adelaide (ACST)</option>
                    <option value="Australia/Sydney">
                      Sydney, Melbourne (AEST)
                    </option>
                    <option value="Pacific/Auckland">Auckland (NZST)</option>
                    <option value="America/Sao_Paulo">São Paulo (BRT)</option>
                    <option value="America/Argentina/Buenos_Aires">
                      Buenos Aires (ART)
                    </option>
                    <option value="Africa/Cairo">Cairo (EET)</option>
                    <option value="Africa/Johannesburg">
                      Johannesburg (SAST)
                    </option>
                  </select>
                </div>

                {/* Export Button */}
                <button
                  id="export-btn"
                  className="btn btn-dark mb-3"
                  onClick={handleExport}
                >
                  🗃️ Download Poster
                </button>
              </div>
            </div>
          </div>

          {/* Poster column */}
          <div className="col-auto d-flex justify-content-center">
            {games.length > 0 && (
              <div className="poster-guard">
                <PosterPreview
                  teamCode={teamCode}
                  games={games}
                  monthLabel={monthLabel}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
