GLW.Mesh = function (geometry, material) {
	GLW.Object.call(this);
	this.geometry = geometry;
	this.material = material;
};

GLW.Mesh.prototype = Object.create(GLW.Object.prototype);
GLW.Mesh.prototype.constructor = GLW.Mesh;
