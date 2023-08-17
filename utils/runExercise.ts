import * as path from "node:path";
import { detectExerciseType } from "./detectExerciseType.ts";
import { runFileBasedExercise } from "./runFileBasedExercise.ts";
import { runPackageJsonExercise } from "./runPackageJsonExercise.ts";
import { findExercise } from "./findAllExercises.ts";

const findExerciseToRun = async (
  exercise: string,
  runSolution?: boolean,
): Promise<string> => {
  const srcPath = path.resolve(Deno.cwd(), "./src");

  const exerciseFile = await findExercise(srcPath, {
    num: exercise,
    allowedTypes: ["explainer", runSolution ? "solution" : "problem"],
  });

  if (!exerciseFile) {
    console.log(`Exercise ${exercise} not found`);
    Deno.exit(1);
  }

  return exerciseFile;
};

export const runExercise = async (exercise: string, runSolution?: boolean) => {
  if (!exercise) {
    console.log("Please specify an exercise");
    Deno.exit(1);
  }

  const exerciseFile = await findExerciseToRun(exercise, runSolution);

  const exerciseType = await detectExerciseType(exerciseFile);

  if (exerciseType === "not-runnable") {
    console.log(
      `Exercise ${exercise} is not runnable. Follow the instructions in the video to complete it.`,
    );
    Deno.exit(0);
  }

  switch (exerciseType) {
    case "file":
      return await runFileBasedExercise(exerciseFile);

    case "package-json-with-dev-script":
      return await runPackageJsonExercise(exerciseFile);
  }
  exerciseType satisfies never;
};
