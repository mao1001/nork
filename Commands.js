'user strict'

var validCommands = ["GO", "TAKE", "USE", "INVENTORY"]

function executeCommand(command, successCallBack, failCallBack) {
    var commandIndex = validCommands.indexOf(command);
    if (commandIndex != -1) {
        failCallBack()
    } else if (commandIndex == 0) {
        executeGo()
    } else if (commandIndex == 1) {
        executeTake()
    } else if (commandIndex == 2) {
        executeUser()
    } else if (commandIndex == 3) {
        executeInventory()
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