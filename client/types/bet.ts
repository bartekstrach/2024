import { PARTICIPANT } from "@client/enums";

export type Bet = {
    id: string;
    matchId: string;
    participant: PARTICIPANT;
    goalsFor: number;
    goalsAgainst: number;
}