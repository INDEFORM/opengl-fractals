/* global IDFAPP */

IDFAPP.Core = function (p) {
    this.params = {};
    this.params['view3d_container'] = (p.view3d_container ? document.getElementById(p.view3d_container) : null);
    this.params['events_wrapper'] = (p.events_wrapper ? document.getElementById(p.events_wrapper) : null);
    this.current_fractal = null;

    if (this.params.view3d_container !== null) {
        this.view3d = new IDFAPP.View3d(this);
        this.ui = new IDFAPP.UI(this);
    }
};


IDFAPP.Core.prototype = {
    createFractal: function (id, params) {
        switch (id) {
            case 'fractal-builder_aln':
                this.current_fractal = new IDFAPP.FractalBuilderAln(this.view3d.scene, params);
                break;
            case "fractal-l_system":
                break;
        }
    }
};
