/* global IDFAPP, GLW */

IDFAPP.Core = function (canvas) {
    this._scene = new IDFAPP.Scene();
    
    this._view3d = new IDFAPP.View3d(canvas, this._scene);
};

IDFAPP.Core.prototype = {
    beginRender: function () {
        this._view3d.render();
    }
};

IDFAPP.Core.initialize = function (canvas) {
    return new IDFAPP.Core(canvas);
};