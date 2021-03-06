/* global IDFAPP, GLW, matrix */

/**
 * Drawable scene.
 * @returns {IDFAPP.Scene} Self.
 */
IDFAPP.Scene = function () {
    GLW.Scene.call(this);

    this.camera = this._camera = new GLW.Camera();
    this._camera.position = new matrix.Vector([0, 0, 30]);

    this._controls = new IDFAPP.Controls();

    this._fractalBuilder = new IDFAPP.FractalLSystem();

    this._lastFractalParams = null;

    this._rebuildFractal(this._getEquation(1));
};

IDFAPP.Scene.prototype = Object.create(GLW.Scene.prototype);
IDFAPP.Scene.prototype.constructor = IDFAPP.Scene;

/**
 * Clears the scene and rebuilds the fractal with parameters.
 * @param {Object} params Fractal parameters.
 */
IDFAPP.Scene.prototype._rebuildFractal = function (params) {
    this._lastFractalParams = params;

    this.clear();
    this.add(new IDFAPP.LineMesh(this._fractalBuilder.build(params)));
};

IDFAPP.Scene.prototype.add = function (o) {
    if (o instanceof IDFAPP.LineMesh && !this.objects.has(o))
        this.objects.add(o);
};

IDFAPP.Scene.prototype.clear = function () {
    this.objects.clear();
};

IDFAPP.Scene.prototype.getCamera = function () {
    return this._camera;
};

/**
 * Updates camera position based on key state.
 */
IDFAPP.Scene.prototype._updateCamera = function () {
    var state = this._controls.getState();

    var x = 0, y = 0, speed = 0.5;

    if (state.ArrowLeft === true) {
        x = -1;
    } else if (state.ArrowRight === true) {
        x = 1;
    }

    if (state.ArrowDown === true) {
        y = -1;
    } else if (state.ArrowUp === true) {
        y = 1;
    }

    if (state.PageUp === true) {
        this._camera.position.data[2] -= speed;
    } else if (state.PageDown === true) {
        this._camera.position.data[2] += speed;
    }

    if (x !== 0 || y !== 0) {
        var len = Math.sqrt(x * x + y * y) / speed;

        x /= len;
        y /= len;

        this._camera.position.data[0] += x;
        this._camera.position.data[1] += y;
    }
};

/**
 * Performs a fractal action.
 * @param {Object} action Actiion data.
 */
IDFAPP.Scene.prototype._doFractalAction = function (action) {
    switch (action.action) {
        case "increment":
            this._lastFractalParams.iterations++;
            break;
        case "decrement":
            this._lastFractalParams.iterations--;
            break;
        case "equation":
            this._lastFractalParams = this._getEquation(action.equation);
            break;
    }

    this._lastFractalParams.iterations = Math.max(Math.min(this._lastFractalParams.iterations, 7), 0);
    this._rebuildFractal(this._lastFractalParams);
};

/**
 * Calls for action update based on action stack generation by controller.
 */
IDFAPP.Scene.prototype._updateActions = function () {
    var stack = this._controls.getActionStack();

    //Only last action is relevant.
    var lastFractalAction = null;

    while (stack.length > 0) {
        var action = stack.pop();

        if (action.type === "fractal")
            lastFractalAction = action;
        
        if(action.type === "camera" && action.action === "reset") {
            this._camera.position.data[0] = this._camera.position.data[1] = 0;
            this._camera.position.data[2] = 30;
        }
    }

    if (lastFractalAction)
        this._doFractalAction(action);
};

/**
 * Performs an update.
 */
IDFAPP.Scene.prototype.update = function () {
    this._updateCamera();
    this._updateActions();
};

/**
 * Gets equation from list.
 * @param {Number} eqation ID of equation. (1-8)
 * @returns {Object} Equation.
 */
IDFAPP.Scene.prototype._getEquation = function (eqation) {
    var eqs = [
        /*
         * Equation 1.
         */
        {
            rules: {
                axiom: "F",
                main: "F+[F-L-F]+F"
            },
            iterations: 3,
            theta: 22.5,
            scale: 1,
            angleInitial: 0
        },
        /*
         * Equation 2.
         */
        {
            rules: {
                axiom: "F",
                main: "FF+[+F-F[F0|F0]-0]-[-F+F+F]",
                secondary: [
                    "F-[[0]+0]+F[+|F0]-0",
                    "F+F+F+F+F+FFFFFL[1]FFFF"
                ]
            },
            iterations: 3,
            theta: 45,
            scale: 0.2,
            angleInitial: 0
        },
        /*
         * Equation 3.
         */
        {
            rules: {
                axiom: "F",
                main: "F|FFF+[+F-F[F0|F0]-0]-[-F+F+F]",
                secondary: [
                    "F-[[0]+01]+F[+|F0]-0",
                    "F+F+F+F+F+FFFFFL[22]FFFF",
                    "FFF|+FF-F3[+3]3FFF",
                    "FFF[FF00FF]FFF"
                ]
            },
            iterations: 3,
            theta: 22.6,
            scale: 0.1,
            angleInitial: -14
        },
        /*
         * Equation 4.
         */
        {
            rules: {
                axiom: "F",
                main: "F+[+F0-1-0F+]+F",
                secondary: [
                    "F[FF+0L0+FF]F",
                    "0[0+F[1-F-1]F+0]0"
                ]
            },
            iterations: 3,
            theta: 22.5,
            scale: 0.5,
            angleInitial: 0
        },
        /*
         * Equation 5.
         */
        {
            rules: {
                axiom: "F",
                main: "F+[L0]+F",
                secondary: [
                    "-FFLFF+[L0L[11FFFF++++1]]+LF",
                    "F+[L0]+F"
                ]
            },
            iterations: 3,
            theta: 22.5,
            scale: 1,
            angleInitial: 0
        },
        /*
         * Equation 6.
         */
        {
            rules: {
                axiom: "F",
                main: "F[+0]F[-X]+X",
                secondary: [
                    "F+[FL1]",
                    "F[F+L0F-F]F"
                ]
            },
            iterations: 3,
            theta: 13,
            scale: 0.5,
            angleInitial: 5
        },
        /*
         * Equation 7.
         */
        {
            rules: {
                axiom: "F",
                main: "FF+[+F-F[F0|F0]-0]-[-F+F+F]",
                secondary: [
                    "F-[[L1]+0]+F[+|F0]-0",
                    "F+F+F+F+F+FFFFFL[22]FFFF",
                    "F++F[F|FFF33]3FFF",
                    "FFFFF00FFFFF"
                ]
            },
            iterations: 3,
            theta: 88,
            scale: 0.5,
            angleInitial: -45
        },
        /*
         * Equation 8.
         */
        {
            rules: {
                axiom: "F",
                main: "F+[FL+0-F]+F",
                secondary: [
                    "F-4[-4]++4F[L--F[LF+1--1F]]",
                    "F+F+F+F+F+FFFFFL[22]FFFF",
                    "F+F+F+FF[-F3-3-3]FFF",
                    "FF[F+F+F0]0FFFFF",
                    "+F[---FLL]L++F|FF+F"
                ]
            },
            iterations: 3,
            theta: 22.5,
            scale: 1,
            angleInitial: 5
        }];

    return eqs[eqation - 1] || eqation[0];
};