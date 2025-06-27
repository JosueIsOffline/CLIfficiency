import { Command } from "commander";

const program = new Command();

program
  .name("clifficiency")
  .description("Pomodoro CLI timer")
  .version("1.0.0")
  .option("-w, --work <minutes>", "Work duration")
  .option("-s, --short <minutes>", "Short break")
  .option("-l, --long <minutes>", "Long break")
  .option("-n, --sessions <number>", "Sessions before long break")
  .option("-p, --preset <name>", "Choose a preset (fast, focus, default)");

program.parse();

export const options = program.opts();
