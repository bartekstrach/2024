import React, { useEffect, useState } from "react";
import { Bet, Bets, Match, Scoreboard } from "@types";
import BetMatrix from "@components/bet-matrix";
import ScoreboardComponent from "@components/scoreboard";
import getParticipants from "@utils/participants";
import getScoreboard from "@utils/compute";
import { getLatestMatch, getLatestMatchText } from "@utils/matches";
import { getTextSummary } from "@utils/summary";

const App = () => {
  const [bets, setBets] = useState<Array<Bets>>([]);
  const [matches, setMatches] = useState<Array<Match>>([]);
  const [scoreboard, setScoreboard] = useState<Array<Scoreboard>>([]);
  const [latestMatch, setLatestMatch] = useState<Match>(null);

  useEffect(() => {
    fetch("assets/matches.json")
      .then((res) => res.json())
      .then((data: Array<Match>) => {
        setMatches(data);
      })
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    getParticipants().forEach((participant) => {
      fetch(`assets/bets/${participant.toLocaleLowerCase()}.json`)
        .then((res) => res.json())
        .then((participantBets: Array<Bet>) => {
          setBets((prevBets) => [
            ...prevBets,
            { participant, bets: participantBets },
          ]);
        })
        .catch((e) => console.log(e));
    });
  }, []);

  useEffect(() => {
    if (matches && bets) {
      setScoreboard(getScoreboard(matches, bets));
    }
  }, [matches, bets]);

  useEffect(() => {
    if (matches && matches?.length > 0) {
      setLatestMatch(getLatestMatch(matches));
    }
  }, [matches]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      getTextSummary(latestMatch, matches, scoreboard),
    );
  };

  return (
    <div>
      <h1>UEFA EURO 2024 • typowanie</h1>
      <h2>
        Tabela
        {latestMatch ? ` ${getLatestMatchText(latestMatch, matches)}` : ""}
      </h2>
      <ScoreboardComponent
        bets={bets}
        matches={matches}
        scoreboard={scoreboard}
      />
      <h2>Typy</h2>
      {/* <div className="link-to-drive">
        Karty z typami do podejrzenia{" "}
        <a
          href="https://drive.google.com/drive/folders/11zvzq60Dr7u5-eGAB2_D7qUtCoGnx98t?usp=sharing"
          target="_blank"
          rel="noreferrer"
        >
          tutaj
        </a>
        .
      </div> */}
      <BetMatrix bets={bets} matches={matches} scoreboard={scoreboard} />
      <br />
      <button onClick={copyToClipboard}>Kopiuj</button>
    </div>
  );
};

export default App;
