exports = module.exports = function(locals, callback) {
  var anchor = el('a', {
    href: locals.href,
    target: '_blank',
    title: locals.title
  }, locals.title)

  callback(null, anchor)
}