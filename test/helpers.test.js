var chai = require('chai');
var expect = chai.expect;
var helpers = require('../utils/helpers');
var parseCommand = helpers.parseCommand;
var parseNewPosition = helpers.parseNewPosition;
var isValidCommand = helpers.isValidCommand;
var isPlaceCommand = helpers.isPlaceCommand;
var constraintCheck = helpers.constraintCheck;
var setCoordinates = helpers.setCoordinates;
var setDirection =  helpers.setDirection;
var current = require('../utils/current');
var CONSTRAINTS = require('../utils/constraints');

describe('helpers', function() {

  describe('parseCommand', function() {
    it('should trim and capitalise all input commands', function() {
      expect(parseCommand('move')).to.equal('MOVE');
      expect(parseCommand(' left')).to.equal('LEFT');
      expect(parseCommand('right ')).to.equal('RIGHT');
      expect(parseCommand('pLace 0,0,north')).to.equal('PLACE 0,0,NORTH');
      expect(parseCommand('PLACE 0,0,NORTH')).to.equal('PLACE 0,0,NORTH');
    });
  });

  describe('parseNewPosition', function() {
    it('should organise PLACE command information into an object', function() {
      expect(parseNewPosition('PLACE 0,0,NORTH')).to.deep.equal({x: 0, y: 0, direction: 'NORTH'});
      expect(parseNewPosition('PLACE 10,10,NORTH')).to.deep.equal({x: 10, y: 10, direction: 'NORTH'});
    });
  });

  describe('isPlaceCommand', function() {
    it('should validate PLACE command', function() {
      expect(isPlaceCommand('PLACE 0,0,NORTH')).to.be.true;
      expect(isPlaceCommand('PLACE 0, 0, NORTH')).to.be.false;
      expect(isPlaceCommand('PLACE 0,0, NORTH')).to.be.false;
      expect(isPlaceCommand('PLACE0,0,NORTH')).to.be.false;
      expect(isPlaceCommand('MOVE')).to.be.false;
      expect(isPlaceCommand('HELLO')).to.be.false;
    });
  });

  describe('isValidCommand', function() {
    it('should validate commands', function() {
      expect(isValidCommand('MOVE')).to.be.true;
      expect(isValidCommand('LEFT')).to.be.true;
      expect(isValidCommand('RIGHT')).to.be.true;
      expect(isValidCommand('REPORT')).to.be.true;
      expect(isValidCommand('PLACE 0,0,NORTH')).to.be.true;
      expect(isValidCommand('HELLO')).to.be.false;
      expect(isValidCommand('1')).to.be.false;
      expect(isValidCommand('PLACE 0, 0, NORTH')).to.be.false;
      expect(isValidCommand('PLACE 0,0, NORTH')).to.be.false;
      expect(isValidCommand('PLACE0,0,NORTH')).to.be.false;
    });
  });

  describe('constraintCheck', function() {
    it('should ensure current position remains within constraints', function() {
      expect(constraintCheck(0, 0)).to.be.true;
      expect(constraintCheck(CONSTRAINTS.X - 1, CONSTRAINTS.Y - 1)).to.be.true;
      expect(constraintCheck(-1, -1)).to.be.false;
      expect(constraintCheck(CONSTRAINTS.X, CONSTRAINTS.Y)).to.be.false;
    });
  });

  describe('setCoordinates', function() {
    it('should set or change the current coordinates', function() {
      setCoordinates(0,0);
      expect(current.x).to.equal(0);
      expect(current.y).to.equal(0);
      setCoordinates(1,2);
      expect(current.x).to.equal(1);
      expect(current.y).to.equal(2);
    });
  });

  describe('setDirection', function() {
    it('should set or change the current direction and directionIndex, taking in either a direction or index', function() {
      setDirection('WEST');
      expect(current.direction).to.equal('WEST');
      expect(current.directionIndex).to.equal(3);
      setDirection(2);
      expect(current.direction).to.equal('SOUTH');
      expect(current.directionIndex).to.equal(2);
    });
  });

});
