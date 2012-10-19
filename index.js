// Copied from https://github.com/visionmedia/jade/blob/master/lib/self-closing.js
var selfClosing = exports.selfClosingTags = [
  'meta',
  'img',
  'link',
  'input',
  'source',
  'area',
  'base',
  'col',
  'br',
  'hr'
]

var attrToString = exports.attributesToString = function(attributes) {
  var buf = ''
  for (var prop in attributes) {
    var value = attributes[prop]
    if (value) {
      buf += ' ' + prop
      if (value !== true) buf += '="' + value + '"';
    }
  }
  return buf
}

// A block can be a string or a synchronous function
var call = exports.call = function(fn, context) {
  return typeof fn === 'function' ? fn.apply(context) : fn
}

/*

  tagName [string]
  attributes [object]
  innerHTML [string || function]

*/
exports.createElement = function(tagName, attributes, innerHTML) {
  var buf = '<' + tagName
  if (attributes) buf += attrToString(attributes);
  buf += '>'
  if (innerHTML) buf += call(innerHTML, attributes || {});
  if (innerHTML || !~selfClosing.indexOf(tagName)) buf += '</' + tagName + '>';
  return buf
}

var render = exports.render = function(fn, options, callback) {
  try {
    fn.call(options, options, callback)
  } catch (err) {
    callback(err)
  }
}

/*
  
  Filename should be absolute for no caching to work.
  This is the node.js implementation.

  If you're disabling caching on the client-side,
  you're probably doing something wrong.

  Would be nice if component had an uncache function, however.

*/
var renderFile = exports.renderFile = function(filename, options, callback) {
  if (!options.cache && require.cache) delete require.cache[filename];

  render(require(filename), options, callback)
}