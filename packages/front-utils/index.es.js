"use strict";

import devFrontUtils from "./dist/es/index";
import prodFrontUtils from "./src/index";

const frontUtils =
  process.env.NODE_ENV === "production" ? prodFrontUtils : devFrontUtils;

export default frontUtils;
