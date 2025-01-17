import fs from "node:fs/promises";
import path from "node:path";

export type ExerciseType =
  | "file"
  | "package-json-with-dev-script"
  | "not-runnable";

const endsWithTsOrTsx = (filepath: string) =>
  filepath.endsWith(".ts") || filepath.endsWith(".tsx");

const isDir = async (filepath: string) => {
  const stat = await fs.stat(filepath);

  return stat.isDirectory();
};

export const detectExerciseType = async (
  filepath: string,
): Promise<ExerciseType> => {
  if (endsWithTsOrTsx(filepath)) {
    return "file";
  }

  if (await isDir(filepath)) {
    const packageJsonPath = path.resolve(filepath, "package.json");

    try {
      const packageJson = await fs.readFile(packageJsonPath, "utf-8");

      const parsed = JSON.parse(packageJson);

      if (parsed?.scripts?.dev) {
        return "package-json-with-dev-script";
      }
    } catch (e) {}
  }

  return "not-runnable";
};
