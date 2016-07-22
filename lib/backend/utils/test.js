'use strict'

var Cb = require('couchnode-pro').default;
var db = new Cb({}, {cluster : 'couchbase://127.0.0.1'});

db.read('1000')
.then((data) => { 
	console.dir(data); 
})
.catch((e) => { 
	console.log('crap',e);
});

db.read('1000', {})
.then((data) => { 
	console.dir(data); 
})
.catch((e) => { 
	console.log('crap',e);
});

/*
#db.upsert('1000', {
#  _id: '1000'
#}, {
#  
#})
#.then((data) => { 
#	console.dir(data); 
#})
#.catch((e) => { 
#	console.log('crap',e);
#});
*/
