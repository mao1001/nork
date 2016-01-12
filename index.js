/* global process */
'use strict';
var readline = require('readline');
var world = require('./world.json');

console.log("You are falling in a dream, a black abyss surrounds you but your lethargic alertness masks you from the strangeness of the experience. A colorful mosaic platform in the distance rushes toward you as an invisible force uprights you and lands you gently on your feet.")
console.log("Awake now, you look around, other than the platform you stand on, there is nothing but black in all directions, however the light seems to be perfectly illuminated in this setting")
console.log()
console.log("A voice whispers to you.")
console.log()
console.log("\"So much to do...\"")
console.log("\"So little time...\"")
console.log("\"Take your time.\"")
console.log("\"Don't be afraid.\"")
console.log()
console.log("Puzzled by the voice, you wander towards the center of the platform")
console.log("\"The door is still shut.\"")
console.log()
console.log("Directly to your left a bright light appears and just as quickly fades leaving it it's place a pedastal with a SHIELD on it.")
console.log("\"Power sleeps within you.\"")
console.log()
console.log("Another flash in the corner of your eye as you turn to see in front of you another pedestal appear with what looks to be a STAFF on it")
console.log("\"If you give it form...\"")
console.log()
console.log("A third light on your right shines and fades. This time a SWORD rests atop the surface.")
console.log("\"It will give you strength\"")
console.log()

var io = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

io.question('You strength is represented by a? ', function(answer) {
    var description = ''
	if (answer === "SWORD") {
        description = world.items[0].description;
    } else if (answer === "SHIELD") {
        description = world.items[1].description;
    } else if (answer === "STAFF") {
        description = world.items[2].description;
    }
    
    console.log(description)
	io.close(); //close the whole interface once completely done asking questions
});


