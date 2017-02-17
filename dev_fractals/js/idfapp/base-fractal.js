/* global IDFAPP, THREE */

IDFAPP.BaseFractal = function () {
    THREE.Object3D.call(this);
};

IDFAPP.BaseFractal.prototype = Object.create(THREE.Object3D.prototype);
IDFAPP.BaseFractal.prototype.constructor = IDFAPP.BaseFractal;

IDFAPP.BaseFractal.prototype.generate = function (iterations) {
    throw "Must be implemented by inheheriting class.";
};

IDFAPP.BaseFractal.prototype._buildPrimitive = function () {
    var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    var material = new THREE.MeshLambertMaterial({color: 0x00ff00});
    var cube = new THREE.Mesh(geometry, material);

    this.add(cube);

    return this;
};