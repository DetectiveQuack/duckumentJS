const fs = require('fs');
const path = require('path');

class Config {
  constructor(pathOverride) {
    this.filePath = pathOverride || path.join(__dirname, '../.duckumentJS');
    this.file = null;
  }

  readFile() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, (err, file) => {
        if (err) return reject(err);

        this.configFile = file;

        return resolve(JSON.parse(file));
      });
    });
  }

  getFile() {
    return this.configFile;
  }

}

module.exports = Config;
