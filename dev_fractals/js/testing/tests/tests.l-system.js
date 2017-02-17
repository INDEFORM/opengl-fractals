/* global Testing, QUnit, IDFAPP */

/*
 * Tests simple axiom with no iterations.
 */
Testing.TestLSystemSimple = function () {
    Testing.BaseTestCase.call(this, "Simple L-System");
};
Testing.TestLSystemSimple.prototype = Object.create(Testing.BaseTestCase.prototype, {
    constructor: {
        writable: false, configurable: false, value: Testing.TestLSystemSimple
    },
    getCase: {
        writable: true, configurable: true, value: function (assert) {
            var expected = "F";
            var actual = IDFAPP.FractalLSystem.prototype._generateAxiomTree.call(this, {
                rules: {axiom: "F"},
                iterations: 0
            });

            assert.ok(expected === actual, this.getDescription());
        }
    }
});

/*
 * Tests simple axiom with 1 iteration.
 */
Testing.TestLSystemSimple2 = function () {
    Testing.BaseTestCase.call(this, "Simple L-System 2");
};
Testing.TestLSystemSimple2.prototype = Object.create(Testing.BaseTestCase.prototype, {
    constructor: {
        writable: false, configurable: false, value: Testing.TestLSystemSimple2
    },
    getCase: {
        writable: true, configurable: true, value: function (assert) {
            var expected = "FF";
            var actual = IDFAPP.FractalLSystem.prototype._generateAxiomTree.call(this, {
                rules: {
                    axiom: "F",
                    main: "FF"
                },
                iterations: 1
            });

            assert.ok(expected === actual, this.getDescription());
        }
    }
});

/*
 * Tests simple axiom with 2 iteration.
 */
Testing.TestLSystemSimple3 = function () {
    Testing.BaseTestCase.call(this, "Simple L-System 3");
};
Testing.TestLSystemSimple3.prototype = Object.create(Testing.BaseTestCase.prototype, {
    constructor: {
        writable: false, configurable: false, value: Testing.TestLSystemSimple3
    },
    getCase: {
        writable: true, configurable: true, value: function (assert) {
            var expected = "FFFF";
            var actual = IDFAPP.FractalLSystem.prototype._generateAxiomTree.call(this, {
                rules: {
                    axiom: "F",
                    main: "FF"
                },
                iterations: 2
            });

            assert.ok(expected === actual, this.getDescription());
        }
    }
});

/*
 * Tests simple axiom with 2 iteration.
 */
Testing.TestLSystemSubBranch1 = function () {
    Testing.BaseTestCase.call(this, "Simple L-System Sub Branch 1");
};
Testing.TestLSystemSubBranch1.prototype = Object.create(Testing.BaseTestCase.prototype, {
    constructor: {
        writable: false, configurable: false, value: Testing.TestLSystemSubBranch1
    },
    getCase: {
        writable: true, configurable: true, value: function (assert) {
            var expected = "F+[F0]+[F+[F0]FF]";
            var actual = IDFAPP.FractalLSystem.prototype._generateAxiomTree.call(this, {
                rules: {
                    axiom: "F",
                    main: "F+[F0]",
                    secondary: ["FF"]
                },
                iterations: 2
            });

            assert.ok(expected === actual, this.getDescription());
        }
    }
});