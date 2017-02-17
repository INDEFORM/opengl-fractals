/* global IDFAPP */

IDFAPP.Core = function (p) {
    this._params = {};
    this._params.view3d_container = (p.view3d_container ? document.getElementById(p.view3d_container) : null);
    this._params.events_wrapper = (p.events_wrapper ? document.getElementById(p.events_wrapper) : null);
    this._currentFranctal = null;

    if (this._params.view3d_container !== null) {
        this._view3d = new IDFAPP.View3d(this);
        this._ui = new IDFAPP.UI(this);
    }
};


IDFAPP.Core.prototype = {
    createFractal: function (id, params) {
        switch (id) {
            case 'fractal-builder_aln':
                this._currentFranctal = new IDFAPP.FractalBuilderAln(this._view3d.getScene(), params);
                break;
            case "fractal-l_system":
                this._currentFranctal = new IDFAPP.FractalLSystem(this._view3d.getScene(), params);
                break;
        }
    },
    getParams: function () {
        return this._params;
    },
    getView3d: function () {
        return this._view3d;
    }
};
