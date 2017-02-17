/* global Testing */

/*
 * Base test case.
 */
Testing.BaseTestCase = function (name, desc) {
    this._name = name || "Unnamed test";
    this._description = desc || "No description";
};

Testing.BaseTestCase.prototype = {
    getName: function () {
        return this._name;
    },
    getDescription() {
        return this._description;
    },
    getCase: function (assert) {
        throw "Must be overriden by superceding class.";
    }
};

/*
 * Best performance test case.
 */
Testing.BasePerformanceTest = function (name, iterations) {
    this._name = name || "Unnamed performance test";
    this._iterations = iterations;
};

Testing.BasePerformanceTest.prototype = {
    getName: function () {
        return this._name;
    },
    runTest: function () {
        //Do warmup.
        for (var i = 0; i < 50; i++)
            this.getCase();

        var begin = performance.now();

        //Do test
        for (var i = 0; i < this._iterations; i++)
            this.getCase();

        return performance.now() - begin;
    },
    getCase: function () {
        throw "Must be overriden by superceding class.";
    }
};