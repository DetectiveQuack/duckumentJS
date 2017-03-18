const Config = require('./config');
const Read = require('./fs/read');

const config = new Config();

class Duckument {
  constructor() {
    config.readFile()
      .then(() => { Read.readFiles(); });
  }
}

module.exports = new Duckument();
