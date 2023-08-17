import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";
import { runExercise } from "./runExercise.ts";
import { prepareStackblitz } from "./prepareStackblitz.ts";

export const program = new Command().name("tt-cli").version("0.0.1");

program
  .command("run <exercise>")
  .alias("exercise <exercise>")
  .description("Runs an exercise on watch mode")
  .option("-s, --solution", "Run the solution")
  .action(({ solution }, exercise) => runExercise(exercise, solution));

program
  .command("prepare-stackblitz")
  .description("Adds e-01, e-02 scripts to package.json")
  .action(prepareStackblitz);
