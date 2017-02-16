
IDFAPP = {
    // View3D
    VIEW3D_WIDTH: 600,
    VIEW3D_HEIGHT: 800,
    VIEW3D_ASPECT: 800 / 600,
    VIEW3D_VIEW_ANGLE: 45,
    VIEW3D_NEAR: 0.1,
    VIEW3D_FAR: 20000,

    VIEW3D_DEFAULT_CAMERA_POS: new THREE.Vector3(0.0, 0.0, 35.0),
    VIEW3D_DEFAULT_CAMERA_TARGET: new THREE.Vector3(0.0, 0.0, 0.0),


    // GENERAL FUNCTIONS
    getEventAction: function (evt, key) {
        var attr = evt.target.getAttribute(key);

        if (attr != null) {
            var pattern = new RegExp(/([^:]+)\:(.+)/g);
            var match;

            match = pattern.exec(attr);

            if (match != null) return { type: match[1], data: match[2] };
            else return { type: attr, data: null };
        }

        return null;
    },


    toggleClass: function (elm_id, class_name) {
        var elm = document.getElementById(elm_id);


        if (elm == null) {
            console.log("toggleClass() not found: " + elm_id);
            return;
        }

        if (elm.className.indexOf(class_name) >= 0) {
            this.removeElementClass(elm, class_name);
        } else {
            this.addElementClass(elm, class_name);
        }
    },


    addClass: function (elm_id, class_name) {
        var elm = document.getElementById(elm_id);

        if (elm == null) {
            console.log("addClass() not found: " + elm_id);
            return;
        }

        this.addElementClass(elm, class_name);
    },

    addElementClass: function (elm, class_name) {
        if (elm != null && elm != undefined) {
            this.removeElementClass(elm, class_name);
            elm.className += (" " + class_name);
        }
    },



    removeClass: function (elm_id, class_name) {
        var elm = document.getElementById(elm_id);

        if (elm == null) {
            console.log("removeClass() not found: " + elm_id);
            return;
        }

        this.removeElementClass(elm, class_name);
    },


    removeElementClass: function (elm, class_name) {
        if (elm != null && elm != undefined) {
            //if(elm.className == undefined || elm.classname == null)
            var cn = elm.className;
            elm.className = elm.className.replace(new RegExp("\\s*" + class_name + "\\s*", 'g'), ' ').trim();

            if (cn.length != elm.className.length) return true;
        }
        return false;
    },


    setXYPosition: function (evt, pos) {
        pos.x = evt.clientX - pos.view_l;
        pos.y = evt.clientY - pos.view_t;

        pos.nx = ((2 * pos.x) / pos.view_w - 1);
        pos.ny = (-(2 * pos.y) / pos.view_h + 1);// ndc.y;
    },


    getElementRect: function (elm) {
        var width = elm.offsetWidth;
        var height = elm.offsetHeight;

        var top = 0;
        var left = 0;

        while (elm != null) {
            top += elm.offsetTop;
            left += elm.offsetLeft;
            elm = elm.offsetParent;
        }

        var top_scroll = this.getScroll("Top", document.body);

        top -= top_scroll;

        return { top: top, left: left, width: width, height: height };
    },


    getScroll: function (method, element) {
        // The passed in `method` value should be 'Top' or 'Left'
        //method = 'scroll' + method;
        var scrOfX = 0, scrOfY = 0;

        if (typeof (window.pageYOffset) == 'number') {

            //Netscape compliant
            scrOfY = window.pageYOffset;
            scrOfX = window.pageXOffset;
        } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
            //DOM compliant
            scrOfY = document.body.scrollTop;
            scrOfX = document.body.scrollLeft;
        } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
            //IE6 standards compliant mode
            scrOfY = document.documentElement.scrollTop;
            scrOfX = document.documentElement.scrollLeft;
        }

        return method == 'Top' ? scrOfY : scrOfX;
    },

}

$ = function(elm_id) {
	return document.getElementById(elm_id);
};
