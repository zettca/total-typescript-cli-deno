import { execSync } from "node:child_process";

// deno-lint-ignore require-await
export const runPackageJsonExercise = async (exerciseFile: string) => {
  // Install the packages with pnpm
  execSync("pnpm install", {
    cwd: exerciseFile,
    stdio: "inherit",
  });

  // Run the dev script of the package.json

  execSync("pnpm run dev", {
    cwd: exerciseFile,
    stdio: "inherit",
  });
};
