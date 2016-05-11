var commandsList = require('./utils/commandsList');

console.log('WELCOME TO TOY ROBOT SIMULATOR!\n\nBEGIN BY PLACING ROBOT ON THE TABLE.\n\nLIST OF VALID COMMANDS:\nPLACE X,Y,F\nMOVE\nLEFT\nRIGHT\nREPORT');

process.stdin.setEncoding('utf8');
process.stdin.on('data', function(command) {
  commandsList.runCommand(command);
});
