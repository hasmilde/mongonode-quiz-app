var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var QuestionsSchema   = new Schema({
    question: String,
    answers: [{body:String, correct:Boolean}],
    category: String
});


Team.find({  
    'GroupName': gname
  }, function(err, teams) {
    if (err) {
      onErr(err, callback);
    } else {
      mongoose.connection.close();
      console.log(teams);
      callback("", teams);
    }
  }); 
  
module.exports = mongoose.model('Questions', QuestionsSchema);