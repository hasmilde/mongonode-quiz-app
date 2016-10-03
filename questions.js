var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var QuestionsSchema   = new Schema({
    question: String,
    answers: [{body:String, correct:Boolean}],
    category: String
});

//This function is handling the Response for the GET call from the Player of the quizz
//It returns the questions with the answers but without the correctness of the answer, because otherwise this can be seen in the response in client.


// This function is handling the POST call when the Player submitted 1 answer.
/* format of this post should be: 
    { questionID: 21as231fs,
      givenAnswers [{_id:ae112, answerValid: true},{_id:ae112, answerValid: true}]
    }
*/
//It returns the givenAnswers and whether those were valid or not. 

/*Questions.checkAnswers() = {
    
    //TO-DO: write function to query on questionID
    //TO-DO: write function to loop though question by answerID
    //TO-DO: write function to check answers against given answer
    
    //This is what the response should be to the POST call
    return {
        givenAnswers: [
            {_id:ae112, answerValid: true}
            ]
    }
}


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
  }); */

module.exports = mongoose.model('Questions', QuestionsSchema);
