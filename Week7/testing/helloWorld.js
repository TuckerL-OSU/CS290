var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', 10015);

function genRandom() {
 var number = {};
 number.num = Math.random();
 return number;
}

app.get('/',function(req,res){
 res.type('text/plain');
 res.send('Hard Coded Random Number: ' + Math.random() );
});

app.get('/random',function(req,res){
	res.render('home', genRandom());
});

app.get('/other-page',function(req,res){
  //res.type('text/plain');
  //res.send('Welcome to the other page!');
   res.render('other-page');
});

app.use(function(req,res){
 // res.type('text/plain');
  res.status(404);
 // res.send('404 - Not Found');
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
 // res.send('500 - Server Error');
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
