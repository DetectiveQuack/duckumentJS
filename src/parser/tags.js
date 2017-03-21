module.exports = (function Tags() {
  const tags = {
    processParam: (line, tag) => {
      const endTypeBracketIndex = line.indexOf('}');
      const type = line.slice(line.indexOf('{') + 1, endTypeBracketIndex);

      const trimmedLine = line.slice(endTypeBracketIndex + 1).trim();

      const variable = trimmedLine.slice(0, trimmedLine.indexOf(' ')).trim();
      const value = line.slice(line.indexOf(variable) + variable.length).trim();

      return {
        tag,
        type,
        variable,
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
