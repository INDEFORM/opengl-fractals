/* global Testing, QUnit, IDFAPP, THREE */

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

            assert.ok(expected === actual, "Check if correct tree is constructed.");
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

            assert.ok(expected === actual, "Check if correct tree is constructed.");
        }
    }
});

/*
 * Tests tree generation with sub branches
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

            assert.ok(expected === actual, "Check if correct tree is constructed.");
        }
    }
});

/*
 * Tests tree generation with sub sub branches
 */
Testing.TestLSystemSubBranch2 = function () {
    Testing.BaseTestCase.call(this, "Simple L-System Sub Branch 2");
};
Testing.TestLSystemSubBranch2.prototype = Object.create(Testing.BaseTestCase.prototype, {
    constructor: {
        writable: false, configurable: false, value: Testing.TestLSystemSubBranch2
    },
    getCase: {
        writable: true, configurable: true, value: function (assert) {
            var expected = "F+[F0]+[F+[F0]FF-F1]+[F+[F0]+[F+[F0]FF-F1]F+[F0]F+[F0]-F+[F0]-F+F|+FF]";
            var actual = IDFAPP.FractalLSystem.prototype._generateAxiomTree.call(this, {
                rules: {
                    axiom: "F",
                    main: "F+[F0]",
                    secondary: ["FF-F1", "-F+F|+FF"]
                },
                iterations: 3
            });

            assert.ok(expected === actual, "Check if correct tree is constructed.");
        }
    }
});

/*
 * Tests simple construction.
 */
Testing.TestLSystemGenSimple1 = function () {
    Testing.BaseTestCase.call(this, "Simple L-System Construction 1");
};
Testing.TestLSystemGenSimple1.prototype = Object.create(Testing.BaseTestCase.prototype, {
    constructor: {
        writable: false, configurable: false, value: Testing.TestLSystemGenSimple1
    },
    getCase: {
        writable: true, configurable: true, value: function (assert) {
            var vertices = IDFAPP.FractalLSystem.prototype._construct.call({
                _generateAxiomTree: IDFAPP.FractalLSystem.prototype._generateAxiomTree.bind(this)
            }, {
                rules: {axiom: "F"},
                iterations: 0
            }, new THREE.Geometry()).vertices;

            assert.ok(vertices.length === 2, "There must be 2 vertices.");

            for (var i = 0; i < vertices.length; i++) {
                var v = vertices[i];
                assert.ok(Testing.isZero([v.x, v.y, v.z]), "All vector components must be zero.");
            }
        }
    }
});

/*
 * Tests simple construction.
 */
Testing.TestLSystemGenSimple2 = function () {
    Testing.BaseTestCase.call(this, "Simple L-System Construction 2");
};
Testing.TestLSystemGenSimple2.prototype = Object.create(Testing.BaseTestCase.prototype, {
    constructor: {
        writable: false, configurable: false, value: Testing.TestLSystemGenSimple2
    },
    getCase: {
        writable: true, configurable: true, value: function (assert) {
            var vertices = IDFAPP.FractalLSystem.prototype._construct.call({
                _generateAxiomTree: IDFAPP.FractalLSystem.prototype._generateAxiomTree.bind(this)
            }, {
                rules: {
                    axiom: "F",
                    main: "FF"
                },
                iterations: 2,
                scale: 1,
                theta: 0
            }, new THREE.Geometry()).vertices;

            assert.ok(vertices.length === 8, "There must be 8 vertices.");

            var expected = [
                [0, 0, 0],
                [1, 1, 0],
                [1, 1, 0],
                [2, 2, 0],
                [2, 2, 0],
                [3, 3, 0],
                [3, 3, 0],
                [4, 4, 0]
            ];

            for (var i = 0; i < vertices.length; i++) {
                var v = [vertices[i].x, vertices[i].y, vertices[i].z];
                assert.ok(Testing.compare(v, expected[i]), "Vertex must be at correct position.");
            }
        }
    }
});