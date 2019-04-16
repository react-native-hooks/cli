const chalk = require('chalk')
const SEPARATOR = ', ';

let verbose = false;

function formatMessages (messages) {
  return chalk.reset(messages.join(SEPARATOR));
}

function success (messages) {
  console.log(`${chalk.green.bold('success')} ${formatMessages(messages)}`);
}

function info (...messages) {
  console.log(`${chalk.cyan.bold('info')} ${formatMessages(messages)}`);
}

function warn (...messages) {
  console.warn(`${chalk.yellow.bold('warn')} ${formatMessages(messages)}`);
}

function error (...messages) {
  console.error(`${chalk.red.bold('error')} ${formatMessages(messages)}`);
}

function debug (...messages) {
  console.log(`${chalk.gray.bold('debug')} ${formatMessages(messages)}`);
}

function log (...messages) {
  console.log(`${formatMessages(messages)}`);
}

function setVerbose (...messages) {
  verbose = level;
}

module.exports = {
  success,
  info,
  warn,
  error,
  debug,
  log,
  setVerbose,
};