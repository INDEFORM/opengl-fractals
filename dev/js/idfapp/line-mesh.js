/* global IDFAPP, GLW */

IDFAPP.LineMesh = function (vertices) {

    var vertex_shader = document.getElementById('vertex-shader').innerText;
    var fragment_shader = document.getElementById('fragment-shader').innerText;
    var uniforms = {
        color: [1, 1, 1, 1]
    };

    this._geometry = new GLW.Geometry();
    this._material = new GLW.Material({vertex: vertex_shader, fragment: fragment_shader}, {}, uniforms);

    GLW.Mesh.call(this, this._geometry, this._material);

    this._createMesh(vertices);
};

IDFAPP.LineMesh.prototype = Object.create(GLW.Mesh.prototype);
IDFAPP.LineMesh.prototype.constructor = IDFAPP.LineMesh;

IDFAPP.LineMesh.prototype._createMesh = function (vertices) {
    var arrVertices = [];
    var arrIndices = [];

    var j = 0;
    for (var i = 0; i < vertices.length; i++) {
        arrVertices.push(vertices[i].x, vertices[i].y, vertices[i].z);
        arrIndices.push(j++);
    }

    this._geometry.elements.lines.indices = new Uint16Array(arrIndices);
    this._geometry.newAttribute("position", new Float32Array(arrVertices));
};