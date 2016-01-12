'use strict'
var readline = require('readline');
var acceptableCommands = ["GO", "TAKE", "INVENTORY", "USE"]
var commands = require('./Commands.js');
var io = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports = {    
    executeCommand :
    function executeCommand(prompt, successCallback) {
        io.question(prompt, function(command) {  
            var commandArray = command.trim().split(" ");
            if (commandArray.length === 2) {
                var action = commandArray[0];
                var validityIndex = acceptableCommands.indexOf(action)
                      
                if (validityIndex === -1) {
                    executeCommand(prompt, successCallback);
                } else if (validityIndex === 0) {
                    commands.executeGo();
                    io.close();
                } else if (validityIndex === 1) {
                    commands.executeTake();
                    io.close();
                } else if (validityIndex === 2) {
                    commands.executeInventory();
                    io.close(); 
                } else if (validityIndex === 3) {
                    commands.executeUse();
                    io.close();
                }
                
            } else {
                executeCommand(prompt, successCallback);
            }
        });
    },
    
    prompt :
    function prompt(prompt, acceptableAnswers, successCallback) {
        io.question(prompt, function(answer) {        
            if (acceptableAnswers.indexOf(answer) === -1) {
                prompt(prompt, acceptableAnswers, successCallback);
                
            } else {
                successCallback(answer)
                io.close(); 
            }
        });
    }
}