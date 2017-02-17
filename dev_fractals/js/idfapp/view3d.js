/* global IDFAPP, THREE */

IDFAPP.View3d = function (core) {
    this.core = core;
    this.scene = null;
    this.renderer = null;
    this.controls = null;
    this.canvas = null;

    this.pos = {
        x: 0,
        y: 0,
        nx: 0,
        ny: 0,
        view_l: 0,
        view_t: 0,
        view_w: 0,
        view_h: 0
    };

    if (this.init()) {
        this.initControls();
        this.scene.create();
        this.render();
    }
};

IDFAPP.View3d.prototype = {
    init: function () {
        try {

            this.scene = new IDFAPP.Scene(this);

            this.renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true, antialias: true, alpha: true, stencilBuffer: true});

            this.renderer.setSize(IDFAPP.VIEW3D_WIDTH, IDFAPP.VIEW3D_HEIGHT);
            this.renderer.autoClear = false;
            this.renderer.setClearColor(0x000000, 0.0);

            this.canvas = this.renderer.domElement;
            this.core.params.view3d_container.appendChild(this.canvas);

            this.canvas.addEventListener('mousemove', this, false);
            this.canvas.addEventListener('mousedown', this, false);
            this.canvas.addEventListener('mouseup', this, false);
            window.addEventListener("resize", this, false);

            this.resize();

            return true;
        } catch (e) {
            console.log('IDFAPP-ERROR: WebGL initialization failed.');
        }

        return false;
    },

    initControls: function () {
        this.controls = new THREE.OrbitControls(this.scene.camera, this.renderer.domElement);
        this.controls.noZoom = false;
        this.controls.noPan = true;
        this.controls.minPolarAngle = 0;
    },

    disableControls: function (val) {
        this.controls.enabled = !val;
    },

    resize: function () {
        var p = IDFAPP.getElementRect(this.core.params.view3d_container);
        this.pos.view_l = p.left;
        this.pos.view_t = p.top;
        this.pos.view_w = p.width;
        this.pos.view_h = p.height;

        this.scene.updateCameraAspect(this.pos.view_w / this.pos.view_h);
        if (this.scene.cwidget)
            this.scene.cwidget.resize();
        this.renderer.setSize(p.width, p.height);
    },

    handleEvent: function (evt) {
        IDFAPP.setXYPosition(evt, this.pos);

        switch (evt.type) {
            case 'resize':
                this.resize();
                break;
        }

        this.scene.handleInput(evt, this.pos);
    },

    update: function () {
        if (this.controls.enabled)
            this.controls.update();
    },

    render: function () {
        this.update();

        requestAnimationFrame(this.render.bind(this));
        this.renderer.clear(true, true, true);
        this.renderer.render(this.scene, this.scene.camera);
    }
};

