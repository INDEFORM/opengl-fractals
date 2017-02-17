/* global IDFAPP */

IDFAPP.BaseFractalBuilder = function (scene, params) {
    this._scene = scene;
    this._params = params;
};

IDFAPP.BaseFractalBuilder.prototype = {
    build: function () {
        throw "Must be implemented by inheheriting class.";
    }
};