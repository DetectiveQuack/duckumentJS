const path = require('path');

const Config = require('./config');
const Read = require('./fs/read');

class Duckument {
  constructor() {
    Config.setFilePath(path.join(__dirname, '../.duckumentrc'));
    Config.readFile()
      .then(() => Read.readFiles());
  }
}

module.exports = new Duckument();
