matrix = {};

matrix.Matrix = function(arg1, arg2)
{
	var type1 = typeof(arg1);
	var type2 = typeof(arg2);
	
	if (type1 == "number")
	{
		if (type2 == "number")
			matrix._zeroMatrix(this, arg1, arg2);
		else if (type2 == "undefined")
			matrix._identityMatrix(this, arg1);
	}
	else if (arg1 instanceof matrix.Matrix && type2 == "undefined")
		matrix._copyMatrix(this, arg1);
	else if (arg1 instanceof Array && type2 == "undefined")
		matrix._matrixFromArray(this, arg1);
}

matrix._zeroMatrix = function (m, w, h)
{
	m.size = [w, h];
	m.data = [];
	
	for (var y = 0; y < h; y++)
	{
		m.data[y] = [];
		for (var x = 0; x < w; x++)
			m.data[y][x] = 0;
	}
}

matrix._identityMatrix = function (m, size)
{
	matrix._zeroMatrix(m, size, size);
	
	for (var i = 0; i < size; i++)
		m.data[i][i] = 1;
}

matrix._copyMatrix = function (nm, m)
{
	var size = m.size, data = m.data;
	var w = size[0], h = size[1];
	
	nm.size = [w, h];
	nm.data = [];
	
	for (var y = 0; y < h; y++)
	{
		nm.data[y] = [];
		for (var x = 0; x < w; x++)
			nm.data[y][x] = data[y][x];
	}
}

matrix._matrixFromArray = function (m, data)
{
	var h = data.length;
	
	if (h == 0)
	{
		m.size = [0, 0];
		m.data = [];
	}
	else
	{
		var w = data[0].length;
		
		for (var y = 1; y < h; y++)
			if (data[y].length != w)
				throw "Array row length mismatch";
		
		m.size = [w, h];
		m.data = [];
		
		for (var y = 0; y < h; y++)
		{
			m.data[y] = [];
			for (var x = 0; x < w; x++)
				m.data[y][x] = data[y][x];
		}
	}
}

matrix.Matrix.prototype.copy = function()
{
	return new matrix.Matrix(this);
}

matrix.Matrix.prototype.set = function(x, y, val)
{
	this.data[y][x] = val;
}

matrix.Matrix.prototype.get = function(x, y)
{
	return this.data[y][x];
}

matrix.Matrix.prototype.resize = function(w, h)
{
	var m = new matrix.Matrix(w, h);
	var copyw = Math.min(w, this.size[0]);
	var copyh = Math.min(h, this.size[1]);
	
	for (var y = 0; y < copyh; y++)
		for (var x = 0; x < copyw; x++)
			m.data[y][x] = this.data[y][x];
	
	return m;
}

matrix.Matrix.prototype.transpose = function()
{
	var w = this.size[0], h = this.size[1];
	var tm = new matrix.Matrix(h, w);
	
	for (var y = 0; y < w; y++)
		for (var x = 0; x < h; x++)
			tm.data[x][y] = this.data[y][x];
	
	return tm;
}

matrix.Matrix.prototype.add = function(m)
{
	var size1 = this.size, size2 = m.size;
	var w1 = size1[0], h1 = size1[1];
	var w2 = size2[0], h2 = size2[1];
	
	if (w1 != w2 || h1 != h2)
		throw "Matrix size mismatch";
	
	var nm = new matrix.Matrix(w1, h1);
	for (var y = 0; y < h1; y++)
		for (var x = 0; x < w1; x++)
			nm.data[y][x] = this.data[y][x]+m.data[y][x];
	
	return nm;
}

matrix.Matrix.prototype.subtract = function(m)
{
	var size1 = this.size, size2 = m.size;
	var w1 = size1[0], h1 = size1[1];
	var w2 = size2[0], h2 = size2[1];
	
	if (w1 != w2 || h1 != h2)
		throw "Matrix size mismatch";
	
	var nm = new matrix.Matrix(w1, h1);
	for (var y = 0; y < h1; y++)
		for (var x = 0; x < w1; x++)
			nm.data[y][x] = this.data[y][x]-m.data[y][x];
	
	return nm;
}

matrix.Matrix.prototype.multiply = function(m)
{
	if (typeof(m) == "number")
		return matrix._matrixMultiplyScalar(this, m);
	else if (m instanceof matrix.Matrix)
		return matrix._matrixMultiplyMatrix(this, m);
	else if (m instanceof matrix.Vector)
		return matrix._matrixMultiplyVector(this, m);
}

matrix._matrixMultiplyScalar = function(m, s)
{
	var w = m.size[0], h = m.size[1];
	
	var mm = new matrix.Matrix(w, h);
	for (var y = 0; y < h; y++)
		for (var x = 0; x < w; x++)
			mm.data[y][x] = m.data[y][x]*s;
	
	return mm;
}

matrix._matrixMultiplyMatrix = function(m1, m2)
{
	var w1 = m1.size[0], h1 = m1.size[1];
	var w2 = m2.size[0], h2 = m2.size[1];
	
	if (w1 != h2)
		throw "Multiplied matrix size mismatch";
	
	var m = new matrix.Matrix(w2, h1);
	
	for (var y = 0; y < h1; y++)
		for (var x = 0; x < w2; x++)
		{
			var mult = 0;
			for (var i = 0; i < w1; i++)
				mult += m1.data[y][i]*m2.data[i][x];
			m.data[y][x] = mult;
		}
	
	return m;
}

matrix.Matrix.prototype.divide = function(d)
{
	return matrix._matrixMultiplyScalar(this, 1/d);
}

matrix.Matrix.prototype.inverse = function()
{
	var size = this.size;
	if (size[0] != size[1])
		throw "Attempt to invert a non-square matrix";
	size = size[0];
	
	var im = new matrix.Matrix(size);
	var det = this.determinant();
	
	for (var y = 0; y < size; y++)
		for (var x = 0; x < size; x++)
			im.data[y][x] = this.cofactor(y, x)/det;
	
	return im;
}

matrix.Matrix.prototype.determinant = function()
{
	var size = this.size;
	if (size[0] != size[1])
		throw "Attempt to get determinant of a non-square matrix";
	size = size[0];
	
	if (size == 1)
		return this.data[0][0];
	
	var det = 0;
	
	for (var x = 0; x < size; x++)
		det += this.data[0][x]*this.cofactor(x, 0);
	
	return det;
}

matrix.Matrix.prototype.submatrix = function(x, y)
{
	var w = this.size[0], h = this.size[1];
	var subw = w-1, subh = h-1;
	
	var sub = new matrix.Matrix(subw, subh);
	
	for (var suby = 0; suby < subh; suby++)
	{
		var supy = suby;
		if (suby >= y)
			supy++;
		
		for (var subx = 0; subx < subw; subx++)
		{
			var supx = subx;
			if (subx >= x)
				supx += 1;
			
			sub.data[suby][subx] = this.data[supy][supx];
		}
	}
	
	return sub;
}

matrix.Matrix.prototype.minor = function(x, y)
{
	return this.submatrix(x, y).determinant();
}

matrix.Matrix.prototype.cofactor = function(x, y)
{
	var cf = this.minor(x, y);
	
	if ((x+y)%2 == 1)
		cf = -cf;
	
	return cf;
}

matrix.Matrix.prototype.toString = function()
{
	var rows = [];
	for (var y = 0; y < this.size[1]; y++)
		rows[y] = '['+this.data[y].join(', ')+']';
	
	return 'Matrix([\n\t'+rows.join(',\n\t')+'\n])';
}



matrix.Vector = function(arg)
{
	if (typeof(arg) == "number")
		matrix._zeroVector(this, arg);
	else if (arg instanceof matrix.Vector)
		matrix._copyVector(this, arg);
	else if (arg instanceof Array)
		matrix._vectorFromArray(this, arg);
}

matrix._zeroVector = function(v, size)
{
	v.size = size;
	v.data = [];
	for (var x = 0; x < size; x++)
		v.data[x] = 0;
}

matrix._copyVector = function(nv, v)
{
	nv.size = v.size;
	nv.data = [];
	for (var x = 0; x < v.size; x++)
		nv.data[x] = v.data[x];
}

matrix._vectorFromArray = function(v, data)
{
	v.size = data.length;
	v.data = [];
	for (var x = 0; x < data.length; x++)
		v.data[x] = data[x];
}

matrix.Vector.prototype.copy = function()
{
	return new matrix.Vector(this);
}

matrix.Vector.prototype.set = function(x, val)
{
	this.data[x] = val;
}

matrix.Vector.prototype.get = function(x)
{
	return this.data[x];
}

matrix.Vector.prototype.resize = function(size)
{
	var v = new matrix.Vector(size);
	var copysize = Math.min(size, this.size);
	
	for (var x = 0; x < copysize; x++)
		v.data[x] = this.data[x];
	
	return v;
}

matrix.Vector.prototype.add = function(v)
{
	if (this.size != v.size)
		throw "Vector size mismatch";
	
	var size = this.size;
	var nv = new matrix.Vector(size);
	for (var x = 0; x < size; x++)
		nv.data[x] = this.data[x]+v.data[x];
	return nv;
}

matrix.Vector.prototype.subtract = function(v)
{
	if (this.size != v.size)
		throw "Vector size mismatch";
	
	var size = this.size;
	var nv = new matrix.Vector(size);
	for (var x = 0; x < size; x++)
		nv.data[x] = this.data[x]-v.data[x];
	return nv;
}

matrix.Vector.prototype.multiply = function(m)
{
	if (typeof(m) == "number")
		return matrix._vectorMultiplyScalar(this, m);
	else if (m instanceof matrix.Matrix)
		return matrix._vectorMultiplyMatrix(this, m);
	else if (m instanceof matrix.Vector)
		return matrix._vectorMultiplyVector(this, m);
}

matrix._vectorMultiplyScalar = function(v, s)
{
	var mv = new matrix.Vector(v.size);
	for (var x = 0; x < v.size; x++)
		mv.data[x] = v.data[x]*s;
	
	return mv;
}

matrix._vectorMultiplyVector = function(v1, v2)
{
	if (v1.size != v2.size)
		throw "Vector size mismatch";
	
	var mult = 0;
	for (var x = 0; x < v1.size; x++)
		mult += v1.data[x]*v2.data[x];
	
	return mult;
}

matrix.Vector.prototype.divide = function(s)
{
	return matrix._vectorMultiplyScalar(this, 1/s);
}

matrix.Vector.prototype.dot = function(v)
{
	return matrix._vectorMultiplyVector(this, v);
}

matrix.Vector.prototype.cross = function(v)
{
	if (this.size != 3 || v.size != 3)
		throw "Attempt to get a cross product of non-3D vectors";
	
	var data1 = this.data, data2 = v.data;
	var x1 = data1[0], y1 = data1[1], z1 = data1[2];
	var x2 = data2[0], y2 = data2[1], z2 = data2[2];
	var x = y1*z2-z1*y2;
	var y = z1*x2-x1*z2;
	var z = x1*y2-y1*x2;
	return new matrix.Vector([x, y, z]);
}

matrix.Vector.prototype.getLength = function()
{
	return Math.sqrt(this.dot(this));
}

matrix.Vector.prototype.setLength = function(length)
{
	return this.multiply(length/this.getLength());
}

matrix.Vector.prototype.hasNaN = function()
{
	for (var i = 0; i < this.size; i++)
		if (isNaN(this.data[i]))
			return true;
	return false;
}

matrix.Vector.prototype.toString = function()
{
	return 'Vector(['+this.data.join(', ')+'])';
}



matrix._matrixMultiplyVector = function(m, v)
{
	var w = m.size[0], h = m.size[1];
	if (w != v.size)
		throw "Matrix and vector size mismatch";
	
	var nv = new matrix.Vector(h);
	for (var y = 0; y < h; y++)
	{
		var mult = 0;
		for (var x = 0; x < w; x++)
			mult += m.data[y][x]*v.data[x];
		nv.data[y] = mult;
	}
	
	return nv;
}

matrix._vectorMultiplyMatrix = function(v, m)
{
	var w = m.size[0], h = m.size[1];
	if (h != v.size)
		throw "Matrix and vector size mismatch";
	
	var nv = new matrix.Vector(w);
	for (var x = 0; x < w; x++)
	{
		var mult = 0;
		for (var y = 0; y < h; y++)
			mult += m.data[y][x]*v.data[y];
		nv.data[x] = mult;
	}
	
	return nv;
}



matrix.axisAngleToMatrix = function(axis, angle)
{
	var angsin = Math.sin(angle), angcos = Math.cos(angle);
	var rangcos = 1-angcos;
	
	axis = axis.setLength(1);
	var ax = axis.data[0], ay = axis.data[1], az = axis.data[2];
	
	var xx = (ay*ay+az*az)*angcos+ax*ax;
	var xy =  angsin*az+rangcos*ax*ay;
	var xz = -angsin*ay+rangcos*az*ax;
	var yx = -angsin*az+rangcos*ax*ay;
	var yy = (az*az+ax*ax)*angcos+ay*ay;
	var yz =  angsin*ax+rangcos*ay*az;
	var zx =  angsin*ay+rangcos*az*ax;
	var zy = -angsin*ax+rangcos*ay*az;
	var zz = (ax*ax+ay*ay)*angcos+az*az;
	
	var mdata = [
		[xx, yx, zx],
		[xy, yy, zy],
		[xz, yz, zz]
	];
	return new matrix.Matrix(mdata);
}

/*matrix.matrixToAxisAngle = function(m)
{
	var ax = m.data[2][1]-m.data[1][2];
	var ay = m.data[0][2]-m.data[2][0];
	var az = m.data[1][0]-m.data[0][1];
	var axis = new matrix.Vector([ax, ay, az]).setLength(1);
	
	if (isNaN(axis.data[0]) || isNaN(axis.data[1]) || isNaN(axis.data[2]))
		return [new matrix.Vector(3), 0];
	
	var angle = Math.acos((m.data[0][0]+m.data[1][1]+m.data[2][2]-1)*0.5);
	return [axis, angle];
}*/

matrix.matrixToAxisAngle = function(m)
{
	var xd = new matrix.Vector([m.data[0][0]-1, m.data[1][0]-0, m.data[2][0]-0]);
	var yd = new matrix.Vector([m.data[0][1]-0, m.data[1][1]-1, m.data[2][1]-0]);
	var zd = new matrix.Vector([m.data[0][2]-0, m.data[1][2]-0, m.data[2][2]-1]);
	
	var xyaxis = xd.cross(yd);
	var yzaxis = yd.cross(zd);
	var zxaxis = zd.cross(xd);
	
	var xylensq = xyaxis.cross(xyaxis);
	var yzlensq = xyaxis.cross(yzaxis);
	var zxlensq = xyaxis.cross(zxaxis);
	
	var axis;
	if (xylensq > yzlensq && xylensq > zxlensq)
		axis = xyaxis;
	else if (yzlensq > zxlensq)
		axis = yzaxis;
	else
		axis = zxaxis;
	
	var length = axis.getLength();
	axis = axis.divide(length);
	
	if (axis.hasNaN())
		return [new matrix.Vector([0, 0, 1]), 0];
	
	var angcos = Math.min(1, Math.max(-1, (m.data[0][0]+m.data[1][1]+m.data[2][2]-1)*0.5));
	var angle = Math.acos(angcos);
	
	var mb1 = matrix.axisAngleToMatrix(axis, angle), mb2 = matrix.axisAngleToMatrix(axis, -angle);
	var diff1 = 0, diff2 = 0;
	
	for (var y = 0; y < 3; y++)
		for (var x = 0; x < 3; x++)
		{
			diff1 += Math.abs(mb1.data[y][x]-m.data[y][x]);
			diff2 += Math.abs(mb2.data[y][x]-m.data[y][x]);
		}
	
	if (diff2 < diff1)
		angle = -angle;
	
	return [axis, angle];
}

matrix.quaternionToMatrix = function(q)
{
	var qd = q.data;
	var w = qd[0], x = qd[1], y = qd[2], z = qd[3];
	var mdata = [
		[1-2*y*y-2*z*z, 2*x*y-2*z*w, 2*x*z+2*y*w],
		[2*x*y+2*z*w, 1-2*x*x-2*z*z, 2*y*z-2*x*w],
		[2*x*z-2*y*w, 2*y*z+2*x*w, 1-2*x*x-2*y*y]
	];
	return new matrix.Matrix(mdata);
}

matrix.matrixToQuaternion = function(m)
{
	var t = m.data[0][0]+m.data[1][1]+m.data[2][2];
	var r = Math.sqrt(1+t);
	var w = 0.5*r;
	var x = 0.5*Math.sqrt(1+m.data[0][0]-m.data[1][1]-m.data[2][2]);
	var y = 0.5*Math.sqrt(1-m.data[0][0]+m.data[1][1]-m.data[2][2]);
	var z = 0.5*Math.sqrt(1-m.data[0][0]-m.data[1][1]+m.data[2][2]);
	var xsgn = m.data[2][1]-m.data[1][2];
	var ysgn = m.data[0][2]-m.data[2][0];
	var zsgn = m.data[1][0]-m.data[0][1];
	
	if ((x > 0) != (xsgn > 0))
		x = -x;
	if ((y > 0) != (ysgn > 0))
		y = -y;
	if ((z > 0) != (zsgn > 0))
		z = -z;
	
	return new matrix.Vector([w, x, y, z]);
}

var axis_char_id = {'x': 0, 'y': 1, 'z': 2};

var getAxisIDFromChar = function(order, i)
{
	var char = order.substr(i, 1);
	return axis_char_id[char];
}

matrix.eulerToMatrix = function(angles, order)
{
	var m = new matrix.Matrix(3);
	for (i = 0; i < 3; i++)
	{
		var axisid = getAxisIDFromChar(order, i);
		
		var axis = new matrix.Vector(3);
		axis.data[axisid] = 1;
		var angle = angles[axisid];
		
		var axisrot = matrix.axisAngleToMatrix(axis, angle);
		m = axisrot.multiply(m);
	}
	return m;
}

matrix.matrixToEuler = function(m, order)
{
	var angles = [];
	var orderids = [];
	for (var i = 0; i < 3; i++)
		orderids[i] = getAxisIDFromChar(order, i);
	
	var o0 = orderids[0], o1 = orderids[1], o2 = orderids[2];
	var dec_order = o0 == (o1+1)%3;
	
	angles[o2] = Math.atan2(m.data[o1][o0], m.data[o0][o0]);
	angles[o1] = Math.asin(-m.data[o2][o0]);
	angles[o0] = 0;
	
	if (dec_order)
	{
		angles[o2] = -angles[o2];
		angles[o1] = -angles[o1];
	}
	
	var m2 = matrix.eulerToMatrix(angles, order);
	var relm = m2.inverse().multiply(m);
	
	angles[o0] = Math.atan2(relm.data[o2][o1], relm.data[o1][o1]);
	if (dec_order)
		angles[o0] = -angles[o0];
	
	return angles;
}

matrix.offsetToMatrix = function(off)
{
	off = off.data;
	return new matrix.Matrix([
		[1, 0, 0, off[0]],
		[0, 1, 0, off[1]],
		[0, 0, 1, off[2]],
		[0, 0, 0, 1]
	]);
}

matrix.scaleToMatrix = function(scl)
{
	scl = scl.data;
	return new matrix.Matrix([
		[scl[0], 0, 0, 0],
		[0, scl[1], 0, 0],
		[0, 0, scl[2], 0],
		[0, 0, 0, 1]
	]);
}
