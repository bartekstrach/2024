import { POINTS, SCALE } from "@enums";
import { Bet, Bets, Match, Scoreboard } from "@types";
import getParticipants from "@utils/participants";

const compute = (matches: Array<Match>, bets: Array<Bets>): Map<string, number> => {
    const scores: Map<string, number> = new Map();

    if (!matches || matches?.length === 0 || !bets) {
        return scores;
    }

    const getParticipantBets = (participant: string, bets: Array<Bets>): Array<Bet> => bets?.find(b => b.participant === participant)?.bets ?? [];

    matches.forEach(match => {
        getParticipants().forEach(participant => {
            getParticipantBets(participant, bets)?.forEach(bet => {
                if (bet.matchId === match.id) {
                    const score = scores.get(participant) || 0;
                    scores.set(participant, score + getBetPoints(bet, match));
                }
            })
        });
    });

    return scores;
};

const mapScoreboardToArray = (scores: Map<string, number>): Array<Scoreboard> => {
    return Array.from(scores).map(([participant, points]) => ({ participant, points }));
};

const sortByPoints = (scoreboard: Array<Scoreboard>): Array<Scoreboard> => [...scoreboard].sort((s1, s2) => s2.points - s1.points);

const assignRanks = (scoreboard: Array<Scoreboard>): Array<Scoreboard> => {
    let currentRank = 0;
    let currentPoints;

    const assignedRangs = [...scoreboard].map(scoreboard => {
        const { points } = scoreboard;

        if (currentPoints !== points) {
            currentRank += 1;
            currentPoints = points
        }       

        return ({
        ...scoreboard,
        rank: currentRank
        })
    });

    return assignedRangs;
};

const getScoreboard = (matches: Array<Match>, bets: Array<Bets>): Array<Scoreboard> => {
    const computed = compute(matches, bets);
    const scoreboard = mapScoreboardToArray(computed);
    const sortedByPoints = sortByPoints(scoreboard); 
    const assignedRangs = assignRanks(sortedByPoints);
    return assignedRangs;
};

const getBetPoints = (bet: Bet, match: Match): POINTS => {
    if (
        match.goalsFor === undefined || match.goalsFor === null || match.goalsAgainst === undefined || match.goalsAgainst === null ||
        bet.goalsFor === undefined || bet.goalsFor === null || bet.goalsAgainst === undefined || bet.goalsAgainst === null
    )
        return POINTS.ZERO;

    const betScale = getScale(bet.goalsFor, bet.goalsAgainst);
    const matchScale = getScale(match.goalsFor, match.goalsAgainst);

    if (betScale === matchScale) {
        if (bet.goalsFor === match.goalsFor && bet.goalsAgainst === match.goalsAgainst) {
            return POINTS.THREE;
        }

        return POINTS.ONE;
    }

    return POINTS.ZERO;
};

const getScale = (goalsFor: number, goalsAgainst: number): SCALE => {
    if (goalsFor === goalsAgainst) {
        return SCALE.DRAW;
    }

    if (goalsFor > goalsAgainst) {
        return SCALE.HOME;
    }

    return SCALE.AWAY;
};

export default getScoreboard;
