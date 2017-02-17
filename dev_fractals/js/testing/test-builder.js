/* global BaseTest, QUnit, BaseTestCase */

Testing = this.Testing || {};

Testing.TestBuilder = function () {
    this._tests = [];
};

Testing.TestBuilder.prototype = {
    addTest: function (test) {
        if (!(test instanceof Testing.BaseTestCase)) {
            console.warn("Element is not a test case.");
        } else {
            this._tests.push(test);
        }

        return this;
    },
    run: function () {
        for (var i = 0; i < this._tests.length; i++) {
            QUnit.test(this._tests[i].getName(), this._tests[i].getCase);
        }
    }
};