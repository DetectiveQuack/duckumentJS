const walk = require('walk');
const fs = require('fs');
const Config = require('./../config');
const Parse = require('./../parser/parse');

module.exports = (function Read() {
  const walker = walk.walk(Config.getConfig().src);

  function readFiles() {
    walker.on('file', (root, fileStats, next) => {
      fs.readFile(fileStats.name, (err, file) => {
        Parse.parseFile(file)
          .then(() => next());
      });
    });

    return new Promise((resolve, reject) => {
      walker
        .on('end', () => resolve())
        .on('error', err => reject(err));
    });
  }

  return {
    readFiles
  };
}());
