import { Bet, Bets, Match } from "@types";
import getParticipants from "@utils/participants";

export const readBets = (): Bets => {
  let bets: Bets;

  getParticipants().forEach(participant => {
    fetch(`data/bets/${participant.toLocaleLowerCase()}.json`)
      .then((res) => res.json())
      .then((participantBets: Array<Bet>) => {
        bets[participant] = participantBets;
      }).catch(e => console.log(e));
  });
  
  return bets;
};

export const readMatches = (): Array<Match> => {
  let matches: Array<Match>;

  fetch(`data/matches.json`)
    .then(res => res.json())
    .then((data: Array<Match>) => {
      matches = data;
    }).catch(e => console.error(e));
    
  return matches;
};
