/* global IDFAPP, GLW */

/**
 * Core of the application.
 * @param {DOM Element} canvas Canvas to draw GL context to.
 * @returns {IDFAPP.Core} Self.
 */
IDFAPP.Core = function (canvas) {
    this._scene = new IDFAPP.Scene();  
    this._view3d = new IDFAPP.View3d(canvas, this._scene);
};

IDFAPP.Core.prototype = {
    /**
     * Initializes rendering.
     */
    beginRender: function () {
        this._view3d.render();
    }
};

/**
 * Initializes core.
 * @param {DOM Element} canvas Canvas element to draw GL context to.
 * @returns {IDFAPP.Core} Created coree.
 */
IDFAPP.Core.initialize = function (canvas) {
    return new IDFAPP.Core(canvas);
};