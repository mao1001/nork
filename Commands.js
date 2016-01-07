'user strict'

var validCommands = ["GO", "TAKE", "USE", "INVENTORY"]

function executeCommand(command, callBack) {
    if (validCommands.indexOf(command) != -1) {
        callBack()
    }
}

function executeGo() {
    
}

function executeTake() {
    
}

function executeUser() {
    
}

function executeInventory() {
    
}