const RegExpConstants = require('./regExpConstants');
const Tags = require('./tags');

module.exports = (function Parse() {
  const doc = {
    className: '',
    originalSource: '',
    blocks: []
  };

  let currentBlock;

  let inCommentBlock = false;

  function setCurrentBlock() {
    currentBlock = {
      description: '',
      tags: {}
    };
  }

  function removeAsterixFromStart(line) {
    const lineSplit = line.split(new RegExp(RegExpConstants.KEY_LINE_START));

    return lineSplit.length > 1 ? lineSplit[1] : '';
  }

  /**
   * Parse description block, possibly would be better to have each seciton in its own
   * file, each section may need more logic such as links
   * @param {string} input
   */
  function getDescription(line) {
    currentBlock.description += line;
  }

  function parseCommentBlockByLine(line) {
    const hasKeyTagAtStart = RegExpConstants.KEY_LINE_START_TAG_KEY.test(line);
    const hasBlockCommentStart = RegExpConstants.BLOCK_COMMENT_START.test(line);
    const hasText = RegExpConstants.TEXT_NUMBERS.test(line);

    const cleanLine = removeAsterixFromStart(line);

    if (!hasKeyTagAtStart && (Object.keys(currentBlock.tags).length === 0) && hasText) {
      getDescription(cleanLine);
    } else if (!hasBlockCommentStart) {
      Tags.processTags(cleanLine, currentBlock.tags, doc);
      // Process tags here, get tags from plugins/modules
    }
  }

  function end() {
    doc.blocks.push(currentBlock);

    setCurrentBlock();
    // reset block var (new it)
    // end of read, handle end of class/file
    // get function name as this is after comment block
  }

  /**
   * Start the parsing process
   * @param {*} input
   */
  function start(input) {
    if (!inCommentBlock && RegExpConstants.BLOCK_COMMENT_START.test(input)) {
      inCommentBlock = true;
    }

    if (inCommentBlock && RegExpConstants.BLOCK_COMMENT_END.test(input)) {
      end();
    } else {
      parseCommentBlockByLine(input);
    }
  }

  /**
   * Read the file line by line
   * @param {*} fileName
   */
  function parseFile(file) {
    const splitFile = file.split('\n');

    doc.originalSource = file;

    setCurrentBlock();

    splitFile.forEach(line => start(line.trim()));
  }

  return {
    parseFile
  };
}());
