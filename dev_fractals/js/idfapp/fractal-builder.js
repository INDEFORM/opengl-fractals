/* global IDFAPP */

IDFAPP.FractalBuilder = function (scene, params) {
    this._scene = scene;
    this._params = params;
};


IDFAPP.FractalBuilder.prototype = Object.create(Object.prototype);
IDFAPP.FractalBuilder.prototype.constructor = IDFAPP.FractalBuilder;

IDFAPP.FractalBuilder.prototype.generate = function () {
    throw "Must be implemented by inheheriting class.";
};