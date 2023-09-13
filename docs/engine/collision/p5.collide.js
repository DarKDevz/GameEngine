console.log("### p5.collide v0.7.3 ###");
p5.prototype._collideDebug = !1;
p5.prototype.collideDebug = function (t) { this._collideDebug = t; };
p5.prototype.collideRectRect = function (t, o, e, i, r, l, n, c) { return t + e >= r && t <= r + n && o + i >= l && o <= l + c; }, p5.prototype.collideRectRectVector = function (t, o, e, i) { return p5.prototype.collideRectRect(t.x, t.y, o.x, o.y, e.x, e.y, i.x, i.y); }, p5.prototype.collideRectCircle = function (t, o, e, i, r, l, n) { var c = r, p = l; return r < t ? c = t : r > t + e && (c = t + e), l < o ? p = o : l > o + i && (p = o + i), this.dist(r, l, c, p) <= n / 2; }, p5.prototype.collideRectCircleVector = function (t, o, e, i) { return p5.prototype.collideRectCircle(t.x, t.y, o.x, o.y, e.x, e.y, i); }, p5.prototype.collideCircleCircle = function (t, o, e, i, r, l) { return this.dist(t, o, i, r) <= e / 2 + l / 2; }, p5.prototype.collideCircleCircleVector = function (t, o, e, i) { return p5.prototype.collideCircleCircle(t.x, t.y, o, e.x, e.y, i); }, p5.prototype.collidePointCircle = function (t, o, e, i, r) { return this.dist(t, o, e, i) <= r / 2; }, p5.prototype.collidePointCircleVector = function (t, o, e) { return p5.prototype.collidePointCircle(t.x, t.y, o.x, o.y, e); }, p5.prototype.collidePointEllipse = function (t, o, e, i, r, l) {
    var n = r / 2, c = l / 2;
    if (t > e + n || t < e - n || o > i + c || o < i - c)
        return !1;
    var p = t - e, y = o - i, d = c * this.sqrt(this.abs(n * n - p * p)) / n;
    return y <= d && y >= -d;
};
p5.prototype.collidePointEllipseVector = function (t, o, e) { return p5.prototype.collidePointEllipse(t.x, t.y, o.x, o.y, e.x, e.y); }, p5.prototype.collidePointRect = function (t, o, e, i, r, l) { return t >= e && t <= e + r && o >= i && o <= i + l; }, p5.prototype.collidePointRectVector = function (t, o, e) { return p5.prototype.collidePointRect(t.x, t.y, o.x, o.y, e.x, e.y); }, p5.prototype.collidePointLine = function (t, o, e, i, r, l, n) { var c = this.dist(t, o, e, i), p = this.dist(t, o, r, l), y = this.dist(e, i, r, l); return void 0 === n && (n = .1), c + p >= y - n && c + p <= y + n; }, p5.prototype.collidePointLineVector = function (t, o, e, i) { return p5.prototype.collidePointLine(t.x, t.y, o.x, o.y, e.x, e.y, i); }, p5.prototype.collideLineCircle = function (t, o, e, i, r, l, n) {
    var c = this.collidePointCircle(t, o, r, l, n), p = this.collidePointCircle(e, i, r, l, n);
    if (c || p)
        return !0;
    var y = t - e, d = o - i, u = this.sqrt(y * y + d * d), s = ((r - t) * (e - t) + (l - o) * (i - o)) / this.pow(u, 2), x = t + s * (e - t), f = o + s * (i - o);
    return !!this.collidePointLine(x, f, t, o, e, i) && (this._collideDebug && this.ellipse(x, f, 10, 10), y = x - r, d = f - l, this.sqrt(y * y + d * d) <= n / 2);
};
p5.prototype.collideLineCircleVector = function (t, o, e, i) { return p5.prototype.collideLineCircle(t.x, t.y, o.x, o.y, e.x, e.y, i); }, p5.prototype.collideLineLine = function (t, o, e, i, r, l, n, c, p) {
    var y = ((n - r) * (o - l) - (c - l) * (t - r)) / ((c - l) * (e - t) - (n - r) * (i - o)), d = ((e - t) * (o - l) - (i - o) * (t - r)) / ((c - l) * (e - t) - (n - r) * (i - o));
    if (y >= 0 && y <= 1 && d >= 0 && d <= 1) {
        if (this._collideDebug || p)
            var u = t + y * (e - t), s = o + y * (i - o);
        return this._collideDebug && this.ellipse(u, s, 10, 10), !p || { x: u, y: s };
    }
    return !!p && { x: !1, y: !1 };
};
p5.prototype.collideLineLineVector = function (t, o, e, i, r) { return p5.prototype.collideLineLine(t.x, t.y, o.x, o.y, e.x, e.y, i.x, i.y, r); }, p5.prototype.collideLineRect = function (t, o, e, i, r, l, n, c, p) { var y, d, u, s, x; return p ? x = { left: y = this.collideLineLine(t, o, e, i, r, l, r, l + c, !0), right: d = this.collideLineLine(t, o, e, i, r + n, l, r + n, l + c, !0), top: u = this.collideLineLine(t, o, e, i, r, l, r + n, l, !0), bottom: s = this.collideLineLine(t, o, e, i, r, l + c, r + n, l + c, !0) } : (y = this.collideLineLine(t, o, e, i, r, l, r, l + c), d = this.collideLineLine(t, o, e, i, r + n, l, r + n, l + c), u = this.collideLineLine(t, o, e, i, r, l, r + n, l), s = this.collideLineLine(t, o, e, i, r, l + c, r + n, l + c)), !!(y || d || u || s) && (!p || x); }, p5.prototype.collideLineRectVector = function (t, o, e, i, r) { return p5.prototype.collideLineRect(t.x, t.y, o.x, o.y, e.x, e.y, i.x, i.y, r); }, p5.prototype.collidePointPoly = function (t, o, e) {
    for (var i = !1, r = 0, l = 0; l < e.length; l++) {
        (r = l + 1) === e.length && (r = 0);
        var n = e[l], c = e[r];
        (n.y >= o && c.y < o || n.y < o && c.y >= o) && t < (c.x - n.x) * (o - n.y) / (c.y - n.y) + n.x && (i = !i);
    }
    return i;
};
p5.prototype.collidePointPolyVector = function (t, o) { return p5.prototype.collidePointPoly(t.x, t.y, o); }, p5.prototype.collideCirclePoly = function (t, o, e, i, r) {
    void 0 === r && (r = !1);
    for (var l = 0, n = 0; n < i.length; n++) {
        (l = n + 1) === i.length && (l = 0);
        var c = i[n], p = i[l];
        if (this.collideLineCircle(c.x, c.y, p.x, p.y, t, o, e))
            return !0;
    }
    if (!0 === r && this.collidePointPoly(t, o, i))
        return !0;
    return !1;
};
p5.prototype.collideCirclePolyVector = function (t, o, e, i) { return p5.prototype.collideCirclePoly(t.x, t.y, o, e, i); }, p5.prototype.collideRectPoly = function (t, o, e, i, r, l) {
    null == l && (l = !1);
    for (var n = 0, c = 0; c < r.length; c++) {
        (n = c + 1) === r.length && (n = 0);
        var p = r[c], y = r[n];
        if (this.collideLineRect(p.x, p.y, y.x, y.y, t, o, e, i))
            return !0;
        if (!0 === l)
            if (this.collidePointPoly(t, o, r))
                return !0;
    }
    return !1;
};
p5.prototype.collideRectPolyVector = function (t, o, e, i) { return p5.prototype.collideRectPoly(t.x, t.y, o.x, o.y, e, i); }, p5.prototype.collideLinePoly = function (t, o, e, i, r) {
    for (var l = 0, n = 0; n < r.length; n++) {
        (l = n + 1) === r.length && (l = 0);
        var c = r[n].x, p = r[n].y, y = r[l].x, d = r[l].y;
        if (this.collideLineLine(t, o, e, i, c, p, y, d))
            return !0;
    }
    return !1;
};
p5.prototype.collideLinePolyVector = function (t, o, e) { return p5.prototype.collideLinePoly(t.x, t.y, o.x, o.y, e); }, p5.prototype.collidePolyPoly = function (t, o, e) {
    void 0 === e && (e = !1);
    for (var i = 0, r = 0; r < t.length; r++) {
        (i = r + 1) === t.length && (i = 0);
        var l = t[r], n = t[i], c = this.collideLinePoly(l.x, l.y, n.x, n.y, o);
        if (c)
            return !0;
        if (!0 === e) {
            if (c = this.collidePointPoly(o[0].x, o[0].y, t))
                return !0;
            if (c = this.collidePointPoly(t[0].x, t[0].y, o))
                return !0;
        }
    }
    return !1;
};
p5.prototype.collidePolyPolyVector = function (t, o, e) { return p5.prototype.collidePolyPoly(t, o, e); }, p5.prototype.collidePointTriangle = function (t, o, e, i, r, l, n, c) { var p = this.abs((r - e) * (c - i) - (n - e) * (l - i)); return this.abs((e - t) * (l - o) - (r - t) * (i - o)) + this.abs((r - t) * (c - o) - (n - t) * (l - o)) + this.abs((n - t) * (i - o) - (e - t) * (c - o)) === p; }, p5.prototype.collidePointTriangleVector = function (t, o, e, i) { return p5.prototype.collidePointTriangle(t.x, t.y, o.x, o.y, e.x, e.y, i.x, i.y); }, p5.prototype.collidePointPoint = function (t, o, e, i, r) { return void 0 === r && (r = 0), this.dist(t, o, e, i) <= r; }, p5.prototype.collidePointPointVector = function (t, o, e) { return p5.prototype.collidePointPoint(t.x, t.y, o.x, o.y, e); }, p5.prototype.collidePointArc = function (t, o, e, i, r, l, n, c) {
    void 0 === c && (c = 0);
    var p = this.createVector(t, o), y = this.createVector(e, i), d = this.createVector(r, 0).rotate(l), u = p.copy().sub(y);
    if (p.dist(y) <= r + c) {
        var s = d.dot(u), x = d.angleBetween(u);
        if (s > 0 && x <= n / 2 && x >= -n / 2)
            return !0;
    }
    return !1;
};
p5.prototype.collidePointArcVector = function (t, o, e, i, r, l) { return p5.prototype.collidePointArc(t.x, t.y, o.x, o.y, e, i, r, l); };
p5.prototype.updateColliders = function () {
    this.cam = p5.instance._renderer._curCamera;
    this.hnear = 2 * Math.tan(this.cam.cameraFOV / 2) * this.cam.cameraNear;
    this.wnear = this.hnear * this.cam.aspectRatio;
    this.hfar = 2 * Math.tan(this.cam.cameraFOV / 2) * this.cam.cameraFar;
    this.wfar = this.hfar * this.cam.aspectRatio;
    this.camPos = createVector(this.cam.eyeX, this.cam.eyeY, this.cam.eyeZ);
    /**
     * xyz lookat
     * x'y'z' position
     * xyz-x'y'z'
     * give the look at vector
     * you can normalize if you dont know the length  or divide
     * by the near
     */
    this.nCamPos = createVector(this.cam.centerX, this.cam.centerY, this.cam.centerZ).sub(this.camPos).normalize();
    this.fc = this.camPos.copy().add(this.nCamPos.copy().mult(this.cam.cameraFar));
    let upV = createVector(...p5.instance.cam._getLocalAxes().y);
    let rightV = createVector(...p5.instance.cam._getLocalAxes().x);
    rightV.x *= -1;
    rightV.z *= -1;
    this.ftl = this.fc.copy().add(rightV.copy().mult(-this.wfar / 2)).add(upV.copy().mult(this.hfar / 2));
    this.ftr = this.fc.copy().add(rightV.copy().mult(this.wfar / 2)).add(upV.copy().mult(this.hfar / 2));
    this.fbr = this.fc.copy().add(rightV.copy().mult(this.wfar / 2)).add(upV.copy().mult(-this.hfar / 2));
    this.fbl = this.fc.copy().add(rightV.copy().mult(-this.wfar / 2)).add(upV.copy().mult(-this.hfar / 2));
    this.nc = this.camPos.copy().add(this.nCamPos.copy().mult(this.cam.cameraNear));
    this.ntl = this.nc.copy().add(rightV.copy().mult(-this.wfar / 2)).add(upV.copy().mult(this.hfar / 2));
    this.ntr = this.nc.copy().add(rightV.copy().mult(this.wfar / 2)).add(upV.copy().mult(this.hfar / 2));
    this.nbr = this.nc.copy().add(rightV.copy().mult(this.wfar / 2)).add(upV.copy().mult(-this.hfar / 2));
    this.nbl = this.nc.copy().add(rightV.copy().mult(-this.wfar / 2)).add(upV.copy().mult(-this.hfar / 2));
    //
    this.planes = [];
    //Has same direction as camera
    this.planes.push(this.addPlane(this.ntl, this.ntr, this.nbr));
    //Has opposite direction as camera
    this.planes.push(this.addPlane(this.ftr, this.ftl, this.fbl));
    return this;
};
p5.prototype.checkIfVisible = function (transformedPosition, threshold = 0) {
    for (let i in this.planes) {
        let plane = this.planes[i];
        let ogD = plane.dist;
        let norm = plane.normalDir;
        if (ogD + norm.dot(transformedPosition) < threshold) {
            return false;
        }
    }
    return true;
};
p5.prototype.addPlane = function (p0, p1, p2) {
    let aux1, aux2;
    aux1 = p0.copy().sub(p1);
    aux2 = p2.copy().sub(p1);
    let normal = aux1.cross(aux2).normalize();
    //console.log(normal);
    //cross product of (po-p1)cross(p2-p1)
    //normalize then get dot product of p2
    return {
        top: p0.copy(),
        bottom: p1.copy(),
        normalDir: normal.copy(),
        dist: -normal.dot(p2.copy())
    };
};
p5.prototype.collideFrustumRectVector = function (a, b, c) {
    let startPoint = (new DOMPoint(b.x, b.y, 0));
    let endPoint = (new DOMPoint(b.x + c.x, b.y + c.y, 0));
    return this.checkIfVisible(createVector(startPoint.x, startPoint.y, 0)) || this.checkIfVisible(createVector(endPoint.x, endPoint.y, 0));
};
p5.prototype.collideFrustumCircleVector = function (a, b, c) {
    //console.log(a.uPMatrix.multiplyVec4(...a.uMVMatrix.multiplyVec4(b.x,b.y,0,1)))
    return this.checkIfVisible(createVector(b.x, b.y, 0), c);
};
/*
 * Initialize both a typed JavaScript array and the WebGL buffer for the
 * attribute.
 *
 * May return either an Typed JavaScript array corresponding to the attribute
 * type, or in the case of matrices and vectors, an Array of Typed arrays.
 */
p5.Shader.prototype.initializedInstancedAttribute = function (attributeName, instanceCount, options) {
    this.init();
    const attribute = this.attributes[attributeName];
    if (!attribute) {
        throw new Error(`The specified attribute was not found: ${attributeName}`);
    }
    const gl = this._renderer.GL;
    if (attribute.arrayData) {
        throw new Error(`The attribute ${attributeName} has already been intialized as an instanced array`);
    }
    if (!this._instanceCount) {
        this._instanceCount = instanceCount;
    }
    else if (this._instanceCount !== instanceCount) {
        throw new Error('Instance count mismatch. All instanced attributes must use the same instance count.');
    }
    this.useProgram();
    switch (attribute.type) {
        //	case gl.BOOL:
        //		break;
        //	case gl.INT:
        //		break;
        //	case gl.FLOAT:
        //		break;
        //	case gl.FLOAT_MAT3:
        //		break;
        case gl.FLOAT_MAT4: {
            const floatsPerMatrix = 16;
            const matrixData = new Float32Array(instanceCount * floatsPerMatrix);
            const matrices = [];
            for (let i = 0; i < instanceCount; ++i) {
                const byteOffsetToMatrix = i * floatsPerMatrix * 4;
                let matrix = new p5.Matrix(this._renderer._pInst);
                // The p5.Matrix constructor won't work because it copies its input unless
                // it is a normal Array.
                matrix.set(new Float32Array(matrixData.buffer, byteOffsetToMatrix, floatsPerMatrix));
                // Initialize each matrix to be the identity matrix
                // [1, 0, 0, 0,
                //  0, 1, 0, 0,
                //  0, 0, 1, 0,
                //  0, 0, 0, 1]
                matrix.mat4[0] = 1;
                matrix.mat4[5] = 1;
                matrix.mat4[10] = 1;
                matrix.mat4[15] = 1;
                matrices.push(matrix);
            }
            attribute.isInstanced = true;
            attribute.arrayData = matrixData;
            attribute.buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, attribute.buffer);
            // just allocate the buffer
            gl.bufferData(gl.ARRAY_BUFFER, matrixData.byteLength, options && options.dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW);
            return matrices;
        }
        //	case gl.FLOAT_VEC2:
        //		break;
        //	case gl.FLOAT_VEC3:
        //		break;
        case gl.FLOAT_VEC4: {
            const floatsPerVector = 4;
            attribute.isInstanced = true;
            attribute.buffer = gl.createBuffer();
            attribute.arrayData = new Float32Array(instanceCount * floatsPerVector);
            gl.bindBuffer(gl.ARRAY_BUFFER, attribute.buffer);
            gl.bufferData(gl.ARRAY_BUFFER, attribute.arrayData.byteLength, gl.DYNAMIC_DRAW // options && options.dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW
            );
            // Unfortunately p5.Vector doesn't support wrapping a typed array in the same way p5.Matrix does
            return attribute.arrayData;
        }
        //	case gl.INT_VEC2:
        //		break;
        //	case gl.INT_VEC3:
        //		break;
        //	case gl.INT_VEC4:
        //		break;
        default:
            throw new Error(`Unsupported instanced attribute type: ${attribute.type}`);
    }
};
p5.RendererGL.prototype._drawElements = function (drawMode, gId) {
    const fillShader = this._getRetainedFillShader();
    const buffers = this.retainedMode.geometry[gId];
    const gl = this.GL;
    if (fillShader._instanceCount > 0) {
        // bind array buffers for relevant instanced attributes
        for (const attributeName of Object.getOwnPropertyNames(fillShader.attributes)) {
            const attribute = fillShader.attributes[attributeName];
            if (attribute.isInstanced) {
                const location = attribute.location;
                switch (attribute.type) {
                    //	case gl.BOOL:
                    //		break;
                    //	case gl.INT:
                    //		break;
                    //	case gl.FLOAT:
                    //		break;
                    //	case gl.FLOAT_MAT3:
                    //		break;
                    case gl.FLOAT_MAT4: {
                        const bytesPerRow = 16; // 4 floats per row, 4 bytes per float
                        // upload the new matrix data
                        gl.bindBuffer(gl.ARRAY_BUFFER, attribute.buffer);
                        gl.bufferData(gl.ARRAY_BUFFER, attribute.arrayData, gl.DYNAMIC_DRAW);
                        // Matrix attributes actually use 4 separate attribute pointers, one per
                        // row of the matrix, so we have to set the location of each of these.
                        const bytesPerMatrix = 4 * bytesPerRow;
                        for (let i = 0; i < 4; i++) {
                            const loc = location + i;
                            gl.enableVertexAttribArray(loc);
                            gl.vertexAttribPointer(loc, // location
                            4, // size (the number of positions in the array to advance per instance)
                            gl.FLOAT, // type of data in buffer
                            false, // normalize
                            bytesPerMatrix, // stride (the number of bytes to advance to get to next set of values)
                            i * bytesPerRow // offset in buffer
                            );
                            // this line says this attribute only changes for each 1 instance
                            gl.vertexAttribDivisor(loc, 1);
                        }
                        break;
                    }
                    //	case gl.FLOAT_VEC2:
                    //		break;
                    //	case gl.FLOAT_VEC3:
                    //		break;
                    case gl.FLOAT_VEC4: {
                        gl.bindBuffer(gl.ARRAY_BUFFER, attribute.buffer);
                        gl.bufferSubData(gl.ARRAY_BUFFER, 0, attribute.arrayData);
                        gl.enableVertexAttribArray(location);
                        gl.vertexAttribPointer(location, 4, gl.FLOAT, false, 0, 0);
                        // this line says this attribute only changes for each 1 instance
                        gl.vertexAttribDivisor(location, 1);
                        break;
                    }
                    //	case gl.INT_VEC2:
                    //		break;
                    //	case gl.INT_VEC3:
                    //		break;
                    //	case gl.INT_VEC4:
                    //		break;
                }
            }
        }
        // render the fill
        if (buffers.indexBuffer) {
            // we're drawing faces
            gl.drawElementsInstanced(gl.TRIANGLES, buffers.vertexCount, gl.UNSIGNED_SHORT, 0, fillShader._instanceCount);
        }
        else {
            // drawing vertices
            gl.drawArraysInstanced(drawMode || gl.TRIANGLES, 0, buffers.vertexCount, fillShader._instanceCount);
        }
    }
    else {
        // render the fill
        if (buffers.indexBuffer) {
            // we're drawing faces
            gl.drawElements(gl.TRIANGLES, buffers.vertexCount, gl.UNSIGNED_SHORT, 0);
        }
        else {
            // drawing vertices
            gl.drawArrays(drawMode || gl.TRIANGLES, 0, buffers.vertexCount);
        }
    }
};
window.testVert = `
precision highp float;
precision highp int;

uniform mat4 uViewMatrix;

uniform bool uUseLighting;

uniform int uAmbientLightCount;
uniform vec3 uAmbientColor[5];

uniform int uDirectionalLightCount;
uniform vec3 uLightingDirection[5];
uniform vec3 uDirectionalDiffuseColors[5];
uniform vec3 uDirectionalSpecularColors[5];

uniform int uPointLightCount;
uniform vec3 uPointLightLocation[5];
uniform vec3 uPointLightDiffuseColors[5];	
uniform vec3 uPointLightSpecularColors[5];

uniform int uSpotLightCount;
uniform float uSpotLightAngle[5];
uniform float uSpotLightConc[5];
uniform vec3 uSpotLightDiffuseColors[5];
uniform vec3 uSpotLightSpecularColors[5];
uniform vec3 uSpotLightLocation[5];
uniform vec3 uSpotLightDirection[5];

uniform bool uSpecular;
uniform float uShininess;

uniform float uConstantAttenuation;
uniform float uLinearAttenuation;
uniform float uQuadraticAttenuation;

const float specularFactor = 2.0;
const float diffuseFactor = 0.73;

struct LightResult {
  float specular;
  float diffuse;
};

float _phongSpecular(
  vec3 lightDirection,
  vec3 viewDirection,
  vec3 surfaceNormal,
  float shininess) {

  vec3 R = reflect(lightDirection, surfaceNormal);
  return pow(max(0.0, dot(R, viewDirection)), shininess);
}

float _lambertDiffuse(vec3 lightDirection, vec3 surfaceNormal) {
  return max(0.0, dot(-lightDirection, surfaceNormal));
}

LightResult _light(vec3 viewDirection, vec3 normal, vec3 lightVector) {

  vec3 lightDir = normalize(lightVector);

  //compute our diffuse & specular terms
  LightResult lr;
  if (uSpecular)
    lr.specular = _phongSpecular(lightDir, viewDirection, normal, uShininess);
  lr.diffuse = _lambertDiffuse(lightDir, normal);
  return lr;
}

void totalLight(
  vec3 modelPosition,
  vec3 normal,
  out vec3 totalDiffuse,
  out vec3 totalSpecular
) {

  totalSpecular = vec3(0.0);

  if (!uUseLighting) {
    totalDiffuse = vec3(1.0);
    return;
  }

  totalDiffuse = vec3(0.0);

  vec3 viewDirection = normalize(-modelPosition);

  for (int j = 0; j < 5; j++) {
    if (j < uDirectionalLightCount) {
      vec3 lightVector = (uViewMatrix * vec4(uLightingDirection[j], 0.0)).xyz;
      vec3 lightColor = uDirectionalDiffuseColors[j];
      vec3 specularColor = uDirectionalSpecularColors[j];
      LightResult result = _light(viewDirection, normal, lightVector);
      totalDiffuse += result.diffuse * lightColor;
      totalSpecular += result.specular * lightColor * specularColor;
    }

    if (j < uPointLightCount) {
      vec3 lightPosition = (uViewMatrix * vec4(uPointLightLocation[j], 1.0)).xyz;
      vec3 lightVector = modelPosition - lightPosition;
    
      //calculate attenuation
      float lightDistance = length(lightVector);
      float lightFalloff = 1.0 / (uConstantAttenuation + lightDistance * uLinearAttenuation + (lightDistance * lightDistance) * uQuadraticAttenuation);
      vec3 lightColor = lightFalloff * uPointLightDiffuseColors[j];
      vec3 specularColor = lightFalloff * uPointLightSpecularColors[j];

      LightResult result = _light(viewDirection, normal, lightVector);
      totalDiffuse += result.diffuse * lightColor;
      totalSpecular += result.specular * lightColor * specularColor;
    }

    if(j < uSpotLightCount) {
      vec3 lightPosition = (uViewMatrix * vec4(uSpotLightLocation[j], 1.0)).xyz;
      vec3 lightVector = modelPosition - lightPosition;
    
      float lightDistance = length(lightVector);
      float lightFalloff = 1.0 / (uConstantAttenuation + lightDistance * uLinearAttenuation + (lightDistance * lightDistance) * uQuadraticAttenuation);

      vec3 lightDirection = (uViewMatrix * vec4(uSpotLightDirection[j], 0.0)).xyz;
      float spotDot = dot(normalize(lightVector), normalize(lightDirection));
      float spotFalloff;
      if(spotDot < uSpotLightAngle[j]) {
        spotFalloff = 0.0;
      }
      else {
        spotFalloff = pow(spotDot, uSpotLightConc[j]);
      }
      lightFalloff *= spotFalloff;

      vec3 lightColor = uSpotLightDiffuseColors[j];
      vec3 specularColor = uSpotLightSpecularColors[j];
     
      LightResult result = _light(viewDirection, normal, lightVector);
      
      totalDiffuse += result.diffuse * lightColor * lightFalloff;
      totalSpecular += result.specular * lightColor * specularColor * lightFalloff;
    }
  }

  totalDiffuse *= diffuseFactor;
  totalSpecular *= specularFactor;
}

// include lighting.glsl

attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec2 aTexCoord;

attribute mat4 aWorldMatrix;
attribute vec4 aMaterialColor;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 uNormalMatrix;

varying vec4 vMaterialColor;
varying vec3 vDiffuseColor;
varying vec3 vSpecularColor;
varying vec2 vTexCoord;

void main(void) {
  vMaterialColor = aMaterialColor;
  vTexCoord = aTexCoord;
	
  vec4 viewModelPosition = uModelViewMatrix * (aWorldMatrix * vec4(aPosition, 1.0));
  gl_Position = uProjectionMatrix * viewModelPosition;

  vec3 vertexNormal = normalize(uNormalMatrix * aNormal);

  totalLight(viewModelPosition.xyz, vertexNormal, vDiffuseColor, vSpecularColor);

  for (int i = 0; i < 8; i++) {
    if (i < uAmbientLightCount) {
      vDiffuseColor += uAmbientColor[i];
    }
  }
}
`;
var webgl2CompatibilityShader = '#ifdef WEBGL2\n\n#define IN in\n#define OUT out\n\n#ifdef FRAGMENT_SHADER\nout vec4 outColor;\n#define OUT_COLOR outColor\n#endif\n#define TEXTURE texture\n\n#else\n\n#ifdef FRAGMENT_SHADER\n#define IN varying\n#else\n#define IN attribute\n#endif\n#define OUT varying\n#define TEXTURE texture2D\n\n#ifdef FRAGMENT_SHADER\n#define OUT_COLOR gl_FragColor\n#endif\n\n#endif\n';
window.testFrag = `
precision highp float;

// uniform vec4 uMaterialColor;
uniform sampler2D uTexture;
uniform bool useTexture;

varying vec2 vTexCoord;

varying vec4 vMaterialColor;
varying vec3 vDiffuseColor;
varying vec3 vSpecularColor;

void main(void) {
    if(useTexture) {
    gl_FragColor = texture2D(uTexture, vTexCoord);
    }else {
        gl_FragColor = vMaterialColor; // vec4(1., 1., 1., 1.); // ;
        gl_FragColor.rgb = gl_FragColor.rgb * vDiffuseColor + vSpecularColor;
        }
	// naive grayscale, just checking if this is working
	// float avg = (gl_FragColor.r + gl_FragColor.g + gl_FragColor.b) / 3.0;
	// gl_FragColor.rgb = vec3(avg, avg, avg);
}`;
