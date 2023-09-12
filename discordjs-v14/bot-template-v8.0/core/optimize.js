const { log } = require("./lib");
const v8 = require("v8");

log("Включена оптимизация nodejs","ok");

v8.setFlagsFromString('--max-semi-space-size=1');
v8.setFlagsFromString('--use_idle_notification');
v8.setFlagsFromString('--stack-size=262144');
v8.setFlagsFromString('--optimize_for_size');
v8.setFlagsFromString('--use-strict');
v8.setFlagsFromString('--expose-gc');
v8.setFlagsFromString('--no-lazy');