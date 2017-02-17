/* global IDFAPP, THREE */

IDFAPP.FractalBuilderAln = function (scene, params) {
    IDFAPP.FractalBuilder.call(this, scene, params);

    var material = new THREE.MeshLambertMaterial({color: 0x00ff00});
    var geometry = new THREE.BoxGeometry(2, 2, 2);

    this.build(material, geometry, 5, null);
};



IDFAPP.FractalBuilderAln.prototype = Object.create(IDFAPP.FractalBuilder.prototype);
IDFAPP.FractalBuilderAln.prototype.constructor = IDFAPP.FractalBuilderAln;


IDFAPP.FractalBuilderAln.prototype.build = function (material, geometry, iter, p) {
    if (iter === 0)
        return;

    iter--;

    var obj = new THREE.Mesh(geometry, material);

    if (p === null) {	// params initialization
        p = {
            pos: new THREE.Vector3(0, 0, 0)
        };
    } else { // params calculation
        p.pos.x += 1;
        p.pos.y += 1;
        p.pos.z += 1;

        obj.position.copy(p.pos);
    }


    this._scene.add(obj);
    this.build(material, geometry, iter, p);
};
