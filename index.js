function I(x) {
  return x
}

var selfClosing = {
  meta: true,
  img: true,
  link: true,
  input: true,
  source: true,
  area: true,
  base: true,
  col: true,
  br: true,
  hr: true
}

/*

  attributes [object]

    [string] : [string || array of strings || object of strings || boolean]

*/
function attributesToString(attributes) {
  var buf = ''

  Object.keys(attributes).forEach(function(attribute) {
    var value = attributes[attribute]

    if (!value) return;

    if (Array.isArray(value)) {
      value = value.filter(I).join(' ')
    } else if (Object(value) === value) {
      value = Object.keys(value).filter(function (key) {
        return value[key]
      }).join(' ')
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
  if (block || !selfClosing[tagName]) buf += '</' + tagName + '>';
  return buf
}

exports.selfClosing = selfClosing

exports.attributesToString = attributesToString
