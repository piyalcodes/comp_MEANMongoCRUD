const express = require("express");

const MongoClient = require("mongodb").MongoClient; 

 
const app = express();

app.listen(7000, () => {	
});

app.use(express.static('public'));


app.get('/home', (req, res) => {
		 
		var myobj = { name: "Company Inc", address: "Highway 37" };
		
		var tt;
		MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
				
		  if (err) throw err		  
		 
			db.collection("customers").insertOne(myobj, function(err, result) {
				if (err) throw err;
				tt  = result;
				//res.send(tt);
				 
			});
			

			db.collection('customers').find().toArray(function (err, result) {
				if (err) throw err
				tt  = result;
				res.send(tt);
			});
		  
		});
		
		 
 //res.send(tt);
		
		//res.send("test");;
		
		
	});


