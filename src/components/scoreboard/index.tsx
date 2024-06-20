import { PARTICIPANT, TEAM } from "@enums";
import { Bets, Match, Scoreboard } from "@types";
import { getNextMatches } from "@utils/matches";
import { getRankEmoji } from "@utils/summary";
import React from "react";

interface Props {
  bets: Array<Bets>;
  matches: Array<Match>;
  scoreboard: Array<Scoreboard>;
}

const Scoreboard = ({ bets, matches, scoreboard }: Props) => {
  if (!bets || matches?.length === 0) {
    return null;
  }

  let previousRank: number;
  const next = getNextMatches(matches);

  const getParticipantNextMatchBet = (
    participant: string,
    bets: Array<Bets>,
    matchId: string,
  ): string => {
    const bet =
      bets
        ?.find((b) => b.participant === participant)
        ?.bets.filter((b) => b.matchId === matchId)[0] ?? null;

    return `${bet.goalsFor}  :  ${bet.goalsAgainst}`;
  };

  return (
    <table className="scoreboard">
      <thead>
        <tr>
          <th className="rank">Miejsce</th>
          <th className="participant">Imię</th>
          <th className="points">Punkty</th>
          {next.map((m) => (
            <th className="next-game">
              Typ na mecz {TEAM[m.homeTeam]} - {TEAM[m.awayTeam]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {scoreboard?.map(({ participant, points, rank }) => {
          let printRank = false;
          if (previousRank !== rank) {
            printRank = true;
            previousRank = rank;
          }
          return (
            <tr key={participant}>
              <td className="rank">
                {printRank ? `${getRankEmoji(rank)}` : ""}
              </td>
              <td className="participant">{PARTICIPANT[participant]}</td>
              <td className="points">{points}</td>
              {next.map((m) => (
                <td className="next-game">
                  {getParticipantNextMatchBet(participant, bets, m.id)}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Scoreboard;
