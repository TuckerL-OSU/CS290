// Tucker Lavell
// CS290 - Sprint 2018
// Week 9 - DB Interactions & UI
// Heavily influenced by examples I found on the internet.
// I tried to comment as best I could
// sources: https://github.com/jtopgi/CS290/tree/master/Homework/HW_006
//	https://github.com/TylerC10/CS290-Web-Development/tree/master/Database%20Interactions%20and%20UI
//	https://github.com/gregmankes/CS290-dbinteractions
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var mysql = require("mysql");

// should hide these, but you won't steal them right?
var pool = mysql.createPool({                   
    host: "classmysql.engr.oregonstate.edu",
    user: "cs290_lavellt",
    password: "4000",                           
    database: "cs290_lavellt"
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 13139);
app.use(express.static('public'));

app.get('/',function(req,res, next) {
	var context = {};
	
	// get all items currently in the table
    pool.query('SELECT * FROM workouts', function(err, rows, fields) {
	
    if(err) {                                                                    
        next(err);
        return;
    }
    
	// "table" of exercises returned
	var table = [];
	// gets the data for each cell of the each row returned
    for(var row in rows) {
		// put the data into a json obj to
        var exercise = {'name': rows[row].name, 
                    'reps': rows[row].reps, 
                    'weight': rows[row].weight, 
                    'date': rows[row].date, 
                    'id': rows[row].id};
					if(rows[row].lbs) {
						exercise.lbs = "lbs";
					}
					else{
						exercise.lbs = "kg";
					}
		
		// add the exercise into the table
        table.push(exercise); 
    }
	
	// set the table to the page context
    context.results = table;
    res.render('home', context);
    })
});

// insert taken from lecture
app.get('/insert',function(req,res,next) {
	var context = {};
	
	// ? used to prevent sql injection
	pool.query("INSERT INTO `workouts` (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)",
		[req.query.exercise,                
		req.query.reps, 
		req.query.weight, 
		req.query.date, 
		req.query.unitCheck], 
		// error/response handler
		function(err, response) {
			if(err) {
			  next(err);
			  return;
			}
			// get the values from the page context
			context.inserted = response.insertId;
			// make them into an object to send to the database
			res.send(JSON.stringify(context));
	});
});

// delete taken from lecture
app.get('/delete', function(req, res, next) {
    var context = {};    
	
    pool.query("DELETE FROM `workouts` WHERE id=?",
        [req.query.id], 
        function(err, result) {
            if(err) {
                next(err);
                return;
            }
    });
});

// get the current info about an exercise by its id
app.get('/getExercise',function(req, res, next) {
    var table = {};
	
	// select the id of the exercise to modify
    pool.query('SELECT * FROM `workouts` WHERE id=?',
        [req.query.id], 
        function(err, rows, fields) {
            if(err){
                next(err);
                return;
            }
			
			// similar to insert
            var exercise = [];
			
			// get each element of the exercise
            for(var row in rows) {
                var exerciseToUpdate = {'name': rows[row].name, 
                            'reps': rows[row].reps, 
                            'weight': rows[row].weight, 
                            'date':rows[row].date, 
                            'lbs':rows[row].lbs,
                            'id':rows[row].id};
				
                exercise.push(exerciseToUpdate);
            }
		
		
        table.results = exercise[0];
		// send the table (with its one exercise) to be editExercise to update
        res.render('updatePage', table);
    });
});

// page where we actually update the exercise info
app.get('/editExercise', function(req, res, next) {
    var context = {};
	
	// get the exercise to update from id
    pool.query("SELECT * FROM `workouts` WHERE id=?",
        [req.query.id], 
        function(err, result) {
            if(err) {
                next(err);
                return;
            }
			
            if(result.length == 1){                
                var current = result[0];

                
                if(req.query.unitCheck === "on") {
                    req.query.unitCheck = "1";
                }
                else{
                    req.query.unitCheck = "0";
                }
				
				// update the id with the new parameters for the exercise
                pool.query('UPDATE `workouts` SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=?',
                [req.query.exercise || current.name, 
                req.query.reps || current.reps, 
                req.query.weight || current.weight, 
                req.query.date || current.date, 
                req.query.unitCheck, 
                req.query.id],
                function(err, result) {
                    if(err) {
                        next(err);
                        return;
                    }
					
					// find fields of the exercise to update
                    pool.query('SELECT * FROM `workouts`', function(err, rows, fields){     
                        if(err) {
                            next(err);
                            return;
                        }
                        var table = [];

                        for(var row in rows) {
                            var exercise = {'name': rows[row].name,
                            'reps': rows[row].reps,
                            'weight': rows[row].weight, 
                            'date':rows[row].date, 
                            'id':rows[row].id};

                            if(rows[row].lbs) {
                                exercise.lbs = "lbs";
                            }
                            else{
                                exercise.lbs = "kg";
                            }
                            table.push(exercise);
                        }
						
						// change the context of the page to the updated table
                        context.results = table;
						// display the new table
                        res.render('home', context);
                    });
                });
            }
    });
});


// given with assignment
app.get('/reset-table',function(req,res,next){
  var context = {};
  pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
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