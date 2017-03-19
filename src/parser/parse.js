const readline = require('readline');
const fs = require('fs');
const Tags = require('./tags');

module.exports = (function Parse() {
  const block = {
    className: '',
    description: '',
    tags: []
  };

  let inCommentBlock = false;

  /**
   * Parse description block, possibly would be better to have each seciton in its own
   * file, each section may need more logic such as links
   * @param {string} input
   */
  function getDescription(input) {
    const descLineSplit = input.split(new RegExp(Tags.KEY_LINE_START));

    if (descLineSplit.length > 0) {
      block.description += descLineSplit[1];
    }
  }

  function parseCommentBlockByLine(input) {
    const hasKeyTagAtStart = new RegExp(Tags.KEY_LINE_START_TAG_KEY).test(input);
    const hasBlockCommentEnd = new RegExp(Tags.BLOCK_COMMENT_END).test(input);

    const hasText = new RegExp(Tags.TEXT_NUMBERS).test(input);

    if (!hasKeyTagAtStart && (block.tags.length === 0) && hasText) {
      getDescription(input);
    } else if (hasBlockCommentEnd) {
      // Block comment over sort out block comment
    } else {
      // Process tags here, get tags from plugins/modules
    }
  }

  function end() {
    // end of read, handle end of class/file
  }

  /**
   * Start the parsing process
   * @param {*} input
   */
  function start(input) {
    if (!inCommentBlock && Tags.BLOCK_COMMENT_START.test(input)) {
      inCommentBlock = true;
    }

    parseCommentBlockByLine(input);

    if (inCommentBlock && Tags.BLOCK_COMMENT_END.test(input)) {
      end();
    }
  }

  /**
   * Read the file line by line
   * @param {*} fileName
   */
  function parseFile(fileName) {
    const lineReader = readline.createInterface({ input: fs.createReadStream(fileName) });

    return new Promise((resolve, reject) => {
      lineReader
        .on('line', input => start(input.trim()))
        .on('close', () => resolve(block))
        .on('error', err => reject(err));
    });
  }

  return {
    parseFile
  };
}());
