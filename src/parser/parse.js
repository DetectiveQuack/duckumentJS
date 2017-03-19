const readline = require('readline');
const fs = require('fs');
const Tags = require('./tags');

module.exports = (function Parse() {
  let inCommentBlock = false;
  const block = {
    description: '',
    tags: []
  };

  /**
   * Parse description block, possibly would be better to have each seciton in its own
   * file, each section may need more logic such as links
   * @param {*} input
   */
  function getDescription(input) {
    const descLineSplit = input.split(new RegExp(Tags.KEY_LINE_START));

    if (descLineSplit.length > 0) {
      block.description += descLineSplit[1];
    }
  }

  function parseCommentBlockByLine(input) {
    const hasKeyTagAtStart = new RegExp(Tags.KEY_LINE_START_TAG_KEY).test(input);
    const hasText = new RegExp(Tags.TEXT_NUMBERS).test(input);

    if (!hasKeyTagAtStart && (block.tags.length === 0) && hasText) {
      getDescription(input);
    } else {
      console.log('do something else');
    }

    console.log(block);
  }

  function end() {
    console.log('end');
  }

  function start(input) {
    if (!inCommentBlock && Tags.BLOCK_COMMENT_START.test(input)) {
      inCommentBlock = true;
    }

    parseCommentBlockByLine(input);

    if (inCommentBlock && Tags.BLOCK_COMMENT_END.test(input)) {
      end();
    }
  }

  function parseFile(fileName) {
    const lineReader = readline.createInterface({ input: fs.createReadStream(fileName) });

    return new Promise((resolve, reject) => {
      lineReader
        .on('error', err => reject(err))
        .on('line', input => start(input.trim()))
        .on('end', () => resolve());
    });
  }

  return {
    parseFile
  };
}());
