'use strict'
var readline = require('readline');
var io = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports = {
    askQuestion : 
    function askQuestion(question, acceptableAnswers, successCallback) {
        io.question(question, function(answer) {        

            if (acceptableAnswers.indexOf(answer) === -1) {
                
                askQuestion(question, acceptableAnswers, successCallback);
            } else {
                successCallback(answer)
                io.close(); 
            }
        });
    }
}
