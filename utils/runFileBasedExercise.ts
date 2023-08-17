import { execSync } from "node:child_process";
import * as chokidar from "npm:chokidar";
import { parse as jsonCParse } from "npm:jsonc-parser";
import * as path from "node:path";

/**
 * Runs exercises that are based on a single file,
 * like 01-whatever.problem.ts
 */
export const runFileBasedExercise = async (exerciseFile: string) => {
  const tempTsconfigPath = path.resolve(Deno.cwd(), "./tsconfig.temp.json");

  const tsconfigPath = path.resolve(Deno.cwd(), "./tsconfig.json");
  const tsconfig = jsonCParse(await Deno.readTextFile(tsconfigPath));

  chokidar.watch(exerciseFile).on("all", async () => {
    const fileContents = await Deno.readTextFile(exerciseFile);

    const containsVitest = fileContents.includes(`from "vitest"`) ||
      fileContents.includes(`from 'vitest'`);
    try {
      console.clear();
      if (containsVitest) {
        console.log("Running tests...");
        execSync(`vitest run "${exerciseFile}" --passWithNoTests`, {
          stdio: "inherit",
        });
      }
      console.log("Checking types...");

      // Write a temp tsconfig.json
      const tsconfigWithIncludes = {
        ...tsconfig,
        include: [exerciseFile],
      };

      await Deno.writeTextFile(
        tempTsconfigPath,
        JSON.stringify(tsconfigWithIncludes, null, 2),
      );

      const cmd = `tsc --project ${tempTsconfigPath}`;

      execSync(cmd, {
        stdio: "inherit",
      });
      console.log("Typecheck complete. You finished the exercise!");
    } catch (e) {
      console.log("Failed. Try again!");

      try {
        await Deno.remove(tempTsconfigPath);
      } catch (e) {}
    }
  });
};
