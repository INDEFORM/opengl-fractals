/* global IDFAPP, THREE */

/**
 * Used to construct fractal L-System.
 * @returns {IDFAPP.FractalLSystem} Self.
 */
IDFAPP.FractalLSystem = function () {
    IDFAPP.BaseFractalBuilder.call(this);
};

IDFAPP.FractalLSystem.prototype = Object.create(IDFAPP.BaseFractalBuilder.prototype);
IDFAPP.FractalLSystem.prototype.constructor = IDFAPP.BaseFractalLSystem;

/**
 * Constructs axiom string for L-System.
 * @param {Object} params System parameters.
 * @returns {String} Constructed system.
 */
IDFAPP.FractalLSystem.prototype._generateAxiomTree = function (params) {
    //Initial condition if no iterations available.
    var system = params.rules.axiom;

    //Create iterations
    for (var i = 0; i < params.iterations; i++) {
        var extension = "";
        for (var j = 0; j < system.length; j++) {

            //Checks for sub-tree.
            var isSub = system[j].match("[0-9]");
            if (isSub) {
                extension += (params.rules.secondary[parseInt(isSub[0]) || 0]) || "";
            } else {
                switch (system[j]) {
                    //Appends main rule.
                    case "F":
                        extension += params.rules.main;
                        break;
                    default:
                        extension += system[j];
                        break;
                }
            }
        }
        //Constructed system.
        system = extension;
    }

    return system;
};

/**
 * Creates vertex list for L-System.
 * @param {Object} params Build parameters.
 * @param {Math.Vector3} initial Initial position.
 * @returns {Array} Vertex list.
 */
IDFAPP.FractalLSystem.prototype.build = function (params, initial) {
    var vertices = [];
    initial = initial || new Math.Vector3();

    var axiomTree = this._generateAxiomTree(params);    //Gets the system.
    var stack = {
        angle: [],
        vertex: []
    };

    var theta = (params.theta || 0) * Math.PI / 180;
    var scale = (params.scale || 0);
    var angle = (params.angleInitial || 0) * Math.PI / 180;

    var rotation = 0, deg45 = 45 * Math.PI / 180;

    var yAxis = new Math.Vector3(0, 1, 0);
    var deltaAxis = new Math.Vector3(), prev_startpoint = new Math.Vector3();

    var startpoint = initial.clone(), endpoint = new Math.Vector3();
    var deltaVec = new Math.Vector3(scale, scale, 0);

    var a, deltaVec2;

    for (var i = 0; i < axiomTree.length; i++) {
        switch (axiomTree[i]) {
            //Rotate by negative theta
            case "+":
                angle -= theta;
                break;
            //Rotate by positive theta
            case "-":
                angle += theta;
                break;
            //Moves turtle forward
            case "F":
                a = deltaVec.clone().applyAxisAngle(yAxis, angle);
                endpoint.addVectors(startpoint, a);

                vertices.push(startpoint.clone());
                vertices.push(endpoint.clone());

                prev_startpoint.copy(startpoint);
                startpoint.copy(endpoint);
                deltaAxis = new Math.Vector3().copy(a).normalize();
                break;
            //Creates branch
            case "L":
                endpoint.copy(startpoint);
                endpoint.add(new Math.Vector3(0, scale, 0));
                deltaVec2 = new Math.Vector3().subVectors(endpoint, startpoint);
                deltaVec2.applyAxisAngle(deltaAxis, rotation);
                endpoint.addVectors(startpoint, deltaVec2);

                vertices.push(startpoint.clone());
                vertices.push(endpoint.clone());

                rotation += deg45;
                break;
            //Saves state to stack
            case "[":
                stack.vertex.push(startpoint.clone());
                stack.angle[stack.angle.length] = angle;
                break;
            //Pops state from stack
            case "]":
                startpoint.copy(stack.vertex.pop().clone());
                angle = stack.angle.pop();
                break;
            //Inverts angle
            case "|":
                angle = -angle;
                break;
        }
    }

    return vertices;
};