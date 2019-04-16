const chalk = require('chalk');

const nodeVersion = process.versions.node;
const semver = nodeVersion.split('.');
const majorVersion = semver[0];

require('./utils/gracefulFs')

if (majorVersion < 8) {
  console.error(
    chalk.red(`You are running Node ${nodeVersion}
     React Native Hooks requires Node 8 or higher
     Please update your version of Node.
     Checkout more details here
     https://facebook.github.io/react-native/blog/2018/07/04/releasing-react-native-056#new-node-xcode-react-and-flow-oh-my
    `)
  );
  process.exit(1);
}

require('./cli')