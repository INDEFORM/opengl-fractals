GLW.Material = function (shader_code, defines, uniforms) {
	this.shader_code = {
		vertex: shader_code.vertex,
		fragment: shader_code.fragment
	};
	
	this.defines = defines;
	this.uniforms = uniforms;
	
	this.shaders_compiled = false;
};

GLW.Material.prototype.generateDefinesCode = function () {
	var defines_code = [];
	
	for (var defname in this.defines) {
		var defval = this.defines[defname];
		var define_line = '#define '+defname+' '+defval+'\n';
		defines_code.push(define_line);
	}
	
	defines_code = defines_code.join();
	return defines_code;
};

GLW.Material.prototype.compileShaders = function (glc) {
	var defcode = this.generateDefinesCode();
	
	var vertex_shader   = glc.createShader(glc.VERTEX_SHADER  );
	var fragment_shader = glc.createShader(glc.FRAGMENT_SHADER);
	glc.shaderSource(vertex_shader  , defcode+this.shader_code.vertex  );
	glc.shaderSource(fragment_shader, defcode+this.shader_code.fragment);
	glc.compileShader(vertex_shader  );
	glc.compileShader(fragment_shader);
	
	if (!glc.getShaderParameter(vertex_shader, glc.COMPILE_STATUS)) {
		alert("Failed to compile the vertex shader: "+glc.getShaderInfoLog(vertex_shader));
	}
	if (!glc.getShaderParameter(fragment_shader, glc.COMPILE_STATUS)) {
		alert("Failed to compile the fragment shader: "+glc.getShaderInfoLog(fragment_shader));
	}
	
	var shader_program = glc.createProgram();
	glc.attachShader(shader_program, vertex_shader  );
	glc.attachShader(shader_program, fragment_shader);
	glc.linkProgram(shader_program);
	
	if (!glc.getProgramParameter(shader_program, glc.LINK_STATUS))
		alert("Failed to link the shader program.");
	
	this.shaders = {
		vertex: vertex_shader,
		fragment: fragment_shader
	};
	this.program = shader_program;
	this.processProgramAttributeList(glc);
	this.processProgramUniformList(glc);
	this.shaders_compiled = true;
};

GLW.Material.prototype.processProgramAttributeList = function (glc) {
	var attrlocs = {};
	var attribs = {};
	
	var attrib_count = glc.getProgramParameter(this.program, glc.ACTIVE_ATTRIBUTES);
	for (var i = 0; i < attrib_count; i++) {
		var attrib = glc.getActiveAttrib(this.program, i);
		var attrloc = glc.getAttribLocation(this.program, attrib.name);
		attrlocs[attrib.name] = attrloc;
		attribs[attrib.name] = attrib;
	}
	
	this.program_attributes = attribs;
	this.attribute_locations = attrlocs;
};

GLW.Material.prototype.processProgramUniformList = function (glc) {
	var unilocs = {};
	var unis = {};
	
	var uni_count = glc.getProgramParameter(this.program, glc.ACTIVE_UNIFORMS);
	for (var i = 0; i < uni_count; i++) {
		var uni = glc.getActiveUniform(this.program, i);
		var uniloc = glc.getUniformLocation(this.program, uni.name);
		unilocs[uni.name] = uniloc;
		unis[uni.name] = uni;
	}
	
	this.program_uniforms = unis;
	this.uniform_locations = unilocs;
};
