var express= require('express')
var bodyparser = require('body-parser')
var app = express()
var mongoose   = require('mongoose');
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json())
var Email     = require('./email');
var Answers =require('./answers');
var Questions = require ('./questions');
var assert = require('assert')

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;



var testurl = 'mongodb://localhost:27017/test';
MongoClient.connect(testurl, function(err, db) {
  assert.equal(err, null)
  console.log("Connected correctly to server.");
  db.close();
});


var insertDocument = function(db, input, callback){
    db.collection('data').insertOne(input, function(err, result){
        assert.equal(err, null)
        callback();
    })
}
// answers still need ID to match with correct anwer
app.get('/api/questions/getByPlayer', function(req,res){
    var url = 'mongodb://localhost:27017/iotdb/questions';
    mongoose.connect(url);
    Questions.find({},{
                    "answers.correct": 0,
                    "category":0
                }, function(err, questions){
        console.log("hoi")
        if(err){
            console.log(err);
            res.status(404).json({error: "fout"})
        } else{
            
            res.status(200).json({questions: questions});
        }
        mongoose.connection.close()
    }) 
    return res;
});

app.get('/api/questions/getByAdmin', function(req,res){
    var url = 'mongodb://localhost:27017/iotdb/questions';
    mongoose.connect(url);
    Questions.find({}, function(err, questions){
        if(err){
            console.log(err);
            res.status(404).json({error: "fout"})
        } else{

            res.status(200).json({questions: questions});
        }
        mongoose.connection.close()
    })
    return res;
});

app.get('/test', function(req,res){
    res.json({message: 'yaaayyy'});
});
app.post('/register', function(req, res){
    //console.error(err.stack);
    console.log(req.body);
    console.log('received an email', req.body.email);
    var newEmail = new Email({ email: req.body.email});
    var url = 'mongodb://localhost:27017/iotdb/emails';
    mongoose.connect(url);
    newEmail.save(function(err, newEmail){
        if(err){
            console.log(err);
        } 
        console.log("good job");
         mongoose.connection.close()
        console.log(newEmail);
        return res.status(200).json({
            status: 'Email is added',
            newEmail: newEmail
        });
    })
    });

app.post('/answer', function(req, res){
    console.log('log req.body', req.body);
    console.log('received the answers', req.body.answers);
    var newAnswers = new Answers ({ answers: req.body.answers, goodanswers: req.body.answers.state7.answersgood});
    var url = 'mongodb://localhost:27017/iotdb/answers'
    mongoose.connect(url);
    newAnswers.save(function(err, newAnswers){
        if(err){
            console.log(err);
        } 
        console.log("good job");
         mongoose.connection.close()
        console.log(newAnswers);
        return res.status(200).json({
            status: 'Answers are added',
            newAnswers: newAnswers
        });
    })
    });
    
app.get('/answer', function(req, res){
    var url = 'mongodb://localhost:27017/iotdb/answers'
    mongoose.connect(url);
    Answers.find({}, function(err, answers) {
        console.log(answers)
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        mongoose.connection.close()
        return res.status(200).json(answers);
    });
});

app.listen(2016, function(){console.log("listening on port 2016")})