import fs from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { execa, execaSync } from "execa";

const require = createRequire(import.meta.url);
const rootPackagesPath = path.resolve(`packages`);

const getAllChildComponentDir = async (rootPackagesPath) => {
  const vaildChildPackagePathList = [];
  try {
    const files = await fs.readdir(rootPackagesPath);
    for (const file of files) {
      console.log(file);
      const childrenPackageFilePath = path.resolve(
        rootPackagesPath,
        file,
        "package.json"
      );

      if (existsSync(childrenPackageFilePath)) {
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
  result.forEach((url) => {
    const childrenPackageJson = require(url);
    console.log("childrenPackageJson", childrenPackageJson);
  });
};

generatePackageDist();
console.log(12);
