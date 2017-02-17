GLW.Context = function (canvas) {
	this._glcontext = null;
	this._canvas = canvas;
	
	var glc = null;
	
	try
	{
		var flags = {'preserveDrawingBuffer': false};
		glc = canvas.getContext("webgl", flags) || canvas.getContext("experimental-webgl", flags);
	}
	catch(e) {
		throw "Failed to get the WebGL context";
	}
	
	this._glcontext = glc;
	
	glc.clearDepth(1.0);
	glc.enable(glc.DEPTH_TEST);
	//glc.enable(glc.CULL_FACE);
	glc.depthFunc(glc.LEQUAL);
	glc.blendFuncSeparate(glc.SRC_ALPHA, glc.ONE_MINUS_SRC_ALPHA, glc.ONE, glc.ONE_MINUS_SRC_ALPHA);
	glc.cullFace(glc.BACK);
};

GLW.Context.prototype.render = function (scene) {
	var glc = this._glcontext;
	
	var bgcolor = scene.background_color;
	glc.clearColor(bgcolor.r, bgcolor.g, bgcolor.b, 1);
	glc.clear(glc.COLOR_BUFFER_BIT | glc.DEPTH_BUFFER_BIT);
	
	
	var objects = new Set();
	for (let object of scene.objects) {
		object.calculateMatrices();
		object.addToSetRecursively(objects);
	}
	
	var camera = scene.camera;
	camera.calculateMatrices();
	camera.calculateFrustumMatrix();
	var cam_mtx = camera.global_inverse_matrix;
	var fr_mtx = camera.frustum_matrix;
	cam_mtx = fr_mtx.multiply(cam_mtx);
	
	for (let object of objects) {
		if (object instanceof GLW.Mesh) {
			this.renderObject(object, cam_mtx);
		}
	}
};

GLW.Context.prototype.renderObject = function (object, cam_mtx) {
	var glc = this._glcontext;
	
	var geometry = object.geometry;
	var material = object.material;
	
	if (!geometry.buffers_built) geometry.buildBuffers(glc);
	if (!material.shaders_compiled) material.compileShaders(glc);
	
	glc.useProgram(material.program);
	glc.bindBuffer(glc.ELEMENT_ARRAY_BUFFER, geometry.index_buffer);
	
	var used_attr_locations = [];
	for (let [attr_name, geo_attr] of geometry.attributes) {
		var prg_attr = material.program_attributes[attr_name];
		if (prg_attr) {
			var attr_loc = material.attribute_locations[attr_name];
			used_attr_locations.push(attr_loc);
		}
	}
	
	for (var i = 0; i < used_attr_locations.length; i++) {
		glc.enableVertexAttribArray(used_attr_locations[i]);
	}
	
	for (let [attr_name, geo_attr] of geometry.attributes) {
		var prg_attr = material.program_attributes[attr_name];
		if (prg_attr) {
			var attr_loc = material.attribute_locations[attr_name];
			var size = GLW.Context.getActiveSize(glc, prg_attr);
			glc.bindBuffer(glc.ARRAY_BUFFER, geo_attr.buffer);
			glc.vertexAttribPointer(attr_loc, size, glc.FLOAT, false, 0, 0);
		}
	}
	
	for (var uni_name in material.uniforms) {
		var uni_val = material.uniforms[uni_name];
		var prg_uni = material.program_uniforms[uni_name];
		if (prg_uni) {
			var uni_loc = material.uniform_locations[uni_name];
			var size = GLW.Context.getActiveSize(glc, prg_uni);
			this.setUniformValue(uni_loc, prg_uni, uni_val);
		}
	}
	
	var obj_mtx = object.global_matrix;
	var mdlv_mtx = cam_mtx.multiply(obj_mtx);
	this.setUniformValue(material.uniform_locations['modelViewMatrix'], material.program_uniforms['modelViewMatrix'], mdlv_mtx);
	
	glc.drawElements(glc.TRIANGLES, geometry.index_count, glc.UNSIGNED_SHORT, 0);
	
	for (var i = 0; i < used_attr_locations.length; i++) {
		glc.disableVertexAttribArray(used_attr_locations[i]);
	}
};

GLW.Context.getActiveSize = function (glc, active) {
	var typesize = 1;
	
	switch (active.type) {
		case glc.FLOAT_VEC2:
		case glc.INT_VEC2:
		case glc.BOOL_VEC2:
			typesize = 2;
			break;
		case glc.FLOAT_VEC3:
		case glc.INT_VEC3:
		case glc.BOOL_VEC3:
			typesize = 3;
			break;
		case glc.FLOAT_VEC4:
		case glc.INT_VEC4:
		case glc.BOOL_VEC4:
			typesize = 4;
			break;
		case glc.FLOAT_MAT2:
			typesize = 4;
			break;
		case glc.FLOAT_MAT3:
			typesize = 9;
			break;
		case glc.FLOAT_MAT4:
			typesize = 16;
			break;
	}
	
	return typesize*active.size
};

GLW.Context.prototype.setUniformValue = function (uni_loc, prg_uni, uni_val) {
	if (!prg_uni) return;
	
	var glc = this._glcontext;
	
	var data;
	
	if (uni_val instanceof matrix.Matrix) {
		uni_val = uni_val.transpose();
		data = GLW.Context.flattenArray(uni_val.data);
	} else if (uni_val instanceof matrix.Vector) {
		data = uni_val.data;
	} else if (!(uni_val instanceof Array)) {
		data = [uni_val];
	} else {
		data = uni_val;
	}
	
	switch (prg_uni.type) {
		case glc.FLOAT:
		case glc.FLOAT_VEC2:
		case glc.FLOAT_VEC3:
		case glc.FLOAT_VEC4:
		case glc.FLOAT_MAT2:
		case glc.FLOAT_MAT3:
		case glc.FLOAT_MAT4:
			data = new Float32Array(data);
			break;
		case glc.INT:
		case glc.INT_VEC2:
		case glc.INT_VEC3:
		case glc.INT_VEC4:
		case glc.BOOL:
		case glc.BOOL_VEC2:
		case glc.BOOL_VEC3:
		case glc.BOOL_VEC4:
			data = new Int32Array(data);
			break;
	}
	
	switch (prg_uni.type) {
		case glc.FLOAT:
			glc.uniform1fv(uni_loc, data);
			break;
		case glc.FLOAT_VEC2:
			glc.uniform2fv(uni_loc, data);
			break;
		case glc.FLOAT_VEC3:
			glc.uniform3fv(uni_loc, data);
			break;
		case glc.FLOAT_VEC4:
			glc.uniform4fv(uni_loc, data);
			break;
		case glc.FLOAT_MAT2:
			glc.uniformMatrix2fv(uni_loc, false, data);
			break;
		case glc.FLOAT_MAT3:
			glc.uniformMatrix3fv(uni_loc, false, data);
			break;
		case glc.FLOAT_MAT4:
			glc.uniformMatrix4fv(uni_loc, false, data);
			break;
		case glc.INT:
		case glc.BOOL:
			glc.uniform1iv(uni_loc, data);
			break;
		case glc.INT_VEC2:
		case glc.BOOL_VEC2:
			glc.uniform2iv(uni_loc, data);
			break;
		case glc.INT_VEC3:
		case glc.BOOL_VEC3:
			glc.uniform3iv(uni_loc, data);
			break;
		case glc.INT_VEC4:
		case glc.BOOL_VEC4:
			glc.uniform4iv(uni_loc, data);
			break;
	}
};

GLW.Context.flattenArray = function(array) {
	var flat = [];
	GLW.Context.flattenArray.flattenRecursively(array, flat);
	return flat;
}

GLW.Context.flattenArray.flattenRecursively = function(array, flat) {
	for (var id in array) {
		var val = array[id];
		if (val instanceof Array) {
			GLW.Context.flattenArray.flattenRecursively(val, flat);
		} else {
			flat[flat.length] = val;
		}
	}
}
