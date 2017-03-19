const fs = require('fs');

module.exports = (function Config() {
  let filePath;
  let configFile;

  function setFilePath(pathOverride) {
    filePath = pathOverride;
  }

  function getFilePath() {
    return filePath;
  }

  function setConfig(config) {
    configFile = config;
  }

  function getConfig() {
    return JSON.parse(configFile);
  }

  function readFile() {
    return new Promise((resolve, reject) => {
      fs.readFile(getFilePath(), (err, file) => {
        if (err) return reject(err);

        configFile = file;
        return resolve(getConfig());
      });
    });
  }

  return {
    getFilePath,
    setFilePath,
    getConfig,
    setConfig,
    readFile
  };
}());
