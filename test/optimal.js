var assert = require('assert'),
    optimal = require('../lib/optimal.js');

describe('Optimal', function() {
  it('Should parse optional arguments correctly with object', function() {
    var args = optimal(['test', 1337, function() {}, {'test': 7887}], {
      string: {
        type: 'string'
      },

      number: {
        type: 'number',
        optional: true
      },

      nonexistent: {
        type: 'object',
        optional: true
      },

      fn: {
        type: 'function'
      },

      existent: {
        type: 'object',
        optional: true
      },

      nonexistentdefault: {
        type: 'number',
        defaultValue: 90
      }
    });

    args.string.should.be.a('string');
    args.number.should.be.a('number');
    assert.strictEqual(args.nonexistent, undefined);
    args.fn.should.be.a('function');
    args.existent.should.be.a('object');
    args.nonexistentdefault.should.be.equal(90);
  });

  it('Should parse optional arguments correctly with string', function() {
    var args = optimal(['test', 1337, function() {}, {'test': 7887}], 's:string, n:[number], o:[nonexistent], f:fn, o:[existent], n:[nonexistentdefault=90], s:[stringdefault="test"]');

    args.string.should.be.a('string');
    args.number.should.be.a('number');
    assert.strictEqual(args.nonexistent, undefined);
    args.fn.should.be.a('function');
    args.existent.should.be.a('object');
    args.nonexistentdefault.should.be.equal(90);
    args.stringdefault.should.be.equal("test");
  });
});