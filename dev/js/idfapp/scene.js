/* global IDFAPP, GLW, matrix */

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

IDFAPP.Scene.prototype._updateActions = function () {
    var stack = this._controls.getActionStack();

    var lastFractalAction = null;

    while (stack.length > 0) {
        var action = stack.pop();

        if (action.type === "fractal")
            lastFractalAction = action;
    }

    if (lastFractalAction)
        this._doFractalAction(action);
};

IDFAPP.Scene.prototype.update = function () {
    this._updateCamera();
    this._updateActions();
};

IDFAPP.Scene.prototype._getEquation = function (eqation) {
    var eqs = [
        /*
         * Equation 1.
         */
        {
            rules: {
                axiom: "F",
                main: "F+[F-F]+F",
                secondary: [
                    "F-[[0]+0]+F[+|F0]-0",
                    "F+F+F+F+F+FFFFFL[22]FFFF",
                    "FFFFFF333FFF",
                    "FFFFF00FFFFF"
                ]
            },
            iterations: 3,
            theta: 22.5,
            scale: 1,
            angleInitial: 5
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
                    "F+F+F+F+F+FFFFFL[22]FFFF",
                    "FFFFFF333FFF",
                    "FFFFF00FFFFF"
                ]
            },
            iterations: 3,
            theta: 22.5,
            scale: 1,
            angleInitial: 5
        },
        /*
         * Equation 3.
         */
        {
            rules: {
                axiom: "F",
                main: "F+[F-F]+F",
                //main: "FF+[+F-F[F0|F0]-0]-[-F+F+F]",
                secondary: [
                    "F-[[0]+0]+F[+|F0]-0",
                    "F+F+F+F+F+FFFFFL[22]FFFF",
                    "FFFFFF333FFF",
                    "FFFFF00FFFFF"
                ]
            },
            iterations: 3,
            theta: 22.5,
            scale: 1,
            angleInitial: 5
        },
        /*
         * Equation 3.
         */
        {
            rules: {
                axiom: "F",
                main: "F+[F-F]+F",
                //main: "FF+[+F-F[F0|F0]-0]-[-F+F+F]",
                secondary: [
                    "F-[[0]+0]+F[+|F0]-0",
                    "F+F+F+F+F+FFFFFL[22]FFFF",
                    "FFFFFF333FFF",
                    "FFFFF00FFFFF"
                ]
            },
            iterations: 3,
            theta: 22.5,
            scale: 1,
            angleInitial: 5
        },
        /*
         * Equation 4.
         */
        {
            rules: {
                axiom: "F",
                main: "F+[F-F]+F",
                //main: "FF+[+F-F[F0|F0]-0]-[-F+F+F]",
                secondary: [
                    "F-[[0]+0]+F[+|F0]-0",
                    "F+F+F+F+F+FFFFFL[22]FFFF",
                    "FFFFFF333FFF",
                    "FFFFF00FFFFF"
                ]
            },
            iterations: 3,
            theta: 22.5,
            scale: 1,
            angleInitial: 5
        },
        /*
         * Equation 6.
         */
        {
            rules: {
                axiom: "F",
                main: "F+[F-F]+F",
                //main: "FF+[+F-F[F0|F0]-0]-[-F+F+F]",
                secondary: [
                    "F-[[0]+0]+F[+|F0]-0",
                    "F+F+F+F+F+FFFFFL[22]FFFF",
                    "FFFFFF333FFF",
                    "FFFFF00FFFFF"
                ]
            },
            iterations: 3,
            theta: 22.5,
            scale: 1,
            angleInitial: 5
        },
        /*
         * Equation 7.
         */
        {
            rules: {
                axiom: "F",
                main: "F+[F-F]+F",
                //main: "FF+[+F-F[F0|F0]-0]-[-F+F+F]",
                secondary: [
                    "F-[[0]+0]+F[+|F0]-0",
                    "F+F+F+F+F+FFFFFL[22]FFFF",
                    "FFFFFF333FFF",
                    "FFFFF00FFFFF"
                ]
            },
            iterations: 3,
            theta: 22.5,
            scale: 1,
            angleInitial: 5
        },
        /*
         * Equation 8.
         */
        {
            rules: {
                axiom: "F",
                main: "F+[F-F]+F",
                //main: "FF+[+F-F[F0|F0]-0]-[-F+F+F]",
                secondary: [
                    "F-[[0]+0]+F[+|F0]-0",
                    "F+F+F+F+F+FFFFFL[22]FFFF",
                    "FFFFFF333FFF",
                    "FFFFF00FFFFF"
                ]
            },
            iterations: 3,
            theta: 22.5,
            scale: 1,
            angleInitial: 5
        }];

    return eqs[eqation - 1] || eqation[0];
};