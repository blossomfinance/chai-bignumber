var BN = require('bn.js');
var chai = require('chai');

chai.should();
chai.use(require('../chai-bn')(BN));
chai.config.includeStack = true;

describe('chai-bn', function () {
  var matchInvalidError = /to be an instance of string, number or BN/;

  describe('equal/equals/eq', function () {
    it('should be equal', function () {
      var tests = [
        [10, 10],
        ['10', 10],
        [10, '10'],
        ['10', '10'],
        // [10.5, 10.5],
        // ['10.5', 10.5],
        // [10.5, '10.5'],
        // ['10.5', '10.5'],
        // ['1.000000000000000001', '1.000000000000000001'],
        // [new BN('1.000000000000000001'), '1.000000000000000001'],
        // ['1.000000000000000001', new BN('1.000000000000000001')],
        // [new BN('1.000000000000000001'), new BN('1.000000000000000001')]
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i][0];
        var b = tests[i][1];
        a.should.be.bn.equal(b);
      }
    });

    it('should be equal when rounded', function () {
      var tests = [
        [10, 10],
        // ['10.25355977', 10.25355812],
        // [10, new BN('10.000000000000000001')]
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i][0];
        var b = tests[i][1];
        a.should.be.bn.equal(b, 5);
      }
    });

    it('should be equal when rounded with specific rounding mode', function () {
      var tests = [
        // ['10.28', 10.21],
        // [10.09, new BN('10.000000000000000001')]
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i][0];
        var b = tests[i][1];
        a.should.be.bn.equal(b, 1, BN.ROUND_DOWN);
      }
    });

    it('should not be equal', function () {
      var tests = [
        [10, 11],
        ['11', 10],
        [10, '11'],
        ['10', '11'],
        // [10.5, 10.6],
        // ['10.5', 10.6],
        // [10.6, '10.5'],
        // ['10.6', '10.5'],
        // ['1.000000000000000001', '1.000000000000000002'],
        // [new BN('1.000000000000000002'), '1.000000000000000001'],
        // ['1.000000000000000002', new BN('1.000000000000000001')],
        // [new BN('1.000000000000000001'), new BN('1.000000000000000002')]
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i][0];
        var b = tests[i][1];
        a.should.not.be.bn.equal(b);
      }
    });

    it('should fail if arguments are not string, number or BN', function () {
      var tests = [
        [{}, 1],
        [1, {}],
        [function () {}, []]
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i][0];
        var b = tests[i][1];
        (function () {
          a.should.be.bn.equal(b);
        }).should.throw(Error);
      }
    });
  });

  describe('above/gt/greaterThan', function () {
    it('should be greater than', function () {
      var tests = [
        [15, 10],
        ['15', 10],
        [15, '10'],
        ['15', '10'],
        // [10.6, 10.5],
        // ['10.6', 10.5],
        // [10.6, '10.5'],
        // ['10.6', '10.5'],
        // ['1.000000000000000002', '1.000000000000000001'],
        // [new BN('1.000000000000000002'), '1.000000000000000001'],
        // ['1.000000000000000002', new BN('1.000000000000000001')],
        // [new BN('1.000000000000000002'), new BN('1.000000000000000001')]
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i][0];
        var b = tests[i][1];
        a.should.be.bn.greaterThan(b);
      }
    });

    it('should be greater than when rounded', function () {
      var tests = [
        [15, 10],
        // ['15.4281', 15.4271],
        // [new BN('1.999999999999999999'), 1.998999]
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i][0];
        var b = tests[i][1];
        a.should.be.bn.greaterThan(b, 3);
      }
    });

    it('should be greater than when rounded with specific rounding mode', function () {
      var tests = [
        // ['10.016', 10.009],
        // [10.001, new BN('9.999999999999999999')]
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i][0];
        var b = tests[i][1];
        a.should.be.bn.greaterThan(b, 2, BN.ROUND_UP);
      }
    });

    it('should not be greater than', function () {
      var tests = [
        [10, 10],
        ['10', 10],
        [10, '10'],
        ['10', '10'],
        // [10.4, 10.5],
        // ['10.4', 10.5],
        // [10.4, '10.5'],
        // ['10.4', '10.5'],
        // ['1.000000000000000001', '1.000000000000000002'],
        // [new BN('1.000000000000000001'), '1.000000000000000002'],
        // ['1.000000000000000001', new BN('1.000000000000000002')],
        // [new BN('1.000000000000000001'), new BN('1.000000000000000002')]
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i][0];
        var b = tests[i][1];
        a.should.not.be.bn.greaterThan(b);
      }
    });

    it('should fail if arguments are not string, number or BN', function () {
      var tests = [
        [{}, 1],
        [1, {}],
        [function () {}, []]
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i][0];
        var b = tests[i][1];
        (function () {
          a.should.be.bn.greaterThan(b);
        }).should.throw(Error);
      }
    });
  });

  describe('least/gte', function () {
    it('should be greater than or equal to', function () {
      var tests = [
        [15, 10],
        ['15', 10],
        [15, '10'],
        ['15', '10'],
        // [10.5, 10.5],
        // ['10.5', 10.5],
        // [10.6, '10.5'],
        // ['10.6', '10.5'],
        // ['1.000000000000000002', '1.000000000000000001'],
        // [new BN('1.000000000000000002'), '1.000000000000000001'],
        // ['1.000000000000000001', new BN('1.000000000000000001')],
        // [new BN('1.000000000000000002'), new BN('1.000000000000000001')]
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i][0];
        var b = tests[i][1];
        a.should.be.bn.at.least(b);
      }
    });

    it('should be greater than or equal to when rounded', function () {
      var tests = [
        [10, 10],
        // ['100.25356140', 100.25355912],
        // [10, new BN('10.000000000000000001')],
        [15, 10],
        // ['15.4279', 15.4274],
        // [new BN('1.999999999999999999'), 1.999449]
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i][0];
        var b = tests[i][1];
        a.should.be.bn.at.least(b, 3);
      }
    });

    it('should be greater than or equal to when rounded with specific rounding mode', function () {
      var tests = [
        // ['100.5', 100.499],
        // [1.995, new BN('1.999999999999999999')]
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i][0];
        var b = tests[i][1];
        a.should.be.bn.at.least(b, 2, BN.ROUND_HALF_UP);
      }
    });

    it('should not be greater than or equal to', function () {
      var tests = [
        [10, 15],
        ['10', 15],
        [10, '15'],
        ['10', '15'],
        // [10.5, 10.6],
        // ['10.5', 10.6],
        // [10.5, '10.6'],
        // ['10.5', '10.6'],
        // ['1.000000000000000001', '1.000000000000000002'],
        // [new BN('1.000000000000000001'), '1.000000000000000002'],
        // ['1.000000000000000001', new BN('1.000000000000000002')],
        // [new BN('1.000000000000000001'), new BN('1.000000000000000002')]
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i][0];
        var b = tests[i][1];
        a.should.not.be.bn.at.least(b);
      }
    });

    it('should fail if arguments are not string, number or BN', function () {
      var tests = [
        [{}, 1],
        [1, {}],
        [function () {}, []]
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i][0];
        var b = tests[i][1];
        (function () {
          a.should.not.be.bn.at.least(b);
        }).should.throw(Error);
      }
    });
  });

  describe('below/lt/lessThan', function () {
    it('should be less than', function () {
      var tests = [
        [10, 15],
        ['10', 15],
        [10, '15'],
        ['10', '15'],
        // [10.5, 10.6],
        // ['10.5', 10.6],
        // [10.5, '10.6'],
        // ['10.5', '10.6'],
        // ['1.000000000000000001', '1.000000000000000002'],
        // [new BN('1.000000000000000001'), '1.000000000000000002'],
        // ['1.000000000000000001', new BN('1.000000000000000002')],
        // [new BN('1.000000000000000001'), new BN('1.000000000000000002')]
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i][0];
        var b = tests[i][1];
        a.should.be.bn.lessThan(b);
      }
    });

    it('should be less than when rounded', function () {
      var tests = [
        [10, 15],
        // [15.4271, '15.4276'],
        // [1.999449, new BN('1.999999999999999999')]
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i][0];
        var b = tests[i][1];
        a.should.be.bn.lessThan(b, 3);
      }
    });

    it('should be less than when rounded with specific rounding mode', function () {
      var tests = [
        // [10.045, 10.046],
        // [1.555, new BN('1.559999999999999999')]
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i][0];
        var b = tests[i][1];
        a.should.be.bn.lessThan(b, 2, BN.ROUND_HALF_DOWN);
      }
    });

    it('should not be less than', function () {
      var tests = [
        [15, 10],
        ['15', 10],
        [15, '10'],
        ['15', '10'],
        // [10.5, 10.5],
        // ['10.5', 10.5],
        // [10.6, '10.5'],
        // ['10.6', '10.5'],
        // ['1.000000000000000002', '1.000000000000000001'],
        // [new BN('1.000000000000000002'), '1.000000000000000001'],
        // ['1.000000000000000001', new BN('1.000000000000000001')],
        // [new BN('1.000000000000000002'), new BN('1.000000000000000001')]
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i][0];
        var b = tests[i][1];
        a.should.not.be.bn.lessThan(b);
      }
    });

    it('should fail if arguments are not string, number or BN', function () {
      var tests = [
        [{}, 1],
        [1, {}],
        [function () {}, []]
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i][0];
        var b = tests[i][1];
        (function () {
          a.should.not.be.bn.lessThan(b);
        }).should.throw(Error);
      }
    });
  });

  describe('most/lte', function () {
    it('should be less than or equal to', function () {
      var tests = [
        [10, 10],
        ['10', 10],
        [10, '10'],
        ['10', '10'],
        // [10.4, 10.5],
        // ['10.4', 10.5],
        // [10.4, '10.5'],
        // ['10.4', '10.5'],
        // ['1.000000000000000001', '1.000000000000000002'],
        // [new BN('1.000000000000000001'), '1.000000000000000002'],
        // ['1.000000000000000001', new BN('1.000000000000000002')],
        // [new BN('1.000000000000000001'), new BN('1.000000000000000002')]
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i][0];
        var b = tests[i][1];
        a.should.be.bn.at.most(b);
      }
    });

    it('should be less than or equal to when rounded', function () {
      var tests = [
        [10, 10],
        // ['100.25356140', 100.25355912],
        // [10, new BN('10.000000000000000001')],
        [10, 15],
        // [15.4274, '15.4279'],
        // [1.999449, new BN('1.999999999999999999')],
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i][0];
        var b = tests[i][1];
        a.should.be.bn.at.most(b, 3);
      }
    });

    // it('should be less than or equal to when rounded with specific rounding mode', function () {
    //   var tests = [
    //     ['102.005', 102],
    //     [10.005, new BN('10.000000000000000001')],
    //   ];
    //
    //   for (var i = 0; i < tests.length; i++) {
    //     var a = tests[i][0];
    //     var b = tests[i][1];
    //     a.should.be.bn.at.most(b, 2, BN.ROUND_HALF_EVEN);
    //   }
    // });

    it('should not be less than or equal to', function () {
      var tests = [
        [15, 10],
        ['15', 10],
        [15, '10'],
        ['15', '10'],
        // [10.6, 10.5],
        // ['10.6', 10.5],
        // [10.6, '10.5'],
        // ['10.6', '10.5'],
        // ['1.000000000000000002', '1.000000000000000001'],
        // [new BN('1.000000000000000002'), '1.000000000000000001'],
        // ['1.000000000000000002', new BN('1.000000000000000001')],
        // [new BN('1.000000000000000002'), new BN('1.000000000000000001')]
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i][0];
        var b = tests[i][1];
        a.should.not.be.bn.at.most(b);
      }
    });

    it('should fail if arguments are not string, number or BN', function () {
      var tests = [
        [{}, 1],
        [1, {}],
        [function () {}, []]
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i][0];
        var b = tests[i][1];
        (function () {
          a.should.not.be.bn.most(b);
        }).should.throw(Error);
      }
    });
  });

  // describe('finite', function () {
  //   it('should be finite', function () {
  //     var tests = [
  //       -100.5,
  //       -100,
  //       0,
  //       100,
  //       100.5,
  //       '1000000000000000001',
  //       new BN('1000000000000000001')
  //     ];
  //
  //     for (var i = 0; i < tests.length; i++) {
  //       var a = tests[i];
  //       a.should.be.finite;
  //     }
  //   });
  //
  //   it('should not be finite', function () {
  //     var tests = [
  //       100.5 / 0,
  //       NaN,
  //       Infinity,
  //       -Infinity,
  //       +Infinity,
  //       new BN(100).dividedBy(0)
  //     ];
  //
  //     for (var i = 0; i < tests.length; i++) {
  //       var a = tests[i];
  //       a.should.not.be.finite;
  //     }
  //   });
  //
  //   it('should fail if argument is not string, number or BN', function () {
  //     var tests = [
  //       {},
  //       [],
  //       function () {}
  //     ];
  //
  //     for (var i = 0; i < tests.length; i++) {
  //       var a = tests[i];
  //       (function () {
  //         a.should.be.finite;
  //       }).should.throw(Error);
  //     }
  //   });
  // });

  // describe('integer', function () {
  //   it('should be integer', function () {
  //     var tests = [
  //       0,
  //       100,
  //       '1000000000000000001',
  //       new BN('1000000000000000001')
  //     ];
  //
  //     for (var i = 0; i < tests.length; i++) {
  //       var a = tests[i];
  //       a.should.be.an.integer;
  //     }
  //   });
  //
  //   it('should not be integer', function () {
  //     var tests = [
  //       NaN,
  //       100.5,
  //       Infinity,
  //       -Infinity,
  //       +Infinity,
  //       '1.000000000000000001',
  //       new BN('1.000000000000000001')
  //     ];
  //
  //     for (var i = 0; i < tests.length; i++) {
  //       var a = tests[i];
  //       a.should.not.be.an.integer;
  //     }
  //   });
  //
  //   it('should fail if argument is not string, number or BN', function () {
  //     var tests = [
  //       {},
  //       [],
  //       function () {}
  //     ];
  //
  //     for (var i = 0; i < tests.length; i++) {
  //       var a = tests[i];
  //       (function () {
  //         a.should.be.integer;
  //       }).should.throw(Error);
  //     }
  //   });
  // });

  describe('negative', function () {
    it('should be negative', function () {
      var tests = [
        -100,
        // -100.50,
        // -Infinity,
        '-1000000000000000001',
        new BN('-1000000000000000001')
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i];
        a.should.be.negative;
      }
    });

    it('should not be negative', function () {
      var tests = [
        // NaN,
        0,
        100,
        // 100.50,
        // Infinity,
        // +Infinity,
        '1000000000000000001',
        new BN('1000000000000000001')
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i];
        a.should.not.be.negative;
      }
    });

    it('should fail if argument is not string, number or BN', function () {
      var tests = [
        {},
        [],
        function () {}
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i];
        (function () {
          a.should.be.negative;
        }).should.throw(Error);
      }
    });
  });

  describe('zero', function () {
    it('should be zero', function () {
      var tests = [
        0,
        -0,
        // '+0',
        new BN('0')
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i];
        a.should.be.zero;
      }
    });

    it('should not be zero', function () {
      var tests = [
        // NaN,
        // -100.50,
        // -100,
        100,
        // 100.50,
        // Infinity,
        // +Infinity,
        // -Infinity,
        '1000000000000000001',
        new BN('1000000000000000001')
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i];
        a.should.not.be.zero;
      }
    });

    it('should fail if argument is not string, number or BN', function () {
      var tests = [
        {},
        [],
        function () {}
      ];

      for (var i = 0; i < tests.length; i++) {
        var a = tests[i];
        (function () {
          a.should.be.zero;
        }).should.throw(Error);
      }
    });
  });
});
