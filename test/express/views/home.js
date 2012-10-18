module.exports = function(locals, callback) {
  console.log('ok...')
  console.log(locals)
  callback(null, locals.text)
}