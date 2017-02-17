/* global Testing, QUnit, IDFAPP */

Testing.TestLSystemSimple = function () {
    Testing.BaseTestCase.call("Simple L-System");
};

Testing.TestLSystemSimple.prototype = Object.create(Testing.BaseTestCase.prototype);
Testing.TestLSystemSimple.prototype.constructor = Testing.TestLSystemSimple;

Testing.TestLSystemSimple.prototype.getCase = function (assert) {
    var expected = "F";
    var actual = IDFAPP.FractalLSystem.prototype._generateAxiomTree.call(this, {
        rules: {axiom: "F"}
    });

    assert.ok(expected === actual, "Passed!");
};
