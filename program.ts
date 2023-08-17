import {
  Command,
  CompletionsCommand,
} from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";
import { runExercise } from "./utils/runExercise.ts";
import { prepareStackblitz } from "./utils/prepareStackblitz.ts";

const exerciseCmd = new Command()
  .arguments("<exercise>")
  .alias("exercise")
  .description("Runs an exercise on watch mode")
  .option("-s, --solution", "Run the solution")
  .action(({ solution }, exercise) => runExercise(exercise, solution));

const prepareStackblitzCmd = new Command()
  .description("Adds e-01, e-02 scripts to package.json")
  .action(prepareStackblitz);

export const program = new Command()
  .name("tt-cli")
  .version("0.0.1")
  .command("completions", new CompletionsCommand())
  .command("run", exerciseCmd)
  .command("prepare-stackblitz", prepareStackblitzCmd);
