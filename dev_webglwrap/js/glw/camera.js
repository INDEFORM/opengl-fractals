GLW.Camera = function (fov) {
	GLW.Object.call(this);
	this.frustum_matrix = new matrix.Matrix(4);
	this.fov = fov || Math.PI*0.4;
	this.near_dist = 0.1;
	this.far_dist = 200;
	this.aspect_ratio = 4/3;
};

GLW.Camera.prototype = Object.create(GLW.Object.prototype);
GLW.Camera.prototype.constructor = GLW.Camera;

GLW.Camera.prototype.calculateFrustumMatrix = function () {
	var wmult = Math.tan(this.fov/2);
	var nd = this.near_dist, fd = this.far_dist;
	var nw = nd*wmult, fw = fd*wmult;
	var ar = this.aspect_ratio;
	nd *= -1;
	fd *= -1;
	
	var m11 = nw*fw*2;
	var m22 = m11/ar;
	var m33 = fd*nw-nd*fw;
	var m34 = fd*nw+nd*fw;
	var m43 = nw-fw;
	var m44 = fw+nw;
	m33 = -m33;
	m34 = -m34;
	
	this.frustum_matrix = new matrix.Matrix([
		[m11,   0,   0,   0],
		[  0, m22,   0,   0],
		[  0,   0, m33, m34],
		[  0,   0, m43, m44]
	]).inverse();
};
