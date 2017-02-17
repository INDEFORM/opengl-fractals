/* global IDFAPP, GLW */

/**
 * 3D view renderer.
 * @param {DOM Element} canvas Canvas element to draw GL context to.
 * @param {IDFAPP.Scene} scene Scene object.
 * @returns {IDFAPP.View3d} Self.
 */
IDFAPP.View3d = function (canvas, scene) {
    this._context = new GLW.Context(canvas);
    this._scene = scene;
};

IDFAPP.View3d.prototype = {
    /**
     * Main render loop.
     */
    render: function () {
        this._scene.update();
        
        this._context.render(this._scene);
        
        requestAnimationFrame(this.render.bind(this));
    }
};