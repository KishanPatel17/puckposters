export function convertScheduleToTimezone(games, timezone, teamCode) {
  return games.map((game) => {
    const dateUTC = new Date(game.startTimeUTC);

    // full string for list view
    const localTime = dateUTC.toLocaleString("en-US", {
      timeZone: timezone,
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    // compact bits for tiles
    const shortDate = dateUTC.toLocaleString("en-US", {
      timeZone: timezone,
      weekday: "short",
      month: "short",
      day: "numeric",
    }); // "Sun, Dec 3"

    const localTimeShort = dateUTC.toLocaleString("en-US", {
      timeZone: timezone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }); // "7:00 PM"

    const isHome = game.homeTeam.abbrev === teamCode;
    const opponent = isHome ? game.awayTeam : game.homeTeam;
    // const opponentName = `${opponent.placeName.default} ${
    //   opponent.commonName?.default ?? ""
    // }`.trim();
    const opponentName = [
      opponent?.placeName?.default,
      opponent?.commonName?.default,
    ]
      .filter(Boolean)
      .join(" ")
      .trim();
    const opponentLogo = opponent.logo || opponent.darkLogo || null;
    const abbrev = opponent.abbrev;

    return {
      ...game,
      localTime,
      localTimeShort,
      shortDate,
      isHome,
      opponent: opponentName,
      opponentLogo,
      abbrev,
    };
  });
}
