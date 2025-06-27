import path from "path";
import fs from "fs";
import os from "os";
import { promisify } from "util";

import notifier from "node-notifier";
import { PomodoroTimer } from "./core/PomodoroTime";
import { ProgressBar } from "./ui/ProgressBar";
import { options } from "./cli";
import { presets } from "./presets";

const copyFile = promisify(fs.copyFile);
const access = promisify(fs.access);

async function ensureSoundInLibrary(soundFileName: string) {
  const soundsDir = path.join(os.homedir(), "Library", "Sounds");
  const destPath = path.join(soundsDir, soundFileName);
  try {
    await access(destPath, fs.constants.F_OK);
  } catch {
    const sourcePath = path.resolve(
      __dirname,
      "../assets/sounds",
      soundFileName,
    );
    try {
      await copyFile(sourcePath, destPath);
    } catch (err) {
      console.error("Error copying sound file:", err);
    }
  }
}

const selected = presets[options.preset] ?? presets["default"];
console.log(selected);

const workDuration =
  (options.work ? parseInt(options.work) : selected.work) * 60;
const shortBreakDuration =
  (options.short ? parseInt(options.short) : selected.short) * 60;
const longBreakDuration =
  (options.long ? parseInt(options.long) : selected.long) * 60;
const sessionsBeforeLongBreak = options.sessions
  ? parseInt(options.sessions)
  : selected.sessions;

console.log(workDuration);

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
ensureSoundInLibrary("CLIfficiency_noti.wav");

pomodoro.on("tick", (remainingTime, phase) => {
  const displayPhase = friendlyNames[phase as keyof typeof friendlyNames];

  progressBar.update(remainingTime, displayPhase);
});

pomodoro.on("phaseChange", (remainingTime, phase, session) => {
  const displayPhase = friendlyNames[phase as keyof typeof friendlyNames];
  const titleMap = {
    work: "¡Hora de trabajar! 💻",
    shortBreak: "Tómate un respiro ☕",
    longBreak: "¡Descanso largo! 🧘",
  };

  const messageMap = {
    work: "Enfócate por unos minutos más.",
    shortBreak: "Estira un poco o toma agua.",
    longBreak: "Tómate tu merecido descanso.",
  };

  const subtitle = titleMap[phase as keyof typeof titleMap];
  const message = messageMap[phase as keyof typeof messageMap];

  notifier.notify({
    title: "CLIfficiency",
    subtitle,
    message,
    sound: "CLIfficiency_noti",
    wait: false,
    icon: path.join(__dirname, "../assets/image/logo.jpeg"),
    contentImage: path.join(__dirname, "../assets/image/logo.jpeg"),
    open: "file://" + path.join(__dirname, "../assets/image/logo.jpeg"),
  });
  progressBar.start(remainingTime, displayPhase, session);
  pomodoro.start();
});

progressBar.start(workDuration, "Work", 1);
pomodoro.start();
