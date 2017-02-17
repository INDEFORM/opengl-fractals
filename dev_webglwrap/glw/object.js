GLW.Object = function() {
	this.local_matrix = new matrix.Matrix(4);
	this.local_inverse_matrix = new matrix.Matrix(4);
	this.global_matrix = new matrix.Matrix(4);
	this.global_inverse_matrix = new matrix.Matrix(4);
	
	this.children = new Set();
	this.parent = null;
	
	this.position = new matrix.Vector([0, 0, 0]);
	this.rotation_mode       = 'euler';
	this.rotation_euler      = {order: 'xyz', angles: [0, 0, 0]};
	this.rotation_quaternion = new matrix.Vector([1, 0, 0, 0]);
	this.scale = new matrix.Vector([1, 1, 1]);
};

GLW.Object.prototype.addChild = function (child) {
	var prev_parent = child.parent;
	
	if (prev_parent) {
		prev_parent.children.delete(child);
	}
	
	this.children.add(child);
	
	child.parent = this;
};

GLW.Object.prototype.removeChild = function (child) {
	this.children.delete(child);
	child.parent = null;
};

GLW.Object.prototype._getPositionMatrix = function () {
	return matrix.offsetToMatrix(this.position);
};

GLW.Object.prototype._getRotationMatrix = function() {
	var mtx;
	var mode = this._rotation_mode;
	
	switch (mode) {
		case 'quaternion':
			mtx = matrix.quaternionToMatrix(this._rotation_quaternion.setLength(1));
			break;
		case 'euler':
			var order = this._rotation_euler_order;
			var ang = this._rotation_euler;
			mtx = matrix.eulerToMatrix(ang, order);
			break;
	}
	
	return mtx.resize(4, 4);
};

GLW.Object.prototype._getScaleMatrix = function () {
	return matrix.scaleToMatrix(this.scale);
};

GLW.Object.prototype.calculateMatrices = function () {
	var pos_mtx = this._getPositionMatrix();
	var rot_mtx = this._getRotationMatrix();
	var scl_mtx = this._getScaleMatrix();
	
	this.local_matrix = pos_mtx.multiply(rot_mtx).multiply(scl_mtx);
	this.local_inverse_matrix = this.local_matrix.inverse();
	
	if (this.parent) {
		this.global_matrix = this.parent.global_matrix.multiply(this.local_matrix);
	} else {
		this.global_matrix = this.local_matrix;
	}
	this.global_inverse_matrix = this.global_matrix.inverse();
	
	for (let child of this.children) {
		child.calculateMatrices();
	}
};

GLW.Object.prototype.addToSetRecursively = function (set) {
	set.add(this);
	
	for (let child of this.children) {
		child.addToSetRecursively(set);
	}
};
