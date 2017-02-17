GLW.Camera = function (fov) {
	GLW.Object.call(this);
	this.frustum_matrix = new matrix.Matrix(4);
	this.fov = fov || Math.PI*0.5;
	this.near_dist = 0.1;
	this.far_dist = 200;
	this.aspect_ratio = 4/3;
};

GLW.Camera.prototype = Object.create(GLW.Object.prototype);
GLW.Camera.prototype.constructor = GLW.Camera;

GLW.Camera.prototype.calculateProjectionMatrix = function () {
	var near_d = this.near_dist, far_d = this.far_dist;
	var wmult = Math.tan(this.fov/2);
	var near_w = near_d*wmult, far_w = far_d*wmult;
	
	var m11 = near_w*far_w*2;
	var m22 = m11/this.aspect_ratio;
	var m33 = far_d*near_w-near_d*far_w;
	var m34 = far_d*near_w+near_d*far_w;
	var m43 = near_w-far_w;
	var m44 = far_w+near_w;
	m33 = -m33;
	m34 = -m34;
	
	this.frustum_matrix = new matrix.Matrix([
		[m11,   0,   0,   0],
		[  0, m22,   0,   0],
		[  0,   0, m33, m34],
		[  0,   0, m43, m44]
	]).inverse();
};
