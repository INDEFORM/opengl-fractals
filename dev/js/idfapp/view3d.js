/* global IDFAPP, GLW */

IDFAPP.View3d = function (canvas, scene) {
    this._context = new GLW.Context(canvas);
    this._scene = scene;
};

IDFAPP.View3d.prototype = {
    render: function () {
        this._context.render(this._scene);
        
        requestAnimationFrame(this.render.bind(this));
    }
};