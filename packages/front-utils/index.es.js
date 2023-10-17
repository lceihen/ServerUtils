"use strict";

import devFrontUtils from "./dist/es/index.js";
import prodFrontUtils from "./src/index.js";

const frontUtils =
  process.env.NODE_ENV === "production" ? prodFrontUtils : devFrontUtils;

export default frontUtils;
