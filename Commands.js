'user strict'


module.exports = {
    executeGo :
    function executeGo() {
        console.log("GOING PLACES")
    },
    
    executeTake :
    function executeTake(player, world, noun) {
        var itemChoice;
        
        for (var i = 0; i < world.items.length; i++) {
            if (world.items[i].id.toUpperCase() === noun) {
                itemChoice = world.items[i];
                console.log();
                console.log("You acquired : " + itemChoice.id);
                console.log(itemChoice.description);
                player.inventory.push(itemChoice)
            }
        }
        
        if (itemChoice) {
             player.inventory.push(itemChoice);
        } else {
             console.log("Error. '" + noun + "' was not found in the item database.");
        }
    },
    
    executeUse :
    function executeUse() {
        console.log("USING THINGS")
    },
    
    executeInventory :
    function executeInventory() {
        console.log("HAMMER SPACE")
    }
}