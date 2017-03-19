require('babel-core/register')();
const fs = require('fs');

const Config = require('../src/config');

const configFile = fs.readFileSync(`${__dirname}/.duckumentrc`, 'utf8');
Config.setConfig(configFile);
