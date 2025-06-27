"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressBar = void 0;
const ansi_colors_1 = __importDefault(require("ansi-colors"));
const cli_progress_1 = require("cli-progress");
class ProgressBar {
    constructor() {
        this.bar = new cli_progress_1.SingleBar({
            format: `${ansi_colors_1.default.bold.magentaBright.italic("{phase}")} ${ansi_colors_1.default.magenta("[{bar}]")} ${ansi_colors_1.default.bold.magentaBright.italic("{percentage}%")} ${ansi_colors_1.default.bold.magentaBright.italic("| (#{session}) {remaining} time remaining")}`,
            barCompleteChar: "\u2588",
            barIncompleteChar: "\u2591",
            hideCursor: true,
        }, cli_progress_1.Presets.shades_classic);
        this.totalTime = 0;
    }
    start(totalTime, phase, session) {
        this.totalTime = totalTime;
        this.bar.start(totalTime, 0, {
            session,
            phase,
            remaining: this.formatTime(totalTime),
        });
    }
    update(remainingTime, phase) {
        const elapsed = this.totalTime - remainingTime;
        this.bar.update(elapsed, {
            phase,
            remaining: this.formatTime(remainingTime),
        });
    }
    stop() {
        this.bar.stop();
    }
    formatTime(seconds) {
        const min = String(Math.floor(seconds / 60)).padStart(2, "0");
        const sec = String(seconds % 60).padStart(2, "0");
        return `${min}:${sec}`;
    }
    getColoredPhase(phase) {
        switch (phase) {
            case "work":
                return ansi_colors_1.default.red.bold("Work");
            default:
                return phase;
        }
    }
}
exports.ProgressBar = ProgressBar;
