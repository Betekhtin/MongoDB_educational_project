var querystring = require("querystring");
var crypto = require('crypto');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient,
    format = require('util').format;

var url = 'mongodb://127.0.0.1:27017';

/*
    index page handler
*/
function start(response, postData) {
    console.log("Request handler 'start' was called.");
    response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf8'
    });
    fs.createReadStream('index.html').pipe(response);
}

/*
    /add handler
    Prints added data to console and browser
    Adds document to the database
*/
function add(response, postData) {
    console.log("Request handler 'add' was called.");
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    var student = {
        name: querystring.parse(postData).name,
        faculty: querystring.parse(postData).faculty,
        course: querystring.parse(postData).course,
    }
    student.hash = crypto.createHash('md5').update(student.name + student.faculty + student.course).digest('hex');
    
    response.write("Student: " + student.name + "\n" +
                   "Faculty: " + student.faculty + "\n" +
                   "Course: " + student.course + "\n" +
                   "Hash: " + student.hash);
    response.end();
    /*
        Connect to base -> write document -> disconnect
    */
    MongoClient.connect(url, function (err, db) {

        if (err) {
            throw err;
        } else {
            console.log("Connected");
        }
        students = db.collection('students');
        students.insert(student);
        students.findOne({name: "123"}, {}, function (err, doc) {
            if (err) {
                throw err;
            } else {
                console.log("Document add:\n", doc);
            }
        });
        db.close();

    });
}

exports.start = start;
exports.add = add;