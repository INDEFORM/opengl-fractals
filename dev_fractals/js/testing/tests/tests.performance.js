/* global Testing, IDFAPP, THREE */

/*
 * Performance test for tree generation.
 */
Testing.TestTreeGenerationPerf1 = function (iterations) {
    Testing.BasePerformanceTest.call(this, "Perf: Tree generation 1", iterations);
};
Testing.TestTreeGenerationPerf1.prototype = Object.create(Testing.BasePerformanceTest.prototype, {
    constructor: {
        writable: false, configurable: false, value: Testing.TestTreeGenerationPerf1
    },
    getCase: {
        writable: true, configurable: true, value: function () {
            IDFAPP.FractalLSystem.prototype._generateAxiomTree.call(this, {
                rules: {
                    axiom: "F",
                    main: "F+[F0]",
                    secondary: ["FF"]
                },
                iterations: 5
            });
        }
    }
});

/*
 * Performance test for mesh generation.
 */
Testing.TestMeshGenerationPerf1 = function (iterations) {
    Testing.BasePerformanceTest.call(this, "Perf: Mesh generation 1", iterations);
};
Testing.TestMeshGenerationPerf1.prototype = Object.create(Testing.BasePerformanceTest.prototype, {
    constructor: {
        writable: false, configurable: false, value: Testing.TestMeshGenerationPerf1
    },
    getCase: {
        writable: true, configurable: true, value: function () {
            IDFAPP.FractalLSystem.prototype._construct.call({
                _generateAxiomTree: IDFAPP.FractalLSystem.prototype._generateAxiomTree.bind(this)
            }, {
                rules: {
                    axiom: "F",
                    main: "F+[F[LFF0]]",
                    secondary: ["FF-F1", "-F+F|+FF"]
                },
                iterations: 5,
                scale: 1,
                theta: 45,
                angle: 0
            }, new THREE.Geometry());
        }
    }
});