/* global BaseTest, QUnit, BaseTestCase */

Testing = this.Testing || {
    isZero: function (x, eps) {
        eps = eps || 1E-7;
        var result = true;

        if (!(x instanceof Array))
            x = [x];

        for (var i = 0; i < x.length; i++)
            result &= Math.abs(x[i]) < eps;

        return result;
    },
    compare: function (x, y, eps) {
        eps = eps || 1E-7;

        if (!(x instanceof Array))
            x = [x];

        if (!(y instanceof Array))
            y = [y];

        if (x.length !== y.length)
            return false;

        var result = true;

        for (var i = 0; i < x.length; i++)
            result &= (x[i] + eps) > y[i] && (x[i] - eps) < y[i];
        
        return result;
    }
};

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
            var test = this._tests[i];
            QUnit.test(test.getName(), test.getCase.bind(test));
        }
    }
};