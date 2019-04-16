const pkgJson = require('./package')
const utils = require('./utils')
const logger = require('./utils/logger')
const options = require('minimist')(process.argv.slice(2));

// Options
const commands = options._;

if(commands.length === 0) {
  // Print Version
  if (options.i || options.info) {
    utils.printSystemInfoAndExit();
  } else if(options.v || options.version) {
    utils.printVersionsAndExit(pkgJson.version);
  } else if(options.h || options.help) {
    utils.printHelpAndExit()
  } else if(options.g || options.graffiti) {
    utils.printGraffitiAndExit();
  } else {
    utils.printInvalidAndExit();
  }
} else {
  switch (commands[0]) {
    case 'init':
      if (!commands[1]) {
        logger.error('Usage: react-native-hooks init <ProjectName> [--verbose]');
        process.exit(1);
      } else {
        init(commands[1], options);
      }
      break;
    default:
      logger.error(
        'Command `%s` unrecognized. '
      );
      process.exit(1);
      break;
  }
}

/**
 * @param name Project name, e.g. 'AwesomeReactNativeHook'.
 * @param options
 * @param options.verbose If true, will run 'npm install' in verbose mode (for debugging).
 */
function init(name, options) {
  utils.validateProjectName(name);
  if (fs.existsSync(name)) {
    initAfterConfirm(name, options);
  } else {
    initProject(name, options);
  }
}

function initAfterConfirm (name, options) {
  prompt.start();

  const property = {
    name: 'yesno',
    message: `Directory ${name} already exists. Continue?`,
    validator: /y[es]*|n[o]?/,
    warning: 'Must respond yes or no',
    default: 'no',
  };

  prompt.get(property, (err, result) => {
    if (result.yesno[0] === 'y') {
      initProject(name, options);
    } else {
      console.log('Project initialization canceled');
      process.exit();
    }
  });
}

function initProject(name, options) {
}

