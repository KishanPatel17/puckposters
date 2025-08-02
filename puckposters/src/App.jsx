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

// export default App;

import { useState } from "react";
import axios from "axios";
import "./App.css";
import { convertScheduleToTimezone } from "./utils/scheduleUtils";
import PosterPreview from "./components/PosterPreview";
import { teamMeta } from "./data/teamMeta";

function App() {
  const [teamCode, setTeamCode] = useState("TOR");
  const [games, setGames] = useState([]);
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const teamOptions = Object.entries(teamMeta).map(([code, data]) => ({
    code,
    name: data.name,
  }));

  const fetchSchedule = async () => {
    try {
      const res = await axios.get(
        `https://corsproxy.io/?https://api-web.nhle.com/v1/club-schedule/${teamCode}/month/2025-10`
      );
      const rawSchedule = res.data.games;
      const convertedSchedule = convertScheduleToTimezone(
        rawSchedule,
        timezone,
        teamCode
      );
      setGames(convertedSchedule);
    } catch (err) {
      console.error("Error fetching schedule:", err);
    }
  };

  const getMonthLabelFromGameDate = (gameDate) => {
    const d = new Date(gameDate);
    console.log(d.toLocaleString("en-US", { month: "long" }).toUpperCase());
    return d.toLocaleString("en-US", { month: "long" }).toUpperCase();
  };

  return (
    <div className="App">
      <div className="container">
        <h1>PuckPosters 🏒</h1>

        <select value={teamCode} onChange={(e) => setTeamCode(e.target.value)}>
          {teamOptions.map((team) => (
            <option key={team.code} value={team.code}>
              {team.name}
            </option>
          ))}
        </select>

        <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
          <option value="America/St_Johns">Newfoundland (NST)</option>
          <option value="America/Halifax">Halifax (AST)</option>
          <option value="America/Toronto">New York, Toronto (EST)</option>
          <option value="America/Chicago">Chicago, Winnipeg (CST)</option>
          <option value="America/Denver">Denver, Edmonton (MST)</option>
          <option value="America/Phoenix">Phoenix (MST, no DST)</option>
          <option value="America/Los_Angeles">Los Angeles, Vancouver (PST)</option>
          <option value="America/Anchorage">Anchorage (AKST)</option>
          <option value="America/Adak">Adak (HAST)</option>
          <option value="Pacific/Honolulu">Honolulu (HST)</option>
          <option value="Europe/London">London (GMT)</option>
          <option value="Europe/Paris">Paris, Berlin, Madrid (CET)</option>
          <option value="Europe/Helsinki">Helsinki, Riga (EET)</option>
          <option value="Europe/Moscow">Moscow (MSK)</option>
          <option value="Asia/Dubai">Dubai (GST)</option>
          <option value="Asia/Kolkata">Delhi, Kolkata (IST)</option>
          <option value="Asia/Shanghai">Shanghai, Singapore (CST)</option>
          <option value="Asia/Tokyo">Tokyo (JST)</option>
          <option value="Asia/Seoul">Seoul (KST)</option>
          <option value="Australia/Perth">Perth (AWST)</option>
          <option value="Australia/Adelaide">Adelaide (ACST)</option>
          <option value="Australia/Sydney">Sydney, Melbourne (AEST)</option>
          <option value="Pacific/Auckland">Auckland (NZST)</option>
          <option value="America/Sao_Paulo">São Paulo (BRT)</option>
          <option value="America/Argentina/Buenos_Aires">Buenos Aires (ART)</option>
          <option value="Africa/Cairo">Cairo (EET)</option>
          <option value="Africa/Johannesburg">Johannesburg (SAST)</option>
        </select>

        <button onClick={fetchSchedule}>Get Schedule</button>

        {games.length > 0 && (
          <PosterPreview
            teamCode={teamCode}
            games={games}
            monthLabel={getMonthLabelFromGameDate(games[0].gameDate)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
