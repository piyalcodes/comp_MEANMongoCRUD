const express = require("express");

const MongoClient = require("mongodb").MongoClient; 

 
const app = express();

app.listen(7000, () => {
	
	
	
});


app.get('/home', (req, res) => {
		 
		var myobj = { name: "Company Inc", address: "Highway 37" };
		
		var tt;
		MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
				
		  if (err) throw err		  
		 
			db.collection("customers").insertOne(myobj, function(err, res) {
				if (err) throw err;
				tt  = res;
				console.log("1 document inserted");
				db.close(); 
			});
	

			db.collection('customers').find().toArray(function (err, res) {
				if (err) throw err
				tt  = res;
				console.log(tt);
			});
		  
		});
		
		 
 res.send(tt);
		
		//res.send("test");;
		
		
	});


