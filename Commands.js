'user strict'


module.exports = {
    executeGo :
    function executeGo() {
        console.log("GOING PLACES")
    },
    
    executeTake :
    function executeTake(player, world, item) {
        player.inventory.push(item);
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