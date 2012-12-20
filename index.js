function createElement(tagName, attributes, block) {
  return createElement.element.call(this, tagName, attributes, block)
}

module.exports = createElement

/*

  tagName [string]
  attributes [object] (optional)
  block [string || function] (optional)

*/
createElement.element = function (tagName, attributes, block) {
  if (!block && attributes && Object(attributes) !== attributes) {
    block = attributes
    attributes = null
  }

  var buf = createElement.openingTag(tagName, attributes)

  if (block) {
    if (typeof block === 'function') {
      buf += block.call(this, '')
    } else {
      buf += block
    }
  }

  if (block || !createElement.selfClosingTags[tagName]) {
    buf += createElement.closingTag(tagName)
  }

  return buf
}

createElement.openingTag = function (tagName, attributes) {
  return '<' + tagName +
    (attributes ? createElement.attributes(attributes) : '') +
    '>'
}

createElement.closingTag = function (tagName) {
  return '</' + tagName + '>'
}

/*

  attributes [object]

    [string] : [string || array of strings || object of booleans || boolean]

  result will have a leading space

*/
createElement.attributes = function (attributes) {
  var buf = ''

  Object.keys(attributes).forEach(function (attribute) {
    var value = attributes[attribute]

    if (!value) return;

    if (Array.isArray(value)) {
      value = value.filter(function (x) {
        return x
      }).join(' ')
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

createElement.selfClosingTags = {
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