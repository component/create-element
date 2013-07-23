module.exports = createElement
createElement.openingTag = openingTag
createElement.closingTag = closingTag
createElement.attributes = createAttributes
var selfClosingTags = createElement.selfClosingTags = {
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

  tagName [string]
  attributes [object] (optional)
  block [string || function] (optional)

*/
function createElement(tagName, attributes, block) {
  if (~['function', 'string'].indexOf(typeof attributes)) {
    block = attributes
    attributes = null
  }

  return openingTag(tagName, attributes) +
    (block ? (typeof block === 'function' ? block.call(this, '') : block) : '') +
    (block || !selfClosingTags[tagName] ? closingTag(tagName) : '')
}

function openingTag(tagName, attributes) {
  return '<' + tagName +
    (attributes ? createAttributes(attributes) : '') +
    '>'
}

function closingTag(tagName) {
  return '</' + tagName + '>'
}

/*

  attributes [object]

    [string] : [string || array of strings || object of booleans || boolean]

  result will have a leading space

*/
function createAttributes(attributes) {
  var buf = ''

  Object.keys(attributes).forEach(function (attribute) {
    var value = attributes[attribute]
    if (!value && value !== '') return;

    value = Array.isArray(value) ? validValues(value)
      : Object(value) === value ? validKeys(value)
      : value
    if (!value && value !== '') return;

    buf += ' ' + attribute
    if (value !== true) buf += '="' + value + '"';
  })

  return buf
}

function validValues(array) {
  return array.filter(Boolean).join(' ')
}

function validKeys(object) {
  return Object.keys(object).filter(function (key) {
    return object[key]
  }).join(' ')
}
