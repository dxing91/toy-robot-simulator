var current = require('./current');
var directionMap = current.directionMap;
var helpers = require('./helpers');
var parseCommand = helpers.parseCommand;
var parseNewPosition = helpers.parseNewPosition;
var isValidCommand = helpers.isValidCommand;
var isPlaceCommand = helpers.isPlaceCommand;
var constraintCheck = helpers.constraintCheck;
var setCoordinates = helpers.setCoordinates;
var setDirection = helpers.setDirection;

var commandsList = {
  place: function(command) {
    var newPosition = parseNewPosition(command);
    if (constraintCheck(newPosition.x, newPosition.y)) {
      setCoordinates(newPosition.x, newPosition.y);
      setDirection(newPosition.direction);
      current.robotHasBeenPlaced = true;
      console.log("Robot has been placed at (" + current.x + ", " + current.y + ") and is facing " + current.direction + ".");
    } else {
      console.log("You can't do that!");
    }
  },

  move: function() {
    var x = current.x;
    var y = current.y;
    if (current.direction === 'NORTH') y++;
    else if (current.direction === 'EAST') x++;
    else if (current.direction === 'SOUTH') y--;
    else if (current.direction === 'WEST') x--;
    if (constraintCheck(x,y)) {
      setCoordinates(x,y);
      console.log("Robot has moved forward.");
    } else {
      console.log("You can't do that!");
    };
  },

  left: function() {
    if (current.directionIndex === 0) current.directionIndex = directionMap.length-1;
    else current.directionIndex--;
    setDirection(current.directionIndex);
    console.log("Robot is now facing " + current.direction + ".");
  },

  right: function() {
    if (current.directionIndex === directionMap.length-1) current.directionIndex = 0;
    else current.directionIndex++;
    setDirection(current.directionIndex);
    console.log("Robot is now facing " + current.direction + ".");
  },

  report: function() {
    console.log("Robot is currently at (" + current.x + ", " + current.y + ") and facing " + current.direction + ".");
  },

  runCommand: function(command) {
    var command = parseCommand(command);
    if (!isValidCommand(command)) {
      console.log('Invalid command.');
      return;
    }
    if (!current.robotHasBeenPlaced && !isPlaceCommand(command)) {
      console.log("You must place the robot on the table first!");
      return;
    }
    switch(command) {
      case 'MOVE':
        this.move();
        break;
      case 'LEFT':
        this.left();
        break;
      case 'RIGHT':
        this.right();
        break;
      case 'REPORT':
        this.report();
        break;
      default:
        this.place(command);
    }
  }
}

module.exports = commandsList;
