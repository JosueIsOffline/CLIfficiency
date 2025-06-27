import { PomodoroTimer } from "./core/PomodoroTime";
import { ProgressBar } from "./ui/ProgressBar";

const workDuration = 5;
const shortBreakDuration = 3;
const longBreakDuration = 6;
const sessionsBeforeLongBreak = 3;

const friendlyNames: Record<"work" | "shortBreak" | "longBreak", string> = {
  work: "Work",
  shortBreak: "Short Break",
  longBreak: "Long Break",
};

const pomodoro = new PomodoroTimer(
  workDuration,
  shortBreakDuration,
  longBreakDuration,
  sessionsBeforeLongBreak,
);

const progressBar = new ProgressBar();

pomodoro.on("tick", (remainingTime, phase) => {
  const displayPhase = friendlyNames[phase as keyof typeof friendlyNames];

  progressBar.update(remainingTime, displayPhase);
});

pomodoro.on("phaseChange", (remainingTime, phase, session) => {
  const displayPhase = friendlyNames[phase as keyof typeof friendlyNames];
  progressBar.start(remainingTime, displayPhase, session);
  pomodoro.start();
});

progressBar.start(workDuration, "Work", 1);
pomodoro.start();
