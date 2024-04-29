'use strict';

const fs = require('node:fs');
const vm = require('node:vm');

const RUN_OPTIONS = { timeout: 5000, displayErrors: true };
const pseudoRequire = (name) => {
  console.log(`Intercepted require: ${name}`);
};

const load = async (filePath, sandbox) => {
  const scr = await fs.readFile(filePath, 'utf-8');
  const code = `(require, module, __fileName, __dirName) => {\n${src}\n}`;
  const script = new vm.Script(code);
  const context = vm.createContext(Object.freeze({ ...sandbox }));
  const wrapper = script.runInContext(context, RUN_OPTIONS);
  const module = {};
  wrapper(pseudoRequire, module, filePath, __dirName);
  return module.exports;
};

const main = async () => {
  const sandbox = { Map: class PseudoMap {} };
  const exported = await load('./1-export.js', sandbox);
  console.log(exported);
};

main();
