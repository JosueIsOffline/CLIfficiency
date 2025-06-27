import ansiColors from "ansi-colors";
import { SingleBar, Presets } from "cli-progress";

export class ProgressBar {
  private bar: SingleBar;
  private totalTime: number;

  constructor() {
    this.bar = new SingleBar(
      {
        format: `${ansiColors.bold.magentaBright.italic("{phase}")} ${ansiColors.magenta("[{bar}]")} ${ansiColors.bold.magentaBright.italic("{percentage}%")} ${ansiColors.bold.magentaBright.italic("| (#{session}) {remaining} time remaining")}`,
        barCompleteChar: "\u2588",
        barIncompleteChar: "\u2591",
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

  getColoredPhase(phase: string): string {
    switch (phase) {
      case "work":
        return ansiColors.red.bold("Work");
      default:
        return phase;
    }
  }
}
