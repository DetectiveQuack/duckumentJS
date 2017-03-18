require('babel-core/register')();
const fs = require('fs');

const Config = require('../src/config');

const configFile = fs.readFileSync(`${__dirname}/.duckumentJS`, 'utf8');
Config.configFile = configFile;
