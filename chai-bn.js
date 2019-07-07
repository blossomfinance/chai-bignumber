module.exports = function (BN) {
  BN = BN || require('bn.js');

  // var round = BN.prototype.round || BN.prototype.decimalPlaces;
  var isEqualTo = BN.prototype.eq;
  var isGreaterThan = BN.prototype.gt;
  var isGreaterThanOrEqualTo = BN.prototype.gte;
  var isLessThan = BN.prototype.lt;
  var isLessThanOrEqualTo = BN.prototype.lte;
  var numberToBN  = require('number-to-bn');

  return function (chai, utils) {
    chai.Assertion.addProperty('bn', function () {
      utils.flag(this, 'bn', true);
    });

    var isBN = function (object) {
      return object.isBN ||
        object instanceof BN ||
        (object.constructor && object.constructor.name === 'BN');
    };

    var convert = function (value, dp, rm) {
      return numberToBN(value);
    };

    var overwriteMethods = function (names, fn) {
      function overwriteMethod(original) {
        return function (value, dp, rm) {
          if (utils.flag(this, 'bn')) {
            var expected = convert(value, dp, rm);
            var actual = convert(this._obj, dp, rm);
            fn.apply(this, [expected, actual]);
          } else {
            original.apply(this, arguments);
          }
        };
      }
      for (var i = 0; i < names.length; i++) {
        chai.Assertion.overwriteMethod(names[i], overwriteMethod);
      }
    };

    // BN.isEqualTo
    overwriteMethods(['equal', 'equals', 'eq'], function (expected, actual) {
      this.assert(
        isEqualTo.bind(expected)(actual),
        'expected #{act} to equal #{exp}',
        'expected #{act} to be different from #{exp}',
        expected.toString(),
        actual.toString()
      );
    });

    // BN.isGreaterThan
    overwriteMethods(['above', 'gt', 'greaterThan'], function (expected, actual) {
      this.assert(
        isGreaterThan.bind(actual)(expected),
        'expected #{act} to be greater than #{exp}',
        'expected #{act} to be less than or equal to #{exp}',
        expected.toString(),
        actual.toString()
      );
    });

    // BN.isGreaterThanOrEqualTo
    overwriteMethods(['least', 'gte'], function (expected, actual) {
      this.assert(
        isGreaterThanOrEqualTo.bind(actual)(expected),
        'expected #{act} to be greater than or equal to #{exp}',
        'expected #{act} to be less than #{exp}',
        expected.toString(),
        actual.toString()
      );
    });

    // BN.isLessThan
    overwriteMethods(['below', 'lt', 'lessThan'], function (expected, actual) {
      this.assert(
        isLessThan.bind(actual)(expected),
        'expected #{act} to be less than #{exp}',
        'expected #{act} to be greater than or equal to #{exp}',
        expected.toString(),
        actual.toString()
      );
    });

    // BN.lte
    overwriteMethods(['most', 'lte'], function (expected, actual) {
      this.assert(
        isLessThanOrEqualTo.bind(actual)(expected),
        'expected #{act} to be less than or equal to #{exp}',
        'expected #{act} to be greater than #{exp}',
        expected.toString(),
        actual.toString()
      );
    });

    // BN.isFinite
    // chai.Assertion.addProperty('finite', function () {
    //   var value = convert(this._obj);
    //   this.assert(
    //     value.isFinite(),
    //     'expected #{this} to be finite',
    //     'expected #{this} to not be finite',
    //     value.toString()
    //   );
    // });

    // // BN.isInteger
    // chai.Assertion.addProperty('integer', function () {
    //   var value = convert(this._obj);
    //   this.assert(
    //     value.isInteger(),
    //     'expected #{this} to be an integer',
    //     'expected #{this} to not be an integer',
    //     value.toString()
    //   );
    // });

    // BN.isNegative
    chai.Assertion.addProperty('negative', function () {
      var value = convert(this._obj);
      this.assert(
        value.isNeg(),
        'expected #{this} to be negative',
        'expected #{this} to not be negative',
        value.toString()
      );
    });

    // BN.isZero
    chai.Assertion.addProperty('zero', function () {
      var value = convert(this._obj);
      this.assert(
        value.isZero(),
        'expected #{this} to be zero',
        'expected #{this} to not be zero',
        value.toString()
      );
    });
  };
};
