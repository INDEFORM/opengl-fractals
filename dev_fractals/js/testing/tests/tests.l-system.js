/* global Testing, QUnit, IDFAPP */

/*
 * Tests simple axiom with no iterations.
 */
Testing.TestLSystemSimple = function () {
    Testing.BaseTestCase.call("Simple L-System");
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

            assert.ok(expected === actual, "Passed!");
        }
    }
});