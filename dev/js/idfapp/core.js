/* global IDFAPP, GLW */

IDFAPP.Core = function (canvas) {
    this._scene = new IDFAPP.Scene();
    this._view3d = new IDFAPP.View3d(canvas, this._scene);
    this._fractalBuilder = new IDFAPP.FractalLSystem();

    this._scene.add(new IDFAPP.LineMesh(this._fractalBuilder.build({
        rules: {
            axiom: "F",
            main: "F+[F-F]+F",
            //main: "FF+[+F-F[F0|F0]-0]-[-F+F+F]",
            secondary: [
                "F-[[0]+X]+F[+|F0]-0",
                "F+F+F+F+F+FFFFFL[22]FFFF",
                "FFFFFF333FFF",
                "FFFFF00FFFFF"
            ]
        },
        iterations: 3,
        theta: 22.5,
        scale: 1,
        angleInitial: 5
    })));
};

IDFAPP.Core.prototype = {
    beginRender: function () {
        this._view3d.render();
    }
};

IDFAPP.Core.initialize = function (canvas) {
    return new IDFAPP.Core(canvas);
};