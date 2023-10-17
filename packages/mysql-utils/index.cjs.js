"use strict";

if (process.env.NODE_ENV === "production") {
  module.exports = require("./dist/cjs/index.js");
} else {
  module.exports = require("./src/index.js");
}
