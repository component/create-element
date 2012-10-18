exports = module.exports = function() {
  // Hi, I do nothing.
}

// Copied from https://github.com/visionmedia/jade/blob/master/lib/self-closing.js
var selfClosing = exports.selfClosing = [
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

exports.el = function el(tagName, attributes, innerHTML) {
  if (typeof attributes === 'string') {
    innerHTML = attributes
    attributes = null
  }

  var buf = '<' + tagName

  if (attributes) {
    for (var prop in attributes) {
      var value = attributes[prop]
      if (value) {
        buf += ' ' + prop
        if (value !== true) buf += '="' + value + '"';
      }
    }
  }

  buf += '>'

  if (innerHTML) buf += innerHTML;

  if (innerHTML || !~selfClosing.indexOf(tagName)) buf += '</' + tagName + '>';

  return buf
}

exports.extends = function(fnChild, fnParent) {
  return function(locals, html, callback) {
    fnChild(locals, '', function(err, html) {
      if (err) callback(err);
      else fnParent(locals, html, callback);
    })
  }
}

var compile = exports.compile = function(fn, options, callback) {
  fn.call(options.context, options.locals, options.block, callback)
}

/*
  
  Filename should be absolute for no caching to work.
  This is the node.js implementation.

  If you're disabling caching on the client-side,
  you're probably doing something wrong.

  Would be nice if component had an uncache function, however.

*/
exports.render = function(filename, options, callback) {
  if (!options.cache && require.cache) delete require.cache[filename];

  compile(require(filename), options, callback)
}