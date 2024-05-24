import React, { useEffect, useState } from "react";
import { Bet, Bets, Match, Scoreboard } from "./types";
import BetMatrix from "./components/bet-matrix";
import ScoreboardComponent from "./components/scoreboard";
import getParticipants from "./utils/participants";
import getScoreboard from "@client/utils/compute";
import { getLatestMatch, getLatestMatchText } from "./utils/matches";
import { getTextSummary } from "./utils/summary";

const App = () => {
  const [bets, setBets] = useState<Array<Bets>>([]);
  const [matches, setMatches] = useState<Array<Match>>([]);
  const [scoreboard, setScoreboard] = useState<Array<Scoreboard>>([]);
  const [latestMatch, setLatestMatch] = useState<Match>(null);

  useEffect(()=>{
    fetch("data/matches.json")
      .then((res) => res.json())
      .then((data: Array<Match>) => {
        setMatches(data);
      }).catch(e => console.error(e));
  },[]);

  useEffect(() => {
    getParticipants().forEach((participant) => {
      fetch(`data/bets/${participant.toLocaleLowerCase()}.json`)
        .then((res) => res.json())
        .then((participantBets: Array<Bet>) => {
          setBets(prevBets => [...prevBets, { participant, bets: participantBets }])
        }).catch(e => console.log(e));
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
    navigator.clipboard.writeText(getTextSummary(latestMatch, matches, scoreboard));
  };

  return (
    <div>
      <h1>FIFA World Cup 2022 - typowanie</h1>
      <h2>Tabela{latestMatch ? ` ${getLatestMatchText(latestMatch, matches)}` : ""}</h2>
      <ScoreboardComponent bets={bets} matches={matches} scoreboard={scoreboard} />
      <h2>Typy</h2>
      <div className="link-to-drive">
        Karty z typami do podejrzenia{" "}
        <a
          href="https://drive.google.com/drive/folders/1AtJy06y9oMqnM9iLU4CoVBB3LXo77Evn?usp=share_link"
          target="_blank"
        >
          tutaj
        </a>
        .
      </div>
      <BetMatrix bets={bets} matches={matches} scoreboard={scoreboard} />
      <br />
      <button onClick={copyToClipboard}>Kopiuj</button>
    </div>
  );
};

export default App;
