var selfClosing = exports.selfClosing = {
  meta: 1,
  img: 1,
  link: 1,
  input: 1,
  source: 1,
  area: 1,
  base: 1,
  col: 1,
  br: 1,
  hr: 1
}

/*

  attributes [object]

    [string] : [string || array of strings || boolean]

*/

var attrToString = exports.attributesToString = function(attributes) {
  var buf = ''

  function append(prop) {
    var value = attributes[prop]
    if (Array.isArray(value)) {
      value = value.filter(function(x) {
        return x
      }).join(' ')
    }
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