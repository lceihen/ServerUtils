import fs from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { execa, execaSync } from "execa";
import { rimraf } from "rimraf";
import ora from "ora";
import chalk from "chalk";
import boxen from "boxen";

import { watchDir } from "../dev.build.js";

const { join } = path;

const { resolve } = path;

const require = createRequire(import.meta.url);

const rootPackagesPath = resolve(`packages`);

const log = console.log;

const getAllChildComponentDir = async (rootPackagesPath) => {
  const childPackagePathList = [];
  try {
    const files = (await fs.readdir(rootPackagesPath)) || [];
    for (const fileName of files) {
      const childrenPackageFilePath = resolve(rootPackagesPath, fileName);

      if (
        existsSync(join(childrenPackageFilePath, "package.json")) &&
        watchDir.includes(fileName)
      ) {
        childPackagePathList.push(childrenPackageFilePath);
      }
    }
    return { childPackagePathList, files };
  } catch (err) {
    console.error("lceihen:", err);
    return { childPackagePathList: [], files: [] };
  }
};

const generatePackageDist = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const spinner = ora("Loading unicorns").start();
      spinner.color = "green";
      spinner.text = "GetAllChildComponentDir";
      const { childPackagePathList, files } = await getAllChildComponentDir(
        rootPackagesPath
      );
      spinner.succeed();
      childPackagePathList.forEach(async (url, index) => {
        spinner.text = `Build ${files[index]}`;
        spinner.start();
        await execa("rimraf", ["dist"], { cwd: url });
        await execa("rollup", ["-c", "--environment", `TARGET:${url}`]);
        spinner.succeed();
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

const main = async () => {
  let buildPackagesLabel =
    "The items involved in this package are as follows: \n\n";
  buildPackagesLabel += watchDir
    .map((item) => chalk.green.bold(item))
    .join(chalk.blue(", "));

  const myBox = boxen(buildPackagesLabel, {
    padding: { left: 1, right: 1 },
    margin: 1,
    float: "center",
    borderStyle: "round",
    borderColor: "green",
  });

  console.log(chalk.green(myBox));

  await generatePackageDist();
};

main();
