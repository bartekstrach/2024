import { TEAM } from "@enums/teams";
import { Match } from "@types";
import { format } from "./date";

const getLatestMatch = (matches: Array<Match>): Match => {
  let match: Match;

  matches.forEach((m) => {
    if (m?.goalsFor !== null && m?.goalsAgainst !== null) {
      match = m;
    }
  });

  return match;
};

const getLatestMatchText = (
  latestMatch: Match,
  matches: Array<Match>,
): string => {
  if (!latestMatch) {
    return "";
  }

  const { homeTeam, awayTeam, dateTime } = latestMatch;

  const latestMatches = matches?.filter((m) => m?.dateTime === dateTime);
  const isLastGroupStage = latestMatches?.length > 1;

  if (isLastGroupStage) {
    const text = latestMatches
      .map((m) => `${TEAM[m.homeTeam]} - ${TEAM[m.awayTeam]}`)
      .join(" & ");
    return `po meczach ${text} (${format(dateTime)})`;
  }

  return `po meczu ${TEAM[homeTeam]} - ${TEAM[awayTeam]} (${format(dateTime)})`;
};

const getNextMatches = (matches: Array<Match>): Array<Match> => {
  const match = matches.find((m) => m?.matchNo === 50);
  return matches.filter((m) => m.dateTime === match.dateTime);
};

export { getLatestMatch, getLatestMatchText, getNextMatches };
