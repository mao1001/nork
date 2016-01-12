'use strict'
var readline = require('readline');
var acceptableCommands = ["GO", "TAKE", "INVENTORY", "USE"]
var io = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports = {    
    
    prompt :
    function prompt(prompt, acceptableAnswers, successCallback) {
        io.question(prompt, function(answer) {        
            if (acceptableAnswers.indexOf(answer) === -1) {
                prompt(prompt, acceptableAnswers, successCallback);
                
            } else {
                successCallback(answer);
                io.close(); 
            }
        });
    },
    
    executeCommand :
    function executeCommand(prompt, acceptableActions, acceptableNouns, successCallback) {
        io.question(prompt, function(answer) {
            var commands = answer.trim().toUpperCase().split(" ");
            
            if (commands.length === 2) {
                var action = commands[0];
                var noun = commands[1];
                
                if (acceptableActions.indexOf(action) === -1 || acceptableNouns.indexOf(noun) === -1) {
                    executeCommand(prompt, acceptableActions, acceptableNouns, successCallback);
                } else {
                    successCallback(action, noun);
                    io.close();
                }
            }
        });
    }
}