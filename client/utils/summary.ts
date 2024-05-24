import { PARTICIPANT } from "@client/enums/participant";
import { Match } from "@client/types/match";
import { Scoreboard } from "@client/types/scoreboard";
import { getLatestMatchText } from "./matches";

const getTextSummary = (latestMatch: Match, matches: Array<Match>, scoreboard: Array<Scoreboard>): string => {
    if (!latestMatch || !scoreboard || scoreboard?.length === 0) {
        return "";
    }

    let text = `Aktualizacja ${getLatestMatchText(latestMatch, matches)}`;
    text += `\n\n`;
    text += `Tabela:`
    text += `\n`;

    const scores: Map<number, Array<string>> = new Map();

    scoreboard?.forEach(sb => {
        if (scores.has(sb.points)) {
            scores.set(sb.points, [...scores.get(sb.points), PARTICIPANT[sb.participant]]);
        } else {
            scores.set(sb.points, [PARTICIPANT[sb.participant]]);
        }
    });

    let currentRank = 1;
    scores.forEach((participants, points) => {
        text += `${getRankEmoji(currentRank)} ${points} pkt - ${participants.join(", ")}\n`
        currentRank++;
    });

    return text;
};

const getRankEmoji = (rank: number): string => {
    switch (rank) {
        case 1:
            return "🥇";
        case 2:
            return "🥈"
        case 3:
            return "🥉";
        default:
            return `${rank}.`;
    }
}

export { getTextSummary, getRankEmoji };
