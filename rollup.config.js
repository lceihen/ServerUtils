import path from "node:path";
import fs from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import rollupCommonPlugin from "@rollup/plugin-commonjs";
import rollupPackageResolvePlugin from "@rollup/plugin-node-resolve";
import rollupJsonPlugin from "@rollup/plugin-json";
import rollupTerserPlugin from "@rollup/plugin-terser";
import rollupTypescriptPlugin from "@rollup/plugin-typescript";
import { visualizer as rollupVisualizerPlugin } from "rollup-plugin-visualizer";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { resolve } = path;
const { TARGET } = process.env;

const generateRollupConfig = () => {
  const childrenPackageJsonFile = require(`${TARGET}/package.json`);
  const presetFormat = childrenPackageJsonFile.buildOptions?.formats;

  let outPutConfig = [];

  if (presetFormat && Array.isArray(presetFormat)) {
    presetFormat.forEach((formatItem) => {
      if (defaultOutPutFormatter[formatItem])
        outPutConfig.push(defaultOutPutFormatter[formatItem]);
    });
  } else {
    outPutConfig = Object.values(defaultOutPutFormatter);
  }

  const devDependencies = Object.keys(
    childrenPackageJsonFile.devDependencies || {}
  );
  const dependencies = Object.keys(childrenPackageJsonFile.dependencies || {});

  const inputFileName = existsSync(`${TARGET}/src/index.js`)
    ? `${TARGET}/src/index.js`
    : `${TARGET}/src/index.ts`;

  return {
    input: inputFileName,
    output: outPutConfig,
    plugins: [
      rollupCommonPlugin(),
      rollupPackageResolvePlugin(),
      rollupJsonPlugin(),
      rollupTerserPlugin(),
      rollupVisualizerPlugin({
        gzipSize: true, // 分析图生成的文件名
        brotliSize: true, // 收集 brotli 大小并将其显示
        filename: `${TARGET}/dist/stats.html`, // 分析图生成的文件名
      }),
      rollupTypescriptPlugin(),
    ],
    external: ["sequelize", ...devDependencies, ...dependencies],
  };
};

const defaultOutPutFormatter = {
  es: {
    file: resolve(`${TARGET}/dist/es.js`),
    format: `es`,
  },
  cjs: {
    file: resolve(`${TARGET}/dist/cjs.js`),
    format: `cjs`,
  },
};

export default generateRollupConfig();
