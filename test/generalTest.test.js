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
chai.use(sinonChai);

describe('generalTest', function() {

  it('should produce the correct output', function() {
    var spy = sinon.spy(console, 'log');
    place('PLACE 0,0,NORTH');
    move();
    report();
    expect(spy).to.have.been.calledWith("Robot is currently at (0, 1) and facing NORTH.");
    spy.reset();
    console.log.restore();
  });

  it('should produce the correct output', function() {
    var spy = sinon.spy(console, 'log');
    place('PLACE 0,0,NORTH');
    left();
    report();
    expect(spy).to.have.been.calledWith("Robot is currently at (0, 0) and facing WEST.");
    spy.reset();
    console.log.restore();
  });

  it('should produce the correct output', function() {
    var spy = sinon.spy(console, 'log');
    place('PLACE 1,2,EAST');
    move();
    move();
    left();
    move();
    report();
    expect(spy).to.have.been.calledWith("Robot is currently at (3, 3) and facing NORTH.");
    spy.reset();
    console.log.restore();
  });

});
