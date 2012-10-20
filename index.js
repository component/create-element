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

/*

  attributes [object]

    [string] : [string || array of strings || boolean]

*/

var attrToString = exports.attributesToString = function(attributes) {
  var buf = ''

  function append(prop) {
    var value = attributes[prop]
    if (!value) return;

    buf += ' ' + prop
    if (Array.isArray(value)) value = value.join(' '); // For an array of classes
    if (value !== true) buf += '="' + String(value) + '"';
  }

  for (var prop in attributes) append(prop);

  return buf
}

/*

  block [string || function]

*/
var call = exports.call = function(block) {
  return typeof block === 'function' ? block() : block
}

/*

  tagName [string]
  attributes [object] (optional)
  block [string || function] (optional)

  future: allow tagName to be a selector
    div#id.class1.class2[prop="value"]

*/
exports.createElement = function(tagName, attributes, block) {
  if (!block && attributes && Object(attributes) !== attributes) {
    attributes = null
    block = attributes
  }

  var buf = '<' + tagName
  if (attributes) buf += attrToString(attributes);
  buf += '>'
  if (block) buf += call(block);
  if (block || !~selfClosing.indexOf(tagName)) buf += '</' + tagName + '>';
  return buf
}

var render = exports.render = function(fn, options, callback) {
  try {
    fn(options, callback)
  } catch (err) {
    callback(err)
  }
}

/*
  
  Always caches due to `require`.

*/
exports.renderFile = function(filename, options, callback) {
  render(require(filename), options, callback)
}