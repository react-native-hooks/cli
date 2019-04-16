const fs = require('fs');
const chalk = require('chalk');
const logger = require('./logger')
const envinfo = require('envinfo');
const path = require('path')

const bannerPath = path.join(__dirname, 'utils/banner.txt')

function printSystemInfoAndExit() {
  console.log(chalk.bold('\nEnvironment Info:'));
  envinfo
    .run(
      {
        System: ['OS', 'CPU'],
        Binaries: ['Node', 'npm', 'Yarn'],
        Browsers: ['Chrome', 'Edge', 'Internet Explorer', 'Firefox', 'Safari'],
        npmPackages: ['react', 'react-dom', 'react-scripts'],
        npmGlobalPackages: ['create-react-app'],
      },
      {
        console: true,
        duplicates: true,
        showNotFound: true,
      }
    )
    .then(process.exit)
}

function printVersionsAndExit(pkgJsonVersion) {
  logger.info(`react-native-hooks-cli: ${pkgJsonVersion}`);
  process.exit(0);
}

function printHelpAndExit() {
  console.log(
    [
      '',
      '  Usage: react-native-hooks [command] [options]',
      '',
      '',
      '  Commands:',
      '',
      '    init <ProjectName> [options]  generates a new project and installs its dependencies',
      '',
      '  Options:',
      '',
      '    -i, --info      Print system   information',
      '    -v, --version   Print version  information',
      '    -h, --help      Print usage    information',
      '    -g, --graffiti  Print Graffiti information',
      '',
    ].join('\n'),
  );
  process.exit(0);
}

function printGraffitiAndExit() {
  try {
    const data = fs.readFileSync(bannerPath, { encoding: 'ascii' })
    console.log(data)
  } catch(ex) {
    process.exit(1)
  } finally {
    process.exit(0);
  }
}

function printInvalidAndExit() {
  console.log(
    [
      '',
      ' Command unrecognized',
      '',
      ` Run ${chalk.cyan(`react-native-hooks --help`)} to see all options.`,
      ''
    ].join('\n'),
  );
  process.exit(1)
}

function validateProjectName(name) {
  if (!String(name).match(/^[$A-Z_][0-9A-Z_$]*$/i)) {
    logger.error(
      `${name} is not a valid name for a project. Please use a valid identifier
      name (alphanumeric).`,
    );
    process.exit(1);
  }

  if (name === 'React') {
    logger.error(
      `${name} is not a valid name for a project. Please do not use the
      reserved word "React"".`,
    );
    process.exit(1);
  }
}

module.exports = {
  printSystemInfoAndExit,
  printVersionsAndExit,
  printHelpAndExit,
  printGraffitiAndExit,
  printInvalidAndExit,
  validateProjectName
}