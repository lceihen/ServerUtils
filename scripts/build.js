import fs from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { execa, execaSync } from "execa";
import { rimraf } from "rimraf";

const { join } = path;

const { resolve } = path;

const require = createRequire(import.meta.url);

const rootPackagesPath = resolve(`packages`);

const getAllChildComponentDir = async (rootPackagesPath) => {
  const vaildChildPackagePathList = [];
  try {
    const files = await fs.readdir(rootPackagesPath);
    for (const fileName of files) {
      const childrenPackageFilePath = resolve(rootPackagesPath, fileName);

      if (existsSync(join(childrenPackageFilePath, "package.json"))) {
        vaildChildPackagePathList.push(childrenPackageFilePath);
      }
    }
    return vaildChildPackagePathList;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const generatePackageDist = async () => {
  const result = await getAllChildComponentDir(rootPackagesPath);
  result.forEach(async (url) => {
    await execa("pnpm", ["install"], { cwd: url });
    await execa("rimraf", ["dist"], { cwd: url });
    await execa("rollup", ["-c", "--environment", `TARGET:${url}`]);
  });
};

const main = async () => {
  await generatePackageDist();
};

main();
