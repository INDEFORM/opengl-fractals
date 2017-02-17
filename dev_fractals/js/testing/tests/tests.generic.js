/*
 * Tests simple axiom with no iterations.
 */
/* global Testing */

/*
 * Checks is zero utility.
 */
Testing.TestUtilsIsZero1 = function () {
    Testing.BaseTestCase.call(this, "Utils: Is Zero 1");
};
Testing.TestUtilsIsZero1.prototype = Object.create(Testing.BaseTestCase.prototype, {
    constructor: {
        writable: false, configurable: false, value: Testing.TestUtilsIsZero1
    },
    getCase: {
        writable: true, configurable: true, value: function (assert) {
            var actual = Testing.isZero(0);

            assert.ok(actual, "Checks if value is zero.");
        }
    }
});

/*
 * Checks is zero utility.
 */
Testing.TestUtilsIsZero2 = function () {
    Testing.BaseTestCase.call(this, "Utils: Is Zero 2");
};
Testing.TestUtilsIsZero2.prototype = Object.create(Testing.BaseTestCase.prototype, {
    constructor: {
        writable: false, configurable: false, value: Testing.TestUtilsIsZero2
    },
    getCase: {
        writable: true, configurable: true, value: function (assert) {
            var actual = Testing.isZero([0, 0, 0]);

            assert.ok(actual, "Checks if value is zero.");
        }
    }
});

/*
 * Checks is zero utility.
 */
Testing.TestUtilsIsZero3 = function () {
    Testing.BaseTestCase.call(this, "Utils: Is Zero 3");
};
Testing.TestUtilsIsZero3.prototype = Object.create(Testing.BaseTestCase.prototype, {
    constructor: {
        writable: false, configurable: false, value: Testing.TestUtilsIsZero3
    },
    getCase: {
        writable: true, configurable: true, value: function (assert) {
            var actual = Testing.isZero([0.00000000000001, 0, 0], 1E-5);

            assert.ok(actual, "Checks if value is zero for epsilon 1E-5.");
        }
    }
});

/*
 * Checks is zero utility.
 */
Testing.TestUtilsIsNotZero1 = function () {
    Testing.BaseTestCase.call(this, "Utils: Is Not Zero 1");
};
Testing.TestUtilsIsNotZero1.prototype = Object.create(Testing.BaseTestCase.prototype, {
    constructor: {
        writable: false, configurable: false, value: Testing.TestUtilsIsNotZero1
    },
    getCase: {
        writable: true, configurable: true, value: function (assert) {
            var actual = Testing.isZero(5);

            assert.notOk(actual, "Checks if value is not zero.");
        }
    }
});

/*
 * Checks is zero utility.
 */
Testing.TestUtilsIsNotZero2 = function () {
    Testing.BaseTestCase.call(this, "Utils: Is Not Zero 2");
};
Testing.TestUtilsIsNotZero2.prototype = Object.create(Testing.BaseTestCase.prototype, {
    constructor: {
        writable: false, configurable: false, value: Testing.TestUtilsIsNotZero2
    },
    getCase: {
        writable: true, configurable: true, value: function (assert) {
            var actual = Testing.isZero([0, 5, 0]);

            assert.notOk(actual, "Checks if at least one value is not zero.");
        }
    }
});

/*
 * Checks is compare utility.
 */
Testing.TestUtilsCompare1 = function () {
    Testing.BaseTestCase.call(this, "Utils: Compare 1");
};
Testing.TestUtilsCompare1.prototype = Object.create(Testing.BaseTestCase.prototype, {
    constructor: {
        writable: false, configurable: false, value: Testing.TestUtilsCompare1
    },
    getCase: {
        writable: true, configurable: true, value: function (assert) {
            var actual = Testing.compare(5, 5);

            assert.ok(actual, "Checks if value is zero.");
        }
    }
});

/*
 * Checks is compare utility.
 */
Testing.TestUtilsCompare2 = function () {
    Testing.BaseTestCase.call(this, "Utils: Compare 2");
};
Testing.TestUtilsCompare2.prototype = Object.create(Testing.BaseTestCase.prototype, {
    constructor: {
        writable: false, configurable: false, value: Testing.TestUtilsCompare2
    },
    getCase: {
        writable: true, configurable: true, value: function (assert) {
            var actual = Testing.compare([5, 5], 5);

            assert.notOk(actual, "Checks same length.");
        }
    }
});

/*
 * Checks is compare utility.
 */
Testing.TestUtilsCompare3 = function () {
    Testing.BaseTestCase.call(this, "Utils: Compare 3");
};
Testing.TestUtilsCompare3.prototype = Object.create(Testing.BaseTestCase.prototype, {
    constructor: {
        writable: false, configurable: false, value: Testing.TestUtilsCompare3
    },
    getCase: {
        writable: true, configurable: true, value: function (assert) {
            var actual = Testing.compare([5, -5], [5, -5]);

            assert.ok(actual, "Checks if equal.");
        }
    }
});

/*
 * Checks is compare utility.
 */
Testing.TestUtilsCompare4 = function () {
    Testing.BaseTestCase.call(this, "Utils: Compare 4");
};
Testing.TestUtilsCompare4.prototype = Object.create(Testing.BaseTestCase.prototype, {
    constructor: {
        writable: false, configurable: false, value: Testing.TestUtilsCompare4
    },
    getCase: {
        writable: true, configurable: true, value: function (assert) {
            var actual = Testing.compare([-5, 5], [5, 5]);

            assert.notOk(actual, "Checks if not equal.");
        }
    }
});

/*
 * Checks is compare utility.
 */
Testing.TestUtilsCompare5 = function () {
    Testing.BaseTestCase.call(this, "Utils: Compare 5");
};
Testing.TestUtilsCompare5.prototype = Object.create(Testing.BaseTestCase.prototype, {
    constructor: {
        writable: false, configurable: false, value: Testing.TestUtilsCompare5
    },
    getCase: {
        writable: true, configurable: true, value: function (assert) {
            var actual = Testing.compare([-5.000000005, 5.00000001], [-5, 5], 1E-5);

            assert.ok(actual, "Checks if equal for epsilon 1E-5.");
        }
    }
});