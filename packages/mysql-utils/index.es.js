"use strict";

import mysqlUtilsDevObject from "./dist/es/index";
import mysqlUtilsProdObject from "./src/index";

const mysqlUtils =
  process.env.NODE_ENV === "production"
    ? mysqlUtilsProdObject
    : mysqlUtilsDevObject;

export default mysqlUtils;
