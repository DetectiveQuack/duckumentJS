module.exports = (function Tags() {
  const tags = {
    processAuthor: (line, tag) => {
      const name = line.slice(tag.length).trim();

      return {
        tag,
        name
      };
    }
  };

  function processTags(line, tag) {
    const tagName = tag.charAt(1).toUpperCase() + tag.slice(2);
    const processFn = tags[`process${tagName}`];

    if (typeof processFn === 'function') {
      return processFn(line, tag);
    }

    return {};
  }

  return {
    processTags
  };
}());
