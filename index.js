// Copied from https://github.com/visionmedia/jade/blob/master/lib/self-closing.js
var selfClosing = exports.selfClosing = (function() {
  var arr = [
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
  var obj = {}

  for (var i=0, l=arr.length; i<l; i++) obj[arr[i]] = true;

  return obj
})();

/*

  attributes [object]

    [string] : [string || array of strings || boolean]

*/

var attrToString = exports.attributesToString = function(attributes) {
  var buf = ''

  function append(prop) {
    var value = attributes[prop]
    if (Array.isArray(value)) value = value.join(' ');
    if (!value) return;

    buf += ' ' + prop
    if (value !== true) buf += '="' + value + '"';
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

*/
exports.createElement = function(tagName, attributes, block) {
  if (!block && attributes && Object(attributes) !== attributes) {
    block = attributes
    attributes = null
  }

  var buf = '<' + tagName
  if (attributes) buf += attrToString(attributes);
  buf += '>'
  if (block) buf += call(block);
  if (block || !selfClosing[tagName])) buf += '</' + tagName + '>';
  return buf
}

var render = exports.render = function(fn, locals, callback) {
  try {
    fn(locals, callback)
  } catch (err) {
    callback(err)
  }
}

/*
  
  Always caches due to `require`.

*/
exports.renderFile = function(filename, locals, callback) {
  render(require(filename), locals, callback)
}