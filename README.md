# Pre-defined
* participants
* teams

# API
```typescript
saveBet({
    matchId: string,
    participantId: string,
    goalsFor: number,
    goalsAgainst: number
}): number // betId

updateBet({
    betId: number,
    goalsFor?: number,
    goalsAgainst?: number,
    points?: POINTS
}): void

removeBet({ betId: number }): void
```

```typescript
sendMatchResult({
    matchId: string,
    goalsFor: number,
    goalsAgainst: number
}): void // then trigger computing

updateMatchResult({
    matchId: string,
    goalsFor: number,
    goalsAgainst: number
}): void
```

```typescript
compute(): void
```

```typescript
getCurrentTable(): Scoreboard[]
```

```typescript
getCurrentScoreboardFor({ participantId: string; }): Scoreboard;
// getCurrentScoreboard(): Scoreboard;
```

```typescript
getBets(): Bet[]
```

```typescript
// bartekstra.ch/wc22?p=bartek - highlights
```

## Technical
```typescript
auth
```
```typescript
heartbeat
```
```typescript
recover
```

# Entities

## Bet
```typescript
type Bet = {
    id: string;
    matchId: string;
    participant: PARTICIPANT;
    goalsFor: number;
    goalsAgainst: number;
}
```

## Match
```typescript
type Match = {
    id: string;
    matchNo: number;
    homeTeam: TEAM;
    awayTeam: TEAM;
    stage: STAGE;
    dateTime: string;
    goalsFor?: number;
    goalsAgainst?: number;
    scale?: SCALE;
}
```

# Enums
```typescript
enum STAGE {
    GROUP,
    ROUND_OF_16,
    QUARTER,
    SEMI,
    THIRD,
    FINAL
}

enum POINTS {
    ZERO = 0,
    ONE = 1,
    THREE = 3
}

enum TEAM {
    POLAND,
    ...
}

enum SCALE {
    HOME = 1,
    DRAW = 0,
    AWAY = -1
}

enum PARTICIPANT {
    ...
}
```
