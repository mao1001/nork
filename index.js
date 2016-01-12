/* global process */
'use strict';
var questionEngine = require('./questionEngine.js');
var commands = require('./Commands.js');
var world = require('./world.json');
var player = require('./player.json');

console.log(Object.keys(questionEngine));

console.log("You are falling in a dream, a black abyss surrounds you but your lethargic alertness masks you from the strangeness of the experience. A colorful mosaic platform in the distance rushes toward you as an invisible force uprights you and lands you gently on your feet.");
console.log("Awake now, you look around, other than the platform you stand on, there is nothing but black in all directions, however the light seems to be perfectly illuminated in this setting");
console.log();
console.log("A voice whispers to you.");
console.log();
console.log("\"So much to do...\"");
console.log("\"So little time...\"");
console.log("\"Take your time.\"");
console.log("\"Don't be afraid.\"");
console.log();
console.log("Puzzled by the voice, you wander towards the center of the platform");
console.log("\"The door is still shut.\"");
console.log();
console.log("Directly to your left a bright light appears and just as quickly fades leaving it it's place a pedastal with a SHIELD on it.");
console.log("\"Power sleeps within you.\"");
console.log();
console.log("Another flash in the corner of your eye as you turn to see in front of you another pedestal appear with what looks to be a STAFF on it");
console.log("\"If you give it form...\"");
console.log();
console.log("A third light on your right shines and fades. This time a SWORD rests atop the surface.");
console.log("\"It will give you strength\"");
console.log();

var array = ["SWORD", "SHIELD", "STAFF"];

questionEngine.executeCommand2(
    'TAKE that which represents your strength ',
    ["TAKE"],
    array,
    function(action, noun) {
        var description = '';
        var itemChoice;
        
        for (var i = 0; i < world.items.length; i++) {
            if (world.items[i].id.toUpperCase() === noun) {
                itemChoice = world.items[i];
                console.log(itemChoice);
                description = itemChoice.description;
            }
        }
        
        description = itemChoice.description;
        player.inventory.push(itemChoice)
        console.log(description);
    }    
);

// questionEngine.prompt(
//     'TAKE that which represents your strength ', 
//     ["SWORD", "SHIELD", "STAFF"],
//     function(answer) {
//         var description = '';
//         var itemChoice;
//         if (answer === "SWORD") {
//             itemChoice = world.items[0];
//         } else if (answer === "SHIELD") {
//             itemChoice = world.items[1];
//         } else if (answer === "STAFF") {
//             itemChoice = world.items[2];
//         }
        
//         description = itemChoice.description;
//         player.inventory.push(itemChoice)
//         console.log(description);
//     } 
// );