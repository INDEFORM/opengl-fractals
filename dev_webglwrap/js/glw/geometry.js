GLW.Geometry = function () {
	this.attributes = new Map();
	this.elements = {
		points: { gl_enum: 'POINTS', indices: null },
		lines: { gl_enum: 'LINES', indices: null },
		triangles: { gl_enum: 'TRIANGLES', indices: null },
	};
	this.indices = null;
	
	this.buffers_built = false;
};

GLW.Geometry.prototype.newAttribute = function (name, data) {
	var attrib = new GLW.Geometry.Attribute(data);
	this.attributes.set(name, attrib);
};

GLW.Geometry.prototype.buildBuffers = function (glc) {
	for (var elemtype in this.elements) {
		var elements = this.elements[elemtype];
		var indices = elements.indices;
		if (indices) {
			elements.index_buffer = elements.index_buffer || glc.createBuffer();
			glc.bindBuffer(glc.ELEMENT_ARRAY_BUFFER, elements.index_buffer);
			glc.bufferData(glc.ELEMENT_ARRAY_BUFFER, indices, glc.STATIC_DRAW);
			elements.index_count = indices.length;
		}
	}
	
	for (var [attrname, attr] of this.attributes) {
		attr.buffer = attr.buffer || glc.createBuffer();
		glc.bindBuffer(glc.ARRAY_BUFFER, attr.buffer);
		glc.bufferData(glc.ARRAY_BUFFER, attr.data, glc.STATIC_DRAW);
	}
	
	this.buffers_built = true;
};

GLW.Geometry.Attribute = function (data) {
	this.data = data;
};
