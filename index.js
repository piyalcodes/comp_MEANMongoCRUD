const express = require("express");
var bodyParser = require('body-parser')

const MongoClient = require("mongodb").MongoClient; 

 
const app = express();

app.use(bodyParser.json())

app.listen(7000, () => {	
});

app.use(express.static('public'));

app.put('/query', (req, res) => { //create
	 
	var obj = { name: req.body.name, telephone: req.body.telephone, query : req.body.query };
	 
	MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
			
	  if (err) throw err		  
	 
		db.collection("query").insertOne(obj, function(err, result) {
			if (err) throw err;
			res.send(result);			 
		});	  
	});
 });


 app.delete('/query', (req, res) => { //delete
	
   	MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
		 
		 var myquery = { '_id': req.body.id };
		 
 		db.collection("query").remove(myquery, function(err, obj) {
			if (err) console.log(err,"wwwwww");;
			console.log("fffffffff");
			res.send('done');
			db.close();
 		});
	});
});
 
app.post('/query', (req, res) => { 
	
	MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {

		var obj = { name: req.body.name, telephone: req.body.telephone, query : req.body.query };
		var myquery = { '_id': req.body.id };
	 
		db.collection("query").updateOne(myquery, obj, function(err, result) {
		  if (err) throw err;
		  console.log("vvvvvvv")
		  db.close();
		  res.send(result);
		});
 
	});
});

app.get('/query', (req, res) => {
	
		MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
			//db.collection('query').remove();
			db.collection('query').find().toArray(function (err, result) {
				if (err) throw err
				res.send(result); 				 
			});
		  
		});	
		
		 
	});

app.get('/rm', (req, res) => {
	MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
		db.collection('query').remove();
	})
})