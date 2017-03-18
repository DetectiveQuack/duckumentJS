const Config = require('./config');

const config = new Config();

config.readFile()
  .then(() => {
    console.log(arguments);
  });
