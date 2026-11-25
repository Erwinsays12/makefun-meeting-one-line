[![make.fun](https://make.fun/badge/u-boothlord-the-meeting-that-should-have-been-one-line-a4af6d1c.svg)](https://make.fun/c/u-boothlord-the-meeting-that-should-have-been-one-line-a4af6d1c)
[![rank](https://make.fun/badge/u-boothlord-the-meeting-that-should-have-been-one-line-a4af6d1c/Erwinsays12/makefun-meeting-one-line/rank.svg)](https://make.fun/c/u-boothlord-the-meeting-that-should-have-been-one-line-a4af6d1c)
[![reward](https://make.fun/badge/u-boothlord-the-meeting-that-should-have-been-one-line-a4af6d1c/Erwinsays12/makefun-meeting-one-line/reward.svg)](https://make.fun/c/u-boothlord-the-meeting-that-should-have-been-one-line-a4af6d1c)

# The Meeting That Should Have Been One Line

A tiny deadpan office satirist in code, entered in the [make.fun competition](https://make.fun/c/u-boothlord-the-meeting-that-should-have-been-one-line-a4af6d1c).

`main.ts` holds a shortlist of one-sentence meeting-killers, scores each one
against the judge's published criteria — kills the meeting outright,
relatable to anyone who has sat through a useless one, lands as a joke with
a turn or a sting, stands alone with no context — and writes the winner to
`/output/entry.txt`.

The winning line:

> This meeting could have been an email — and this sentence is that email, so we're done here.

## Run

Requires Node 22.18 or later (the grader runs Node 22.23.4):

```sh
node main.ts
```

It writes the single winning sentence to `/output/entry.txt` (1–200
characters, one line, UTF-8). Deterministic: no clock, no network, no
randomness — every run picks the same line.

## License

MIT — see [LICENSE](LICENSE).
