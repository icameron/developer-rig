'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const commandLineArgs = require('command-line-args');
const cmdOptions = commandLineArgs([
  {
    name: 'secret',
    alias: 's',
  }, {
    name: 'config',
    alias: 'c',
  }, {
    name: 'local',
    alias: 'l',
  },
]);
// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Tools like Cloud9 rely on this.
const HOST = process.env.HOST || '0.0.0.0';
const DEFAULT_PORT = process.env.PORT || 3000;

// Set the extension secret as an environment variable if it was passed in via command line args
if (cmdOptions.secret) {
  process.env.EXT_SECRET = cmdOptions.secret;
}

if (cmdOptions.config) {
  const configFileLocation = path.resolve(process.cwd(), cmdOptions.config);
  try {
    const configFile = fs.readFileSync(configFileLocation, 'utf-8');
    // Pull config variables from file and set them to environment variables
    const { clientID, version, channel, ownerName } = JSON.parse(configFile);
    if (clientID) { process.env.EXT_CLIENT_ID = clientID; }
    if (version) { process.env.EXT_VERSION = version; }
    if (channel) { process.env.EXT_CHANNEL = channel; }
    if (ownerName) { process.env.EXT_OWNER_NAME = ownerName; }
  } catch (e) {
    console.log(e);
    console.log(
      chalk.red(
        `Unable to read config file at location: ${chalk.yellow(
          chalk.bold(configFileLocation)
        )}. Falling back to environment variables.`
      )
    );
  }
}

// Check for a newer release if this isn't a clone.
if (fs.existsSync('.release')) {
  process.env.GIT_RELEASE = fs.readFileSync('.release', 'utf8').trim();
}

// Set local mode, if requested.
let extension;
if (cmdOptions.local) {
  const localFileLocation = path.resolve(process.cwd(), cmdOptions.local);
  const { id: clientId, version, author_name: ownerName } = extension = require(localFileLocation);
  process.env.API_HOST = `localhost.rig.twitch.tv:${DEFAULT_PORT}`;
  process.env.COORDINATOR_URL = `https://${process.env.API_HOST}/coordinator.js`;
  if (!process.env.EXT_CLIENT_ID) {
    process.env.EXT_CLIENT_ID = clientId;
  }
  if (!process.env.EXT_VERSION) {
    process.env.EXT_VERSION = version;
  }
  if (!process.env.EXT_CHANNEL) {
    process.env.EXT_CHANNEL = "RIG" + ownerName;
  }
  if (!process.env.EXT_OWNER_NAME) {
    process.env.EXT_OWNER_NAME = ownerName;
  }
  if (!process.env.EXT_SECRET) {
    process.env.EXT_SECRET = "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk";
  }
} else {
  process.env.COORDINATOR_URL = "https://extension-files.twitch.tv/coordinator/7.7.0/extension-coordinator.umd.js";
  process.env.API_HOST = "api.twitch.tv";
}
console.log('clientId:', process.env.EXT_CLIENT_ID);
console.log('version:', process.env.EXT_VERSION);
console.log('channel:', process.env.EXT_CHANNEL);
console.log('owner name:', process.env.EXT_OWNER_NAME);
console.log('secret:', process.env.EXT_SECRET);

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const {
  createCompiler,
  prepareProxy,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');
const paths = require('../config/paths');
const config = require('../config/webpack.config.dev');
const createDevServerConfig = require('../config/webpackDevServer.config');

const useYarn = fs.existsSync(paths.yarnLockFile);

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${chalk.yellow(
        chalk.bold(process.env.HOST)
      )}`
    )
  );
  console.log(
    `If this was unintentional, check that you haven't mistakenly set it in your shell.`
  );
  console.log(`Learn more here: ${chalk.yellow('http://bit.ly/2mwWSwH')}`);
  console.log();
}

// Create a call-back to configure the WebPack application.
let socketServer, wss;
function configureApp(app) {
  ({ socketServer, wss } = require('./local-mode')(app, extension) | {});
}

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const appName = require(paths.appPackageJson).name;
const urls = prepareUrls(protocol, HOST, DEFAULT_PORT);
// Create a webpack compiler that is configured with custom messages.
const compiler = createCompiler(webpack, config, appName, urls, useYarn);
// Load proxy config
const proxySetting = require(paths.appPackageJson).proxy;
const proxyConfig = prepareProxy(proxySetting, paths.appPublic);
// Serve webpack assets generated by the compiler over a web sever.
const serverConfig = createDevServerConfig(
  proxyConfig,
  urls.lanUrlForConfig,
  configureApp
);
const devServer = new WebpackDevServer(compiler, serverConfig);
// Launch WebpackDevServer.
devServer.listen(DEFAULT_PORT, HOST, err => {
  if (err) {
    return console.log(err);
  }
  console.log(chalk.cyan('Starting the development server...\n'));
  openBrowser(urls.localUrlForBrowser);
});

['SIGINT', 'SIGTERM'].forEach(function(sig) {
  process.on(sig, function() {
    wss && wss.close();
    socketServer && socketServer.close();
    devServer.close();
    process.exit();
  });
});
