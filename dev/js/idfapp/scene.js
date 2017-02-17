/* global IDFAPP, GLW, matrix */

IDFAPP.Scene = function () {
    GLW.Scene.call(this);

    this.camera = this._camera = new GLW.Camera();
    this._camera.position = new matrix.Vector([0, 0, 30]);

    this._controls = new IDFAPP.Controls();
};

IDFAPP.Scene.prototype = Object.create(GLW.Scene.prototype);
IDFAPP.Scene.prototype.constructor = IDFAPP.Scene;

IDFAPP.Scene.prototype.add = function (o) {
    if (o instanceof IDFAPP.LineMesh && !this.objects.has(o))
        this.objects.add(o);
};

IDFAPP.Scene.prototype.getCamera = function () {
    return this._camera;
};

IDFAPP.Scene.prototype.update = function () {
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

    if (x !== 0 || y !== 0) {
        var len = Math.sqrt(x * x + y * y) / speed;
        x /= len;
        y /= len;

        this._camera.position.data[0] += x;
        this._camera.position.data[1] += y;
    }
};