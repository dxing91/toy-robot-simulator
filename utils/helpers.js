var current = require('./current');
var directionMap = current.directionMap;
var CONSTRAINTS = require('./constraints');

var helpers = {
  parseCommand: function(command) {
    return command.trim().toUpperCase();
  },

  parseNewPosition: function(command) {
    var newPositionArray = command.replace('PLACE ', '').split(',');
    return {
      x: Number(newPositionArray[0]),
      y: Number(newPositionArray[1]),
      direction: newPositionArray[2]
    };
  },

  isPlaceCommand: function(command) {
    var placeCommandRegex = /\bPLACE\s\d+,\d+,(NORTH|EAST|SOUTH|WEST)\b/;
    return (placeCommandRegex.test(command));
  },

  isValidCommand: function(command) {
    var command = helpers.parseCommand(command);
    var validCommands = [ 'MOVE', 'LEFT', 'RIGHT', 'REPORT' ];
    return (validCommands.indexOf(command) > -1 || helpers.isPlaceCommand(command));
  },

  constraintCheck: function(x,y) {
    return ( (x >= 0 && x < CONSTRAINTS.X) && (y >= 0 && y < CONSTRAINTS.Y) );
  },

  setCoordinates: function(x,y) {
    current.x = x;
    current.y = y;
  },

  setDirection: function(direction) {
    if (isNaN(direction)) {
      current.directionIndex = directionMap.indexOf(direction);
      current.direction = direction;
    } else {
      current.directionIndex = direction;
      current.direction = directionMap[direction];
    }
  }
}

module.exports = helpers;
