const walk = require('walk');
const Config = require('./../config');
const Parse = require('./../parser/parse');

module.exports = (function Read() {
  function readFiles() {
    const walker = walk.walk(Config.getConfig().src);

    walker.on('file', (root, fileStats, next) => {
      Parse.parseFile(`${root}/${fileStats.name}`)
        .then(() => next());
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
