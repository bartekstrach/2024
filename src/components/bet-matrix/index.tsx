import { PARTICIPANT, STAGE, TEAM } from "@enums";
import { Bet, Bets, Match, Scoreboard } from "@types";
import { getBetPoints } from "@utils/calc";
import { format } from "@utils/date";
import getParticipants from "@utils/participants";
import React, { useMemo } from "react";

interface Props {
  bets: Array<Bets>;
  matches: Array<Match>;
  scoreboard: Array<Scoreboard>;
}

const BetMatrix = ({ bets, matches, scoreboard }: Props) => {
  if (!bets || !matches || matches?.length === 0) {
    return null;
  }

  const participants = useMemo(() => getParticipants(), []);

  const isMatchUnknown = (match: Match): boolean =>
    TEAM[match?.homeTeam] === TEAM.TBD || TEAM[match?.awayTeam] === TEAM.TBD;
  const getStageOrGroup = (match: Match): string =>
    STAGE[match?.stage] === STAGE.GROUP ? match?.group : STAGE[match?.stage];

  const formatScore = (
    goalsFor: number,
    goalsAgainst: number,
    key?: string,
  ): JSX.Element =>
    (goalsFor !== undefined &&
      goalsFor !== null &&
      goalsAgainst !== undefined &&
      goalsAgainst !== null && (
        <span key={key}>{`${goalsFor}  :  ${goalsAgainst}`}</span>
      )) ??
    null;

  const getParticipantRank = (participant: string): number =>
    scoreboard.find((sb) => sb.participant === participant)?.rank ?? null;

  const getParticipantPoints = (participant: string): number =>
    scoreboard.find((sb) => sb.participant === participant)?.points ?? null;

  const getParticipantBets = (
    participant: string,
    bets: Array<Bets>,
  ): Array<Bet> => bets?.find((b) => b.participant === participant)?.bets ?? [];

  return (
    <table className="matrix">
      <thead>
        <tr>
          <th>Gr.</th>
          <th>Data</th>
          <th className="sticky-col">Mecz</th>
          <th>Wynik</th>
          {participants.map((participant) => (
            <th key={participant}>{PARTICIPANT[participant]}</th>
          ))}
          <th className="sticky-col">Mecz</th>
          <th>Gr.</th>
        </tr>
      </thead>
      <tbody>
        {matches?.map((match) =>
          isMatchUnknown(match) ? null : (
            <>
              {(match?.matchNo === 13 ||
                match?.matchNo === 25 ||
                match?.matchNo === 38 ||
                match?.matchNo === 45) && (
                <tr>
                  <th />
                  <th />
                  <th />
                  <th />
                  {participants.map((participant) => (
                    <th key={participant}>{PARTICIPANT[participant]}</th>
                  ))}
                </tr>
              )}
              <tr key={match?.id}>
                <td className="center">{getStageOrGroup(match)}</td>
                <td>{format(match?.dateTime)}</td>
                <td
                  className="match sticky-col"
                  key={`${match?.homeTeam}-${match?.awayTeam}`}
                >
                  <span>{TEAM[match?.homeTeam]}</span>
                  <span>-</span>
                  <span>{TEAM[match?.awayTeam]}</span>
                </td>
                <td className="bet final-score">
                  {formatScore(match?.goalsFor, match?.goalsAgainst)}
                </td>
                {participants.map((participant) =>
                  getParticipantBets(participant, bets)?.map((bet) =>
                    bet.matchId === match?.id ? (
                      <td className="bet" key={`${participant}-${bet.id}`}>
                        <span className="score">
                          {formatScore(bet.goalsFor, bet.goalsAgainst)}
                        </span>
                        <span className="points">
                          <b>{getBetPoints(bet, match)}</b>
                        </span>
                      </td>
                    ) : null,
                  ),
                )}
                <td
                  className="match sticky-col"
                  key={`${match?.homeTeam}-${match?.awayTeam}`}
                >
                  <span>{TEAM[match?.homeTeam]}</span>
                  <span>-</span>
                  <span>{TEAM[match?.awayTeam]}</span>
                </td>
                <td className="center">{getStageOrGroup(match)}</td>
              </tr>
            </>
          ),
        )}
      </tbody>
      <tfoot>
        <tr>
          <th />
          <th />
          <th className="sticky-col" />
          <th>Suma punktów</th>
          {participants.map((participant) => (
            <th key={participant}>{getParticipantPoints(participant)}</th>
          ))}
        </tr>
        <tr>
          <th />
          <th />
          <th className="sticky-col" />
          <th>Miejsce</th>
          {participants.map((participant) => (
            <th key={participant}>{getParticipantRank(participant)}.</th>
          ))}
        </tr>
        <tr>
          <th />
          <th />
          <th className="sticky-col" />
          <th />
          {participants.map((participant) => (
            <th key={participant}>{PARTICIPANT[participant]}</th>
          ))}
        </tr>
      </tfoot>
    </table>
  );
};

export default BetMatrix;
