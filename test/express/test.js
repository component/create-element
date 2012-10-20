var assert = require('assert')

module.exports = function(callback) {
  require('request').get('http://127.0.0.1:3023', function(err, res, body) {
    assert.ifError(err)

    assert.equal('WOOO!', body, 'Did not receive correct response.')
    callback()
  })
}