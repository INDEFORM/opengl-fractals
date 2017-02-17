/* global Testing, QUnit */

Testing.TestLSystemSimple = function () {
    Testing.BaseTestCase.call("Simple L-System");
};

Testing.TestLSystemSimple.prototype = Object.create(Testing.BaseTestCase.prototype);
Testing.TestLSystemSimple.prototype.constructor = Testing.TestLSystemSimple;

Testing.TestLSystemSimple.prototype.getCase = function (assert) {
    assert.ok(1 === "1", "Passed!");
};