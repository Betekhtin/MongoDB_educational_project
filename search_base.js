/*
    Search base
    Only test purposes for now
*/

var MongoClient = require('mongodb').MongoClient,
    format = require('util').format;

var url = 'mongodb://127.0.0.1:27017';
var searchParam = {};

MongoClient.connect(url, function (err, db) {

    if (err) {
        throw err;
    } else {
        console.log("Connected");
    }
    students = db.collection('students');
    students.findOne(searchParam, {}, function (err, doc) {
        if (err) {
            throw err;
        } else {
            console.log("Document add:\n", doc);
        }
    });
    db.close();

});