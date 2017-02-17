/* global IDFAPP, THREE */

IDFAPP.FractalLSystem = function (scene, params) {
    IDFAPP.FractalBuilder.call(this);

    //this.generate(iterations);

    this._params = {
        rules: {
            axiom: "F",
            main: "FF+[+F-F[F0|F0]-0]-[-F+F+F]",
            secondary: [
                "F-[[0]+X]+F[+|F0]-0",
                "F+F+F+F+F+FFFFFL[22]FFFF",
                "FFFFFF333FFF",
                "FFFFF00FFFFF"
            ]
        },
        iterations: 3,
        theta: 22.5,
        scale: 1,
        angleInitial: 5
    };

    var material = new THREE.LineBasicMaterial({color: 0x333333});
    var line_geometry = new THREE.Geometry();
    line_geometry = this._construct(line_geometry, new THREE.Vector3(0, 0, 0));
    var plant = new THREE.Line(line_geometry, material, THREE.LinePieces);

    scene.add(plant);
};

IDFAPP.FractalLSystem.prototype = Object.create(IDFAPP.FractalBuilder.prototype);
IDFAPP.FractalLSystem.prototype.constructor = IDFAPP.FractalLSystem;

IDFAPP.FractalLSystem.prototype.generate = function () {
    this._buildPrimitive();
};


IDFAPP.FractalLSystem.prototype._generateAxiomTree = function (params) {
    var tree = params.rules.axiom;

    //Create iterations
    for (var i = 0; i < params.iterations; i++) {
        var m = tree.length;
        var extension = "";
        for (var j = 0; j < m; j++) {
            var isSub = tree[j].match("[0-9]");
            if (isSub) {
                extension += (params.rules.secondary[parseInt(isSub[0]) || 0]) || "";
            } else {
                switch (tree[j]) {
                    case "F":
                        extension += params.rules.main;
                        break;
                    default:
                        extension += tree[j];
                        break;
                }
            }
        }
        tree = extension;
    }

    return tree;
};

IDFAPP.FractalLSystem.prototype._construct = function (geometry, initial) {
    initial = initial || new THREE.Vector3();

    var axiomTree = this._generateAxiomTree(this._params);

    var stack = {
        angle: [],
        vertex: []
    };

    var theta = this._params.theta * Math.PI / 180;
    var scale = this._params.scale;
    var angle = this._params.angleInitial * Math.PI / 180;

    var rotation = 0, deg45 = 45 * Math.PI / 180;

    var yAxis = new THREE.Vector3(0, 1, 0);
    var deltaAxis = new THREE.Vector3(), prev_startpoint = new THREE.Vector3();

    var startpoint = initial.clone(), endpoint = new THREE.Vector3();
    var deltaVec = new THREE.Vector3(scale, scale, 0);

    var a, deltaVec2;

    for (var i = 0; i < axiomTree.length; i++) {
        var a = axiomTree[i];

        switch (axiomTree[i]) {
            case "+":
                angle -= theta;
                break;
            case "-":
                angle += theta;
                break;
            case "F":
                a = deltaVec.clone().applyAxisAngle(yAxis, angle);
                endpoint.addVectors(startpoint, a);

                geometry.vertices.push(startpoint.clone());
                geometry.vertices.push(endpoint.clone());

                prev_startpoint.copy(startpoint);
                startpoint.copy(endpoint);
                deltaAxis = new THREE.Vector3().copy(a).normalize();
                break;
            case "L":
                endpoint.copy(startpoint);
                endpoint.add(new THREE.Vector3(0, scale, 0));
                deltaVec2 = new THREE.Vector3().subVectors(endpoint, startpoint);
                deltaVec2.applyAxisAngle(deltaAxis, rotation);
                endpoint.addVectors(startpoint, deltaVec2);

                geometry.vertices.push(startpoint.clone());
                geometry.vertices.push(endpoint.clone());

                rotation += deg45;
                break;
            case "[":
                stack.vertex.push(startpoint.clone());
                stack.angle[stack.angle.length] = angle;
                break;
            case "]":
                startpoint.copy(stack.vertex.pop().clone());
                angle = stack.angle.pop();
                break;
            case "|":
                angle = -angle;
                break;
        }
    }

    return geometry;
};