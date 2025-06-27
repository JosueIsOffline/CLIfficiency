import { SingleBar, Presets } from "cli-progress";

export class ProgressBar {
  private bar: SingleBar;
  private totalTime: number;

  constructor() {
    this.bar = new SingleBar(
      {
        format:
          "{phase} [{bar}] {percentage}% | (#{session}) {remaining} time remaining",
        barCompleteChar: "█",
        barIncompleteChar: "▁",
        hideCursor: true,
      },
      Presets.shades_classic,
    );

    this.totalTime = 0;
  }

  start(totalTime: number, phase: string, session: number): void {
    this.totalTime = totalTime;
    this.bar.start(totalTime, 0, {
      session,
      phase,
      remaining: this.formatTime(totalTime),
    });
  }

  update(remainingTime: number, phase: string): void {
    const elapsed = this.totalTime - remainingTime;
    this.bar.update(elapsed, {
      phase,
      remaining: this.formatTime(remainingTime),
    });
  }

  stop(): void {
    this.bar.stop();
  }

  private formatTime(seconds: number) {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  }
}
