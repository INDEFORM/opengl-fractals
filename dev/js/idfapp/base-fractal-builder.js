/* global IDFAPP */

/**
 * Base class for fractal builder.
 * @param {IDFAPP.Scene} scene Scene.
 * @param {Object} params Fractal parameters.
 * @returns {IDFAPP.BaseFractalBuilder} Self.
 */
IDFAPP.BaseFractalBuilder = function (scene, params) {
    this._scene = scene;
    this._params = params;
};

IDFAPP.BaseFractalBuilder.prototype = {
    build: function () {
        throw "Must be implemented by inheheriting class.";
    }
};