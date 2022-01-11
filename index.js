var Chance = require("chance");
var chance = new Chance();
const data = Array.from(Array(chance.integer({ min: 10, max: 20 })), () => {
  return {
    ownerId: chance.guid(),
    projectId: `prj_${chance.guid()}`,
    deploymentId: `dpl_${chance.guid()}`,
    name: chance.string({ length: chance.integer({ min: 8, max: 20 }) }),
    source: "build",
    host: `${chance.string({
      length: chance.integer({ min: 8, max: 20 }),
    })}.vercel.app`,
    buildId: "test-build-id",
    entrypoint: "index.js",
    events: Array.from(Array(chance.integer({ min: 20, max: 40 })), () => {
      return {
        id: `${chance.integer({ min: 1000, max: 100000 })}`,
        timestamp: chance.timestamp(),
        type: "delimiter",
        step: "BUILDING",
      };
    }),
  };
});

const buffer = Buffer.from(JSON.stringify(data));
const string = buffer.toString("base64");

const b64 = require("base64-js");
const { Base64 } = require("js-base64");
const base64 = require("base-64");
const { decode } = require("64");

exports.compare = {
  "Node.js base64": function () {
    const decoded = Buffer.from(string, "base64");
  },
  "lovell/64": function () {
    const decoded = decode(Buffer.from(string));
  },
  "beatgammit/base64-js": function () {
    const decoded = b64.toByteArray(string);
  },
  "dankogai/js-base64": function () {
    const decoded = Base64.decode(string);
  },
  "mathiasbynens/base64": function () {
    const decoded = base64.decode(string);
  },
};

exports.time = 5000;
exports.compareCount = 20;

require("bench").runMain();
