import { POINTS, SCALE } from "@client/enums";
import { Bet, Match } from "@client/types";

const getScale = (goalsFor: number, goalsAgainst: number): SCALE => {
  if (goalsFor === goalsAgainst) {
    return SCALE.DRAW;
  }

  if (goalsFor > goalsAgainst) {
    return SCALE.HOME;
  }

  return SCALE.AWAY;
};

const getBetPoints = (bet: Bet, match: Match): POINTS => {
  if (
    match?.goalsFor === undefined ||
    match?.goalsFor === null ||
    match?.goalsAgainst === undefined ||
    match?.goalsAgainst === null ||
    bet.goalsFor === undefined ||
    bet.goalsFor === null ||
    bet.goalsAgainst === undefined ||
    bet.goalsAgainst === null
  )
    return null;

  const betScale = getScale(bet.goalsFor, bet.goalsAgainst);
  const matchScale = getScale(match?.goalsFor, match?.goalsAgainst);

  if (betScale === matchScale) {
    if (
      bet.goalsFor === match?.goalsFor &&
      bet.goalsAgainst === match?.goalsAgainst
    ) {
      return POINTS.THREE;
    }

    return POINTS.ONE;
  }

  return POINTS.ZERO;
};

export { getBetPoints };
