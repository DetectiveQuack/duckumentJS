module.exports = (function RegExpConstants() {
  // Start of key tags
  const START_TAG_KEY = '@';

  // RegExp for `*      ` this is used for getting the key tags,
  // as each line will start with an asterix with spaces/tabs
  const KEY_LINE_START = '\\*\\s*';

  // Start of line RegExp plug the start tag key
  const KEY_LINE_START_TAG_KEY = new RegExp(`${KEY_LINE_START}${START_TAG_KEY}`);

  // Matches /********
  const BLOCK_COMMENT_START = /^\/\*/;

  // Matches ********/
  const BLOCK_COMMENT_END = /\*\//;

  const TEXT_NUMBERS = new RegExp(`${KEY_LINE_START}[a-zA-Z0-9]+`);

  const ASTERIX_ONLY = /\*[^a-zA-Z0-9]/;

  return {
    BLOCK_COMMENT_START,
    BLOCK_COMMENT_END,
    KEY_LINE_START,
    KEY_LINE_START_TAG_KEY,
    TEXT_NUMBERS,
    ASTERIX_ONLY
  };
}());
