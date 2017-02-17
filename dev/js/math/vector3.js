/* global IDFAPP */

Math.Vector3 = function (x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
};

Math.Vector3.prototype = {
    clone: function () {
        return new Math.Vector3(this.x, this.y, this.z);
    },
    copy: function (v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;

        return this;
    },
    applyQuaternion: function (q) {
        var x = this.x;
        var y = this.y;
        var z = this.z;

        var qx = q.x;
        var qy = q.y;
        var qz = q.z;
        var qw = q.w;

        // calculate quat * vector
        var ix = qw * x + qy * z - qz * y;
        var iy = qw * y + qz * x - qx * z;
        var iz = qw * z + qx * y - qy * x;
        var iw = -qx * x - qy * y - qz * z;

        // calculate result * inverse quat
        this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

        return this;
    },
    applyAxisAngle: function (axis, angle) {
        var q = new Math.Quaternion();

        this.applyQuaternion(q.setFromAxisAngle(axis, angle));

        return this;
    },
    addVectors: function (a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;

        return this;
    },
    length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    },
    normalize: function () {
        var l = this.length();

        this.x /= l;
        this.y /= l;
        this.z /= l;

        return this;
    }

};