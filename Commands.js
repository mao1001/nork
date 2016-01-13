'user strict'
var validCommands = ["GO", "TAKE", "USE", "INVENTORY"];
var validDirections = ["NORTH", "EAST", "SOUTH", "WEST"];

function executeGo(response, io, player, world, prompt, acceptableNouns, successCallback) {
    //Makes sure that the user responded with a second word
    if (response.length === 2) {
        var direction = response[1].toUpperCase();
        
        //Checks to make sure the second word is a direction
        if (validDirections.indexOf(direction) != -1) {
            //Checks to make sure the second word is a valid direction to move to.
            if (acceptableNouns.indexOf(direction) != -1) {
                console.log("You head " + direction);
                console.log("You were in:" + player.location[0].id);
                var newLocation = nextLocation(direction, player, world);
                player.location.pop();
                player.location.push(newLocation);
                console.log("You are now in:" + player.location[0].id);
                successCallback();
            } else {
                //The user cannot move in that direction at this time.
                console.log("You cannot go in that direction");
                console.log();
                executeCommand(io, player, world, prompt, acceptableNouns, successCallback);
            }
        } else {
            //The user entered a word that isn't a direction.
            console.log("That is not a valid direction");
            console.log();
            executeCommand(io, player, world, prompt, acceptableNouns, successCallback);
        }
    } else {
        //The user did not respond with anything more other than just the action word.
        console.log("You must pick a valid direction to go in.");
        console.log();
        executeCommand(io, player, world, prompt, acceptableNouns, successCallback);
    }
}

function nextLocation(requestedDirection, player, world) {
    var currentLocation = player.location[0];
    requestedDirection = requestedDirection.toUpperCase();
    console.log("requestedDirection: " + requestedDirection);
    console.log("currentLoction exits: " + currentLocation.exits.north);
    
    var newLocationID;
    
    if (requestedDirection === "NORTH") {
        console.log("HERE");
        newLocationID = currentLocation.exits.north;
        console.log(newLocationID);
    } else if (requestedDirection === "EAST") {
        newLocationID = currentLocation.exits.east;
    } else if (requestedDirection === "SOUTH") {
        newLocationID = currentLocation.exits.south;
    } else if (requestedDirection === "WEST") {
        newLocationID = currentLocation.exits.west;
    }
    
    if (newLocationID) {
        for (var i = 0; i < world.rooms.length; i++) {
            if (world.rooms[i].id === newLocationID) {
                console.log("Found the room!: " + world.rooms[i].id);
                return world.rooms[i];
            }
        }
    }
    
    
    return currentLocation;
}

function executeTake(response, io, player, world, prompt, acceptableNouns, successCallback) {
    //First check to make sure there is a second word in the response to 'TAKE'
    if (response.length === 2) {
        var itemRequested = response[1].toUpperCase();
        
        //Checks to make sure that the second word is a valid response.
        if (acceptableNouns.indexOf(itemRequested) != -1) {
            var itemChoice;
            //Checks the item database to find the item.
            for (var i = 0; i < world.items.length; i++) {
                if (world.items[i].id.toUpperCase() === itemRequested) {
                    itemChoice = world.items[i];
                    console.log("You acquired : " + itemChoice.id);
                    console.log(itemChoice.description);
                }
            }
            if (itemChoice) {
                player.inventory.push(itemChoice);
            } else {
                //The item was a valid response however, the item was not found in the database.
                //This is an internal error.
                console.log("Error. '" + itemRequested + "' was not found in the item database.");
            }
            successCallback();
        } else {
            //The user specified an item or word that is not on the list of valid items to take at this time.
            console.log("That is not a item you can take.");
            console.log();
            executeCommand(io, player, world, prompt, acceptableNouns, successCallback);
        }
    } else {
        //User did not specify something to 'TAKE'
        //OR user specified too much.
        console.log("You didn't specify something to 'TAKE'.");
        console.log();
        executeCommand(io, player, world, prompt, acceptableNouns, successCallback);
    }
}

function executeUse(response, io, player, world, prompt, acceptableNouns, successCallback) {
    if (response.length === 2) {
        if (acceptableNouns.indexOf(response[1].toUpperCase()) != -1) {
            successCallback();
        } else {
            console.log("This isn't the time to use that item");
            console.log();
            executeCommand(io, player, world, prompt, acceptableNouns, successCallback);
        }
    } else {
        console.log("You didn't specifiy something to 'USE'.");
        console.log()
        executeCommand(io, player, world, prompt, acceptableNouns, successCallback);
    }
}

function executeInventory(response, io, player, world, prompt, acceptableNouns, successCallback) {
    //Checks that the response is only the action word.
    if (response.length === 1) {
        //Checks to make sure the player and it's inventory is initiated at this point.
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
        executeCommand(io, player, world, prompt, acceptableNouns, successCallback);
    } else {
        //The user put in something in addition to the action word.
        console.log("The command INVENTORY is not an action. Enter INVENTORY by itself to check your INVENTORY.")
        console.log();
        executeCommand(io, player, world, prompt, acceptableNouns, successCallback);
    }

}

var executeCommand = function executeCommand(io, player, world, prompt, acceptableNouns, successCallback) {
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
                executeGo(response, io, player, world, prompt, acceptableNouns, successCallback);
            } else if (command === "TAKE") {
                executeTake(response, io, player, world, prompt, acceptableNouns, successCallback);
            } else if (command === "USE") {
                executeUse(response, io, player, world, prompt, acceptableNouns, successCallback);
            } else if (command === "INVENTORY") {
                executeInventory(response, player, world, prompt, acceptableNouns, successCallback);
            }
            
        } else {
            console.log("This is not a valid command."); 
            console.log()
            executeCommand(io, player, world, prompt, acceptableNouns, successCallback);               
        }
        
    });
}

module.exports = {
    executeCommand : executeCommand
}