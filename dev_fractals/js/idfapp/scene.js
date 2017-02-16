/* global IDFAPP, THREE */

IDFAPP.Scene = function (view3d) {
    THREE.Scene.call(this);

    this.view3d = view3d;
    this.camera = null;
    this.target = null;
    this.is_mousedown = false;

    this.cwidget = null;
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();

    this.selection_targets = [];
    this.selection = null;

    this.grid = null;

    this.hit_plane = new THREE.Plane(new THREE.Vector3(0.0, 0.0, 1.0), 0);
    this.cam_direction = new THREE.Vector3();

    this.setupCamera(IDFAPP.VIEW3D_DEFAULT_CAMERA_POS, IDFAPP.VIEW3D_DEFAULT_CAMERA_TARGET, IDFAPP.VIEW3D_WIDTH / IDFAPP.VIEW3D_HEIGHT);
    this.setupLights();
};


IDFAPP.Scene.prototype = Object.create(THREE.Scene.prototype);
IDFAPP.Scene.prototype.constructor = IDFAPP.Scene;


// SCENE SETUP
IDFAPP.Scene.prototype.setupCamera = function (pos, target, aspect) {
    this.camera = new THREE.PerspectiveCamera(IDFAPP.VIEW3D_VIEW_ANGLE, aspect, IDFAPP.VIEW3D_NEAR, IDFAPP.VIEW3D_FAR);
    this.camera.position.copy(pos);
    this.camera.lookAt(target);
    this.target = target;
    this.add(this.camera);
};



IDFAPP.Scene.prototype.setCameraTop = function () {
    this.camera.position.copy(IDFAPP.VIEW3D_EDITING_CAMERA_POS);
    this.camera.lookAt(IDFAPP.VIEW3D_EDITING_CAMERA_TARGET);
};



IDFAPP.Scene.prototype.updateCameraAspect = function (aspect) {
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
};



IDFAPP.Scene.prototype.setupLights = function () {
    var light = new THREE.DirectionalLight(0xffffff, 1.2);
    light.position.set(128, 128, 128);
    this.add(light);

    var light = new THREE.DirectionalLight(0xffffff, 1.8);
    light.position.set(-50, -128, -128);
    this.add(light);
};


IDFAPP.Scene.prototype.create = function () {
    this.addGrid();
    //this.addTestCube(1.0);
};



IDFAPP.Scene.prototype.addGrid = function () {
    this.grid = new THREE.GridHelper(10, 1);
//    this.grid.setColors(0xffffff, 0xffffff);
    this.grid.visible = true;
    
    this.add(new IDFAPP.FractalLSystem(5));

    this.add(this.grid);
};



IDFAPP.Scene.prototype.addTestCube = function (size, pos) {
    var geometry = new THREE.BoxGeometry(2, 2, 2);
    var material = new THREE.MeshLambertMaterial({color: 0x00ff00});
    var cube = new THREE.Mesh(geometry, material);

    if (pos)
        cube.position.copy(pos);
    if (size)
        cube.scale.multiplyScalar(size);

    this.add(cube);
    this.addSelectionTarget(cube);
};


IDFAPP.Scene.prototype.showGrid = function (val) {
    this.grid.visible = val;
};




IDFAPP.Scene.prototype.addSelectionTarget = function (target) {
    this.selection_targets.push(target);
};



// EVENTS HANDLING
IDFAPP.Scene.prototype.handleInput = function (evt, pos) {
    this.mouse.set(pos.nx, pos.ny);

    switch (evt.type) {
        case 'mousemove':
            break;
        case 'mousedown':
            this.is_mousedown = true;
            var pos = this.getPlaneHitPos(pos.nx, pos.ny);
            //this.addTestCube(0.2, pos);
            break;
        case 'mouseup':
            this.is_mousedown = false;
            break;
    }
};



IDFAPP.Scene.prototype.selectElement = function (npos) {

    this.raycaster.setFromCamera(npos, this.camera);

    var intersects = this.raycaster.intersectObjects(this.selection_targets, true);

    if (intersects.length > 0) {
        var obj = intersects[0].object;
    }
};


IDFAPP.Scene.prototype.getPlaneHitPos = function (nx, ny) {
    this.cam_direction.subVectors(this.target, this.camera.position);
    this.cam_direction.normalize();
    this.hit_plane.set(this.cam_direction, 0);

    this.raycaster.setFromCamera(this.mouse, this.camera);
    return this.raycaster.ray.intersectPlane(this.hit_plane);
};

