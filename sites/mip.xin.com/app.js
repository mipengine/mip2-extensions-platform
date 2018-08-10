"use strict";

let args = process.argv,
  envs = {
    test: 'env:test',
    production: 'env:production'
  },
  runEnv = 'devlopment';//默认开发环境π

//host配置 根据不同的运行环境
const HOST_CONFIG = {
  "devlopment": {
    name: 'devlopment',
    apiHost: 'http://jira-15387.openapix.ceshi.xin.com',
    // apiHost: "http://openapix.zyj.xin.com",
    componentsHost: ''
  },
  "test": {
    name: 'test',
    apiHost: 'http://jira-15387.openapix.ceshi.xin.com',
    // apiHost: "http://openapix.zyj.xin.com",
    componentsHost: ''
  },
  "production": {
    name: 'production',
    apiHost: 'https://openapix.xin.com',
    // apiHost: "http://openapix.zyj.xin.com",
    componentsHost: 'https://baidu.com/uxin.com/'
  }
}

if (args.indexOf(envs.test) > -1) {
  runEnv = HOST_CONFIG.test.name;
} else if (args.indexOf(envs.production) > -1) {
  runEnv = HOST_CONFIG.production.name;
}

process.env.NODE_ENV = runEnv;
//放全局
global.HOST_CONFIG = HOST_CONFIG[runEnv];

/**
 * koa 服务启动文件
 */

/**
 * Module dependencies.
 */

var app = require('./server/app/server');
var debug = require('debug')('demo:server');
var http = require('http');
const PORT = 3200;
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || PORT);
// app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app.callback());

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('server start ......  http://localhost:' + PORT);
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  debug('Listening on ' + bind);
}
