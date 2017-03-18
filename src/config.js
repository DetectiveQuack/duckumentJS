const fs = require('fs');
const path = require('path');

class Config {
  constructor() {
    this.filePath = path.join(__dirname, '../.duckumentJS');
    this.file = null;
  }

  setFilePath(pathOverride) {
    this.filePath = pathOverride;
  }

  getConfig() {
    return JSON.parse(this.configFile);
  }

  readFile() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, (err, file) => {
        if (err) return reject(err);

        this.configFile = file;

        return resolve(this.getConfig());
      });
    });
  }

}

module.exports = new Config();
