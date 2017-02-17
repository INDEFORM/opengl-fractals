/* global IDFAPP, GLW, matrix */

IDFAPP.Scene = function () {
    GLW.Scene.call(this);

    this.camera = this._camera = new GLW.Camera();
    this._camera.position = position = new matrix.Vector([0, 0, 30]);
};

IDFAPP.Scene.prototype = Object.create(GLW.Scene.prototype);
IDFAPP.Scene.prototype.constructor = IDFAPP.Scene;

IDFAPP.Scene.prototype.add = function (o) {
    if (o instanceof IDFAPP.LineMesh && !this.objects.has(o))
        this.objects.add(o);
};