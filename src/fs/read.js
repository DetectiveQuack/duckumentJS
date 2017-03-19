const dir = require('node-dir');
const Config = require('./../config');
const Parse = require('./../parser/parse');

module.exports = (function Read() {
  function readFiles() {
    return new Promise((resolve, reject) => {
      dir.readFiles(Config.getConfig().src, { match: /.js$/ }, (err, file, next) => {
        if (err) return reject(err);

        Parse.parseFile(file);

        return next();
      }, () => resolve());
    });
  }

  return {
    readFiles
  };
}());
