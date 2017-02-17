/* global IDFAPP, THREE */

IDFAPP.View3d = function (core) {
    this._core = core;
    this._scene = null;
    this._renderer = null;
    this._controls = null;
    this._canvas = null;

    this._pos = {
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
        this._scene.create();
        this.render();
    }
};

IDFAPP.View3d.prototype = {
    getScene: function () {
        return this._scene;
    },
    init: function () {
        try {
            this._scene = new IDFAPP.Scene(this);

            this._renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true, antialias: true, alpha: true, stencilBuffer: true});

            this._renderer.setSize(IDFAPP.VIEW3D_WIDTH, IDFAPP.VIEW3D_HEIGHT);
            this._renderer.autoClear = false;
            this._renderer.setClearColor(0x000000, 0.0);

            this._canvas = this._renderer.domElement;
            this._core.getParams().view3d_container.appendChild(this._canvas);

            this._canvas.addEventListener('mousemove', this, false);
            this._canvas.addEventListener('mousedown', this, false);
            this._canvas.addEventListener('mouseup', this, false);
            window.addEventListener("resize", this, false);

            this.resize();

            return true;
        } catch (e) {
            console.error("IDFAPP-ERROR: WebGL initialization failed.", e);
        }

        return false;
    },

    initControls: function () {
        this._controls = new THREE.OrbitControls(this._scene.getCamera(), this._renderer.domElement);
        this._controls.noZoom = false;
        this._controls.noPan = true;
        this._controls.minPolarAngle = 0;
    },

    disableControls: function (val) {
        this._controls.enabled = !val;
    },

    resize: function () {
        var p = IDFAPP.getElementRect(this._core.getParams().view3d_container);
        this._pos.view_l = p.left;
        this._pos.view_t = p.top;
        this._pos.view_w = p.width;
        this._pos.view_h = p.height;

        this._scene.updateCameraAspect(this._pos.view_w / this._pos.view_h);
        if (this._scene.cwidget)
            this._scene.cwidget.resize();
        this._renderer.setSize(p.width, p.height);
    },

    handleEvent: function (evt) {
        IDFAPP.setXYPosition(evt, this._pos);

        switch (evt.type) {
            case 'resize':
                this.resize();
                break;
        }

        this._scene.handleInput(evt, this._pos);
    },

    update: function () {
        if (this._controls.enabled)
            this._controls.update();
    },

    render: function () {
        this.update();

        requestAnimationFrame(this.render.bind(this));
        this._renderer.clear(true, true, true);
        this._renderer.render(this._scene, this._scene.getCamera());
    }
};

