var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AnswersSchema   = new Schema({
    answers: {},
    goodanswers: Number
});

module.exports = mongoose.model('Answers', AnswersSchema);