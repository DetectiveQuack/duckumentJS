module.exports = (function Tags() {
  const tags = {
    processParam: (line, tag) => {
      const value = line.slice(tag.length).trim();
      const type = line.slice(line.indexOf('{') + 1, line.indexOf('}'));

      return {
        tag,
        type,
        value
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
