var express = require('express')
var http = require('http')
var cat = require('../../')

var app = express()

app.set('port', process.env.PORT || 3023)
app.set('views', __dirname + '/views')
app.engine('js', cat.renderFile)
app.set('view engine', 'js')

app.get('/', function(req, res) {
  res.locals.text = 'WOOO!'
  res.render('home')
})

app.use(express.errorHandler())

module.exports = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});