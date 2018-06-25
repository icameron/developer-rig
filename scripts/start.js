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
    type: Boolean,
  },
]);
// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Set the extension secret as an environment variable if it was passed in via command line args
if (cmdOptions.secret) {
  process.env.EXT_SECRET = cmdOptions.secret;
}

let configFileLocation = null;

if (cmdOptions.config) {
  try {
    configFileLocation = path.resolve(process.cwd(), cmdOptions.config);
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

// Set local mode, if requested.
if (cmdOptions.local) {
  process.env.COORDINATOR_URL = "https://localhost.rig.twitch.tv:3000/coordinator.js";
  process.env.API_HOST = "localhost.rig.twitch.tv:3000";
  if (!process.env.EXT_CLIENT_ID) {
    process.env.EXT_CLIENT_ID = "u4u4u4u4u4u4u4u4u4u4u4u4u4u4u4";
  }
  if (!process.env.EXT_VERSION) {
    process.env.EXT_VERSION = "0.0.1";
  }
  if (!process.env.EXT_CHANNEL) {
    process.env.EXT_CHANNEL = "RIGtwitchrig";
  }
  if (!process.env.EXT_OWNER_NAME) {
    process.env.EXT_OWNER_NAME = "twitchrig";
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
const clearConsole = require('react-dev-utils/clearConsole');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const {
  choosePort,
  createCompiler,
  prepareProxy,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');
const paths = require('../config/paths');
const config = require('../config/webpack.config.dev');
const createDevServerConfig = require('../config/webpackDevServer.config');

const useYarn = fs.existsSync(paths.yarnLockFile);
const isInteractive = process.stdout.isTTY;

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

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

// We attempt to use the default port but if it is busy, we offer the user to
// run on a different port. `choosePort()` Promise resolves to the next free port.
choosePort(HOST, DEFAULT_PORT)
  .then(port => {
    if (port == null) {
      // We have not found a port.
      return;
    }

    // Create a call-back to configure the WebPack application.
    function configureApp(app) {
      if (!cmdOptions.local) {
        // Do nothing if not in local mode.
        return;
      }
      const channelId = process.env.EXT_CHANNEL;
      const parseQuerystring = require('querystring').parse;
      const parseUrl = require('url').parse;
      const dateFormat = require('dateformat');
      const clientId = process.env.EXT_CLIENT_ID;
      let sequenceNumber = 0;

      app.use(require('body-parser').json());

      // Create endpoints for API in local mode.
      app.get('/helix/users', (req, res) => {
        // TODO:  check request headers for client identifier.
        const url = parseUrl(req.url, true);
        console.log(`helix/users/${url.query.login}`);
        res.setHeader('Content-Type', '');
        res.writeHead(200);
        const data = {
          "data": [
            {
              "id": "000000000",
              "login": url.query.login,
              "display_name": url.query.login,
              "type": "",
              "broadcaster_type": "",
              "description": "",
              "profile_image_url": "https://static-cdn.jtvnw.net/user-default-pictures/49988c7b-57bc-4dee-bd4f-6df4ad215d3a-profile_image-300x300.jpg",
              "offline_image_url": "",
              "view_count": 1,
            },
          ],
        };
        res.end(JSON.stringify(data));
      });
      app.post('/kraken/extensions/search', (req, res) => {
        // TODO:  check request headers for client identifier and JWT authorization.
        const url = parseUrl(req.url, true);
        console.log(typeof req.body);
        console.log(req.body);
        const search = req.body;
        console.log(search.limit);
        res.setHeader('Content-Type', '');
        res.writeHead(200);
        const data = {
          "_total": 1,
          "extensions": [
            {
              "id": process.env.EXT_CLIENT_ID,
              "state": "Testing",
              "version": process.env.EXT_VERSION,
              "anchor": "",
              "panel_height": 300,
              "author_name": process.env.EXT_OWNER_NAME,
              "support_email": "info@deluxetingler.net",
              "name": "Tingler",
              "description": "The Tingler is a 1959 American horror/thriller film produced and directed by William Castle. It is the third of five collaborations between Castle and writer Robb White, and stars Vincent Price, Darryl Hickman, Patricia Cutts, Pamela Lincoln, Philip Coolidge, and Judith Evelyn.",
              "summary": "1959 American horror/thriller film",
              "viewer_url": "https://localhost.rig.twitch.tv:8080/panel.html",
              "viewer_urls": { "panel": "https://localhost.rig.twitch.tv:8080/panel.html" },
              "views": {
                "panel": {
                  "viewer_url": "https://localhost.rig.twitch.tv:8080/panel.html",
                  "height": 300
                },
                "config": { "viewer_url": "https://localhost.rig.twitch.tv:8080/config.html" }
              },
              "config_url": "https://localhost.rig.twitch.tv:8080/config.html",
              "live_config_url": "",
              "icon_url": "https://media.forgecdn.net/avatars/154/735/636628000230800019.png",
              "icon_urls": { "100x100": "https://media.forgecdn.net/avatars/154/735/636628000230800019.png" },
              "screenshot_urls": ["internal/screenshots/test_data.png"],
              "asset_urls": null,
              "installation_count": -42,
              "can_install": true,
              "whitelisted_panel_urls": [],
              "whitelisted_config_urls": [],
              "required_broadcaster_abilities": [],
              "eula_tos_url": "",
              "privacy_policy_url": "",
              "request_identity_link": false,
              "vendor_code": "",
              "sku": "",
              "bits_enabled": false
            }]
        };
        res.end(JSON.stringify(data));
      });
      app.post('/extensions/message/:channelId', (req, res) => {
        console.log(`extensions/message/${req.params.channelId}`, req.body);
        let message = {
          time_sent: dateFormat(new Date(), "isoUtcDateTime"),
          content_type: req.body.content_type,
          content: [req.body.message],
          sequence: { number: ++sequenceNumber, start: '2018-06-18T17:32:55Z' },
        };
        message = {
          type: 'MESSAGE',
          data: {
            topic: `channel-ext-v1.${req.params.channelId}-${clientId}-broadcast`,
            message: JSON.stringify(message) + "\r\n",
          }
        };
        broadcast(JSON.stringify(message));
        res.writeHead(204);
        res.end();
      });
    }

    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const appName = require(paths.appPackageJson).name;
    const urls = prepareUrls(protocol, HOST, port);
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
    devServer.listen(port, HOST, err => {
      if (err) {
        return console.log(err);
      }
      if (isInteractive) {
        //clearConsole();
      }
      console.log(chalk.cyan('Starting the development server...\n'));
      openBrowser(urls.localUrlForBrowser);
    });

    const options = {
      key: fs.readFileSync('ssl/selfsigned.key'),
      cert: fs.readFileSync('ssl/selfsigned.crt')
    };
    const socketServer = require('https').createServer(options, (req, res) => {
      res.writeHead(200);
      res.end("live");
    });
    const WebSocket = new require('ws');
    const wss = new WebSocket.Server({ server: socketServer });
    wss.on('connection', function(socket) {
      console.log('connection', wss.clients.length);
      socket.on('open', function() {
        console.log('open');
      });
      socket.on('message', function(message) {
        console.log('message:', message);
        const data = JSON.parse(message);
        if (data.type === 'PING') {
          socket.send(JSON.stringify({ type: "PONG" }));
          console.log('sent PONG');
        } else {
          wss.clients.forEach(function(client) {
            if (client.readyState === WebSocket.OPEN) {
              client.send(message);
            }
          });
        }
      });
      socket.on('close', function(code, reason) {
        console.log('close', code, reason);
      });
    });
    socketServer.listen(3003, function() {
      console.log('listening on *:3003');
    });
    function broadcast(data) {
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    }

    ['SIGINT', 'SIGTERM'].forEach(function(sig) {
      process.on(sig, function() {
        wss.close();
        socketServer.close();
        devServer.close();
        process.exit();
      });
    });
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });
