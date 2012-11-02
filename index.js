function I(x) {
  return x
}

var selfClosing = {
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
function attributesToString(attributes) {
  var buf = ''

  Object.keys(attributes).forEach(function(attribute) {
    var value = attributes[attribute]
    if (Array.isArray(value)) {
      value = value.filter(I).join(' ')
    }
    if (!value) return;

    buf += ' ' + attribute
    if (value !== true) buf += '="' + value + '"';
  })

  return buf
}

/*

  tagName [string]
  attributes [object] (optional)
  block [string || function] (optional)

*/
exports = module.exports = function(tagName, attributes, block) {
  if (!block && attributes && Object(attributes) !== attributes) {
    block = attributes
    attributes = null
  }

  var buf = '<' + tagName
  if (attributes) buf += attributesToString(attributes);
  buf += '>'
  if (block) buf += typeof block === 'function' ? block() : block;
  if (block || !selfClosing[tagName])) buf += '</' + tagName + '>';
  return buf
}

exports.selfClosing = selfClosing

exports.attributesToString = attributesToString