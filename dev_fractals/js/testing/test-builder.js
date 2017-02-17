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

Testing.TestBuilder = function (perf) {
    this._tests = [];
    this._perfTests = [];
    this._domPerf = perf;
};

Testing.TestBuilder.prototype = {
    addTest: function (test) {
        if (test instanceof Testing.BaseTestCase) {
            this._tests.push(test);
        } else if (test instanceof Testing.BasePerformanceTest) {
            this._perfTests.push(test);
        } else {
            console.warn("Object is not a test case.");
        }

        return this;
    },
    run: function () {
        for (var i = 0; i < this._tests.length; i++) {
            var test = this._tests[i];
            QUnit.test(test.getName(), test.getCase.bind(test));
        }

        this._domPerf.innerHTML = this._perfTests.length > 0
                ? "<h2>Running performance tests...</h2>"
                : "<h2>No performance tests to run.</h2>";

        setTimeout(function () {
            var total = 0;

            for (var i = 0; i < this._perfTests.length; i++) {
                var test = this._perfTests[i];
                var result = test.runTest();
                total += result;
                this._domPerf.innerHTML += "Perfomance test: '" + test.getName() +
                        "' ran in " + result.toFixed(2) + "ms<br>";
            }

            if (this._perfTests.length > 0) {
                this._domPerf.innerHTML += "<h3>All Performance tests finished in " +
                        total.toFixed(2) + "ms.<h3>";
            }
        }.bind(this), 1000);
    }
};