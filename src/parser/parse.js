const RegExpConstants = require('./regExpConstants');
const Tags = require('./tags');

module.exports = (function Parse() {
  const doc = {
    class: '',
    author: '',
    originalSource: '',
    blocks: []
  };

  let currentBlock;

  let inCommentBlock = false;

  /**
   * Reset the current block
   */
  function setCurrentBlock() {
    currentBlock = {
      description: '',
      tags: []
    };
  }

  /**
   * Remove the asterix from the beginning of the line
   * @param {*} line
   */
  function removeAsterixFromStart(line) {
    if (new RegExp(RegExpConstants.KEY_LINE_START).test(line)) {
      return line.slice(1).trim();
    }

    return '';
  }

  /**
   * Process the line and the tag, populating the current block once processed
   * @param {*} line
   */
  function processTags(line) {
    const tag = line.slice(0, line.indexOf(' '));

    if (line.length === 0) {
      return;
    }

    let newTag = true;

    // No longer a new tag, most likely a new line
    if (tag.charAt(0) !== '@') {
      newTag = false;
    }

    const processedTag = Tags.processTags(line, tag);

    if (Object.keys(processedTag).length === 0) {
      return;
    }

    if (newTag) {
      currentBlock.tags.push(processedTag);
    } else {
      // For the moment add the value to the current tag value
      currentBlock.tags[currentBlock.tags.length - 1].value += `\n ${processedTag.value}`;
    }
  }

  /**
   * Parse description block, possibly would be better to have each seciton in its own
   * file, each section may need more logic such as links
   * @param {string} input
   */
  function getDescription(line) {
    currentBlock.description += line;
  }

  /**
   * Parse the line extracting the tags/description
   * @param {*} line
   */
  function parseCommentBlockByLine(line) {
    const hasKeyTagAtStart = RegExpConstants.KEY_LINE_START_TAG_KEY.test(line);
    const hasBlockCommentStart = RegExpConstants.BLOCK_COMMENT_START.test(line);
    const hasText = RegExpConstants.TEXT_NUMBERS.test(line);

    const cleanLine = removeAsterixFromStart(line);

    if (!hasKeyTagAtStart && (currentBlock.tags.length === 0) && hasText) {
      getDescription(cleanLine);
    } else if (!hasBlockCommentStart) {
      processTags(cleanLine);
      // Process tags here, get tags from plugins/modules
    }
  }

  /**
   * Perform the cleanup and get the function name if any
   */
  function end() {
    doc.blocks.push(currentBlock);

    setCurrentBlock();
    // console.log(...doc.blocks.map(b => b.tags));
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
