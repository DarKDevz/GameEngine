let allColliders = {};
let hasUpdated = true;
var handler;
handler = {
    prototype: {}
};

let cache = {};
self.addEventListener('message', function (e) {
    let packet = e.data;
    switch (String(packet.type).toUpperCase()) {
        case "UPDATE":
            let oldColliders = allColliders;
            allColliders = packet.value;
            if (JSON.stringify(oldColliders) !== JSON.stringify(allColliders)) {
                let oldValues = Object.values(oldColliders);
                let newValues = Object.values(allColliders);
                //we keep only the values that old has and new has too
                //so we can still change the cache in a smart way
                newValues = newValues.splice(0, oldValues.length);
                if (JSON.stringify(newValues) === JSON.stringify(oldValues)) {
                    //Length has changed
                    //Removed or Added?
                    let realLength = Object.getOwnPropertyNames(allColliders).length;
                    let lengthChange = Object.getOwnPropertyNames(allColliders).length - Object.getOwnPropertyNames(oldColliders).length;
                    console.log("Added new object");
                    for (let newI = oldValues.length; newI < realLength; newI++) {
                        checkForIndex(Object.getOwnPropertyNames(allColliders)[newI]);
                    }
                }
                else {
                    for (let uuid in oldColliders) {
                        if (allColliders.hasOwnProperty(uuid)) {
                            if (JSON.stringify(allColliders[uuid]) !== JSON.stringify(oldColliders[uuid])) {
                                checkForIndex(uuid);
                            }
                        }
                        else {
                            //Deleted element so remove old collided objects
                            if(cache[uuid]) {
                            for(let uuid2 in cache[uuid]) {
                                delete cache[uuid2][uuid]
                            }
                            delete cache[uuid];
                        }
                    }
                    }
                }
            }
            else {
                //console.log(cache)
            }
            break;
        case "CHECK":
            let uuid1 = packet.value[0];
            let uuid2 = packet.value[1];
            self.postMessage({ type: "cacheGet", value: checkCache(uuid1, uuid2) });
            break;
        case "GETCACHE":
            self.postMessage({ type: "cache", value: cache });
            break;
        case "CHECKALL":
            checkAll();
            hasUpdated = false;
            self.postMessage(cache);
            break;
        case "RAYCAST":
            break;
        case "LOGALL":
            console.log(cache);
            break;
    }
});
function checkCache(uuid1, uuid2) {
    if (cache.hasOwnProperty(uuid1) && cache.hasOwnProperty(uuid2)) {
        if (cache[uuid1].hasOwnProperty(uuid2) && cache[uuid2].hasOwnProperty(uuid1)) {
            return cache[uuid1][uuid2] && cache[uuid2][uuid1];
        }
    }
    return undefined;
}
function addCache(uuid1, uuid2, value) {
    cache[uuid1] ??= {};
    cache[uuid1][uuid2] = value;
    cache[uuid2] ??= {};
    cache[uuid2][uuid1] = value;
    if(!value) {
        delete cache[uuid1][uuid2]
        delete cache[uuid2][uuid1]
    }
    if (value) {
        //console.log(uuid1,uuid2);
    }
    return value;
}
function checkAll() {
    for (let uuid1 in allColliders) {
        checkForIndex(uuid1);
    }
}
function checkForIndex(uuid1) {
    for (let uuid2 in allColliders) {
        if (uuid1 !== uuid2) {
            checkUUID(uuid1, uuid2);
        }
    }
}
function checkUUID(uuid1, uuid2) {
        let collider1 = allColliders[uuid1];
        let collider2 = allColliders[uuid2];
        return addCache(uuid1, uuid2, checkCollider(collider1, collider2));
}
function checkCollider(c1, c2) {
    let t1 = c1[0];
    let t2 = c2[0];
    return testCollision(t1, t2, c1, c2, true);
}
function testCollision(type1, type2, values1, values2, isVector) {
    let test = handler.prototype["collide" + type1 + type2 + (isVector ? 'Vector' : '')];
    if (typeof test === "function") {
        return (test(...values1[1], ...values2[1]));
    }
    else {
        let test = handler.prototype["collide" + type2 + type1 + (isVector ? 'Vector' : '')];
        if (typeof test === "function") {
            return (test(...values2[1], ...values1[1]));
        }
        else {
            console.log(Array.from(arguments));
        }
    }
}
//Distance Function because handler.collide uses it
function hypot(x, y, z?) {
    // Use the native implementation if it's available
    if (typeof Math.hypot === 'function') {
      return Math.hypot.apply(null, arguments);
    } // Otherwise use the V8 implementation
    // https://github.com/v8/v8/blob/8cd3cf297287e581a49e487067f5cbd991b27123/src/js/math.js#L217

    var length = arguments.length;
    var args = [
    ];
    var max = 0;
    for (var i = 0; i < length; i++) {
      var n = arguments[i];
      n = + n;
      if (n === Infinity || n === - Infinity) {
        return Infinity;
      }
      n = Math.abs(n);
      if (n > max) {
        max = n;
      }
      args[i] = n;
    }
    if (max === 0) {
      max = 1;
    }
    var sum = 0;
    var compensation = 0;
    for (var j = 0; j < length; j++) {
      var m = args[j] / max;
      var summand = m * m - compensation;
      var preliminary = sum + summand;
      compensation = preliminary - sum - summand;
      sum = preliminary;
    }
    return Math.sqrt(sum) * max;
  }
handler.prototype.dist = function () {
      return hypot(arguments[2] - arguments[0], arguments[3] - arguments[1]);
  };
console.log("### handler.collide v0.7.3 ###"), handler.prototype._collideDebug = !1, handler.prototype.collideDebug = function (t) { var _collideDebug = t; }, handler.prototype.collideRectRect = function (t, o, e, i, r, l, n, c) { return t + e >= r && t <= r + n && o + i >= l && o <= l + c; }, handler.prototype.collideRectRectVector = function (t, o, e, i) { return handler.prototype.collideRectRect(t.x, t.y, o.x, o.y, e.x, e.y, i.x, i.y); }, handler.prototype.collideRectCircle = function (t, o, e, i, r, l, n) { var c = r, p = l; return r < t ? c = t : r > t + e && (c = t + e), l < o ? p = o : l > o + i && (p = o + i), this.dist(r, l, c, p) <= n / 2; }, handler.prototype.collideRectCircleVector = function (t, o, e, i) { return handler.prototype.collideRectCircle(t.x, t.y, o.x, o.y, e.x, e.y, i); }, handler.prototype.collideCircleCircle = function (t, o, e, i, r, l) { return this.dist(t, o, i, r) <= e / 2 + l / 2; }, handler.prototype.collideCircleCircleVector = function (t, o, e, i) { return handler.prototype.collideCircleCircle(t.x, t.y, o, e.x, e.y, i); }, handler.prototype.collidePointCircle = function (t, o, e, i, r) { return this.dist(t, o, e, i) <= r / 2; }, handler.prototype.collidePointCircleVector = function (t, o, e) { return handler.prototype.collidePointCircle(t.x, t.y, o.x, o.y, e); }, handler.prototype.collidePointEllipse = function (t, o, e, i, r, l) { var n = r / 2, c = l / 2; if (t > e + n || t < e - n || o > i + c || o < i - c)
    return !1; var p = t - e, y = o - i, d = c * this.sqrt(this.abs(n * n - p * p)) / n; return y <= d && y >= -d; }, handler.prototype.collidePointEllipseVector = function (t, o, e) { return handler.prototype.collidePointEllipse(t.x, t.y, o.x, o.y, e.x, e.y); }, handler.prototype.collidePointRect = function (t, o, e, i, r, l) { return t >= e && t <= e + r && o >= i && o <= i + l; }, handler.prototype.collidePointRectVector = function (t, o, e) { return handler.prototype.collidePointRect(t.x, t.y, o.x, o.y, e.x, e.y); }, handler.prototype.collidePointLine = function (t, o, e, i, r, l, n) { var c = this.dist(t, o, e, i), p = this.dist(t, o, r, l), y = this.dist(e, i, r, l); return void 0 === n && (n = .1), c + p >= y - n && c + p <= y + n; }, handler.prototype.collidePointLineVector = function (t, o, e, i) { return handler.prototype.collidePointLine(t.x, t.y, o.x, o.y, e.x, e.y, i); }, handler.prototype.collideLineCircle = function (t, o, e, i, r, l, n) { var c = this.collidePointCircle(t, o, r, l, n), p = this.collidePointCircle(e, i, r, l, n); if (c || p)
    return !0; var y = t - e, d = o - i, u = this.sqrt(y * y + d * d), s = ((r - t) * (e - t) + (l - o) * (i - o)) / this.pow(u, 2), x = t + s * (e - t), f = o + s * (i - o); return !!this.collidePointLine(x, f, t, o, e, i) && (this._collideDebug && this.ellipse(x, f, 10, 10), y = x - r, d = f - l, this.sqrt(y * y + d * d) <= n / 2); }, handler.prototype.collideLineCircleVector = function (t, o, e, i) { return handler.prototype.collideLineCircle(t.x, t.y, o.x, o.y, e.x, e.y, i); }, handler.prototype.collideLineLine = function (t, o, e, i, r, l, n, c, p) { var y = ((n - r) * (o - l) - (c - l) * (t - r)) / ((c - l) * (e - t) - (n - r) * (i - o)), d = ((e - t) * (o - l) - (i - o) * (t - r)) / ((c - l) * (e - t) - (n - r) * (i - o)); if (y >= 0 && y <= 1 && d >= 0 && d <= 1) {
    if (this._collideDebug || p)
        var u = t + y * (e - t), s = o + y * (i - o);
    return this._collideDebug && this.ellipse(u, s, 10, 10), !p || { x: u, y: s };
} return !!p && { x: !1, y: !1 }; }, handler.prototype.collideLineLineVector = function (t, o, e, i, r) { return handler.prototype.collideLineLine(t.x, t.y, o.x, o.y, e.x, e.y, i.x, i.y, r); }, handler.prototype.collideLineRect = function (t, o, e, i, r, l, n, c, p) { var y, d, u, s, x; return p ? x = { left: y = this.collideLineLine(t, o, e, i, r, l, r, l + c, !0), right: d = this.collideLineLine(t, o, e, i, r + n, l, r + n, l + c, !0), top: u = this.collideLineLine(t, o, e, i, r, l, r + n, l, !0), bottom: s = this.collideLineLine(t, o, e, i, r, l + c, r + n, l + c, !0) } : (y = this.collideLineLine(t, o, e, i, r, l, r, l + c), d = this.collideLineLine(t, o, e, i, r + n, l, r + n, l + c), u = this.collideLineLine(t, o, e, i, r, l, r + n, l), s = this.collideLineLine(t, o, e, i, r, l + c, r + n, l + c)), !!(y || d || u || s) && (!p || x); }, handler.prototype.collideLineRectVector = function (t, o, e, i, r) { return handler.prototype.collideLineRect(t.x, t.y, o.x, o.y, e.x, e.y, i.x, i.y, r); }, handler.prototype.collidePointPoly = function (t, o, e) { for (var i = !1, r = 0, l = 0; l < e.length; l++) {
    (r = l + 1) === e.length && (r = 0);
    var n = e[l], c = e[r];
    (n.y >= o && c.y < o || n.y < o && c.y >= o) && t < (c.x - n.x) * (o - n.y) / (c.y - n.y) + n.x && (i = !i);
} return i; }, handler.prototype.collidePointPolyVector = function (t, o) { return handler.prototype.collidePointPoly(t.x, t.y, o); }, handler.prototype.collideCirclePoly = function (t, o, e, i, r) { void 0 === r && (r = !1); for (var l = 0, n = 0; n < i.length; n++) {
    (l = n + 1) === i.length && (l = 0);
    var c = i[n], p = i[l];
    if (this.collideLineCircle(c.x, c.y, p.x, p.y, t, o, e))
        return !0;
} if (!0 === r && this.collidePointPoly(t, o, i))
    return !0; return !1; }, handler.prototype.collideCirclePolyVector = function (t, o, e, i) { return handler.prototype.collideCirclePoly(t.x, t.y, o, e, i); }, handler.prototype.collideRectPoly = function (t, o, e, i, r, l) { null == l && (l = !1); for (var n = 0, c = 0; c < r.length; c++) {
    (n = c + 1) === r.length && (n = 0);
    var p = r[c], y = r[n];
    if (this.collideLineRect(p.x, p.y, y.x, y.y, t, o, e, i))
        return !0;
    if (!0 === l)
        if (this.collidePointPoly(t, o, r))
            return !0;
} return !1; }, handler.prototype.collideRectPolyVector = function (t, o, e, i) { return handler.prototype.collideRectPoly(t.x, t.y, o.x, o.y, e, i); }, handler.prototype.collideLinePoly = function (t, o, e, i, r) { for (var l = 0, n = 0; n < r.length; n++) {
    (l = n + 1) === r.length && (l = 0);
    var c = r[n].x, p = r[n].y, y = r[l].x, d = r[l].y;
    if (this.collideLineLine(t, o, e, i, c, p, y, d))
        return !0;
} return !1; }, handler.prototype.collideLinePolyVector = function (t, o, e) { return handler.prototype.collideLinePoly(t.x, t.y, o.x, o.y, e); }, handler.prototype.collidePolyPoly = function (t, o, e) { void 0 === e && (e = !1); for (var i = 0, r = 0; r < t.length; r++) {
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
} return !1; }, handler.prototype.collidePolyPolyVector = function (t, o, e) { return handler.prototype.collidePolyPoly(t, o, e); }, handler.prototype.collidePointTriangle = function (t, o, e, i, r, l, n, c) { var p = this.abs((r - e) * (c - i) - (n - e) * (l - i)); return this.abs((e - t) * (l - o) - (r - t) * (i - o)) + this.abs((r - t) * (c - o) - (n - t) * (l - o)) + this.abs((n - t) * (i - o) - (e - t) * (c - o)) === p; }, handler.prototype.collidePointTriangleVector = function (t, o, e, i) { return handler.prototype.collidePointTriangle(t.x, t.y, o.x, o.y, e.x, e.y, i.x, i.y); }, handler.prototype.collidePointPoint = function (t, o, e, i, r) { return void 0 === r && (r = 0), this.dist(t, o, e, i) <= r; }, handler.prototype.collidePointPointVector = function (t, o, e) { return handler.prototype.collidePointPoint(t.x, t.y, o.x, o.y, e); }, handler.prototype.collidePointArc = function (t, o, e, i, r, l, n, c) { void 0 === c && (c = 0); var p = this.createVector(t, o), y = this.createVector(e, i), d = this.createVector(r, 0).rotate(l), u = p.copy().sub(y); if (p.dist(y) <= r + c) {
    var s = d.dot(u), x = d.angleBetween(u);
    if (s > 0 && x <= n / 2 && x >= -n / 2)
        return !0;
} return !1; }, handler.prototype.collidePointArcVector = function (t, o, e, i, r, l) { return handler.prototype.collidePointArc(t.x, t.y, o.x, o.y, e, i, r, l); };
