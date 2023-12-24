(function(modules) {
  var installedModules = {};
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    module.l = true;
    return module.exports;
  }
  __webpack_require__.m = modules;
  __webpack_require__.c = installedModules;
  __webpack_require__.d = function(exports, name2, getter) {
    if (!__webpack_require__.o(exports, name2)) {
      Object.defineProperty(exports, name2, { enumerable: true, get: getter });
    }
  };
  __webpack_require__.r = function(exports) {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    }
    Object.defineProperty(exports, "__esModule", { value: true });
  };
  __webpack_require__.t = function(value, mode) {
    if (mode & 1)
      value = __webpack_require__(value);
    if (mode & 8)
      return value;
    if (mode & 4 && typeof value === "object" && value && value.__esModule)
      return value;
    var ns = /* @__PURE__ */ Object.create(null);
    __webpack_require__.r(ns);
    Object.defineProperty(ns, "default", { enumerable: true, value });
    if (mode & 2 && typeof value != "string")
      for (var key in value)
        __webpack_require__.d(ns, key, function(key2) {
          return value[key2];
        }.bind(null, key));
    return ns;
  };
  __webpack_require__.n = function(module) {
    var getter = module && module.__esModule ? function getDefault() {
      return module["default"];
    } : function getModuleExports() {
      return module;
    };
    __webpack_require__.d(getter, "a", getter);
    return getter;
  };
  __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  __webpack_require__.p = "";
  return __webpack_require__(__webpack_require__.s = 40);
})([
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
      "use strict";
      function a(t, e2) {
        this.isUndef(t) || 1 === t ? this.input = this.context.createGain() : 1 < t && (this.input = new Array(t)), this.isUndef(e2) || 1 === e2 ? this.output = this.context.createGain() : 1 < e2 && (this.output = new Array(t));
      }
      var e;
      return a.prototype.set = function(t, e2, n) {
        if (this.isObject(t))
          n = e2;
        else if (this.isString(t)) {
          var o = {};
          o[t] = e2, t = o;
        }
        t:
          for (var i in t) {
            e2 = t[i];
            var r = this;
            if (-1 !== i.indexOf(".")) {
              for (var s = i.split("."), u = 0; u < s.length - 1; u++)
                if ((r = r[s[u]]) instanceof a) {
                  s.splice(0, u + 1);
                  var p = s.join(".");
                  r.set(p, e2);
                  continue t;
                }
              i = s[s.length - 1];
            }
            var c = r[i];
            this.isUndef(c) || (a.Signal && c instanceof a.Signal || a.Param && c instanceof a.Param ? c.value !== e2 && (this.isUndef(n) ? c.value = e2 : c.rampTo(e2, n)) : c instanceof AudioParam ? c.value !== e2 && (c.value = e2) : c instanceof a ? c.set(e2) : c !== e2 && (r[i] = e2));
          }
        return this;
      }, a.prototype.get = function(t) {
        this.isUndef(t) ? t = this._collectDefaults(this.constructor) : this.isString(t) && (t = [t]);
        for (var e2 = {}, n = 0; n < t.length; n++) {
          var o = t[n], i = this, r = e2;
          if (-1 !== o.indexOf(".")) {
            for (var s = o.split("."), u = 0; u < s.length - 1; u++) {
              var p = s[u];
              r[p] = r[p] || {}, r = r[p], i = i[p];
            }
            o = s[s.length - 1];
          }
          var c = i[o];
          this.isObject(t[o]) ? r[o] = c.get() : a.Signal && c instanceof a.Signal ? r[o] = c.value : a.Param && c instanceof a.Param ? r[o] = c.value : c instanceof AudioParam ? r[o] = c.value : c instanceof a ? r[o] = c.get() : this.isFunction(c) || this.isUndef(c) || (r[o] = c);
        }
        return e2;
      }, a.prototype._collectDefaults = function(t) {
        var e2 = [];
        if (this.isUndef(t.defaults) || (e2 = Object.keys(t.defaults)), !this.isUndef(t._super))
          for (var n = this._collectDefaults(t._super), o = 0; o < n.length; o++)
            -1 === e2.indexOf(n[o]) && e2.push(n[o]);
        return e2;
      }, a.prototype.toString = function() {
        for (var t in a) {
          var e2 = t[0].match(/^[A-Z]$/), n = a[t] === this.constructor;
          if (this.isFunction(a[t]) && e2 && n)
            return t;
        }
        return "Tone";
      }, Object.defineProperty(a.prototype, "numberOfInputs", { get: function() {
        return this.input ? this.isArray(this.input) ? this.input.length : 1 : 0;
      } }), Object.defineProperty(a.prototype, "numberOfOutputs", { get: function() {
        return this.output ? this.isArray(this.output) ? this.output.length : 1 : 0;
      } }), a.prototype.dispose = function() {
        return this.isUndef(this.input) || (this.input instanceof AudioNode && this.input.disconnect(), this.input = null), this.isUndef(this.output) || (this.output instanceof AudioNode && this.output.disconnect(), this.output = null), this;
      }, a.prototype.connect = function(t, e2, n) {
        return Array.isArray(this.output) ? (e2 = this.defaultArg(e2, 0), this.output[e2].connect(t, 0, n)) : this.output.connect(t, e2, n), this;
      }, a.prototype.disconnect = function(t, e2, n) {
        this.isArray(this.output) ? this.isNumber(t) ? this.output[t].disconnect() : (e2 = this.defaultArg(e2, 0), this.output[e2].disconnect(t, 0, n)) : this.output.disconnect.apply(this.output, arguments);
      }, a.prototype.connectSeries = function() {
        if (1 < arguments.length)
          for (var t = arguments[0], e2 = 1; e2 < arguments.length; e2++) {
            var n = arguments[e2];
            t.connect(n), t = n;
          }
        return this;
      }, a.prototype.chain = function() {
        if (0 < arguments.length)
          for (var t = this, e2 = 0; e2 < arguments.length; e2++) {
            var n = arguments[e2];
            t.connect(n), t = n;
          }
        return this;
      }, a.prototype.fan = function() {
        if (0 < arguments.length)
          for (var t = 0; t < arguments.length; t++)
            this.connect(arguments[t]);
        return this;
      }, AudioNode.prototype.chain = a.prototype.chain, AudioNode.prototype.fan = a.prototype.fan, a.prototype.defaultArg = function(t, e2) {
        if (this.isObject(t) && this.isObject(e2)) {
          var n = {};
          for (var o in t)
            n[o] = this.defaultArg(e2[o], t[o]);
          for (var i in e2)
            n[i] = this.defaultArg(t[i], e2[i]);
          return n;
        }
        return this.isUndef(t) ? e2 : t;
      }, a.prototype.optionsObject = function(t, e2, n) {
        var o = {};
        if (1 === t.length && this.isObject(t[0]))
          o = t[0];
        else
          for (var i = 0; i < e2.length; i++)
            o[e2[i]] = t[i];
        return this.isUndef(n) ? o : this.defaultArg(o, n);
      }, a.prototype.isUndef = function(t) {
        return void 0 === t;
      }, a.prototype.isFunction = function(t) {
        return "function" == typeof t;
      }, a.prototype.isNumber = function(t) {
        return "number" == typeof t;
      }, a.prototype.isObject = function(t) {
        return "[object Object]" === Object.prototype.toString.call(t) && t.constructor === Object;
      }, a.prototype.isBoolean = function(t) {
        return "boolean" == typeof t;
      }, a.prototype.isArray = function(t) {
        return Array.isArray(t);
      }, a.prototype.isString = function(t) {
        return "string" == typeof t;
      }, a.noOp = function() {
      }, a.prototype._readOnly = function(t) {
        if (Array.isArray(t))
          for (var e2 = 0; e2 < t.length; e2++)
            this._readOnly(t[e2]);
        else
          Object.defineProperty(this, t, { writable: false, enumerable: true });
      }, a.prototype._writable = function(t) {
        if (Array.isArray(t))
          for (var e2 = 0; e2 < t.length; e2++)
            this._writable(t[e2]);
        else
          Object.defineProperty(this, t, { writable: true });
      }, a.State = { Started: "started", Stopped: "stopped", Paused: "paused" }, a.prototype.equalPowerScale = function(t) {
        var e2 = 0.5 * Math.PI;
        return Math.sin(t * e2);
      }, a.prototype.dbToGain = function(t) {
        return Math.pow(2, t / 6);
      }, a.prototype.gainToDb = function(t) {
        return Math.log(t) / Math.LN10 * 20;
      }, a.prototype.intervalToFrequencyRatio = function(t) {
        return Math.pow(2, t / 12);
      }, a.prototype.now = function() {
        return a.context.now();
      }, a.now = function() {
        return a.context.now();
      }, a.extend = function(t, e2) {
        function n() {
        }
        a.prototype.isUndef(e2) && (e2 = a), n.prototype = e2.prototype, t.prototype = new n(), (t.prototype.constructor = t)._super = e2;
      }, Object.defineProperty(a, "context", { get: function() {
        return e;
      }, set: function(t) {
        e = a.Context && t instanceof a.Context ? t : new a.Context(t), a.Context && a.Context.emit("init", e);
      } }), Object.defineProperty(a.prototype, "context", { get: function() {
        return a.context;
      } }), a.setContext = function(t) {
        a.context = t;
      }, Object.defineProperty(a.prototype, "blockTime", { get: function() {
        return 128 / this.context.sampleRate;
      } }), Object.defineProperty(a.prototype, "sampleTime", { get: function() {
        return 1 / this.context.sampleRate;
      } }), Object.defineProperty(a, "supported", { get: function() {
        var t = window.hasOwnProperty("AudioContext") || window.hasOwnProperty("webkitAudioContext"), e2 = window.hasOwnProperty("Promise"), n = window.hasOwnProperty("Worker");
        return t && e2 && n;
      } }), a.version = "r10", window.TONE_SILENCE_VERSION_LOGGING || console.log("%c * Tone.js " + a.version + " * ", "background: #000; color: #fff"), a;
    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(2), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function(i) {
      "use strict";
      return i.Multiply = function(t) {
        this.createInsOuts(2, 0), this._mult = this.input[0] = this.output = new i.Gain(), this._param = this.input[1] = this.output.gain, this._param.value = this.defaultArg(t, 0);
      }, i.extend(i.Multiply, i.Signal), i.Multiply.prototype.dispose = function() {
        return i.prototype.dispose.call(this), this._mult.dispose(), this._mult = null, this._param = null, this;
      }, i.Multiply;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(6), __webpack_require__(9), __webpack_require__(18), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function(n) {
      "use strict";
      return n.Signal = function() {
        var t = this.optionsObject(arguments, ["value", "units"], n.Signal.defaults);
        this.output = this._gain = this.context.createGain(), t.param = this._gain.gain, n.Param.call(this, t), this.input = this._param = this._gain.gain, this.context.getConstant(1).chain(this._gain);
      }, n.extend(n.Signal, n.Param), n.Signal.defaults = { value: 0, units: n.Type.Default, convert: true }, n.Signal.prototype.connect = n.SignalBase.prototype.connect, n.Signal.prototype.dispose = function() {
        return n.Param.prototype.dispose.call(this), this._param = null, this._gain.disconnect(), this._gain = null, this;
      }, n.Signal;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(global) {
      __webpack_require__.d(__webpack_exports__, "b", function() {
        return getAudioContext;
      });
      __webpack_require__.d(__webpack_exports__, "c", function() {
        return userStartAudio;
      });
      var startaudiocontext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
      var startaudiocontext__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(startaudiocontext__WEBPACK_IMPORTED_MODULE_0__);
      var Tone_core_Tone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
      var Tone_core_Tone__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(Tone_core_Tone__WEBPACK_IMPORTED_MODULE_1__);
      var Tone_core_Context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
      var Tone_core_Context__WEBPACK_IMPORTED_MODULE_2___default = __webpack_require__.n(Tone_core_Context__WEBPACK_IMPORTED_MODULE_2__);
      global.TONE_SILENCE_VERSION_LOGGING = true;
      var audiocontext = new window.AudioContext();
      Tone_core_Tone__WEBPACK_IMPORTED_MODULE_1___default.a.setContext(audiocontext);
      function getAudioContext() {
        return audiocontext;
      }
      function userStartAudio(elements, callback) {
        var elt = elements;
        if (elements instanceof p5.Element) {
          elt = elements.elt;
        } else if (elements instanceof Array && elements[0] instanceof p5.Element) {
          elt = elements.map(function(e) {
            return e.elt;
          });
        }
        return startaudiocontext__WEBPACK_IMPORTED_MODULE_0___default()(audiocontext, elt, callback);
      }
      __webpack_exports__["a"] = audiocontext;
    }).call(this, __webpack_require__(26));
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(2), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function(i) {
      "use strict";
      return i.Add = function(t) {
        this.createInsOuts(2, 0), this._sum = this.input[0] = this.input[1] = this.output = new i.Gain(), this._param = this.input[1] = new i.Signal(t), this._param.connect(this._sum);
      }, i.extend(i.Add, i.Signal), i.Add.prototype.dispose = function() {
        return i.prototype.dispose.call(this), this._sum.dispose(), this._sum = null, this._param.dispose(), this._param = null, this;
      }, i.Add;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports) {
    module.exports = {
      recorderProcessor: "recorder-processor",
      soundFileProcessor: "sound-file-processor",
      amplitudeProcessor: "amplitude-processor"
    };
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(15)], __WEBPACK_AMD_DEFINE_RESULT__ = function(e) {
      "use strict";
      return e.WaveShaper = function(e2, t) {
        this._shaper = this.input = this.output = this.context.createWaveShaper(), this._curve = null, Array.isArray(e2) ? this.curve = e2 : isFinite(e2) || this.isUndef(e2) ? this._curve = new Float32Array(this.defaultArg(e2, 1024)) : this.isFunction(e2) && (this._curve = new Float32Array(this.defaultArg(t, 1024)), this.setMap(e2));
      }, e.extend(e.WaveShaper, e.SignalBase), e.WaveShaper.prototype.setMap = function(e2) {
        for (var t = 0, r = this._curve.length; t < r; t++) {
          var s = t / (r - 1) * 2 - 1;
          this._curve[t] = e2(s, t);
        }
        return this._shaper.curve = this._curve, this;
      }, Object.defineProperty(e.WaveShaper.prototype, "curve", { get: function() {
        return this._shaper.curve;
      }, set: function(e2) {
        this._curve = new Float32Array(e2), this._shaper.curve = this._curve;
      } }), Object.defineProperty(e.WaveShaper.prototype, "oversample", { get: function() {
        return this._shaper.oversample;
      }, set: function(e2) {
        if (-1 === ["none", "2x", "4x"].indexOf(e2))
          throw new RangeError("Tone.WaveShaper: oversampling must be either 'none', '2x', or '4x'");
        this._shaper.oversample = e2;
      } }), e.WaveShaper.prototype.dispose = function() {
        return e.prototype.dispose.call(this), this._shaper.disconnect(), this._shaper = null, this._curve = null, this;
      }, e.WaveShaper;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(2), __webpack_require__(19)], __WEBPACK_AMD_DEFINE_RESULT__ = function(o) {
      "use strict";
      return o.TimelineSignal = function() {
        var e = this.optionsObject(arguments, ["value", "units"], o.Signal.defaults);
        this._events = new o.Timeline(10), o.Signal.apply(this, e), e.param = this._param, o.Param.call(this, e), this._initial = this._fromUnits(this._param.value);
      }, o.extend(o.TimelineSignal, o.Param), o.TimelineSignal.Type = { Linear: "linear", Exponential: "exponential", Target: "target", Curve: "curve", Set: "set" }, Object.defineProperty(o.TimelineSignal.prototype, "value", { get: function() {
        var e = this.now(), t = this.getValueAtTime(e);
        return this._toUnits(t);
      }, set: function(e) {
        var t = this._fromUnits(e);
        this._initial = t, this.cancelScheduledValues(), this._param.value = t;
      } }), o.TimelineSignal.prototype.setValueAtTime = function(e, t) {
        return e = this._fromUnits(e), t = this.toSeconds(t), this._events.add({ type: o.TimelineSignal.Type.Set, value: e, time: t }), this._param.setValueAtTime(e, t), this;
      }, o.TimelineSignal.prototype.linearRampToValueAtTime = function(e, t) {
        return e = this._fromUnits(e), t = this.toSeconds(t), this._events.add({ type: o.TimelineSignal.Type.Linear, value: e, time: t }), this._param.linearRampToValueAtTime(e, t), this;
      }, o.TimelineSignal.prototype.exponentialRampToValueAtTime = function(e, t) {
        t = this.toSeconds(t);
        var i = this._searchBefore(t);
        i && 0 === i.value && this.setValueAtTime(this._minOutput, i.time), e = this._fromUnits(e);
        var n = Math.max(e, this._minOutput);
        return this._events.add({ type: o.TimelineSignal.Type.Exponential, value: n, time: t }), e < this._minOutput ? (this._param.exponentialRampToValueAtTime(this._minOutput, t - this.sampleTime), this.setValueAtTime(0, t)) : this._param.exponentialRampToValueAtTime(e, t), this;
      }, o.TimelineSignal.prototype.setTargetAtTime = function(e, t, i) {
        return e = this._fromUnits(e), e = Math.max(this._minOutput, e), i = Math.max(this._minOutput, i), t = this.toSeconds(t), this._events.add({ type: o.TimelineSignal.Type.Target, value: e, time: t, constant: i }), this._param.setTargetAtTime(e, t, i), this;
      }, o.TimelineSignal.prototype.setValueCurveAtTime = function(e, t, i, n) {
        n = this.defaultArg(n, 1);
        for (var a = new Array(e.length), l = 0; l < a.length; l++)
          a[l] = this._fromUnits(e[l]) * n;
        t = this.toSeconds(t), i = this.toSeconds(i), this._events.add({ type: o.TimelineSignal.Type.Curve, value: a, time: t, duration: i }), this._param.setValueAtTime(a[0], t);
        for (var s = 1; s < a.length; s++) {
          var r = t + s / (a.length - 1) * i;
          this._param.linearRampToValueAtTime(a[s], r);
        }
        return this;
      }, o.TimelineSignal.prototype.cancelScheduledValues = function(e) {
        return e = this.toSeconds(e), this._events.cancel(e), this._param.cancelScheduledValues(e), this;
      }, o.TimelineSignal.prototype.setRampPoint = function(e) {
        e = this.toSeconds(e);
        var t = this._toUnits(this.getValueAtTime(e)), i = this._searchBefore(e);
        if (i && i.time === e)
          this.cancelScheduledValues(e + this.sampleTime);
        else if (i && i.type === o.TimelineSignal.Type.Curve && i.time + i.duration > e)
          this.cancelScheduledValues(e), this.linearRampToValueAtTime(t, e);
        else {
          var n = this._searchAfter(e);
          n && (this.cancelScheduledValues(e), n.type === o.TimelineSignal.Type.Linear ? this.linearRampToValueAtTime(t, e) : n.type === o.TimelineSignal.Type.Exponential && this.exponentialRampToValueAtTime(t, e)), this.setValueAtTime(t, e);
        }
        return this;
      }, o.TimelineSignal.prototype.linearRampToValueBetween = function(e, t, i) {
        return this.setRampPoint(t), this.linearRampToValueAtTime(e, i), this;
      }, o.TimelineSignal.prototype.exponentialRampToValueBetween = function(e, t, i) {
        return this.setRampPoint(t), this.exponentialRampToValueAtTime(e, i), this;
      }, o.TimelineSignal.prototype._searchBefore = function(e) {
        return this._events.get(e);
      }, o.TimelineSignal.prototype._searchAfter = function(e) {
        return this._events.getAfter(e);
      }, o.TimelineSignal.prototype.getValueAtTime = function(e) {
        e = this.toSeconds(e);
        var t = this._searchAfter(e), i = this._searchBefore(e), n = this._initial;
        if (null === i)
          n = this._initial;
        else if (i.type === o.TimelineSignal.Type.Target) {
          var a, l = this._events.getBefore(i.time);
          a = null === l ? this._initial : l.value, n = this._exponentialApproach(i.time, a, i.value, i.constant, e);
        } else
          n = i.type === o.TimelineSignal.Type.Curve ? this._curveInterpolate(i.time, i.value, i.duration, e) : null === t ? i.value : t.type === o.TimelineSignal.Type.Linear ? this._linearInterpolate(i.time, i.value, t.time, t.value, e) : t.type === o.TimelineSignal.Type.Exponential ? this._exponentialInterpolate(i.time, i.value, t.time, t.value, e) : i.value;
        return n;
      }, o.TimelineSignal.prototype.connect = o.SignalBase.prototype.connect, o.TimelineSignal.prototype._exponentialApproach = function(e, t, i, n, a) {
        return i + (t - i) * Math.exp(-(a - e) / n);
      }, o.TimelineSignal.prototype._linearInterpolate = function(e, t, i, n, a) {
        return t + (a - e) / (i - e) * (n - t);
      }, o.TimelineSignal.prototype._exponentialInterpolate = function(e, t, i, n, a) {
        return (t = Math.max(this._minOutput, t)) * Math.pow(n / t, (a - e) / (i - e));
      }, o.TimelineSignal.prototype._curveInterpolate = function(e, t, i, n) {
        var a = t.length;
        if (e + i <= n)
          return t[a - 1];
        if (n <= e)
          return t[0];
        var l = (n - e) / i, s = Math.floor((a - 1) * l), r = Math.ceil((a - 1) * l), o2 = t[s], p = t[r];
        return r === s ? o2 : this._linearInterpolate(s, o2, r, p, l * (a - 1));
      }, o.TimelineSignal.prototype.dispose = function() {
        o.Signal.prototype.dispose.call(this), o.Param.prototype.dispose.call(this), this._events.dispose(), this._events = null;
      }, o.TimelineSignal;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(4), __webpack_require__(1), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(i) {
      "use strict";
      return i.Scale = function(t, e) {
        this._outputMin = this.defaultArg(t, 0), this._outputMax = this.defaultArg(e, 1), this._scale = this.input = new i.Multiply(1), this._add = this.output = new i.Add(0), this._scale.connect(this._add), this._setRange();
      }, i.extend(i.Scale, i.SignalBase), Object.defineProperty(i.Scale.prototype, "min", { get: function() {
        return this._outputMin;
      }, set: function(t) {
        this._outputMin = t, this._setRange();
      } }), Object.defineProperty(i.Scale.prototype, "max", { get: function() {
        return this._outputMax;
      }, set: function(t) {
        this._outputMax = t, this._setRange();
      } }), i.Scale.prototype._setRange = function() {
        this._add.value = this._outputMin, this._scale.value = this._outputMax - this._outputMin;
      }, i.Scale.prototype.dispose = function() {
        return i.prototype.dispose.call(this), this._add.dispose(), this._add = null, this._scale.dispose(), this._scale = null, this;
      }, i.Scale;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(16), __webpack_require__(30), __webpack_require__(31), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function(t) {
      return t.Type = { Default: "number", Time: "time", Frequency: "frequency", TransportTime: "transportTime", Ticks: "ticks", NormalRange: "normalRange", AudioRange: "audioRange", Decibels: "db", Interval: "interval", BPM: "bpm", Positive: "positive", Cents: "cents", Degrees: "degrees", MIDI: "midi", BarsBeatsSixteenths: "barsBeatsSixteenths", Samples: "samples", Hertz: "hertz", Note: "note", Milliseconds: "milliseconds", Seconds: "seconds", Notation: "notation" }, t.prototype.toSeconds = function(e) {
        return this.isNumber(e) ? e : this.isUndef(e) ? this.now() : this.isString(e) ? new t.Time(e).toSeconds() : e instanceof t.TimeBase ? e.toSeconds() : void 0;
      }, t.prototype.toFrequency = function(e) {
        return this.isNumber(e) ? e : this.isString(e) || this.isUndef(e) ? new t.Frequency(e).valueOf() : e instanceof t.TimeBase ? e.toFrequency() : void 0;
      }, t.prototype.toTicks = function(e) {
        return this.isNumber(e) || this.isString(e) ? new t.TransportTime(e).toTicks() : this.isUndef(e) ? t.Transport.ticks : e instanceof t.TimeBase ? e.toTicks() : void 0;
      }, t;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(18), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function(i) {
      "use strict";
      return window.GainNode && !AudioContext.prototype.createGain && (AudioContext.prototype.createGain = AudioContext.prototype.createGainNode), i.Gain = function() {
        var t = this.optionsObject(arguments, ["gain", "units"], i.Gain.defaults);
        this.input = this.output = this._gainNode = this.context.createGain(), this.gain = new i.Param({ param: this._gainNode.gain, units: t.units, value: t.gain, convert: t.convert }), this._readOnly("gain");
      }, i.extend(i.Gain), i.Gain.defaults = { gain: 1, convert: true }, i.Gain.prototype.dispose = function() {
        i.Param.prototype.dispose.call(this), this._gainNode.disconnect(), this._gainNode = null, this._writable("gain"), this.gain.dispose(), this.gain = null;
      }, i.prototype.createInsOuts = function(t, n) {
        1 === t ? this.input = new i.Gain() : 1 < t && (this.input = new Array(t)), 1 === n ? this.output = new i.Gain() : 1 < n && (this.output = new Array(t));
      }, i.Gain;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(7), __webpack_require__(39), __webpack_require__(14), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function(o) {
      "use strict";
      return o.Clock = function() {
        o.Emitter.call(this);
        var t = this.optionsObject(arguments, ["callback", "frequency"], o.Clock.defaults);
        this.callback = t.callback, this._nextTick = 0, this._lastState = o.State.Stopped, this.frequency = new o.TimelineSignal(t.frequency, o.Type.Frequency), this._readOnly("frequency"), this.ticks = 0, this._state = new o.TimelineState(o.State.Stopped), this._boundLoop = this._loop.bind(this), this.context.on("tick", this._boundLoop);
      }, o.extend(o.Clock, o.Emitter), o.Clock.defaults = { callback: o.noOp, frequency: 1, lookAhead: "auto" }, Object.defineProperty(o.Clock.prototype, "state", { get: function() {
        return this._state.getValueAtTime(this.now());
      } }), o.Clock.prototype.start = function(t, e) {
        return t = this.toSeconds(t), this._state.getValueAtTime(t) !== o.State.Started && this._state.add({ state: o.State.Started, time: t, offset: e }), this;
      }, o.Clock.prototype.stop = function(t) {
        return t = this.toSeconds(t), this._state.cancel(t), this._state.setStateAtTime(o.State.Stopped, t), this;
      }, o.Clock.prototype.pause = function(t) {
        return t = this.toSeconds(t), this._state.getValueAtTime(t) === o.State.Started && this._state.setStateAtTime(o.State.Paused, t), this;
      }, o.Clock.prototype._loop = function() {
        for (var t = this.now() + this.context.lookAhead + this.context.updateInterval + 2 * this.context.lag; t > this._nextTick && this._state; ) {
          var e = this._state.getValueAtTime(this._nextTick);
          if (e !== this._lastState) {
            this._lastState = e;
            var i = this._state.get(this._nextTick);
            e === o.State.Started ? (this._nextTick = i.time, this.isUndef(i.offset) || (this.ticks = i.offset), this.emit("start", i.time, this.ticks)) : e === o.State.Stopped ? (this.ticks = 0, this.emit("stop", i.time)) : e === o.State.Paused && this.emit("pause", i.time);
          }
          var s = this._nextTick;
          this.frequency && (this._nextTick += 1 / this.frequency.getValueAtTime(this._nextTick), e === o.State.Started && (this.callback(s), this.ticks++));
        }
      }, o.Clock.prototype.getStateAtTime = function(t) {
        return t = this.toSeconds(t), this._state.getValueAtTime(t);
      }, o.Clock.prototype.dispose = function() {
        o.Emitter.prototype.dispose.call(this), this.context.off("tick", this._boundLoop), this._writable("frequency"), this.frequency.dispose(), this.frequency = null, this._boundLoop = null, this._nextTick = 1 / 0, this.callback = null, this._state.dispose(), this._state = null;
      }, o.Clock;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(14)], __WEBPACK_AMD_DEFINE_RESULT__ = function(o) {
      function t(e, t2, n) {
        if (e.input)
          Array.isArray(e.input) ? (o.prototype.isUndef(n) && (n = 0), this.connect(e.input[n])) : this.connect(e.input, t2, n);
        else
          try {
            e instanceof AudioNode ? i.call(this, e, t2, n) : i.call(this, e, t2);
          } catch (t3) {
            throw new Error("error connecting to node: " + e + "\n" + t3);
          }
      }
      var i, r;
      return !window.hasOwnProperty("AudioContext") && window.hasOwnProperty("webkitAudioContext") && (window.AudioContext = window.webkitAudioContext), o.Context = function(t2) {
        for (var e in o.Emitter.call(this), t2 = t2 || new window.AudioContext(), this._context = t2, this._context)
          this._defineProperty(this._context, e);
        this._latencyHint = "interactive", this._lookAhead = 0.1, this._updateInterval = this._lookAhead / 3, this._computedUpdateInterval = 0, this._worker = this._createWorker(), this._constants = {};
      }, o.extend(o.Context, o.Emitter), o.Emitter.mixin(o.Context), o.Context.prototype._defineProperty = function(e, n) {
        this.isUndef(this[n]) && Object.defineProperty(this, n, { get: function() {
          return "function" == typeof e[n] ? e[n].bind(e) : e[n];
        }, set: function(t2) {
          e[n] = t2;
        } });
      }, o.Context.prototype.now = function() {
        return this._context.currentTime;
      }, o.Context.prototype._createWorker = function() {
        window.URL = window.URL || window.webkitURL;
        var t2 = new Blob(["var timeoutTime = " + (1e3 * this._updateInterval).toFixed(1) + ";self.onmessage = function(msg){	timeoutTime = parseInt(msg.data);};function tick(){	setTimeout(tick, timeoutTime);	self.postMessage('tick');}tick();"]), e = URL.createObjectURL(t2), n = new Worker(e);
        return n.addEventListener("message", function() {
          this.emit("tick");
        }.bind(this)), n.addEventListener("message", function() {
          var t3 = this.now();
          if (this.isNumber(this._lastUpdate)) {
            var e2 = t3 - this._lastUpdate;
            this._computedUpdateInterval = Math.max(e2, 0.97 * this._computedUpdateInterval);
          }
          this._lastUpdate = t3;
        }.bind(this)), n;
      }, o.Context.prototype.getConstant = function(t2) {
        if (this._constants[t2])
          return this._constants[t2];
        for (var e = this._context.createBuffer(1, 128, this._context.sampleRate), n = e.getChannelData(0), o2 = 0; o2 < n.length; o2++)
          n[o2] = t2;
        var i2 = this._context.createBufferSource();
        return i2.channelCount = 1, i2.channelCountMode = "explicit", i2.buffer = e, i2.loop = true, i2.start(0), this._constants[t2] = i2;
      }, Object.defineProperty(o.Context.prototype, "lag", { get: function() {
        var t2 = this._computedUpdateInterval - this._updateInterval;
        return t2 = Math.max(t2, 0);
      } }), Object.defineProperty(o.Context.prototype, "lookAhead", { get: function() {
        return this._lookAhead;
      }, set: function(t2) {
        this._lookAhead = t2;
      } }), Object.defineProperty(o.Context.prototype, "updateInterval", { get: function() {
        return this._updateInterval;
      }, set: function(t2) {
        this._updateInterval = Math.max(t2, o.prototype.blockTime), this._worker.postMessage(Math.max(1e3 * t2, 1));
      } }), Object.defineProperty(o.Context.prototype, "latencyHint", { get: function() {
        return this._latencyHint;
      }, set: function(t2) {
        var e = t2;
        if (this._latencyHint = t2, this.isString(t2))
          switch (t2) {
            case "interactive":
              e = 0.1, this._context.latencyHint = t2;
              break;
            case "playback":
              e = 0.8, this._context.latencyHint = t2;
              break;
            case "balanced":
              e = 0.25, this._context.latencyHint = t2;
              break;
            case "fastest":
              e = 0.01;
          }
        this.lookAhead = e, this.updateInterval = e / 3;
      } }), o.supported ? (i = AudioNode.prototype.connect, r = AudioNode.prototype.disconnect, AudioNode.prototype.connect !== t && (AudioNode.prototype.connect = t, AudioNode.prototype.disconnect = function(e, t2, n) {
        if (e && e.input && Array.isArray(e.input))
          o.prototype.isUndef(n) && (n = 0), this.disconnect(e.input[n], t2, n);
        else if (e && e.input)
          this.disconnect(e.input, t2, n);
        else
          try {
            r.apply(this, arguments);
          } catch (t3) {
            throw new Error("error disconnecting node: " + e + "\n" + t3);
          }
      }), o.context = new o.Context()) : console.warn("This browser does not support Tone.js"), o.Context;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(4), __webpack_require__(20), __webpack_require__(2), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function(n) {
      "use strict";
      return n.Subtract = function(t) {
        this.createInsOuts(2, 0), this._sum = this.input[0] = this.output = new n.Gain(), this._neg = new n.Negate(), this._param = this.input[1] = new n.Signal(t), this._param.chain(this._neg, this._sum);
      }, n.extend(n.Subtract, n.Signal), n.Subtract.prototype.dispose = function() {
        return n.prototype.dispose.call(this), this._neg.dispose(), this._neg = null, this._sum.disconnect(), this._sum = null, this._param.dispose(), this._param = null, this;
      }, n.Subtract;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function(o) {
      "use strict";
      return o.Emitter = function() {
        this._events = {};
      }, o.extend(o.Emitter), o.Emitter.prototype.on = function(t, e) {
        for (var i = t.split(/\W+/), r = 0; r < i.length; r++) {
          var n = i[r];
          this._events.hasOwnProperty(n) || (this._events[n] = []), this._events[n].push(e);
        }
        return this;
      }, o.Emitter.prototype.off = function(t, e) {
        for (var i = t.split(/\W+/), r = 0; r < i.length; r++)
          if (t = i[r], this._events.hasOwnProperty(t))
            if (o.prototype.isUndef(e))
              this._events[t] = [];
            else
              for (var n = this._events[t], s = 0; s < n.length; s++)
                n[s] === e && n.splice(s, 1);
        return this;
      }, o.Emitter.prototype.emit = function(t) {
        if (this._events) {
          var e = Array.apply(null, arguments).slice(1);
          if (this._events.hasOwnProperty(t))
            for (var i = this._events[t], r = 0, n = i.length; r < n; r++)
              i[r].apply(this, e);
        }
        return this;
      }, o.Emitter.mixin = function(t) {
        var e = ["on", "off", "emit"];
        t._events = {};
        for (var i = 0; i < e.length; i++) {
          var r = e[i], n = o.Emitter.prototype[r];
          t[r] = n;
        }
      }, o.Emitter.prototype.dispose = function() {
        return o.prototype.dispose.call(this), this._events = null, this;
      }, o.Emitter;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function(c) {
      "use strict";
      return c.SignalBase = function() {
      }, c.extend(c.SignalBase), c.SignalBase.prototype.connect = function(e, n, a) {
        return c.Signal && c.Signal === e.constructor || c.Param && c.Param === e.constructor || c.TimelineSignal && c.TimelineSignal === e.constructor ? (e._param.cancelScheduledValues(0), e._param.value = 0, e.overridden = true) : e instanceof AudioParam && (e.cancelScheduledValues(0), e.value = 0), c.prototype.connect.call(this, e, n, a), this;
      }, c.SignalBase;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(17)], __WEBPACK_AMD_DEFINE_RESULT__ = function(o) {
      return o.Time = function(t, e) {
        if (!(this instanceof o.Time))
          return new o.Time(t, e);
        this._plusNow = false, o.TimeBase.call(this, t, e);
      }, o.extend(o.Time, o.TimeBase), o.Time.prototype._unaryExpressions = Object.create(o.TimeBase.prototype._unaryExpressions), o.Time.prototype._unaryExpressions.quantize = { regexp: /^@/, method: function(t) {
        return o.Transport.nextSubdivision(t());
      } }, o.Time.prototype._unaryExpressions.now = { regexp: /^\+/, method: function(t) {
        return this._plusNow = true, t();
      } }, o.Time.prototype.quantize = function(t, e) {
        return e = this.defaultArg(e, 1), this._expr = function(t2, e2, o2) {
          return t2 = t2(), e2 = e2.toSeconds(), t2 + (Math.round(t2 / e2) * e2 - t2) * o2;
        }.bind(this, this._expr, new this.constructor(t), e), this;
      }, o.Time.prototype.addNow = function() {
        return this._plusNow = true, this;
      }, o.Time.prototype._defaultExpr = function() {
        return this._plusNow = true, this._noOp;
      }, o.Time.prototype.copy = function(t) {
        return o.TimeBase.prototype.copy.call(this, t), this._plusNow = t._plusNow, this;
      }, o.Time.prototype.toNotation = function() {
        var t = this.toSeconds(), e = this._toNotationHelper(t, ["1m", "2n", "4n", "8n", "16n", "32n", "64n", "128n"]), o2 = this._toNotationHelper(t, ["1m", "2n", "2t", "4n", "4t", "8n", "8t", "16n", "16t", "32n", "32t", "64n", "64t", "128n"]);
        return o2.split("+").length < e.split("+").length ? o2 : e;
      }, o.Time.prototype._toNotationHelper = function(t, e) {
        for (var o2 = this._notationToUnits(e[e.length - 1]), n = "", i = 0; i < e.length; i++) {
          var r = this._notationToUnits(e[i]), s = t / r;
          if (1 - s % 1 < 1e-6 && (s += 1e-6), 0 < (s = Math.floor(s))) {
            if (n += 1 === s ? e[i] : s.toString() + "*" + e[i], (t -= s * r) < o2)
              break;
            n += " + ";
          }
        }
        return "" === n && (n = "0"), n;
      }, o.Time.prototype._notationToUnits = function(t) {
        for (var e = this._primaryExpressions, o2 = [e.n, e.t, e.m], n = 0; n < o2.length; n++) {
          var i = o2[n], r = t.match(i.regexp);
          if (r)
            return i.method.call(this, r[1]);
        }
      }, o.Time.prototype.toBarsBeatsSixteenths = function() {
        var t = this._beatsToUnits(1), e = this.toSeconds() / t, o2 = Math.floor(e / this._timeSignature()), n = e % 1 * 4;
        return e = Math.floor(e) % this._timeSignature(), 3 < (n = n.toString()).length && (n = parseFloat(n).toFixed(3)), [o2, e, n].join(":");
      }, o.Time.prototype.toTicks = function() {
        var t = this._beatsToUnits(1), e = this.valueOf() / t;
        return Math.floor(e * o.Transport.PPQ);
      }, o.Time.prototype.toSamples = function() {
        return this.toSeconds() * this.context.sampleRate;
      }, o.Time.prototype.toFrequency = function() {
        return 1 / this.toSeconds();
      }, o.Time.prototype.toSeconds = function() {
        return this.valueOf();
      }, o.Time.prototype.toMilliseconds = function() {
        return 1e3 * this.toSeconds();
      }, o.Time.prototype.valueOf = function() {
        return this._expr() + (this._plusNow ? this.now() : 0);
      }, o.Time;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function(n) {
      return n.TimeBase = function(e, t) {
        if (!(this instanceof n.TimeBase))
          return new n.TimeBase(e, t);
        if (this._expr = this._noOp, e instanceof n.TimeBase)
          this.copy(e);
        else if (!this.isUndef(t) || this.isNumber(e)) {
          t = this.defaultArg(t, this._defaultUnits);
          var r = this._primaryExpressions[t].method;
          this._expr = r.bind(this, e);
        } else
          this.isString(e) ? this.set(e) : this.isUndef(e) && (this._expr = this._defaultExpr());
      }, n.extend(n.TimeBase), n.TimeBase.prototype.set = function(e) {
        return this._expr = this._parseExprString(e), this;
      }, n.TimeBase.prototype.clone = function() {
        var e = new this.constructor();
        return e.copy(this), e;
      }, n.TimeBase.prototype.copy = function(e) {
        var t = e._expr();
        return this.set(t);
      }, n.TimeBase.prototype._primaryExpressions = { n: { regexp: /^(\d+)n/i, method: function(e) {
        return 1 === (e = parseInt(e)) ? this._beatsToUnits(this._timeSignature()) : this._beatsToUnits(4 / e);
      } }, t: { regexp: /^(\d+)t/i, method: function(e) {
        return e = parseInt(e), this._beatsToUnits(8 / (3 * parseInt(e)));
      } }, m: { regexp: /^(\d+)m/i, method: function(e) {
        return this._beatsToUnits(parseInt(e) * this._timeSignature());
      } }, i: { regexp: /^(\d+)i/i, method: function(e) {
        return this._ticksToUnits(parseInt(e));
      } }, hz: { regexp: /^(\d+(?:\.\d+)?)hz/i, method: function(e) {
        return this._frequencyToUnits(parseFloat(e));
      } }, tr: { regexp: /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/, method: function(e, t, r) {
        var n2 = 0;
        return e && "0" !== e && (n2 += this._beatsToUnits(this._timeSignature() * parseFloat(e))), t && "0" !== t && (n2 += this._beatsToUnits(parseFloat(t))), r && "0" !== r && (n2 += this._beatsToUnits(parseFloat(r) / 4)), n2;
      } }, s: { regexp: /^(\d+(?:\.\d+)?s)/, method: function(e) {
        return this._secondsToUnits(parseFloat(e));
      } }, samples: { regexp: /^(\d+)samples/, method: function(e) {
        return parseInt(e) / this.context.sampleRate;
      } }, default: { regexp: /^(\d+(?:\.\d+)?)/, method: function(e) {
        return this._primaryExpressions[this._defaultUnits].method.call(this, e);
      } } }, n.TimeBase.prototype._binaryExpressions = { "+": { regexp: /^\+/, precedence: 2, method: function(e, t) {
        return e() + t();
      } }, "-": { regexp: /^\-/, precedence: 2, method: function(e, t) {
        return e() - t();
      } }, "*": { regexp: /^\*/, precedence: 1, method: function(e, t) {
        return e() * t();
      } }, "/": { regexp: /^\//, precedence: 1, method: function(e, t) {
        return e() / t();
      } } }, n.TimeBase.prototype._unaryExpressions = { neg: { regexp: /^\-/, method: function(e) {
        return -e();
      } } }, n.TimeBase.prototype._syntaxGlue = { "(": { regexp: /^\(/ }, ")": { regexp: /^\)/ } }, n.TimeBase.prototype._tokenize = function(e) {
        for (var t = -1, r = []; 0 < e.length; ) {
          var n2 = i(e = e.trim(), this);
          r.push(n2), e = e.substr(n2.value.length);
        }
        function i(e2, t2) {
          for (var r2 = ["_binaryExpressions", "_unaryExpressions", "_primaryExpressions", "_syntaxGlue"], n3 = 0; n3 < r2.length; n3++) {
            var i2 = t2[r2[n3]];
            for (var s in i2) {
              var o = i2[s], p = o.regexp, a = e2.match(p);
              if (null !== a)
                return { method: o.method, precedence: o.precedence, regexp: o.regexp, value: a[0] };
            }
          }
          throw new SyntaxError("Tone.TimeBase: Unexpected token " + e2);
        }
        return { next: function() {
          return r[++t];
        }, peek: function() {
          return r[t + 1];
        } };
      }, n.TimeBase.prototype._matchGroup = function(e, t, r) {
        if (!this.isUndef(e))
          for (var n2 in t) {
            var i = t[n2];
            if (i.regexp.test(e.value)) {
              if (this.isUndef(r))
                return i;
              if (i.precedence === r)
                return i;
            }
          }
        return false;
      }, n.TimeBase.prototype._parseBinary = function(e, t) {
        var r;
        this.isUndef(t) && (t = 2), r = t < 0 ? this._parseUnary(e) : this._parseBinary(e, t - 1);
        for (var n2 = e.peek(); n2 && this._matchGroup(n2, this._binaryExpressions, t); )
          r = (n2 = e.next()).method.bind(this, r, this._parseBinary(e, t - 1)), n2 = e.peek();
        return r;
      }, n.TimeBase.prototype._parseUnary = function(e) {
        var t, r;
        t = e.peek();
        var n2 = this._matchGroup(t, this._unaryExpressions);
        return n2 ? (t = e.next(), r = this._parseUnary(e), n2.method.bind(this, r)) : this._parsePrimary(e);
      }, n.TimeBase.prototype._parsePrimary = function(e) {
        var t, r;
        if (t = e.peek(), this.isUndef(t))
          throw new SyntaxError("Tone.TimeBase: Unexpected end of expression");
        if (this._matchGroup(t, this._primaryExpressions)) {
          var n2 = (t = e.next()).value.match(t.regexp);
          return t.method.bind(this, n2[1], n2[2], n2[3]);
        }
        if (t && "(" === t.value) {
          if (e.next(), r = this._parseBinary(e), !(t = e.next()) || ")" !== t.value)
            throw new SyntaxError("Expected )");
          return r;
        }
        throw new SyntaxError("Tone.TimeBase: Cannot process token " + t.value);
      }, n.TimeBase.prototype._parseExprString = function(e) {
        this.isString(e) || (e = e.toString());
        var t = this._tokenize(e);
        return this._parseBinary(t);
      }, n.TimeBase.prototype._noOp = function() {
        return 0;
      }, n.TimeBase.prototype._defaultExpr = function() {
        return this._noOp;
      }, n.TimeBase.prototype._defaultUnits = "s", n.TimeBase.prototype._frequencyToUnits = function(e) {
        return 1 / e;
      }, n.TimeBase.prototype._beatsToUnits = function(e) {
        return 60 / n.Transport.bpm.value * e;
      }, n.TimeBase.prototype._secondsToUnits = function(e) {
        return e;
      }, n.TimeBase.prototype._ticksToUnits = function(e) {
        return e * (this._beatsToUnits(1) / n.Transport.PPQ);
      }, n.TimeBase.prototype._timeSignature = function() {
        return n.Transport.timeSignature;
      }, n.TimeBase.prototype._pushExpr = function(e, t, r) {
        return e instanceof n.TimeBase || (e = new this.constructor(e, r)), this._expr = this._binaryExpressions[t].method.bind(this, this._expr, e._expr), this;
      }, n.TimeBase.prototype.add = function(e, t) {
        return this._pushExpr(e, "+", t);
      }, n.TimeBase.prototype.sub = function(e, t) {
        return this._pushExpr(e, "-", t);
      }, n.TimeBase.prototype.mult = function(e, t) {
        return this._pushExpr(e, "*", t);
      }, n.TimeBase.prototype.div = function(e, t) {
        return this._pushExpr(e, "/", t);
      }, n.TimeBase.prototype.valueOf = function() {
        return this._expr();
      }, n.TimeBase.prototype.dispose = function() {
        this._expr = null;
      }, n.TimeBase;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function(a) {
      "use strict";
      return a.Param = function() {
        var t = this.optionsObject(arguments, ["param", "units", "convert"], a.Param.defaults);
        this._param = this.input = t.param, this.units = t.units, this.convert = t.convert, this.overridden = false, this._lfo = null, this.isObject(t.lfo) ? this.value = t.lfo : this.isUndef(t.value) || (this.value = t.value);
      }, a.extend(a.Param), a.Param.defaults = { units: a.Type.Default, convert: true, param: void 0 }, Object.defineProperty(a.Param.prototype, "value", { get: function() {
        return this._toUnits(this._param.value);
      }, set: function(t) {
        if (this.isObject(t)) {
          if (this.isUndef(a.LFO))
            throw new Error("Include 'Tone.LFO' to use an LFO as a Param value.");
          this._lfo && this._lfo.dispose(), this._lfo = new a.LFO(t).start(), this._lfo.connect(this.input);
        } else {
          var e = this._fromUnits(t);
          this._param.cancelScheduledValues(0), this._param.value = e;
        }
      } }), a.Param.prototype._fromUnits = function(t) {
        if (!this.convert && !this.isUndef(this.convert))
          return t;
        switch (this.units) {
          case a.Type.Time:
            return this.toSeconds(t);
          case a.Type.Frequency:
            return this.toFrequency(t);
          case a.Type.Decibels:
            return this.dbToGain(t);
          case a.Type.NormalRange:
            return Math.min(Math.max(t, 0), 1);
          case a.Type.AudioRange:
            return Math.min(Math.max(t, -1), 1);
          case a.Type.Positive:
            return Math.max(t, 0);
          default:
            return t;
        }
      }, a.Param.prototype._toUnits = function(t) {
        if (!this.convert && !this.isUndef(this.convert))
          return t;
        switch (this.units) {
          case a.Type.Decibels:
            return this.gainToDb(t);
          default:
            return t;
        }
      }, a.Param.prototype._minOutput = 1e-5, a.Param.prototype.setValueAtTime = function(t, e) {
        return t = this._fromUnits(t), (e = this.toSeconds(e)) <= this.now() + this.blockTime ? this._param.value = t : this._param.setValueAtTime(t, e), this;
      }, a.Param.prototype.setRampPoint = function(t) {
        t = this.defaultArg(t, this.now());
        var e = this._param.value;
        return 0 === e && (e = this._minOutput), this._param.setValueAtTime(e, t), this;
      }, a.Param.prototype.linearRampToValueAtTime = function(t, e) {
        return t = this._fromUnits(t), this._param.linearRampToValueAtTime(t, this.toSeconds(e)), this;
      }, a.Param.prototype.exponentialRampToValueAtTime = function(t, e) {
        return t = this._fromUnits(t), t = Math.max(this._minOutput, t), this._param.exponentialRampToValueAtTime(t, this.toSeconds(e)), this;
      }, a.Param.prototype.exponentialRampToValue = function(t, e, i) {
        return i = this.toSeconds(i), this.setRampPoint(i), this.exponentialRampToValueAtTime(t, i + this.toSeconds(e)), this;
      }, a.Param.prototype.linearRampToValue = function(t, e, i) {
        return i = this.toSeconds(i), this.setRampPoint(i), this.linearRampToValueAtTime(t, i + this.toSeconds(e)), this;
      }, a.Param.prototype.setTargetAtTime = function(t, e, i) {
        return t = this._fromUnits(t), t = Math.max(this._minOutput, t), i = Math.max(this._minOutput, i), this._param.setTargetAtTime(t, this.toSeconds(e), i), this;
      }, a.Param.prototype.setValueCurveAtTime = function(t, e, i) {
        for (var a2 = 0; a2 < t.length; a2++)
          t[a2] = this._fromUnits(t[a2]);
        return this._param.setValueCurveAtTime(t, this.toSeconds(e), this.toSeconds(i)), this;
      }, a.Param.prototype.cancelScheduledValues = function(t) {
        return this._param.cancelScheduledValues(this.toSeconds(t)), this;
      }, a.Param.prototype.rampTo = function(t, e, i) {
        return e = this.defaultArg(e, 0), this.units === a.Type.Frequency || this.units === a.Type.BPM || this.units === a.Type.Decibels ? this.exponentialRampToValue(t, e, i) : this.linearRampToValue(t, e, i), this;
      }, Object.defineProperty(a.Param.prototype, "lfo", { get: function() {
        return this._lfo;
      } }), a.Param.prototype.dispose = function() {
        return a.prototype.dispose.call(this), this._param = null, this._lfo && (this._lfo.dispose(), this._lfo = null), this;
      }, a.Param;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function(i) {
      "use strict";
      return i.Timeline = function() {
        var e = this.optionsObject(arguments, ["memory"], i.Timeline.defaults);
        this._timeline = [], this._toRemove = [], this._iterating = false, this.memory = e.memory;
      }, i.extend(i.Timeline), i.Timeline.defaults = { memory: 1 / 0 }, Object.defineProperty(i.Timeline.prototype, "length", { get: function() {
        return this._timeline.length;
      } }), i.Timeline.prototype.add = function(e) {
        if (this.isUndef(e.time))
          throw new Error("Tone.Timeline: events must have a time attribute");
        if (this._timeline.length) {
          var i2 = this._search(e.time);
          this._timeline.splice(i2 + 1, 0, e);
        } else
          this._timeline.push(e);
        if (this.length > this.memory) {
          var t = this.length - this.memory;
          this._timeline.splice(0, t);
        }
        return this;
      }, i.Timeline.prototype.remove = function(e) {
        if (this._iterating)
          this._toRemove.push(e);
        else {
          var i2 = this._timeline.indexOf(e);
          -1 !== i2 && this._timeline.splice(i2, 1);
        }
        return this;
      }, i.Timeline.prototype.get = function(e) {
        var i2 = this._search(e);
        return -1 !== i2 ? this._timeline[i2] : null;
      }, i.Timeline.prototype.peek = function() {
        return this._timeline[0];
      }, i.Timeline.prototype.shift = function() {
        return this._timeline.shift();
      }, i.Timeline.prototype.getAfter = function(e) {
        var i2 = this._search(e);
        return i2 + 1 < this._timeline.length ? this._timeline[i2 + 1] : null;
      }, i.Timeline.prototype.getBefore = function(e) {
        var i2 = this._timeline.length;
        if (0 < i2 && this._timeline[i2 - 1].time < e)
          return this._timeline[i2 - 1];
        var t = this._search(e);
        return 0 <= t - 1 ? this._timeline[t - 1] : null;
      }, i.Timeline.prototype.cancel = function(e) {
        if (1 < this._timeline.length) {
          var i2 = this._search(e);
          if (0 <= i2)
            if (this._timeline[i2].time === e) {
              for (var t = i2; 0 <= t && this._timeline[t].time === e; t--)
                i2 = t;
              this._timeline = this._timeline.slice(0, i2);
            } else
              this._timeline = this._timeline.slice(0, i2 + 1);
          else
            this._timeline = [];
        } else
          1 === this._timeline.length && this._timeline[0].time >= e && (this._timeline = []);
        return this;
      }, i.Timeline.prototype.cancelBefore = function(e) {
        if (this._timeline.length) {
          var i2 = this._search(e);
          0 <= i2 && (this._timeline = this._timeline.slice(i2 + 1));
        }
        return this;
      }, i.Timeline.prototype._search = function(e) {
        var i2 = 0, t = this._timeline.length, n = t;
        if (0 < t && this._timeline[t - 1].time <= e)
          return t - 1;
        for (; i2 < n; ) {
          var r = Math.floor(i2 + (n - i2) / 2), s = this._timeline[r], h = this._timeline[r + 1];
          if (s.time === e) {
            for (var l = r; l < this._timeline.length; l++) {
              this._timeline[l].time === e && (r = l);
            }
            return r;
          }
          if (s.time < e && h.time > e)
            return r;
          s.time > e ? n = r : s.time < e && (i2 = r + 1);
        }
        return -1;
      }, i.Timeline.prototype._iterate = function(e, i2, t) {
        this._iterating = true, i2 = this.defaultArg(i2, 0), t = this.defaultArg(t, this._timeline.length - 1);
        for (var n = i2; n <= t; n++)
          e(this._timeline[n]);
        if (this._iterating = false, 0 < this._toRemove.length) {
          for (var r = 0; r < this._toRemove.length; r++) {
            var s = this._timeline.indexOf(this._toRemove[r]);
            -1 !== s && this._timeline.splice(s, 1);
          }
          this._toRemove = [];
        }
      }, i.Timeline.prototype.forEach = function(e) {
        return this._iterate(e), this;
      }, i.Timeline.prototype.forEachBefore = function(e, i2) {
        var t = this._search(e);
        return -1 !== t && this._iterate(i2, 0, t), this;
      }, i.Timeline.prototype.forEachAfter = function(e, i2) {
        var t = this._search(e);
        return this._iterate(i2, t + 1), this;
      }, i.Timeline.prototype.forEachFrom = function(e, i2) {
        for (var t = this._search(e); 0 <= t && this._timeline[t].time >= e; )
          t--;
        return this._iterate(i2, t + 1), this;
      }, i.Timeline.prototype.forEachAtTime = function(i2, t) {
        var e = this._search(i2);
        return -1 !== e && this._iterate(function(e2) {
          e2.time === i2 && t(e2);
        }, 0, e), this;
      }, i.Timeline.prototype.dispose = function() {
        i.prototype.dispose.call(this), this._timeline = null, this._toRemove = null;
      }, i.Timeline;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(1), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(t) {
      "use strict";
      return t.Negate = function() {
        this._multiply = this.input = this.output = new t.Multiply(-1);
      }, t.extend(t.Negate, t.SignalBase), t.Negate.prototype.dispose = function() {
        return t.prototype.dispose.call(this), this._multiply.dispose(), this._multiply = null, this;
      }, t.Negate;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(2), __webpack_require__(1), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function(e) {
      "use strict";
      return e.GreaterThanZero = function() {
        this._thresh = this.output = new e.WaveShaper(function(e2) {
          return e2 <= 0 ? 0 : 1;
        }, 127), this._scale = this.input = new e.Multiply(1e4), this._scale.connect(this._thresh);
      }, e.extend(e.GreaterThanZero, e.SignalBase), e.GreaterThanZero.prototype.dispose = function() {
        return e.prototype.dispose.call(this), this._scale.dispose(), this._scale = null, this._thresh.dispose(), this._thresh = null, this;
      }, e.GreaterThanZero;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !function(e, t) {
      true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = t, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : void 0;
    }(this, function() {
      var r = function(e, t) {
        this._dragged = false, this._element = e, this._bindedMove = this._moved.bind(this), this._bindedEnd = this._ended.bind(this, t), e.addEventListener("touchstart", this._bindedEnd), e.addEventListener("touchmove", this._bindedMove), e.addEventListener("touchend", this._bindedEnd), e.addEventListener("mouseup", this._bindedEnd);
      };
      function o(e) {
        return "running" === e.state;
      }
      return r.prototype._moved = function(e) {
        this._dragged = true;
      }, r.prototype._ended = function(e) {
        this._dragged || function(e2) {
          var t = e2.createBuffer(1, 1, e2.sampleRate), n = e2.createBufferSource();
          n.buffer = t, n.connect(e2.destination), n.start(0), e2.resume && e2.resume();
        }(e), this._dragged = false;
      }, r.prototype.dispose = function() {
        this._element.removeEventListener("touchstart", this._bindedEnd), this._element.removeEventListener("touchmove", this._bindedMove), this._element.removeEventListener("touchend", this._bindedEnd), this._element.removeEventListener("mouseup", this._bindedEnd), this._bindedMove = null, this._bindedEnd = null, this._element = null;
      }, function(t, e, n) {
        var i = new Promise(function(e2) {
          !function(t2, n2) {
            o(t2) ? n2() : function e3() {
              o(t2) ? n2() : (requestAnimationFrame(e3), t2.resume && t2.resume());
            }();
          }(t, e2);
        }), d = [];
        return function e2(t2, n2, i2) {
          if (Array.isArray(t2) || NodeList && t2 instanceof NodeList)
            for (var d2 = 0; d2 < t2.length; d2++)
              e2(t2[d2], n2, i2);
          else if ("string" == typeof t2)
            e2(document.querySelectorAll(t2), n2, i2);
          else if (t2.jquery && "function" == typeof t2.toArray)
            e2(t2.toArray(), n2, i2);
          else if (Element && t2 instanceof Element) {
            var o2 = new r(t2, i2);
            n2.push(o2);
          }
        }(e = e || document.body, d, t), i.then(function() {
          for (var e2 = 0; e2 < d.length; e2++)
            d[e2].dispose();
          d = null, n && n();
        }), i;
      };
    });
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(2), __webpack_require__(32), __webpack_require__(38), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function(i) {
      "use strict";
      return i.CrossFade = function(e) {
        this.createInsOuts(2, 1), this.a = this.input[0] = new i.Gain(), this.b = this.input[1] = new i.Gain(), this.fade = new i.Signal(this.defaultArg(e, 0.5), i.Type.NormalRange), this._equalPowerA = new i.EqualPowerGain(), this._equalPowerB = new i.EqualPowerGain(), this._invert = new i.Expr("1 - $0"), this.a.connect(this.output), this.b.connect(this.output), this.fade.chain(this._equalPowerB, this.b.gain), this.fade.chain(this._invert, this._equalPowerA, this.a.gain), this._readOnly("fade");
      }, i.extend(i.CrossFade), i.CrossFade.prototype.dispose = function() {
        return i.prototype.dispose.call(this), this._writable("fade"), this._equalPowerA.dispose(), this._equalPowerA = null, this._equalPowerB.dispose(), this._equalPowerB = null, this.fade.dispose(), this.fade = null, this._invert.dispose(), this._invert = null, this.a.dispose(), this.a = null, this.b.dispose(), this.b = null, this;
      }, i.CrossFade;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports) {
    !function() {
      var l, s = [];
      function p(e2) {
        var o = this, n = {}, i = -1;
        this.parameters.forEach(function(e3, t2) {
          var r2 = s[++i] || (s[i] = new Float32Array(o.bufferSize));
          r2.fill(e3.value), n[t2] = r2;
        }), this.processor.realm.exec("self.sampleRate=sampleRate=" + this.context.sampleRate + ";self.currentTime=currentTime=" + this.context.currentTime);
        var t = a(e2.inputBuffer), r = a(e2.outputBuffer);
        this.instance.process([t], [r], n);
      }
      function a(e2) {
        for (var t = [], r = 0; r < e2.numberOfChannels; r++)
          t[r] = e2.getChannelData(r);
        return t;
      }
      function f(e2) {
        return e2.$$processors || (e2.$$processors = {});
      }
      function e(e2) {
        this.$$context = e2;
      }
      "function" != typeof AudioWorkletNode && (self.AudioWorkletNode = function(e2, t, r) {
        var o = f(e2)[t], n = e2.createScriptProcessor(void 0, 2, r && r.outputChannelCount ? r.outputChannelCount[0] : 2);
        if (n.parameters = /* @__PURE__ */ new Map(), o.properties)
          for (var i = 0; i < o.properties.length; i++) {
            var s2 = o.properties[i], a2 = e2.createGain().gain;
            a2.value = s2.defaultValue, n.parameters.set(s2.name, a2);
          }
        var u = new MessageChannel();
        l = u.port2;
        var c = new o.Processor(r || {});
        return l = null, n.port = u.port1, n.processor = o, n.instance = c, n.onaudioprocess = p, n;
      }, Object.defineProperty((self.AudioContext || self.webkitAudioContext).prototype, "audioWorklet", { get: function() {
        return this.$$audioWorklet || (this.$$audioWorklet = new self.AudioWorklet(this));
      } }), self.AudioWorklet = (e.prototype.addModule = function(e2, t) {
        var n = this;
        return fetch(e2).then(function(e3) {
          if (!e3.ok)
            throw Error(e3.status);
          return e3.text();
        }).then(function(e3) {
          var r = { sampleRate: 0, currentTime: 0, AudioWorkletProcessor: function() {
            this.port = l;
          }, registerProcessor: function(e4, t2) {
            f(n.$$context)[e4] = { realm: o, context: r, Processor: t2, properties: t2.parameterDescriptors || [] };
          } }, o = new function(e4, t2) {
            var r2 = document.createElement("iframe");
            r2.style.cssText = "position:absolute;left:0;top:-999px;width:1px;height:1px;", t2.appendChild(r2);
            var o2 = r2.contentWindow, n2 = o2.document, i = "var window,$hook";
            for (var s2 in o2)
              s2 in e4 || "eval" === s2 || (i += ",", i += s2);
            for (var a2 in e4)
              i += ",", i += a2, i += "=self.", i += a2;
            var u = n2.createElement("script");
            u.appendChild(n2.createTextNode('function $hook(self,console) {"use strict";\n        ' + i + ";return function() {return eval(arguments[0])}}")), n2.body.appendChild(u), this.exec = o2.$hook(e4, console);
          }(r.self = r, document.documentElement);
          return o.exec((t && t.transpile || String)(e3)), null;
        });
      }, e));
    }();
  },
  function(module, exports) {
    (function() {
      function fixSetTarget(param) {
        if (!param)
          return;
        if (!param.setTargetAtTime)
          param.setTargetAtTime = param.setTargetValueAtTime;
      }
      if (window.hasOwnProperty("webkitAudioContext") && !window.hasOwnProperty("AudioContext")) {
        window.AudioContext = window.webkitAudioContext;
        if (typeof AudioContext.prototype.createGain !== "function")
          AudioContext.prototype.createGain = AudioContext.prototype.createGainNode;
        if (typeof AudioContext.prototype.createDelay !== "function")
          AudioContext.prototype.createDelay = AudioContext.prototype.createDelayNode;
        if (typeof AudioContext.prototype.createScriptProcessor !== "function")
          AudioContext.prototype.createScriptProcessor = AudioContext.prototype.createJavaScriptNode;
        if (typeof AudioContext.prototype.createPeriodicWave !== "function")
          AudioContext.prototype.createPeriodicWave = AudioContext.prototype.createWaveTable;
        AudioContext.prototype.internal_createGain = AudioContext.prototype.createGain;
        AudioContext.prototype.createGain = function() {
          var node = this.internal_createGain();
          fixSetTarget(node.gain);
          return node;
        };
        AudioContext.prototype.internal_createDelay = AudioContext.prototype.createDelay;
        AudioContext.prototype.createDelay = function(maxDelayTime) {
          var node = maxDelayTime ? this.internal_createDelay(maxDelayTime) : this.internal_createDelay();
          fixSetTarget(node.delayTime);
          return node;
        };
        AudioContext.prototype.internal_createBufferSource = AudioContext.prototype.createBufferSource;
        AudioContext.prototype.createBufferSource = function() {
          var node = this.internal_createBufferSource();
          if (!node.start) {
            node.start = function(when, offset, duration) {
              if (offset || duration)
                this.noteGrainOn(when || 0, offset, duration);
              else
                this.noteOn(when || 0);
            };
          } else {
            node.internal_start = node.start;
            node.start = function(when, offset, duration) {
              if (typeof duration !== "undefined")
                node.internal_start(when || 0, offset, duration);
              else
                node.internal_start(when || 0, offset || 0);
            };
          }
          if (!node.stop) {
            node.stop = function(when) {
              this.noteOff(when || 0);
            };
          } else {
            node.internal_stop = node.stop;
            node.stop = function(when) {
              node.internal_stop(when || 0);
            };
          }
          fixSetTarget(node.playbackRate);
          return node;
        };
        AudioContext.prototype.internal_createDynamicsCompressor = AudioContext.prototype.createDynamicsCompressor;
        AudioContext.prototype.createDynamicsCompressor = function() {
          var node = this.internal_createDynamicsCompressor();
          fixSetTarget(node.threshold);
          fixSetTarget(node.knee);
          fixSetTarget(node.ratio);
          fixSetTarget(node.reduction);
          fixSetTarget(node.attack);
          fixSetTarget(node.release);
          return node;
        };
        AudioContext.prototype.internal_createBiquadFilter = AudioContext.prototype.createBiquadFilter;
        AudioContext.prototype.createBiquadFilter = function() {
          var node = this.internal_createBiquadFilter();
          fixSetTarget(node.frequency);
          fixSetTarget(node.detune);
          fixSetTarget(node.Q);
          fixSetTarget(node.gain);
          return node;
        };
        if (typeof AudioContext.prototype.createOscillator !== "function") {
          AudioContext.prototype.internal_createOscillator = AudioContext.prototype.createOscillator;
          AudioContext.prototype.createOscillator = function() {
            var node = this.internal_createOscillator();
            if (!node.start) {
              node.start = function(when) {
                this.noteOn(when || 0);
              };
            } else {
              node.internal_start = node.start;
              node.start = function(when) {
                node.internal_start(when || 0);
              };
            }
            if (!node.stop) {
              node.stop = function(when) {
                this.noteOff(when || 0);
              };
            } else {
              node.internal_stop = node.stop;
              node.stop = function(when) {
                node.internal_stop(when || 0);
              };
            }
            if (!node.setPeriodicWave)
              node.setPeriodicWave = node.setWaveTable;
            fixSetTarget(node.frequency);
            fixSetTarget(node.detune);
            return node;
          };
        }
      }
      if (window.hasOwnProperty("webkitOfflineAudioContext") && !window.hasOwnProperty("OfflineAudioContext")) {
        window.OfflineAudioContext = window.webkitOfflineAudioContext;
      }
    })(window);
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    var el = document.createElement("audio");
    p5.prototype.isSupported = function() {
      return !!el.canPlayType;
    };
    var isOGGSupported = function isOGGSupported2() {
      return !!el.canPlayType && el.canPlayType('audio/ogg; codecs="vorbis"');
    };
    var isMP3Supported = function isMP3Supported2() {
      return !!el.canPlayType && el.canPlayType("audio/mpeg;");
    };
    var isWAVSupported = function isWAVSupported2() {
      return !!el.canPlayType && el.canPlayType('audio/wav; codecs="1"');
    };
    var isAACSupported = function isAACSupported2() {
      return !!el.canPlayType && (el.canPlayType("audio/x-m4a;") || el.canPlayType("audio/aac;"));
    };
    var isAIFSupported = function isAIFSupported2() {
      return !!el.canPlayType && el.canPlayType("audio/x-aiff;");
    };
    p5.prototype.isFileSupported = function(extension) {
      switch (extension.toLowerCase()) {
        case "mp3":
          return isMP3Supported();
        case "wav":
          return isWAVSupported();
        case "ogg":
          return isOGGSupported();
        case "aac":
        case "m4a":
        case "mp4":
          return isAACSupported();
        case "aif":
        case "aiff":
          return isAIFSupported();
        default:
          return false;
      }
    };
  },
  function(module, exports) {
    var g;
    g = /* @__PURE__ */ function() {
      return this;
    }();
    try {
      g = g || new Function("return this")();
    } catch (t) {
      "object" == typeof window && (g = window);
    }
    module.exports = g;
  },
  function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    __webpack_exports__["default"] = `function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import dependencies via preval.require so that they're available as values at compile time
var processorNames = {
  "recorderProcessor": "recorder-processor",
  "soundFileProcessor": "sound-file-processor",
  "amplitudeProcessor": "amplitude-processor"
};
var RingBuffer = {
  "default":
  /*#__PURE__*/
  function () {
    /**
     * @constructor
     * @param  {number} length Buffer length in frames.
     * @param  {number} channelCount Buffer channel count.
     */
    function RingBuffer(length, channelCount) {
      _classCallCheck(this, RingBuffer);

      this._readIndex = 0;
      this._writeIndex = 0;
      this._framesAvailable = 0;
      this._channelCount = channelCount;
      this._length = length;
      this._channelData = [];

      for (var i = 0; i < this._channelCount; ++i) {
        this._channelData[i] = new Float32Array(length);
      }
    }
    /**
     * Getter for Available frames in buffer.
     *
     * @return {number} Available frames in buffer.
     */


    _createClass(RingBuffer, [{
      key: "push",

      /**
       * Push a sequence of Float32Arrays to buffer.
       *
       * @param  {array} arraySequence A sequence of Float32Arrays.
       */
      value: function push(arraySequence) {
        // The channel count of arraySequence and the length of each channel must
        // match with this buffer obejct.
        // Transfer data from the |arraySequence| storage to the internal buffer.
        var sourceLength = arraySequence[0] ? arraySequence[0].length : 0;

        for (var i = 0; i < sourceLength; ++i) {
          var writeIndex = (this._writeIndex + i) % this._length;

          for (var channel = 0; channel < this._channelCount; ++channel) {
            this._channelData[channel][writeIndex] = arraySequence[channel][i];
          }
        }

        this._writeIndex += sourceLength;

        if (this._writeIndex >= this._length) {
          this._writeIndex = 0;
        } // For excessive frames, the buffer will be overwritten.


        this._framesAvailable += sourceLength;

        if (this._framesAvailable > this._length) {
          this._framesAvailable = this._length;
        }
      }
      /**
       * Pull data out of buffer and fill a given sequence of Float32Arrays.
       *
       * @param  {array} arraySequence An array of Float32Arrays.
       */

    }, {
      key: "pull",
      value: function pull(arraySequence) {
        // The channel count of arraySequence and the length of each channel must
        // match with this buffer obejct.
        // If the FIFO is completely empty, do nothing.
        if (this._framesAvailable === 0) {
          return;
        }

        var destinationLength = arraySequence[0].length; // Transfer data from the internal buffer to the |arraySequence| storage.

        for (var i = 0; i < destinationLength; ++i) {
          var readIndex = (this._readIndex + i) % this._length;

          for (var channel = 0; channel < this._channelCount; ++channel) {
            arraySequence[channel][i] = this._channelData[channel][readIndex];
          }
        }

        this._readIndex += destinationLength;

        if (this._readIndex >= this._length) {
          this._readIndex = 0;
        }

        this._framesAvailable -= destinationLength;

        if (this._framesAvailable < 0) {
          this._framesAvailable = 0;
        }
      }
    }, {
      key: "framesAvailable",
      get: function get() {
        return this._framesAvailable;
      }
    }]);

    return RingBuffer;
  }()
}["default"];

var RecorderProcessor =
/*#__PURE__*/
function (_AudioWorkletProcesso) {
  _inherits(RecorderProcessor, _AudioWorkletProcesso);

  function RecorderProcessor(options) {
    var _this;

    _classCallCheck(this, RecorderProcessor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RecorderProcessor).call(this));
    var processorOptions = options.processorOptions || {};
    _this.numOutputChannels = options.outputChannelCount || 2;
    _this.numInputChannels = processorOptions.numInputChannels || 2;
    _this.bufferSize = processorOptions.bufferSize || 1024;
    _this.recording = false;

    _this.clear();

    _this.port.onmessage = function (event) {
      var data = event.data;

      if (data.name === 'start') {
        _this.record(data.duration);
      } else if (data.name === 'stop') {
        _this.stop();
      }
    };

    return _this;
  }

  _createClass(RecorderProcessor, [{
    key: "process",
    value: function process(inputs) {
      if (!this.recording) {
        return true;
      } else if (this.sampleLimit && this.recordedSamples >= this.sampleLimit) {
        this.stop();
        return true;
      }

      var input = inputs[0];
      this.inputRingBuffer.push(input);

      if (this.inputRingBuffer.framesAvailable >= this.bufferSize) {
        this.inputRingBuffer.pull(this.inputRingBufferArraySequence);

        for (var channel = 0; channel < this.numOutputChannels; ++channel) {
          var inputChannelCopy = this.inputRingBufferArraySequence[channel].slice();

          if (channel === 0) {
            this.leftBuffers.push(inputChannelCopy);

            if (this.numInputChannels === 1) {
              this.rightBuffers.push(inputChannelCopy);
            }
          } else if (channel === 1 && this.numInputChannels > 1) {
            this.rightBuffers.push(inputChannelCopy);
          }
        }

        this.recordedSamples += this.bufferSize;
      }

      return true;
    }
  }, {
    key: "record",
    value: function record(duration) {
      if (duration) {
        this.sampleLimit = Math.round(duration * sampleRate);
      }

      this.recording = true;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.recording = false;
      var buffers = this.getBuffers();
      var leftBuffer = buffers[0].buffer;
      var rightBuffer = buffers[1].buffer;
      this.port.postMessage({
        name: 'buffers',
        leftBuffer: leftBuffer,
        rightBuffer: rightBuffer
      }, [leftBuffer, rightBuffer]);
      this.clear();
    }
  }, {
    key: "getBuffers",
    value: function getBuffers() {
      var buffers = [];
      buffers.push(this.mergeBuffers(this.leftBuffers));
      buffers.push(this.mergeBuffers(this.rightBuffers));
      return buffers;
    }
  }, {
    key: "mergeBuffers",
    value: function mergeBuffers(channelBuffer) {
      var result = new Float32Array(this.recordedSamples);
      var offset = 0;
      var lng = channelBuffer.length;

      for (var i = 0; i < lng; i++) {
        var buffer = channelBuffer[i];
        result.set(buffer, offset);
        offset += buffer.length;
      }

      return result;
    }
  }, {
    key: "clear",
    value: function clear() {
      var _this2 = this;

      this.leftBuffers = [];
      this.rightBuffers = [];
      this.inputRingBuffer = new RingBuffer(this.bufferSize, this.numInputChannels);
      this.inputRingBufferArraySequence = new Array(this.numInputChannels).fill(null).map(function () {
        return new Float32Array(_this2.bufferSize);
      });
      this.recordedSamples = 0;
      this.sampleLimit = null;
    }
  }]);

  return RecorderProcessor;
}(_wrapNativeSuper(AudioWorkletProcessor));

registerProcessor(processorNames.recorderProcessor, RecorderProcessor);`;
  },
  function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    __webpack_exports__["default"] = `function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import dependencies via preval.require so that they're available as values at compile time
var processorNames = {
  "recorderProcessor": "recorder-processor",
  "soundFileProcessor": "sound-file-processor",
  "amplitudeProcessor": "amplitude-processor"
};
var RingBuffer = {
  "default":
  /*#__PURE__*/
  function () {
    /**
     * @constructor
     * @param  {number} length Buffer length in frames.
     * @param  {number} channelCount Buffer channel count.
     */
    function RingBuffer(length, channelCount) {
      _classCallCheck(this, RingBuffer);

      this._readIndex = 0;
      this._writeIndex = 0;
      this._framesAvailable = 0;
      this._channelCount = channelCount;
      this._length = length;
      this._channelData = [];

      for (var i = 0; i < this._channelCount; ++i) {
        this._channelData[i] = new Float32Array(length);
      }
    }
    /**
     * Getter for Available frames in buffer.
     *
     * @return {number} Available frames in buffer.
     */


    _createClass(RingBuffer, [{
      key: "push",

      /**
       * Push a sequence of Float32Arrays to buffer.
       *
       * @param  {array} arraySequence A sequence of Float32Arrays.
       */
      value: function push(arraySequence) {
        // The channel count of arraySequence and the length of each channel must
        // match with this buffer obejct.
        // Transfer data from the |arraySequence| storage to the internal buffer.
        var sourceLength = arraySequence[0] ? arraySequence[0].length : 0;

        for (var i = 0; i < sourceLength; ++i) {
          var writeIndex = (this._writeIndex + i) % this._length;

          for (var channel = 0; channel < this._channelCount; ++channel) {
            this._channelData[channel][writeIndex] = arraySequence[channel][i];
          }
        }

        this._writeIndex += sourceLength;

        if (this._writeIndex >= this._length) {
          this._writeIndex = 0;
        } // For excessive frames, the buffer will be overwritten.


        this._framesAvailable += sourceLength;

        if (this._framesAvailable > this._length) {
          this._framesAvailable = this._length;
        }
      }
      /**
       * Pull data out of buffer and fill a given sequence of Float32Arrays.
       *
       * @param  {array} arraySequence An array of Float32Arrays.
       */

    }, {
      key: "pull",
      value: function pull(arraySequence) {
        // The channel count of arraySequence and the length of each channel must
        // match with this buffer obejct.
        // If the FIFO is completely empty, do nothing.
        if (this._framesAvailable === 0) {
          return;
        }

        var destinationLength = arraySequence[0].length; // Transfer data from the internal buffer to the |arraySequence| storage.

        for (var i = 0; i < destinationLength; ++i) {
          var readIndex = (this._readIndex + i) % this._length;

          for (var channel = 0; channel < this._channelCount; ++channel) {
            arraySequence[channel][i] = this._channelData[channel][readIndex];
          }
        }

        this._readIndex += destinationLength;

        if (this._readIndex >= this._length) {
          this._readIndex = 0;
        }

        this._framesAvailable -= destinationLength;

        if (this._framesAvailable < 0) {
          this._framesAvailable = 0;
        }
      }
    }, {
      key: "framesAvailable",
      get: function get() {
        return this._framesAvailable;
      }
    }]);

    return RingBuffer;
  }()
}["default"];

var SoundFileProcessor =
/*#__PURE__*/
function (_AudioWorkletProcesso) {
  _inherits(SoundFileProcessor, _AudioWorkletProcesso);

  function SoundFileProcessor(options) {
    var _this;

    _classCallCheck(this, SoundFileProcessor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SoundFileProcessor).call(this));
    var processorOptions = options.processorOptions || {};
    _this.bufferSize = processorOptions.bufferSize || 256;
    _this.inputRingBuffer = new RingBuffer(_this.bufferSize, 1);
    _this.inputRingBufferArraySequence = [new Float32Array(_this.bufferSize)];
    return _this;
  }

  _createClass(SoundFileProcessor, [{
    key: "process",
    value: function process(inputs) {
      var input = inputs[0]; // we only care about the first input channel, because that contains the position data

      this.inputRingBuffer.push([input[0]]);

      if (this.inputRingBuffer.framesAvailable >= this.bufferSize) {
        this.inputRingBuffer.pull(this.inputRingBufferArraySequence);
        var inputChannel = this.inputRingBufferArraySequence[0];
        var position = inputChannel[inputChannel.length - 1] || 0;
        this.port.postMessage({
          name: 'position',
          position: position
        });
      }

      return true;
    }
  }]);

  return SoundFileProcessor;
}(_wrapNativeSuper(AudioWorkletProcessor));

registerProcessor(processorNames.soundFileProcessor, SoundFileProcessor);`;
  },
  function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    __webpack_exports__["default"] = `function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import dependencies via preval.require so that they're available as values at compile time
var processorNames = {
  "recorderProcessor": "recorder-processor",
  "soundFileProcessor": "sound-file-processor",
  "amplitudeProcessor": "amplitude-processor"
};
var RingBuffer = {
  "default":
  /*#__PURE__*/
  function () {
    /**
     * @constructor
     * @param  {number} length Buffer length in frames.
     * @param  {number} channelCount Buffer channel count.
     */
    function RingBuffer(length, channelCount) {
      _classCallCheck(this, RingBuffer);

      this._readIndex = 0;
      this._writeIndex = 0;
      this._framesAvailable = 0;
      this._channelCount = channelCount;
      this._length = length;
      this._channelData = [];

      for (var i = 0; i < this._channelCount; ++i) {
        this._channelData[i] = new Float32Array(length);
      }
    }
    /**
     * Getter for Available frames in buffer.
     *
     * @return {number} Available frames in buffer.
     */


    _createClass(RingBuffer, [{
      key: "push",

      /**
       * Push a sequence of Float32Arrays to buffer.
       *
       * @param  {array} arraySequence A sequence of Float32Arrays.
       */
      value: function push(arraySequence) {
        // The channel count of arraySequence and the length of each channel must
        // match with this buffer obejct.
        // Transfer data from the |arraySequence| storage to the internal buffer.
        var sourceLength = arraySequence[0] ? arraySequence[0].length : 0;

        for (var i = 0; i < sourceLength; ++i) {
          var writeIndex = (this._writeIndex + i) % this._length;

          for (var channel = 0; channel < this._channelCount; ++channel) {
            this._channelData[channel][writeIndex] = arraySequence[channel][i];
          }
        }

        this._writeIndex += sourceLength;

        if (this._writeIndex >= this._length) {
          this._writeIndex = 0;
        } // For excessive frames, the buffer will be overwritten.


        this._framesAvailable += sourceLength;

        if (this._framesAvailable > this._length) {
          this._framesAvailable = this._length;
        }
      }
      /**
       * Pull data out of buffer and fill a given sequence of Float32Arrays.
       *
       * @param  {array} arraySequence An array of Float32Arrays.
       */

    }, {
      key: "pull",
      value: function pull(arraySequence) {
        // The channel count of arraySequence and the length of each channel must
        // match with this buffer obejct.
        // If the FIFO is completely empty, do nothing.
        if (this._framesAvailable === 0) {
          return;
        }

        var destinationLength = arraySequence[0].length; // Transfer data from the internal buffer to the |arraySequence| storage.

        for (var i = 0; i < destinationLength; ++i) {
          var readIndex = (this._readIndex + i) % this._length;

          for (var channel = 0; channel < this._channelCount; ++channel) {
            arraySequence[channel][i] = this._channelData[channel][readIndex];
          }
        }

        this._readIndex += destinationLength;

        if (this._readIndex >= this._length) {
          this._readIndex = 0;
        }

        this._framesAvailable -= destinationLength;

        if (this._framesAvailable < 0) {
          this._framesAvailable = 0;
        }
      }
    }, {
      key: "framesAvailable",
      get: function get() {
        return this._framesAvailable;
      }
    }]);

    return RingBuffer;
  }()
}["default"];

var AmplitudeProcessor =
/*#__PURE__*/
function (_AudioWorkletProcesso) {
  _inherits(AmplitudeProcessor, _AudioWorkletProcesso);

  function AmplitudeProcessor(options) {
    var _this;

    _classCallCheck(this, AmplitudeProcessor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AmplitudeProcessor).call(this));
    var processorOptions = options.processorOptions || {};
    _this.numOutputChannels = options.outputChannelCount || 1;
    _this.numInputChannels = processorOptions.numInputChannels || 2;
    _this.normalize = processorOptions.normalize || false;
    _this.smoothing = processorOptions.smoothing || 0;
    _this.bufferSize = processorOptions.bufferSize || 2048;
    _this.inputRingBuffer = new RingBuffer(_this.bufferSize, _this.numInputChannels);
    _this.outputRingBuffer = new RingBuffer(_this.bufferSize, _this.numOutputChannels);
    _this.inputRingBufferArraySequence = new Array(_this.numInputChannels).fill(null).map(function () {
      return new Float32Array(_this.bufferSize);
    });
    _this.stereoVol = [0, 0];
    _this.stereoVolNorm = [0, 0];
    _this.volMax = 0.001;

    _this.port.onmessage = function (event) {
      var data = event.data;

      if (data.name === 'toggleNormalize') {
        _this.normalize = data.normalize;
      } else if (data.name === 'smoothing') {
        _this.smoothing = Math.max(0, Math.min(1, data.smoothing));
      }
    };

    return _this;
  } // TO DO make this stereo / dependent on # of audio channels


  _createClass(AmplitudeProcessor, [{
    key: "process",
    value: function process(inputs, outputs) {
      var input = inputs[0];
      var output = outputs[0];
      var smoothing = this.smoothing;
      this.inputRingBuffer.push(input);

      if (this.inputRingBuffer.framesAvailable >= this.bufferSize) {
        this.inputRingBuffer.pull(this.inputRingBufferArraySequence);

        for (var channel = 0; channel < this.numInputChannels; ++channel) {
          var inputBuffer = this.inputRingBufferArraySequence[channel];
          var bufLength = inputBuffer.length;
          var sum = 0;

          for (var i = 0; i < bufLength; i++) {
            var x = inputBuffer[i];

            if (this.normalize) {
              sum += Math.max(Math.min(x / this.volMax, 1), -1) * Math.max(Math.min(x / this.volMax, 1), -1);
            } else {
              sum += x * x;
            }
          } // ... then take the square root of the sum.


          var rms = Math.sqrt(sum / bufLength);
          this.stereoVol[channel] = Math.max(rms, this.stereoVol[channel] * smoothing);
          this.volMax = Math.max(this.stereoVol[channel], this.volMax);
        } // calculate stero normalized volume and add volume from all channels together


        var volSum = 0;

        for (var index = 0; index < this.stereoVol.length; index++) {
          this.stereoVolNorm[index] = Math.max(Math.min(this.stereoVol[index] / this.volMax, 1), 0);
          volSum += this.stereoVol[index];
        } // volume is average of channels


        var volume = volSum / this.stereoVol.length; // normalized value

        var volNorm = Math.max(Math.min(volume / this.volMax, 1), 0);
        this.port.postMessage({
          name: 'amplitude',
          volume: volume,
          volNorm: volNorm,
          stereoVol: this.stereoVol,
          stereoVolNorm: this.stereoVolNorm
        }); // pass input through to output

        this.outputRingBuffer.push(this.inputRingBufferArraySequence);
      } // pull 128 frames out of the ring buffer
      // if the ring buffer does not have enough frames, the output will be silent


      this.outputRingBuffer.pull(output);
      return true;
    }
  }]);

  return AmplitudeProcessor;
}(_wrapNativeSuper(AudioWorkletProcessor));

registerProcessor(processorNames.amplitudeProcessor, AmplitudeProcessor);`;
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(17)], __WEBPACK_AMD_DEFINE_RESULT__ = function(o) {
      o.Frequency = function(e, t) {
        if (!(this instanceof o.Frequency))
          return new o.Frequency(e, t);
        o.TimeBase.call(this, e, t);
      }, o.extend(o.Frequency, o.TimeBase), o.Frequency.prototype._primaryExpressions = Object.create(o.TimeBase.prototype._primaryExpressions), o.Frequency.prototype._primaryExpressions.midi = { regexp: /^(\d+(?:\.\d+)?midi)/, method: function(e) {
        return this.midiToFrequency(e);
      } }, o.Frequency.prototype._primaryExpressions.note = { regexp: /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i, method: function(e, t) {
        var r = n[e.toLowerCase()] + 12 * (parseInt(t) + 1);
        return this.midiToFrequency(r);
      } }, o.Frequency.prototype._primaryExpressions.tr = { regexp: /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/, method: function(e, t, r) {
        var n2 = 1;
        return e && "0" !== e && (n2 *= this._beatsToUnits(this._timeSignature() * parseFloat(e))), t && "0" !== t && (n2 *= this._beatsToUnits(parseFloat(t))), r && "0" !== r && (n2 *= this._beatsToUnits(parseFloat(r) / 4)), n2;
      } }, o.Frequency.prototype.transpose = function(e) {
        return this._expr = function(e2, t) {
          return e2() * this.intervalToFrequencyRatio(t);
        }.bind(this, this._expr, e), this;
      }, o.Frequency.prototype.harmonize = function(e) {
        return this._expr = function(e2, t) {
          for (var r = e2(), n2 = [], o2 = 0; o2 < t.length; o2++)
            n2[o2] = r * this.intervalToFrequencyRatio(t[o2]);
          return n2;
        }.bind(this, this._expr, e), this;
      }, o.Frequency.prototype.toMidi = function() {
        return this.frequencyToMidi(this.valueOf());
      }, o.Frequency.prototype.toNote = function() {
        var e = this.valueOf(), t = Math.log(e / o.Frequency.A4) / Math.LN2, r = Math.round(12 * t) + 57, n2 = Math.floor(r / 12);
        return n2 < 0 && (r += -12 * n2), i[r % 12] + n2.toString();
      }, o.Frequency.prototype.toSeconds = function() {
        return 1 / this.valueOf();
      }, o.Frequency.prototype.toFrequency = function() {
        return this.valueOf();
      }, o.Frequency.prototype.toTicks = function() {
        var e = this._beatsToUnits(1), t = this.valueOf() / e;
        return Math.floor(t * o.Transport.PPQ);
      }, o.Frequency.prototype._frequencyToUnits = function(e) {
        return e;
      }, o.Frequency.prototype._ticksToUnits = function(e) {
        return 1 / (60 * e / (o.Transport.bpm.value * o.Transport.PPQ));
      }, o.Frequency.prototype._beatsToUnits = function(e) {
        return 1 / o.TimeBase.prototype._beatsToUnits.call(this, e);
      }, o.Frequency.prototype._secondsToUnits = function(e) {
        return 1 / e;
      }, o.Frequency.prototype._defaultUnits = "hz";
      var n = { cbb: -2, cb: -1, c: 0, "c#": 1, cx: 2, dbb: 0, db: 1, d: 2, "d#": 3, dx: 4, ebb: 2, eb: 3, e: 4, "e#": 5, ex: 6, fbb: 3, fb: 4, f: 5, "f#": 6, fx: 7, gbb: 5, gb: 6, g: 7, "g#": 8, gx: 9, abb: 7, ab: 8, a: 9, "a#": 10, ax: 11, bbb: 9, bb: 10, b: 11, "b#": 12, bx: 13 }, i = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
      return o.Frequency.A4 = 440, o.Frequency.prototype.midiToFrequency = function(e) {
        return o.Frequency.A4 * Math.pow(2, (e - 69) / 12);
      }, o.Frequency.prototype.frequencyToMidi = function(e) {
        return 69 + 12 * Math.log(e / o.Frequency.A4) / Math.LN2;
      }, o.Frequency;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(16)], __WEBPACK_AMD_DEFINE_RESULT__ = function(o) {
      return o.TransportTime = function(t, r) {
        if (!(this instanceof o.TransportTime))
          return new o.TransportTime(t, r);
        o.Time.call(this, t, r);
      }, o.extend(o.TransportTime, o.Time), o.TransportTime.prototype._unaryExpressions = Object.create(o.Time.prototype._unaryExpressions), o.TransportTime.prototype._unaryExpressions.quantize = { regexp: /^@/, method: function(t) {
        var r = this._secondsToTicks(t()), e = Math.ceil(o.Transport.ticks / r);
        return this._ticksToUnits(e * r);
      } }, o.TransportTime.prototype._secondsToTicks = function(t) {
        var r = t / this._beatsToUnits(1);
        return Math.round(r * o.Transport.PPQ);
      }, o.TransportTime.prototype.valueOf = function() {
        return this._secondsToTicks(this._expr()) + (this._plusNow ? o.Transport.ticks : 0);
      }, o.TransportTime.prototype.toTicks = function() {
        return this.valueOf();
      }, o.TransportTime.prototype.toSeconds = function() {
        return this._expr() + (this._plusNow ? o.Transport.seconds : 0);
      }, o.TransportTime.prototype.toFrequency = function() {
        return 1 / this.toSeconds();
      }, o.TransportTime;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(4), __webpack_require__(13), __webpack_require__(1), __webpack_require__(33), __webpack_require__(21), __webpack_require__(34), __webpack_require__(20), __webpack_require__(35), __webpack_require__(36), __webpack_require__(37)], __WEBPACK_AMD_DEFINE_RESULT__ = function(p) {
      "use strict";
      function r(e, n, r2) {
        var t2 = new e();
        return r2._eval(n[0]).connect(t2, 0, 0), r2._eval(n[1]).connect(t2, 0, 1), t2;
      }
      function t(e, n, r2) {
        var t2 = new e();
        return r2._eval(n[0]).connect(t2, 0, 0), t2;
      }
      function o(e) {
        return e ? parseFloat(e) : void 0;
      }
      function i(e) {
        return e && e.args ? parseFloat(e.args) : void 0;
      }
      return p.Expr = function() {
        var n = this._replacements(Array.prototype.slice.call(arguments)), e = this._parseInputs(n);
        this._nodes = [], this.input = new Array(e);
        for (var r2 = 0; r2 < e; r2++)
          this.input[r2] = this.context.createGain();
        var t2, o2 = this._parseTree(n);
        try {
          t2 = this._eval(o2);
        } catch (e2) {
          throw this._disposeNodes(), new Error("Tone.Expr: Could evaluate expression: " + n);
        }
        this.output = t2;
      }, p.extend(p.Expr, p.SignalBase), p.Expr._Expressions = { value: { signal: { regexp: /^\d+\.\d+|^\d+/, method: function(e) {
        return new p.Signal(o(e));
      } }, input: { regexp: /^\$\d/, method: function(e, n) {
        return n.input[o(e.substr(1))];
      } } }, glue: { "(": { regexp: /^\(/ }, ")": { regexp: /^\)/ }, ",": { regexp: /^,/ } }, func: { abs: { regexp: /^abs/, method: t.bind(this, p.Abs) }, mod: { regexp: /^mod/, method: function(e, n) {
        var r2 = i(e[1]), t2 = new p.Modulo(r2);
        return n._eval(e[0]).connect(t2), t2;
      } }, pow: { regexp: /^pow/, method: function(e, n) {
        var r2 = i(e[1]), t2 = new p.Pow(r2);
        return n._eval(e[0]).connect(t2), t2;
      } }, a2g: { regexp: /^a2g/, method: function(e, n) {
        var r2 = new p.AudioToGain();
        return n._eval(e[0]).connect(r2), r2;
      } } }, binary: { "+": { regexp: /^\+/, precedence: 1, method: r.bind(this, p.Add) }, "-": { regexp: /^\-/, precedence: 1, method: function(e, n) {
        return 1 === e.length ? t(p.Negate, e, n) : r(p.Subtract, e, n);
      } }, "*": { regexp: /^\*/, precedence: 0, method: r.bind(this, p.Multiply) } }, unary: { "-": { regexp: /^\-/, method: t.bind(this, p.Negate) }, "!": { regexp: /^\!/, method: t.bind(this, p.NOT) } } }, p.Expr.prototype._parseInputs = function(e) {
        var n = e.match(/\$\d/g), r2 = 0;
        if (null !== n)
          for (var t2 = 0; t2 < n.length; t2++) {
            var o2 = parseInt(n[t2].substr(1)) + 1;
            r2 = Math.max(r2, o2);
          }
        return r2;
      }, p.Expr.prototype._replacements = function(e) {
        for (var n = e.shift(), r2 = 0; r2 < e.length; r2++)
          n = n.replace(/\%/i, e[r2]);
        return n;
      }, p.Expr.prototype._tokenize = function(e) {
        for (var n = -1, r2 = []; 0 < e.length; ) {
          var t2 = o2(e = e.trim());
          r2.push(t2), e = e.substr(t2.value.length);
        }
        function o2(e2) {
          for (var n2 in p.Expr._Expressions) {
            var r3 = p.Expr._Expressions[n2];
            for (var t3 in r3) {
              var o3 = r3[t3], i2 = o3.regexp, a = e2.match(i2);
              if (null !== a)
                return { type: n2, value: a[0], method: o3.method };
            }
          }
          throw new SyntaxError("Tone.Expr: Unexpected token " + e2);
        }
        return { next: function() {
          return r2[++n];
        }, peek: function() {
          return r2[n + 1];
        } };
      }, p.Expr.prototype._parseTree = function(e) {
        var t2 = this._tokenize(e), a = this.isUndef.bind(this);
        function r2(e2, n) {
          return !a(e2) && "glue" === e2.type && e2.value === n;
        }
        function o2(e2, n, r3) {
          var t3 = p.Expr._Expressions[n];
          if (!a(e2))
            for (var o3 in t3) {
              var i3 = t3[o3];
              if (i3.regexp.test(e2.value)) {
                if (a(r3))
                  return true;
                if (i3.precedence === r3)
                  return true;
              }
            }
          return false;
        }
        function i2(e2) {
          var n;
          a(e2) && (e2 = 5), n = e2 < 0 ? function e3() {
            var n2, r4;
            n2 = t2.peek();
            if (o2(n2, "unary"))
              return n2 = t2.next(), r4 = e3(), { operator: n2.value, method: n2.method, args: [r4] };
            return s();
          }() : i2(e2 - 1);
          for (var r3 = t2.peek(); o2(r3, "binary", e2); )
            n = { operator: (r3 = t2.next()).value, method: r3.method, args: [n, i2(e2 - 1)] }, r3 = t2.peek();
          return n;
        }
        function s() {
          var e2, n;
          if (e2 = t2.peek(), a(e2))
            throw new SyntaxError("Tone.Expr: Unexpected termination of expression");
          if ("func" === e2.type)
            return function(e3) {
              var n2 = [];
              if (!r2(t2.next(), "("))
                throw new SyntaxError('Tone.Expr: Expected ( in a function call "' + e3.value + '"');
              r2(t2.peek(), ")") || (n2 = function() {
                var e4, n3 = [];
                for (; e4 = i2(), !a(e4) && (n3.push(e4), r2(t2.peek(), ",")); )
                  t2.next();
                return n3;
              }());
              if (r2(t2.next(), ")"))
                return { method: e3.method, args: n2, name };
              throw new SyntaxError('Tone.Expr: Expected ) in a function call "' + e3.value + '"');
            }(e2 = t2.next());
          if ("value" === e2.type)
            return { method: (e2 = t2.next()).method, args: e2.value };
          if (r2(e2, "(")) {
            if (t2.next(), n = i2(), !r2(e2 = t2.next(), ")"))
              throw new SyntaxError("Expected )");
            return n;
          }
          throw new SyntaxError("Tone.Expr: Parse error, cannot process token " + e2.value);
        }
        return i2();
      }, p.Expr.prototype._eval = function(e) {
        if (!this.isUndef(e)) {
          var n = e.method(e.args, this);
          return this._nodes.push(n), n;
        }
      }, p.Expr.prototype._disposeNodes = function() {
        for (var e = 0; e < this._nodes.length; e++) {
          var n = this._nodes[e];
          this.isFunction(n.dispose) ? n.dispose() : this.isFunction(n.disconnect) && n.disconnect(), n = null, this._nodes[e] = null;
        }
        this._nodes = null;
      }, p.Expr.prototype.dispose = function() {
        p.prototype.dispose.call(this), this._disposeNodes();
      }, p.Expr;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(21), __webpack_require__(13), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(e) {
      "use strict";
      return e.GreaterThan = function(t) {
        this.createInsOuts(2, 0), this._param = this.input[0] = new e.Subtract(t), this.input[1] = this._param.input[1], this._gtz = this.output = new e.GreaterThanZero(), this._param.connect(this._gtz);
      }, e.extend(e.GreaterThan, e.Signal), e.GreaterThan.prototype.dispose = function() {
        return e.prototype.dispose.call(this), this._param.dispose(), this._param = null, this._gtz.dispose(), this._gtz = null, this;
      }, e.GreaterThan;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(6), __webpack_require__(15)], __WEBPACK_AMD_DEFINE_RESULT__ = function(s) {
      "use strict";
      return s.Abs = function() {
        this._abs = this.input = this.output = new s.WaveShaper(function(s2) {
          return 0 === s2 ? 0 : Math.abs(s2);
        }, 127);
      }, s.extend(s.Abs, s.SignalBase), s.Abs.prototype.dispose = function() {
        return s.prototype.dispose.call(this), this._abs.dispose(), this._abs = null, this;
      }, s.Abs;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(6), __webpack_require__(1), __webpack_require__(13)], __WEBPACK_AMD_DEFINE_RESULT__ = function(i) {
      "use strict";
      return i.Modulo = function(t) {
        this.createInsOuts(1, 0), this._shaper = new i.WaveShaper(Math.pow(2, 16)), this._multiply = new i.Multiply(), this._subtract = this.output = new i.Subtract(), this._modSignal = new i.Signal(t), this.input.fan(this._shaper, this._subtract), this._modSignal.connect(this._multiply, 0, 0), this._shaper.connect(this._multiply, 0, 1), this._multiply.connect(this._subtract, 0, 1), this._setWaveShaper(t);
      }, i.extend(i.Modulo, i.SignalBase), i.Modulo.prototype._setWaveShaper = function(i2) {
        this._shaper.setMap(function(t) {
          return Math.floor((t + 1e-4) / i2);
        });
      }, Object.defineProperty(i.Modulo.prototype, "value", { get: function() {
        return this._modSignal.value;
      }, set: function(t) {
        this._modSignal.value = t, this._setWaveShaper(t);
      } }), i.Modulo.prototype.dispose = function() {
        return i.prototype.dispose.call(this), this._shaper.dispose(), this._shaper = null, this._multiply.dispose(), this._multiply = null, this._subtract.dispose(), this._subtract = null, this._modSignal.dispose(), this._modSignal = null, this;
      }, i.Modulo;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function(t) {
      "use strict";
      return t.Pow = function(e) {
        this._exp = this.defaultArg(e, 1), this._expScaler = this.input = this.output = new t.WaveShaper(this._expFunc(this._exp), 8192);
      }, t.extend(t.Pow, t.SignalBase), Object.defineProperty(t.Pow.prototype, "value", { get: function() {
        return this._exp;
      }, set: function(e) {
        this._exp = e, this._expScaler.setMap(this._expFunc(this._exp));
      } }), t.Pow.prototype._expFunc = function(t2) {
        return function(e) {
          return Math.pow(Math.abs(e), t2);
        };
      }, t.Pow.prototype.dispose = function() {
        return t.prototype.dispose.call(this), this._expScaler.dispose(), this._expScaler = null, this;
      }, t.Pow;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(6), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(n) {
      "use strict";
      return n.AudioToGain = function() {
        this._norm = this.input = this.output = new n.WaveShaper(function(n2) {
          return (n2 + 1) / 2;
        });
      }, n.extend(n.AudioToGain, n.SignalBase), n.AudioToGain.prototype.dispose = function() {
        return n.prototype.dispose.call(this), this._norm.dispose(), this._norm = null, this;
      }, n.AudioToGain;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function(e) {
      "use strict";
      return e.EqualPowerGain = function() {
        this._eqPower = this.input = this.output = new e.WaveShaper(function(e2) {
          return Math.abs(e2) < 1e-3 ? 0 : this.equalPowerScale(e2);
        }.bind(this), 4096);
      }, e.extend(e.EqualPowerGain, e.SignalBase), e.EqualPowerGain.prototype.dispose = function() {
        return e.prototype.dispose.call(this), this._eqPower.dispose(), this._eqPower = null, this;
      }, e.EqualPowerGain;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(19), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function(t) {
      "use strict";
      return t.TimelineState = function(e) {
        t.Timeline.call(this), this._initial = e;
      }, t.extend(t.TimelineState, t.Timeline), t.TimelineState.prototype.getValueAtTime = function(e) {
        var t2 = this.get(e);
        return null !== t2 ? t2.state : this._initial;
      }, t.TimelineState.prototype.setStateAtTime = function(e, t2) {
        this.add({ state: e, time: t2 });
      }, t.TimelineState;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  },
  function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    var audioworklet_polyfill = __webpack_require__(24);
    var shims = __webpack_require__(25);
    var audiocontext = __webpack_require__(3);
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var main_Main = function Main() {
      _classCallCheck(this, Main);
      this.input = audiocontext["a"].createGain();
      this.output = audiocontext["a"].createGain();
      this.limiter = audiocontext["a"].createDynamicsCompressor();
      this.limiter.threshold.value = -3;
      this.limiter.ratio.value = 20;
      this.limiter.knee.value = 1;
      this.audiocontext = audiocontext["a"];
      this.output.disconnect();
      this.input.connect(this.limiter);
      this.limiter.connect(this.output);
      this.meter = audiocontext["a"].createGain();
      this.fftMeter = audiocontext["a"].createGain();
      this.output.connect(this.meter);
      this.output.connect(this.fftMeter);
      this.output.connect(this.audiocontext.destination);
      this.soundArray = [];
      this.parts = [];
      this.extensions = [];
    };
    var p5sound = new main_Main();
    p5.prototype.getOutputVolume = function() {
      return p5sound.output.gain.value;
    };
    p5.prototype.outputVolume = function(vol) {
      var rampTime = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      var tFromNow = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
      if (typeof vol === "number") {
        var now = p5sound.audiocontext.currentTime;
        var currentVol = p5sound.output.gain.value;
        p5sound.output.gain.cancelScheduledValues(now + tFromNow);
        p5sound.output.gain.linearRampToValueAtTime(currentVol, now + tFromNow);
        p5sound.output.gain.linearRampToValueAtTime(vol, now + tFromNow + rampTime);
      } else if (vol) {
        vol.connect(p5sound.output.gain);
      } else {
        return p5sound.output.gain;
      }
    };
    p5.prototype.soundOut = p5.soundOut = p5sound;
    p5.soundOut._silentNode = p5sound.audiocontext.createGain();
    p5.soundOut._silentNode.gain.value = 0;
    p5.soundOut._silentNode.connect(p5sound.audiocontext.destination);
    var main = p5sound;
    var processorNames = __webpack_require__(5);
    var processorNames_default = __webpack_require__.n(processorNames);
    function _typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    function sampleRate() {
      return main.audiocontext.sampleRate;
    }
    function freqToMidi(f) {
      var mathlog2 = Math.log(f / 440) / Math.log(2);
      var m = Math.round(12 * mathlog2) + 69;
      return m;
    }
    function midiToFreq(m) {
      return 440 * Math.pow(2, (m - 69) / 12);
    }
    function noteToFreq(note) {
      if (typeof note !== "string") {
        return note;
      }
      var wholeNotes = {
        A: 21,
        B: 23,
        C: 24,
        D: 26,
        E: 28,
        F: 29,
        G: 31
      };
      var value = wholeNotes[note[0].toUpperCase()];
      var octave = ~~note.slice(-1);
      value += 12 * (octave - 1);
      switch (note[1]) {
        case "#":
          value += 1;
          break;
        case "b":
          value -= 1;
          break;
        default:
          break;
      }
      return midiToFreq(value);
    }
    function soundFormats() {
      main.extensions = [];
      for (var i = 0; i < arguments.length; i++) {
        arguments[i] = arguments[i].toLowerCase();
        if (["mp3", "wav", "ogg", "m4a", "aac"].indexOf(arguments[i]) > -1) {
          main.extensions.push(arguments[i]);
        } else {
          throw arguments[i] + " is not a valid sound format!";
        }
      }
    }
    function disposeSound() {
      for (var i = 0; i < main.soundArray.length; i++) {
        main.soundArray[i].dispose();
      }
    }
    function _checkFileFormats(paths) {
      var path;
      if (typeof paths === "string") {
        path = paths;
        var extTest = path.split(".").pop();
        if (["mp3", "wav", "ogg", "m4a", "aac"].indexOf(extTest) > -1) {
          if (!p5.prototype.isFileSupported(extTest)) {
            var pathSplit = path.split(".");
            var pathCore = pathSplit[pathSplit.length - 1];
            for (var _i = 0; _i < main.extensions.length; _i++) {
              var _extension = main.extensions[_i];
              var _supported = p5.prototype.isFileSupported(_extension);
              if (_supported) {
                pathCore = "";
                if (pathSplit.length === 2) {
                  pathCore += pathSplit[0];
                }
                for (var _i2 = 1; _i2 <= pathSplit.length - 2; _i2++) {
                  var p = pathSplit[_i2];
                  pathCore += "." + p;
                }
                path = pathCore += ".";
                path = path += _extension;
                break;
              }
            }
          }
        } else {
          for (var _i3 = 0; _i3 < main.extensions.length; _i3++) {
            var _extension2 = main.extensions[_i3];
            var _supported2 = p5.prototype.isFileSupported(_extension2);
            if (_supported2) {
              path = path + "." + _extension2;
              break;
            }
          }
        }
      } else if (_typeof(paths) === "object") {
        for (var i = 0; i < paths.length; i++) {
          var extension = paths[i].split(".").pop();
          var supported = p5.prototype.isFileSupported(extension);
          if (supported) {
            path = paths[i];
            break;
          }
        }
      }
      return path;
    }
    function _mathChain(o, math, thisChain, nextChain, type) {
      for (var i in o.mathOps) {
        if (o.mathOps[i] instanceof type) {
          o.mathOps[i].dispose();
          thisChain = i;
          if (thisChain < o.mathOps.length - 1) {
            nextChain = o.mathOps[i + 1];
          }
        }
      }
      o.mathOps[thisChain - 1].disconnect();
      o.mathOps[thisChain - 1].connect(math);
      math.connect(nextChain);
      o.mathOps[thisChain] = math;
      return o;
    }
    function convertToWav(audioBuffer) {
      var leftChannel, rightChannel;
      leftChannel = audioBuffer.getChannelData(0);
      if (audioBuffer.numberOfChannels > 1) {
        rightChannel = audioBuffer.getChannelData(1);
      } else {
        rightChannel = leftChannel;
      }
      var interleaved = interleave(leftChannel, rightChannel);
      var buffer = new window.ArrayBuffer(44 + interleaved.length * 2);
      var view = new window.DataView(buffer);
      writeUTFBytes(view, 0, "RIFF");
      view.setUint32(4, 36 + interleaved.length * 2, true);
      writeUTFBytes(view, 8, "WAVE");
      writeUTFBytes(view, 12, "fmt ");
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true);
      view.setUint16(22, 2, true);
      view.setUint32(24, main.audiocontext.sampleRate, true);
      view.setUint32(28, main.audiocontext.sampleRate * 4, true);
      view.setUint16(32, 4, true);
      view.setUint16(34, 16, true);
      writeUTFBytes(view, 36, "data");
      view.setUint32(40, interleaved.length * 2, true);
      var lng = interleaved.length;
      var index = 44;
      var volume = 1;
      for (var i = 0; i < lng; i++) {
        view.setInt16(index, interleaved[i] * (32767 * volume), true);
        index += 2;
      }
      return view;
    }
    function interleave(leftChannel, rightChannel) {
      var length = leftChannel.length + rightChannel.length;
      var result = new Float32Array(length);
      var inputIndex = 0;
      for (var index = 0; index < length; ) {
        result[index++] = leftChannel[inputIndex];
        result[index++] = rightChannel[inputIndex];
        inputIndex++;
      }
      return result;
    }
    function writeUTFBytes(view, offset, string) {
      var lng = string.length;
      for (var i = 0; i < lng; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    }
    function safeBufferSize(idealBufferSize) {
      var bufferSize = idealBufferSize;
      var tempAudioWorkletNode = new AudioWorkletNode(main.audiocontext, processorNames_default.a.soundFileProcessor);
      if (tempAudioWorkletNode instanceof ScriptProcessorNode) {
        bufferSize = tempAudioWorkletNode.bufferSize;
      }
      tempAudioWorkletNode.disconnect();
      tempAudioWorkletNode = null;
      return bufferSize;
    }
    function saveSound(soundFile, fileName) {
      var dataView = convertToWav(soundFile.buffer);
      p5.prototype.writeFile([dataView], fileName, "wav");
    }
    var CustomError = function CustomError2(name2, errorTrace, failedPath) {
      var err = new Error();
      var tempStack, splitStack;
      err.name = name2;
      err.originalStack = err.stack + errorTrace;
      tempStack = err.stack + errorTrace;
      err.failedPath = failedPath;
      splitStack = tempStack.split("\n").filter(function(ln) {
        return !ln.match(/(p5.|native code|globalInit)/g);
      });
      err.stack = splitStack.join("\n");
      return err;
    };
    var errorHandler = CustomError;
    var moduleSources = [__webpack_require__(27)["default"], __webpack_require__(28)["default"], __webpack_require__(29)["default"]];
    var audioWorklet_ac = main.audiocontext;
    var initializedAudioWorklets = false;
    function loadAudioWorkletModules() {
      return Promise.all(moduleSources.map(function(moduleSrc) {
        var blob = new Blob([moduleSrc], {
          type: "application/javascript"
        });
        var objectURL = URL.createObjectURL(blob);
        return audioWorklet_ac.audioWorklet.addModule(objectURL);
      }));
    }
    p5.prototype.registerMethod("init", function() {
      if (initializedAudioWorklets)
        return;
      if (!this.preload && !window.preload) {
        this.preload = function() {
        };
      }
      this._incrementPreload();
      var onWorkletModulesLoad = function() {
        initializedAudioWorklets = true;
        this._decrementPreload();
      }.bind(this);
      loadAudioWorkletModules().then(onWorkletModulesLoad);
    });
    function panner_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    var panner_ac = main.audiocontext;
    var panner;
    if (typeof panner_ac.createStereoPanner !== "undefined") {
      var Panner = function() {
        function Panner2(input, output) {
          panner_classCallCheck(this, Panner2);
          this.stereoPanner = this.input = panner_ac.createStereoPanner();
          input.connect(this.stereoPanner);
          this.stereoPanner.connect(output);
        }
        _createClass(Panner2, [{
          key: "pan",
          value: function pan(val, tFromNow) {
            var time = tFromNow || 0;
            var t = panner_ac.currentTime + time;
            this.stereoPanner.pan.linearRampToValueAtTime(val, t);
          }
        }, {
          key: "inputChannels",
          value: function inputChannels() {
          }
        }, {
          key: "connect",
          value: function connect(obj) {
            this.stereoPanner.connect(obj);
          }
        }, {
          key: "disconnect",
          value: function disconnect() {
            if (this.stereoPanner) {
              this.stereoPanner.disconnect();
            }
          }
        }]);
        return Panner2;
      }();
      panner = Panner;
    } else {
      var _Panner = function() {
        function _Panner2(input, output, numInputChannels) {
          panner_classCallCheck(this, _Panner2);
          this.input = panner_ac.createGain();
          input.connect(this.input);
          this.left = panner_ac.createGain();
          this.right = panner_ac.createGain();
          this.left.channelInterpretation = "discrete";
          this.right.channelInterpretation = "discrete";
          if (numInputChannels > 1) {
            this.splitter = panner_ac.createChannelSplitter(2);
            this.input.connect(this.splitter);
            this.splitter.connect(this.left, 1);
            this.splitter.connect(this.right, 0);
          } else {
            this.input.connect(this.left);
            this.input.connect(this.right);
          }
          this.output = panner_ac.createChannelMerger(2);
          this.left.connect(this.output, 0, 1);
          this.right.connect(this.output, 0, 0);
          this.output.connect(output);
        }
        _createClass(_Panner2, [{
          key: "pan",
          value: function pan(val, tFromNow) {
            var time = tFromNow || 0;
            var t = panner_ac.currentTime + time;
            var v = (val + 1) / 2;
            var rightVal = Math.cos(v * Math.PI / 2);
            var leftVal = Math.sin(v * Math.PI / 2);
            this.left.gain.linearRampToValueAtTime(leftVal, t);
            this.right.gain.linearRampToValueAtTime(rightVal, t);
          }
        }, {
          key: "inputChannels",
          value: function inputChannels(numChannels) {
            if (numChannels === 1) {
              this.input.disconnect();
              this.input.connect(this.left);
              this.input.connect(this.right);
            } else if (numChannels === 2) {
              if (typeof this.splitter === "undefined") {
                this.splitter = panner_ac.createChannelSplitter(2);
              }
              this.input.disconnect();
              this.input.connect(this.splitter);
              this.splitter.connect(this.left, 1);
              this.splitter.connect(this.right, 0);
            }
          }
        }, {
          key: "connect",
          value: function connect(obj) {
            this.output.connect(obj);
          }
        }, {
          key: "disconnect",
          value: function disconnect() {
            if (this.output) {
              this.output.disconnect();
            }
          }
        }]);
        return _Panner2;
      }();
      panner = _Panner;
    }
    var panner_0 = panner;
    function soundfile_typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        soundfile_typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        soundfile_typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return soundfile_typeof(obj);
    }
    function soundfile_defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function soundfile_createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        soundfile_defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        soundfile_defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function soundfile_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var soundfile_ac = main.audiocontext;
    var _createCounterBuffer = function _createCounterBuffer2(buffer) {
      var len = buffer.length;
      var audioBuf = soundfile_ac.createBuffer(1, buffer.length, soundfile_ac.sampleRate);
      var arrayBuffer = audioBuf.getChannelData(0);
      for (var index = 0; index < len; index++) {
        arrayBuffer[index] = index;
      }
      return audioBuf;
    };
    var Cue = function Cue2(callback, time, id, val) {
      soundfile_classCallCheck(this, Cue2);
      this.callback = callback;
      this.time = time;
      this.id = id;
      this.val = val;
    };
    function _clearOnEnd(e) {
      var thisBufferSourceNode = e.target;
      var soundFile = this;
      thisBufferSourceNode._playing = false;
      thisBufferSourceNode.removeEventListener("ended", soundFile._clearOnEnd);
      soundFile._onended(soundFile);
      soundFile.bufferSourceNodes.map(function(_, i) {
        return i;
      }).reverse().forEach(function(i) {
        var n = soundFile.bufferSourceNodes[i];
        if (n._playing === false) {
          soundFile.bufferSourceNodes.splice(i, 1);
        }
      });
      if (soundFile.bufferSourceNodes.length === 0) {
        soundFile._playing = false;
      }
    }
    var soundfile_SoundFile = function() {
      function SoundFile(paths, onload, onerror2, whileLoading) {
        soundfile_classCallCheck(this, SoundFile);
        if (typeof paths !== "undefined") {
          if (typeof paths === "string" || typeof paths[0] === "string") {
            var path = p5.prototype._checkFileFormats(paths);
            this.url = path;
          } else if (soundfile_typeof(paths) === "object") {
            if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
              throw "Unable to load file because the File API is not supported";
            }
          }
          if (paths.file) {
            paths = paths.file;
          }
          this.file = paths;
        }
        this._onended = function() {
        };
        this._looping = false;
        this._playing = false;
        this._paused = false;
        this._pauseTime = 0;
        this._cues = [];
        this._cueIDCounter = 0;
        this._lastPos = 0;
        this._counterNode = null;
        this._workletNode = null;
        this.bufferSourceNodes = [];
        this.bufferSourceNode = null;
        this.buffer = null;
        this.playbackRate = 1;
        this.input = main.audiocontext.createGain();
        this.output = main.audiocontext.createGain();
        this.reversed = false;
        this.startTime = 0;
        this.endTime = null;
        this.pauseTime = 0;
        this.mode = "sustain";
        this.startMillis = null;
        this.panPosition = 0;
        this.panner = new panner_0(this.output, main.input, 2);
        if (this.url || this.file) {
          this.load(onload, onerror2);
        }
        main.soundArray.push(this);
        if (typeof whileLoading === "function") {
          this._whileLoading = whileLoading;
        } else {
          this._whileLoading = function() {
          };
        }
        this._clearOnEnd = _clearOnEnd.bind(this);
        this.amp = this.setVolume;
        this.fade = this.setVolume;
      }
      soundfile_createClass(SoundFile, [{
        key: "load",
        value: function load(callback, errorCallback) {
          var self2 = this;
          var errorTrace = new Error().stack;
          if (this.url !== void 0 && this.url !== "") {
            var request = new XMLHttpRequest();
            request.addEventListener("progress", function(evt) {
              self2._updateProgress(evt);
            }, false);
            request.open("GET", this.url, true);
            request.responseType = "arraybuffer";
            request.onload = function() {
              if (request.status === 200) {
                if (!self2.panner)
                  return;
                soundfile_ac.decodeAudioData(
                  request.response,
                  function(buff) {
                    if (!self2.panner)
                      return;
                    self2.buffer = buff;
                    self2.panner.inputChannels(buff.numberOfChannels);
                    if (callback) {
                      callback(self2);
                    }
                  },
                  function() {
                    if (!self2.panner)
                      return;
                    var err2 = new errorHandler("decodeAudioData", errorTrace, self2.url);
                    var msg2 = "AudioContext error at decodeAudioData for " + self2.url;
                    if (errorCallback) {
                      err2.msg = msg2;
                      errorCallback(err2);
                    } else {
                      console.error(msg2 + "\n The error stack trace includes: \n" + err2.stack);
                    }
                  }
                );
              } else {
                if (!self2.panner)
                  return;
                var err = new errorHandler("loadSound", errorTrace, self2.url);
                var msg = "Unable to load " + self2.url + ". The request status was: " + request.status + " (" + request.statusText + ")";
                if (errorCallback) {
                  err.message = msg;
                  errorCallback(err);
                } else {
                  console.error(msg + "\n The error stack trace includes: \n" + err.stack);
                }
              }
            };
            request.onerror = function() {
              var err = new errorHandler("loadSound", errorTrace, self2.url);
              var msg = "There was no response from the server at " + self2.url + ". Check the url and internet connectivity.";
              if (errorCallback) {
                err.message = msg;
                errorCallback(err);
              } else {
                console.error(msg + "\n The error stack trace includes: \n" + err.stack);
              }
            };
            request.send();
          } else if (this.file !== void 0) {
            var reader = new FileReader();
            reader.onload = function() {
              if (!self2.panner)
                return;
              soundfile_ac.decodeAudioData(reader.result, function(buff) {
                if (!self2.panner)
                  return;
                self2.buffer = buff;
                self2.panner.inputChannels(buff.numberOfChannels);
                if (callback) {
                  callback(self2);
                }
              });
            };
            reader.onerror = function(e) {
              if (!self2.panner)
                return;
              if (onerror) {
                onerror(e);
              }
            };
            reader.readAsArrayBuffer(this.file);
          }
        }
      }, {
        key: "_updateProgress",
        value: function _updateProgress(evt) {
          if (evt.lengthComputable) {
            var percentComplete = evt.loaded / evt.total * 0.99;
            this._whileLoading(percentComplete, evt);
          } else {
            this._whileLoading("size unknown");
          }
        }
        /**
         *  Returns true if the sound file finished loading successfully.
         *
         *  @method  isLoaded
         *  @for p5.SoundFile
         *  @return {Boolean}
         */
      }, {
        key: "isLoaded",
        value: function isLoaded() {
          if (this.buffer) {
            return true;
          } else {
            return false;
          }
        }
        /**
         * Play the p5.SoundFile
         *
         * @method play
         * @for p5.SoundFile
         * @param {Number} [startTime]            (optional) schedule playback to start (in seconds from now).
         * @param {Number} [rate]             (optional) playback rate
         * @param {Number} [amp]              (optional) amplitude (volume)
         *                                     of playback
         * @param {Number} [cueStart]        (optional) cue start time in seconds
         * @param {Number} [duration]          (optional) duration of playback in seconds
         */
      }, {
        key: "play",
        value: function play(startTime, rate, amp, _cueStart, duration) {
          if (!this.output) {
            console.warn("SoundFile.play() called after dispose");
            return;
          }
          var now = main.audiocontext.currentTime;
          var cueStart, cueEnd;
          var time = startTime || 0;
          if (time < 0) {
            time = 0;
          }
          time = time + now;
          if (typeof rate !== "undefined") {
            this.rate(rate);
          }
          if (typeof amp !== "undefined") {
            this.setVolume(amp);
          }
          if (this.buffer) {
            this._pauseTime = 0;
            if (this.mode === "restart" && this.buffer && this.bufferSourceNode) {
              this.bufferSourceNode.stop(time);
              this._counterNode.stop(time);
            }
            if (this.mode === "untildone" && this.isPlaying()) {
              return;
            }
            this.bufferSourceNode = this._initSourceNode();
            delete this._counterNode;
            this._counterNode = this._initCounterNode();
            if (_cueStart) {
              if (_cueStart >= 0 && _cueStart < this.buffer.duration) {
                cueStart = _cueStart;
              } else {
                throw "start time out of range";
              }
            } else {
              cueStart = 0;
            }
            if (duration) {
              duration = duration <= this.buffer.duration - cueStart ? duration : this.buffer.duration;
            }
            if (this._paused) {
              this.bufferSourceNode.start(time, this.pauseTime, duration);
              this._counterNode.start(time, this.pauseTime, duration);
            } else {
              this.bufferSourceNode.start(time, cueStart, duration);
              this._counterNode.start(time, cueStart, duration);
            }
            this._playing = true;
            this._paused = false;
            this.bufferSourceNodes.push(this.bufferSourceNode);
            this.bufferSourceNode._arrayIndex = this.bufferSourceNodes.length - 1;
            this.bufferSourceNode.addEventListener("ended", this._clearOnEnd);
          } else {
            throw "not ready to play file, buffer has yet to load. Try preload()";
          }
          this.bufferSourceNode.loop = this._looping;
          this._counterNode.loop = this._looping;
          if (this._looping === true) {
            cueEnd = duration ? duration : cueStart - 1e-15;
            this.bufferSourceNode.loopStart = cueStart;
            this.bufferSourceNode.loopEnd = cueEnd;
            this._counterNode.loopStart = cueStart;
            this._counterNode.loopEnd = cueEnd;
          }
        }
        /**
         *  p5.SoundFile has two play modes: <code>restart</code> and
         *  <code>sustain</code>. Play Mode determines what happens to a
         *  p5.SoundFile if it is triggered while in the middle of playback.
         *  In sustain mode, playback will continue simultaneous to the
         *  new playback. In restart mode, play() will stop playback
         *  and start over. With untilDone, a sound will play only if it's
         *  not already playing. Sustain is the default mode.
         *
         *  @method  playMode
         *  @for p5.SoundFile
         *  @param  {String} str 'restart' or 'sustain' or 'untilDone'
         *  @example
         *  <div><code>
         *  let mySound;
         *  function preload(){
         *    mySound = loadSound('assets/Damscray_DancingTiger.mp3');
         *  }
         *  function setup() {
         *    let cnv = createCanvas(100, 100);
         *    cnv.mousePressed(canvasPressed);
         *    noFill();
         *    rect(0, height/2, width - 1, height/2 - 1);
         *    rect(0, 0, width - 1, height/2);
         *    textAlign(CENTER, CENTER);
         *    fill(20);
         *    text('restart', width/2, 1 * height/4);
         *    text('sustain', width/2, 3 * height/4);
         *  }
         *  function canvasPressed() {
         *    if (mouseX < height/2) {
         *      mySound.playMode('restart');
         *    } else {
         *      mySound.playMode('sustain');
         *    }
         *    mySound.play();
         *  }
         *
         * </code></div>
         */
      }, {
        key: "playMode",
        value: function playMode(str) {
          var s = str.toLowerCase();
          if (s === "restart" && this.buffer && this.bufferSourceNode) {
            for (var i = 0; i < this.bufferSourceNodes.length - 1; i++) {
              var now = main.audiocontext.currentTime;
              this.bufferSourceNodes[i].stop(now);
            }
          }
          if (s === "restart" || s === "sustain" || s === "untildone") {
            this.mode = s;
          } else {
            throw 'Invalid play mode. Must be either "restart" or "sustain"';
          }
        }
        /**
         *  Pauses a file that is currently playing. If the file is not
         *  playing, then nothing will happen.
         *
         *  After pausing, .play() will resume from the paused
         *  position.
         *  If p5.SoundFile had been set to loop before it was paused,
         *  it will continue to loop after it is unpaused with .play().
         *
         *  @method pause
         *  @for p5.SoundFile
         *  @param {Number} [startTime] (optional) schedule event to occur
         *                               seconds from now
         *  @example
         *  <div><code>
         *  let soundFile;
         *  function preload() {
         *    soundFormats('ogg', 'mp3');
         *    soundFile = loadSound('assets/Damscray_-_Dancing_Tiger_02.mp3');
         *  }
         *  function setup() {
         *    let cnv = createCanvas(100, 100);
         *    cnv.mousePressed(canvasPressed);
         *    background(220);
         *    text('tap to play, release to pause', 10, 20, width - 20);
         *  }
         *  function canvasPressed() {
         *    soundFile.loop();
         *    background(0, 200, 50);
         *  }
         *  function mouseReleased() {
         *    soundFile.pause();
         *    background(220);
         *  }
         *  </code>
         *  </div>
         */
      }, {
        key: "pause",
        value: function pause(startTime) {
          var now = main.audiocontext.currentTime;
          var time = startTime || 0;
          var pTime = time + now;
          if (this.isPlaying() && this.buffer && this.bufferSourceNode) {
            this._paused = true;
            this._playing = false;
            this.pauseTime = this.currentTime();
            this.bufferSourceNode.stop(pTime);
            this._counterNode.stop(pTime);
            this._pauseTime = this.currentTime();
          } else {
            this._pauseTime = 0;
          }
        }
        /**
         * Loop the p5.SoundFile. Accepts optional parameters to set the
         * playback rate, playback volume, loopStart, loopEnd.
         *
         * @method loop
         * @for p5.SoundFile
         * @param {Number} [startTime] (optional) schedule event to occur
         *                             seconds from now
         * @param {Number} [rate]        (optional) playback rate
         * @param {Number} [amp]         (optional) playback volume
         * @param {Number} [cueLoopStart] (optional) startTime in seconds
         * @param {Number} [duration]  (optional) loop duration in seconds
         * @example
         *  <div><code>
         *  let soundFile;
         *  let loopStart = 0.5;
         *  let loopDuration = 0.2;
         *  function preload() {
         *    soundFormats('ogg', 'mp3');
         *    soundFile = loadSound('assets/Damscray_-_Dancing_Tiger_02.mp3');
         *  }
         *  function setup() {
         *    let cnv = createCanvas(100, 100);
         *    cnv.mousePressed(canvasPressed);
         *    background(220);
         *    text('tap to play, release to pause', 10, 20, width - 20);
         *  }
         *  function canvasPressed() {
         *    soundFile.loop();
         *    background(0, 200, 50);
         *  }
         *  function mouseReleased() {
         *    soundFile.pause();
         *    background(220);
         *  }
         *  </code>
         *  </div>
         */
      }, {
        key: "loop",
        value: function loop(startTime, rate, amp, loopStart, duration) {
          this._looping = true;
          this.play(startTime, rate, amp, loopStart, duration);
        }
        /**
         * Set a p5.SoundFile's looping flag to true or false. If the sound
         * is currently playing, this change will take effect when it
         * reaches the end of the current playback.
         *
         * @method setLoop
         * @for p5.SoundFile
         * @param {Boolean} Boolean   set looping to true or false
         */
      }, {
        key: "setLoop",
        value: function setLoop(bool) {
          if (bool === true) {
            this._looping = true;
          } else if (bool === false) {
            this._looping = false;
          } else {
            throw "Error: setLoop accepts either true or false";
          }
          if (this.bufferSourceNode) {
            this.bufferSourceNode.loop = this._looping;
            this._counterNode.loop = this._looping;
          }
        }
        /**
         * Returns 'true' if a p5.SoundFile is currently looping and playing, 'false' if not.
         *
         * @method isLooping
         * @for p5.SoundFile
         * @return {Boolean}
         */
      }, {
        key: "isLooping",
        value: function isLooping() {
          if (!this.bufferSourceNode) {
            return false;
          }
          if (this._looping === true && this.isPlaying() === true) {
            return true;
          }
          return false;
        }
        /**
         *  Returns true if a p5.SoundFile is playing, false if not (i.e.
         *  paused or stopped).
         *
         *  @method isPlaying
         *  @for p5.SoundFile
         *  @return {Boolean}
         */
      }, {
        key: "isPlaying",
        value: function isPlaying() {
          return this._playing;
        }
        /**
         *  Returns true if a p5.SoundFile is paused, false if not (i.e.
         *  playing or stopped).
         *
         *  @method  isPaused
         *  @for p5.SoundFile
         *  @return {Boolean}
         */
      }, {
        key: "isPaused",
        value: function isPaused() {
          return this._paused;
        }
        /**
         * Stop soundfile playback.
         *
         * @method stop
         * @for p5.SoundFile
         * @param {Number} [startTime] (optional) schedule event to occur
         *                             in seconds from now
         */
      }, {
        key: "stop",
        value: function stop(timeFromNow) {
          var time = timeFromNow || 0;
          if (this.mode === "sustain" || this.mode === "untildone") {
            this.stopAll(time);
            this._playing = false;
            this.pauseTime = 0;
            this._paused = false;
          } else if (this.buffer && this.bufferSourceNode) {
            var now = main.audiocontext.currentTime;
            var t = time || 0;
            this.pauseTime = 0;
            this.bufferSourceNode.stop(now + t);
            this._counterNode.stop(now + t);
            this._playing = false;
            this._paused = false;
          }
        }
        /**
         *  Stop playback on all of this soundfile's sources.
         *  @private
         */
      }, {
        key: "stopAll",
        value: function stopAll(_time) {
          var now = main.audiocontext.currentTime;
          var time = _time || 0;
          if (this.buffer && this.bufferSourceNode) {
            for (var i in this.bufferSourceNodes) {
              var bufferSourceNode = this.bufferSourceNodes[i];
              if (bufferSourceNode) {
                try {
                  bufferSourceNode.stop(now + time);
                } catch (e) {
                }
              }
            }
            this._counterNode.stop(now + time);
          }
        }
      }, {
        key: "getVolume",
        value: function getVolume() {
          return this.output.gain.value;
        }
        /**
         * Set the stereo panning of a p5.sound object to
         * a floating point number between -1.0 (left) and 1.0 (right).
         * Default is 0.0 (center).
         *
         * @method pan
         * @for p5.SoundFile
         * @param {Number} [panValue]     Set the stereo panner
         * @param {Number} [timeFromNow]  schedule this event to happen
         *                                 seconds from now
         * @example
         * <div><code>
         *  let ballX = 0;
         *  let soundFile;
         *
         *  function preload() {
         *    soundFormats('ogg', 'mp3');
         *    soundFile = loadSound('assets/beatbox.mp3');
         *  }
         *
         *  function draw() {
         *    let cnv = createCanvas(100, 100);
         *    cnv.mousePressed(canvasPressed);
         *    background(220);
         *    ballX = constrain(mouseX, 0, width);
         *    ellipse(ballX, height/2, 20, 20);
         *  }
         *
         *  function canvasPressed(){
         *    // map the ball's x location to a panning degree
         *    // between -1.0 (left) and 1.0 (right)
         *    let panning = map(ballX, 0., width,-1.0, 1.0);
         *    soundFile.pan(panning);
         *    soundFile.play();
         *  }
         *  </div></code>
         */
      }, {
        key: "pan",
        value: function pan(pval, tFromNow) {
          this.panPosition = pval;
          this.panner.pan(pval, tFromNow);
        }
        /**
         * Returns the current stereo pan position (-1.0 to 1.0)
         *
         * @method getPan
         * @for p5.SoundFile
         * @return {Number} Returns the stereo pan setting of the Oscillator
         *                          as a number between -1.0 (left) and 1.0 (right).
         *                          0.0 is center and default.
         */
      }, {
        key: "getPan",
        value: function getPan() {
          return this.panPosition;
        }
        /**
         *  Set the playback rate of a sound file. Will change the speed and the pitch.
         *  Values less than zero will reverse the audio buffer.
         *
         *  @method rate
         *  @for p5.SoundFile
         *  @param {Number} [playbackRate]     Set the playback rate. 1.0 is normal,
         *                                     .5 is half-speed, 2.0 is twice as fast.
         *                                     Values less than zero play backwards.
         *  @example
         *  <div><code>
         *  let mySound;
         *
         *  function preload() {
         *    mySound = loadSound('assets/Damscray_DancingTiger.mp3');
         *  }
         *
         *  function setup() {
         *    let cnv = createCanvas(100, 100);
         *    cnv.mousePressed(canvasPressed);
         *  }
         *  function canvasPressed() {
         *    mySound.loop();
         *  }
         *  function mouseReleased() {
         *    mySound.pause();
         *  }
         *  function draw() {
         *    background(220);
         *
         *    // Set the rate to a range between 0.1 and 4
         *    // Changing the rate also alters the pitch
         *    let playbackRate = map(mouseY, 0.1, height, 2, 0);
         *    playbackRate = constrain(playbackRate, 0.01, 4);
         *    mySound.rate(playbackRate);
         *
         *    line(0, mouseY, width, mouseY);
         *    text('rate: ' + round(playbackRate * 100) + '%', 10, 20);
         *  }
         *
         * </code>
         * </div>
         *
         */
      }, {
        key: "rate",
        value: function rate(playbackRate) {
          var reverse = false;
          if (typeof playbackRate === "undefined") {
            return this.playbackRate;
          }
          this.playbackRate = playbackRate;
          if (playbackRate === 0) {
            playbackRate = 1e-13;
          } else if (playbackRate < 0 && !this.reversed) {
            playbackRate = Math.abs(playbackRate);
            reverse = true;
          } else if (playbackRate > 0 && this.reversed) {
            reverse = true;
          }
          if (this.bufferSourceNode) {
            var now = main.audiocontext.currentTime;
            this.bufferSourceNode.playbackRate.cancelScheduledValues(now);
            this.bufferSourceNode.playbackRate.linearRampToValueAtTime(Math.abs(playbackRate), now);
            this._counterNode.playbackRate.cancelScheduledValues(now);
            this._counterNode.playbackRate.linearRampToValueAtTime(Math.abs(playbackRate), now);
          }
          if (reverse) {
            this.reverseBuffer();
          }
          return this.playbackRate;
        }
      }, {
        key: "setPitch",
        value: function setPitch(num) {
          var newPlaybackRate = midiToFreq(num) / midiToFreq(60);
          this.rate(newPlaybackRate);
        }
      }, {
        key: "getPlaybackRate",
        value: function getPlaybackRate() {
          return this.playbackRate;
        }
        /**
         *  Multiply the output volume (amplitude) of a sound file
         *  between 0.0 (silence) and 1.0 (full volume).
         *  1.0 is the maximum amplitude of a digital sound, so multiplying
         *  by greater than 1.0 may cause digital distortion. To
         *  fade, provide a <code>rampTime</code> parameter. For more
         *  complex fades, see the Envelope class.
         *
         *  Alternately, you can pass in a signal source such as an
         *  oscillator to modulate the amplitude with an audio signal.
         *
         *  @method  setVolume
         *  @for p5.SoundFile
         *  @param {Number|Object} volume  Volume (amplitude) between 0.0
         *                                     and 1.0 or modulating signal/oscillator
         *  @param {Number} [rampTime]  Fade for t seconds
         *  @param {Number} [timeFromNow]  Schedule this event to happen at
         *                                 t seconds in the future
         */
      }, {
        key: "setVolume",
        value: function setVolume(vol, _rampTime, _tFromNow) {
          if (typeof vol === "number") {
            var rampTime = _rampTime || 0;
            var tFromNow = _tFromNow || 0;
            var now = main.audiocontext.currentTime;
            var currentVol = this.output.gain.value;
            this.output.gain.cancelScheduledValues(now + tFromNow);
            this.output.gain.linearRampToValueAtTime(currentVol, now + tFromNow);
            this.output.gain.linearRampToValueAtTime(vol, now + tFromNow + rampTime);
          } else if (vol) {
            vol.connect(this.output.gain);
          } else {
            return this.output.gain;
          }
        }
        /**
         * Returns the duration of a sound file in seconds.
         *
         * @method duration
         * @for p5.SoundFile
         * @return {Number} The duration of the soundFile in seconds.
         */
      }, {
        key: "duration",
        value: function duration() {
          if (this.buffer) {
            return this.buffer.duration;
          } else {
            return 0;
          }
        }
        /**
         * Return the current position of the p5.SoundFile playhead, in seconds.
         * Time is relative to the normal buffer direction, so if `reverseBuffer`
         * has been called, currentTime will count backwards.
         *
         * @method currentTime
         * @for p5.SoundFile
         * @return {Number}   currentTime of the soundFile in seconds.
         */
      }, {
        key: "currentTime",
        value: function currentTime() {
          return this.reversed ? Math.abs(this._lastPos - this.buffer.length) / soundfile_ac.sampleRate : this._lastPos / soundfile_ac.sampleRate;
        }
        /**
         * Move the playhead of a soundfile that is currently playing to a
         * new position and a new duration, in seconds.
         * If none are given, will reset the file to play entire duration
         * from start to finish. To set the position of a soundfile that is
         * not currently playing, use the `play` or `loop` methods.
         *
         * @method jump
         * @for p5.SoundFile
         * @param {Number} cueTime    cueTime of the soundFile in seconds.
         * @param {Number} duration    duration in seconds.
         */
      }, {
        key: "jump",
        value: function jump(cueTime, duration) {
          if (cueTime < 0 || cueTime > this.buffer.duration) {
            throw "jump time out of range";
          }
          if (duration > this.buffer.duration - cueTime) {
            throw "end time out of range";
          }
          var cTime = cueTime || 0;
          var dur = duration || void 0;
          if (this.isPlaying()) {
            this.stop(0);
            this.play(0, this.playbackRate, this.output.gain.value, cTime, dur);
          }
        }
        /**
         * Return the number of channels in a sound file.
         * For example, Mono = 1, Stereo = 2.
         *
         * @method channels
         * @for p5.SoundFile
         * @return {Number} [channels]
         */
      }, {
        key: "channels",
        value: function channels() {
          return this.buffer.numberOfChannels;
        }
        /**
         * Return the sample rate of the sound file.
         *
         * @method sampleRate
         * @for p5.SoundFile
         * @return {Number} [sampleRate]
         */
      }, {
        key: "sampleRate",
        value: function sampleRate2() {
          return this.buffer.sampleRate;
        }
        /**
         * Return the number of samples in a sound file.
         * Equal to sampleRate * duration.
         *
         * @method frames
         * @for p5.SoundFile
         * @return {Number} [sampleCount]
         */
      }, {
        key: "frames",
        value: function frames() {
          return this.buffer.length;
        }
        /**
         * Returns an array of amplitude peaks in a p5.SoundFile that can be
         * used to draw a static waveform. Scans through the p5.SoundFile's
         * audio buffer to find the greatest amplitudes. Accepts one
         * parameter, 'length', which determines size of the array.
         * Larger arrays result in more precise waveform visualizations.
         *
         * Inspired by Wavesurfer.js.
         *
         * @method  getPeaks
         * @for p5.SoundFile
         * @params {Number} [length] length is the size of the returned array.
         *                          Larger length results in more precision.
         *                          Defaults to 5*width of the browser window.
         * @returns {Float32Array} Array of peaks.
         */
      }, {
        key: "getPeaks",
        value: function getPeaks(length) {
          if (this.buffer) {
            if (!length) {
              length = window.width * 5;
            }
            if (this.buffer) {
              var buffer = this.buffer;
              var sampleSize = buffer.length / length;
              var sampleStep = ~~(sampleSize / 10) || 1;
              var channels = buffer.numberOfChannels;
              var peaks = new Float32Array(Math.round(length));
              for (var c = 0; c < channels; c++) {
                var chan = buffer.getChannelData(c);
                for (var i = 0; i < length; i++) {
                  var start = ~~(i * sampleSize);
                  var end = ~~(start + sampleSize);
                  var max = 0;
                  for (var j = start; j < end; j += sampleStep) {
                    var value = chan[j];
                    if (value > max) {
                      max = value;
                    } else if (-value > max) {
                      max = value;
                    }
                  }
                  if (c === 0 || Math.abs(max) > peaks[i]) {
                    peaks[i] = max;
                  }
                }
              }
              return peaks;
            }
          } else {
            throw "Cannot load peaks yet, buffer is not loaded";
          }
        }
        /**
         *  Reverses the p5.SoundFile's buffer source.
         *  Playback must be handled separately (see example).
         *
         *  @method  reverseBuffer
         *  @for p5.SoundFile
         *  @example
         *  <div><code>
         *  let drum;
         *  function preload() {
         *    drum = loadSound('assets/drum.mp3');
         *  }
         *
         *  function setup() {
         *    let cnv = createCanvas(100, 100);
         *    cnv.mousePressed(canvasPressed);
         *    background(220);
         *    text('tap to play', 20, 20);
         *  }
         *
         *  function canvasPressed() {
         *    drum.stop();
         *    drum.reverseBuffer();
         *    drum.play();
         *  }
         * </code>
         * </div>
         */
      }, {
        key: "reverseBuffer",
        value: function reverseBuffer() {
          if (this.buffer) {
            var currentPos = this._lastPos / soundfile_ac.sampleRate;
            var curVol = this.getVolume();
            this.setVolume(0, 1e-3);
            var numChannels = this.buffer.numberOfChannels;
            for (var i = 0; i < numChannels; i++) {
              this.buffer.getChannelData(i).reverse();
            }
            this.reversed = !this.reversed;
            if (this.isPlaying() && currentPos) {
              this.jump(this.duration() - currentPos);
            }
            this.setVolume(curVol, 1e-3);
          } else {
            throw "SoundFile is not done loading";
          }
        }
        /**
         *  Schedule an event to be called when the soundfile
         *  reaches the end of a buffer. If the soundfile is
         *  playing through once, this will be called when it
         *  ends. If it is looping, it will be called when
         *  stop is called.
         *
         *  @method  onended
         *  @for p5.SoundFile
         *  @param  {Function} callback function to call when the
         *                              soundfile has ended.
         */
      }, {
        key: "onended",
        value: function onended(callback) {
          this._onended = callback;
          return this;
        }
      }, {
        key: "add",
        value: function add() {
        }
      }, {
        key: "dispose",
        value: function dispose() {
          var now = main.audiocontext.currentTime;
          var index = main.soundArray.indexOf(this);
          main.soundArray.splice(index, 1);
          this.stop(now);
          if (this.buffer && this.bufferSourceNode) {
            for (var i = 0; i < this.bufferSourceNodes.length - 1; i++) {
              if (this.bufferSourceNodes[i] !== null) {
                this.bufferSourceNodes[i].disconnect();
                try {
                  this.bufferSourceNodes[i].stop(now);
                } catch (e) {
                  console.warn("no buffer source node to dispose");
                }
                this.bufferSourceNodes[i] = null;
              }
            }
            if (this.isPlaying()) {
              try {
                this._counterNode.stop(now);
              } catch (e) {
                console.log(e);
              }
              this._counterNode = null;
            }
          }
          if (this.output) {
            this.output.disconnect();
            this.output = null;
          }
          if (this.panner) {
            this.panner.disconnect();
            this.panner = null;
          }
        }
        /**
         * Connects the output of a p5sound object to input of another
         * p5.sound object. For example, you may connect a p5.SoundFile to an
         * FFT or an Effect. If no parameter is given, it will connect to
         * the main output. Most p5sound objects connect to the master
         * output when they are created.
         *
         * @method connect
         * @for p5.SoundFile
         * @param {Object} [object] Audio object that accepts an input
         */
      }, {
        key: "connect",
        value: function connect(unit) {
          if (!unit) {
            this.panner.connect(main.input);
          } else {
            if (unit.hasOwnProperty("input")) {
              this.panner.connect(unit.input);
            } else {
              this.panner.connect(unit);
            }
          }
        }
        /**
         * Disconnects the output of this p5sound object.
         *
         * @method disconnect
         * @for p5.SoundFile
         */
      }, {
        key: "disconnect",
        value: function disconnect() {
          if (this.panner) {
            this.panner.disconnect();
          }
        }
        /**
         */
      }, {
        key: "getLevel",
        value: function getLevel() {
          console.warn("p5.SoundFile.getLevel has been removed from the library. Use p5.Amplitude instead");
        }
        /**
         *  Reset the source for this SoundFile to a
         *  new path (URL).
         *
         *  @method  setPath
         *  @for p5.SoundFile
         *  @param {String}   path     path to audio file
         *  @param {Function} callback Callback
         */
      }, {
        key: "setPath",
        value: function setPath(p, callback) {
          var path = p5.prototype._checkFileFormats(p);
          this.url = path;
          this.load(callback);
        }
        /**
         *  Replace the current Audio Buffer with a new Buffer.
         *
         *  @method setBuffer
         *  @for p5.SoundFile
         *  @param {Array} buf Array of Float32 Array(s). 2 Float32 Arrays
         *                     will create a stereo source. 1 will create
         *                     a mono source.
         */
      }, {
        key: "setBuffer",
        value: function setBuffer(buf) {
          var numChannels = buf.length;
          var size = buf[0].length;
          var newBuffer = soundfile_ac.createBuffer(numChannels, size, soundfile_ac.sampleRate);
          if (!(buf[0] instanceof Float32Array)) {
            buf[0] = new Float32Array(buf[0]);
          }
          for (var channelNum = 0; channelNum < numChannels; channelNum++) {
            var channel = newBuffer.getChannelData(channelNum);
            channel.set(buf[channelNum]);
          }
          this.buffer = newBuffer;
          this.panner.inputChannels(numChannels);
        }
      }, {
        key: "_initCounterNode",
        value: function _initCounterNode() {
          var _this = this;
          var self2 = this;
          var now = soundfile_ac.currentTime;
          var cNode = soundfile_ac.createBufferSource();
          var workletBufferSize = safeBufferSize(256);
          if (self2._workletNode) {
            self2._workletNode.disconnect();
            delete self2._workletNode;
          }
          self2._workletNode = new AudioWorkletNode(soundfile_ac, processorNames_default.a.soundFileProcessor, {
            processorOptions: {
              bufferSize: workletBufferSize
            }
          });
          self2._workletNode.port.onmessage = function(event) {
            if (event.data.name === "position") {
              if (event.data.position === 0) {
                return;
              }
              _this._lastPos = event.data.position;
              _this._onTimeUpdate(self2._lastPos);
            }
          };
          cNode.buffer = _createCounterBuffer(self2.buffer);
          cNode.playbackRate.setValueAtTime(self2.playbackRate, now);
          cNode.connect(self2._workletNode);
          self2._workletNode.connect(p5.soundOut._silentNode);
          return cNode;
        }
      }, {
        key: "_initSourceNode",
        value: function _initSourceNode() {
          var bufferSourceNode = soundfile_ac.createBufferSource();
          bufferSourceNode.buffer = this.buffer;
          bufferSourceNode.playbackRate.value = this.playbackRate;
          bufferSourceNode.connect(this.output);
          return bufferSourceNode;
        }
      }, {
        key: "processPeaks",
        value: function processPeaks(callback, _initThreshold, _minThreshold, _minPeaks) {
          console.warn("processPeaks is deprecated");
        }
        /**
         *  Schedule events to trigger every time a MediaElement
         *  (audio/video) reaches a playback cue point.
         *
         *  Accepts a callback function, a time (in seconds) at which to trigger
         *  the callback, and an optional parameter for the callback.
         *
         *  Time will be passed as the first parameter to the callback function,
         *  and param will be the second parameter.
         *
         *
         *  @method  addCue
         *  @for p5.SoundFile
         *  @param {Number}   time     Time in seconds, relative to this media
         *                             element's playback. For example, to trigger
         *                             an event every time playback reaches two
         *                             seconds, pass in the number 2. This will be
         *                             passed as the first parameter to
         *                             the callback function.
         *  @param {Function} callback Name of a function that will be
         *                             called at the given time. The callback will
         *                             receive time and (optionally) param as its
         *                             two parameters.
         *  @param {Object} [value]    An object to be passed as the
         *                             second parameter to the
         *                             callback function.
         *  @return {Number} id ID of this cue,
         *                      useful for removeCue(id)
         *  @example
         *  <div><code>
         *  let mySound;
         *  function preload() {
         *    mySound = loadSound('assets/Damscray_DancingTiger.mp3');
         *  }
         *
         *  function setup() {
         *    let cnv = createCanvas(100, 100);
         *    cnv.mousePressed(canvasPressed);
         *    background(220);
         *    text('tap to play', 10, 20);
         *
         *    // schedule calls to changeText
         *    mySound.addCue(0, changeText, "hello" );
         *    mySound.addCue(0.5, changeText, "hello," );
         *    mySound.addCue(1, changeText, "hello, p5!");
         *    mySound.addCue(1.5, changeText, "hello, p5!!");
         *    mySound.addCue(2, changeText, "hello, p5!!!!!");
         *  }
         *
         *  function changeText(val) {
         *    background(220);
         *    text(val, 10, 20);
         *  }
         *
         *  function canvasPressed() {
         *    mySound.play();
         *  }
         *  </code></div>
         */
      }, {
        key: "addCue",
        value: function addCue(time, callback, val) {
          var id = this._cueIDCounter++;
          var cue = new Cue(callback, time, id, val);
          this._cues.push(cue);
          return id;
        }
        /**
         *  Remove a callback based on its ID. The ID is returned by the
         *  addCue method.
         *
         *  @method removeCue
         *  @for p5.SoundFile
         *  @param  {Number} id ID of the cue, as returned by addCue
         */
      }, {
        key: "removeCue",
        value: function removeCue(id) {
          var cueLength = this._cues.length;
          for (var i = 0; i < cueLength; i++) {
            var cue = this._cues[i];
            if (cue.id === id) {
              this._cues.splice(i, 1);
              break;
            }
          }
          if (this._cues.length === 0) {
          }
        }
        /**
         *  Remove all of the callbacks that had originally been scheduled
         *  via the addCue method.
         *
         *  @method  clearCues
         */
      }, {
        key: "clearCues",
        value: function clearCues() {
          this._cues = [];
        }
      }, {
        key: "_onTimeUpdate",
        value: function _onTimeUpdate(position) {
          var playbackTime = position / this.buffer.sampleRate;
          var cueLength = this._cues.length;
          for (var i = 0; i < cueLength; i++) {
            var cue = this._cues[i];
            var callbackTime = cue.time;
            var val = cue.val;
            var leftLimit = this._prevUpdateTime || 0;
            var rightLimit = playbackTime;
            if (leftLimit <= callbackTime && callbackTime <= rightLimit) {
              cue.callback(val);
            }
          }
          this._prevUpdateTime = playbackTime;
        }
        /**
         * Save a p5.SoundFile as a .wav file. The browser will prompt the user
         * to download the file to their device. To upload a file to a server, see
         * <a href="/reference/#/p5.SoundFile/getBlob">getBlob</a>
         *
         * @method save
         * @for p5.SoundFile
         * @param  {String} [fileName]      name of the resulting .wav file.
         * @example
         *  <div><code>
         *  let mySound;
         *  function preload() {
         *    mySound = loadSound('assets/doorbell.mp3');
         *  }
         *  function setup() {
         *    let cnv = createCanvas(100, 100);
         *    cnv.mousePressed(canvasPressed);
         *    background(220);
         *    text('tap to download', 10, 20);
         *  }
         *
         *  function canvasPressed() {
         *    mySound.save('my cool filename');
         *  }
         * </code></div>
         */
      }, {
        key: "save",
        value: function save(fileName) {
          p5.prototype.saveSound(this, fileName, "wav");
        }
        /**
         * This method is useful for sending a SoundFile to a server. It returns the
         * .wav-encoded audio data as a "<a target="_blank" title="Blob reference at
         * MDN" href="https://developer.mozilla.org/en-US/docs/Web/API/Blob">Blob</a>".
         * A Blob is a file-like data object that can be uploaded to a server
         * with an <a href="/reference/#/p5/httpDo">http</a> request. We'll
         * use the `httpDo` options object to send a POST request with some
         * specific options: we encode the request as `multipart/form-data`,
         * and attach the blob as one of the form values using `FormData`.
         *
         *
         * @method getBlob
         * @for p5.SoundFile
         * @returns {Blob} A file-like data object
         * @example
         *  <div><code>
         *  function preload() {
         *    mySound = loadSound('assets/doorbell.mp3');
         *  }
         *
         *  function setup() {
         *    noCanvas();
         *    let soundBlob = mySound.getBlob();
         *
         *    // Now we can send the blob to a server...
         *    let serverUrl = 'https://jsonplaceholder.typicode.com/posts';
         *    let httpRequestOptions = {
         *      method: 'POST',
         *      body: new FormData().append('soundBlob', soundBlob),
         *      headers: new Headers({
         *        'Content-Type': 'multipart/form-data'
         *      })
         *    };
         *    httpDo(serverUrl, httpRequestOptions);
         *
         *    // We can also create an `ObjectURL` pointing to the Blob
         *    let blobUrl = URL.createObjectURL(soundBlob);
         *
         *    // The `<Audio>` Element accepts Object URL's
         *    createAudio(blobUrl).showControls();
         *
         *    createDiv();
         *
         *    // The ObjectURL exists as long as this tab is open
         *    let input = createInput(blobUrl);
         *    input.attribute('readonly', true);
         *    input.mouseClicked(function() { input.elt.select() });
         *  }
         *
         * </code></div>
         */
      }, {
        key: "getBlob",
        value: function getBlob() {
          var dataView = convertToWav(this.buffer);
          return new Blob([dataView], {
            type: "audio/wav"
          });
        }
      }]);
      return SoundFile;
    }();
    function loadSound(path, callback, onerror2, whileLoading) {
      if (window.location.origin.indexOf("file://") > -1 && window.cordova === "undefined") {
        window.alert("This sketch may require a server to load external files. Please see http://bit.ly/1qcInwS");
      }
      var self2 = this;
      var s = new soundfile_SoundFile(path, function() {
        if (typeof callback === "function") {
          callback.apply(self2, arguments);
        }
        if (typeof self2._decrementPreload === "function") {
          self2._decrementPreload();
        }
      }, onerror2, whileLoading);
      return s;
    }
    var soundfile = soundfile_SoundFile;
    function amplitude_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function amplitude_defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function amplitude_createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        amplitude_defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        amplitude_defineProperties(Constructor, staticProps);
      return Constructor;
    }
    var amplitude_Amplitude = function() {
      function Amplitude(smoothing) {
        amplitude_classCallCheck(this, Amplitude);
        this.bufferSize = safeBufferSize(2048);
        this.audiocontext = main.audiocontext;
        this._workletNode = new AudioWorkletNode(this.audiocontext, processorNames_default.a.amplitudeProcessor, {
          outputChannelCount: [1],
          parameterData: {
            smoothing: smoothing || 0
          },
          processorOptions: {
            normalize: false,
            smoothing: smoothing || 0,
            numInputChannels: 2,
            bufferSize: this.bufferSize
          }
        });
        this._workletNode.port.onmessage = function(event) {
          if (event.data.name === "amplitude") {
            this.volume = event.data.volume;
            this.volNorm = event.data.volNorm;
            this.stereoVol = event.data.stereoVol;
            this.stereoVolNorm = event.data.stereoVolNorm;
          }
        }.bind(this);
        this.input = this._workletNode;
        this.output = this.audiocontext.createGain();
        this.volume = 0;
        this.volNorm = 0;
        this.stereoVol = [0, 0];
        this.stereoVolNorm = [0, 0];
        this.normalize = false;
        this._workletNode.connect(this.output);
        this.output.gain.value = 0;
        this.output.connect(this.audiocontext.destination);
        main.meter.connect(this._workletNode);
        main.soundArray.push(this);
      }
      amplitude_createClass(Amplitude, [{
        key: "setInput",
        value: function setInput(source, smoothing) {
          main.meter.disconnect();
          if (smoothing) {
            this._workletNode.parameters.get("smoothing").value = smoothing;
          }
          if (source == null) {
            console.log("Amplitude input source is not ready! Connecting to main output instead");
            main.meter.connect(this._workletNode);
          } else if (source) {
            source.connect(this._workletNode);
            this._workletNode.disconnect();
            this._workletNode.connect(this.output);
          } else {
            main.meter.connect(this._workletNode);
          }
        }
      }, {
        key: "connect",
        value: function connect(unit) {
          if (unit) {
            if (unit.hasOwnProperty("input")) {
              this.output.connect(unit.input);
            } else {
              this.output.connect(unit);
            }
          } else {
            this.output.connect(this.panner.connect(main.input));
          }
        }
      }, {
        key: "disconnect",
        value: function disconnect() {
          if (this.output) {
            this.output.disconnect();
          }
        }
        /**
         *  Returns a single Amplitude reading at the moment it is called.
         *  For continuous readings, run in the draw loop.
         *
         *  @method getLevel
         *  @for p5.Amplitude
         *  @param {Number} [channel] Optionally return only channel 0 (left) or 1 (right)
         *  @return {Number}       Amplitude as a number between 0.0 and 1.0
         *  @example
         *  <div><code>
         *  function preload(){
         *    sound = loadSound('assets/beat.mp3');
         *  }
         *
         *  function setup() {
         *    let cnv = createCanvas(100, 100);
         *    cnv.mouseClicked(toggleSound);
         *    amplitude = new p5.Amplitude();
         *  }
         *
         *  function draw() {
         *    background(220, 150);
         *    textAlign(CENTER);
         *    text('tap to play', width/2, 20);
         *
         *    let level = amplitude.getLevel();
         *    let size = map(level, 0, 1, 0, 200);
         *    ellipse(width/2, height/2, size, size);
         *  }
         *
         *  function toggleSound(){
         *    if (sound.isPlaying()) {
         *      sound.stop();
         *    } else {
         *      sound.play();
         *    }
         *  }
         *  </code></div>
         */
      }, {
        key: "getLevel",
        value: function getLevel(channel) {
          if (typeof channel !== "undefined") {
            if (this.normalize) {
              return this.stereoVolNorm[channel];
            } else {
              return this.stereoVol[channel];
            }
          } else if (this.normalize) {
            return this.volNorm;
          } else {
            return this.volume;
          }
        }
        /**
         * Determines whether the results of Amplitude.process() will be
         * Normalized. To normalize, Amplitude finds the difference the
         * loudest reading it has processed and the maximum amplitude of
         * 1.0. Amplitude adds this difference to all values to produce
         * results that will reliably map between 0.0 and 1.0. However,
         * if a louder moment occurs, the amount that Normalize adds to
         * all the values will change. Accepts an optional boolean parameter
         * (true or false). Normalizing is off by default.
         *
         * @method toggleNormalize
         * @for p5.Amplitude
         * @param {boolean} [boolean] set normalize to true (1) or false (0)
         */
      }, {
        key: "toggleNormalize",
        value: function toggleNormalize(bool) {
          if (typeof bool === "boolean") {
            this.normalize = bool;
          } else {
            this.normalize = !this.normalize;
          }
          this._workletNode.port.postMessage({
            name: "toggleNormalize",
            normalize: this.normalize
          });
        }
        /**
         *  Smooth Amplitude analysis by averaging with the last analysis
         *  frame. Off by default.
         *
         *  @method smooth
         *  @for p5.Amplitude
         *  @param {Number} set smoothing from 0.0 <= 1
         */
      }, {
        key: "smooth",
        value: function smooth(s) {
          if (s >= 0 && s < 1) {
            this._workletNode.port.postMessage({
              name: "smoothing",
              smoothing: s
            });
          } else {
            console.log("Error: smoothing must be between 0 and 1");
          }
        }
      }, {
        key: "dispose",
        value: function dispose() {
          var index = main.soundArray.indexOf(this);
          main.soundArray.splice(index, 1);
          if (this.input) {
            this.input.disconnect();
            delete this.input;
          }
          if (this.output) {
            this.output.disconnect();
            delete this.output;
          }
          this._workletNode.disconnect();
          delete this._workletNode;
        }
      }]);
      return Amplitude;
    }();
    var amplitude = amplitude_Amplitude;
    function fft_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function fft_defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function fft_createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        fft_defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        fft_defineProperties(Constructor, staticProps);
      return Constructor;
    }
    var fft_FFT = function() {
      function FFT(smoothing, bins) {
        fft_classCallCheck(this, FFT);
        this.input = this.analyser = main.audiocontext.createAnalyser();
        Object.defineProperties(this, {
          bins: {
            get: function get() {
              return this.analyser.fftSize / 2;
            },
            set: function set(b) {
              this.analyser.fftSize = b * 2;
            },
            configurable: true,
            enumerable: true
          },
          smoothing: {
            get: function get() {
              return this.analyser.smoothingTimeConstant;
            },
            set: function set(s) {
              this.analyser.smoothingTimeConstant = s;
            },
            configurable: true,
            enumerable: true
          }
        });
        this.smooth(smoothing);
        this.bins = bins || 1024;
        main.fftMeter.connect(this.analyser);
        this.freqDomain = new Uint8Array(this.analyser.frequencyBinCount);
        this.timeDomain = new Uint8Array(this.analyser.frequencyBinCount);
        this.bass = [20, 140];
        this.lowMid = [140, 400];
        this.mid = [400, 2600];
        this.highMid = [2600, 5200];
        this.treble = [5200, 14e3];
        main.soundArray.push(this);
      }
      fft_createClass(FFT, [{
        key: "setInput",
        value: function setInput(source) {
          if (!source) {
            main.fftMeter.connect(this.analyser);
          } else {
            if (source.output) {
              source.output.connect(this.analyser);
            } else if (source.connect) {
              source.connect(this.analyser);
            }
            main.fftMeter.disconnect();
          }
        }
        /**
         *  Returns an array of amplitude values (between -1.0 and +1.0) that represent
         *  a snapshot of amplitude readings in a single buffer. Length will be
         *  equal to bins (defaults to 1024). Can be used to draw the waveform
         *  of a sound.
         *
         *  @method waveform
         *  @for p5.FFT
         *  @param {Number} [bins]    Must be a power of two between
         *                            16 and 1024. Defaults to 1024.
         *  @param {String} [precision] If any value is provided, will return results
         *                              in a Float32 Array which is more precise
         *                              than a regular array.
         *  @return {Array}  Array    Array of amplitude values (-1 to 1)
         *                            over time. Array length = bins.
         *
         */
      }, {
        key: "waveform",
        value: function waveform() {
          var bins, mode;
          var normalArray = new Array();
          for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] === "number") {
              bins = arguments[i];
              this.analyser.fftSize = bins * 2;
            }
            if (typeof arguments[i] === "string") {
              mode = arguments[i];
            }
          }
          if (mode && !p5.prototype._isSafari()) {
            timeToFloat(this, this.timeDomain);
            this.analyser.getFloatTimeDomainData(this.timeDomain);
            return this.timeDomain;
          } else {
            timeToInt(this, this.timeDomain);
            this.analyser.getByteTimeDomainData(this.timeDomain);
            for (var j = 0; j < this.timeDomain.length; j++) {
              var scaled = p5.prototype.map(this.timeDomain[j], 0, 255, -1, 1);
              normalArray.push(scaled);
            }
            return normalArray;
          }
        }
        /**
         *  Returns an array of amplitude values (between 0 and 255)
         *  across the frequency spectrum. Length is equal to FFT bins
         *  (1024 by default). The array indices correspond to frequencies
         *  (i.e. pitches), from the lowest to the highest that humans can
         *  hear. Each value represents amplitude at that slice of the
         *  frequency spectrum. Must be called prior to using
         *  <code>getEnergy()</code>.
         *
         *  @method analyze
         *  @for p5.FFT
         *  @param {Number} [bins]    Must be a power of two between
         *                             16 and 1024. Defaults to 1024.
         *  @param {Number} [scale]    If "dB," returns decibel
         *                             float measurements between
         *                             -140 and 0 (max).
         *                             Otherwise returns integers from 0-255.
         *  @return {Array} spectrum    Array of energy (amplitude/volume)
         *                              values across the frequency spectrum.
         *                              Lowest energy (silence) = 0, highest
         *                              possible is 255.
         *  @example
         *  <div><code>
         *  let osc, fft;
         *
         *  function setup(){
         *    let cnv = createCanvas(100,100);
         *    cnv.mousePressed(startSound);
         *    osc = new p5.Oscillator();
         *    osc.amp(0);
         *    fft = new p5.FFT();
         *  }
         *
         *  function draw(){
         *    background(220);
         *
         *    let freq = map(mouseX, 0, windowWidth, 20, 10000);
         *    freq = constrain(freq, 1, 20000);
         *    osc.freq(freq);
         *
         *    let spectrum = fft.analyze();
         *    noStroke();
         *    fill(255, 0, 255);
         *    for (let i = 0; i< spectrum.length; i++){
         *      let x = map(i, 0, spectrum.length, 0, width);
         *      let h = -height + map(spectrum[i], 0, 255, height, 0);
         *      rect(x, height, width / spectrum.length, h );
         *    }
         *
         *    stroke(255);
         *    if (!osc.started) {
         *      text('tap here and drag to change frequency', 10, 20, width - 20);
         *    } else {
         *      text(round(freq)+'Hz', 10, 20);
         *    }
         *  }
         *
         *  function startSound() {
         *    osc.start();
         *    osc.amp(0.5, 0.2);
         *  }
         *
         *  function mouseReleased() {
         *    osc.amp(0, 0.2);
         *  }
         *  </code></div>
         *
         *
         */
      }, {
        key: "analyze",
        value: function analyze() {
          var mode;
          for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] === "number") {
              this.bins = arguments[i];
              this.analyser.fftSize = this.bins * 2;
            }
            if (typeof arguments[i] === "string") {
              mode = arguments[i];
            }
          }
          if (mode && mode.toLowerCase() === "db") {
            freqToFloat(this);
            this.analyser.getFloatFrequencyData(this.freqDomain);
            return this.freqDomain;
          } else {
            freqToInt(this, this.freqDomain);
            this.analyser.getByteFrequencyData(this.freqDomain);
            var normalArray = Array.apply([], this.freqDomain);
            return normalArray;
          }
        }
        /**
         *  Returns the amount of energy (volume) at a specific
         *  <a href="https://en.wikipedia.org/wiki/Audio_frequency" target="_blank">
         *  frequency</a>, or the average amount of energy between two
         *  frequencies. Accepts Number(s) corresponding
         *  to frequency (in Hz), or a "string" corresponding to predefined
         *  frequency ranges ("bass", "lowMid", "mid", "highMid", "treble").
         *  Returns a range between 0 (no energy/volume at that frequency) and
         *  255 (maximum energy).
         *  <em>NOTE: analyze() must be called prior to getEnergy(). analyze()
         *  tells the FFT to analyze frequency data, and getEnergy() uses
         *  the results to determine the value at a specific frequency or
         *  range of frequencies.</em></p>
         *
         *  @method  getEnergy
         *  @for p5.FFT
         *  @param  {Number|String} frequency1   Will return a value representing
         *                                energy at this frequency. Alternately,
         *                                the strings "bass", "lowMid" "mid",
         *                                "highMid", and "treble" will return
         *                                predefined frequency ranges.
         *  @param  {Number} [frequency2] If a second frequency is given,
         *                                will return average amount of
         *                                energy that exists between the
         *                                two frequencies.
         *  @return {Number}   Energy   Energy (volume/amplitude) from
         *                              0 and 255.
         *
         */
      }, {
        key: "getEnergy",
        value: function getEnergy(frequency1, frequency2) {
          var nyquist = main.audiocontext.sampleRate / 2;
          if (frequency1 === "bass") {
            frequency1 = this.bass[0];
            frequency2 = this.bass[1];
          } else if (frequency1 === "lowMid") {
            frequency1 = this.lowMid[0];
            frequency2 = this.lowMid[1];
          } else if (frequency1 === "mid") {
            frequency1 = this.mid[0];
            frequency2 = this.mid[1];
          } else if (frequency1 === "highMid") {
            frequency1 = this.highMid[0];
            frequency2 = this.highMid[1];
          } else if (frequency1 === "treble") {
            frequency1 = this.treble[0];
            frequency2 = this.treble[1];
          }
          if (typeof frequency1 !== "number") {
            throw "invalid input for getEnergy()";
          } else if (!frequency2) {
            var index = Math.round(frequency1 / nyquist * this.freqDomain.length);
            return this.freqDomain[index];
          } else if (frequency1 && frequency2) {
            if (frequency1 > frequency2) {
              var swap = frequency2;
              frequency2 = frequency1;
              frequency1 = swap;
            }
            var lowIndex = Math.round(frequency1 / nyquist * this.freqDomain.length);
            var highIndex = Math.round(frequency2 / nyquist * this.freqDomain.length);
            var total = 0;
            var numFrequencies = 0;
            for (var i = lowIndex; i <= highIndex; i++) {
              total += this.freqDomain[i];
              numFrequencies += 1;
            }
            var toReturn = total / numFrequencies;
            return toReturn;
          } else {
            throw "invalid input for getEnergy()";
          }
        }
      }, {
        key: "getFreq",
        value: function getFreq(freq1, freq2) {
          console.log("getFreq() is deprecated. Please use getEnergy() instead.");
          var x = this.getEnergy(freq1, freq2);
          return x;
        }
        /**
         *  Returns the
         *  <a href="http://en.wikipedia.org/wiki/Spectral_centroid" target="_blank">
         *  spectral centroid</a> of the input signal.
         *  <em>NOTE: analyze() must be called prior to getCentroid(). Analyze()
         *  tells the FFT to analyze frequency data, and getCentroid() uses
         *  the results determine the spectral centroid.</em></p>
         *
         *  @method  getCentroid
         *  @for p5.FFT
         *  @return {Number}   Spectral Centroid Frequency  of the spectral centroid in Hz.
         *
         *
         * @example
         *  <div><code>
         * function setup(){
         *  cnv = createCanvas(100,100);
         *  cnv.mousePressed(userStartAudio);
         *  sound = new p5.AudioIn();
         *  sound.start();
         *  fft = new p5.FFT();
         *  sound.connect(fft);
         *}
         *
         *function draw() {
         *  if (getAudioContext().state !== 'running') {
         *    background(220);
         *    text('tap here and enable mic to begin', 10, 20, width - 20);
         *    return;
         *  }
         *  let centroidplot = 0.0;
         *  let spectralCentroid = 0;
         *
         *  background(0);
         *  stroke(0,255,0);
         *  let spectrum = fft.analyze();
         *  fill(0,255,0); // spectrum is green
         *
         *  //draw the spectrum
         *  for (let i = 0; i < spectrum.length; i++){
         *    let x = map(log(i), 0, log(spectrum.length), 0, width);
         *    let h = map(spectrum[i], 0, 255, 0, height);
         *    let rectangle_width = (log(i+1)-log(i))*(width/log(spectrum.length));
         *    rect(x, height, rectangle_width, -h )
         *  }
         *  let nyquist = 22050;
         *
         *  // get the centroid
         *  spectralCentroid = fft.getCentroid();
         *
         *  // the mean_freq_index calculation is for the display.
         *  let mean_freq_index = spectralCentroid/(nyquist/spectrum.length);
         *
         *  centroidplot = map(log(mean_freq_index), 0, log(spectrum.length), 0, width);
         *
         *  stroke(255,0,0); // the line showing where the centroid is will be red
         *
         *  rect(centroidplot, 0, width / spectrum.length, height)
         *  noStroke();
         *  fill(255,255,255);  // text is white
         *  text('centroid: ', 10, 20);
         *  text(round(spectralCentroid)+' Hz', 10, 40);
         *}
         * </code></div>
         */
      }, {
        key: "getCentroid",
        value: function getCentroid() {
          var nyquist = main.audiocontext.sampleRate / 2;
          var cumulative_sum = 0;
          var centroid_normalization = 0;
          for (var i = 0; i < this.freqDomain.length; i++) {
            cumulative_sum += i * this.freqDomain[i];
            centroid_normalization += this.freqDomain[i];
          }
          var mean_freq_index = 0;
          if (centroid_normalization !== 0) {
            mean_freq_index = cumulative_sum / centroid_normalization;
          }
          var spec_centroid_freq = mean_freq_index * (nyquist / this.freqDomain.length);
          return spec_centroid_freq;
        }
        /**
         *  Smooth FFT analysis by averaging with the last analysis frame.
         *
         *  @method smooth
         *  @param {Number} smoothing    0.0 < smoothing < 1.0.
         *                               Defaults to 0.8.
         */
      }, {
        key: "smooth",
        value: function smooth(s) {
          if (typeof s !== "undefined") {
            this.smoothing = s;
          }
          return this.smoothing;
        }
      }, {
        key: "dispose",
        value: function dispose() {
          var index = main.soundArray.indexOf(this);
          main.soundArray.splice(index, 1);
          if (this.analyser) {
            this.analyser.disconnect();
            delete this.analyser;
          }
        }
        /**
         *  Returns an array of average amplitude values for a given number
         *  of frequency bands split equally. N defaults to 16.
         *  <em>NOTE: analyze() must be called prior to linAverages(). Analyze()
         *  tells the FFT to analyze frequency data, and linAverages() uses
         *  the results to group them into a smaller set of averages.</em></p>
         *
         *  @method  linAverages
         *  @for p5.FFT
         *  @param  {Number}  N                Number of returned frequency groups
         *  @return {Array}   linearAverages   Array of average amplitude values for each group
         */
      }, {
        key: "linAverages",
        value: function linAverages(_N) {
          var N = _N || 16;
          var spectrum = this.freqDomain;
          var spectrumLength = spectrum.length;
          var spectrumStep = Math.floor(spectrumLength / N);
          var linearAverages = new Array(N);
          var groupIndex = 0;
          for (var specIndex = 0; specIndex < spectrumLength; specIndex++) {
            linearAverages[groupIndex] = linearAverages[groupIndex] !== void 0 ? (linearAverages[groupIndex] + spectrum[specIndex]) / 2 : spectrum[specIndex];
            if (specIndex % spectrumStep === spectrumStep - 1) {
              groupIndex++;
            }
          }
          return linearAverages;
        }
        /**
         *  Returns an array of average amplitude values of the spectrum, for a given
         *  set of <a href="https://en.wikipedia.org/wiki/Octave_band" target="_blank">
         *  Octave Bands</a>
         *  <em>NOTE: analyze() must be called prior to logAverages(). Analyze()
         *  tells the FFT to analyze frequency data, and logAverages() uses
         *  the results to group them into a smaller set of averages.</em></p>
         *
         *  @method  logAverages
         *  @for p5.FFT
         *  @param  {Array}   octaveBands    Array of Octave Bands objects for grouping
         *  @return {Array}   logAverages    Array of average amplitude values for each group
         */
      }, {
        key: "logAverages",
        value: function logAverages(octaveBands) {
          var nyquist = main.audiocontext.sampleRate / 2;
          var spectrum = this.freqDomain;
          var spectrumLength = spectrum.length;
          var logAverages2 = new Array(octaveBands.length);
          var octaveIndex = 0;
          for (var specIndex = 0; specIndex < spectrumLength; specIndex++) {
            var specIndexFrequency = Math.round(specIndex * nyquist / this.freqDomain.length);
            if (specIndexFrequency > octaveBands[octaveIndex].hi) {
              octaveIndex++;
            }
            logAverages2[octaveIndex] = logAverages2[octaveIndex] !== void 0 ? (logAverages2[octaveIndex] + spectrum[specIndex]) / 2 : spectrum[specIndex];
          }
          return logAverages2;
        }
        /**
         *  Calculates and Returns the 1/N
         *  <a href="https://en.wikipedia.org/wiki/Octave_band" target="_blank">Octave Bands</a>
         *  N defaults to 3 and minimum central frequency to 15.625Hz.
         *  (1/3 Octave Bands ~= 31 Frequency Bands)
         *  Setting fCtr0 to a central value of a higher octave will ignore the lower bands
         *  and produce less frequency groups.
         *
         *  @method   getOctaveBands
         *  @for p5.FFT
         *  @param  {Number}  N             Specifies the 1/N type of generated octave bands
         *  @param  {Number}  fCtr0         Minimum central frequency for the lowest band
         *  @return {Array}   octaveBands   Array of octave band objects with their bounds
         */
      }, {
        key: "getOctaveBands",
        value: function getOctaveBands(_N, _fCtr0) {
          var N = _N || 3;
          var fCtr0 = _fCtr0 || 15.625;
          var octaveBands = [];
          var lastFrequencyBand = {
            lo: fCtr0 / Math.pow(2, 1 / (2 * N)),
            ctr: fCtr0,
            hi: fCtr0 * Math.pow(2, 1 / (2 * N))
          };
          octaveBands.push(lastFrequencyBand);
          var nyquist = main.audiocontext.sampleRate / 2;
          while (lastFrequencyBand.hi < nyquist) {
            var newFrequencyBand = {};
            newFrequencyBand.lo = lastFrequencyBand.hi;
            newFrequencyBand.ctr = lastFrequencyBand.ctr * Math.pow(2, 1 / N);
            newFrequencyBand.hi = newFrequencyBand.ctr * Math.pow(2, 1 / (2 * N));
            octaveBands.push(newFrequencyBand);
            lastFrequencyBand = newFrequencyBand;
          }
          return octaveBands;
        }
      }]);
      return FFT;
    }();
    function freqToFloat(fft2) {
      if (fft2.freqDomain instanceof Float32Array === false) {
        fft2.freqDomain = new Float32Array(fft2.analyser.frequencyBinCount);
      }
    }
    function freqToInt(fft2) {
      if (fft2.freqDomain instanceof Uint8Array === false) {
        fft2.freqDomain = new Uint8Array(fft2.analyser.frequencyBinCount);
      }
    }
    function timeToFloat(fft2) {
      if (fft2.timeDomain instanceof Float32Array === false) {
        fft2.timeDomain = new Float32Array(fft2.analyser.frequencyBinCount);
      }
    }
    function timeToInt(fft2) {
      if (fft2.timeDomain instanceof Uint8Array === false) {
        fft2.timeDomain = new Uint8Array(fft2.analyser.frequencyBinCount);
      }
    }
    var fft = fft_FFT;
    var Add = __webpack_require__(4);
    var Add_default = __webpack_require__.n(Add);
    var Multiply = __webpack_require__(1);
    var Multiply_default = __webpack_require__.n(Multiply);
    var Scale = __webpack_require__(8);
    var Scale_default = __webpack_require__.n(Scale);
    function oscillator_typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        oscillator_typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        oscillator_typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return oscillator_typeof(obj);
    }
    function _possibleConstructorReturn(self2, call) {
      if (call && (oscillator_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized(self2);
    }
    function _assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function oscillator_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function oscillator_defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function oscillator_createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        oscillator_defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        oscillator_defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function sigChain(o, mathObj, thisChain, nextChain, type) {
      var chainSource = o.oscillator;
      for (var i in o.mathOps) {
        if (o.mathOps[i] instanceof type) {
          chainSource.disconnect();
          o.mathOps[i].dispose();
          thisChain = i;
          if (thisChain < o.mathOps.length - 2) {
            nextChain = o.mathOps[i + 1];
          }
        }
      }
      if (thisChain === o.mathOps.length - 1) {
        o.mathOps.push(nextChain);
      }
      if (i > 0) {
        chainSource = o.mathOps[i - 1];
      }
      chainSource.disconnect();
      chainSource.connect(mathObj);
      mathObj.connect(nextChain);
      o.mathOps[thisChain] = mathObj;
      return o;
    }
    var oscillator_Oscillator = function() {
      function Oscillator(freq, type) {
        oscillator_classCallCheck(this, Oscillator);
        if (typeof freq === "string") {
          var f = type;
          type = freq;
          freq = f;
        }
        if (typeof type === "number") {
          var _f = type;
          type = freq;
          freq = _f;
        }
        this.started = false;
        this.phaseAmount = void 0;
        this.oscillator = main.audiocontext.createOscillator();
        this.f = freq || 440;
        this.oscillator.type = type || "sine";
        this.oscillator.frequency.setValueAtTime(this.f, main.audiocontext.currentTime);
        this.output = main.audiocontext.createGain();
        this._freqMods = [];
        this.output.gain.value = 0.5;
        this.output.gain.setValueAtTime(0.5, main.audiocontext.currentTime);
        this.oscillator.connect(this.output);
        this.panPosition = 0;
        this.connection = main.input;
        this.panner = new panner_0(this.output, this.connection, 1);
        this.mathOps = [this.output];
        main.soundArray.push(this);
        this.fade = this.amp;
      }
      oscillator_createClass(Oscillator, [{
        key: "start",
        value: function start(time, f) {
          if (this.started) {
            var now = main.audiocontext.currentTime;
            this.stop(now);
          }
          if (!this.started) {
            var freq = f || this.f;
            var type = this.oscillator.type;
            if (this.oscillator) {
              this.oscillator.disconnect();
              delete this.oscillator;
            }
            this.oscillator = main.audiocontext.createOscillator();
            this.oscillator.frequency.value = Math.abs(freq);
            this.oscillator.type = type;
            this.oscillator.connect(this.output);
            time = time || 0;
            this.oscillator.start(time + main.audiocontext.currentTime);
            this.freqNode = this.oscillator.frequency;
            for (var i in this._freqMods) {
              if (typeof this._freqMods[i].connect !== "undefined") {
                this._freqMods[i].connect(this.oscillator.frequency);
              }
            }
            this.started = true;
          }
        }
        /**
         *  Stop an oscillator. Accepts an optional parameter
         *  to determine how long (in seconds from now) until the
         *  oscillator stops.
         *
         *  @method  stop
         *  @for p5.Oscillator
         *  @param  {Number} secondsFromNow Time, in seconds from now.
         */
      }, {
        key: "stop",
        value: function stop(time) {
          if (this.started) {
            var t = time || 0;
            var now = main.audiocontext.currentTime;
            this.oscillator.stop(t + now);
            this.started = false;
          }
        }
        /**
         *  Set the amplitude between 0 and 1.0. Or, pass in an object
         *  such as an oscillator to modulate amplitude with an audio signal.
         *
         *  @method  amp
         *  @for p5.Oscillator
         *  @param  {Number|Object} vol between 0 and 1.0
         *                              or a modulating signal/oscillator
         *  @param {Number} [rampTime] create a fade that lasts rampTime
         *  @param {Number} [timeFromNow] schedule this event to happen
         *                                seconds from now
         *  @return  {AudioParam} gain  If no value is provided,
         *                              returns the Web Audio API
         *                              AudioParam that controls
         *                              this oscillator's
         *                              gain/amplitude/volume)
         */
      }, {
        key: "amp",
        value: function amp(vol) {
          var rampTime = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
          var tFromNow = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
          if (typeof vol === "number") {
            var now = main.audiocontext.currentTime;
            this.output.gain.linearRampToValueAtTime(vol, now + tFromNow + rampTime);
          } else if (vol) {
            vol.connect(this.output.gain);
          } else {
            return this.output.gain;
          }
        }
        /**
         * Returns the value of output gain
         *
         *  @method  getAmp
         *  @for p5.Oscillator
         *
         * @returns {number} Amplitude value between 0.0 and 1.0
         */
      }, {
        key: "getAmp",
        value: function getAmp() {
          return this.output.gain.value;
        }
        /**
         *  Set frequency of an oscillator to a value. Or, pass in an object
         *  such as an oscillator to modulate the frequency with an audio signal.
         *
         *  @method  freq
         *  @for p5.Oscillator
         *  @param  {Number|Object} Frequency Frequency in Hz
         *                                        or modulating signal/oscillator
         *  @param  {Number} [rampTime] Ramp time (in seconds)
         *  @param  {Number} [timeFromNow] Schedule this event to happen
         *                                   at x seconds from now
         *  @return  {AudioParam} Frequency If no value is provided,
         *                                  returns the Web Audio API
         *                                  AudioParam that controls
         *                                  this oscillator's frequency
         *  @example
         *  <div><code>
         *  let osc;
         *
         *  function setup() {
         *    let cnv = createCanvas(100, 100);
         *    cnv.mousePressed(playOscillator);
         *    osc = new p5.Oscillator(300);
         *    background(220);
         *    text('tap to play', 20, 20);
         *  }
         *
         *  function playOscillator() {
         *    osc.start();
         *    osc.amp(0.5);
         *    // start at 700Hz
         *    osc.freq(700);
         *    // ramp to 60Hz over 0.7 seconds
         *    osc.freq(60, 0.7);
         *    osc.amp(0, 0.1, 0.7);
         *  }
         *  </code></div>
         */
      }, {
        key: "freq",
        value: function freq(val) {
          var rampTime = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
          var tFromNow = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
          if (typeof val === "number" && !isNaN(val)) {
            this.f = val;
            var now = main.audiocontext.currentTime;
            if (rampTime === 0) {
              this.oscillator.frequency.setValueAtTime(val, tFromNow + now);
            } else {
              if (val > 0) {
                this.oscillator.frequency.exponentialRampToValueAtTime(val, tFromNow + rampTime + now);
              } else {
                this.oscillator.frequency.linearRampToValueAtTime(val, tFromNow + rampTime + now);
              }
            }
            if (this.phaseAmount) {
              this.phase(this.phaseAmount);
            }
          } else if (val) {
            if (val.output) {
              val = val.output;
            }
            val.connect(this.oscillator.frequency);
            this._freqMods.push(val);
          } else {
            return this.oscillator.frequency;
          }
        }
        /**
         * Returns the value of frequency of oscillator
         *
         *  @method  getFreq
         *  @for p5.Oscillator
         *  @returns {number} Frequency of oscillator in Hertz
         */
      }, {
        key: "getFreq",
        value: function getFreq() {
          return this.oscillator.frequency.value;
        }
        /**
         *  Set type to 'sine', 'triangle', 'sawtooth' or 'square'.
         *
         *  @method  setType
         *  @for p5.Oscillator
         *  @param {String} type 'sine', 'triangle', 'sawtooth' or 'square'.
         */
      }, {
        key: "setType",
        value: function setType(type) {
          this.oscillator.type = type;
        }
        /**
         *  Returns  current type of oscillator eg. 'sine', 'triangle', 'sawtooth' or 'square'.
         *
         *  @method  getType
         *  @for p5.Oscillator
         *  @returns {String} type of oscillator  eg . 'sine', 'triangle', 'sawtooth' or 'square'.
         */
      }, {
        key: "getType",
        value: function getType() {
          return this.oscillator.type;
        }
        /**
         *  Connect to a p5.sound / Web Audio object.
         *
         *  @method  connect
         *  @for p5.Oscillator
         *  @param  {Object} unit A p5.sound or Web Audio object
         */
      }, {
        key: "connect",
        value: function connect(unit) {
          if (!unit) {
            this.panner.connect(main.input);
          } else if (unit.hasOwnProperty("input")) {
            this.panner.connect(unit.input);
            this.connection = unit.input;
          } else {
            this.panner.connect(unit);
            this.connection = unit;
          }
        }
        /**
         *  Disconnect all outputs
         *
         *  @method  disconnect
         *  @for p5.Oscillator
         */
      }, {
        key: "disconnect",
        value: function disconnect() {
          if (this.output) {
            this.output.disconnect();
          }
          if (this.panner) {
            this.panner.disconnect();
            if (this.output) {
              this.output.connect(this.panner);
            }
          }
          this.oscMods = [];
        }
        /**
         *  Pan between Left (-1) and Right (1)
         *
         *  @method  pan
         *  @for p5.Oscillator
         *  @param  {Number} panning Number between -1 and 1
         *  @param  {Number} timeFromNow schedule this event to happen
         *                                seconds from now
         */
      }, {
        key: "pan",
        value: function pan(pval, tFromNow) {
          this.panPosition = pval;
          this.panner.pan(pval, tFromNow);
        }
        /**
         *  Returns the current value of panPosition , between Left (-1) and Right (1)
         *
         *  @method  getPan
         *  @for p5.Oscillator
         *
         *  @returns {number} panPosition of oscillator , between Left (-1) and Right (1)
         */
      }, {
        key: "getPan",
        value: function getPan() {
          return this.panPosition;
        }
      }, {
        key: "dispose",
        value: function dispose() {
          var index = main.soundArray.indexOf(this);
          main.soundArray.splice(index, 1);
          if (this.oscillator) {
            var now = main.audiocontext.currentTime;
            this.stop(now);
            this.disconnect();
            this.panner = null;
            this.oscillator = null;
          }
          if (this.osc2) {
            this.osc2.dispose();
          }
        }
        /**
         *  Set the phase of an oscillator between 0.0 and 1.0.
         *  In this implementation, phase is a delay time
         *  based on the oscillator's current frequency.
         *
         *  @method  phase
         *  @for p5.Oscillator
         *  @param  {Number} phase float between 0.0 and 1.0
         */
      }, {
        key: "phase",
        value: function phase(p) {
          var delayAmt = p5.prototype.map(p, 0, 1, 0, 1 / this.f);
          var now = main.audiocontext.currentTime;
          this.phaseAmount = p;
          if (!this.dNode) {
            this.dNode = main.audiocontext.createDelay();
            this.oscillator.disconnect();
            this.oscillator.connect(this.dNode);
            this.dNode.connect(this.output);
          }
          this.dNode.delayTime.setValueAtTime(delayAmt, now);
        }
        /**
         *  Add a value to the p5.Oscillator's output amplitude,
         *  and return the oscillator. Calling this method again
         *  will override the initial add() with a new value.
         *
         *  @method  add
         *  @for p5.Oscillator
         *  @param {Number} number Constant number to add
         *  @return {p5.Oscillator} Oscillator Returns this oscillator
         *                                     with scaled output
         *
         */
      }, {
        key: "add",
        value: function add(num) {
          var add2 = new Add_default.a(num);
          var thisChain = this.mathOps.length - 1;
          var nextChain = this.output;
          return sigChain(this, add2, thisChain, nextChain, Add_default.a);
        }
        /**
         *  Multiply the p5.Oscillator's output amplitude
         *  by a fixed value (i.e. turn it up!). Calling this method
         *  again will override the initial mult() with a new value.
         *
         *  @method  mult
         *  @for p5.Oscillator
         *  @param {Number} number Constant number to multiply
         *  @return {p5.Oscillator} Oscillator Returns this oscillator
         *                                     with multiplied output
         */
      }, {
        key: "mult",
        value: function mult(num) {
          var mult2 = new Multiply_default.a(num);
          var thisChain = this.mathOps.length - 1;
          var nextChain = this.output;
          return sigChain(this, mult2, thisChain, nextChain, Multiply_default.a);
        }
        /**
         *  Scale this oscillator's amplitude values to a given
         *  range, and return the oscillator. Calling this method
         *  again will override the initial scale() with new values.
         *
         *  @method  scale
         *  @for p5.Oscillator
         *  @param  {Number} inMin  input range minumum
         *  @param  {Number} inMax  input range maximum
         *  @param  {Number} outMin input range minumum
         *  @param  {Number} outMax input range maximum
         *  @return {p5.Oscillator} Oscillator Returns this oscillator
         *                                     with scaled output
         */
      }, {
        key: "scale",
        value: function scale(inMin, inMax, outMin, outMax) {
          var mapOutMin, mapOutMax;
          if (arguments.length === 4) {
            mapOutMin = p5.prototype.map(outMin, inMin, inMax, 0, 1) - 0.5;
            mapOutMax = p5.prototype.map(outMax, inMin, inMax, 0, 1) - 0.5;
          } else {
            mapOutMin = arguments[0];
            mapOutMax = arguments[1];
          }
          var scale2 = new Scale_default.a(mapOutMin, mapOutMax);
          var thisChain = this.mathOps.length - 1;
          var nextChain = this.output;
          return sigChain(this, scale2, thisChain, nextChain, Scale_default.a);
        }
      }]);
      return Oscillator;
    }();
    var SinOsc = function(_Oscillator) {
      _inherits(SinOsc2, _Oscillator);
      function SinOsc2(freq) {
        oscillator_classCallCheck(this, SinOsc2);
        return _possibleConstructorReturn(this, _getPrototypeOf(SinOsc2).call(this, freq, "sine"));
      }
      return SinOsc2;
    }(oscillator_Oscillator);
    var TriOsc = function(_Oscillator2) {
      _inherits(TriOsc2, _Oscillator2);
      function TriOsc2(freq) {
        oscillator_classCallCheck(this, TriOsc2);
        return _possibleConstructorReturn(this, _getPrototypeOf(TriOsc2).call(this, freq, "triangle"));
      }
      return TriOsc2;
    }(oscillator_Oscillator);
    var SawOsc = function(_Oscillator3) {
      _inherits(SawOsc2, _Oscillator3);
      function SawOsc2(freq) {
        oscillator_classCallCheck(this, SawOsc2);
        return _possibleConstructorReturn(this, _getPrototypeOf(SawOsc2).call(this, freq, "sawtooth"));
      }
      return SawOsc2;
    }(oscillator_Oscillator);
    var SqrOsc = function(_Oscillator4) {
      _inherits(SqrOsc2, _Oscillator4);
      function SqrOsc2(freq) {
        oscillator_classCallCheck(this, SqrOsc2);
        return _possibleConstructorReturn(this, _getPrototypeOf(SqrOsc2).call(this, freq, "square"));
      }
      return SqrOsc2;
    }(oscillator_Oscillator);
    var oscillator = oscillator_Oscillator;
    var TimelineSignal = __webpack_require__(7);
    var TimelineSignal_default = __webpack_require__.n(TimelineSignal);
    p5.Envelope = function(t1, l1, t2, l2, t3, l3) {
      this.aTime = t1 || 0.1;
      this.aLevel = l1 || 1;
      this.dTime = t2 || 0.5;
      this.dLevel = l2 || 0;
      this.rTime = t3 || 0;
      this.rLevel = l3 || 0;
      this._rampHighPercentage = 0.98;
      this._rampLowPercentage = 0.02;
      this.output = main.audiocontext.createGain();
      this.control = new TimelineSignal_default.a();
      this._init();
      this.control.connect(this.output);
      this.connection = null;
      this.mathOps = [this.control];
      this.isExponential = false;
      this.sourceToClear = null;
      this.wasTriggered = false;
      main.soundArray.push(this);
    };
    p5.Envelope.prototype._init = function() {
      var now = main.audiocontext.currentTime;
      var t = now;
      this.control.setTargetAtTime(1e-5, t, 1e-3);
      this._setRampAD(this.aTime, this.dTime);
    };
    p5.Envelope.prototype.set = function(t1, l1, t2, l2, t3, l3) {
      this.aTime = t1;
      this.aLevel = l1;
      this.dTime = t2 || 0;
      this.dLevel = l2 || 0;
      this.rTime = t3 || 0;
      this.rLevel = l3 || 0;
      this._setRampAD(t1, t2);
    };
    p5.Envelope.prototype.setADSR = function(aTime, dTime, sPercent, rTime) {
      this.aTime = aTime;
      this.dTime = dTime || 0;
      this.sPercent = sPercent || 0;
      this.dLevel = typeof sPercent !== "undefined" ? sPercent * (this.aLevel - this.rLevel) + this.rLevel : 0;
      this.rTime = rTime || 0;
      this._setRampAD(aTime, dTime);
    };
    p5.Envelope.prototype.setRange = function(aLevel, rLevel) {
      this.aLevel = aLevel || 1;
      this.rLevel = rLevel || 0;
    };
    p5.Envelope.prototype._setRampAD = function(t1, t2) {
      this._rampAttackTime = this.checkExpInput(t1);
      this._rampDecayTime = this.checkExpInput(t2);
      var TCDenominator = 1;
      TCDenominator = Math.log(1 / this.checkExpInput(1 - this._rampHighPercentage));
      this._rampAttackTC = t1 / this.checkExpInput(TCDenominator);
      TCDenominator = Math.log(1 / this._rampLowPercentage);
      this._rampDecayTC = t2 / this.checkExpInput(TCDenominator);
    };
    p5.Envelope.prototype.setRampPercentages = function(p1, p2) {
      this._rampHighPercentage = this.checkExpInput(p1);
      this._rampLowPercentage = this.checkExpInput(p2);
      var TCDenominator = 1;
      TCDenominator = Math.log(1 / this.checkExpInput(1 - this._rampHighPercentage));
      this._rampAttackTC = this._rampAttackTime / this.checkExpInput(TCDenominator);
      TCDenominator = Math.log(1 / this._rampLowPercentage);
      this._rampDecayTC = this._rampDecayTime / this.checkExpInput(TCDenominator);
    };
    p5.Envelope.prototype.setInput = function() {
      for (var i = 0; i < arguments.length; i++) {
        this.connect(arguments[i]);
      }
    };
    p5.Envelope.prototype.setExp = function(isExp) {
      this.isExponential = isExp;
    };
    p5.Envelope.prototype.checkExpInput = function(value) {
      if (value <= 0) {
        value = 1e-8;
      }
      return value;
    };
    p5.Envelope.prototype.play = function(unit, secondsFromNow, susTime) {
      var tFromNow = secondsFromNow || 0;
      if (unit) {
        if (this.connection !== unit) {
          this.connect(unit);
        }
      }
      this.triggerAttack(unit, tFromNow);
      this.triggerRelease(unit, tFromNow + this.aTime + this.dTime + ~~susTime);
    };
    p5.Envelope.prototype.triggerAttack = function(unit, secondsFromNow) {
      var now = main.audiocontext.currentTime;
      var tFromNow = secondsFromNow || 0;
      var t = now + tFromNow;
      this.lastAttack = t;
      this.wasTriggered = true;
      if (unit) {
        if (this.connection !== unit) {
          this.connect(unit);
        }
      }
      var valToSet = this.control.getValueAtTime(t);
      if (this.isExponential === true) {
        this.control.exponentialRampToValueAtTime(this.checkExpInput(valToSet), t);
      } else {
        this.control.linearRampToValueAtTime(valToSet, t);
      }
      t += this.aTime;
      if (this.isExponential === true) {
        this.control.exponentialRampToValueAtTime(this.checkExpInput(this.aLevel), t);
        valToSet = this.checkExpInput(this.control.getValueAtTime(t));
        this.control.cancelScheduledValues(t);
        this.control.exponentialRampToValueAtTime(valToSet, t);
      } else {
        this.control.linearRampToValueAtTime(this.aLevel, t);
        valToSet = this.control.getValueAtTime(t);
        this.control.cancelScheduledValues(t);
        this.control.linearRampToValueAtTime(valToSet, t);
      }
      t += this.dTime;
      if (this.isExponential === true) {
        this.control.exponentialRampToValueAtTime(this.checkExpInput(this.dLevel), t);
        valToSet = this.checkExpInput(this.control.getValueAtTime(t));
        this.control.cancelScheduledValues(t);
        this.control.exponentialRampToValueAtTime(valToSet, t);
      } else {
        this.control.linearRampToValueAtTime(this.dLevel, t);
        valToSet = this.control.getValueAtTime(t);
        this.control.cancelScheduledValues(t);
        this.control.linearRampToValueAtTime(valToSet, t);
      }
    };
    p5.Envelope.prototype.triggerRelease = function(unit, secondsFromNow) {
      if (!this.wasTriggered) {
        return;
      }
      var now = main.audiocontext.currentTime;
      var tFromNow = secondsFromNow || 0;
      var t = now + tFromNow;
      if (unit) {
        if (this.connection !== unit) {
          this.connect(unit);
        }
      }
      var valToSet = this.control.getValueAtTime(t);
      if (this.isExponential === true) {
        this.control.exponentialRampToValueAtTime(this.checkExpInput(valToSet), t);
      } else {
        this.control.linearRampToValueAtTime(valToSet, t);
      }
      t += this.rTime;
      if (this.isExponential === true) {
        this.control.exponentialRampToValueAtTime(this.checkExpInput(this.rLevel), t);
        valToSet = this.checkExpInput(this.control.getValueAtTime(t));
        this.control.cancelScheduledValues(t);
        this.control.exponentialRampToValueAtTime(valToSet, t);
      } else {
        this.control.linearRampToValueAtTime(this.rLevel, t);
        valToSet = this.control.getValueAtTime(t);
        this.control.cancelScheduledValues(t);
        this.control.linearRampToValueAtTime(valToSet, t);
      }
      this.wasTriggered = false;
    };
    p5.Envelope.prototype.ramp = function(unit, secondsFromNow, v1, v2) {
      var now = main.audiocontext.currentTime;
      var tFromNow = secondsFromNow || 0;
      var t = now + tFromNow;
      var destination1 = this.checkExpInput(v1);
      var destination2 = typeof v2 !== "undefined" ? this.checkExpInput(v2) : void 0;
      if (unit) {
        if (this.connection !== unit) {
          this.connect(unit);
        }
      }
      var currentVal = this.checkExpInput(this.control.getValueAtTime(t));
      if (destination1 > currentVal) {
        this.control.setTargetAtTime(destination1, t, this._rampAttackTC);
        t += this._rampAttackTime;
      } else if (destination1 < currentVal) {
        this.control.setTargetAtTime(destination1, t, this._rampDecayTC);
        t += this._rampDecayTime;
      }
      if (destination2 === void 0)
        return;
      if (destination2 > destination1) {
        this.control.setTargetAtTime(destination2, t, this._rampAttackTC);
      } else if (destination2 < destination1) {
        this.control.setTargetAtTime(destination2, t, this._rampDecayTC);
      }
    };
    p5.Envelope.prototype.connect = function(unit) {
      this.connection = unit;
      if (unit instanceof p5.Oscillator || unit instanceof p5.SoundFile || unit instanceof p5.AudioIn || unit instanceof p5.Reverb || unit instanceof p5.Noise || unit instanceof p5.Filter || unit instanceof p5.Delay) {
        unit = unit.output.gain;
      }
      if (unit instanceof AudioParam) {
        unit.setValueAtTime(0, main.audiocontext.currentTime);
      }
      this.output.connect(unit);
    };
    p5.Envelope.prototype.disconnect = function() {
      if (this.output) {
        this.output.disconnect();
      }
    };
    p5.Envelope.prototype.add = function(num) {
      var add = new Add_default.a(num);
      var thisChain = this.mathOps.length;
      var nextChain = this.output;
      return p5.prototype._mathChain(this, add, thisChain, nextChain, Add_default.a);
    };
    p5.Envelope.prototype.mult = function(num) {
      var mult = new Multiply_default.a(num);
      var thisChain = this.mathOps.length;
      var nextChain = this.output;
      return p5.prototype._mathChain(this, mult, thisChain, nextChain, Multiply_default.a);
    };
    p5.Envelope.prototype.scale = function(inMin, inMax, outMin, outMax) {
      var scale = new Scale_default.a(inMin, inMax, outMin, outMax);
      var thisChain = this.mathOps.length;
      var nextChain = this.output;
      return p5.prototype._mathChain(this, scale, thisChain, nextChain, Scale_default.a);
    };
    p5.Envelope.prototype.dispose = function() {
      var index = main.soundArray.indexOf(this);
      main.soundArray.splice(index, 1);
      this.disconnect();
      if (this.control) {
        this.control.dispose();
        this.control = null;
      }
      for (var i = 1; i < this.mathOps.length; i++) {
        this.mathOps[i].dispose();
      }
    };
    p5.Env = function(t1, l1, t2, l2, t3, l3) {
      console.warn("WARNING: p5.Env is now deprecated and may be removed in future versions. Please use the new p5.Envelope instead.");
      p5.Envelope.call(this, t1, l1, t2, l2, t3, l3);
    };
    p5.Env.prototype = Object.create(p5.Envelope.prototype);
    var Envelope = p5.Envelope;
    var envelope = Envelope;
    function noise_typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        noise_typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        noise_typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return noise_typeof(obj);
    }
    function noise_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function noise_defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function noise_createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        noise_defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        noise_defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function noise_possibleConstructorReturn(self2, call) {
      if (call && (noise_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return noise_assertThisInitialized(self2);
    }
    function noise_assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function noise_getPrototypeOf(o) {
      noise_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return noise_getPrototypeOf(o);
    }
    function noise_inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        noise_setPrototypeOf(subClass, superClass);
    }
    function noise_setPrototypeOf(o, p) {
      noise_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return noise_setPrototypeOf(o, p);
    }
    var _whiteNoiseBuffer = function() {
      var bufferSize = 2 * main.audiocontext.sampleRate;
      var whiteBuffer = main.audiocontext.createBuffer(1, bufferSize, main.audiocontext.sampleRate);
      var noiseData = whiteBuffer.getChannelData(0);
      for (var i = 0; i < bufferSize; i++) {
        noiseData[i] = Math.random() * 2 - 1;
      }
      whiteBuffer.type = "white";
      return whiteBuffer;
    }();
    var _pinkNoiseBuffer = function() {
      var bufferSize = 2 * main.audiocontext.sampleRate;
      var pinkBuffer = main.audiocontext.createBuffer(1, bufferSize, main.audiocontext.sampleRate);
      var noiseData = pinkBuffer.getChannelData(0);
      var b0, b1, b2, b3, b4, b5, b6;
      b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0;
      for (var i = 0; i < bufferSize; i++) {
        var white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.969 * b2 + white * 0.153852;
        b3 = 0.8665 * b3 + white * 0.3104856;
        b4 = 0.55 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.016898;
        noiseData[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        noiseData[i] *= 0.11;
        b6 = white * 0.115926;
      }
      pinkBuffer.type = "pink";
      return pinkBuffer;
    }();
    var _brownNoiseBuffer = function() {
      var bufferSize = 2 * main.audiocontext.sampleRate;
      var brownBuffer = main.audiocontext.createBuffer(1, bufferSize, main.audiocontext.sampleRate);
      var noiseData = brownBuffer.getChannelData(0);
      var lastOut = 0;
      for (var i = 0; i < bufferSize; i++) {
        var white = Math.random() * 2 - 1;
        noiseData[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = noiseData[i];
        noiseData[i] *= 3.5;
      }
      brownBuffer.type = "brown";
      return brownBuffer;
    }();
    var noise_Noise = function(_Oscillator) {
      noise_inherits(Noise, _Oscillator);
      function Noise(type) {
        var _this;
        noise_classCallCheck(this, Noise);
        _this = noise_possibleConstructorReturn(this, noise_getPrototypeOf(Noise).call(this));
        var assignType;
        delete _this.f;
        delete _this.freq;
        delete _this.oscillator;
        if (type === "brown") {
          assignType = _brownNoiseBuffer;
        } else if (type === "pink") {
          assignType = _pinkNoiseBuffer;
        } else {
          assignType = _whiteNoiseBuffer;
        }
        _this.buffer = assignType;
        return _this;
      }
      noise_createClass(Noise, [{
        key: "setType",
        value: function setType(type) {
          switch (type) {
            case "white":
              this.buffer = _whiteNoiseBuffer;
              break;
            case "pink":
              this.buffer = _pinkNoiseBuffer;
              break;
            case "brown":
              this.buffer = _brownNoiseBuffer;
              break;
            default:
              this.buffer = _whiteNoiseBuffer;
          }
          if (this.started) {
            var now = main.audiocontext.currentTime;
            this.stop(now);
            this.start(now + 0.01);
          }
        }
      }, {
        key: "getType",
        value: function getType() {
          return this.buffer.type;
        }
      }, {
        key: "start",
        value: function start() {
          if (this.started) {
            this.stop();
          }
          this.noise = main.audiocontext.createBufferSource();
          this.noise.buffer = this.buffer;
          this.noise.loop = true;
          this.noise.connect(this.output);
          var now = main.audiocontext.currentTime;
          this.noise.start(now);
          this.started = true;
        }
      }, {
        key: "stop",
        value: function stop() {
          var now = main.audiocontext.currentTime;
          if (this.noise) {
            this.noise.stop(now);
            this.started = false;
          }
        }
      }, {
        key: "dispose",
        value: function dispose() {
          var now = main.audiocontext.currentTime;
          var index = main.soundArray.indexOf(this);
          main.soundArray.splice(index, 1);
          if (this.noise) {
            this.noise.disconnect();
            this.stop(now);
          }
          if (this.output) {
            this.output.disconnect();
          }
          if (this.panner) {
            this.panner.disconnect();
          }
          this.output = null;
          this.panner = null;
          this.buffer = null;
          this.noise = null;
        }
      }]);
      return Noise;
    }(oscillator);
    var noise = noise_Noise;
    var Signal = __webpack_require__(2);
    var Signal_default = __webpack_require__.n(Signal);
    function pulse_typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        pulse_typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        pulse_typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return pulse_typeof(obj);
    }
    function pulse_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function pulse_defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function pulse_createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        pulse_defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        pulse_defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function pulse_possibleConstructorReturn(self2, call) {
      if (call && (pulse_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return pulse_assertThisInitialized(self2);
    }
    function pulse_assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function pulse_getPrototypeOf(o) {
      pulse_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return pulse_getPrototypeOf(o);
    }
    function pulse_inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        pulse_setPrototypeOf(subClass, superClass);
    }
    function pulse_setPrototypeOf(o, p) {
      pulse_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return pulse_setPrototypeOf(o, p);
    }
    var pulse_Pulse = function(_Oscillator) {
      pulse_inherits(Pulse, _Oscillator);
      function Pulse(freq, w) {
        var _this;
        pulse_classCallCheck(this, Pulse);
        _this = pulse_possibleConstructorReturn(this, pulse_getPrototypeOf(Pulse).call(this, freq, "sawtooth"));
        _this.w = w || 0;
        _this.osc2 = new SawOsc(freq);
        _this.dNode = main.audiocontext.createDelay();
        _this.dcOffset = createDCOffset();
        _this.dcGain = main.audiocontext.createGain();
        _this.dcOffset.connect(_this.dcGain);
        _this.dcGain.connect(_this.output);
        _this.f = freq || 440;
        var mW = _this.w / _this.oscillator.frequency.value;
        _this.dNode.delayTime.value = mW;
        _this.dcGain.gain.value = 1.7 * (0.5 - _this.w);
        _this.osc2.disconnect();
        _this.osc2.panner.disconnect();
        _this.osc2.amp(-1);
        _this.osc2.output.connect(_this.dNode);
        _this.dNode.connect(_this.output);
        _this.output.gain.value = 1;
        _this.output.connect(_this.panner);
        return _this;
      }
      pulse_createClass(Pulse, [{
        key: "width",
        value: function width(w) {
          if (typeof w === "number") {
            if (w <= 1 && w >= 0) {
              this.w = w;
              var mW = this.w / this.oscillator.frequency.value;
              this.dNode.delayTime.value = mW;
            }
            this.dcGain.gain.value = 1.7 * (0.5 - this.w);
          } else {
            w.connect(this.dNode.delayTime);
            var sig = new Signal_default.a(-0.5);
            w.connect(sig);
            var mult1 = new Multiply_default.a(-1);
            var mult2 = new Multiply_default.a(1.7);
            sig = sig.connect(mult1).connect(mult2);
            sig.connect(this.dcGain.gain);
          }
        }
      }, {
        key: "start",
        value: function start(f, time) {
          var now = main.audiocontext.currentTime;
          var t = time || 0;
          if (!this.started) {
            var freq = f || this.f;
            var type = this.oscillator.type;
            this.oscillator = main.audiocontext.createOscillator();
            this.oscillator.frequency.setValueAtTime(freq, now);
            this.oscillator.type = type;
            this.oscillator.connect(this.output);
            this.oscillator.start(t + now);
            this.osc2.oscillator = main.audiocontext.createOscillator();
            this.osc2.oscillator.frequency.setValueAtTime(freq, t + now);
            this.osc2.oscillator.type = type;
            this.osc2.oscillator.connect(this.osc2.output);
            this.osc2.start(t + now);
            this.freqNode = [this.oscillator.frequency, this.osc2.oscillator.frequency];
            this.dcOffset = createDCOffset();
            this.dcOffset.connect(this.dcGain);
            this.dcOffset.start(t + now);
            if (this.mods !== void 0 && this.mods.frequency !== void 0) {
              this.mods.frequency.connect(this.freqNode[0]);
              this.mods.frequency.connect(this.freqNode[1]);
            }
            this.started = true;
            this.osc2.started = true;
          }
        }
      }, {
        key: "stop",
        value: function stop(time) {
          if (this.started) {
            var t = time || 0;
            var now = main.audiocontext.currentTime;
            this.oscillator.stop(t + now);
            if (this.osc2.oscillator) {
              this.osc2.oscillator.stop(t + now);
            }
            this.dcOffset.stop(t + now);
            this.started = false;
            this.osc2.started = false;
          }
        }
      }, {
        key: "freq",
        value: function freq(val) {
          var rampTime = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
          var tFromNow = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
          if (typeof val === "number") {
            this.f = val;
            var now = main.audiocontext.currentTime;
            var currentFreq = this.oscillator.frequency.value;
            this.oscillator.frequency.cancelScheduledValues(now);
            this.oscillator.frequency.setValueAtTime(currentFreq, now + tFromNow);
            this.oscillator.frequency.exponentialRampToValueAtTime(val, tFromNow + rampTime + now);
            this.osc2.oscillator.frequency.cancelScheduledValues(now);
            this.osc2.oscillator.frequency.setValueAtTime(currentFreq, now + tFromNow);
            this.osc2.oscillator.frequency.exponentialRampToValueAtTime(val, tFromNow + rampTime + now);
            if (this.freqMod) {
              this.freqMod.output.disconnect();
              this.freqMod = null;
            }
          } else if (val.output) {
            val.output.disconnect();
            val.output.connect(this.oscillator.frequency);
            val.output.connect(this.osc2.oscillator.frequency);
            this.freqMod = val;
          }
        }
      }]);
      return Pulse;
    }(oscillator);
    function createDCOffset() {
      var ac = main.audiocontext;
      var buffer = ac.createBuffer(1, 2048, ac.sampleRate);
      var data = buffer.getChannelData(0);
      for (var i = 0; i < 2048; i++) {
        data[i] = 1;
      }
      var bufferSource = ac.createBufferSource();
      bufferSource.buffer = buffer;
      bufferSource.loop = true;
      return bufferSource;
    }
    var pulse = pulse_Pulse;
    function audioin_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function audioin_defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function audioin_createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        audioin_defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        audioin_defineProperties(Constructor, staticProps);
      return Constructor;
    }
    main.inputSources = [];
    var audioin_AudioIn = function() {
      function AudioIn(errorCallback) {
        audioin_classCallCheck(this, AudioIn);
        this.input = main.audiocontext.createGain();
        this.output = main.audiocontext.createGain();
        this.stream = null;
        this.mediaStream = null;
        this.currentSource = null;
        this.enabled = false;
        this.amplitude = new amplitude();
        this.output.connect(this.amplitude.input);
        if (!window.MediaStreamTrack || !window.navigator.mediaDevices || !window.navigator.mediaDevices.getUserMedia) {
          errorCallback ? errorCallback() : window.alert("This browser does not support MediaStreamTrack and mediaDevices");
        }
        main.soundArray.push(this);
      }
      audioin_createClass(AudioIn, [{
        key: "start",
        value: function start(successCallback, errorCallback) {
          var self2 = this;
          if (this.stream) {
            this.stop();
          }
          var audioSource = main.inputSources[self2.currentSource];
          var constraints = {
            audio: {
              sampleRate: main.audiocontext.sampleRate,
              echoCancellation: false
            }
          };
          if (main.inputSources[this.currentSource]) {
            constraints.audio.deviceId = audioSource.deviceId;
          }
          window.navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
            self2.stream = stream;
            self2.enabled = true;
            self2.mediaStream = main.audiocontext.createMediaStreamSource(stream);
            self2.mediaStream.connect(self2.output);
            self2.amplitude.setInput(self2.output);
            if (successCallback)
              successCallback();
          })["catch"](function(err) {
            if (errorCallback)
              errorCallback(err);
            else
              console.error(err);
          });
        }
        /**
         *  Turn the AudioIn off. If the AudioIn is stopped, it cannot getLevel().
         *  If re-starting, the user may be prompted for permission access.
         *
         *  @method stop
         *  @for p5.AudioIn
         */
      }, {
        key: "stop",
        value: function stop() {
          if (this.stream) {
            this.stream.getTracks().forEach(function(track) {
              track.stop();
            });
            this.mediaStream.disconnect();
            delete this.mediaStream;
            delete this.stream;
          }
        }
        /**
         *  Connect to an audio unit. If no parameter is provided, will
         *  connect to the main output (i.e. your speakers).<br/>
         *
         *  @method  connect
         *  @for p5.AudioIn
         *  @param  {Object} [unit] An object that accepts audio input,
         *                          such as an FFT
         */
      }, {
        key: "connect",
        value: function connect(unit) {
          if (unit) {
            if (unit.hasOwnProperty("input")) {
              this.output.connect(unit.input);
            } else if (unit.hasOwnProperty("analyser")) {
              this.output.connect(unit.analyser);
            } else {
              this.output.connect(unit);
            }
          } else {
            this.output.connect(main.input);
          }
        }
        /**
         *  Disconnect the AudioIn from all audio units. For example, if
         *  connect() had been called, disconnect() will stop sending
         *  signal to your speakers.<br/>
         *
         *  @method  disconnect
         *  @for p5.AudioIn
         */
      }, {
        key: "disconnect",
        value: function disconnect() {
          if (this.output) {
            this.output.disconnect();
            this.output.connect(this.amplitude.input);
          }
        }
        /**
         *  Read the Amplitude (volume level) of an AudioIn. The AudioIn
         *  class contains its own instance of the Amplitude class to help
         *  make it easy to get a microphone's volume level. Accepts an
         *  optional smoothing value (0.0 < 1.0). <em>NOTE: AudioIn must
         *  .start() before using .getLevel().</em><br/>
         *
         *  @method  getLevel
         *  @for p5.AudioIn
         *  @param  {Number} [smoothing] Smoothing is 0.0 by default.
         *                               Smooths values based on previous values.
         *  @return {Number}           Volume level (between 0.0 and 1.0)
         */
      }, {
        key: "getLevel",
        value: function getLevel(smoothing) {
          if (smoothing) {
            this.amplitude.smoothing = smoothing;
          }
          return this.amplitude.getLevel();
        }
        /**
         *  Set amplitude (volume) of a mic input between 0 and 1.0. <br/>
         *
         *  @method  amp
         *  @for p5.AudioIn
         *  @param  {Number} vol between 0 and 1.0
         *  @param {Number} [time] ramp time (optional)
         */
      }, {
        key: "amp",
        value: function amp(vol, t) {
          if (t) {
            var rampTime = t || 0;
            var currentVol = this.output.gain.value;
            this.output.gain.cancelScheduledValues(main.audiocontext.currentTime);
            this.output.gain.setValueAtTime(currentVol, main.audiocontext.currentTime);
            this.output.gain.linearRampToValueAtTime(vol, rampTime + main.audiocontext.currentTime);
          } else {
            this.output.gain.cancelScheduledValues(main.audiocontext.currentTime);
            this.output.gain.setValueAtTime(vol, main.audiocontext.currentTime);
          }
        }
        /**
         * Returns a list of available input sources. This is a wrapper
         * for <a href="https://developer.mozilla.org/
         * en-US/docs/Web/API/MediaDevices/enumerateDevices" target="_blank">
         * MediaDevices.enumerateDevices() - Web APIs | MDN</a>
         * and it returns a Promise.
         * @method  getSources
         * @for p5.AudioIn
         * @param  {Function} [successCallback] This callback function handles the sources when they
         *                                      have been enumerated. The callback function
         *                                      receives the deviceList array as its only argument
         * @param  {Function} [errorCallback] This optional callback receives the error
         *                                    message as its argument.
         * @returns {Promise} Returns a Promise that can be used in place of the callbacks, similar
         *                            to the enumerateDevices() method
         * @example
         *  <div><code>
         *  let audioIn;
         *
         *  function setup(){
         *    text('getting sources...', 0, 20);
         *    audioIn = new p5.AudioIn();
         *    audioIn.getSources(gotSources);
         *  }
         *
         *  function gotSources(deviceList) {
         *    if (deviceList.length > 0) {
         *      //set the source to the first item in the deviceList array
         *      audioIn.setSource(0);
         *      let currentSource = deviceList[audioIn.currentSource];
         *      text('set source to: ' + currentSource.deviceId, 5, 20, width);
         *    }
         *  }
         *  </code></div>
         */
      }, {
        key: "getSources",
        value: function getSources(onSuccess, onError) {
          return new Promise(function(resolve, reject) {
            window.navigator.mediaDevices.enumerateDevices().then(function(devices) {
              main.inputSources = devices.filter(function(device) {
                return device.kind === "audioinput";
              });
              resolve(main.inputSources);
              if (onSuccess) {
                onSuccess(main.inputSources);
              }
            })["catch"](function(error) {
              reject(error);
              if (onError) {
                onError(error);
              } else {
                console.error("This browser does not support MediaStreamTrack.getSources()");
              }
            });
          });
        }
        /**
         *  Set the input source. Accepts a number representing a
         *  position in the array returned by getSources().
         *  This is only available in browsers that support
         * <a href="https://developer.mozilla.org/
         * en-US/docs/Web/API/MediaDevices/enumerateDevices" target="_blank">
         * navigator.mediaDevices.enumerateDevices()</a>
         *
         *  @method setSource
         *  @for p5.AudioIn
         *  @param {number} num position of input source in the array
         *  @example
         *  <div><code>
         *  let audioIn;
         *
         *  function setup(){
         *    text('getting sources...', 0, 20);
         *    audioIn = new p5.AudioIn();
         *    audioIn.getSources(gotSources);
         *  }
         *
         *  function gotSources(deviceList) {
         *    if (deviceList.length > 0) {
         *      //set the source to the first item in the deviceList array
         *      audioIn.setSource(0);
         *      let currentSource = deviceList[audioIn.currentSource];
         *      text('set source to: ' + currentSource.deviceId, 5, 20, width);
         *    }
         *  }
         *  </code></div>
         */
      }, {
        key: "setSource",
        value: function setSource(num) {
          if (main.inputSources.length > 0 && num < main.inputSources.length) {
            this.currentSource = num;
            console.log("set source to ", main.inputSources[this.currentSource]);
          } else {
            console.log("unable to set input source");
          }
          if (this.stream && this.stream.active) {
            this.start();
          }
        }
      }, {
        key: "dispose",
        value: function dispose() {
          var index = main.soundArray.indexOf(this);
          main.soundArray.splice(index, 1);
          this.stop();
          if (this.output) {
            this.output.disconnect();
          }
          if (this.amplitude) {
            this.amplitude.disconnect();
          }
          delete this.amplitude;
          delete this.output;
        }
      }]);
      return AudioIn;
    }();
    var audioin = audioin_AudioIn;
    var CrossFade = __webpack_require__(23);
    var CrossFade_default = __webpack_require__.n(CrossFade);
    function effect_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function effect_defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function effect_createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        effect_defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        effect_defineProperties(Constructor, staticProps);
      return Constructor;
    }
    var effect_Effect = function() {
      function Effect() {
        effect_classCallCheck(this, Effect);
        this.ac = main.audiocontext;
        this.input = this.ac.createGain();
        this.output = this.ac.createGain();
        this._drywet = new CrossFade_default.a(1);
        this.wet = this.ac.createGain();
        this.input.connect(this._drywet.a);
        this.wet.connect(this._drywet.b);
        this._drywet.connect(this.output);
        this.connect();
        main.soundArray.push(this);
      }
      effect_createClass(Effect, [{
        key: "amp",
        value: function amp(vol) {
          var rampTime = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
          var tFromNow = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
          var now = main.audiocontext.currentTime;
          var startTime = now + tFromNow;
          var endTime = startTime + rampTime + 1e-3;
          var currentVol = this.output.gain.value;
          this.output.gain.cancelScheduledValues(now);
          this.output.gain.linearRampToValueAtTime(currentVol, startTime + 1e-3);
          this.output.gain.linearRampToValueAtTime(vol, endTime);
        }
        /**
         *  Link effects together in a chain
         *  Example usage: filter.chain(reverb, delay, panner);
         *  May be used with an open-ended number of arguments
         *
         *  @method chain
         *  @for p5.Effect
         *  @param {Object} [arguments]  Chain together multiple sound objects
         */
      }, {
        key: "chain",
        value: function chain() {
          if (arguments.length > 0) {
            this.connect(arguments[0]);
            for (var i = 1; i < arguments.length; i += 1) {
              arguments[i - 1].connect(arguments[i]);
            }
          }
          return this;
        }
        /**
         *  Adjust the dry/wet value.
         *
         *  @method drywet
         *  @for p5.Effect
         *  @param {Number} [fade] The desired drywet value (0 - 1.0)
         */
      }, {
        key: "drywet",
        value: function drywet(fade) {
          if (typeof fade !== "undefined") {
            this._drywet.fade.value = fade;
          }
          return this._drywet.fade.value;
        }
        /**
         *  Send output to a p5.js-sound, Web Audio Node, or use signal to
         *  control an AudioParam
         *
         *  @method connect
         *  @for p5.Effect
         *  @param {Object} unit
         */
      }, {
        key: "connect",
        value: function connect(unit) {
          var u = unit || p5.soundOut.input;
          this.output.connect(u.input ? u.input : u);
        }
        /**
         * Disconnect all output.
         * @method disconnect
         * @for p5.Effect
         */
      }, {
        key: "disconnect",
        value: function disconnect() {
          if (this.output) {
            this.output.disconnect();
          }
        }
      }, {
        key: "dispose",
        value: function dispose() {
          var index = main.soundArray.indexOf(this);
          main.soundArray.splice(index, 1);
          if (this.input) {
            this.input.disconnect();
            delete this.input;
          }
          if (this.output) {
            this.output.disconnect();
            delete this.output;
          }
          if (this._drywet) {
            this._drywet.disconnect();
            delete this._drywet;
          }
          if (this.wet) {
            this.wet.disconnect();
            delete this.wet;
          }
          this.ac = void 0;
        }
      }]);
      return Effect;
    }();
    var effect = effect_Effect;
    function filter_typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        filter_typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        filter_typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return filter_typeof(obj);
    }
    function filter_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function filter_defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function filter_createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        filter_defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        filter_defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function filter_possibleConstructorReturn(self2, call) {
      if (call && (filter_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return filter_assertThisInitialized(self2);
    }
    function filter_assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function _get(target, property, receiver) {
      if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
      } else {
        _get = function _get2(target2, property2, receiver2) {
          var base = _superPropBase(target2, property2);
          if (!base)
            return;
          var desc = Object.getOwnPropertyDescriptor(base, property2);
          if (desc.get) {
            return desc.get.call(receiver2);
          }
          return desc.value;
        };
      }
      return _get(target, property, receiver || target);
    }
    function _superPropBase(object, property) {
      while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = filter_getPrototypeOf(object);
        if (object === null)
          break;
      }
      return object;
    }
    function filter_getPrototypeOf(o) {
      filter_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return filter_getPrototypeOf(o);
    }
    function filter_inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        filter_setPrototypeOf(subClass, superClass);
    }
    function filter_setPrototypeOf(o, p) {
      filter_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return filter_setPrototypeOf(o, p);
    }
    var Filter = function(_Effect) {
      filter_inherits(Filter2, _Effect);
      function Filter2(type) {
        var _this;
        filter_classCallCheck(this, Filter2);
        _this = filter_possibleConstructorReturn(this, filter_getPrototypeOf(Filter2).call(this));
        _this.biquad = _this.ac.createBiquadFilter();
        _this.input.connect(_this.biquad);
        _this.biquad.connect(_this.wet);
        if (type) {
          _this.setType(type);
        }
        _this._on = true;
        _this._untoggledType = _this.biquad.type;
        return _this;
      }
      filter_createClass(Filter2, [{
        key: "process",
        value: function process(src, freq, res, time) {
          src.connect(this.input);
          this.set(freq, res, time);
        }
        /**
         *  Set the frequency and the resonance of the filter.
         *
         *  @method  set
         *  @param {Number} [freq] Frequency in Hz, from 10 to 22050
         *  @param {Number} [res]  Resonance (Q) from 0.001 to 1000
         *  @param {Number} [timeFromNow] schedule this event to happen
         *                                seconds from now
         */
      }, {
        key: "set",
        value: function set(freq, res, time) {
          if (freq) {
            this.freq(freq, time);
          }
          if (res) {
            this.res(res, time);
          }
        }
        /**
         *  Set the filter frequency, in Hz, from 10 to 22050 (the range of
         *  human hearing, although in reality most people hear in a narrower
         *  range).
         *
         *  @method  freq
         *  @param  {Number} freq Filter Frequency
         *  @param {Number} [timeFromNow] schedule this event to happen
         *                                seconds from now
         *  @return {Number} value  Returns the current frequency value
         */
      }, {
        key: "freq",
        value: function freq(_freq, time) {
          var t = time || 0;
          if (_freq <= 0) {
            _freq = 1;
          }
          if (typeof _freq === "number") {
            this.biquad.frequency.cancelScheduledValues(this.ac.currentTime + 0.01 + t);
            this.biquad.frequency.exponentialRampToValueAtTime(_freq, this.ac.currentTime + 0.02 + t);
          } else if (_freq) {
            _freq.connect(this.biquad.frequency);
          }
          return this.biquad.frequency.value;
        }
        /**
         *  Controls either width of a bandpass frequency,
         *  or the resonance of a low/highpass cutoff frequency.
         *
         *  @method  res
         *  @param {Number} res  Resonance/Width of filter freq
         *                       from 0.001 to 1000
         *  @param {Number} [timeFromNow] schedule this event to happen
         *                                seconds from now
         *  @return {Number} value Returns the current res value
         */
      }, {
        key: "res",
        value: function res(_res, time) {
          var t = time || 0;
          if (typeof _res === "number") {
            this.biquad.Q.value = _res;
            this.biquad.Q.cancelScheduledValues(this.ac.currentTime + 0.01 + t);
            this.biquad.Q.linearRampToValueAtTime(_res, this.ac.currentTime + 0.02 + t);
          } else if (_res) {
            _res.connect(this.biquad.Q);
          }
          return this.biquad.Q.value;
        }
        /**
         * Controls the gain attribute of a Biquad Filter.
         * This is distinctly different from .amp() which is inherited from p5.Effect
         * .amp() controls the volume via the output gain node
         * p5.Filter.gain() controls the gain parameter of a Biquad Filter node.
         *
         * @method gain
         * @param  {Number} gain
         * @return {Number} Returns the current or updated gain value
         */
      }, {
        key: "gain",
        value: function gain2(_gain, time) {
          var t = time || 0;
          if (typeof _gain === "number") {
            this.biquad.gain.value = _gain;
            this.biquad.gain.cancelScheduledValues(this.ac.currentTime + 0.01 + t);
            this.biquad.gain.linearRampToValueAtTime(_gain, this.ac.currentTime + 0.02 + t);
          } else if (_gain) {
            _gain.connect(this.biquad.gain);
          }
          return this.biquad.gain.value;
        }
        /**
         * Toggle function. Switches between the specified type and allpass
         *
         * @method toggle
         * @return {boolean} [Toggle value]
         */
      }, {
        key: "toggle",
        value: function toggle() {
          this._on = !this._on;
          if (this._on === true) {
            this.biquad.type = this._untoggledType;
          } else if (this._on === false) {
            this.biquad.type = "allpass";
          }
          return this._on;
        }
        /**
         *  Set the type of a p5.Filter. Possible types include:
         *  "lowpass" (default), "highpass", "bandpass",
         *  "lowshelf", "highshelf", "peaking", "notch",
         *  "allpass".
         *
         *  @method  setType
         *  @param {String} t
         */
      }, {
        key: "setType",
        value: function setType(t) {
          this.biquad.type = t;
          this._untoggledType = this.biquad.type;
        }
      }, {
        key: "dispose",
        value: function dispose() {
          _get(filter_getPrototypeOf(Filter2.prototype), "dispose", this).call(this);
          if (this.biquad) {
            this.biquad.disconnect();
            delete this.biquad;
          }
        }
      }]);
      return Filter2;
    }(effect);
    var LowPass = function(_Filter) {
      filter_inherits(LowPass2, _Filter);
      function LowPass2() {
        filter_classCallCheck(this, LowPass2);
        return filter_possibleConstructorReturn(this, filter_getPrototypeOf(LowPass2).call(this, "lowpass"));
      }
      return LowPass2;
    }(Filter);
    var HighPass = function(_Filter2) {
      filter_inherits(HighPass2, _Filter2);
      function HighPass2() {
        filter_classCallCheck(this, HighPass2);
        return filter_possibleConstructorReturn(this, filter_getPrototypeOf(HighPass2).call(this, "highpass"));
      }
      return HighPass2;
    }(Filter);
    var BandPass = function(_Filter3) {
      filter_inherits(BandPass2, _Filter3);
      function BandPass2() {
        filter_classCallCheck(this, BandPass2);
        return filter_possibleConstructorReturn(this, filter_getPrototypeOf(BandPass2).call(this, "bandpass"));
      }
      return BandPass2;
    }(Filter);
    var filter = Filter;
    function eqFilter_typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        eqFilter_typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        eqFilter_typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return eqFilter_typeof(obj);
    }
    function eqFilter_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function eqFilter_defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function eqFilter_createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        eqFilter_defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        eqFilter_defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function eqFilter_possibleConstructorReturn(self2, call) {
      if (call && (eqFilter_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return eqFilter_assertThisInitialized(self2);
    }
    function eqFilter_assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function eqFilter_getPrototypeOf(o) {
      eqFilter_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return eqFilter_getPrototypeOf(o);
    }
    function eqFilter_inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        eqFilter_setPrototypeOf(subClass, superClass);
    }
    function eqFilter_setPrototypeOf(o, p) {
      eqFilter_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return eqFilter_setPrototypeOf(o, p);
    }
    var eqFilter_EQFilter = function(_Filter) {
      eqFilter_inherits(EQFilter, _Filter);
      function EQFilter(freq, res) {
        var _this;
        eqFilter_classCallCheck(this, EQFilter);
        _this = eqFilter_possibleConstructorReturn(this, eqFilter_getPrototypeOf(EQFilter).call(this, "peaking"));
        _this.disconnect();
        _this.set(freq, res);
        _this.biquad.gain.value = 0;
        delete _this.input;
        delete _this.output;
        delete _this._drywet;
        delete _this.wet;
        return _this;
      }
      eqFilter_createClass(EQFilter, [{
        key: "amp",
        value: function amp() {
          console.warn("`amp()` is not available for p5.EQ bands. Use `.gain()`");
        }
      }, {
        key: "drywet",
        value: function drywet() {
          console.warn("`drywet()` is not available for p5.EQ bands.");
        }
      }, {
        key: "connect",
        value: function connect(unit) {
          var u = unit || p5.soundOut.input;
          if (this.biquad) {
            this.biquad.connect(u.input ? u.input : u);
          } else {
            this.output.connect(u.input ? u.input : u);
          }
        }
      }, {
        key: "disconnect",
        value: function disconnect() {
          if (this.biquad) {
            this.biquad.disconnect();
          }
        }
      }, {
        key: "dispose",
        value: function dispose() {
          var index = main.soundArray.indexOf(this);
          main.soundArray.splice(index, 1);
          this.disconnect();
          delete this.biquad;
        }
      }]);
      return EQFilter;
    }(filter);
    var eqFilter = eqFilter_EQFilter;
    function eq_typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        eq_typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        eq_typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return eq_typeof(obj);
    }
    function eq_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function eq_defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function eq_createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        eq_defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        eq_defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function eq_possibleConstructorReturn(self2, call) {
      if (call && (eq_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return eq_assertThisInitialized(self2);
    }
    function eq_assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function eq_get(target, property, receiver) {
      if (typeof Reflect !== "undefined" && Reflect.get) {
        eq_get = Reflect.get;
      } else {
        eq_get = function _get2(target2, property2, receiver2) {
          var base = eq_superPropBase(target2, property2);
          if (!base)
            return;
          var desc = Object.getOwnPropertyDescriptor(base, property2);
          if (desc.get) {
            return desc.get.call(receiver2);
          }
          return desc.value;
        };
      }
      return eq_get(target, property, receiver || target);
    }
    function eq_superPropBase(object, property) {
      while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = eq_getPrototypeOf(object);
        if (object === null)
          break;
      }
      return object;
    }
    function eq_getPrototypeOf(o) {
      eq_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return eq_getPrototypeOf(o);
    }
    function eq_inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        eq_setPrototypeOf(subClass, superClass);
    }
    function eq_setPrototypeOf(o, p) {
      eq_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return eq_setPrototypeOf(o, p);
    }
    var eq_EQ = function(_Effect) {
      eq_inherits(EQ, _Effect);
      function EQ(_eqsize) {
        var _this;
        eq_classCallCheck(this, EQ);
        _this = eq_possibleConstructorReturn(this, eq_getPrototypeOf(EQ).call(this));
        _eqsize = _eqsize === 3 || _eqsize === 8 ? _eqsize : 3;
        var factor;
        _eqsize === 3 ? factor = Math.pow(2, 3) : factor = 2;
        _this.bands = [];
        var freq, res;
        for (var i = 0; i < _eqsize; i++) {
          if (i === _eqsize - 1) {
            freq = 21e3;
            res = 0.01;
          } else if (i === 0) {
            freq = 100;
            res = 0.1;
          } else if (i === 1) {
            freq = _eqsize === 3 ? 360 * factor : 360;
            res = 1;
          } else {
            freq = _this.bands[i - 1].freq() * factor;
            res = 1;
          }
          _this.bands[i] = _this._newBand(freq, res);
          if (i > 0) {
            _this.bands[i - 1].connect(_this.bands[i].biquad);
          } else {
            _this.input.connect(_this.bands[i].biquad);
          }
        }
        _this.bands[_eqsize - 1].connect(_this.output);
        return _this;
      }
      eq_createClass(EQ, [{
        key: "process",
        value: function process(src) {
          src.connect(this.input);
        }
        //   * Set the frequency and gain of each band in the EQ. This method should be
        //   * called with 3 or 8 frequency and gain pairs, depending on the size of the EQ.
        //   * ex. eq.set(freq0, gain0, freq1, gain1, freq2, gain2);
        //   *
        //   * @method  set
        //   * @for p5.EQ
        //   * @param {Number} [freq0] Frequency value for band with index 0
        //   * @param {Number} [gain0] Gain value for band with index 0
        //   * @param {Number} [freq1] Frequency value for band with index 1
        //   * @param {Number} [gain1] Gain value for band with index 1
        //   * @param {Number} [freq2] Frequency value for band with index 2
        //   * @param {Number} [gain2] Gain value for band with index 2
        //   * @param {Number} [freq3] Frequency value for band with index 3
        //   * @param {Number} [gain3] Gain value for band with index 3
        //   * @param {Number} [freq4] Frequency value for band with index 4
        //   * @param {Number} [gain4] Gain value for band with index 4
        //   * @param {Number} [freq5] Frequency value for band with index 5
        //   * @param {Number} [gain5] Gain value for band with index 5
        //   * @param {Number} [freq6] Frequency value for band with index 6
        //   * @param {Number} [gain6] Gain value for band with index 6
        //   * @param {Number} [freq7] Frequency value for band with index 7
        //   * @param {Number} [gain7] Gain value for band with index 7
        //   */
      }, {
        key: "set",
        value: function set() {
          if (arguments.length === this.bands.length * 2) {
            for (var i = 0; i < arguments.length; i += 2) {
              this.bands[i / 2].freq(arguments[i]);
              this.bands[i / 2].gain(arguments[i + 1]);
            }
          } else {
            console.error("Argument mismatch. .set() should be called with " + this.bands.length * 2 + " arguments. (one frequency and gain value pair for each band of the eq)");
          }
        }
        /**
         * Add a new band. Creates a p5.Filter and strips away everything but
         * the raw biquad filter. This method returns an abstracted p5.Filter,
         * which can be added to p5.EQ.bands, in order to create new EQ bands.
         * @private
         * @for p5.EQ
         * @method  _newBand
         * @param  {Number} freq
         * @param  {Number} res
         * @return {Object}      Abstracted Filter
         */
      }, {
        key: "_newBand",
        value: function _newBand(freq, res) {
          return new eqFilter(freq, res);
        }
      }, {
        key: "dispose",
        value: function dispose() {
          eq_get(eq_getPrototypeOf(EQ.prototype), "dispose", this).call(this);
          if (this.bands) {
            while (this.bands.length > 0) {
              delete this.bands.pop().dispose();
            }
            delete this.bands;
          }
        }
      }]);
      return EQ;
    }(effect);
    var eq = eq_EQ;
    function listener3d_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function listener3d_defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function listener3d_createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        listener3d_defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        listener3d_defineProperties(Constructor, staticProps);
      return Constructor;
    }
    var listener3d_Listener3D = function() {
      function Listener3D(type) {
        listener3d_classCallCheck(this, Listener3D);
        this.ac = main.audiocontext;
        this.listener = this.ac.listener;
      }
      listener3d_createClass(Listener3D, [{
        key: "process",
        value: function process(src) {
          src.connect(this.input);
        }
        //   * Set the X,Y,Z position of the Panner
        //   * @param  {[Number]} xVal
        //   * @param  {[Number]} yVal
        //   * @param  {[Number]} zVal
        //   * @param  {[Number]} time
        //   * @return {[Array]}      [Updated x, y, z values as an array]
        //   */
      }, {
        key: "position",
        value: function position(xVal, yVal, zVal, time) {
          this.positionX(xVal, time);
          this.positionY(yVal, time);
          this.positionZ(zVal, time);
          return [this.listener.positionX.value, this.listener.positionY.value, this.listener.positionZ.value];
        }
        //   * Getter and setter methods for position coordinates
        //   * @return {Number}      [updated coordinate value]
        //   */
      }, {
        key: "positionX",
        value: function positionX(xVal, time) {
          var t = time || 0;
          if (typeof xVal === "number") {
            this.listener.positionX.value = xVal;
            this.listener.positionX.cancelScheduledValues(this.ac.currentTime + 0.01 + t);
            this.listener.positionX.linearRampToValueAtTime(xVal, this.ac.currentTime + 0.02 + t);
          } else if (xVal) {
            xVal.connect(this.listener.positionX);
          }
          return this.listener.positionX.value;
        }
      }, {
        key: "positionY",
        value: function positionY(yVal, time) {
          var t = time || 0;
          if (typeof yVal === "number") {
            this.listener.positionY.value = yVal;
            this.listener.positionY.cancelScheduledValues(this.ac.currentTime + 0.01 + t);
            this.listener.positionY.linearRampToValueAtTime(yVal, this.ac.currentTime + 0.02 + t);
          } else if (yVal) {
            yVal.connect(this.listener.positionY);
          }
          return this.listener.positionY.value;
        }
      }, {
        key: "positionZ",
        value: function positionZ(zVal, time) {
          var t = time || 0;
          if (typeof zVal === "number") {
            this.listener.positionZ.value = zVal;
            this.listener.positionZ.cancelScheduledValues(this.ac.currentTime + 0.01 + t);
            this.listener.positionZ.linearRampToValueAtTime(zVal, this.ac.currentTime + 0.02 + t);
          } else if (zVal) {
            zVal.connect(this.listener.positionZ);
          }
          return this.listener.positionZ.value;
        }
        //   * Overrides the listener orient() method because Listener has slightly
        //   * different params. In human terms, Forward vectors are the direction the
        //   * nose is pointing. Up vectors are the direction of the top of the head.
        //   *
        //   * @method orient
        //   * @param  {Number} xValF  Forward vector X direction
        //   * @param  {Number} yValF  Forward vector Y direction
        //   * @param  {Number} zValF  Forward vector Z direction
        //   * @param  {Number} xValU  Up vector X direction
        //   * @param  {Number} yValU  Up vector Y direction
        //   * @param  {Number} zValU  Up vector Z direction
        //   * @param  {Number} time
        //   * @return {Array}       All orienation params
        //   */
      }, {
        key: "orient",
        value: function orient(xValF, yValF, zValF, xValU, yValU, zValU, time) {
          if (arguments.length === 3 || arguments.length === 4) {
            time = arguments[3];
            this.orientForward(xValF, yValF, zValF, time);
          } else if (arguments.length === 6 || arguments === 7) {
            this.orientForward(xValF, yValF, zValF);
            this.orientUp(xValU, yValU, zValU, time);
          }
          return [this.listener.forwardX.value, this.listener.forwardY.value, this.listener.forwardZ.value, this.listener.upX.value, this.listener.upY.value, this.listener.upZ.value];
        }
      }, {
        key: "orientForward",
        value: function orientForward(xValF, yValF, zValF, time) {
          this.forwardX(xValF, time);
          this.forwardY(yValF, time);
          this.forwardZ(zValF, time);
          return [this.listener.forwardX, this.listener.forwardY, this.listener.forwardZ];
        }
      }, {
        key: "orientUp",
        value: function orientUp(xValU, yValU, zValU, time) {
          this.upX(xValU, time);
          this.upY(yValU, time);
          this.upZ(zValU, time);
          return [this.listener.upX, this.listener.upY, this.listener.upZ];
        }
        //   * Getter and setter methods for orient coordinates
        //   * @return {Number}      [updated coordinate value]
        //   */
      }, {
        key: "forwardX",
        value: function forwardX(xVal, time) {
          var t = time || 0;
          if (typeof xVal === "number") {
            this.listener.forwardX.value = xVal;
            this.listener.forwardX.cancelScheduledValues(this.ac.currentTime + 0.01 + t);
            this.listener.forwardX.linearRampToValueAtTime(xVal, this.ac.currentTime + 0.02 + t);
          } else if (xVal) {
            xVal.connect(this.listener.forwardX);
          }
          return this.listener.forwardX.value;
        }
      }, {
        key: "forwardY",
        value: function forwardY(yVal, time) {
          var t = time || 0;
          if (typeof yVal === "number") {
            this.listener.forwardY.value = yVal;
            this.listener.forwardY.cancelScheduledValues(this.ac.currentTime + 0.01 + t);
            this.listener.forwardY.linearRampToValueAtTime(yVal, this.ac.currentTime + 0.02 + t);
          } else if (yVal) {
            yVal.connect(this.listener.forwardY);
          }
          return this.listener.forwardY.value;
        }
      }, {
        key: "forwardZ",
        value: function forwardZ(zVal, time) {
          var t = time || 0;
          if (typeof zVal === "number") {
            this.listener.forwardZ.value = zVal;
            this.listener.forwardZ.cancelScheduledValues(this.ac.currentTime + 0.01 + t);
            this.listener.forwardZ.linearRampToValueAtTime(zVal, this.ac.currentTime + 0.02 + t);
          } else if (zVal) {
            zVal.connect(this.listener.forwardZ);
          }
          return this.listener.forwardZ.value;
        }
      }, {
        key: "upX",
        value: function upX(xVal, time) {
          var t = time || 0;
          if (typeof xVal === "number") {
            this.listener.upX.value = xVal;
            this.listener.upX.cancelScheduledValues(this.ac.currentTime + 0.01 + t);
            this.listener.upX.linearRampToValueAtTime(xVal, this.ac.currentTime + 0.02 + t);
          } else if (xVal) {
            xVal.connect(this.listener.upX);
          }
          return this.listener.upX.value;
        }
      }, {
        key: "upY",
        value: function upY(yVal, time) {
          var t = time || 0;
          if (typeof yVal === "number") {
            this.listener.upY.value = yVal;
            this.listener.upY.cancelScheduledValues(this.ac.currentTime + 0.01 + t);
            this.listener.upY.linearRampToValueAtTime(yVal, this.ac.currentTime + 0.02 + t);
          } else if (yVal) {
            yVal.connect(this.listener.upY);
          }
          return this.listener.upY.value;
        }
      }, {
        key: "upZ",
        value: function upZ(zVal, time) {
          var t = time || 0;
          if (typeof zVal === "number") {
            this.listener.upZ.value = zVal;
            this.listener.upZ.cancelScheduledValues(this.ac.currentTime + 0.01 + t);
            this.listener.upZ.linearRampToValueAtTime(zVal, this.ac.currentTime + 0.02 + t);
          } else if (zVal) {
            zVal.connect(this.listener.upZ);
          }
          return this.listener.upZ.value;
        }
      }]);
      return Listener3D;
    }();
    var listener3d = listener3d_Listener3D;
    function panner3d_typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        panner3d_typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        panner3d_typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return panner3d_typeof(obj);
    }
    function panner3d_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function panner3d_defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function panner3d_createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        panner3d_defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        panner3d_defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function panner3d_possibleConstructorReturn(self2, call) {
      if (call && (panner3d_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return panner3d_assertThisInitialized(self2);
    }
    function panner3d_assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function panner3d_get(target, property, receiver) {
      if (typeof Reflect !== "undefined" && Reflect.get) {
        panner3d_get = Reflect.get;
      } else {
        panner3d_get = function _get2(target2, property2, receiver2) {
          var base = panner3d_superPropBase(target2, property2);
          if (!base)
            return;
          var desc = Object.getOwnPropertyDescriptor(base, property2);
          if (desc.get) {
            return desc.get.call(receiver2);
          }
          return desc.value;
        };
      }
      return panner3d_get(target, property, receiver || target);
    }
    function panner3d_superPropBase(object, property) {
      while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = panner3d_getPrototypeOf(object);
        if (object === null)
          break;
      }
      return object;
    }
    function panner3d_getPrototypeOf(o) {
      panner3d_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return panner3d_getPrototypeOf(o);
    }
    function panner3d_inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        panner3d_setPrototypeOf(subClass, superClass);
    }
    function panner3d_setPrototypeOf(o, p) {
      panner3d_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return panner3d_setPrototypeOf(o, p);
    }
    var Panner3D = function(_Effect) {
      panner3d_inherits(Panner3D2, _Effect);
      function Panner3D2() {
        var _this;
        panner3d_classCallCheck(this, Panner3D2);
        _this = panner3d_possibleConstructorReturn(this, panner3d_getPrototypeOf(Panner3D2).call(this));
        _this.panner = _this.ac.createPanner();
        _this.panner.panningModel = "HRTF";
        _this.panner.distanceModel = "linear";
        _this.panner.connect(_this.output);
        _this.input.connect(_this.panner);
        return _this;
      }
      panner3d_createClass(Panner3D2, [{
        key: "process",
        value: function process(src) {
          src.connect(this.input);
        }
        /**
         * Set the X,Y,Z position of the Panner
         * @method set
         * @for p5.Panner3D
         * @param  {Number} xVal
         * @param  {Number} yVal
         * @param  {Number} zVal
         * @param  {Number} time
         * @return {Array}      Updated x, y, z values as an array
         */
      }, {
        key: "set",
        value: function set(xVal, yVal, zVal, time) {
          this.positionX(xVal, time);
          this.positionY(yVal, time);
          this.positionZ(zVal, time);
          return [this.panner.positionX.value, this.panner.positionY.value, this.panner.positionZ.value];
        }
        /**
         * Getter and setter methods for position coordinates
         * @method positionX
         * @for p5.Panner3D
         * @return {Number}      updated coordinate value
         */
        /**
         * Getter and setter methods for position coordinates
         * @method positionY
         * @for p5.Panner3D
         * @return {Number}      updated coordinate value
         */
        /**
         * Getter and setter methods for position coordinates
         * @method positionZ
         * @for p5.Panner3D
         * @return {Number}      updated coordinate value
         */
      }, {
        key: "positionX",
        value: function positionX(xVal, time) {
          var t = time || 0;
          if (typeof xVal === "number") {
            this.panner.positionX.value = xVal;
            this.panner.positionX.cancelScheduledValues(this.ac.currentTime + 0.01 + t);
            this.panner.positionX.linearRampToValueAtTime(xVal, this.ac.currentTime + 0.02 + t);
          } else if (xVal) {
            xVal.connect(this.panner.positionX);
          }
          return this.panner.positionX.value;
        }
      }, {
        key: "positionY",
        value: function positionY(yVal, time) {
          var t = time || 0;
          if (typeof yVal === "number") {
            this.panner.positionY.value = yVal;
            this.panner.positionY.cancelScheduledValues(this.ac.currentTime + 0.01 + t);
            this.panner.positionY.linearRampToValueAtTime(yVal, this.ac.currentTime + 0.02 + t);
          } else if (yVal) {
            yVal.connect(this.panner.positionY);
          }
          return this.panner.positionY.value;
        }
      }, {
        key: "positionZ",
        value: function positionZ(zVal, time) {
          var t = time || 0;
          if (typeof zVal === "number") {
            this.panner.positionZ.value = zVal;
            this.panner.positionZ.cancelScheduledValues(this.ac.currentTime + 0.01 + t);
            this.panner.positionZ.linearRampToValueAtTime(zVal, this.ac.currentTime + 0.02 + t);
          } else if (zVal) {
            zVal.connect(this.panner.positionZ);
          }
          return this.panner.positionZ.value;
        }
        /**
         * Set the X,Y,Z position of the Panner
         * @method  orient
         * @for p5.Panner3D
         * @param  {Number} xVal
         * @param  {Number} yVal
         * @param  {Number} zVal
         * @param  {Number} time
         * @return {Array}      Updated x, y, z values as an array
         */
      }, {
        key: "orient",
        value: function orient(xVal, yVal, zVal, time) {
          this.orientX(xVal, time);
          this.orientY(yVal, time);
          this.orientZ(zVal, time);
          return [this.panner.orientationX.value, this.panner.orientationY.value, this.panner.orientationZ.value];
        }
        /**
         * Getter and setter methods for orient coordinates
         * @method orientX
         * @for p5.Panner3D
         * @return {Number}      updated coordinate value
         */
        /**
         * Getter and setter methods for orient coordinates
         * @method orientY
         * @for p5.Panner3D
         * @return {Number}      updated coordinate value
         */
        /**
         * Getter and setter methods for orient coordinates
         * @method orientZ
         * @for p5.Panner3D
         * @return {Number}      updated coordinate value
         */
      }, {
        key: "orientX",
        value: function orientX(xVal, time) {
          var t = time || 0;
          if (typeof xVal === "number") {
            this.panner.orientationX.value = xVal;
            this.panner.orientationX.cancelScheduledValues(this.ac.currentTime + 0.01 + t);
            this.panner.orientationX.linearRampToValueAtTime(xVal, this.ac.currentTime + 0.02 + t);
          } else if (xVal) {
            xVal.connect(this.panner.orientationX);
          }
          return this.panner.orientationX.value;
        }
      }, {
        key: "orientY",
        value: function orientY(yVal, time) {
          var t = time || 0;
          if (typeof yVal === "number") {
            this.panner.orientationY.value = yVal;
            this.panner.orientationY.cancelScheduledValues(this.ac.currentTime + 0.01 + t);
            this.panner.orientationY.linearRampToValueAtTime(yVal, this.ac.currentTime + 0.02 + t);
          } else if (yVal) {
            yVal.connect(this.panner.orientationY);
          }
          return this.panner.orientationY.value;
        }
      }, {
        key: "orientZ",
        value: function orientZ(zVal, time) {
          var t = time || 0;
          if (typeof zVal === "number") {
            this.panner.orientationZ.value = zVal;
            this.panner.orientationZ.cancelScheduledValues(this.ac.currentTime + 0.01 + t);
            this.panner.orientationZ.linearRampToValueAtTime(zVal, this.ac.currentTime + 0.02 + t);
          } else if (zVal) {
            zVal.connect(this.panner.orientationZ);
          }
          return this.panner.orientationZ.value;
        }
        /**
         * Set the rolloff factor and max distance
         * @method  setFalloff
         * @for p5.Panner3D
         * @param {Number} [maxDistance]
         * @param {Number} [rolloffFactor]
         */
      }, {
        key: "setFalloff",
        value: function setFalloff(maxDistance, rolloffFactor) {
          this.maxDist(maxDistance);
          this.rolloff(rolloffFactor);
        }
        /**
         * Maxium distance between the source and the listener
         * @method  maxDist
         * @for p5.Panner3D
         * @param  {Number} maxDistance
         * @return {Number} updated value
         */
      }, {
        key: "maxDist",
        value: function maxDist(maxDistance) {
          if (typeof maxDistance === "number") {
            this.panner.maxDistance = maxDistance;
          }
          return this.panner.maxDistance;
        }
        /**
         * How quickly the volume is reduced as the source moves away from the listener
         * @method  rollof
         * @for p5.Panner3D
         * @param  {Number} rolloffFactor
         * @return {Number} updated value
         */
      }, {
        key: "rolloff",
        value: function rolloff(rolloffFactor) {
          if (typeof rolloffFactor === "number") {
            this.panner.rolloffFactor = rolloffFactor;
          }
          return this.panner.rolloffFactor;
        }
      }, {
        key: "dispose",
        value: function dispose() {
          panner3d_get(panner3d_getPrototypeOf(Panner3D2.prototype), "dispose", this).call(this);
          if (this.panner) {
            this.panner.disconnect();
            delete this.panner;
          }
        }
      }]);
      return Panner3D2;
    }(effect);
    var panner3d = Panner3D;
    function delay_typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        delay_typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        delay_typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return delay_typeof(obj);
    }
    function delay_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function delay_defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function delay_createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        delay_defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        delay_defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function delay_possibleConstructorReturn(self2, call) {
      if (call && (delay_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return delay_assertThisInitialized(self2);
    }
    function delay_assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function delay_get(target, property, receiver) {
      if (typeof Reflect !== "undefined" && Reflect.get) {
        delay_get = Reflect.get;
      } else {
        delay_get = function _get2(target2, property2, receiver2) {
          var base = delay_superPropBase(target2, property2);
          if (!base)
            return;
          var desc = Object.getOwnPropertyDescriptor(base, property2);
          if (desc.get) {
            return desc.get.call(receiver2);
          }
          return desc.value;
        };
      }
      return delay_get(target, property, receiver || target);
    }
    function delay_superPropBase(object, property) {
      while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = delay_getPrototypeOf(object);
        if (object === null)
          break;
      }
      return object;
    }
    function delay_getPrototypeOf(o) {
      delay_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return delay_getPrototypeOf(o);
    }
    function delay_inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        delay_setPrototypeOf(subClass, superClass);
    }
    function delay_setPrototypeOf(o, p) {
      delay_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return delay_setPrototypeOf(o, p);
    }
    var delay_Delay = function(_Effect) {
      delay_inherits(Delay, _Effect);
      function Delay() {
        var _this;
        delay_classCallCheck(this, Delay);
        _this = delay_possibleConstructorReturn(this, delay_getPrototypeOf(Delay).call(this));
        _this._split = _this.ac.createChannelSplitter(2);
        _this._merge = _this.ac.createChannelMerger(2);
        _this._leftGain = _this.ac.createGain();
        _this._rightGain = _this.ac.createGain();
        _this.leftDelay = _this.ac.createDelay();
        _this.rightDelay = _this.ac.createDelay();
        _this._leftFilter = new filter();
        _this._rightFilter = new filter();
        _this._leftFilter.disconnect();
        _this._rightFilter.disconnect();
        _this._leftFilter.biquad.frequency.setValueAtTime(1200, _this.ac.currentTime);
        _this._rightFilter.biquad.frequency.setValueAtTime(1200, _this.ac.currentTime);
        _this._leftFilter.biquad.Q.setValueAtTime(0.3, _this.ac.currentTime);
        _this._rightFilter.biquad.Q.setValueAtTime(0.3, _this.ac.currentTime);
        _this.input.connect(_this._split);
        _this.leftDelay.connect(_this._leftGain);
        _this.rightDelay.connect(_this._rightGain);
        _this._leftGain.connect(_this._leftFilter.input);
        _this._rightGain.connect(_this._rightFilter.input);
        _this._merge.connect(_this.wet);
        _this._leftFilter.biquad.gain.setValueAtTime(1, _this.ac.currentTime);
        _this._rightFilter.biquad.gain.setValueAtTime(1, _this.ac.currentTime);
        _this.setType(0);
        _this._maxDelay = _this.leftDelay.delayTime.maxValue;
        _this.feedback(0.5);
        return _this;
      }
      delay_createClass(Delay, [{
        key: "process",
        value: function process(src, _delayTime, _feedback, _filter) {
          var feedback = _feedback || 0;
          var delayTime = _delayTime || 0;
          if (feedback >= 1) {
            throw new Error("Feedback value will force a positive feedback loop.");
          }
          if (delayTime >= this._maxDelay) {
            throw new Error("Delay Time exceeds maximum delay time of " + this._maxDelay + " second.");
          }
          src.connect(this.input);
          this.leftDelay.delayTime.setValueAtTime(delayTime, this.ac.currentTime);
          this.rightDelay.delayTime.setValueAtTime(delayTime, this.ac.currentTime);
          this._leftGain.gain.value = feedback;
          this._rightGain.gain.value = feedback;
          if (_filter) {
            this._leftFilter.freq(_filter);
            this._rightFilter.freq(_filter);
          }
        }
        /**
         *  Set the delay (echo) time, in seconds. Usually this value will be
         *  a floating point number between 0.0 and 1.0.
         *
         *  @method  delayTime
         *  @for p5.Delay
         *  @param {Number} delayTime Time (in seconds) of the delay
         */
      }, {
        key: "delayTime",
        value: function delayTime(t) {
          if (typeof t !== "number") {
            t.connect(this.leftDelay.delayTime);
            t.connect(this.rightDelay.delayTime);
          } else {
            this.leftDelay.delayTime.cancelScheduledValues(this.ac.currentTime);
            this.rightDelay.delayTime.cancelScheduledValues(this.ac.currentTime);
            this.leftDelay.delayTime.linearRampToValueAtTime(t, this.ac.currentTime);
            this.rightDelay.delayTime.linearRampToValueAtTime(t, this.ac.currentTime);
          }
        }
        /**
         *  Feedback occurs when Delay sends its signal back through its input
         *  in a loop. The feedback amount determines how much signal to send each
         *  time through the loop. A feedback greater than 1.0 is not desirable because
         *  it will increase the overall output each time through the loop,
         *  creating an infinite feedback loop. The default value is 0.5
         *
         *  @method  feedback
         *  @for p5.Delay
         *  @param {Number|Object} feedback 0.0 to 1.0, or an object such as an
         *                                  Oscillator that can be used to
         *                                  modulate this param
         *  @returns {Number} Feedback value
         *
         */
      }, {
        key: "feedback",
        value: function feedback(f) {
          if (f && typeof f !== "number") {
            f.connect(this._leftGain.gain);
            f.connect(this._rightGain.gain);
          } else if (f >= 1) {
            throw new Error("Feedback value will force a positive feedback loop.");
          } else if (typeof f === "number") {
            this._leftGain.gain.value = f;
            this._rightGain.gain.value = f;
          }
          return this._leftGain.gain.value;
        }
        /**
         *  Set a lowpass filter frequency for the delay. A lowpass filter
         *  will cut off any frequencies higher than the filter frequency.
         *
         *  @method  filter
         *  @for p5.Delay
         *  @param {Number|Object} cutoffFreq  A lowpass filter will cut off any
         *                              frequencies higher than the filter frequency.
         *  @param {Number|Object} res  Resonance of the filter frequency
         *                              cutoff, or an object (i.e. a p5.Oscillator)
         *                              that can be used to modulate this parameter.
         *                              High numbers (i.e. 15) will produce a resonance,
         *                              low numbers (i.e. .2) will produce a slope.
         */
      }, {
        key: "filter",
        value: function filter2(freq, q) {
          this._leftFilter.set(freq, q);
          this._rightFilter.set(freq, q);
        }
        /**
         *  Choose a preset type of delay. 'pingPong' bounces the signal
         *  from the left to the right channel to produce a stereo effect.
         *  Any other parameter will revert to the default delay setting.
         *
         *  @method  setType
         *  @for p5.Delay
         *  @param {String|Number} type 'pingPong' (1) or 'default' (0)
         */
      }, {
        key: "setType",
        value: function setType(t) {
          if (t === 1) {
            t = "pingPong";
          }
          this._split.disconnect();
          this._leftFilter.disconnect();
          this._rightFilter.disconnect();
          this._split.connect(this.leftDelay, 0);
          this._split.connect(this.rightDelay, 1);
          switch (t) {
            case "pingPong":
              this._rightFilter.setType(this._leftFilter.biquad.type);
              this._leftFilter.output.connect(this._merge, 0, 0);
              this._rightFilter.output.connect(this._merge, 0, 1);
              this._leftFilter.output.connect(this.rightDelay);
              this._rightFilter.output.connect(this.leftDelay);
              break;
            default:
              this._leftFilter.output.connect(this._merge, 0, 0);
              this._rightFilter.output.connect(this._merge, 0, 1);
              this._leftFilter.output.connect(this.leftDelay);
              this._rightFilter.output.connect(this.rightDelay);
          }
        }
        /**
         *  Set the output level of the delay effect.
         *
         *  @method  amp
         *  @for p5.Delay
         *  @param  {Number} volume amplitude between 0 and 1.0
         *  @param {Number} [rampTime] create a fade that lasts rampTime
         *  @param {Number} [timeFromNow] schedule this event to happen
         *                                seconds from now
         */
        /**
         *  Send output to a p5.sound or web audio object
         *
         *  @method  connect
         *  @for p5.Delay
         *  @param  {Object} unit
         */
        /**
         *  Disconnect all output.
         *
         *  @method disconnect
         *  @for p5.Delay
         */
      }, {
        key: "dispose",
        value: function dispose() {
          delay_get(delay_getPrototypeOf(Delay.prototype), "dispose", this).call(this);
          this._split.disconnect();
          this._leftFilter.dispose();
          this._rightFilter.dispose();
          this._merge.disconnect();
          this._leftGain.disconnect();
          this._rightGain.disconnect();
          this.leftDelay.disconnect();
          this.rightDelay.disconnect();
          this._split = void 0;
          this._leftFilter = void 0;
          this._rightFilter = void 0;
          this._merge = void 0;
          this._leftGain = void 0;
          this._rightGain = void 0;
          this.leftDelay = void 0;
          this.rightDelay = void 0;
        }
      }]);
      return Delay;
    }(effect);
    var delay = delay_Delay;
    function reverb_typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        reverb_typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        reverb_typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return reverb_typeof(obj);
    }
    function reverb_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function reverb_defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function reverb_createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        reverb_defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        reverb_defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function reverb_possibleConstructorReturn(self2, call) {
      if (call && (reverb_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return reverb_assertThisInitialized(self2);
    }
    function reverb_assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function reverb_get(target, property, receiver) {
      if (typeof Reflect !== "undefined" && Reflect.get) {
        reverb_get = Reflect.get;
      } else {
        reverb_get = function _get2(target2, property2, receiver2) {
          var base = reverb_superPropBase(target2, property2);
          if (!base)
            return;
          var desc = Object.getOwnPropertyDescriptor(base, property2);
          if (desc.get) {
            return desc.get.call(receiver2);
          }
          return desc.value;
        };
      }
      return reverb_get(target, property, receiver || target);
    }
    function reverb_superPropBase(object, property) {
      while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = reverb_getPrototypeOf(object);
        if (object === null)
          break;
      }
      return object;
    }
    function reverb_getPrototypeOf(o) {
      reverb_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return reverb_getPrototypeOf(o);
    }
    function reverb_inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        reverb_setPrototypeOf(subClass, superClass);
    }
    function reverb_setPrototypeOf(o, p) {
      reverb_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return reverb_setPrototypeOf(o, p);
    }
    var Reverb = function(_Effect) {
      reverb_inherits(Reverb2, _Effect);
      function Reverb2() {
        var _this;
        reverb_classCallCheck(this, Reverb2);
        _this = reverb_possibleConstructorReturn(this, reverb_getPrototypeOf(Reverb2).call(this));
        _this._initConvolverNode();
        _this.input.gain.value = 0.5;
        _this._seconds = 3;
        _this._decay = 2;
        _this._reverse = false;
        _this._buildImpulse();
        return _this;
      }
      reverb_createClass(Reverb2, [{
        key: "_initConvolverNode",
        value: function _initConvolverNode() {
          this.convolverNode = this.ac.createConvolver();
          this.input.connect(this.convolverNode);
          this.convolverNode.connect(this.wet);
        }
      }, {
        key: "_teardownConvolverNode",
        value: function _teardownConvolverNode() {
          if (this.convolverNode) {
            this.convolverNode.disconnect();
            delete this.convolverNode;
          }
        }
      }, {
        key: "_setBuffer",
        value: function _setBuffer(audioBuffer) {
          this._teardownConvolverNode();
          this._initConvolverNode();
          this.convolverNode.buffer = audioBuffer;
        }
        /**
         *  Connect a source to the reverb, and assign reverb parameters.
         *
         *  @method  process
         *  @for p5.Reverb
         *  @param  {Object} src     p5.sound / Web Audio object with a sound
         *                           output.
         *  @param  {Number} [seconds] Duration of the reverb, in seconds.
         *                           Min: 0, Max: 10. Defaults to 3.
         *  @param  {Number} [decayRate] Percentage of decay with each echo.
         *                            Min: 0, Max: 100. Defaults to 2.
         *  @param  {Boolean} [reverse] Play the reverb backwards or forwards.
         */
      }, {
        key: "process",
        value: function process(src, seconds, decayRate, reverse) {
          src.connect(this.input);
          var rebuild = false;
          if (seconds) {
            this._seconds = seconds;
            rebuild = true;
          }
          if (decayRate) {
            this._decay = decayRate;
          }
          if (reverse) {
            this._reverse = reverse;
          }
          if (rebuild) {
            this._buildImpulse();
          }
        }
        /**
         *  Set the reverb settings. Similar to .process(), but without
         *  assigning a new input.
         *
         *  @method  set
         *  @for p5.Reverb
         *  @param  {Number} [seconds] Duration of the reverb, in seconds.
         *                           Min: 0, Max: 10. Defaults to 3.
         *  @param  {Number} [decayRate] Percentage of decay with each echo.
         *                            Min: 0, Max: 100. Defaults to 2.
         *  @param  {Boolean} [reverse] Play the reverb backwards or forwards.
         */
      }, {
        key: "set",
        value: function set(seconds, decayRate, reverse) {
          var rebuild = false;
          if (seconds) {
            this._seconds = seconds;
            rebuild = true;
          }
          if (decayRate) {
            this._decay = decayRate;
          }
          if (reverse) {
            this._reverse = reverse;
          }
          if (rebuild) {
            this._buildImpulse();
          }
        }
        /**
         *  Set the output level of the reverb effect.
         *
         *  @method  amp
         *  @for p5.Reverb
         *  @param  {Number} volume amplitude between 0 and 1.0
         *  @param  {Number} [rampTime] create a fade that lasts rampTime
         *  @param  {Number} [timeFromNow] schedule this event to happen
         *                                seconds from now
         */
        /**
         *  Send output to a p5.sound or web audio object
         *
         *  @method  connect
         *  @for p5.Reverb
         *  @param  {Object} unit
         */
        /**
         *  Disconnect all output.
         *
         *  @method disconnect
         *  @for p5.Reverb
         */
        /**
         *  Inspired by Simple Reverb by Jordan Santell
         *  https://github.com/web-audio-components/simple-reverb/blob/master/index.js
         *
         *  Utility function for building an impulse response
         *  based on the module parameters.
         *
         *  @private
         */
      }, {
        key: "_buildImpulse",
        value: function _buildImpulse() {
          var rate = this.ac.sampleRate;
          var length = rate * this._seconds;
          var decay = this._decay;
          var impulse = this.ac.createBuffer(2, length, rate);
          var impulseL = impulse.getChannelData(0);
          var impulseR = impulse.getChannelData(1);
          var n, i;
          for (i = 0; i < length; i++) {
            n = this._reverse ? length - i : i;
            impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
            impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
          }
          this._setBuffer(impulse);
        }
      }, {
        key: "dispose",
        value: function dispose() {
          reverb_get(reverb_getPrototypeOf(Reverb2.prototype), "dispose", this).call(this);
          this._teardownConvolverNode();
        }
      }]);
      return Reverb2;
    }(effect);
    var reverb_Convolver = function(_Reverb) {
      reverb_inherits(Convolver, _Reverb);
      function Convolver(path, callback, errorCallback) {
        var _this2;
        reverb_classCallCheck(this, Convolver);
        _this2 = reverb_possibleConstructorReturn(this, reverb_getPrototypeOf(Convolver).call(this));
        _this2._initConvolverNode();
        _this2.input.gain.value = 0.5;
        if (path) {
          _this2.impulses = [];
          _this2._loadBuffer(path, callback, errorCallback);
        } else {
          _this2._seconds = 3;
          _this2._decay = 2;
          _this2._reverse = false;
          _this2._buildImpulse();
        }
        _this2.impulses = [];
        _this2.set = null;
        return _this2;
      }
      reverb_createClass(Convolver, [{
        key: "_loadBuffer",
        value: function _loadBuffer(_path, callback, errorCallback) {
          var path = p5.prototype._checkFileFormats(_path);
          var self2 = this;
          var errorTrace = new Error().stack;
          var ac = Object(audiocontext["b"])();
          var request = new XMLHttpRequest();
          request.open("GET", path, true);
          request.responseType = "arraybuffer";
          request.onload = function() {
            if (request.status === 200) {
              ac.decodeAudioData(
                request.response,
                function(buff) {
                  var buffer = {};
                  var chunks = path.split("/");
                  buffer.name = chunks[chunks.length - 1];
                  buffer.audioBuffer = buff;
                  self2.impulses.push(buffer);
                  self2._setBuffer(buffer.audioBuffer);
                  if (callback) {
                    callback(buffer);
                  }
                },
                function() {
                  var err2 = new errorHandler("decodeAudioData", errorTrace, self2.url);
                  var msg2 = "AudioContext error at decodeAudioData for " + self2.url;
                  if (errorCallback) {
                    err2.msg = msg2;
                    errorCallback(err2);
                  } else {
                    console.error(msg2 + "\n The error stack trace includes: \n" + err2.stack);
                  }
                }
              );
            } else {
              var err = new errorHandler("loadConvolver", errorTrace, self2.url);
              var msg = "Unable to load " + self2.url + ". The request status was: " + request.status + " (" + request.statusText + ")";
              if (errorCallback) {
                err.message = msg;
                errorCallback(err);
              } else {
                console.error(msg + "\n The error stack trace includes: \n" + err.stack);
              }
            }
          };
          request.onerror = function() {
            var err = new errorHandler("loadConvolver", errorTrace, self2.url);
            var msg = "There was no response from the server at " + self2.url + ". Check the url and internet connectivity.";
            if (errorCallback) {
              err.message = msg;
              errorCallback(err);
            } else {
              console.error(msg + "\n The error stack trace includes: \n" + err.stack);
            }
          };
          request.send();
        }
        /**
         *  Connect a source to the convolver.
         *
         *  @method  process
         *  @for p5.Convolver
         *  @param  {Object} src     p5.sound / Web Audio object with a sound
         *                           output.
         *  @example
         *  <div><code>
         *  let cVerb, sound;
         *  function preload() {
         *    // We have both MP3 and OGG versions of all sound assets
         *    soundFormats('ogg', 'mp3');
         *
         *    // Try replacing 'bx-spring' with other soundfiles like
         *    // 'concrete-tunnel' 'small-plate' 'drum' 'beatbox'
         *    cVerb = createConvolver('assets/bx-spring.mp3');
         *
         *    // Try replacing 'Damscray_DancingTiger' with
         *    // 'beat', 'doorbell', lucky_dragons_-_power_melody'
         *    sound = loadSound('assets/Damscray_DancingTiger.mp3');
         *  }
         *
         *  function setup() {
         *    let cnv = createCanvas(100, 100);
         *    cnv.mousePressed(playSound);
         *    background(220);
         *    text('tap to play', 20, 20);
         *
         *    // disconnect from main output...
         *    sound.disconnect();
         *
         *    // ...and process with cVerb
         *    // so that we only hear the convolution
         *    cVerb.process(sound);
         *  }
         *
         *  function playSound() {
         *    sound.play();
         *  }
         *
         *  </code></div>
         */
      }, {
        key: "process",
        value: function process(src) {
          src.connect(this.input);
        }
        /**
         *  Load and assign a new Impulse Response to the p5.Convolver.
         *  The impulse is added to the <code>.impulses</code> array. Previous
         *  impulses can be accessed with the <code>.toggleImpulse(id)</code>
         *  method.
         *
         *  @method  addImpulse
         *  @for p5.Convolver
         *  @param  {String}   path     path to a sound file
         *  @param  {Function} callback function (optional)
         *  @param  {Function} errorCallback function (optional)
         */
      }, {
        key: "addImpulse",
        value: function addImpulse(path, callback, errorCallback) {
          if (window.location.origin.indexOf("file://") > -1 && window.cordova === "undefined") {
            alert("This sketch may require a server to load external files. Please see http://bit.ly/1qcInwS");
          }
          this._loadBuffer(path, callback, errorCallback);
        }
        /**
         *  Similar to .addImpulse, except that the <code>.impulses</code>
         *  Array is reset to save memory. A new <code>.impulses</code>
         *  array is created with this impulse as the only item.
         *
         *  @method  resetImpulse
         *  @for p5.Convolver
         *  @param  {String}   path     path to a sound file
         *  @param  {Function} callback function (optional)
         *  @param  {Function} errorCallback function (optional)
         */
      }, {
        key: "resetImpulse",
        value: function resetImpulse(path, callback, errorCallback) {
          if (window.location.origin.indexOf("file://") > -1 && window.cordova === "undefined") {
            alert("This sketch may require a server to load external files. Please see http://bit.ly/1qcInwS");
          }
          this.impulses = [];
          this._loadBuffer(path, callback, errorCallback);
        }
        /**
         *  If you have used <code>.addImpulse()</code> to add multiple impulses
         *  to a p5.Convolver, then you can use this method to toggle between
         *  the items in the <code>.impulses</code> Array. Accepts a parameter
         *  to identify which impulse you wish to use, identified either by its
         *  original filename (String) or by its position in the <code>.impulses
         *  </code> Array (Number).<br/>
         *  You can access the objects in the .impulses Array directly. Each
         *  Object has two attributes: an <code>.audioBuffer</code> (type:
         *  Web Audio <a href="
         *  http://webaudio.github.io/web-audio-api/#the-audiobuffer-interface">
         *  AudioBuffer)</a> and a <code>.name</code>, a String that corresponds
         *  with the original filename.
         *
         *  @method toggleImpulse
         *  @for p5.Convolver
         *  @param {String|Number} id Identify the impulse by its original filename
         *                            (String), or by its position in the
         *                            <code>.impulses</code> Array (Number).
         */
      }, {
        key: "toggleImpulse",
        value: function toggleImpulse(id) {
          if (typeof id === "number" && id < this.impulses.length) {
            this._setBuffer(this.impulses[id].audioBuffer);
          }
          if (typeof id === "string") {
            for (var i = 0; i < this.impulses.length; i++) {
              if (this.impulses[i].name === id) {
                this._setBuffer(this.impulses[i].audioBuffer);
                break;
              }
            }
          }
        }
      }, {
        key: "dispose",
        value: function dispose() {
          reverb_get(reverb_getPrototypeOf(Convolver.prototype), "dispose", this).call(this);
          for (var i in this.impulses) {
            if (this.impulses[i]) {
              this.impulses[i] = null;
            }
          }
        }
      }]);
      return Convolver;
    }(Reverb);
    function createConvolver(path, callback, errorCallback) {
      if (window.location.origin.indexOf("file://") > -1 && window.cordova === "undefined") {
        alert("This sketch may require a server to load external files. Please see http://bit.ly/1qcInwS");
      }
      var self2 = this;
      var cReverb = new reverb_Convolver(path, function(buffer) {
        if (typeof callback === "function") {
          callback(buffer);
        }
        if (typeof self2._decrementPreload === "function") {
          self2._decrementPreload();
        }
      }, errorCallback);
      cReverb.impulses = [];
      return cReverb;
    }
    var Clock = __webpack_require__(11);
    var Clock_default = __webpack_require__.n(Clock);
    function metro_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function metro_defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function metro_createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        metro_defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        metro_defineProperties(Constructor, staticProps);
      return Constructor;
    }
    var metro_Metro = function() {
      function Metro() {
        metro_classCallCheck(this, Metro);
        this.clock = new Clock_default.a({
          callback: this.ontick.bind(this)
        });
        this.syncedParts = [];
        this.bpm = 120;
        this._init();
        this.prevTick = 0;
        this.tatumTime = 0;
        this.tickCallback = function() {
        };
      }
      metro_createClass(Metro, [{
        key: "ontick",
        value: function ontick(tickTime) {
          var elapsedTime = tickTime - this.prevTick;
          var secondsFromNow = tickTime - main.audiocontext.currentTime;
          if (elapsedTime - this.tatumTime <= -0.02) {
            return;
          } else {
            this.prevTick = tickTime;
            var self2 = this;
            this.syncedParts.forEach(function(thisPart) {
              if (!thisPart.isPlaying)
                return;
              thisPart.incrementStep(secondsFromNow);
              thisPart.phrases.forEach(function(thisPhrase) {
                var phraseArray = thisPhrase.sequence;
                var bNum = self2.metroTicks % phraseArray.length;
                if (phraseArray[bNum] !== 0 && (self2.metroTicks < phraseArray.length || !thisPhrase.looping)) {
                  thisPhrase.callback(secondsFromNow, phraseArray[bNum]);
                }
              });
            });
            this.metroTicks += 1;
            this.tickCallback(secondsFromNow);
          }
        }
      }, {
        key: "setBPM",
        value: function setBPM(bpm) {
          var rampTime = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
          var beatTime = 60 / (bpm * this.tatums);
          var now = main.audiocontext.currentTime;
          this.tatumTime = beatTime;
          this.clock.frequency.setValueAtTime(this.clock.frequency.value, now);
          this.clock.frequency.linearRampToValueAtTime(bpm, now + rampTime);
          this.bpm = bpm;
        }
      }, {
        key: "getBPM",
        value: function getBPM() {
          return this.clock.getRate() / this.tatums * 60;
        }
      }, {
        key: "_init",
        value: function _init() {
          this.metroTicks = 0;
        }
      }, {
        key: "resetSync",
        value: function resetSync(part) {
          this.syncedParts = [part];
        }
      }, {
        key: "pushSync",
        value: function pushSync(part) {
          this.syncedParts.push(part);
        }
      }, {
        key: "start",
        value: function start(timeFromNow) {
          var t = timeFromNow || 0;
          var now = main.audiocontext.currentTime;
          this.clock.start(now + t);
          this.setBPM(this.bpm);
        }
      }, {
        key: "stop",
        value: function stop(timeFromNow) {
          var t = timeFromNow || 0;
          var now = main.audiocontext.currentTime;
          this.clock.stop(now + t);
        }
      }, {
        key: "beatLength",
        value: function beatLength(tatums) {
          this.tatums = 1 / tatums / 4;
        }
      }]);
      return Metro;
    }();
    var metro = metro_Metro;
    function looper_defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function looper_createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        looper_defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        looper_defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function looper_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var BPM = 120;
    p5.prototype.setBPM = function(bpm, rampTime) {
      BPM = bpm;
      for (var i in main.parts) {
        if (main.parts[i]) {
          main.parts[i].setBPM(bpm, rampTime);
        }
      }
    };
    var Phrase = function Phrase2(name2, callback, sequence) {
      looper_classCallCheck(this, Phrase2);
      this.phraseStep = 0;
      this.name = name2;
      this.callback = callback;
      this.sequence = sequence;
    };
    var looper_Part = function() {
      function Part(steps, bLength) {
        looper_classCallCheck(this, Part);
        this.length = steps || 0;
        this.partStep = 0;
        this.phrases = [];
        this.isPlaying = false;
        this.noLoop();
        this.tatums = bLength || 0.0625;
        this.metro = new metro();
        this.metro._init();
        this.metro.beatLength(this.tatums);
        this.metro.setBPM(BPM);
        main.parts.push(this);
        this.callback = function() {
        };
      }
      looper_createClass(Part, [{
        key: "setBPM",
        value: function setBPM(tempo, rampTime) {
          this.metro.setBPM(tempo, rampTime);
        }
        /**
         *  Returns the tempo, in Beats Per Minute, of this part.
         *
         *  @method getBPM
         *  @for p5.Part
         *  @return {Number}
         */
      }, {
        key: "getBPM",
        value: function getBPM() {
          return this.metro.getBPM();
        }
        /**
         *  Start playback of this part. It will play
         *  through all of its phrases at a speed
         *  determined by setBPM.
         *
         *  @method  start
         *  @for p5.Part
         *  @param  {Number} [time] seconds from now
         */
      }, {
        key: "start",
        value: function start(time) {
          if (!this.isPlaying) {
            this.isPlaying = true;
            this.metro.resetSync(this);
            var t = time || 0;
            this.metro.start(t);
          }
        }
        /**
         *  Loop playback of this part. It will begin
         *  looping through all of its phrases at a speed
         *  determined by setBPM.
         *
         *  @method  loop
         *  @for p5.Part
         *  @param  {Number} [time] seconds from now
         */
      }, {
        key: "loop",
        value: function loop(time) {
          this.looping = true;
          this.onended = function() {
            this.partStep = 0;
          };
          var t = time || 0;
          this.start(t);
        }
        /**
         *  Tell the part to stop looping.
         *
         *  @method  noLoop
         *  @for p5.Part
         */
      }, {
        key: "noLoop",
        value: function noLoop() {
          this.looping = false;
          this.onended = function() {
            this.stop();
          };
        }
        /**
         *  Stop the part and cue it to step 0. Playback will resume from the begining of the Part when it is played again.
         *
         *  @method  stop
         *  @for p5.Part
         *  @param  {Number} [time] seconds from now
         */
      }, {
        key: "stop",
        value: function stop(time) {
          this.partStep = 0;
          this.pause(time);
        }
        /**
         *  Pause the part. Playback will resume
         *  from the current step.
         *
         *  @method  pause
         *  @for p5.Part
         *  @param  {Number} time seconds from now
         */
      }, {
        key: "pause",
        value: function pause(time) {
          this.isPlaying = false;
          var t = time || 0;
          this.metro.stop(t);
        }
        /**
         *  Add a p5.Phrase to this Part.
         *
         *  @method  addPhrase
         *  @for p5.Part
         *  @param {p5.Phrase}   phrase   reference to a p5.Phrase
         */
      }, {
        key: "addPhrase",
        value: function addPhrase(name2, callback, array) {
          var p;
          if (arguments.length === 3) {
            p = new Phrase(name2, callback, array);
          } else if (arguments[0] instanceof Phrase) {
            p = arguments[0];
          } else {
            throw "invalid input. addPhrase accepts name, callback, array or a p5.Phrase";
          }
          this.phrases.push(p);
          if (p.sequence.length > this.length) {
            this.length = p.sequence.length;
          }
        }
        /**
         *  Remove a phrase from this part, based on the name it was
         *  given when it was created.
         *
         *  @method  removePhrase
         *  @for p5.Part
         *  @param  {String} phraseName
         */
      }, {
        key: "removePhrase",
        value: function removePhrase(name2) {
          for (var i in this.phrases) {
            if (this.phrases[i].name === name2) {
              this.phrases.splice(i, 1);
            }
          }
        }
        /**
         *  Get a phrase from this part, based on the name it was
         *  given when it was created. Now you can modify its array.
         *
         *  @method  getPhrase
         *  @for p5.Part
         *  @param  {String} phraseName
         */
      }, {
        key: "getPhrase",
        value: function getPhrase(name2) {
          for (var i in this.phrases) {
            if (this.phrases[i].name === name2) {
              return this.phrases[i];
            }
          }
        }
        /**
         *  Find all sequences with the specified name, and replace their patterns with the specified array.
         *
         *  @method  replaceSequence
         *  @for p5.Part
         *  @param  {String} phraseName
         *  @param  {Array} sequence  Array of values to pass into the callback
         *                            at each step of the phrase.
         */
      }, {
        key: "replaceSequence",
        value: function replaceSequence(name2, array) {
          for (var i in this.phrases) {
            if (this.phrases[i].name === name2) {
              this.phrases[i].sequence = array;
            }
          }
        }
      }, {
        key: "incrementStep",
        value: function incrementStep(time) {
          if (this.partStep < this.length - 1) {
            this.callback(time);
            this.partStep += 1;
          } else {
            if (!this.looping && this.partStep === this.length - 1) {
              this.onended();
            }
          }
        }
        /**
         *  Set the function that will be called at every step. This will clear the previous function.
         *
         *  @method onStep
         *  @for p5.Part
         *  @param  {Function} callback The name of the callback
         *                              you want to fire
         *                              on every beat/tatum.
         */
      }, {
        key: "onStep",
        value: function onStep(callback) {
          this.callback = callback;
        }
      }]);
      return Part;
    }();
    var Score = function() {
      function Score2() {
        looper_classCallCheck(this, Score2);
        this.parts = [];
        this.currentPart = new Array(arguments.length);
        ;
        var thisScore = this;
        for (var i in arguments) {
          this.parts[i] = arguments[i];
          this.parts[i].nextPart = this.parts[i + 1];
          this.parts[i].onended = function() {
            thisScore.resetPart(i);
            playNextPart(thisScore);
          };
        }
        this.looping = false;
      }
      looper_createClass(Score2, [{
        key: "onended",
        value: function onended() {
          if (this.looping) {
            this.parts[0].start();
          } else {
            this.parts[this.parts.length - 1].onended = function() {
              this.stop();
              this.resetParts();
            };
          }
          this.currentPart = 0;
        }
        /**
         *  Start playback of the score.
         *
         *  @method  start
         *  @for p5.Score
         */
      }, {
        key: "start",
        value: function start() {
          this.parts[this.currentPart].start();
          this.scoreStep = 0;
        }
        /**
         *  Stop playback of the score.
         *
         *  @method  stop
         *  @for p5.Score
         */
      }, {
        key: "stop",
        value: function stop() {
          this.parts[this.currentPart].stop();
          this.currentPart = 0;
          this.scoreStep = 0;
        }
        /**
         *  Pause playback of the score.
         *
         *  @method  pause
         *  @for p5.Score
         */
      }, {
        key: "pause",
        value: function pause() {
          this.parts[this.currentPart].stop();
        }
        /**
         *  Loop playback of the score.
         *
         *  @method  loop
         *  @for p5.Score
         */
      }, {
        key: "loop",
        value: function loop() {
          this.looping = true;
          this.start();
        }
        /**
         *  Stop looping playback of the score. If it
         *  is currently playing, this will go into effect
         *  after the current round of playback completes.
         *
         *  @method  noLoop
         *  @for p5.Score
         */
      }, {
        key: "noLoop",
        value: function noLoop() {
          this.looping = false;
        }
      }, {
        key: "resetParts",
        value: function resetParts() {
          var self2 = this;
          this.parts.forEach(function(part) {
            self2.resetParts[part];
          });
        }
      }, {
        key: "resetPart",
        value: function resetPart(i) {
          this.parts[i].stop();
          this.parts[i].partStep = 0;
          for (var p in this.parts[i].phrases) {
            if (this.parts[i]) {
              this.parts[i].phrases[p].phraseStep = 0;
            }
          }
        }
        /**
         *  Set the tempo for all parts in the score
         *
         *  @method setBPM
         *  @for p5.Score
         *  @param {Number} BPM      Beats Per Minute
         *  @param {Number} rampTime Seconds from now
         */
      }, {
        key: "setBPM",
        value: function setBPM(bpm, rampTime) {
          for (var i in this.parts) {
            if (this.parts[i]) {
              this.parts[i].setBPM(bpm, rampTime);
            }
          }
        }
      }]);
      return Score2;
    }();
    function playNextPart(aScore) {
      aScore.currentPart++;
      if (aScore.currentPart >= aScore.parts.length) {
        aScore.scoreStep = 0;
        aScore.onended();
      } else {
        aScore.scoreStep = 0;
        aScore.parts[aScore.currentPart - 1].stop();
        aScore.parts[aScore.currentPart].start();
      }
    }
    function soundLoop_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function soundLoop_defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function soundLoop_createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        soundLoop_defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        soundLoop_defineProperties(Constructor, staticProps);
      return Constructor;
    }
    var soundLoop_SoundLoop = function() {
      function SoundLoop(callback, interval) {
        soundLoop_classCallCheck(this, SoundLoop);
        Object.defineProperty(this, "bpm", {
          get: function get() {
            return this._bpm;
          },
          set: function set(bpm) {
            if (!this.musicalTimeMode) {
              console.warn('Changing the BPM in "seconds" mode has no effect. BPM is only relevant in musicalTimeMode when the interval is specified as a string ("2n", "4n", "1m"...etc)');
            }
            this._bpm = bpm;
            this._update();
          }
        });
        Object.defineProperty(this, "timeSignature", {
          get: function get() {
            return this._timeSignature;
          },
          set: function set(timeSig) {
            if (!this.musicalTimeMode) {
              console.warn('Changing the timeSignature in "seconds" mode has no effect. BPM is only relevant in musicalTimeMode when the interval is specified as a string ("2n", "4n", "1m"...etc)');
            }
            this._timeSignature = timeSig;
            this._update();
          }
        });
        Object.defineProperty(this, "interval", {
          get: function get() {
            return this._interval;
          },
          set: function set(interval2) {
            this.musicalTimeMode = typeof interval2 === "number" ? false : true;
            this._interval = interval2;
            this._update();
          }
        });
        Object.defineProperty(this, "iterations", {
          get: function get() {
            return this.clock.ticks;
          }
        });
        this.callback = callback;
        this.musicalTimeMode = typeof this._interval === "number" ? false : true;
        this._interval = interval || 1;
        this._timeSignature = 4;
        this._bpm = 60;
        this.isPlaying = false;
        this.maxIterations = Infinity;
        var self2 = this;
        this.clock = new Clock_default.a({
          callback: function callback2(time) {
            var timeFromNow = time - main.audiocontext.currentTime;
            if (timeFromNow > 0 && self2.iterations <= self2.maxIterations) {
              self2.callback(timeFromNow);
            }
          },
          frequency: this._calcFreq()
        });
      }
      soundLoop_createClass(SoundLoop, [{
        key: "start",
        value: function start(timeFromNow) {
          var t = timeFromNow || 0;
          var now = main.audiocontext.currentTime;
          if (!this.isPlaying) {
            this.clock.start(now + t);
            this.isPlaying = true;
          }
        }
        /**
         * Stop the loop
         * @method  stop
         * @for p5.SoundLoop
         * @param  {Number} [timeFromNow] schedule a stopping time
         */
      }, {
        key: "stop",
        value: function stop(timeFromNow) {
          var t = timeFromNow || 0;
          var now = main.audiocontext.currentTime;
          if (this.isPlaying) {
            this.clock.stop(now + t);
            this.isPlaying = false;
          }
        }
        /**
         * Pause the loop
         * @method pause
         * @for p5.SoundLoop
         * @param  {Number} [timeFromNow] schedule a pausing time
         */
      }, {
        key: "pause",
        value: function pause(timeFromNow) {
          var t = timeFromNow || 0;
          var now = main.audiocontext.currentTime;
          if (this.isPlaying) {
            this.clock.pause(now + t);
            this.isPlaying = false;
          }
        }
        /**
         * Synchronize loops. Use this method to start two or more loops in synchronization
         * or to start a loop in synchronization with a loop that is already playing
         * This method will schedule the implicit loop in sync with the explicit master loop
         * i.e. loopToStart.syncedStart(loopToSyncWith)
         *
         * @method  syncedStart
         * @for p5.SoundLoop
         * @param  {Object} otherLoop   a p5.SoundLoop to sync with
         * @param  {Number} [timeFromNow] Start the loops in sync after timeFromNow seconds
         */
      }, {
        key: "syncedStart",
        value: function syncedStart(otherLoop, timeFromNow) {
          var t = timeFromNow || 0;
          var now = main.audiocontext.currentTime;
          if (!otherLoop.isPlaying) {
            otherLoop.clock.start(now + t);
            otherLoop.isPlaying = true;
            this.clock.start(now + t);
            this.isPlaying = true;
          } else if (otherLoop.isPlaying) {
            var time = otherLoop.clock._nextTick - main.audiocontext.currentTime;
            this.clock.start(now + time);
            this.isPlaying = true;
          }
        }
        /**
         * Updates frequency value, reflected in next callback
         * @private
         * @for p5.SoundLoop
         * @method  _update
         */
      }, {
        key: "_update",
        value: function _update() {
          this.clock.frequency.value = this._calcFreq();
        }
        /**
         * Calculate the frequency of the clock's callback based on bpm, interval, and timesignature
         * @private
         * @for p5.SoundLoop
         * @method  _calcFreq
         * @return {Number} new clock frequency value
         */
      }, {
        key: "_calcFreq",
        value: function _calcFreq() {
          if (typeof this._interval === "number") {
            this.musicalTimeMode = false;
            return 1 / this._interval;
          } else if (typeof this._interval === "string") {
            this.musicalTimeMode = true;
            return this._bpm / 60 / this._convertNotation(this._interval) * (this._timeSignature / 4);
          }
        }
        /**
         * Convert notation from musical time format to seconds
         * Uses <a href = "https://github.com/Tonejs/Tone.js/wiki/Time">Tone.Time</a> convention
         * @private
         * @for p5.SoundLoop
         * @method _convertNotation
         * @param  {String} value value to be converted
         * @return {Number}       converted value in seconds
         */
      }, {
        key: "_convertNotation",
        value: function _convertNotation(value) {
          var type = value.slice(-1);
          value = Number(value.slice(0, -1));
          switch (type) {
            case "m":
              return this._measure(value);
            case "n":
              return this._note(value);
            default:
              console.warn("Specified interval is not formatted correctly. See Tone.js timing reference for more info: https://github.com/Tonejs/Tone.js/wiki/Time");
          }
        }
        /**
         * Helper conversion methods of measure and note
         * @private
         * @for p5.SoundLoop
         * @method  _measure
         */
      }, {
        key: "_measure",
        value: function _measure(value) {
          return value * this._timeSignature;
        }
        /**
         * @private
         * @method  _note
         * @for p5.SoundLoop
         */
      }, {
        key: "_note",
        value: function _note(value) {
          return this._timeSignature / value;
        }
      }]);
      return SoundLoop;
    }();
    var soundLoop = soundLoop_SoundLoop;
    function compressor_typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        compressor_typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        compressor_typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return compressor_typeof(obj);
    }
    function compressor_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function compressor_defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function compressor_createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        compressor_defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        compressor_defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function compressor_possibleConstructorReturn(self2, call) {
      if (call && (compressor_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return compressor_assertThisInitialized(self2);
    }
    function compressor_assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function compressor_get(target, property, receiver) {
      if (typeof Reflect !== "undefined" && Reflect.get) {
        compressor_get = Reflect.get;
      } else {
        compressor_get = function _get2(target2, property2, receiver2) {
          var base = compressor_superPropBase(target2, property2);
          if (!base)
            return;
          var desc = Object.getOwnPropertyDescriptor(base, property2);
          if (desc.get) {
            return desc.get.call(receiver2);
          }
          return desc.value;
        };
      }
      return compressor_get(target, property, receiver || target);
    }
    function compressor_superPropBase(object, property) {
      while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = compressor_getPrototypeOf(object);
        if (object === null)
          break;
      }
      return object;
    }
    function compressor_getPrototypeOf(o) {
      compressor_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return compressor_getPrototypeOf(o);
    }
    function compressor_inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        compressor_setPrototypeOf(subClass, superClass);
    }
    function compressor_setPrototypeOf(o, p) {
      compressor_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return compressor_setPrototypeOf(o, p);
    }
    var Compressor = function(_Effect) {
      compressor_inherits(Compressor2, _Effect);
      function Compressor2() {
        var _this;
        compressor_classCallCheck(this, Compressor2);
        _this = compressor_possibleConstructorReturn(this, compressor_getPrototypeOf(Compressor2).call(this));
        _this.compressor = _this.ac.createDynamicsCompressor();
        _this.input.connect(_this.compressor);
        _this.compressor.connect(_this.wet);
        return _this;
      }
      compressor_createClass(Compressor2, [{
        key: "process",
        value: function process(src, attack, knee, ratio, threshold, release) {
          src.connect(this.input);
          this.set(attack, knee, ratio, threshold, release);
        }
        /**
         * Set the paramters of a compressor.
         * @method  set
         * @for p5.Compressor
         * @param {Number} attack     The amount of time (in seconds) to reduce the gain by 10dB,
         *                            default = .003, range 0 - 1
         * @param {Number} knee       A decibel value representing the range above the
         *                            threshold where the curve smoothly transitions to the "ratio" portion.
         *                            default = 30, range 0 - 40
         * @param {Number} ratio      The amount of dB change in input for a 1 dB change in output
         *                            default = 12, range 1 - 20
         * @param {Number} threshold  The decibel value above which the compression will start taking effect
         *                            default = -24, range -100 - 0
         * @param {Number} release    The amount of time (in seconds) to increase the gain by 10dB
         *                            default = .25, range 0 - 1
         */
      }, {
        key: "set",
        value: function set(attack, knee, ratio, threshold, release) {
          if (typeof attack !== "undefined") {
            this.attack(attack);
          }
          if (typeof knee !== "undefined") {
            this.knee(knee);
          }
          if (typeof ratio !== "undefined") {
            this.ratio(ratio);
          }
          if (typeof threshold !== "undefined") {
            this.threshold(threshold);
          }
          if (typeof release !== "undefined") {
            this.release(release);
          }
        }
        /**
         * Get current attack or set value w/ time ramp
         *
         *
         * @method attack
         * @for p5.Compressor
         * @param {Number} [attack] Attack is the amount of time (in seconds) to reduce the gain by 10dB,
         *                          default = .003, range 0 - 1
         * @param {Number} [time]  Assign time value to schedule the change in value
         */
      }, {
        key: "attack",
        value: function attack(_attack, time) {
          var t = time || 0;
          if (typeof _attack === "number") {
            this.compressor.attack.value = _attack;
            this.compressor.attack.cancelScheduledValues(this.ac.currentTime + 0.01 + t);
            this.compressor.attack.linearRampToValueAtTime(_attack, this.ac.currentTime + 0.02 + t);
          } else if (typeof _attack !== "undefined") {
            _attack.connect(this.compressor.attack);
          }
          return this.compressor.attack.value;
        }
        /**
         * Get current knee or set value w/ time ramp
         *
         * @method knee
         * @for p5.Compressor
         * @param {Number} [knee] A decibel value representing the range above the
         *                        threshold where the curve smoothly transitions to the "ratio" portion.
         *                        default = 30, range 0 - 40
         * @param {Number} [time]  Assign time value to schedule the change in value
         */
      }, {
        key: "knee",
        value: function knee(_knee, time) {
          var t = time || 0;
          if (typeof _knee === "number") {
            this.compressor.knee.value = _knee;
            this.compressor.knee.cancelScheduledValues(this.ac.currentTime + 0.01 + t);
            this.compressor.knee.linearRampToValueAtTime(_knee, this.ac.currentTime + 0.02 + t);
          } else if (typeof _knee !== "undefined") {
            _knee.connect(this.compressor.knee);
          }
          return this.compressor.knee.value;
        }
        /**
         * Get current ratio or set value w/ time ramp
         * @method ratio
         * @for p5.Compressor
         * @param {Number} [ratio]      The amount of dB change in input for a 1 dB change in output
         *                            default = 12, range 1 - 20
         * @param {Number} [time]  Assign time value to schedule the change in value
         */
      }, {
        key: "ratio",
        value: function ratio(_ratio, time) {
          var t = time || 0;
          if (typeof _ratio === "number") {
            this.compressor.ratio.value = _ratio;
            this.compressor.ratio.cancelScheduledValues(this.ac.currentTime + 0.01 + t);
            this.compressor.ratio.linearRampToValueAtTime(_ratio, this.ac.currentTime + 0.02 + t);
          } else if (typeof _ratio !== "undefined") {
            _ratio.connect(this.compressor.ratio);
          }
          return this.compressor.ratio.value;
        }
        /**
         * Get current threshold or set value w/ time ramp
         * @method threshold
         * @for p5.Compressor
         * @param {Number} threshold  The decibel value above which the compression will start taking effect
         *                            default = -24, range -100 - 0
         * @param {Number} [time]  Assign time value to schedule the change in value
         */
      }, {
        key: "threshold",
        value: function threshold(_threshold, time) {
          var t = time || 0;
          if (typeof _threshold === "number") {
            this.compressor.threshold.value = _threshold;
            this.compressor.threshold.cancelScheduledValues(this.ac.currentTime + 0.01 + t);
            this.compressor.threshold.linearRampToValueAtTime(_threshold, this.ac.currentTime + 0.02 + t);
          } else if (typeof _threshold !== "undefined") {
            _threshold.connect(this.compressor.threshold);
          }
          return this.compressor.threshold.value;
        }
        /**
         * Get current release or set value w/ time ramp
         * @method release
         * @for p5.Compressor
         * @param {Number} release    The amount of time (in seconds) to increase the gain by 10dB
         *                            default = .25, range 0 - 1
         *
         * @param {Number} [time]  Assign time value to schedule the change in value
         */
      }, {
        key: "release",
        value: function release(_release, time) {
          var t = time || 0;
          if (typeof _release === "number") {
            this.compressor.release.value = _release;
            this.compressor.release.cancelScheduledValues(this.ac.currentTime + 0.01 + t);
            this.compressor.release.linearRampToValueAtTime(_release, this.ac.currentTime + 0.02 + t);
          } else if (typeof number !== "undefined") {
            _release.connect(this.compressor.release);
          }
          return this.compressor.release.value;
        }
        /**
         * Return the current reduction value
         *
         * @method reduction
         * @for p5.Compressor
         * @return {Number} Value of the amount of gain reduction that is applied to the signal
         */
      }, {
        key: "reduction",
        value: function reduction() {
          return this.compressor.reduction.value;
        }
      }, {
        key: "dispose",
        value: function dispose() {
          compressor_get(compressor_getPrototypeOf(Compressor2.prototype), "dispose", this).call(this);
          if (this.compressor) {
            this.compressor.disconnect();
            delete this.compressor;
          }
        }
      }]);
      return Compressor2;
    }(effect);
    var compressor = Compressor;
    function peakDetect_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function peakDetect_defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function peakDetect_createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        peakDetect_defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        peakDetect_defineProperties(Constructor, staticProps);
      return Constructor;
    }
    var PeakDetect = function() {
      function PeakDetect2(freq1, freq2, threshold, _framesPerPeak) {
        peakDetect_classCallCheck(this, PeakDetect2);
        this.framesPerPeak = _framesPerPeak || 20;
        this.framesSinceLastPeak = 0;
        this.decayRate = 0.95;
        this.threshold = threshold || 0.35;
        this.cutoff = 0;
        this.cutoffMult = 1.5;
        this.energy = 0;
        this.penergy = 0;
        this.currentValue = 0;
        this.isDetected = false;
        this.f1 = freq1 || 40;
        this.f2 = freq2 || 2e4;
        this._onPeak = function() {
        };
      }
      peakDetect_createClass(PeakDetect2, [{
        key: "update",
        value: function update(fftObject) {
          var nrg = this.energy = fftObject.getEnergy(this.f1, this.f2) / 255;
          if (nrg > this.cutoff && nrg > this.threshold && nrg - this.penergy > 0) {
            this._onPeak();
            this.isDetected = true;
            this.cutoff = nrg * this.cutoffMult;
            this.framesSinceLastPeak = 0;
          } else {
            this.isDetected = false;
            if (this.framesSinceLastPeak <= this.framesPerPeak) {
              this.framesSinceLastPeak++;
            } else {
              this.cutoff *= this.decayRate;
              this.cutoff = Math.max(this.cutoff, this.threshold);
            }
          }
          this.currentValue = nrg;
          this.penergy = nrg;
        }
        /**
         *  onPeak accepts two arguments: a function to call when
         *  a peak is detected. The value of the peak,
         *  between 0.0 and 1.0, is passed to the callback.
         *
         *  @method  onPeak
         *  @param  {Function} callback Name of a function that will
         *                              be called when a peak is
         *                              detected.
         *  @param  {Object}   [val]    Optional value to pass
         *                              into the function when
         *                              a peak is detected.
         *  @example
         *  <div><code>
         *  var cnv, soundFile, fft, peakDetect;
         *  var ellipseWidth = 0;
         *
         *  function preload() {
         *    soundFile = loadSound('assets/beat.mp3');
         *  }
         *
         *  function setup() {
         *    cnv = createCanvas(100,100);
         *    textAlign(CENTER);
         *
         *    fft = new p5.FFT();
         *    peakDetect = new p5.PeakDetect();
         *
         *    setupSound();
         *
         *    // when a beat is detected, call triggerBeat()
         *    peakDetect.onPeak(triggerBeat);
         *  }
         *
         *  function draw() {
         *    background(0);
         *    fill(255);
         *    text('click to play', width/2, height/2);
         *
         *    fft.analyze();
         *    peakDetect.update(fft);
         *
         *    ellipseWidth *= 0.95;
         *    ellipse(width/2, height/2, ellipseWidth, ellipseWidth);
         *  }
         *
         *  // this function is called by peakDetect.onPeak
         *  function triggerBeat() {
         *    ellipseWidth = 50;
         *  }
         *
         *  // mouseclick starts/stops sound
         *  function setupSound() {
         *    cnv.mouseClicked( function() {
         *      if (soundFile.isPlaying() ) {
         *        soundFile.stop();
         *      } else {
         *        soundFile.play();
         *      }
         *    });
         *  }
         *  </code></div>
         */
      }, {
        key: "onPeak",
        value: function onPeak(callback, val) {
          var self2 = this;
          self2._onPeak = function() {
            callback(self2.energy, val);
          };
        }
      }]);
      return PeakDetect2;
    }();
    var peakDetect = PeakDetect;
    function soundRecorder_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function soundRecorder_defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function soundRecorder_createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        soundRecorder_defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        soundRecorder_defineProperties(Constructor, staticProps);
      return Constructor;
    }
    var soundRecorder_ac = main.audiocontext;
    var soundRecorder_SoundRecorder = function() {
      function SoundRecorder() {
        soundRecorder_classCallCheck(this, SoundRecorder);
        this.input = soundRecorder_ac.createGain();
        this.output = soundRecorder_ac.createGain();
        this._inputChannels = 2;
        this._outputChannels = 2;
        var workletBufferSize = safeBufferSize(1024);
        this._workletNode = new AudioWorkletNode(soundRecorder_ac, processorNames_default.a.recorderProcessor, {
          outputChannelCount: [this._outputChannels],
          processorOptions: {
            numInputChannels: this._inputChannels,
            bufferSize: workletBufferSize
          }
        });
        this._workletNode.port.onmessage = function(event) {
          if (event.data.name === "buffers") {
            var buffers = [new Float32Array(event.data.leftBuffer), new Float32Array(event.data.rightBuffer)];
            this._callback(buffers);
          }
        }.bind(this);
        this._callback = function() {
        };
        this._workletNode.connect(p5.soundOut._silentNode);
        this.setInput();
        main.soundArray.push(this);
      }
      soundRecorder_createClass(SoundRecorder, [{
        key: "setInput",
        value: function setInput(unit) {
          this.input.disconnect();
          this.input = null;
          this.input = soundRecorder_ac.createGain();
          this.input.connect(this._workletNode);
          this.input.connect(this.output);
          if (unit) {
            unit.connect(this.input);
          } else {
            p5.soundOut.output.connect(this.input);
          }
        }
        /**
         *  Start recording. To access the recording, provide
         *  a p5.SoundFile as the first parameter. The p5.SoundRecorder
         *  will send its recording to that p5.SoundFile for playback once
         *  recording is complete. Optional parameters include duration
         *  (in seconds) of the recording, and a callback function that
         *  will be called once the complete recording has been
         *  transfered to the p5.SoundFile.
         *
         *  @method  record
         *  @for p5.SoundRecorder
         *  @param  {p5.SoundFile}   soundFile    p5.SoundFile
         *  @param  {Number}   [duration] Time (in seconds)
         *  @param  {Function} [callback] The name of a function that will be
         *                                called once the recording completes
         */
      }, {
        key: "record",
        value: function record(sFile, duration, callback) {
          this._workletNode.port.postMessage({
            name: "start",
            duration
          });
          if (sFile && callback) {
            this._callback = function(buffer) {
              sFile.setBuffer(buffer);
              callback();
            };
          } else if (sFile) {
            this._callback = function(buffer) {
              sFile.setBuffer(buffer);
            };
          }
        }
        /**
         *  Stop the recording. Once the recording is stopped,
         *  the results will be sent to the p5.SoundFile that
         *  was given on .record(), and if a callback function
         *  was provided on record, that function will be called.
         *
         *  @method  stop
         *  @for p5.SoundRecorder
         */
      }, {
        key: "stop",
        value: function stop() {
          this._workletNode.port.postMessage({
            name: "stop"
          });
        }
      }, {
        key: "dispose",
        value: function dispose() {
          var index = main.soundArray.indexOf(this);
          main.soundArray.splice(index, 1);
          this._callback = function() {
          };
          if (this.input) {
            this.input.disconnect();
          }
          this.input = null;
          this._workletNode = null;
        }
      }]);
      return SoundRecorder;
    }();
    var soundRecorder = soundRecorder_SoundRecorder;
    function distortion_typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        distortion_typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        distortion_typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return distortion_typeof(obj);
    }
    function distortion_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function distortion_defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function distortion_createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        distortion_defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        distortion_defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function distortion_possibleConstructorReturn(self2, call) {
      if (call && (distortion_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return distortion_assertThisInitialized(self2);
    }
    function distortion_assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function distortion_get(target, property, receiver) {
      if (typeof Reflect !== "undefined" && Reflect.get) {
        distortion_get = Reflect.get;
      } else {
        distortion_get = function _get2(target2, property2, receiver2) {
          var base = distortion_superPropBase(target2, property2);
          if (!base)
            return;
          var desc = Object.getOwnPropertyDescriptor(base, property2);
          if (desc.get) {
            return desc.get.call(receiver2);
          }
          return desc.value;
        };
      }
      return distortion_get(target, property, receiver || target);
    }
    function distortion_superPropBase(object, property) {
      while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = distortion_getPrototypeOf(object);
        if (object === null)
          break;
      }
      return object;
    }
    function distortion_getPrototypeOf(o) {
      distortion_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return distortion_getPrototypeOf(o);
    }
    function distortion_inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        distortion_setPrototypeOf(subClass, superClass);
    }
    function distortion_setPrototypeOf(o, p) {
      distortion_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return distortion_setPrototypeOf(o, p);
    }
    function makeDistortionCurve(amount) {
      var k = typeof amount === "number" ? amount : 50;
      var numSamples = 44100;
      var curve = new Float32Array(numSamples);
      var deg = Math.PI / 180;
      var i = 0;
      var x;
      for (; i < numSamples; ++i) {
        x = i * 2 / numSamples - 1;
        curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
      }
      return curve;
    }
    var Distortion = function(_Effect) {
      distortion_inherits(Distortion2, _Effect);
      function Distortion2(amount, oversample) {
        var _this;
        distortion_classCallCheck(this, Distortion2);
        _this = distortion_possibleConstructorReturn(this, distortion_getPrototypeOf(Distortion2).call(this));
        if (typeof amount === "undefined") {
          amount = 0.25;
        }
        if (typeof amount !== "number") {
          throw new Error("amount must be a number");
        }
        if (typeof oversample === "undefined") {
          oversample = "2x";
        }
        if (typeof oversample !== "string") {
          throw new Error("oversample must be a String");
        }
        var curveAmount = p5.prototype.map(amount, 0, 1, 0, 2e3);
        _this.waveShaperNode = _this.ac.createWaveShaper();
        _this.amount = curveAmount;
        _this.waveShaperNode.curve = makeDistortionCurve(curveAmount);
        _this.waveShaperNode.oversample = oversample;
        _this.input.connect(_this.waveShaperNode);
        _this.waveShaperNode.connect(_this.wet);
        return _this;
      }
      distortion_createClass(Distortion2, [{
        key: "process",
        value: function process(src, amount, oversample) {
          src.connect(this.input);
          this.set(amount, oversample);
        }
        /**
         * Set the amount and oversample of the waveshaper distortion.
         *
         * @method set
         * @for p5.Distortion
         * @param {Number} [amount=0.25] Unbounded distortion amount.
         *                                Normal values range from 0-1.
         * @param {String} [oversample='none'] 'none', '2x', or '4x'.
         */
      }, {
        key: "set",
        value: function set(amount, oversample) {
          if (amount) {
            var curveAmount = p5.prototype.map(amount, 0, 1, 0, 2e3);
            this.amount = curveAmount;
            this.waveShaperNode.curve = makeDistortionCurve(curveAmount);
          }
          if (oversample) {
            this.waveShaperNode.oversample = oversample;
          }
        }
        /**
         *  Return the distortion amount, typically between 0-1.
         *
         *  @method  getAmount
         *  @for p5.Distortion
         *  @return {Number} Unbounded distortion amount.
         *                   Normal values range from 0-1.
         */
      }, {
        key: "getAmount",
        value: function getAmount() {
          return this.amount;
        }
        /**
         *  Return the oversampling.
         *
         *  @method getOversample
         *  @for p5.Distortion
         *  @return {String} Oversample can either be 'none', '2x', or '4x'.
         */
      }, {
        key: "getOversample",
        value: function getOversample() {
          return this.waveShaperNode.oversample;
        }
      }, {
        key: "dispose",
        value: function dispose() {
          distortion_get(distortion_getPrototypeOf(Distortion2.prototype), "dispose", this).call(this);
          if (this.waveShaperNode) {
            this.waveShaperNode.disconnect();
            this.waveShaperNode = null;
          }
        }
      }]);
      return Distortion2;
    }(effect);
    var distortion = Distortion;
    function gain_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function gain_defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function gain_createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        gain_defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        gain_defineProperties(Constructor, staticProps);
      return Constructor;
    }
    var gain_Gain = function() {
      function Gain() {
        gain_classCallCheck(this, Gain);
        this.ac = main.audiocontext;
        this.input = this.ac.createGain();
        this.output = this.ac.createGain();
        this.input.gain.value = 0.5;
        this.input.connect(this.output);
        main.soundArray.push(this);
      }
      gain_createClass(Gain, [{
        key: "setInput",
        value: function setInput(src) {
          src.connect(this.input);
        }
        /**
         *  Send output to a p5.sound or web audio object
         *
         *  @method  connect
         *  @for p5.Gain
         *  @param  {Object} unit
         */
      }, {
        key: "connect",
        value: function connect(unit) {
          var u = unit || p5.soundOut.input;
          this.output.connect(u.input ? u.input : u);
        }
        /**
         *  Disconnect all output.
         *
         *  @method disconnect
         *  @for p5.Gain
         */
      }, {
        key: "disconnect",
        value: function disconnect() {
          if (this.output) {
            this.output.disconnect();
          }
        }
        /**
         *  Set the output level of the gain node.
         *
         *  @method  amp
         *  @for p5.Gain
         *  @param  {Number} volume amplitude between 0 and 1.0
         *  @param  {Number} [rampTime] create a fade that lasts rampTime
         *  @param  {Number} [timeFromNow] schedule this event to happen
         *                                seconds from now
         */
      }, {
        key: "amp",
        value: function amp(vol) {
          var rampTime = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
          var tFromNow = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
          var now = main.audiocontext.currentTime;
          var currentVol = this.output.gain.value;
          this.output.gain.cancelScheduledValues(now);
          this.output.gain.linearRampToValueAtTime(currentVol, now + tFromNow);
          this.output.gain.linearRampToValueAtTime(vol, now + tFromNow + rampTime);
        }
      }, {
        key: "dispose",
        value: function dispose() {
          var index = main.soundArray.indexOf(this);
          main.soundArray.splice(index, 1);
          if (this.output) {
            this.output.disconnect();
            delete this.output;
          }
          if (this.input) {
            this.input.disconnect();
            delete this.input;
          }
        }
      }]);
      return Gain;
    }();
    var gain = gain_Gain;
    function audioVoice_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function audioVoice_defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function audioVoice_createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        audioVoice_defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        audioVoice_defineProperties(Constructor, staticProps);
      return Constructor;
    }
    var audioVoice_AudioVoice = function() {
      function AudioVoice() {
        audioVoice_classCallCheck(this, AudioVoice);
        this.ac = main.audiocontext;
        this.output = this.ac.createGain();
        this.connect();
        main.soundArray.push(this);
      }
      audioVoice_createClass(AudioVoice, [{
        key: "play",
        value: function play(note, velocity, secondsFromNow, sustime) {
        }
      }, {
        key: "triggerAttack",
        value: function triggerAttack(note, velocity, secondsFromNow) {
        }
      }, {
        key: "triggerRelease",
        value: function triggerRelease(secondsFromNow) {
        }
      }, {
        key: "amp",
        value: function amp(vol, rampTime) {
        }
        /**
         * Connect to p5 objects or Web Audio Nodes
         * @method  connect
         * @for p5.AudioVoice
         * @param {Object} unit
         */
      }, {
        key: "connect",
        value: function connect(unit) {
          var u = unit || main.input;
          this.output.connect(u.input ? u.input : u);
        }
        /**
         * Disconnect from soundOut
         * @method  disconnect
         * @for p5.AudioVoice
         */
      }, {
        key: "disconnect",
        value: function disconnect() {
          this.output.disconnect();
        }
      }, {
        key: "dispose",
        value: function dispose() {
          if (this.output) {
            this.output.disconnect();
            delete this.output;
          }
        }
      }]);
      return AudioVoice;
    }();
    var audioVoice_0 = audioVoice_AudioVoice;
    function monosynth_typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        monosynth_typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        monosynth_typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return monosynth_typeof(obj);
    }
    function monosynth_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function monosynth_defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function monosynth_createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        monosynth_defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        monosynth_defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function monosynth_possibleConstructorReturn(self2, call) {
      if (call && (monosynth_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return monosynth_assertThisInitialized(self2);
    }
    function monosynth_assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function monosynth_get(target, property, receiver) {
      if (typeof Reflect !== "undefined" && Reflect.get) {
        monosynth_get = Reflect.get;
      } else {
        monosynth_get = function _get2(target2, property2, receiver2) {
          var base = monosynth_superPropBase(target2, property2);
          if (!base)
            return;
          var desc = Object.getOwnPropertyDescriptor(base, property2);
          if (desc.get) {
            return desc.get.call(receiver2);
          }
          return desc.value;
        };
      }
      return monosynth_get(target, property, receiver || target);
    }
    function monosynth_superPropBase(object, property) {
      while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = monosynth_getPrototypeOf(object);
        if (object === null)
          break;
      }
      return object;
    }
    function monosynth_getPrototypeOf(o) {
      monosynth_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return monosynth_getPrototypeOf(o);
    }
    function monosynth_inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        monosynth_setPrototypeOf(subClass, superClass);
    }
    function monosynth_setPrototypeOf(o, p) {
      monosynth_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return monosynth_setPrototypeOf(o, p);
    }
    var DEFAULT_SUSTAIN = 0.15;
    var monosynth_MonoSynth = function(_AudioVoice) {
      monosynth_inherits(MonoSynth, _AudioVoice);
      function MonoSynth() {
        var _this;
        monosynth_classCallCheck(this, MonoSynth);
        _this = monosynth_possibleConstructorReturn(this, monosynth_getPrototypeOf(MonoSynth).call(this));
        _this.oscillator = new oscillator();
        _this.env = new envelope();
        _this.env.setRange(1, 0);
        _this.env.setExp(true);
        _this.setADSR(0.02, 0.25, 0.05, 0.35);
        _this.oscillator.disconnect();
        _this.oscillator.connect(_this.output);
        _this.env.disconnect();
        _this.env.setInput(_this.output.gain);
        _this.oscillator.output.gain.value = 1;
        _this.oscillator.start();
        _this.connect();
        main.soundArray.push(monosynth_assertThisInitialized(_this));
        Object.defineProperties(monosynth_assertThisInitialized(_this), {
          attack: {
            get: function get() {
              return this.env.aTime;
            },
            set: function set(attack) {
              this.env.setADSR(attack, this.env.dTime, this.env.sPercent, this.env.rTime);
            }
          },
          decay: {
            get: function get() {
              return this.env.dTime;
            },
            set: function set(decay) {
              this.env.setADSR(this.env.aTime, decay, this.env.sPercent, this.env.rTime);
            }
          },
          sustain: {
            get: function get() {
              return this.env.sPercent;
            },
            set: function set(sustain) {
              this.env.setADSR(this.env.aTime, this.env.dTime, sustain, this.env.rTime);
            }
          },
          release: {
            get: function get() {
              return this.env.rTime;
            },
            set: function set(release) {
              this.env.setADSR(this.env.aTime, this.env.dTime, this.env.sPercent, release);
            }
          }
        });
        return _this;
      }
      monosynth_createClass(MonoSynth, [{
        key: "play",
        value: function play(note, velocity, secondsFromNow, susTime) {
          this.triggerAttack(note, velocity, ~~secondsFromNow);
          this.triggerRelease(~~secondsFromNow + (susTime || DEFAULT_SUSTAIN));
        }
        /**
         *  Trigger the Attack, and Decay portion of the Envelope.
         *  Similar to holding down a key on a piano, but it will
         *  hold the sustain level until you let go.
         *
         *  @param {String | Number} note the note you want to play, specified as a
         *                                 frequency in Hertz (Number) or as a midi
         *                                 value in Note/Octave format ("C4", "Eb3"...etc")
         *                                 See <a href = "https://github.com/Tonejs/Tone.js/wiki/Instruments">
         *                                 Tone</a>. Defaults to 440 hz
         *  @param  {Number} [velocity] velocity of the note to play (ranging from 0 to 1)
         *  @param  {Number} [secondsFromNow]  time from now (in seconds) at which to play
         *  @method  triggerAttack
         *  @for p5.MonoSynth
         *  @example
         *  <div><code>
         *  let monoSynth;
         *
         *  function setup() {
         *    let cnv = createCanvas(100, 100);
         *    cnv.mousePressed(triggerAttack);
         *    background(220);
         *    text('tap here for attack, let go to release', 5, 20, width - 20);
         *    monoSynth = new p5.MonoSynth();
         *  }
         *
         *  function triggerAttack() {
         *    userStartAudio();
         *
         *    monoSynth.triggerAttack("E3");
         *  }
         *
         *  function mouseReleased() {
         *    monoSynth.triggerRelease();
         *  }
         *  </code></div>
         */
      }, {
        key: "triggerAttack",
        value: function triggerAttack(note, velocity) {
          var secondsFromNow = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
          var freq = noteToFreq(note);
          var vel = velocity || 0.1;
          this.oscillator.freq(freq, 0, secondsFromNow);
          this.env.ramp(this.output.gain, secondsFromNow, vel);
        }
        /**
         *  Trigger the release of the Envelope. This is similar to releasing
         *  the key on a piano and letting the sound fade according to the
         *  release level and release time.
         *
         *  @param  {Number} secondsFromNow time to trigger the release
         *  @method  triggerRelease
         *  @for p5.MonoSynth
         *  @example
         *  <div><code>
         *  let monoSynth;
         *
         *  function setup() {
         *    let cnv = createCanvas(100, 100);
         *    cnv.mousePressed(triggerAttack);
         *    background(220);
         *    text('tap here for attack, let go to release', 5, 20, width - 20);
         *    monoSynth = new p5.MonoSynth();
         *  }
         *
         *  function triggerAttack() {
         *    userStartAudio();
         *
         *    monoSynth.triggerAttack("E3");
         *  }
         *
         *  function mouseReleased() {
         *    monoSynth.triggerRelease();
         *  }
         *  </code></div>
         */
      }, {
        key: "triggerRelease",
        value: function triggerRelease() {
          var secondsFromNow = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
          this.env.ramp(this.output.gain, secondsFromNow, 0);
        }
        /**
         *  Set values like a traditional
         *  <a href="https://en.wikipedia.org/wiki/Synthesizer#/media/File:ADSR_parameter.svg">
         *  ADSR envelope
         *  </a>.
         *
         *  @method  setADSR
         *  @for p5.MonoSynth
         *  @param {Number} attackTime    Time (in seconds before envelope
         *                                reaches Attack Level
         *  @param {Number} [decayTime]    Time (in seconds) before envelope
         *                                reaches Decay/Sustain Level
         *  @param {Number} [susRatio]    Ratio between attackLevel and releaseLevel, on a scale from 0 to 1,
         *                                where 1.0 = attackLevel, 0.0 = releaseLevel.
         *                                The susRatio determines the decayLevel and the level at which the
         *                                sustain portion of the envelope will sustain.
         *                                For example, if attackLevel is 0.4, releaseLevel is 0,
         *                                and susAmt is 0.5, the decayLevel would be 0.2. If attackLevel is
         *                                increased to 1.0 (using <code>setRange</code>),
         *                                then decayLevel would increase proportionally, to become 0.5.
         *  @param {Number} [releaseTime]   Time in seconds from now (defaults to 0)
         */
      }, {
        key: "setADSR",
        value: function setADSR(attack, decay, sustain, release) {
          this.env.setADSR(attack, decay, sustain, release);
        }
        /**
         * MonoSynth amp
         * @method  amp
         * @for p5.MonoSynth
         * @param  {Number} vol      desired volume
         * @param  {Number} [rampTime] Time to reach new volume
         * @return {Number}          new volume value
         */
      }, {
        key: "amp",
        value: function amp(vol, rampTime) {
          var t = rampTime || 0;
          if (typeof vol !== "undefined") {
            this.oscillator.amp(vol, t);
          }
          return this.oscillator.amp().value;
        }
        /**
         *  Connect to a p5.sound / Web Audio object.
         *
         *  @method  connect
         *  @for p5.MonoSynth
         *  @param  {Object} unit A p5.sound or Web Audio object
         */
      }, {
        key: "connect",
        value: function connect(unit) {
          var u = unit || main.input;
          this.output.connect(u.input ? u.input : u);
        }
        /**
         *  Disconnect all outputs
         *
         *  @method  disconnect
         *  @for p5.MonoSynth
         */
      }, {
        key: "disconnect",
        value: function disconnect() {
          if (this.output) {
            this.output.disconnect();
          }
        }
        /**
         *  Get rid of the MonoSynth and free up its resources / memory.
         *
         *  @method  dispose
         *  @for p5.MonoSynth
         */
      }, {
        key: "dispose",
        value: function dispose() {
          monosynth_get(monosynth_getPrototypeOf(MonoSynth.prototype), "dispose", this).call(this);
          if (this.env) {
            this.env.dispose();
          }
          if (this.oscillator) {
            this.oscillator.dispose();
          }
        }
      }]);
      return MonoSynth;
    }(audioVoice_0);
    var monosynth = monosynth_MonoSynth;
    function onsetDetect_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function onsetDetect_defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function onsetDetect_createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        onsetDetect_defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        onsetDetect_defineProperties(Constructor, staticProps);
      return Constructor;
    }
    var OnsetDetect = function() {
      function OnsetDetect2(freqLow, freqHigh, threshold, callback) {
        onsetDetect_classCallCheck(this, OnsetDetect2);
        this.isDetected = false;
        this.freqLow = freqLow;
        this.freqHigh = freqHigh;
        this.treshold = threshold;
        this.energy = 0;
        this.penergy = 0;
        this.sensitivity = 500;
        this.callback = callback;
      }
      onsetDetect_createClass(OnsetDetect2, [{
        key: "update",
        value: function update(fftObject, callback) {
          this.energy = fftObject.getEnergy(this.freqLow, this.freqHigh) / 255;
          if (this.isDetected === false) {
            if (this.energy - this.penergy > this.treshold) {
              this.isDetected = true;
              if (this.callback) {
                this.callback(this.energy);
              } else if (callback) {
                callback(this.energy);
              }
              var self2 = this;
              setTimeout(function() {
                self2.isDetected = false;
              }, this.sensitivity);
            }
          }
          this.penergy = this.energy;
        }
      }]);
      return OnsetDetect2;
    }();
    var onsetDetect = OnsetDetect;
    function polysynth_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function polysynth_defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function polysynth_createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        polysynth_defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        polysynth_defineProperties(Constructor, staticProps);
      return Constructor;
    }
    var polysynth_PolySynth = function() {
      function PolySynth(audioVoice, maxVoices) {
        polysynth_classCallCheck(this, PolySynth);
        this.audiovoices = [];
        this.notes = {};
        this._newest = 0;
        this._oldest = 0;
        this.maxVoices = maxVoices || 8;
        this.AudioVoice = audioVoice === void 0 ? p5.MonoSynth : audioVoice;
        this._voicesInUse = new TimelineSignal_default.a(0);
        this.output = main.audiocontext.createGain();
        this.connect();
        this._allocateVoices();
        main.soundArray.push(this);
      }
      polysynth_createClass(PolySynth, [{
        key: "_allocateVoices",
        value: function _allocateVoices() {
          for (var i = 0; i < this.maxVoices; i++) {
            this.audiovoices.push(new this.AudioVoice());
            this.audiovoices[i].disconnect();
            this.audiovoices[i].connect(this.output);
          }
        }
        /**
         *  Play a note by triggering noteAttack and noteRelease with sustain time
         *
         *  @method  play
         *  @for p5.PolySynth
         *  @param  {Number} [note] midi note to play (ranging from 0 to 127 - 60 being a middle C)
         *  @param  {Number} [velocity] velocity of the note to play (ranging from 0 to 1)
         *  @param  {Number} [secondsFromNow]  time from now (in seconds) at which to play
         *  @param  {Number} [sustainTime] time to sustain before releasing the envelope
         *  @example
         *  <div><code>
         *  let polySynth;
         *
         *  function setup() {
         *    let cnv = createCanvas(100, 100);
         *    cnv.mousePressed(playSynth);
         *    background(220);
         *    text('click to play', 20, 20);
         *
         *    polySynth = new p5.PolySynth();
         *  }
         *
         *  function playSynth() {
         *    userStartAudio();
         *
         *    // note duration (in seconds)
         *    let dur = 1.5;
         *
         *    // time from now (in seconds)
         *    let time = 0;
         *
         *    // velocity (volume, from 0 to 1)
         *    let vel = 0.1;
         *
         *    // notes can overlap with each other
         *    polySynth.play('G2', vel, 0, dur);
         *    polySynth.play('C3', vel, time += 1/3, dur);
         *    polySynth.play('G3', vel, time += 1/3, dur);
         *  }
         *  </code></div>
         */
      }, {
        key: "play",
        value: function play(note, velocity, secondsFromNow) {
          var susTime = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
          this.noteAttack(note, velocity, secondsFromNow);
          this.noteRelease(note, secondsFromNow + susTime);
        }
        /**
         *  noteADSR sets the envelope for a specific note that has just been triggered.
         *  Using this method modifies the envelope of whichever audiovoice is being used
         *  to play the desired note. The envelope should be reset before noteRelease is called
         *  in order to prevent the modified envelope from being used on other notes.
         *
         *  @method  noteADSR
         *  @for p5.PolySynth
         *  @param {Number} [note]        Midi note on which ADSR should be set.
         *  @param {Number} [attackTime]  Time (in seconds before envelope
         *                                reaches Attack Level
         *  @param {Number} [decayTime]   Time (in seconds) before envelope
         *                                reaches Decay/Sustain Level
         *  @param {Number} [susRatio]    Ratio between attackLevel and releaseLevel, on a scale from 0 to 1,
         *                                where 1.0 = attackLevel, 0.0 = releaseLevel.
         *                                The susRatio determines the decayLevel and the level at which the
         *                                sustain portion of the envelope will sustain.
         *                                For example, if attackLevel is 0.4, releaseLevel is 0,
         *                                and susAmt is 0.5, the decayLevel would be 0.2. If attackLevel is
         *                                increased to 1.0 (using <code>setRange</code>),
         *                                then decayLevel would increase proportionally, to become 0.5.
         *  @param {Number} [releaseTime]   Time in seconds from now (defaults to 0)
         **/
      }, {
        key: "noteADSR",
        value: function noteADSR(note, a, d, s, r) {
          var timeFromNow = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 0;
          var now = main.audiocontext.currentTime;
          var t = now + timeFromNow;
          this.audiovoices[this.notes[note].getValueAtTime(t)].setADSR(a, d, s, r);
        }
        /**
         * Set the PolySynths global envelope. This method modifies the envelopes of each
         * monosynth so that all notes are played with this envelope.
         *
         *  @method  setADSR
         *  @for p5.PolySynth
         *  @param {Number} [attackTime]  Time (in seconds before envelope
         *                                reaches Attack Level
         *  @param {Number} [decayTime]   Time (in seconds) before envelope
         *                                reaches Decay/Sustain Level
         *  @param {Number} [susRatio]    Ratio between attackLevel and releaseLevel, on a scale from 0 to 1,
         *                                where 1.0 = attackLevel, 0.0 = releaseLevel.
         *                                The susRatio determines the decayLevel and the level at which the
         *                                sustain portion of the envelope will sustain.
         *                                For example, if attackLevel is 0.4, releaseLevel is 0,
         *                                and susAmt is 0.5, the decayLevel would be 0.2. If attackLevel is
         *                                increased to 1.0 (using <code>setRange</code>),
         *                                then decayLevel would increase proportionally, to become 0.5.
         *  @param {Number} [releaseTime]   Time in seconds from now (defaults to 0)
         **/
      }, {
        key: "setADSR",
        value: function setADSR(a, d, s, r) {
          this.audiovoices.forEach(function(voice) {
            voice.setADSR(a, d, s, r);
          });
        }
        /**
         *  Trigger the Attack, and Decay portion of a MonoSynth.
         *  Similar to holding down a key on a piano, but it will
         *  hold the sustain level until you let go.
         *
         *  @method  noteAttack
         *  @for p5.PolySynth
         *  @param  {Number} [note]           midi note on which attack should be triggered.
         *  @param  {Number} [velocity]       velocity of the note to play (ranging from 0 to 1)/
         *  @param  {Number} [secondsFromNow] time from now (in seconds)
         *  @example
         *  <div><code>
         *  let polySynth = new p5.PolySynth();
         *  let pitches = ['G', 'D', 'G', 'C'];
         *  let octaves = [2, 3, 4];
         *
         *  function setup() {
         *    let cnv = createCanvas(100, 100);
         *    cnv.mousePressed(playChord);
         *    background(220);
         *    text('tap to play', 20, 20);
         *  }
         *
         *  function playChord() {
         *    userStartAudio();
         *
         *    // play a chord: multiple notes at the same time
         *    for (let i = 0; i < 4; i++) {
         *      let note = random(pitches) + random(octaves);
         *      polySynth.noteAttack(note, 0.1);
         *    }
         *  }
         *
         *  function mouseReleased() {
         *    // release all voices
         *    polySynth.noteRelease();
         *  }
         *  </code></div>
         */
      }, {
        key: "noteAttack",
        value: function noteAttack(_note, _velocity) {
          var secondsFromNow = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
          var acTime = main.audiocontext.currentTime + secondsFromNow;
          var note = noteToFreq(_note);
          var velocity = _velocity || 0.1;
          var currentVoice;
          if (this.notes[note] && this.notes[note].getValueAtTime(acTime) !== null) {
            this.noteRelease(note, 0);
          }
          if (this._voicesInUse.getValueAtTime(acTime) < this.maxVoices) {
            currentVoice = Math.max(~~this._voicesInUse.getValueAtTime(acTime), 0);
          } else {
            currentVoice = this._oldest;
            oldestNote = freqToMidi(this.audiovoices[this._oldest].oscillator.freq().value);
            this.noteRelease(oldestNote);
            this._oldest = (this._oldest + 1) % (this.maxVoices - 1);
          }
          this.notes[note] = new TimelineSignal_default.a();
          this.notes[note].setValueAtTime(currentVoice, acTime);
          var previousVal = this._voicesInUse._searchBefore(acTime) === null ? 0 : this._voicesInUse._searchBefore(acTime).value;
          this._voicesInUse.setValueAtTime(previousVal + 1, acTime);
          this._updateAfter(acTime, 1);
          this._newest = currentVoice;
          if (typeof velocity === "number") {
            var maxRange = 1 / this._voicesInUse.getValueAtTime(acTime) * 2;
            velocity = velocity > maxRange ? maxRange : velocity;
          }
          this.audiovoices[currentVoice].triggerAttack(note, velocity, secondsFromNow);
        }
        /**
         * Private method to ensure accurate values of this._voicesInUse
         * Any time a new value is scheduled, it is necessary to increment all subsequent
         * scheduledValues after attack, and decrement all subsequent
         * scheduledValues after release
         *
         * @private
         * @for p5.PolySynth
         * @param  {[type]} time  [description]
         * @param  {[type]} value [description]
         * @return {[type]}       [description]
         */
      }, {
        key: "_updateAfter",
        value: function _updateAfter(time, value) {
          if (this._voicesInUse._searchAfter(time) === null) {
            return;
          } else {
            this._voicesInUse._searchAfter(time).value += value;
            var nextTime = this._voicesInUse._searchAfter(time).time;
            this._updateAfter(nextTime, value);
          }
        }
        /**
         *  Trigger the Release of an AudioVoice note. This is similar to releasing
         *  the key on a piano and letting the sound fade according to the
         *  release level and release time.
         *
         *  @method  noteRelease
         *  @for p5.PolySynth
         *  @param  {Number} [note]           midi note on which attack should be triggered.
         *                                    If no value is provided, all notes will be released.
         *  @param  {Number} [secondsFromNow] time to trigger the release
         *  @example
         *  <div><code>
         *  let polySynth = new p5.PolySynth();
         *  let pitches = ['G', 'D', 'G', 'C'];
         *  let octaves = [2, 3, 4];
         *
         *  function setup() {
         *    let cnv = createCanvas(100, 100);
         *    cnv.mousePressed(playChord);
         *    background(220);
         *    text('tap to play', 20, 20);
         *  }
         *
         *  function playChord() {
         *    userStartAudio();
         *
         *    // play a chord: multiple notes at the same time
         *    for (let i = 0; i < 4; i++) {
         *      let note = random(pitches) + random(octaves);
         *      polySynth.noteAttack(note, 0.1);
         *    }
         *  }
         *
         *  function mouseReleased() {
         *    // release all voices
         *    polySynth.noteRelease();
         *  }
         *  </code></div>
         *
         */
      }, {
        key: "noteRelease",
        value: function noteRelease(_note, secondsFromNow) {
          var now = main.audiocontext.currentTime;
          var tFromNow = secondsFromNow || 0;
          var t = now + tFromNow;
          if (!_note) {
            this.audiovoices.forEach(function(voice) {
              voice.triggerRelease(tFromNow);
            });
            this._voicesInUse.setValueAtTime(0, t);
            for (var n in this.notes) {
              this.notes[n].dispose();
              delete this.notes[n];
            }
            return;
          }
          var note = noteToFreq(_note);
          if (!this.notes[note] || this.notes[note].getValueAtTime(t) === null) {
            console.warn("Cannot release a note that is not already playing");
          } else {
            var previousVal = Math.max(~~this._voicesInUse.getValueAtTime(t).value, 1);
            this._voicesInUse.setValueAtTime(previousVal - 1, t);
            if (previousVal > 0) {
              this._updateAfter(t, -1);
            }
            this.audiovoices[this.notes[note].getValueAtTime(t)].triggerRelease(tFromNow);
            this.notes[note].dispose();
            delete this.notes[note];
            this._newest = this._newest === 0 ? 0 : (this._newest - 1) % (this.maxVoices - 1);
          }
        }
        /**
         *  Connect to a p5.sound / Web Audio object.
         *
         *  @method  connect
         *  @for p5.PolySynth
         *  @param  {Object} unit A p5.sound or Web Audio object
         */
      }, {
        key: "connect",
        value: function connect(unit) {
          var u = unit || main.input;
          this.output.connect(u.input ? u.input : u);
        }
        /**
         *  Disconnect all outputs
         *
         *  @method  disconnect
         *  @for p5.PolySynth
         */
      }, {
        key: "disconnect",
        value: function disconnect() {
          if (this.output) {
            this.output.disconnect();
          }
        }
        /**
         *  Get rid of the MonoSynth and free up its resources / memory.
         *
         *  @method  dispose
         *  @for p5.PolySynth
         */
      }, {
        key: "dispose",
        value: function dispose() {
          this.audiovoices.forEach(function(voice) {
            voice.dispose();
          });
          if (this.output) {
            this.output.disconnect();
            delete this.output;
          }
        }
      }]);
      return PolySynth;
    }();
    var polysynth = polysynth_PolySynth;
    function Signal_classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var Signal_Signal = function Signal2() {
      Signal_classCallCheck(this, Signal2);
      console.warn("p5.Signal is deprecated , Use Tone.js Signal instead ");
    };
    var deprecations_Signal = Signal_Signal;
    p5.prototype.getAudioContext = audiocontext["b"];
    p5.prototype.userStartAudio = audiocontext["c"];
    p5.prototype.sampleRate = sampleRate;
    p5.prototype.freqToMidi = freqToMidi;
    p5.prototype.midiToFreq = midiToFreq;
    p5.prototype.noteToFreq = noteToFreq;
    p5.prototype.soundFormats = soundFormats;
    p5.prototype.disposeSound = disposeSound;
    p5.prototype._checkFileFormats = _checkFileFormats;
    p5.prototype._mathChain = _mathChain;
    p5.prototype.convertToWav = convertToWav;
    p5.prototype.interleave = interleave;
    p5.prototype.writeUTFBytes = writeUTFBytes;
    p5.prototype.safeBufferSize = safeBufferSize;
    p5.prototype.saveSound = saveSound;
    p5.prototype.registerMethod("remove", p5.prototype.disposeSound);
    p5.Panner = panner_0;
    p5.SoundFile = soundfile;
    p5.prototype.loadSound = loadSound;
    p5.prototype.registerPreloadMethod("loadSound", p5.prototype);
    p5.Amplitude = amplitude;
    p5.FFT = fft;
    p5.Oscillator = oscillator;
    p5.SinOsc = SinOsc;
    p5.TriOsc = TriOsc;
    p5.SawOsc = SawOsc;
    p5.SqrOsc = SqrOsc;
    p5.Noise = noise;
    p5.Pulse = pulse;
    p5.AudioIn = audioin;
    p5.Effect = effect;
    p5.Filter = filter;
    p5.LowPass = LowPass;
    p5.HighPass = HighPass;
    p5.BandPass = BandPass;
    p5.EQ = eq;
    p5.listener3D = listener3d;
    p5.Panner3D = panner3d;
    p5.Delay = delay;
    p5.Reverb = Reverb;
    p5.Convolver = reverb_Convolver;
    p5.prototype.createConvolver = createConvolver;
    p5.prototype.registerPreloadMethod("createConvolver", p5.prototype);
    p5.Metro = metro;
    p5.Phrase = Phrase;
    p5.Part = looper_Part;
    p5.Score = Score;
    p5.SoundLoop = soundLoop;
    p5.Compressor = compressor;
    p5.peakDetect = peakDetect;
    p5.SoundRecorder = soundRecorder;
    p5.Distortion = distortion;
    p5.Gain = gain;
    p5.AudioVoice = audioVoice_0;
    p5.MonoSynth = monosynth;
    p5.OnsetDetect = onsetDetect;
    p5.PolySynth = polysynth;
    p5.PeakDetect = peakDetect;
    p5.Signal = deprecations_Signal;
  }
]);
