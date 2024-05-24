import { TEAM, STAGE } from "@client/enums";
import { Group } from "./group";

export type Match = {
    id: string;
    matchNo: number;
    homeTeam: TEAM;
    awayTeam: TEAM;
    stage: STAGE;
    group?: Group;
    dateTime: string;
    goalsFor?: number;
    goalsAgainst?: number;
}