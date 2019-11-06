// Tucker Lavell
// CS290 - Sprint 2018
// Project - needs express, express-handlebars, and request
// I want to make this better but my other classes also have a lot due at the same time.
// I wish I had more time to use handle bars more effectively and more javascript handling.
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var request = require('request');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 13134);
app.use(express.static('public'));

app.get('/',function(req,res){
	res.render('home');
});

app.get('/weather',function(req,res){
	var context = {};
	var apiKey = 'ab7fe912fdd1f5d454152ecb237b99bc';
	request('http://api.openweathermap.org/data/2.5/weather?q=richmond&appid=' + apiKey, handleGet);

	function handleGet(err, resp, body){
		if(!err && resp.statusCode < 400){
			context.owm = body;
			res.render('weather', context);
		}
		else {
			console.log(err);
			console.log(resp.statusCode);
		}
	} 
});

app.get('/download',function(req,res){
	res.render('dls');
});

app.get('/about',function(req,res){
	res.render('aboutMe');
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

