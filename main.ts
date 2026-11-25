// The Meeting That Should Have Been One Line
//
// A tiny deadpan office satirist in code. It holds a shortlist of
// one-sentence meeting-killers, scores each one against the judge's
// published criteria — kills the meeting outright, relatable to anyone
// who has sat through a useless one, lands as a joke with a turn or a
// sting, stands alone with no context — and writes the winner to
// /output/entry.txt.
//
// Deterministic: no clock, no network, no randomness. The same run
// always picks the same line, so both graded runs agree byte for byte.

import { mkdirSync, writeFileSync } from "node:fs";

type Scores = {
  /** After this line, no one could justify holding the meeting at all. */
  killsMeeting: number;
  /** Drawn from real office life; anyone who has sat through a useless
   *  meeting recognises it instantly. */
  relatable: number;
  /** Lands as a joke, with a turn or a sting, rather than merely true. */
  jokeTurn: number;
  /** Stands alone as a single line, needing no context or explanation. */
  standsAlone: number;
};

type Candidate = { line: string; scores: Scores };

// Weights follow the judge's brief: killing the meeting matters most,
// then relatability and the joke, then standing alone.
const WEIGHTS: Scores = { killsMeeting: 3, relatable: 2, jokeTurn: 2, standsAlone: 1 };

const CANDIDATES: Candidate[] = [
  {
    // The line IS the replacement: it claims to be the email, delivers a
    // decision, and adjourns the meeting in the same breath.
    line: "This meeting could have been an email \u2014 and this sentence is that email, so we're done here.",
    scores: { killsMeeting: 5, relatable: 5, jokeTurn: 5, standsAlone: 5 },
  },
  {
    line: "We spent an hour deciding nothing, so here is the decision: we are done.",
    scores: { killsMeeting: 4, relatable: 4, jokeTurn: 3, standsAlone: 5 },
  },
  {
    line: "The update is that nothing changed, nobody decided anything, and we all just lost an hour.",
    scores: { killsMeeting: 3, relatable: 5, jokeTurn: 3, standsAlone: 4 },
  },
  {
    line: "If we had read the document instead of meeting about the document, we would all be home by now.",
    scores: { killsMeeting: 3, relatable: 4, jokeTurn: 4, standsAlone: 4 },
  },
  {
    line: "This meeting has no agenda, no decision, and no end \u2014 so I am ending it with this sentence.",
    scores: { killsMeeting: 4, relatable: 3, jokeTurn: 3, standsAlone: 4 },
  },
];

function weightedScore(scores: Scores): number {
  return (
    scores.killsMeeting * WEIGHTS.killsMeeting +
    scores.relatable * WEIGHTS.relatable +
    scores.jokeTurn * WEIGHTS.jokeTurn +
    scores.standsAlone * WEIGHTS.standsAlone
  );
}

function pickWinner(candidates: Candidate[]): Candidate {
  let best = candidates[0];
  let bestScore = weightedScore(best.scores);
  for (const candidate of candidates.slice(1)) {
    const score = weightedScore(candidate.scores);
    // Strictly greater wins, so the earliest line takes any tie.
    if (score > bestScore) {
      best = candidate;
      bestScore = score;
    }
  }
  return best;
}

function validate(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1 to 200 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

const winner = pickWinner(CANDIDATES);
for (const candidate of CANDIDATES) {
  console.log(`  ${weightedScore(candidate.scores)}  ${candidate.line}`);
}
validate(winner.line);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", winner.line, "utf8");
console.log(`wrote ${winner.line.length} chars to /output/entry.txt`);
console.log(winner.line);
