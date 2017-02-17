/* global IDFAPP, THREE */

IDFAPP.Scene = function (view3d) {
    THREE.Scene.call(this);

    this._view3d = view3d;
    this._camera = null;

    this._target = null;

    this.setupCamera(IDFAPP.VIEW3D_DEFAULT_CAMERA_POS, IDFAPP.VIEW3D_DEFAULT_CAMERA_TARGET, IDFAPP.VIEW3D_WIDTH / IDFAPP.VIEW3D_HEIGHT);
    this.setupLights();
};


IDFAPP.Scene.prototype = Object.create(THREE.Scene.prototype);
IDFAPP.Scene.prototype.constructor = IDFAPP.Scene;


// SCENE SETUP
IDFAPP.Scene.prototype.setupCamera = function (pos, target, aspect) {
    this._camera = new THREE.PerspectiveCamera(IDFAPP.VIEW3D_VIEW_ANGLE, aspect, IDFAPP.VIEW3D_NEAR, IDFAPP.VIEW3D_FAR);
    this._camera.position.copy(pos);
    this._camera.lookAt(target);
    this._target = target;
    this.add(this._camera);
};

IDFAPP.Scene.prototype.getCamera = function () {
    return this._camera;
};


IDFAPP.Scene.prototype.setCameraTop = function () {
    this._camera.position.copy(IDFAPP.VIEW3D_EDITING_CAMERA_POS);
    this._camera.lookAt(IDFAPP.VIEW3D_EDITING_CAMERA_TARGET);
};



IDFAPP.Scene.prototype.updateCameraAspect = function (aspect) {
    this._camera.aspect = aspect;
    this._camera.updateProjectionMatrix();
};



IDFAPP.Scene.prototype.setupLights = function () {
    var light = new THREE.DirectionalLight(0xffffff, 1.2);
    light.position.set(128, 128, 128);
    this.add(light);

    var light = new THREE.DirectionalLight(0xffffff, 1.8);
    light.position.set(-50, -128, -128);
    this.add(light);
};


IDFAPP.Scene.prototype.create = function () {};

// EVENTS HANDLING
IDFAPP.Scene.prototype.handleInput = function (evt, pos) {};
