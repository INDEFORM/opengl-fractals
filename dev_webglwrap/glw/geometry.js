GLW.Geometry = function () {
	this.attributes = Map();
	this.indices = null;
	
	this.buffers_built = false;
};

GLW.Geometry.prototype.newAttribute = function (name, data) {
	var attrib = new GLW.Geometry.Attribute(data);
	this.attributes.set(name, attrib);
};

GLW.Geometry.prototype.buildBuffers = function (glc) {
	this.index_buffer = this.index_buffer || glc.createBuffer();
	glc.bindBuffer(glc.ELEMENT_ARRAY_BUFFER, this.index_buffer);
	glc.bufferData(glc.ELEMENT_ARRAY_BUFFER, this.indices, glc.STATIC_DRAW);
	this.index_count = this.indices.length;
	
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
