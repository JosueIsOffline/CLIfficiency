export const presets: Record<
  string,
  {
    work: number;
    short: number;
    long: number;
    sessions: number;
  }
> = {
  fast: { work: 1, short: 1, long: 2, sessions: 2 },
  focus: { work: 50, short: 10, long: 30, sessions: 4 },
  default: { work: 25, short: 5, long: 15, sessions: 4 },
};
