import path from "node:path";
import rollupCommonPlugin from "@rollup/plugin-commonjs";
import rollupPackageResolvePlugin from "@rollup/plugin-node-resolve";
import rollupJsonPlugin from "@rollup/plugin-json";
import rollupTerserPlugin from "@rollup/plugin-terser";
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

  return {
    input: `${TARGET}/src/index.js`,
    output: outPutConfig,
    plugins: [
      rollupCommonPlugin(),
      rollupPackageResolvePlugin(),
      rollupJsonPlugin(),
      rollupTerserPlugin(),
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
