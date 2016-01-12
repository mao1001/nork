'user strict'
var readline = require('readline');
var validCommands = ["GO", "TAKE", "USE", "INVENTORY"];

function executeGo() {
    console.log("GOING PLACES")
}

function executeTake(player, world, noun) {
    var itemChoice;
    
    for (var i = 0; i < world.items.length; i++) {
        if (world.items[i].id.toUpperCase() === noun) {
            itemChoice = world.items[i];
            console.log("You acquired : " + itemChoice.id);
            console.log(itemChoice.description);
        }
    }
    
    if (itemChoice) {
            player.inventory.push(itemChoice);
    } else {
            console.log("Error. '" + noun + "' was not found in the item database.");
    }
}

function executeUse() {
    console.log("USING THINGS")
}

function executeInventory(player) {
    if (player && player.inventory) {
        console.log("Inventory:");
        for (var i = 0; i < player.inventory.length; i++) {
            console.log("-----");
            console.log("   " + player.inventory[i].id);
            console.log("   " + player.inventory[i].description);
            console.log("-----");
        }
        console.log("End of inventory.");   
    } else {
        console.log("You have no inventory!")
    }
}

module.exports = {
    executeCommand :
    function executeCommand(io, player, world, prompt, acceptableNouns, successCallback) {
        io.question(prompt, function(answer) {
            var response = answer.trim().toUpperCase().split(" ");
            // console.log("---This is the response I got: " + response)
            // console.log("---Length of response: " + response.length);
            //First test if this is a valid command.
            if (response.length >= 1 && (validCommands.indexOf(response[0].toUpperCase()) != -1))  {
                //It is valid command.
                var command = response[0];
                
                // console.log("---This is the command i'm attempting: " + command);
                if (command === "GO") {
                    //
                    executeGo();
                    successCallback();
                    //io.close();
                    //
                } else if (command === "TAKE") {
                    //
                    if (response.length === 2) {
                        var itemRequested = response[1].toUpperCase();
                        if (acceptableNouns.indexOf(itemRequested) != -1) {
                            executeTake(player, world, itemRequested);
                            successCallback();
                            //io.close();
                        } else {
                            console.log("That is not a item you can take.");
                            console.log();
                            executeCommand(player, world, prompt, acceptableNouns, successCallback);
                        }
                    } else {
                        console.log("You didn't specify something to take.");
                        console.log();
                        executeCommand(player, world, prompt, acceptableNouns, successCallback);
                    }
                    //
                } else if (command === "USE") {
                    //
                    executeUse();
                    successCallback();
                    //io.close();
                    //
                } else if (command === "INVENTORY") {
                    //
                    if (response.length === 1) {
                        executeInventory(player);
                        successCallback();
                        //io.close();
                    } else {
                        console.log("The command INVENTORY is not an action. Enter INVENTORY by itself to check your INVENTORY.")
                        console.log();
                        executeCommand(player, world, prompt, acceptableNouns, successCallback);
                    }
                    //
                }
                
            } else {
                console.log("This is not a valid command."); 
                console.log()
                executeCommand(player, world, prompt, acceptableNouns, successCallback);               
            }
            
        });
    }
}