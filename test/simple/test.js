var cat = require('../../cat')
var assert = require('assert')
var fs = require('fs')

var filename = __dirname + '/template.js'
var locals = {
  href: '#',
  title: 'kitty'
}
var result = '<a href="#" target="_blank" title="kitty">kitty</a>'

cat.compile(fs.readFileSync(filename, 'utf-8'), locals, function(err, html) {
  assert.ifError(err)

  assert.equal(result, html, 'Incorrect HTML: ' + html)
  console.log('Compile works!')
})

cat.render(filename, {
  locals: locals
}, function(err, html) {
  assert.ifError(err)

  assert.equal(result, html, 'Incorrect HTML: ' + html)
  console.log('Woo!')
})