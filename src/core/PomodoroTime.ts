import EventEmitter from "events";

export class PomodoroTimer extends EventEmitter {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsBeforeLongBreak: number;

  private currentSession: number;
  private currentPhase: "work" | "shortBreak" | "longBreak";
  private isRunning: boolean;
  private remainingTime: number;
  private interval: NodeJS.Timeout | null;

  constructor(
    workDuration: number,
    shortBreakDuration: number,
    longBreakDuration: number,
    sessionsBeforeLongBreak: number,
  ) {
    super();
    this.workDuration = workDuration;
    this.shortBreakDuration = shortBreakDuration;
    this.longBreakDuration = longBreakDuration;
    this.sessionsBeforeLongBreak = sessionsBeforeLongBreak;

    this.currentSession = 0;
    this.currentPhase = "work";
    this.isRunning = false;
    this.remainingTime = 0;
    this.interval = null;
  }

  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;

    this.remainingTime = this.getCurrentPhaseDuration(this.currentPhase);
    this.interval = setInterval(() => {
      this.remainingTime -= 1;

      this.emit(
        "tick",
        this.remainingTime,
        this.currentPhase,
        this.currentSession,
      );

      if (this.remainingTime <= 0) {
        clearInterval(this.interval!);
        this.interval = null;
        this.isRunning = false;

        this.nextPhase();

        this.emit(
          "phaseChange",
          this.remainingTime,
          this.currentPhase,
          this.currentSession,
        );
      }
    }, 1000);
  }

  public nextPhase(): void {
    if (this.currentPhase === "work") {
      this.currentSession++;
      if (this.currentSession < this.sessionsBeforeLongBreak) {
        this.currentPhase = "shortBreak";
      } else if (this.currentSession === this.sessionsBeforeLongBreak) {
        this.currentSession = 1;
        this.currentPhase = "longBreak";
      }
    } else if (
      this.currentPhase === "shortBreak" ||
      this.currentPhase === "longBreak"
    ) {
      this.currentPhase = "work";
    }

    this.remainingTime = this.getCurrentPhaseDuration(this.currentPhase);

    this.emit(
      "phaseChange",
      this.remainingTime,
      this.currentPhase,
      this.currentSession,
    );
  }

  public getCurrentPhaseDuration(
    phase: "work" | "shortBreak" | "longBreak",
  ): number {
    switch (phase) {
      case "work":
        return this.workDuration;
      case "shortBreak":
        return this.shortBreakDuration;
      case "longBreak":
        return this.longBreakDuration;
      default:
        throw new Error("This phase dont exists");
    }
  }
}
