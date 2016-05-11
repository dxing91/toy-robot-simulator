var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var commandsList = require('../utils/commandsList');
var place = commandsList.place;
var move = commandsList.move;
var left = commandsList.left;
var right = commandsList.right;
var report = commandsList.report;
var current = require('../utils/current');
var CONSTRAINTS = require('../utils/constraints');
chai.use(sinonChai);

describe('commandsList', function() {

  describe('place', function() {
    it('should place robot within constraints and log the result', function() {
      var spy = sinon.spy(console, 'log');

      place('PLACE 0,0,SOUTH');
      expect(current.x).to.be.equal(0);
      expect(current.y).to.be.equal(0);
      expect(spy).to.always.have.been.calledWithExactly("Robot has been placed at (0, 0) and is facing SOUTH.");
      spy.reset();

      place('PLACE 1,1,NORTH');
      expect(current.x).to.be.equal(1);
      expect(current.y).to.be.equal(1);
      expect(spy).to.always.have.been.calledWithExactly("Robot has been placed at (1, 1) and is facing NORTH.");
      spy.reset();

      place('PLACE -1,-1,NORTH');
      expect(current.x).to.be.equal(1);
      expect(current.y).to.be.equal(1);
      expect(spy).to.always.have.been.calledWithExactly("You can't do that!");
      spy.reset();

      place('PLACE ' + CONSTRAINTS.X + ',' + CONSTRAINTS.Y + ',NORTH');
      expect(current.x).to.be.equal(1);
      expect(current.y).to.be.equal(1);
      expect(spy).to.always.have.been.calledWithExactly("You can't do that!");
      spy.reset();

      console.log.restore();
    });
  });

  describe('left', function() {
    it('should turn the robot left and log the result', function() {
      place('PLACE 0,0,NORTH');
      var spy = sinon.spy(console, 'log');

      left();
      expect(current.direction).to.be.equal('WEST');
      expect(spy).to.always.have.been.calledWithExactly("Robot is now facing WEST.");
      spy.reset();

      left();
      expect(current.direction).to.be.equal('SOUTH');
      expect(spy).to.always.have.been.calledWithExactly("Robot is now facing SOUTH.");
      spy.reset();

      left();
      expect(current.direction).to.be.equal('EAST');
      expect(spy).to.always.have.been.calledWithExactly("Robot is now facing EAST.");
      spy.reset();

      left();
      expect(current.direction).to.be.equal('NORTH');
      expect(spy).to.always.have.been.calledWithExactly("Robot is now facing NORTH.");
      spy.reset();

      console.log.restore();
    });
  });

  describe('right', function() {
    it('should turn the robot right and log the result', function() {
      place('PLACE 0,0,NORTH');
      var spy = sinon.spy(console, 'log');

      right();
      expect(current.direction).to.be.equal('EAST');
      expect(spy).to.always.have.been.calledWithExactly("Robot is now facing EAST.");
      spy.reset();

      right();
      expect(current.direction).to.be.equal('SOUTH');
      expect(spy).to.always.have.been.calledWithExactly("Robot is now facing SOUTH.");
      spy.reset();

      right();
      expect(current.direction).to.be.equal('WEST');
      expect(spy).to.always.have.been.calledWithExactly("Robot is now facing WEST.");
      spy.reset();

      right();
      expect(current.direction).to.be.equal('NORTH');
      expect(spy).to.always.have.been.calledWithExactly("Robot is now facing NORTH.");
      spy.reset();

      console.log.restore();
    });
  });

  describe('move', function() {
    it('should move robot forward one position, if within constraints, and log the result', function() {
      place('PLACE 0,0,NORTH');
      var spy =  sinon.spy(console, 'log');

      move();
      expect(current.x).to.be.equal(0);
      expect(current.y).to.be.equal(1);
      expect(spy).to.have.been.calledWith("Robot has moved forward.");
      spy.reset();

      right();
      move();
      expect(current.x).to.be.equal(1);
      expect(current.y).to.be.equal(1);
      expect(spy).to.have.been.calledWith("Robot has moved forward.");
      spy.reset();

      right();
      move();
      expect(current.x).to.be.equal(1);
      expect(current.y).to.be.equal(0);
      expect(spy).to.have.been.calledWith("Robot has moved forward.");
      spy.reset();

      right();
      move();
      expect(current.x).to.be.equal(0);
      expect(current.y).to.be.equal(0);
      expect(spy).to.have.been.calledWith("Robot has moved forward.");
      spy.reset();

      move();
      expect(current.x).to.be.equal(0);
      expect(current.y).to.be.equal(0);
      expect(spy).to.have.been.calledWith("You can't do that!");
      spy.reset();

      left();
      move();
      expect(current.x).to.be.equal(0);
      expect(current.y).to.be.equal(0);
      expect(spy).to.have.been.calledWith("You can't do that!");
      spy.reset();

      place('PLACE ' + (CONSTRAINTS.X-1) + ',' + (CONSTRAINTS.Y-1) + ',NORTH');
      move();
      expect(current.x).to.be.deep.equal(CONSTRAINTS.X-1);
      expect(current.y).to.be.deep.equal(CONSTRAINTS.Y-1);
      expect(spy).to.have.been.calledWith("You can't do that!");
      spy.reset();

      right();
      move();
      expect(current.x).to.be.deep.equal(CONSTRAINTS.X-1);
      expect(current.y).to.be.deep.equal(CONSTRAINTS.Y-1);
      expect(spy).to.have.been.calledWith("You can't do that!");
      spy.reset();

      console.log.restore();
    });
  });

  describe('report', function() {
    it('should report the current position of the robot', function() {
      place('PLACE 0,0,NORTH');
      var spy = sinon.spy(console, 'log');
      report();
      expect(spy).to.always.have.been.calledWithExactly("Robot is currently at (0, 0) and facing NORTH.");
      console.log.restore();
    });
  });

});
