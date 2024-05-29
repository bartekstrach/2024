import { PARTICIPANT } from "@enums";

export type Bet = {
  id: string;
  matchId: string;
  participant: PARTICIPANT;
  goalsFor: number;
  goalsAgainst: number;
};
