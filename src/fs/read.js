const dir = require('node-dir');
const Config = require('./../config');
const Parse = require('./../parser/parse');

module.exports = (function Read() {
  function readFiles() {
    return new Promise((resolve, reject) => {
      dir.files(Config.getConfig().src, (err, files) => {
        const promises = files.map(fileName => Parse.parseFile(fileName));

        Promise.all(promises).then(resolve).catch(reject);
      });
    });
  }

  return {
    readFiles
  };
}());
