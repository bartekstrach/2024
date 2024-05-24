import { PARTICIPANT } from "@enums";
import { Bets, Match, Scoreboard } from "@types";
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

  return (
    <table className="scoreboard">
      <thead>
        <tr>
          <th className="rank">Miejsce</th>
          <th className="participant">Imię</th>
          <th className="points">Punkty</th>
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
              <td className="rank">{printRank ? `${getRankEmoji(rank)}` : ""}</td>
              <td className="participant">{PARTICIPANT[participant]}</td>
              <td className="points">{points}</td>
            </tr>
          )
        }
        )}
      </tbody>
    </table>
  );
};

export default Scoreboard;
