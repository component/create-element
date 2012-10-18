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

// From underscore
var defaults = exports.defaults = function(obj, def) {
  for (var key in def) {
    if (obj[key] == null) {
      obj[key] = def[key]
    }
  }
  return obj
}

// A block can be a string or a synchronous function
var call = exports.call = function(fn, context) {
  return typeof fn === 'function' ? fn.apply(context) : fn
}

exports.createElement = function(tagName, attributes, innerHTML) {
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

  if (innerHTML) buf += call(innerHTML, attributes || {});

  if (innerHTML || !~selfClosing.indexOf(tagName)) buf += '</' + tagName + '>';

  return buf
}

exports.defaultAttributes = function(args, def) {
  var last = args[args.length - 1]
  if (last === Object(last) {
    return def ? defaults(last, def) : last
  })
  return {}
}

var render = exports.render = function(fn, options, callback) {
  try {
    fn.call(options.context || options, options, callback)
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