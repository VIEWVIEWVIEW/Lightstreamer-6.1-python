/*
 * LIGHTSTREAMER - www.lightstreamer.com
 * Lightstreamer JavaScript Client
 * Version 6.2.7 build 1679.2
 * Copyright (c) Lightstreamer Srl. All Rights Reserved.
 * Contains: LightstreamerClient, Subscription, LogMessages, BufferAppender
 *   ConsoleAppender, FunctionAppender, RemoteAppender, SimpleLoggerProvider
 * CommonJS
 */
function define(a, c, e) {
	define.a[a] = {
		e: c,
		d: e
	}
}
define.a = {};
define.b = function(a, c, e) {
	for(var g = [], f = 0; f < a.length; f++) {
		var d = define.a[a[f]];
		if(!d) throw "All the modules must already be 'defined' Async load not supported: use a full-featured AMD loader like requirejs";
		d.c || define.b(d.e, d.d, a[f]);
		g.push(d.c)
	}
	a = c.apply(null, g);
	if(e) define.a[e].c = a
};

function oneRequire(a, c) {
	define.b(a, c, null)
};
(function() {
	function u() {
		return function(h) {
			return h
		}
	}

	function E() {
		return function() {}
	}

	function G(h) {
		return function(f) {
			this[h] = f
		}
	}

	function L(h) {
		return function() {
			return this[h]
		}
	}

	function V(h) {
		return function() {
			return h
		}
	}
	define("IllegalStateException", [], function() {
		function h(f) {
			this.name = "IllegalStateException";
			this.message = f
		}
		h.prototype = {
			toString: function() {
				return ["[", this.name, this.message, "]"].join("|")
			}
		};
		return h
	});
	define("Environment", ["IllegalStateException"], function(h) {
		var f = "undefined" !== typeof window && "undefined" !== typeof navigator && "undefined" !== typeof document,
			e = "undefined" !== typeof importScripts,
			d = "object" == typeof process && (/node(\.exe)?$/.test(process.execPath) || process.node && process.v8 || process.versions && process.versions.node && process.versions.v8);
		if(f && !document.getElementById) throw new h("Not supported browser");
		var b = {
			isBrowserDocument: function() {
				return f
			},
			isBrowser: function() {
				return !d && (f || e)
			},
			isNodeJS: function() {
				return !f && d
			},
			isWebWorker: function() {
				return !f && !d && e
			},
			jy: function() {
				return !f && !d && !e
			},
			browserDocumentOrDie: function() {
				if(!this.isBrowserDocument()) throw new h("Trying to load a browser-only module on non-browser environment");
			}
		};
		b.isBrowserDocument = b.isBrowserDocument;
		b.isBrowser = b.isBrowser;
		b.isNodeJS = b.isNodeJS;
		b.isWebWorker = b.isWebWorker;
		b.browserDocumentOrDie = b.browserDocumentOrDie;
		return b
	});
	define("Helpers", ["Environment"], function(h) {
		var f = /^\s*([\s\S]*?)\s*$/,
			e = /,/,
			d = /\./,
			b = {
				getTimeStamp: function() {
					return(new Date).getTime()
				},
				randomG: function(b) {
					return Math.round(Math.random() * (b || 1E3))
				},
				trim: function(b) {
					return b.replace(f, "$1")
				},
				getNumber: function(b, a) {
					if(b) {
						if(!b.replace) return b;
						a ? (b = b.replace(d, ""), b = b.replace(e, ".")) : b = b.replace(e, "");
						return new Number(b)
					}
					return 0
				},
				isArray: function(b) {
					return b.join && "function" == typeof b.join
				},
				addEvent: function(b, a, d) {
					if(!h.isBrowserDocument()) return !1;
					"undefined" != typeof b.addEventListener ? b.addEventListener(a, d, !1) : "undefined" != typeof b.attachEvent && b.attachEvent("on" + a, d);
					return !0
				},
				removeEvent: function(b, a, d) {
					if(!h.isBrowserDocument()) return !1;
					"undefined" != typeof b.removeEventListener ? b.removeEventListener(a, d, !1) : "undefined" != typeof b.detachEvent && b.detachEvent("on" + a, d);
					return !0
				}
			};
		b.getTimeStamp = b.getTimeStamp;
		b.randomG = b.randomG;
		b.trim = b.trim;
		b.getNumber = b.getNumber;
		b.isArray = b.isArray;
		b.addEvent = b.addEvent;
		b.removeEvent = b.removeEvent;
		return b
	});
	define("BrowserDetection", ["Environment"], function(h) {
		function f(b) {
			var c = a;
			return function() {
				null === c && (c = -1 < g.indexOf(b));
				return c
			}
		}

		function e(b) {
			var c = a;
			return function() {
				if(null === c) {
					c = !0;
					for(var a = 0; a < b.length; a++) c = c && b[a]()
				}
				return c
			}
		}

		function d(b, c) {
			var d = a,
				e = a;
			return function(a, g) {
				null === d && (e = (d = b()) ? c() : null);
				return d ? a && e ? !0 === g ? e <= a : !1 === g ? e >= a : e == a : !0 : !1
			}
		}

		function b(a) {
			return function() {
				var b = a.exec(g);
				return b && 2 <= b.length ? b[1] : null
			}
		}

		function c(a) {
			return function() {
				return !a()
			}
		}
		var a = h.isBrowser() ? null : !1,
			g = h.isBrowser() ? navigator.userAgent.toLowerCase() : null,
			l = a;
		h = {
			isProbablyRekonq: f("rekonq"),
			isProbablyAWebkit: f("webkit"),
			isProbablyPlaystation: f("playstation 3"),
			isProbablyChrome: d(f("chrome/"), b(RegExp("chrome/([0-9]+)", "g"))),
			isProbablyAKhtml: function() {
				null === l && (l = document.childNodes && !document.all && !navigator.RC && !navigator.JC);
				return l
			},
			isProbablyKonqueror: d(f("konqueror"), b(RegExp("konqueror/([0-9.]+)", "g"))),
			isProbablyIE: d(f("msie"), b(RegExp("msie\\s([0-9]+)[.;]", "g"))),
			isProbablyFX: d(f("firefox"), b(/firefox\/(\d+\.?\d*)/)),
			isProbablyOldOpera: d(function() {
				return "undefined" != typeof opera
			}, function() {
				if(opera.version) {
					var a = opera.version(),
						a = a.replace(RegExp("[^0-9.]+", "g"), "");
					return parseInt(a)
				}
				return 7
			})
		};
		h.isProbablyAndroidBrowser = e([f("android"), h.isProbablyAWebkit, c(h.isProbablyChrome)]);
		h.isProbablyOperaMobile = e([h.isProbablyOldOpera, f("opera mobi")]);
		h.isProbablyApple = d(e([f("safari"), function(b) {
			var c = a;
			return function() {
				if(null === c) {
					c = !1;
					for(var a = 0; a < b.length; a++) c = c || b[a]()
				}
				return c
			}
		}([f("ipad"), f("iphone"), f("ipod"), e([c(h.isProbablyAndroidBrowser), c(h.isProbablyChrome), c(h.isProbablyRekonq)])])]), b(/version\/(\d+\.?\d*)/));
		h.isProbablyRekonq = h.isProbablyRekonq;
		h.isProbablyChrome = h.isProbablyChrome;
		h.isProbablyAWebkit = h.isProbablyAWebkit;
		h.isProbablyPlaystation = h.isProbablyPlaystation;
		h.isProbablyAndroidBrowser = h.isProbablyAndroidBrowser;
		h.isProbablyOperaMobile = h.isProbablyOperaMobile;
		h.isProbablyApple = h.isProbablyApple;
		h.isProbablyAKhtml = h.isProbablyAKhtml;
		h.isProbablyKonqueror = h.isProbablyKonqueror;
		h.isProbablyIE = h.isProbablyIE;
		h.isProbablyFX = h.isProbablyFX;
		h.isProbablyOldOpera = h.isProbablyOldOpera;
		return h
	});
	define("List", [], function() {
		function h() {
			this.data = []
		}
		h.prototype = {
			add: function(f) {
				this.data.push(f)
			},
			remove: function(f) {
				f = this.find(f);
				if(0 > f) return !1;
				this.data.splice(f, 1);
				return !0
			},
			contains: function(f) {
				return 0 <= this.find(f)
			},
			find: function(f) {
				for(var e = 0; e < this.data.length; e++)
					if(this.data[e] === f) return e;
				return -1
			},
			forEach: function(f) {
				for(var e = 0; e < this.data.length; e++) f(this.data[e])
			},
			asArray: function() {
				return [].concat(this.data)
			},
			clean: function() {
				this.data = []
			}
		};
		h.prototype.add = h.prototype.add;
		h.prototype.remove = h.prototype.remove;
		h.prototype.forEach = h.prototype.forEach;
		h.prototype.asArray = h.prototype.asArray;
		h.prototype.clean = h.prototype.clean;
		return h
	});
	define("EnvironmentStatus", ["Helpers", "BrowserDetection", "Environment", "List"], function(h, f, e, d) {
		function b(a, b, c, d, e) {
			return function() {
				a[b] || (a[c] = !0, d.forEach(function(a) {
					try {
						if(a[e]) a[e]();
						else a()
					} catch(b) {}
				}), "preunloading" != b && d.clean(), a[b] = !0, a[c] = !1)
			}
		}

		function c(a, b) {
			setTimeout(function() {
				if(a[b]) a[b]();
				else a()
			}, 0)
		}

		function a(a, b, c, d) {
			setTimeout(function() {
				c ? d ? a.apply(c, d) : a.apply(c) : d ? a.apply(null, d) : a()
			}, b)
		}

		function g() {
			m = !0
		}
		var l = new d,
			n = new d,
			k = new d,
			m = !1,
			p = {
				vh: "onloadDone",
				Gs: "onloadInprogress",
				ci: "unloaded",
				Qo: "unloading",
				Ps: "preunloading"
			};
		d = {};
		for(var q in p) d[p[q]] = q;
		q = {
			vh: !1,
			Gs: !1,
			ci: !1,
			Qo: !1,
			Ps: !1,
			isLoaded: L("vh"),
			isUnloaded: L("ci"),
			isUnloading: L("Qo"),
			addOnloadHandler: function(a) {
				this.ly() ? n.add(a) : c(a, "onloadEvent")
			},
			addUnloadHandler: function(a) {
				this.my() ? l.add(a) : c(a, "unloadEvent")
			},
			addBeforeUnloadHandler: function(a) {
				k.add(a);
				this.Ps && c(a, "preUnloadEvent")
			},
			removeOnloadHandler: function(a) {
				n.remove(a)
			},
			removeUnloadHandler: function(a) {
				l.remove(a)
			},
			removeBeforeUnloadHandler: function(a) {
				k.remove(a)
			},
			ly: function() {
				return !(this.vh || this.Gs)
			},
			my: function() {
				return !(this.ci || this.Qo)
			},
			Ou: function() {
				h.addEvent(window, "unload", this.ov);
				h.addEvent(window, "beforeunload", this.Qu);
				if(document && "undefined" != typeof document.readyState) {
					if("COMPLETE" == document.readyState.toUpperCase()) {
						this.qi();
						return
					}
					a(this.eq, 1E3, this)
				} else if(this.Br()) {
					this.qi();
					return
				}
				if(!h.addEvent(window, "load", this.dk)) this.qi();
				else if(f.isProbablyOldOpera()) {
					var b = !1;
					f.isProbablyOldOpera(9, !1) && (b = !0, h.addEvent(document, "DOMContentLoaded", g));
					a(this.dq, 1E3, this, [b])
				}
			},
			qi: function() {
				a(this.dk, 0)
			},
			eq: function() {
				this.vh || ("COMPLETE" == document.readyState.toUpperCase() ? this.dk() : a(this.eq, 1E3, this))
			},
			dq: function(b) {
				this.vh || (m || !b && this.Br() ? this.dk() : a(this.dq, 1E3, this, [b]))
			},
			Br: function() {
				return "undefined" != typeof document.getElementsByTagName && "undefined" != typeof document.getElementById && (null != document.getElementsByTagName("body")[0] || null != document.body)
			}
		};
		q.dk = b(q, d.onloadDone, d.onloadInprogress, n, "onloadEvent");
		q.ov = b(q, d.unloaded, d.unloading, l, "unloadEvent");
		q.Qu = b(q, d.preunloading, d.preunloading, k, "preUnloadEvent");
		e.isBrowserDocument() ? q.Ou() : q.qi();
		q.addOnloadHandler = q.addOnloadHandler;
		q.addUnloadHandler = q.addUnloadHandler;
		q.addBeforeUnloadHandler = q.addBeforeUnloadHandler;
		q.removeOnloadHandler = q.removeOnloadHandler;
		q.removeUnloadHandler = q.removeUnloadHandler;
		q.removeBeforeUnloadHandler = q.removeBeforeUnloadHandler;
		q.isLoaded = q.isLoaded;
		q.isUnloaded = q.isUnloaded;
		q.isUnloading = q.isUnloading;
		return q
	});
	define("Global", ["EnvironmentStatus", "Environment"], function(h, f) {
		var e = {
			Wt: h,
			toString: function() {
				return "[Lightstreamer javascript client version " + this.version + " build " + this.build + "]"
			},
			xa: function(d, b, c, a) {
				d = (a || "_") + d;
				this[d] || (this[d] = {});
				this[d][b] = c;
				return "Lightstreamer." + d + "." + b
			},
			Mx: function(d, b, c) {
				d = (c || "_") + d;
				return this[d] && this[d][b]
			},
			Kl: function(d, b, c) {
				d = (c || "_") + d;
				if(this[d] && this[d][b]) {
					delete this[d][b];
					for(var a in this[d]) return;
					delete this[d]
				}
			},
			fv: function(d, b) {
				var c = (b || "_") + d;
				this[c] && delete this[c]
			},
			uj: {},
			Cu: function(d) {
				var b = this.uj,
					c = d.nf;
				b[c] || (b[c] = []);
				b[c].push(d)
			},
			xA: function(d) {
				var b = d.nf,
					c = this.uj[b];
				if(c) {
					for(var a = 0; a < c.length; a++) c[a] == d && c.splice(a, 1);
					0 == c.length && delete c[b]
				}
			},
			sx: function(d) {
				return this.uj[d] && (d = this.uj[d]) && 0 < d.length ? d[0] : null
			}
		};
		f.isBrowserDocument() && (window.OpenAjax && OpenAjax.hub && OpenAjax.hub.registerLibrary("Lightstreamer", "http://www.lightstreamer.com/", e.version), window.Lightstreamer = e);
		e.version = "6.2.7";
		e.build = "1679.2";
		return e
	});
	define("LoggerProxy", ["Helpers"], function(h) {
		function f(b) {
			this.no(b)
		}

		function e() {
			return !1
		}
		var d = {
			error: e,
			warn: e,
			info: e,
			debug: e,
			fatal: e,
			isDebugEnabled: e,
			isInfoEnabled: e,
			isWarnEnabled: e,
			isErrorEnabled: e,
			isFatalEnabled: e
		};
		f.prototype = {
			no: function(b) {
				this.Qa = b || d
			},
			logFatal: function(b) {
				this.dy() && (b += this.we(arguments, 1), this.fatal(b))
			},
			fatal: function(b, c) {
				this.Qa.fatal(b, c)
			},
			dy: function() {
				return !this.Qa.isFatalEnabled || this.Qa.isFatalEnabled()
			},
			logError: function(b) {
				this.Ar() && (b += this.we(arguments, 1), this.error(b))
			},
			logErrorExc: function(b, c) {
				this.Ar() && (c += this.we(arguments, 2), this.error(c, b))
			},
			error: function(b, c) {
				this.Qa.error(b, c)
			},
			Ar: function() {
				return !this.Qa.isErrorEnabled || this.Qa.isErrorEnabled()
			},
			logWarn: function(b) {
				this.yy() && (b += this.we(arguments, 1), this.warn(b))
			},
			warn: function(b, c) {
				this.Qa.warn(b, c)
			},
			yy: function() {
				return !this.Qa.isWarnEnabled || this.Qa.isWarnEnabled()
			},
			logInfo: function(b) {
				this.isInfoLogEnabled() && (b += this.we(arguments, 1), this.info(b))
			},
			info: function(b, c) {
				this.Qa.info(b, c)
			},
			isInfoLogEnabled: function() {
				return !this.Qa.isInfoEnabled || this.Qa.isInfoEnabled()
			},
			logDebug: function(b) {
				this.isDebugLogEnabled() && (b += this.we(arguments, 1), this.debug(b))
			},
			debug: function(b, c) {
				this.Qa.debug(b, c)
			},
			isDebugLogEnabled: function() {
				return !this.Qa.isDebugEnabled || this.Qa.isDebugEnabled()
			},
			we: function(b, c) {
				for(var a = " {", d = c ? c : 0; d < b.length; d++) try {
					var e = b[d];
					null === e ? a += "NULL" : 0 > e.length ? a += "*" : null != e.charAt ? a += e : e.message ? (a += e.message, e.stack && (a += "\n" + e.stack + "\n")) : e[0] == e ? a += e : h.isArray(e) ? (a += "(", a += this.we(e), a += ")") : a += e;
					a += " "
				} catch(f) {
					a += "missing-parameter "
				}
				return a + "}"
			}
		};
		f.prototype.debug = f.prototype.debug;
		f.prototype.isDebugLogEnabled = f.prototype.isDebugLogEnabled;
		f.prototype.logDebug = f.prototype.logDebug;
		f.prototype.info = f.prototype.info;
		f.prototype.isInfoLogEnabled = f.prototype.isInfoLogEnabled;
		f.prototype.logInfo = f.prototype.logInfo;
		f.prototype.warn = f.prototype.warn;
		f.prototype.isWarnEnabled = f.prototype.isWarnEnabled;
		f.prototype.logWarn = f.prototype.logWarn;
		f.prototype.error = f.prototype.error;
		f.prototype.isErrorEnabled = f.prototype.isErrorEnabled;
		f.prototype.logError = f.prototype.logError;
		f.prototype.logErrorExc = f.prototype.logErrorExc;
		f.prototype.fatal = f.prototype.fatal;
		f.prototype.isFatalEnabled = f.prototype.isFatalEnabled;
		f.prototype.logFatal = f.prototype.logFatal;
		return f
	});
	define("IllegalArgumentException", [], function() {
		function h(f) {
			this.name = "IllegalArgumentException";
			this.message = f
		}
		h.prototype = {
			toString: function() {
				return ["[", this.name, this.message, "]"].join("|")
			}
		};
		return h
	});
	define("LoggerManager", ["LoggerProxy", "IllegalArgumentException"], function(h, f) {
		var e = {},
			d = null,
			b = {
				setLoggerProvider: function(b) {
					if(b && !b.getLogger) throw new f("The given object is not a LoggerProvider");
					d = b;
					for(var a in e) d ? e[a].no(d.getLogger(a)) : e[a].no(null)
				},
				getLoggerProxy: function(b) {
					e[b] || (e[b] = d ? new h(d.getLogger(b)) : new h);
					return e[b]
				},
				resolve: u()
			};
		b.setLoggerProvider = b.setLoggerProvider;
		b.getLoggerProxy = b.getLoggerProxy;
		b.resolve = b.resolve;
		return b
	});
	define("lscA", ["Environment"], function(h) {
		return {
			Xd: 1E3,
			pp: 200,
			lp: 1,
			Bc: 0,
			mp: 2,
			dp: 3,
			op: 4,
			cl: "1679.2",
			wg: !h.isBrowserDocument() || "http:" != document.location.protocol && "https:" != document.location.protocol ? "file:" : document.location.protocol,
			eb: "lightstreamer.stream",
			Te: "lightstreamer.protocol",
			Yd: "lightstreamer.session",
			zg: "lightstreamer.subscriptions",
			bl: "lightstreamer.actions",
			Ra: "lightstreamer.sharing",
			kp: "lightstreamer.flash",
			FC: "lightstreamer.stats",
			Zd: "Lightstreamer_",
			gl: "lightstreamer",
			Cc: "UNORDERED_MESSAGES",
			Ag: {
				length: -1,
				toString: V("[UNCHANGED]")
			},
			CONNECTING: "CONNECTING",
			Ib: "CONNECTED:",
			yg: "STREAM-SENSING",
			fi: "WS-STREAMING",
			vg: "HTTP-STREAMING",
			Ve: "STALLED",
			Cg: "WS-POLLING",
			Wd: "HTTP-POLLING",
			ec: "DISCONNECTED",
			Bg: "DISCONNECTED:WILL-RETRY",
			kl: "WS",
			ei: "HTTP",
			il: "RAW",
			el: "DISTINCT",
			ug: "COMMAND",
			hl: "MERGE"
		}
	});
	define("lscF", ["LoggerManager", "Helpers", "lscA"], function(h, f, e) {
		function d(a) {
			this.Ha = null;
			this.vt(a)
		}

		function b(a, g) {
			return "var callFun \x3d " + function(a, g) {
				window.name != a || (window != top || window.Lightstreamer && window.Lightstreamer.Wt) || (window.name = g, window.close())
			}.toString() + "; callFun('" + a + "', '" + g + "');"
		}

		function c(a, g, b, c) {
			this.log = a;
			this.Jy = g;
			this.Uh = b;
			this.iq = c
		}
		var a = 0,
			g = 0,
			l = !1,
			n = !1,
			k = h.getLoggerProxy(e.Ra),
			m = [];
		d.prototype = {
			vt: function(a) {
				k.logDebug(h.resolve(3));
				this.Ha = a;
				this.EA() || this.Zb()
			},
			Zb: function() {
				k.logDebug(h.resolve(4));
				this.Ha = null;
				delete m[this.aA]
			},
			EA: function() {
				try {
					return this.Ha ? !0 : !1
				} catch(a) {
					return !1
				}
			},
			Xh: function() {
				return this.hC()
			},
			hC: function() {
				k.logDebug(h.resolve(5));
				var a = 1;
				try {
					if(null == this.Ha) return a = 2, new c("null", a, !1, !0);
					if(this.Ha.closed) return a = 3, this.Zb(), new c("closed", a, !1, !0);
					if(!this.Ha.Lightstreamer) return a = 4, this.Zb(), new c("not global", a, !1, !1);
					a = 5;
					return new c("OK", a, !0, !1)
				} catch(g) {
					return this.Zb(), new c("exception " + a + " " + g, 6, !1, !0)
				}
			},
			gn: function(c, d, e) {
				var t = null;
				try {
					m[c] && (t = m[c])
				} catch(r) {
					t = null
				}
				if(t && (delete m[c], this.Rr(t, c, d))) return !0;
				a: {
					var t = "javascript:" + ('eval("' + b(c, c + "__TRASH") + '; ")'),
						D = null;
					k.logDebug(h.resolve(1));
					if(n) t = !1;
					else {
						try {
							var z;
							if(window.GC) {
								var y = !0; - 5 > g - a && (y = !1);
								window.gu && y ? (a++, z = e > f.getTimeStamp() ? window.gu(t, c, "height\x3d100,width\x3d100", !0) : !1) : (l || (l = !0, k.logWarn(h.resolve(0))), a = 0, z = null)
							} else z = e > f.getTimeStamp() ? window.open(t, c, "height\x3d100,width\x3d100", !0) : !1;
							D = z
						} catch(w) {
							k.logDebug(h.resolve(2), w);
							t = !1;
							break a
						}
						if(D) try {
							g++
						} catch(x) {
							n = !0
						}
						t = D
					}
				}
				if(!1 === t) return k.logDebug(h.resolve(6)), !1;
				if(!t) return k.logDebug(h.resolve(7)), !0;
				k.logDebug(h.resolve(8));
				this.Rr(t, c, d);
				return !0
			},
			Rr: function(a, g, c) {
				try {
					k.logDebug(h.resolve(9));
					if(a.closed) return k.logDebug(h.resolve(10)), !1;
					var b = a;
					if(c) {
						if(a == a.top && !a.Lightstreamer) {
							k.logDebug(h.resolve(11));
							try {
								c = trashName, a.name != g && a.name != c || a.close()
							} catch(d) {
								k.logDebug(h.resolve(12), d)
							}
							return !1
						}
						b = a.parent;
						if(null == b) return k.logDebug(h.resolve(13)), !1
					}
					if(!b.Lightstreamer) return k.logDebug(h.resolve(14)), !1;
					if(!b.Lightstreamer.Wt) return k.logDebug(h.resolve(15)), !1;
					k.logDebug(h.resolve(16));
					this.Ha = b;
					this.aA = g;
					m[g] = a
				} catch(e) {
					return k.logDebug(h.resolve(17), e), !1
				}
				return !0
			}
		};
		c.prototype.toString = function() {
			return ["[|TestResult", this.log, this.Jy, this.Uh, this.iq, "]"].join("|")
		};
		d.hu = c;
		return d
	});
	define("Executor", ["Helpers", "EnvironmentStatus", "Environment"], function(h, f, e) {
		function d() {}

		function b(a, b) {
			return a.time === b.time ? a.Ln - b.Ln : a.time - b.time
		}

		function c() {
			y = !1;
			g()
		}

		function a() {
			if(t) clearInterval(t);
			else if(e.isBrowserDocument() && "undefined" != typeof postMessage) {
				z = function() {
					window.postMessage("Lightstreamer.run", D)
				};
				var a = function(a) {
					("Lightstreamer.run" == a.data && "*" == D || a.origin == D) && c()
				};
				h.addEvent(window, "message", a);
				y || (y = !0, z());
				!1 == y && (h.removeEvent(window, "message", a), z = d)
			} else e.isNodeJS() && ("undefined" != typeof process && process.nextTick) && (z = function() {
				process.nextTick(c)
			});
			t = setInterval(g, l)
		}

		function g() {
			if(f.ci) clearInterval(t);
			else {
				m = h.getTimeStamp();
				if(0 < k.length) {
					n && (k.sort(b), n = !1);
					for(var a; 0 < k.length && k[0].time <= m && !f.ci;) a = k.shift(), a.rf && (w.executeTask(a), a.step && s.push(a))
				}
				for(0 >= k.length && (r = 0); 0 < s.length;) a = s.shift(), a.step && (a.Ln = r++, w.addPackedTimedTask(a, a.step, !0));
				m >= q && (q = m + p, k = [].concat(k))
			}
		}
		var l = 50,
			n = !1,
			k = [],
			m = h.getTimeStamp(),
			p = 108E5,
			q = m + p,
			s = [],
			t = null,
			r = 0,
			D = !e.isBrowserDocument() || "http:" != document.location.protocol && "https:" != document.location.protocol ? "*" : document.location.protocol + "//" + document.location.hostname + (document.location.port ? ":" + document.location.port : ""),
			z = d,
			y = !1,
			w = {
				toString: function() {
					return ["[|Executor", l, k.length, "]"].join("|")
				},
				getQueueLength: function() {
					return k.length
				},
				packTask: function(a, b, c) {
					return {
						rf: a,
						Zl: b || null,
						De: c || null,
						Ln: r++
					}
				},
				addPackedTimedTask: function(a, b, c) {
					a.step = c ? b : null;
					a.time = m + parseInt(b);
					if(isNaN(a.time)) try {
						throw Error();
					} catch(d) {
						throw a = "Executor error for time: " + b, d.stack && (a += " " + d.stack), a;
					}
					k.push(a);
					n = !0
				},
				addRepetitiveTask: function(a, b, c, d) {
					return this.addTimedTask(a, b, c, d, !0)
				},
				stopRepetitiveTask: function(a) {
					a && (a.rf = null, a.step = null)
				},
				addTimedTask: function(a, b, c, d, e) {
					a = this.packTask(a, c, d);
					this.addPackedTimedTask(a, b, e);
					0 != b || y || (y = !0, z());
					return a
				},
				modifyTaskParam: function(a, b, c) {
					a.De[b] = c
				},
				modifyAllTaskParams: function(a, b) {
					a.De = b
				},
				delayTask: function(a, b) {
					a.time += b;
					n = !0
				},
				executeTask: function(a, b) {
					try {
						var c = b || a.De;
						a.Zl ? c ? a.rf.apply(a.Zl, c) : a.rf.apply(a.Zl) : c ? a.rf.apply(null, c) : a.rf()
					} catch(d) {}
				}
			};
		e.isWebWorker() ? setTimeout(a, 1) : a();
		w.getQueueLength = w.getQueueLength;
		w.packTask = w.packTask;
		w.addPackedTimedTask = w.addPackedTimedTask;
		w.addRepetitiveTask = w.addRepetitiveTask;
		w.stopRepetitiveTask = w.stopRepetitiveTask;
		w.addTimedTask = w.addTimedTask;
		w.modifyTaskParam = w.modifyTaskParam;
		w.modifyAllTaskParams = w.modifyAllTaskParams;
		w.delayTask = w.delayTask;
		w.executeTask = w.executeTask;
		return w
	});
	define("Inheritance", ["IllegalStateException"], function(h) {
		function f(d, b, c) {
			if(b) return c ? b.apply(d, c) : b.apply(d)
		}
		var e = {
			au: function(d, b, c, a) {
				for(var g in b.prototype)
					if(!d.prototype[g]) d.prototype[g] = b.prototype[g];
					else if(a) {
					var f;
					a: {
						f = b.prototype;
						var n = void 0;
						for(n in f)
							if(f[g] == f[n] && g != n) {
								f = n;
								break a
							}
						f = null
					}
					if(f) {
						if(d.prototype[f] && d.prototype[f] !== d.prototype[g] && b.prototype[f] !== b.prototype[f]) throw new h("Can't solve alias collision, try to minify the classes again (" + f + ", " + g + ")");
						d.prototype[f] = d.prototype[g]
					}
				}
				c || (d.prototype._super_ = b, d.prototype._callSuperConstructor = e._callSuperConstructor, d.prototype._callSuperMethod = e._callSuperMethod)
			},
			_callSuperMethod: function(d, b, c) {
				return f(this, d.prototype._super_.prototype[b], c)
			},
			_callSuperConstructor: function(d, b) {
				f(this, d.prototype._super_, b)
			}
		};
		return e.au
	});
	define("CookieManager", ["Helpers", "Environment"], function(h, f) {
		var e = !1,
			d = {
				areCookiesEnabled: function() {
					return e
				},
				getAllCookiesAsSingleString: function() {
					return this.areCookiesEnabled() ? document.cookie.toString() : null
				},
				writeCookie: function(b, c) {
					this.Vt(b, c, "")
				},
				Vt: function(b, c, a) {
					this.areCookiesEnabled() && (document.cookie = encodeURIComponent(b) + "\x3d" + c + "; " + a + "path\x3d/;")
				},
				readCookie: function(b) {
					if(!this.areCookiesEnabled()) return null;
					b = encodeURIComponent(b) + "\x3d";
					for(var c = this.getAllCookiesAsSingleString(),
							c = c.split(";"), a = 0; a < c.length; a++)
						if(c[a] = h.trim(c[a]), 0 == c[a].indexOf(b)) return c[a].substring(b.length, c[a].length);
					return null
				},
				removeCookie: function(b) {
					if(this.areCookiesEnabled()) {
						var c = new Date;
						c.setTime(c.getTime() - 864E5);
						this.Vt(b, "deleting", "expires\x3d" + c.toGMTString() + "; ")
					}
				},
				bv: function() {
					if(f.isBrowserDocument() && ("http:" == document.location.protocol || "https:" == document.location.protocol)) {
						e = !0;
						var b = "LS__cookie_test" + h.randomG();
						this.writeCookie(b, "testing");
						var c = this.readCookie(b);
						if("testing" == c && (this.removeCookie(b), c = this.readCookie(b), null == c)) return;
						e = !1
					}
				}
			};
		d.bv();
		d.areCookiesEnabled = d.areCookiesEnabled;
		d.getAllCookiesAsSingleString = d.getAllCookiesAsSingleString;
		d.writeCookie = d.writeCookie;
		d.removeCookie = d.removeCookie;
		d.readCookie = d.readCookie;
		return d
	});
	define("lscG", ["Environment"], function(h) {
		var f = RegExp("\\.", "g"),
			e = RegExp("-", "g"),
			d = {
				".": !0,
				" ": !0,
				0: !0
			},
			b = {
				Dr: function() {
					return h.isBrowser() ? !1 === navigator.onLine : !1
				},
				Np: function() {
					try {
						return "undefined" != typeof localStorage && null !== localStorage && localStorage.getItem && localStorage.setItem
					} catch(b) {
						return !1
					}
				},
				qc: function() {
					try {
						return document.domain
					} catch(b) {
						return ""
					}
				},
				Pm: function() {
					if(!h.isBrowserDocument()) return !0;
					try {
						return -1 < document.location.host.indexOf("[") ? !0 : b.qc() == document.location.hostname
					} catch(c) {
						return !1
					}
				},
				ef: function(b) {
					if("undefined" != typeof b) {
						if(!0 === b || !1 === b) return !0 === b;
						if(null != b) return isNaN(b) || "" == b ? (b || "" == b) && b.toString ? b.toString() : isNaN(b) ? NaN : b : b.charAt && b.charAt(0) in d && b.toString ? b.toString() : parseFloat(b, 10)
					}
					return null
				},
				Ij: function(b) {
					return require.Ij ? require.Ij(b) : require(b)
				},
				ca: function(b, a) {
					b = b || {};
					if(a)
						for(var g in a) b[g] = a[g];
					return b
				},
				nk: function(b) {
					return b.replace(f, "_").replace(e, "__")
				},
				getReverse: function(b) {
					var a = {},
						g;
					for(g in b) a[b[g]] = g;
					return a
				}
			};
		return b
	});
	define("lscAZ", ["lscA"], function(h) {
		function f(e, d, b) {
			this.id = e;
			this.U = d;
			this.status = b
		}
		f.prototype = {
			yb: L("status")
		};
		return {
			$f: function(e, d) {
				return this.Un(d + "_" + e)
			},
			zC: function(e, d, b) {
				b = b.join("|");
				this.write(h.Zd + d + "_" + e, b)
			},
			Ll: function(e, d) {
				this.clean(h.Zd + d + "_" + e)
			},
			ck: function(e) {
				return this.Un(e)
			},
			nA: function(e) {
				e = this.Un(e);
				if(!e) return null;
				for(var d = [], b = 0; b < e.length; b++) {
					var c = e[b].split("_");
					if(2 == c.length) {
						var a = this.$f(c[1], c[0]);
						null != a && d.push(new f(c[0], c[1], a))
					}
				}
				return d
			},
			ql: function(e, d, b) {
				e = h.Zd + e;
				d += b ? "_" + b : "";
				b = this.bk(e);
				if(!b) b = "|";
				else if(-1 < b.indexOf("|" + d + "|")) return !1;
				this.write(e, b + (d + "|"));
				return !0
			},
			Gh: function(e, d, b) {
				e = h.Zd + e;
				d += b ? "_" + b : "";
				if(b = this.bk(e)) d = "|" + d + "|", -1 < b.indexOf(d) && (b = b.replace(d, "|"), "|" == b ? this.clean(e) : this.write(e, b))
			},
			sw: function() {
				for(var e = this.keys(), d = [], b = 0; b < e.length; b++) 0 == e[b].indexOf(h.Zd) && (e[b] = e[b].substring(h.Zd.length), d.push(e[b]));
				return d
			},
			Un: function(e) {
				e = h.Zd + e;
				e = this.bk(e);
				if(!e) return null;
				e = e.split("|");
				"" == e[0] && e.shift();
				"" == e[e.length - 1] && e.pop();
				return 0 < e.length ? e : null
			}
		}
	});
	define("lscAa", ["lscG", "lscAZ"], function(h, f) {
		return h.ca({
			bk: function(e) {
				return localStorage.getItem(e)
			},
			write: function(e, d) {
				localStorage.setItem(e, d)
			},
			clean: function(e) {
				localStorage.removeItem(e)
			},
			keys: function() {
				for(var e = [], d = 0; d < localStorage.length; d++) e.push(localStorage.key(d));
				return e
			}
		}, f)
	});
	define("lscAX", ["CookieManager", "lscAZ", "lscG", "Helpers"], function(h, f, e, d) {
		return e.ca({
			bk: function(b) {
				return h.readCookie(b)
			},
			write: function(b, c) {
				h.writeCookie(b, c)
			},
			clean: function(b) {
				h.removeCookie(b)
			},
			keys: function() {
				for(var b = [], b = h.getAllCookiesAsSingleString().split(";"), c = 0; c < b.length; c++) b[c] = d.trim(b[c]), b[c] = b[c].substring(0, b[c].indexOf("\x3d")), b[c] = decodeURIComponent(b[c]);
				return b
			}
		}, f)
	});
	define("Dismissable", ["Executor"], function(h) {
		function f() {
			this.initTouches()
		}
		f.prototype = {
			clean: E(),
			initTouches: function(e) {
				this.Jo = this.vf = 0;
				this.timeout = e || 5E3
			},
			uC: function(e) {
				e == this.Jo && 0 >= this.vf && this.clean()
			},
			dismiss: function() {
				this.vf--;
				0 >= this.vf && h.addTimedTask(this.uC, this.timeout, this, [this.Jo])
			},
			touch: function() {
				this.Jo++;
				0 > this.vf && (this.vf = 0);
				this.vf++
			}
		};
		f.prototype.touch = f.prototype.touch;
		f.prototype.dismiss = f.prototype.dismiss;
		f.prototype.clean = f.prototype.clean;
		f.prototype.initTouches = f.prototype.initTouches;
		return f
	});
	define("lscAW", "lscAa lscAX Executor Dismissable Inheritance lscA Helpers lscG".split(" "), function(h, f, e, d, b, c, a, g) {
		function l(a) {
			this._callSuperConstructor(l);
			this.fa = a;
			this.Ok = null
		}
		var n = [],
			k = c.Xd + c.pp,
			m = 6E4;
		l.prototype = {
			start: function() {
				this.Ok && e.stopRepetitiveTask(this.Ok);
				this.Ok = e.addRepetitiveTask(this.$p, m, this);
				e.addTimedTask(this.$p, 0, this)
			},
			clean: function() {
				e.stopRepetitiveTask(this.Ok);
				for(var a = 0; a < n.length; a++)
					if(n[a] == this) {
						n.splice(a, 1);
						break
					}
			},
			$p: function() {
				for(var b = a.getTimeStamp(), g = this.fa.sw(), c = 0; c < g.length; c++) 0 < g[c].indexOf("_") && this.rd(g[c], null, b);
				for(c = 0; c < g.length; c++) - 1 >= g[c].indexOf("_") && this.cv(g[c])
			},
			rd: function(a, b, g) {
				if(!b) {
					b = a.split("_");
					if(2 != b.length) return !1;
					a = b[0];
					b = b[1]
				}
				var d = this.fa.$f(b, a);
				return d ? g ? g - d[c.Bc] > k ? (this.fa.Ll(b, a), !1) : !0 : !0 : !1
			},
			cv: function(a) {
				for(var b = this.fa.ck(a), g = 0; g < b.length; g++) 0 < b[g].indexOf("_") ? this.rd(b[g]) || this.fa.Gh(a, b[g]) : this.rd(b[g], a) || this.fa.Gh(a, b[g])
			}
		};
		b(l, d, !1, !0);
		h = new l(h);
		var p = new l(f),
			q = g.Np() ? h : p;
		return {
			start: function(a) {
				a = a ? p : q;
				for(var b = 0; b < n.length; b++)
					if(n[b] == a) {
						a.touch();
						return
					}
				n.push(a);
				a.touch();
				a.start()
			},
			stop: function(a) {
				a = a ? p : q;
				for(var b = 0; b < n.length; b++) n[b] == a && a.dismiss()
			},
			KC: function(a) {
				m = a;
				for(a = 0; a < n.length; a++) n[a].start()
			}
		}
	});
	define("IFrameHandler", ["BrowserDetection", "EnvironmentStatus", "Environment"], function(h, f, e) {
		var d = h.isProbablyAWebkit() && h.isProbablyChrome(32, !0) ? null : "about:blank",
			b = {},
			c = {
				createFrame: function(a, c) {
					if(!e.isBrowserDocument()) return null;
					var f = document.getElementsByTagName("BODY")[0];
					if(!f) return null;
					c = c || d;
					var n = document.createElement("iframe");
					n.style.visibility = "hidden";
					n.style.height = "0px";
					n.style.width = "0px";
					n.style.display = "none";
					n.name = a;
					n.id = a;
					h.isProbablyIE() || h.isProbablyOldOpera() ? (n.src = c, f.appendChild(n)) : (f.appendChild(n), n.src = c);
					try {
						if(n.contentWindow) {
							try {
								n.contentWindow.name = a
							} catch(k) {}
							b[a] = n.contentWindow;
							return b[a]
						}
						return document.frames && document.frames[a] ? (b[a] = document.frames[a], b[a]) : null
					} catch(m) {
						return null
					}
				},
				getFrameWindow: function(a, c, d) {
					c && !b[a] && this.createFrame(a, d);
					return b[a] || null
				},
				disposeFrame: function(a) {
					if(b[a]) {
						try {
							document.getElementsByTagName("BODY")[0].removeChild(document.getElementById(a))
						} catch(c) {}
						delete b[a]
					}
				},
				removeFrames: function() {
					for(var a in b) try {
						document.getElementsByTagName("BODY")[0].removeChild(document.getElementById(a))
					} catch(c) {}
					b = {}
				}
			};
		c.createFrame = c.createFrame;
		c.getFrameWindow = c.getFrameWindow;
		c.disposeFrame = c.disposeFrame;
		c.removeFrames = c.removeFrames;
		f.addUnloadHandler(c.removeFrames);
		return c
	});
	define("lscAY", "Executor lscA lscAW lscAa lscAX Helpers EnvironmentStatus IFrameHandler LoggerManager lscG Environment".split(" "), function(h, f, e, d, b, c, a, g, l, n, k) {
		function m(a, g, c) {
			k.browserDocumentOrDie();
			this.U = a;
			this.rj = this.id = null;
			this.Bk = 500;
			this.Bo = g;
			this.hf = null;
			this.host = location.host;
			this.Pc = null;
			this.Bh = !1;
			this.Nq = 0;
			c ? (this.fa = b, e.start(!0)) : (this.fa = q, e.start());
			this.iw = c;
			this.Io = this.Fk = null;
			this.ea();
			this.Ss();
			this.Tq();
			this.uh = {};
			p.logInfo(l.resolve(19), this)
		}
		var p = l.getLoggerProxy(f.Ra),
			q = n.Np() ? d : b,
			s = c.randomG(),
			t = f.Bc;
		m.Jm = function() {
			return q
		};
		m.prototype = {
			toString: function() {
				return ["[SharedStatus", this.id, this.U, "]"].join("|")
			},
			ea: function() {
				this.id = s++;
				this.fa.ql(this.U, this.id) ? this.fa.$f(this.U, this.id) ? this.ea() : (this.Pc = this.ow(), a.addBeforeUnloadHandler(this), a.addUnloadHandler(this)) : this.ea()
			},
			start: function() {
				this.Io = h.addRepetitiveTask(this.qA, f.Xd, this);
				p.logInfo(l.resolve(20), this)
			},
			Tq: function() {
				g.getFrameWindow(this.Pc, !0) ? (this.Bk = 500, this.Fk = h.addTimedTask(this.start, 0, this)) : (this.Fk = h.addTimedTask(this.Tq, this.Bk, this), this.Bk *= 2)
			},
			da: L("id"),
			vu: function(a) {
				a != this.hf && (this.hf = a, this.fa.ql(a, this.id, this.U))
			},
			Vs: function(a) {
				this.hf != a ? p.logError(l.resolve(18), this.hf, a) : this.hf = null;
				this.fa.Gh(a, this.id, this.U)
			},
			fx: function(a) {
				a = this.fa.nA(a);
				if(!a) return 0;
				for(var b = 0, g = 0; g < a.length; g++) c.getTimeStamp() - a[g].yb()[t] > f.Xd || b++;
				return b
			},
			Ss: function() {
				this.rj = c.getTimeStamp() + this.Nq;
				this.fa.zC(this.U, this.id, [this.rj, this.Pc,
					this.host, f.cl, f.wg
				])
			},
			qA: function() {
				if(this.Bh) p.logDebug(l.resolve(23)), this.Bh = !1;
				else {
					var a = !1;
					if(this.Bo) {
						p.logDebug(l.resolve(24), this);
						var b = this.fa.ck(this.U);
						if(b) {
							p.logDebug(l.resolve(26), this.U);
							for(var g = 0; g < b.length; g++)
								if(b[g] != this.id) {
									var d = this.fa.$f(this.U, b[g]);
									d ? d[f.dp] != f.cl || d[f.op] != f.wg ? p.logDebug(l.resolve(28), b[g]) : (d[t] == this.rj && (this.Nq = c.randomG(5)), d[t] > this.rj ? a |= this.Vy(b[g], d[t]) : this.uh[b[g]] && delete this.uh[b[g]]) : p.logDebug(l.resolve(27), b[g])
								}
						} else p.logDebug(l.resolve(25), this)
					}
					a || (p.logDebug(l.resolve(29)), this.fa.ql(this.U, this.id), this.Ss())
				}
			},
			Vy: function(a, b) {
				p.logDebug(l.resolve(30), a, b);
				if(this.uh[a])
					if(this.uh[a] != b) p.logInfo(l.resolve(21)), this.Si();
					else return !1;
				this.uh[a] = b;
				return !0
			},
			ow: function() {
				return n.nk("LSF__" + n.qc() + "_" + this.id + "_" + this.U)
			},
			Si: function() {
				this.clean();
				this.Bo && h.executeTask(this.Bo)
			},
			Pr: function() {
				this.fa.Ll(this.U, this.id);
				this.fa.Gh(this.U, this.id);
				this.Bh = !0
			},
			clean: function() {
				p.logInfo(l.resolve(22), this);
				h.stopRepetitiveTask(this.Io);
				h.stopRepetitiveTask(this.Fk);
				g.disposeFrame(this.Pc);
				this.Pc = this.Fk = this.Io = null;
				this.Vs(this.hf);
				this.Pr()
			},
			unloadEvent: function() {
				this.clean()
			},
			preUnloadEvent: function() {
				this.Pr()
			},
			ka: function() {
				this.clean();
				a.removeBeforeUnloadHandler(this);
				a.removeUnloadHandler(this);
				e.stop(this.iw)
			}
		};
		m.prototype.unloadEvent = m.prototype.unloadEvent;
		m.prototype.preUnloadEvent = m.prototype.preUnloadEvent;
		return m
	});
	define("lscAR", "lscF Executor LoggerManager BrowserDetection Inheritance CookieManager lscAY Helpers lscA lscG".split(" "), function(h, f, e, d, b, c, a, g, l, n) {
		function k(a, b, g, d, e) {
			this._callSuperConstructor(k, [a]);
			this.appName = b;
			this.ul = this.th = this.fe = null;
			this.ro = !0;
			this.Vf = {};
			this.Yc = {};
			this.tn = 0;
			this.Kc = e || 5E3;
			this.ee = null;
			this.No = !1;
			this.Uk = this.Qk = 0;
			this.Mo = !1;
			this.yC = g;
			this.og = d;
			c.areCookiesEnabled() && f.addRepetitiveTask(this.hv, 6E4, this)
		}

		function m(a) {
			for(var b in a) return b
		}
		var p = m({
				Zb: !0
			}),
			q = m({
				gn: !0
			}),
			s = m({
				Xh: !0
			}),
			t = e.getLoggerProxy(l.Ra),
			r = h.hu;
		k.prototype = {
			Zb: function() {
				this._callSuperMethod(k, p);
				this.th = this.fe = null
			},
			tf: function() {
				return null != this.Ha ? (this.It(), null !== this.Ha ? this.Ha : null) : null
			},
			Qv: function(a) {
				this.ro = !a
			},
			FA: function(a, b) {
				var g = null;
				if((this.Mo || null == a) && this.yC) t.logDebug(e.resolve(31)), g = this.cw(), this.Mo = !1;
				else if(null != a) t.logDebug(e.resolve(32)), this.vt(a), this.Mo = !0;
				else return 10 == this.tn && t.logDebug(e.resolve(33)), 10 >= this.tn && this.tn++,
					null;
				t.logDebug(e.resolve(34));
				var c = this.It();
				t.logDebug(e.resolve(35), c);
				if(null != this.Ha) {
					t.logDebug(e.resolve(36));
					this.Uk = 0;
					try {
						return this.Vf["LS6__" + n.qc() + "_" + this.fe + "_" + this.appName] = "OK", this.Ha
					} catch(k) {
						t.logDebug(e.resolve(37))
					}
				}
				if(d.isProbablyOldOpera() && b && g && "null" == g.log) return t.logDebug(e.resolve(38)), f.executeTask(b), null;
				this.Uk++;
				10 <= this.Uk && (this.Uk = 0, b && this.ty() ? (t.logDebug(e.resolve(39)), f.executeTask(b)) : (t.logDebug(e.resolve(40)), this.No = !0));
				return null
			},
			gn: function(a, b, g) {
				return !1 === this._callSuperMethod(k, q, [a, !0, b]) ? !1 : this.Jt(g)
			},
			ty: function() {
				if(this.Ev) return t.logDebug(e.resolve(41)), !0;
				if(d.isProbablyOldOpera()) return t.logDebug(e.resolve(42)), !0;
				if(d.isProbablyChrome()) return t.logDebug(e.resolve(43)), !0;
				if(d.isProbablyApple(7, !1)) return t.logDebug(e.resolve(44)), !0
			},
			Jw: function() {
				if(!c.areCookiesEnabled()) return null;
				this.ul = null;
				var b = l.Xd + (this.ro ? l.pp : 0),
					d = a.Jm(),
					k = d.ck(this.appName);
				if(!k) return t.logDebug(e.resolve(45)), null;
				for(var s = 0; s < k.length; s++) {
					var r = k[s] + "_" + this.appName,
						h = d.$f(this.appName, k[s]);
					if(h)
						if(this.Vf[h[l.lp]]) t.logDebug(e.resolve(47), r);
						else if(h[l.dp] != l.cl || h[l.op] != l.wg) t.logDebug(e.resolve(48), h);
					else {
						var n = g.getTimeStamp(),
							q = n - parseInt(h[l.Bc]),
							p = 1E3 - q;
						if(q > b) this.Yc[r] ? q > 2 * l.Xd ? (this.Yc[r] = null, t.logDebug(e.resolve(49), r)) : (this.Yc[r] = h[l.Bc], this.og && f.executeTask(this.og, [p]), t.logDebug(e.resolve(50), r)) : t.logDebug(e.resolve(51), r);
						else {
							if(this.ro)
								if(!this.Yc[r]) {
									t.logDebug(e.resolve(52), r);
									this.Yc[r] = h[l.Bc];
									this.og && f.executeTask(this.og, [p]);
									continue
								} else if(this.Yc[r] == h[l.Bc]) {
								t.logDebug(e.resolve(53), r);
								this.og && f.executeTask(this.og, [p]);
								continue
							}
							this.ul = n + l.Xd - q;
							t.logDebug(e.resolve(54), r);
							return {
								L: h,
								id: k[s]
							}
						}
					} else t.logDebug(e.resolve(46), r)
				}
				return null
			},
			cw: function() {
				var a = this.Jw();
				if(!a) return !1;
				var b = a.L,
					g = b[l.lp],
					a = this.gn(g, this.ul, a.id);
				this.Vf[g] = !1 === a || !a.Uh && !1 == a.iq ? !1 : a.log ? a.log : "unknown";
				b[l.mp] && b[l.mp] != location.host && (this.Ev = !0);
				return a
			},
			Xh: function() {
				var a = this._callSuperMethod(k, s);
				a.Uh || (this.fe = null);
				return a
			},
			It: function() {
				return this.fe ? this.Jt(this.fe) : this.gC()
			},
			Jt: function(a) {
				var b = this.Xh();
				if(!b.Uh) return b;
				t.logDebug(e.resolve(55));
				b = 0;
				try {
					var g = this.Ha.Lightstreamer["_" + a];
					if(!g) return b = 6, t.logDebug(e.resolve(56), a), this.Zb(), new r(a + " not IN global", b, !1, !1);
					if(!g.lsEngine) return b = 7, t.logDebug(e.resolve(57), a), this.Zb(), new r(a + " not IN ITS global", b, !1, !1);
					this.fe = a;
					this.th = g.lsEngine;
					b = 8;
					return new r("OK", b, !0, !1)
				} catch(c) {
					return t.logDebug(e.resolve(58), b, c), this.Zb(), new r("exception " + b + " " + c, 9, !1, !0)
				}
			},
			gC: function() {
				var a = this.Xh();
				if(!a.Uh) return a;
				t.logDebug(e.resolve(59));
				try {
					var b = this.Ha.Lightstreamer,
						g;
					for(g in b) try {
						if(0 == g.indexOf("_") && b[g].lsEngine && b[g].lsEngine.nf == this.appName) return this.th = b[g].lsEngine, this.fe = this.th.fh(), new r("OK", 10, !0, !1)
					} catch(c) {}
				} catch(d) {
					return t.logDebug(e.resolve(60), d), this.Zb(), new r("exception " + d, 11, !1, !0)
				}
			},
			ot: function(a) {
				this.Kc = a;
				this.Ci && (a = this.ee, this.zt(), this.yt(a))
			},
			yt: function(a) {
				this.Ci || (t.logDebug(e.resolve(61)), this.ee = a, this.Ci = f.addRepetitiveTask(this.rd, this.Kc, this))
			},
			zt: function() {
				t.logDebug(e.resolve(62));
				f.stopRepetitiveTask(this.Ci);
				delete this.ee;
				delete this.Ci
			},
			rd: function() {
				null === this.tf() && this.ee && f.executeTask(this.ee, [!1]);
				this.ee && f.executeTask(this.ee, [!0])
			},
			hv: function() {
				var a = document.cookie.toString();
				this.gv(a);
				this.lv(a)
			},
			gv: function(a) {
				var b = this.Vf;
				this.Vf = {};
				for(var g in b) b[g] && -1 < a.indexOf(g) && (this.Vf[g] = b[g])
			},
			lv: function(a) {
				var b = this.Yc;
				this.Yc = {};
				for(var g in b) b[g] && -1 < a.indexOf(g) && (this.Yc[g] = b[g])
			},
			pC: function(a) {
				this.No = !1;
				f.addTimedTask(this.oC, 2E4, this, [new Number(++this.Qk), a])
			},
			oC: function(a, b) {
				this.No && a == this.Qk && (f.executeTask(b), this.Qk++)
			},
			Su: function() {
				this.Qk++
			}
		};
		b(k, h);
		return k
	});
	define("Setter", ["IllegalArgumentException"], function(h) {
		function f() {}
		f.prototype.checkPositiveNumber = function(e, d, b) {
			var c = new Number(e);
			if(isNaN(c)) throw new h("The given value is not valid. Use a number");
			if(!b && c != Math.round(c)) throw new h("The given value is not valid. Use an integer");
			if(d) {
				if(0 > e) throw new h("The given value is not valid. Use a positive number or 0");
			} else if(0 >= e) throw new h("The given value is not valid. Use a positive number");
			return c
		};
		f.prototype.checkBool = function(e, d) {
			if(!0 === e || !1 === e || d && !e) return !0 === e;
			throw new h("The given value is not valid. Use true or false");
		};
		return f
	});
	define("lscH", ["LoggerManager", "lscG", "Inheritance", "Setter", "lscA"], function(h, f, e, d, b) {
		function c(a) {
			this.Q = "lscH";
			this.parent = null;
			this.Kp = !1;
			a && this.Hi(a)
		}
		var a = h.getLoggerProxy(b.bl),
			g = h.getLoggerProxy(b.Ra);
		c.prototype = {
			ej: function(a) {
				return this.Wk[a]
			},
			P: function(b, g) {
				var c = this.ej(b),
					d = this[c];
				this[c] = f.ef(g);
				a.logDebug(h.resolve(64), this.parent, b, this.hj(c));
				this.parent && this.Kp && this.af(b);
				d != this[c] && this.bs(b)
			},
			hj: function(a) {
				return this.tq && this.tq[a] ? "[...]" : this[a]
			},
			r: function(b, g) {
				var c = this.ej(b);
				g != this[c] && (this[c] = g, a.logInfo(h.resolve(63), b, this.hj(c)), this.af(b), this.bs(b))
			},
			hg: function(a, b) {
				this.parent = a;
				this.Kp = b
			},
			af: function(a) {
				var b = this.ej(a);
				g.logDebug(h.resolve(65), a, this.hj(b));
				return this.parent && this.parent.af && !this.parent.af(this.Q, a, f.ef(this[b])) ? !1 : !0
			},
			bs: function(b) {
				var g = this.ej(b);
				!this.parent || !this.parent.ds || this.$r && this.$r[g] || (a.logDebug(h.resolve(66), b, this.hj(g)), this.parent.ds(b, this))
			},
			Hi: function(a) {
				var b = this.Wk,
					g;
				for(g in b) this.P(g, a[b[g]])
			}
		};
		e(c, d, !1, !0);
		return c
	});
	define("lscJ", ["lscH", "Inheritance", "lscG"], function(h, f, e) {
		function d(a) {
			this.Xm = null;
			this.Qg = !1;
			this.$r = b;
			this.Wk = c;
			this._callSuperConstructor(d, arguments);
			this.Q = "lscJ"
		}
		var b = {
				Xm: !0,
				Qg: !0
			},
			c = {
				Qg: "connectionRequested",
				Xm: "isLocalEngine"
			},
			c = e.getReverse(c);
		f(d, h);
		return d
	});
	define("lscL", "IllegalArgumentException lscA lscH Inheritance Global Environment lscG".split(" "), function(h, f, e, d, b, c, a) {
		function g() {
			this.Yl = 2E6;
			this.lj = 19E3;
			this.Fd = this.Tc = this.Bf = 0;
			this.Hd = 3E3;
			this.Ek = 2E3;
			this.df = 4E3;
			this.jk = 5E3;
			this.vm = 100;
			this.so = !0;
			this.zm = null;
			this.gq = this.ho = !1;
			this.kk = 0;
			this.km = !0;
			this.to = 5E3;
			this.mh = this.Dk = null;
			this.kj = !1;
			this.Ii = this.Zo = !0;
			this.Yi = 2E3;
			this.Do = 4E3;
			this.Wk = n;
			this._callSuperConstructor(g, arguments);
			this.Q = "lscL"
		}
		var l = {};
		l[f.vg] = !0;
		l[f.Cg] = !0;
		l[f.Wd] = !0;
		l[f.fi] = !0;
		l[f.kl] = !0;
		l[f.ei] = !0;
		var n = {
				Yl: "contentLength",
				lj: "idleMillis",
				Bf: "keepaliveMillis",
				Tc: "maxBandwidth",
				Fd: "pollingMillis",
				Hd: "reconnectTimeout",
				Ek: "stalledTimeout",
				df: "connectTimeout",
				jk: "retryDelay",
				vm: "firstRetryMaxDelay",
				so: "slowingEnabled",
				zm: "forcedTransport",
				ho: "serverInstanceAddressIgnored",
				gq: "cookieHandlingRequired",
				kk: "reverseHeartbeatMillis",
				km: "earlyWSOpenEnabled",
				to: "spinFixTimeout",
				Dk: "spinFixEnabled",
				Zo: "xDomainStreamingEnabled",
				Ii: "corsXHREnabled",
				Yi: "forceBindTimeout",
				Do: "switchCheckTimeout",
				mh: "httpExtraHeaders",
				kj: "httpExtraHeadersOnSessionCreationOnly"
			},
			n = a.getReverse(n);
		g.prototype = {
			XA: function(a) {
				this.r("contentLength", this.checkPositiveNumber(a))
			},
			Ew: L("Yl"),
			fB: function(a) {
				this.r("idleMillis", this.checkPositiveNumber(a, !0))
			},
			Tw: L("lj"),
			hB: function(a) {
				this.r("keepaliveMillis", this.checkPositiveNumber(a, !0))
			},
			Ww: L("Bf"),
			jB: function(a) {
				a = "unlimited" == (new String(a)).toLowerCase() ? 0 : this.checkPositiveNumber(a, !1, !0);
				this.r("maxBandwidth", a)
			},
			Yw: function() {
				return 0 >= this.Tc ? "unlimited" : this.Tc
			},
			oB: function(a) {
				this.r("pollingMillis", this.checkPositiveNumber(a, !0))
			},
			gx: L("Fd"),
			kx: L("Hd"),
			AB: function(a) {
				this.r("stalledTimeout", this.checkPositiveNumber(a))
			},
			nr: L("Ek"),
			VA: function(a) {
				this.r("connectTimeout", this.checkPositiveNumber(a))
			},
			Bw: L("df"),
			st: function(a) {
				this.r("retryDelay", this.checkPositiveNumber(a))
			},
			kr: L("jk"),
			aB: function(a) {
				this.r("firstRetryMaxDelay", this.checkPositiveNumber(a))
			},
			Mw: L("vm"),
			wB: function(a) {
				this.r("slowingEnabled", this.checkBool(a))
			},
			ry: L("so"),
			cB: function(a) {
				if(null !== a && !l[a]) throw new h("The given value is not valid. Use one of: HTTP-STREAMING, HTTP-POLLING, WS-STREAMING, WS-POLLING, WS, HTTP or null");
				this.r("forcedTransport", a)
			},
			Rw: L("zm"),
			uB: function(a) {
				this.r("serverInstanceAddressIgnored", this.checkBool(a))
			},
			qy: L("ho"),
			YA: function(a) {
				if(a && !c.isBrowser()) throw new h("cookieHandlingRequired is only supported on Browsers");
				this.r("cookieHandlingRequired", this.checkBool(a))
			},
			Tb: L("gq"),
			$A: function(a) {
				this.r("earlyWSOpenEnabled", this.checkBool(a))
			},
			by: L("km"),
			rB: function(a) {
				this.r("reverseHeartbeatMillis", this.checkPositiveNumber(a, !0))
			},
			ox: L("kk"),
			dB: function(a) {
				if(a) {
					var b = "",
						g;
					for(g in a) b += g + "\n" + a[g] + "\n";
					this.r("httpExtraHeaders", b)
				} else this.r("httpExtraHeaders", null)
			},
			er: function() {
				if(!this.mh) return this.mh;
				for(var a = {}, b = this.mh.split("\n"), g = 0; g < b.length - 1; g += 2) a[b[g]] = b[g + 1];
				return a
			},
			eB: function(a) {
				this.r("httpExtraHeadersOnSessionCreationOnly", this.checkBool(a))
			},
			fy: L("kj"),
			lh: function(a) {
				return this.mh ? a ? !0 : !this.kj : !1
			},
			Yg: function(a) {
				return !a && this.kj ? null : this.er()
			},
			EB: function(a) {
				this.r("xDomainStreamingEnabled", this.checkBool(a))
			},
			zy: L("Zo"),
			ZA: function(a) {
				this.r("corsXHREnabled", this.checkBool(a))
			},
			Zx: L("Ii"),
			bB: function(a) {
				this.r("forceBindTimeout", this.checkPositiveNumber(a))
			},
			Pw: L("Yi"),
			BB: function(a) {
				this.r("switchCheckTimeout", this.checkPositiveNumber(a))
			},
			yx: L("Do"),
			zB: function(a) {
				this.r("spinFixTimeout", this.checkPositiveNumber(a))
			},
			wx: L("to"),
			yB: function(a) {
				this.r("spinFixTimeout", null === this.IC ? null : this.checkBool(a))
			},
			vx: L("Dk")
		};
		g.prototype.setContentLength = g.prototype.XA;
		g.prototype.getContentLength = g.prototype.Ew;
		g.prototype.setIdleMillis = g.prototype.fB;
		g.prototype.getIdleMillis = g.prototype.Tw;
		g.prototype.setKeepaliveMillis = g.prototype.hB;
		g.prototype.getKeepaliveMillis = g.prototype.Ww;
		g.prototype.setMaxBandwidth = g.prototype.jB;
		g.prototype.getMaxBandwidth = g.prototype.Yw;
		g.prototype.setPollingMillis = g.prototype.oB;
		g.prototype.getPollingMillis = g.prototype.gx;
		g.prototype.setReconnectTimeout = g.prototype.nr;
		g.prototype.getReconnectTimeout = g.prototype.kx;
		g.prototype.setStalledTimeout = g.prototype.AB;
		g.prototype.getStalledTimeout = g.prototype.nr;
		g.prototype.setConnectTimeout = g.prototype.VA;
		g.prototype.getConnectTimeout = g.prototype.Bw;
		g.prototype.setRetryDelay = g.prototype.st;
		g.prototype.getRetryDelay = g.prototype.kr;
		g.prototype.setFirstRetryMaxDelay = g.prototype.aB;
		g.prototype.getFirstRetryMaxDelay = g.prototype.Mw;
		g.prototype.setSlowingEnabled = g.prototype.wB;
		g.prototype.isSlowingEnabled = g.prototype.ry;
		g.prototype.setForcedTransport = g.prototype.cB;
		g.prototype.getForcedTransport = g.prototype.Rw;
		g.prototype.setServerInstanceAddressIgnored = g.prototype.uB;
		g.prototype.isServerInstanceAddressIgnored = g.prototype.qy;
		g.prototype.setCookieHandlingRequired = g.prototype.YA;
		g.prototype.isCookieHandlingRequired = g.prototype.Tb;
		g.prototype.setEarlyWSOpenEnabled = g.prototype.$A;
		g.prototype.isEarlyWSOpenEnabled = g.prototype.by;
		g.prototype.setReverseHeartbeatMillis = g.prototype.rB;
		g.prototype.getReverseHeartbeatMillis = g.prototype.ox;
		g.prototype.setHttpExtraHeaders = g.prototype.dB;
		g.prototype.getHttpExtraHeaders = g.prototype.er;
		g.prototype.setHttpExtraHeadersOnSessionCreationOnly = g.prototype.eB;
		g.prototype.isHttpExtraHeadersOnSessionCreationOnly = g.prototype.fy;
		g.prototype.setXDomainStreamingEnabled = g.prototype.EB;
		g.prototype.isXDomainStreamingEnabled = g.prototype.zy;
		g.prototype.setCorsXHREnabled = g.prototype.ZA;
		g.prototype.isCorsXHREnabled = g.prototype.Zx;
		g.prototype.setForceBindTimeout = g.prototype.bB;
		g.prototype.getForceBindTimeout = g.prototype.Pw;
		g.prototype.setSwitchCheckTimeout = g.prototype.BB;
		g.prototype.getSwitchCheckTimeout = g.prototype.yx;
		g.prototype.setSpinFixTimeout = g.prototype.zB;
		g.prototype.getSpinFixTimeout = g.prototype.wx;
		g.prototype.setSpinFixEnabled = g.prototype.yB;
		g.prototype.getSpinFixEnabled = g.prototype.vx;
		g.prototype.setRetryTimeout = g.prototype.st;
		g.prototype.getRetryTimeout = g.prototype.kr;
		d(g, e);
		return g
	});
	define("lscB", [], function() {
		return {
			OC: function() {
				var h = 3,
					f, e = 6,
					d = "",
					b;
				b = "document".toString();
				var c = 0;
				f = b.length;
				for(var a = 0; a < f; a++) c += b.charCodeAt(a);
				b = parseInt(c);
				if(0 < b)
					for(c = 0; 184 >= e + h - c; c += 3) f = c, f = parseInt("2844232422362353182342452312352492633183053182412392513042362492412532492362342352342462472452423042312312313182482393182292342362492382392362383182422532332342512492422422492342402770".substring(c, h - 1)) - parseInt("2844232422362353182342452312352492633183053182412392513042362492412532492362342352342462472452423042312312313182482393182292342362492382392362383182422532332342512492422422492342402770".substring(f, f + 2)) + 350 - parseInt("2844232422362353182342452312352492633183053182412392513042362492412532492362342352342462472452423042312312313182482393182292342362492382392362383182422532332342512492422422492342402770".substring(e, e + h - c)), d = unescape("%" + f.toString(16)) + d, h += 3, e += 3, b += f;
				return d
			}
		}
	});
	define("ASSERT", ["LoggerManager"], function(h) {
		var f = h.getLoggerProxy("weswit.test"),
			e = 0,
			d = {},
			b = {
				VOID: d,
				getFailures: function() {
					return e
				},
				compareArrays: function(b, a, d) {
					if(b.length != a.length) return this.Ob(), f.logError(h.resolve(486), b, a), !1;
					if(d)
						for(e = 0; e < b.length; e++) {
							if(b[e] != a[e]) return f.logError(h.resolve(489), b[e], a[e]), this.Ob(), !1
						} else {
							d = {};
							for(var e = 0; e < b.length; e++) d[b[e]] = 1;
							for(e = 0; e < a.length; e++)
								if(d[a[e]]) d[a[e]]++;
								else return f.logError(h.resolve(487), a[e]), this.Ob(), !1;
							for(e in d)
								if(1 == d[e]) return f.logError(h.resolve(488), d[e]), this.Ob(), !1
						}
					return !0
				},
				verifySuccess: function(b, a, d, e, f) {
					return this.di(b, a, d, e, !1, f)
				},
				verifyException: function(b, a, d) {
					return this.di(b, a, d, null, !0)
				},
				verifyNotNull: function(b) {
					return null === b ? (this.Ob(), f.logError(h.resolve(490), b), !1) : !0
				},
				verifyValue: function(b, a, d) {
					var e = !1;
					!0 === d ? e = b === a : d ? e = d(b, a) : isNaN(b) ? e = b == a : (d = b && b.charAt ? b.charAt(0) : null, e = a && a.charAt ? a.charAt(0) : null, e = "." == d || " " == d || "0" == d || "." == e || " " == e || "0" == e ? String(b) == String(a) : b == a);
					return e ? !0 : (this.Ob(), f.logError(h.resolve(491), b, a), !1)
				},
				verifyDiffValue: function(b, a, d) {
					return(d ? b === a : b == a) ? (this.Ob(), f.logError(h.resolve(492), b, a), !1) : !0
				},
				verifyOk: function(b) {
					return b ? !0 : (this.Ob(), f.logError(h.resolve(493)), !1)
				},
				verifyNotOk: function(b) {
					return b ? (this.Ob(), f.logError(h.resolve(494)), !1) : !0
				},
				fail: function() {
					f.logError(h.resolve(495));
					this.Ob();
					return !1
				},
				Ob: function() {
					e++
				},
				di: function(b, a, e, l, n, k) {
					var m = !1,
						p = null,
						q = null;
					try {
						p = e !== d ? b[a].apply(b, e) : b[a]()
					} catch(s) {
						m = !0, q = s
					}
					b = n ? "succes" : "failure";
					return n != m ? (this.Ob(), f.logError(h.resolve(496), b, "for", a, e, l, q), !1) : n || l === d ? !0 : this.verifyValue(p, l, k)
				}
			};
		b.getFailures = b.getFailures;
		b.fail = b.fail;
		b.verifyNotOk = b.verifyNotOk;
		b.verifyOk = b.verifyOk;
		b.verifyDiffValue = b.verifyDiffValue;
		b.verifyNotNull = b.verifyNotNull;
		b.verifyValue = b.verifyValue;
		b.verifyException = b.verifyException;
		b.verifySuccess = b.verifySuccess;
		b.compareArrays = b.compareArrays;
		return b
	});
	define("lscq", "LoggerManager lscG lscB Environment ASSERT lscA".split(" "), function(h, f, e, d, b, c) {
		var a = h.getLoggerProxy(c.Te),
			g = /^[a-z][a-z0-9-]+$/,
			l = /^((?:[a-z][a-z.0-9-]+).(?:[a-z][a-z-]+))(?![\w.])/,
			n = /^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))(?![d])/,
			k = /^[a-f0-9:]+$/;
		return {
			tC: function(a) {
				a = a.toLowerCase();
				var b = 0 == a.indexOf("http://") ? 7 : 0 == a.indexOf("https://") ? 8 : -1;
				if(-1 == b) return "The given server address has not a valid scheme";
				var c = a.lastIndexOf(":"),
					c = c > b ? c : a.length,
					d = this.Iq(a, a.indexOf("://"));
				if(null != d && isNaN(d.substring(1))) return "The given server address has not a valid port";
				d = a.indexOf("/", b);
				d = d < c ? d : c;
				if("[" == a.charAt(b)) {
					if(a = a.substring(b + 1, a.lastIndexOf("]")), !k.test(a)) return "The given server address is not a valid IPv6"
				} else if(a = a.substring(b, d), -1 < a.indexOf(".")) {
					if(!l.test(a) && !n.test(a)) return "The given server address is not a valid URL"
				} else if(!g.test(a)) return "The given server address is not a valid machine name";
				return !0
			},
			Iq: function(a, b) {
				var g = a.indexOf(":", b + 1);
				if(-1 >= g) return null;
				if(-1 < a.indexOf("]")) {
					g = a.indexOf("]:");
					if(-1 >= g) return null;
					g += 1
				} else if(g != a.lastIndexOf(":")) return null;
				var c = a.indexOf("/", b + 3);
				return -1 < c ? a.substring(g, c) : a.substring(g)
			},
			pv: function(a, b) {
				var g = this.Iq(a, a.indexOf("://"));
				if(g) {
					var c = b.indexOf("/");
					b = -1 >= c ? b + g : b.substring(0, c) + g + b.substring(c)
				}
				b = 0 == a.toLowerCase().indexOf("https://") ? "https://" + b : "http://" + b;
				"/" != b.substr(b.length - 1) && (b += "/");
				return b
			},
			hx: function(g, c, e, l, k, r, n, z, y, w, x) {
				x = x && d.isBrowserDocument() && !f.Pm() ? "LS_domain\x3d" + f.qc() + "\x26" : "";
				g = "LS_phase\x3d" + g + "\x26" + x + (z ? "LS_cause\x3d" + z + "\x26" : "");
				k || r ? (g += "LS_polling\x3dtrue\x26", z = w = 0, r && (w = Number(e.Fd), null == y || isNaN(y) || (w += y), z = e.lj), isNaN(w) || (g += "LS_polling_millis\x3d" + w + "\x26"), isNaN(z) || (g += "LS_idle_millis\x3d" + z + "\x26")) : (0 < e.Bf && (g += "LS_keepalive_millis\x3d" + e.Bf + "\x26"), w && (g += "LS_content_length\x3d" + e.Yl + "\x26"));
				if(k) return c = "", 0 < e.Tc && (c += "LS_requested_max_bandwidth\x3d" + e.Tc + "\x26"),
					null != l.mi && (c += "LS_adapter_set\x3d" + encodeURIComponent(l.mi) + "\x26"), null != l.Vk && (c += "LS_user\x3d" + encodeURIComponent(l.Vk) + "\x26"), e = "LS_op2\x3dcreate\x26" + g + "LS_cid\x3dpcYgxn8m8 feOojyA1S681m3g2.pz478mF4Dy\x26" + c, n && (e += "LS_old_session\x3d" + n + "\x26"), a.logDebug(h.resolve(69), e), null != l.Tj && (e += "LS_password\x3d" + encodeURIComponent(l.Tj) + "\x26"), e;
				b.verifyOk(c) || a.logError(h.resolve(67));
				l = "LS_session\x3d" + c + "\x26" + g;
				a.logDebug(h.resolve(68), l);
				return l
			},
			Iw: function(b, g) {
				var c = {
					LS_op: "destroy",
					LS_session: b
				};
				g && (c.LS_cause = g);
				a.logDebug(h.resolve(70));
				return c
			},
			Qw: function(b, g) {
				var c = {
					LS_op: "force_rebind"
				};
				b && (c.LS_cause = b);
				null == g || isNaN(g) || (c.LS_polling_millis = g);
				a.logDebug(h.resolve(71));
				return c
			},
			Xw: function(a, b, g) {
				b.LS_build = g;
				b.LS_phase = a;
				return b
			},
			Cw: function(a) {
				return {
					LS_op: "constrain",
					LS_requested_max_bandwidth: 0 < a.Tc ? a.Tc : 0
				}
			},
			jr: function(b, g, c) {
				b = g || ".js" == c || "" == c ? (b ? this.Bm() + "create_session" : "bind_session") + c : (b ? this.Bm() : "") + "STREAMING_IN_PROGRESS";
				a.logDebug(h.resolve(72), b);
				return b
			},
			Bm: V("")
		}
	});
	define("lscK", "IllegalArgumentException lscH Inheritance Environment Global lscq lscG".split(" "), function(h, f, e, d, b, c, a) {
		function g() {
			this.Lh = k;
			this.Ia = this.kt = this.jt = this.Tj = this.Vk = this.mi = null;
			this.tq = n;
			this.Wk = l;
			this._callSuperConstructor(g, arguments);
			this.Q = "lscK"
		}
		var l = {
				Lh: "serverAddress",
				mi: "adapterSet",
				Vk: "user",
				Tj: "password",
				jt: "serverInstanceAddress",
				kt: "serverSocketName",
				Ia: "sessionId"
			},
			l = a.getReverse(l),
			n = {
				Tj: !0
			},
			k = !d.isBrowser() || "http:" != location.protocol && "https:" != location.protocol ? null : location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "") + "/";
		g.prototype = {
			tt: function(a) {
				if(null === a) a = k;
				else {
					"/" != a.substr(a.length - 1) && (a += "/");
					var b = c.tC(a);
					if(!0 !== b) throw new h(b);
				}
				this.r("serverAddress", a)
			},
			lr: L("Lh"),
			mt: function(a) {
				this.r("adapterSet", a)
			},
			qw: L("mi"),
			DB: function(a) {
				this.r("user", a)
			},
			Fx: L("Vk"),
			lB: function(a) {
				this.r("password", a)
			},
			qx: L("jt"),
			rx: L("kt"),
			pe: L("Ia")
		};
		g.prototype.setServerAddress = g.prototype.tt;
		g.prototype.getServerAddress = g.prototype.lr;
		g.prototype.setAdapterSet = g.prototype.mt;
		g.prototype.getAdapterSet = g.prototype.qw;
		g.prototype.setUser = g.prototype.DB;
		g.prototype.getUser = g.prototype.Fx;
		g.prototype.setPassword = g.prototype.lB;
		g.prototype.getServerInstanceAddress = g.prototype.qx;
		g.prototype.getServerSocketName = g.prototype.rx;
		g.prototype.getSessionId = g.prototype.pe;
		e(g, f);
		return g
	});
	define("lscAQ", ["LoggerManager", "EnvironmentStatus", "ASSERT", "lscA"], function(h, f, e, d) {
		function b(a) {
			this.v = null;
			this.qb = !1;
			this.q = null;
			this.c = a;
			f.addUnloadHandler(this)
		}
		var c = h.getLoggerProxy(d.Ra);
		b.prototype = {
			vc: function() {
				c.logInfo(h.resolve(73));
				this.qb = !0;
				this.c.PA()
			},
			Wc: function() {
				c.logInfo(h.resolve(74));
				this.qb = !1;
				this.c.io()
			},
			ja: function(a) {
				return a == this.v
			},
			uk: function(a) {
				e.verifyNotOk(this.qb);
				this.v = a;
				this.vc()
			},
			lt: function(a) {
				this.v = a;
				this.qb && this.Wc()
			},
			Gk: function(a) {
				this.c.Lg(a)
			},
			xe: function(a) {
				this.c.Aq(a);
				this.Wc()
			},
			unloadEvent: function() {
				this.un()
			},
			ka: function() {
				f.removeUnloadHandler(this)
			}
		};
		b.prototype.unloadEvent = b.prototype.unloadEvent;
		return b
	});
	define("lscAV", "lscAQ Inheritance LoggerManager lscG Executor ASSERT lscA Helpers".split(" "), function(h, f, e, d, b, c, a, g) {
		function l(a, b) {
			this._callSuperConstructor(l, [a]);
			this.Xk = 2E3;
			this.ea();
			this.Sn = b;
			this.od = null
		}
		var n = {
				Uy: "newPage",
				Rv: "engineConfiguration",
				Bv: "deletePage",
				bC: "tableRemove",
				jd: "updateSubscriptionParams",
				jd: "updateSubscriptionParams",
				Oj: "onTable",
				cC: "tableRequestSubmission",
				yi: "callConnect",
				zi: "callDisconnect",
				IA: "sendMex",
				Jd: "sendLog"
			},
			n = d.getReverse(n),
			k, m;
		for(m in {
				xe: !0
			}) k = m;
		var p = e.getLoggerProxy(a.Ra);
		l.prototype = {
			toString: function() {
				return ["[|RemoteEngineHandler", this.q, this.Yk, this.re, this.Va, this.qb, this.v, this.od, this.Vm, "]"].join("|")
			},
			ea: function(a) {
				this.v = null;
				this.od = a ? this.od + 1 : g.randomG() + 1;
				this.re = !1;
				this.Va = null;
				this.qb = this.Yk = !1;
				this.q = -1;
				this.ub = null;
				this.Vm = !1
			},
			Qm: L("re"),
			Ei: function() {
				var a = !1;
				try {
					var b = this.tf();
					b && (a = b.hb().Di(this.q))
				} catch(g) {
					p, logInfo(e.resolve(76), g), a = !1
				}
				a || this.xe();
				return a
			},
			Di: function(a, b) {
				p.logDebug(e.resolve(77), a, this.od);
				return b ? (p.logDebug(e.resolve(78), b, this.v), a == this.od && this.ja(b)) : a == this.od
			},
			Ie: function(a, b) {
				p.logDebug(e.resolve(79), a, this);
				return this.Id(a, b, !1, !1)
			},
			ra: function(a, b) {
				p.logDebug(e.resolve(80), a, this);
				return this.Id(a, b, !0, !1)
			},
			eo: function(a, b) {
				p.logDebug(e.resolve(81), a, this);
				return this.Id(a, b, !1, !0)
			},
			eg: function(a, b) {
				p.logDebug(e.resolve(82), a, this);
				return this.Id(a, b, !0, !0)
			},
			hb: function() {
				var a = this.tf();
				return a ? a.hb() : null
			},
			Id: function(a, b, g, c) {
				if(!this.re) return !1;
				p.logDebug(e.resolve(83), a);
				a = n[a];
				try {
					var d = this.hb();
					if(!d) return !1;
					(c ? d.Lm(this.q) : d.Rs).T(a, this.q, b, g ? this.v : null)
				} catch(l) {
					return this.aw(l), !1
				}
				return !0
			},
			Bn: function(a, g, c, d, e, l, k, f) {
				this.re = !0;
				this.Yk = !1;
				this.q = a;
				this.v = g;
				this.Va = k;
				this.Xk = 2E3;
				this.qb = f;
				this.ub.yt(b.packTask(this.pz, this));
				this.c.ls(!0, !1, d, e, l);
				this.c.Lg(c);
				this.qb && this.vc()
			},
			kn: function() {
				this.ub.rd();
				b.addTimedTask(this.ub.rd, 1E3, this.ub)
			},
			pz: function(a) {
				a ? this.Ei() : this.xe()
			},
			xe: function(a) {
				this.re && this.ub && (this.ub.zt(), this.ub.Zb(), this.ea(!0), this._callSuperMethod(l, k, [a]))
			},
			aw: function() {
				this.Vm || p.logDebug(e.resolve(84));
				this.Vm = !0;
				b.addTimedTask(this.ub.rd, 0, this.ub)
			},
			rz: function(a, g) {
				if(this.re || this.Yk) p.logError(e.resolve(75)), c.fail();
				this.Yk = !0;
				this.od++;
				try {
					this.ub = a, this.hb().Rs.T(n.newPage, -1, {
						Xo: window,
						Wj: this.od,
						Sn: this.Sn
					})
				} catch(d) {
					return this.ea(!0), !1
				}
				b.addTimedTask(this.sz, this.Xk, this, [g]);
				this.Xk += 500;
				return !0
			},
			sz: function(a) {
				b.executeTask(a)
			},
			ft: function(a, b, g) {
				this.eo("engineConfiguration", {
					wp: a,
					su: g,
					mA: b
				})
			},
			un: function() {
				this.re && this.q && this.Ie("deletePage", this.q)
			},
			Gn: function(a, b) {
				a ? this.eg("tableRemove", {
					G: b
				}) : this.eg("tableRemove", {
					Le: b,
					mb: this.q
				})
			},
			In: function(a, b, g) {
				a ? this.eg("updateSubscriptionParams", d.ca({
					G: b
				}, g)) : this.eg("updateSubscriptionParams", d.ca({
					Le: b,
					mb: this.q
				}, g))
			},
			Oj: function(a, b, g, c, e) {
				this.eg("onTable", d.ca({
					Bb: a,
					Le: b,
					Fb: g,
					mb: this.q,
					Nk: c
				}, e))
			},
			As: function(a, b) {
				this.eg("tableRequestSubmission", {
					mb: this.q,
					G: a,
					kf: b
				})
			},
			yi: function() {
				this.eo("callConnect")
			},
			zi: function() {
				this.eo("callDisconnect")
			},
			ah: function(a, b, g, c) {
				this.ra("sendMex", {
					Ab: a,
					fg: b,
					Bd: g,
					Xe: c
				})
			},
			Rq: function(a) {
				this.Ie("sendLog", a)
			},
			tf: function() {
				return this.ub ? this.ub.th : null
			}
		};
		f(l, h);
		return l
	});
	define("lscAT", ["lscAQ", "Inheritance", "ASSERT", "Executor"], function(h, f, e, d) {
		function b(c, a) {
			this._callSuperConstructor(b, [c]);
			this.oa = a;
			this.q = this.oa.hb().xu(c);
			this.v = this.oa.hb().v
		}
		b.prototype = {
			Qm: V(!0),
			bound: function(b) {
				var a = this.oa;
				this.c.ls(!1, b, a.ta, a.ha, a.M);
				this.c.Lg(a.yb());
				a.ue() && this.vc()
			},
			Ei: function() {
				return this.oa.hb().Di(this.q)
			},
			kn: E(),
			un: function() {
				this.oa.hb().Ki(this.q)
			},
			ft: function(b, a, g) {
				b = "lscK" == b ? this.oa.ta : "lscL" == b ? this.oa.ha : this.oa.M;
				d.addTimedTask(b.P, 0, b, [a, g])
			},
			Gn: function(b, a) {
				e.verifyOk(b);
				d.addTimedTask(this.Sz, 0, this, [this.v, b, a])
			},
			Sz: function(b, a, g) {
				var d = this.oa.hb();
				d && d.ja(b) && (a ? d.Li(g) : d.lq(this.q, g))
			},
			In: function(b, a, g) {
				d.addTimedTask(this.Tz, 0, this, [this.v, b, a, g])
			},
			Tz: function(b, a, g, d) {
				var e = this.oa.hb();
				e && e.ja(b) && (a ? e.jd(g, d) : e.Sk(this.q, g, d))
			},
			Oj: function(b, a, g, e, f) {
				d.addTimedTask(this.Rz, 0, this, [this.v, b, a, g, e, f])
			},
			Rz: function(b, a, g, d, e, k) {
				var f = this.oa.hb();
				f && f.ja(b) && f.qr(a, g, d, this.q, e, k)
			},
			As: function(b, a) {
				this.oa.hb().Jk(this.q, b, a)
			},
			yi: function() {
				this.oa.Oi()
			},
			zi: function() {
				this.oa.sq()
			},
			ah: function(b, a, g, d) {
				this.oa.ok(b, a, g, d)
			},
			Rq: function(b) {
				this.oa.Jd(b)
			},
			Fy: function() {
				this.oa.Si()
			},
			tf: L("oa")
		};
		f(b, h);
		return b
	});
	define("lscAU", ["ASSERT", "Executor", "List"], function(h, f, e) {
		function d(b) {
			this.Df = -1;
			this.zh = {};
			this.Vj = {};
			this.Ah = {};
			this.Uj = 0;
			this.j = b;
			this.Eh = new e
		}
		d.prototype = {
			Eo: G("j"),
			$w: function(b, c) {
				this.Df++;
				this.zh[this.Df] = c;
				this.Vj[this.Df] = b;
				this.Ah[this.Df] = !1;
				this.Uj++;
				var a = {};
				a.mb = this.j.q;
				a.Oa = this.Df;
				return a
			},
			wb: function(b) {
				return this.zh[b]
			},
			ih: function(b) {
				return this.Vj[b]
			},
			wC: function(b) {
				return this.Ah[b]
			},
			iv: function() {
				this.mv();
				var b = [],
					c;
				for(c in this.zh) b.push(c);
				b.sort(function(a, b) {
					return a - b
				});
				for(c = 0; c < b.length; c++) this.Ny(b[c]);
				h.verifyValue(this.Uj, 0);
				this.Df = -1;
				this.zh = {};
				this.Vj = {};
				this.Ah = {};
				this.Uj = 0
			},
			clean: function(b) {
				delete this.zh[b];
				delete this.Vj[b];
				delete this.Ah[b];
				this.Uj--
			},
			Bj: function(b) {
				this.wb(b) && (this.Ah[b] = !0)
			},
			Uv: function(b, c, a, g) {
				this.Eh.add({
					Ab: b,
					fg: c,
					Bd: a,
					timeout: g
				})
			},
			mv: function() {
				var b = this;
				this.Eh.forEach(function(c) {
					b.fireEvent("onAbort", c.Bd, [c.Ab, !1])
				});
				this.Eh.clean()
			},
			Jx: function() {
				var b = this;
				this.Eh.forEach(function(c) {
					b.ah(c.Ab, c.fg, c.Bd, c.timeout)
				});
				this.Eh.clean()
			},
			ah: function(b, c, a, g) {
				var d = null;
				a && (d = this.$w(b, a));
				this.j.ah(b, c, d, g)
			},
			fireEvent: function(b, c, a) {
				c && c[b] && f.addTimedTask(c[b], 0, c, a)
			},
			wj: function(b) {
				this.fireEvent("onProcessed", this.wb(b), [this.ih(b)]);
				this.clean(b)
			},
			Aj: function(b) {
				this.fireEvent("onError", this.wb(b), [this.ih(b)]);
				this.clean(b)
			},
			yj: function(b, c, a) {
				this.fireEvent("onDeny", this.wb(b), [this.ih(b), c, a]);
				this.clean(b)
			},
			zj: function(b) {
				this.fireEvent("onDiscarded", this.wb(b), [this.ih(b)]);
				this.clean(b)
			},
			Ny: function(b) {
				this.fireEvent("onAbort", this.wb(b), [this.ih(b), this.wC(b)]);
				this.clean(b)
			}
		};
		return d
	});
	define("lscAe", ["Executor", "LoggerManager", "ASSERT", "lscA"], function(h, f, e, d) {
		function b(a) {
			this.Wy = 0;
			this.yc = {};
			this.Vh = {};
			this.pw = 1;
			this.Ga = null;
			this.b = a;
			this.fq = 4E3
		}
		var c = f.getLoggerProxy(d.zg),
			a = f.getLoggerProxy(d.Ra);
		b.prototype = {
			toString: V("[SubscriptionsHandler]"),
			Eo: G("Ga"),
			xd: function(a) {
				return this.yc[this.Vh[a]] || null
			},
			ni: function(a) {
				var b = ++this.Wy;
				c.logInfo(f.resolve(87), a);
				a.kz(b, ++this.pw, this);
				this.yc[b] = a;
				this.Ga && this.Ga.qb && this.On(a)
			},
			gk: function(a) {
				var b = a.fc,
					d = a.Me;
				c.logInfo(f.resolve(88), a);
				if(a.Zm() || a.te()) e.verifyOk(this.Ga.Qm()), d ? this.Ga.Gn(!0, d) : this.Ga.Gn(!1, b);
				a.Gz();
				d && delete this.Vh[d];
				delete this.yc[b];
				return a
			},
			jd: function(a, b) {
				if(e.verifyOk(a.ph() && this.Ga && this.Ga.Qm())) {
					var d = a.Me;
					d ? this.Ga.In(!0, d, b) : this.Ga.In(!1, a.fc, b)
				} else c.logError(f.resolve(85), a)
			},
			On: function(b, d, n) {
				if(d) {
					if(!b.an() || !this.Ga.ja(d) || !b.Hl(n)) return
				} else b.ky() || (c.logError(f.resolve(86)), e.fail()), b.Nz();
				n = b.Fb;
				h.addTimedTask(this.On, this.fq, this, [b, this.Ga.v,
					n
				]);
				a.logDebug(f.resolve(89));
				this.Ga.Oj(b.Bb, b.fc, n, b.Nk, b.ik)
			},
			Pj: function(b, c, d, e) {
				var h = this.yc[b];
				h && (h.an() && h.Sp(d) && h.Hl(e)) && (a.logDebug(f.resolve(90)), h.Pj(c), this.Vh[c] = b, this.Ct(h))
			},
			Ct: function(b, c, d, e, m, p) {
				if(b.Zm()) {
					if(c) {
						if(!this.Ga.ja(c) || !b.Sp(e) || !b.Hl(m)) return !1;
						p++
					} else p = 1;
					c = (d ? 2 * d : this.fq) + this.b.Fd;
					a.logDebug(f.resolve(91));
					d = h.packTask(this.Ct, this, [b, this.Ga.v, c, b.Bb, b.Fb, p]);
					b.Iu(d, c);
					this.Ga.As(b.Me, p)
				}
			},
			Kx: function() {
				c.logDebug(f.resolve(92));
				for(var a in this.yc) this.On(this.yc[a])
			},
			eA: function(a) {
				e.verifyNotOk(a.iy());
				c.logDebug(f.resolve(93), a);
				delete this.Vh[a.Me];
				a.Dz();
				a.Bt && delete this.yc[a.fc]
			},
			dA: function() {
				c.logDebug(f.resolve(94));
				for(var a in this.yc) this.eA(this.yc[a]);
				this.Vh = {}
			},
			Rk: function(a, b) {
				var c = this.xd(a[0]);
				if(!c) return !0;
				c.update(a, b, !1)
			},
			Dd: function(a, b, c) {
				a = this.xd(a);
				if(!a) return !1;
				a.Ky(b, c)
			},
			Yb: function(a, b) {
				var c = this.xd(a);
				if(!c) return !1;
				c.rm(b)
			},
			Xb: function(a, b) {
				var c = this.xd(a);
				if(!c) return !1;
				c.Nl(b)
			},
			Bq: function(a, b, c) {
				(c = this.xd(c)) && c.OA(a, b)
			},
			Dt: function(a, b, c, d, e) {
				(a = this.xd(a)) && a.Lz(b, c, d, e)
			},
			Ft: function(a) {
				(a = this.xd(a)) && a.Pz()
			}
		};
		return b
	});
	define("lscD", ["LoggerManager", "Executor", "lscA"], function(h, f, e) {
		function d(a, b, c, d) {
			this.nl = a;
			this.xq = b;
			this.De = c;
			this.Hs = d
		}

		function b(a, g, c) {
			this.Ig = !0 === c;
			this.xv = a;
			this.Dq = g;
			this.N = this.Ig ? [] : {
				Zf: 0,
				tg: 0,
				ke: 0
			};
			this.Ig || (this.fc = b.next++, b.Zj[this.fc] = this)
		}
		var c = h.getLoggerProxy(e.Ra);
		b.Zj = {};
		b.next = 0;
		b.Ua = function() {
			for(var a in this.Zj) this.Zj[a].Ua()
		};
		b.remove = function(a) {
			delete this.Zj[a.fc]
		};
		b.prototype = {
			T: function(a, b, d, e) {
				c.logDebug(h.resolve(97), a);
				this.Ig ? f.addTimedTask(this.qs, 0, this, [a, b, d, e]) : this.qs(a, b, d, e)
			},
			qs: function(a, b, c, e) {
				if(this.Ig) this.N.push(new d(a, b, c, e)), this.Ua();
				else {
					this.Bh();
					this.N[this.N.tg] = new d(a, b, c, e);
					this.N.tg++;
					try {
						f.addTimedTask(this.Ua, 0, this)
					} catch(k) {}
					this.clean()
				}
			},
			clean: function() {
				for(var a = this.N.Zf; this.N.ke < a; this.N.ke++) delete this.N[this.N.ke]
			},
			Bh: function() {
				this.N.ke == this.N.Zf && this.N.ke == this.N.tg && (this.N.tg = 0, this.N.Zf = 0, this.N.ke = 0, this.N = {
					Zf: 0,
					tg: 0,
					ke: 0
				})
			},
			Ua: function() {
				if(this.Ig)
					for(; 0 < this.N.length;) {
						var a = this.N.shift();
						this.handleEvent(a)
					} else {
						for(var b = this.N.Zf; b < this.N.tg;) a = this.N[b], this.handleEvent(a), b++;
						this.N.Zf = b
					}
			},
			handleEvent: function(a) {
				try {
					if(this.xv.Di(a.xq, a.Hs))
						if(this.Dq[a.nl]) this.Dq[a.nl](a.De);
						else c.logError(h.resolve(95))
				} catch(b) {
					c.logError(h.resolve(96), b)
				}
			}
		};
		d.prototype.toString = function() {
			return ["[|CrossPageProxy.Event", this.nl, this.xq, this.De, this.Hs, "]"].join("|")
		};
		return b
	});
	define("lsco", [], function() {
		function h(f) {
			this.Pg = f;
			this.Ne = {};
			this.Oe = {}
		}
		h.prototype = {
			ni: function(f, e, d, b, c) {
				d = {
					lb: f,
					ku: d,
					Fb: b,
					Bb: c,
					id: e
				};
				this.Ne[e] = d;
				this.Oe[f] = d
			},
			gk: function(f) {
				this.Oe[f] && (delete this.Ne[this.Oe[f].id], delete this.Oe[f])
			},
			rA: function(f) {
				this.Pg.Li(this.Mm(f))
			},
			Sk: function(f, e) {
				this.Pg.jd(this.Mm(f), e)
			},
			ka: E(),
			zx: function(f) {
				return this.Oe[f] ? this.Oe[f].ku : null
			},
			Mm: function(f) {
				return this.Ne[f] ? this.Ne[f].lb : null
			},
			ay: function(f, e, d) {
				return this.Ne[f] && this.Ne[f].Fb == e && this.Ne[f].Bb == d
			},
			$m: function(f) {
				return(f = this.jh().h.xd(f)) ? f.te() : !1
			}
		};
		return h
	});
	define("lscp", "lsco Inheritance lscF lscD lscL lscK lscJ LoggerManager lscA lscG".split(" "), function(h, f, e, d, b, c, a, g, l, n) {
		function k(a, b, g, c, l) {
			this._callSuperConstructor(k, [g]);
			this.Nn = new e(a);
			this.Ip = b;
			this.Ls = l;
			this.pn = null;
			this.Ht = new d(this.Pg, c, !1)
		}
		var m = {
				$m: "isTableSubscribed",
				$z: "pageCallback",
				YB: "tableCallback",
				Au: "addRequestSent",
				ZB: "tableError",
				dC: "tableSubscription",
				eC: "tableUnsubscription",
				Rk: "updatePage",
				$B: "tableOverflow",
				rm: "endOfSnapshot",
				Nl: "clearSnapshot",
				zj: "messageDiscarded",
				yj: "messageDenied",
				Aj: "messageError",
				wj: "messageComplete",
				Bj: "messageOnNetwork",
				uk: "sessionReadyNotification",
				io: "sessionEnd",
				Gk: "statusChange",
				sk: "serverError",
				rv: "configurationChange",
				Tv: "engineDying",
				Sv: "engineDeath"
			},
			m = n.getReverse(m),
			p = g.getLoggerProxy(l.Ra);
		k.bu = !1;
		k.prototype = {
			toString: function() {
				return ["[|RemotePushPageHandler", this.Ls, this.Ip, "]"].join("|")
			},
			ka: function() {
				p.logInfo(g.resolve(98), this);
				d.remove(this.Ht)
			},
			Lm: L("Ht"),
			Ie: function(a, b) {
				p.logDebug(g.resolve(100), a, this);
				this.Id(a, b, !1)
			},
			ra: function(a, b, c) {
				p.logDebug(g.resolve(101), a, this);
				this.Id(a, b, c || !0)
			},
			it: function(a, b, c) {
				p.logDebug(g.resolve(102), a, this);
				this.Id(a, b, c - 1)
			},
			Id: function(a, b, c) {
				if(!k.bu) {
					a = m[a];
					c = !0 === c ? this.Pg.v : !1 === c ? null : c;
					try {
						this.jh().Lk.T(a, this.Ip, b, c)
					} catch(d) {
						p.logInfo(g.resolve(99), d), this.Pg.Ki(this.pn)
					}
				}
			},
			jh: function() {
				try {
					return this.Nn.Ha.Lightstreamer["P" + this.Ls].lsPage
				} catch(a) {
					return p.logDebug(g.resolve(103), a), null
				}
			},
			qh: function() {
				try {
					this.Nn.Xh();
					if(!this.Nn.Ha) return p.logDebug(g.resolve(104), this), !1;
					var a = this.jh();
					if(!a) return p.logDebug(g.resolve(105), this), !1;
					var b = a.j;
					if(!b) return p.logDebug(g.resolve(106), this), !1;
					var c = b.q;
					return null != c && c != this.pn ? (p.logDebug(g.resolve(107), this), !1) : !0
				} catch(d) {
					return p.logDebug(g.resolve(108), d, this), !1
				}
			},
			$m: function(a) {
				try {
					return this._callSuperMethod(k, m.isTableSubscribed, [a])
				} catch(b) {
					return p.logDebug(g.resolve(109), b), !1
				}
			},
			Bn: function(g, d, e) {
				this.pn = g;
				this.Ie("pageCallback", {
					Xo: g,
					v: d,
					Va: e.fh(),
					M: new a(e.M),
					ha: new b(e.ha),
					ta: new c(e.ta),
					status: e.yb(),
					qb: e.ue()
				})
			},
			ys: function(a, b, g, c) {
				this.ra("tableCallback", {
					Bb: a,
					Fb: b,
					Le: g,
					G: c
				})
			},
			fs: function(a) {
				this.ra("addRequestSent", {
					G: a
				})
			},
			Tf: function(a, b, g) {
				this.ra("tableError", {
					wm: a,
					Ab: b,
					G: g
				})
			},
			Bs: function(a, b, g, c, d) {
				this.ra("tableSubscription", {
					G: a,
					Ey: b,
					Uu: g,
					Dy: c,
					fw: d
				})
			},
			Cs: function(a) {
				this.ra("tableUnsubscription", {
					G: a
				})
			},
			Ds: function(a, b) {
				this.ra("updatePage", {
					Hu: a,
					IB: b
				})
			},
			zs: function(a, b, g) {
				this.ra("tableOverflow", {
					G: a,
					item: b,
					Ly: g
				})
			},
			Yb: function(a, b) {
				this.ra("endOfSnapshot", {
					G: a,
					item: b
				})
			},
			Xb: function(a, b) {
				this.ra("clearSnapshot", {
					G: a,
					item: b
				})
			},
			Ae: function(a) {
				this.ra("messageDiscarded", {
					Oa: a
				})
			},
			us: function(a, b, g) {
				this.ra("messageDenied", {
					Oa: a,
					ml: b,
					Ab: g
				})
			},
			Qf: function(a, b, g) {
				this.ra("messageError", {
					Oa: a,
					ml: b,
					Ab: g
				})
			},
			ts: function(a) {
				this.ra("messageComplete", {
					Oa: a
				})
			},
			vs: function(a) {
				this.ra("messageOnNetwork", {
					Oa: a
				})
			},
			vc: function(a) {
				this.it("sessionReadyNotification", {
					a: a
				}, a)
			},
			Wc: function(a) {
				this.it("sessionEnd", {
					a: a
				}, a)
			},
			onStatusChange: function(a) {
				this.ra("statusChange", {
					status: a
				})
			},
			Rf: function(a, b) {
				this.ra("serverError", {
					wm: a,
					Ab: b
				})
			},
			is: function(a, b, g) {
				this.Ie("configurationChange", {
					es: a,
					lA: b,
					sC: g
				})
			},
			ns: function() {
				this.Ie("engineDying")
			},
			ms: function(a) {
				this.Ie("engineDeath", {
					UB: a
				})
			}
		};
		f(k, h);
		return k
	});
	define("lscAf", ["lscA"], function(h) {
		return function(f, e) {
			var d = e ? f : [];
			d.Jc = [];
			e || (d[0] = parseInt(f[0]), d[1] = parseInt(f[1]));
			for(var b = 2, c = f.length; b < c; b++) f[b] ? -1 == f[b].length ? d[b] = h.Ag : (e || (d[b] = f[b].toString()), d.Jc.push(b - 1)) : (e || (d[b] = "" === f[b] ? "" : null), d.Jc.push(b - 1));
			return d
		}
	});
	define("lsck", ["lsco", "Inheritance", "lscAf"], function(h, f, e) {
		function d(b, c) {
			this._callSuperConstructor(d, [b]);
			this.c = c
		}
		d.prototype = {
			jh: L("c"),
			qh: V(!0),
			ys: function(b, c, a, g) {
				this.c.h.Pj(a, g, b, c)
			},
			fs: function(b) {
				this.c.h.Ft(b)
			},
			Tf: function(b, c, a) {
				this.c.h.Bq(b, c, a)
			},
			Bs: function(b, c, a, g, d) {
				this.c.h.Dt(b, c, a, g, d)
			},
			Cs: E(),
			Ds: function(b, c) {
				this.c.h.Rk(e(b, !0), c)
			},
			zs: function(b, c, a) {
				this.c.h.Dd(b, c, a)
			},
			Yb: function(b, c) {
				this.c.h.Yb(b, c)
			},
			Xb: function(b, c) {
				this.c.h.Xb(b, c)
			},
			Ae: function(b) {
				this.c.p.zj(b)
			},
			us: function(b, c, a) {
				this.c.p.yj(b, c, a)
			},
			Qf: function(b, c, a) {
				this.c.p.Aj(b, c, a)
			},
			ts: function(b) {
				this.c.p.wj(b)
			},
			vs: function(b) {
				this.c.p.Bj(b)
			},
			vc: function(b) {
				this.c.j.uk(b)
			},
			Wc: function(b) {
				this.c.j.lt(b)
			},
			onStatusChange: function(b) {
				this.c.j.Gk(b)
			},
			Rf: function(b, c) {
				this.c.sk(b, c)
			},
			is: function(b, c, a) {
				("lscK" == b ? this.c.ta : "lscL" == b ? this.c.ha : this.c.M).P(c, a)
			},
			ns: function() {
				this.c.j.kn()
			},
			ms: function(b) {
				this.c.j.xe(b)
			}
		};
		f(d, h);
		return d
	});
	define("lscg", ["lscG", "LoggerManager", "lscA"], function(h, f, e) {
		function d(a) {
			return null == a ? null : a.toString()
		}

		function b(a) {
			var b = {},
				c;
			for(c in a) 0 === c.indexOf("LS_") && (b[c] = d(a[c]));
			return b
		}

		function c(a, b) {
			this.Z = a;
			this.Gd = b
		}
		var a = f.getLoggerProxy(e.Ra);
		c.prototype = {
			toString: V("[Master EventBridge]"),
			Uy: function(b) {
				a.logDebug(f.resolve(110), this);
				this.Gd.yu(b.Xo, parseInt(b.Wj), parseInt(b.Sn))
			},
			Oj: function(g) {
				a.logDebug(f.resolve(111), this);
				this.Gd.qr(parseInt(g.Bb), d(g.Le), parseInt(g.Fb), parseInt(g.mb), parseInt(g.Nk), b(g))
			},
			cC: function(b) {
				a.logDebug(f.resolve(112), this);
				this.Gd.Jk(parseInt(b.mb), parseInt(b.G), parseInt(b.kf))
			},
			bC: function(b) {
				a.logDebug(f.resolve(113), this);
				b.G ? this.Gd.Li(parseInt(b.G)) : this.Gd.lq(parseInt(b.mb), d(b.Le))
			},
			jd: function(g) {
				a.logDebug(f.resolve(114), this);
				g.G ? this.Gd.jd(parseInt(g.G), b(g)) : this.Gd.Sk(parseInt(g.mb), d(g.Le), b(g))
			},
			Bv: function(b) {
				a.logDebug(f.resolve(115), this);
				this.Gd.Ki(parseInt(b))
			},
			Jd: function(c) {
				a.logDebug(f.resolve(116), this);
				this.Z.Jd(b(c))
			},
			IA: function(b) {
				a.logDebug(f.resolve(117), this);
				this.Z.ok(d(b.Ab), h.ef(b.fg), b.Bd, h.ef(b.Xe))
			},
			Rv: function(b) {
				a.logDebug(f.resolve(118), this);
				("lscK" == b.wp ? this.Z.ta : "lscL" == b.wp ? this.Z.ha : this.Z.M).P(d(b.mA), b.su)
			},
			yi: function() {
				a.logDebug(f.resolve(119), this);
				this.Z.Oi()
			},
			zi: function() {
				a.logDebug(f.resolve(120), this);
				this.Z.sq()
			}
		};
		return c
	});
	define("lscQ", [], function() {
		function h(f) {
			this.Xs = f;
			this.pk = !0;
			this.Xe = 100
		}
		h.prototype = {
			Bx: function() {
				var f = this.Xe;
				this.Xe += 5E3;
				return f
			},
			toString: function() {
				return ["[|DeleteStatus", this.pk, this.Xs, this.Xe, "]"].join("|")
			}
		};
		return h
	});
	define("lscW", ["Executor"], function(h) {
		function f(e, d) {
			this.cf = e;
			this.Lt = this.Nw ? this.cf.Yi : d ? 2 * d : 4E3
		}
		f.prototype = {
			Cd: function(e) {
				e ? this.he() : h.addTimedTask(this.Ed, this.Lt + Number(this.cf.Fd), this)
			},
			Ed: function() {
				this.verifySuccess() || this.he()
			}
		};
		return f
	});
	define("lscV", ["Inheritance", "lscW", "ASSERT"], function(h, f, e) {
		function d(b, c, a, g, e, f) {
			this._callSuperConstructor(d, [b, f]);
			this.G = c;
			this.Wj = a;
			this.Ce = g;
			this.Yu = e
		}
		d.prototype = {
			verifySuccess: function() {
				return !this.Ce.xy(this.G, this.Wj)
			},
			he: function() {
				this.Ce.jd(this.G, this.Yu, this.Lt)
			},
			Jj: function() {
				e.fail();
				this.Sf(this.G, this.Wj)
			}
		};
		h(d, f);
		return d
	});
	define("lscn", "lscD EnvironmentStatus lscp lsck Executor lscG LoggerManager ASSERT lscg lscQ lscV lscA Helpers".split(" "), function(h, f, e, d, b, c, a, g, l, n, k, m, p) {
		function q(a) {
			this.u = {};
			this.Xr = 1;
			this.Mk = {};
			this.Xy = 1;
			this.Ys = p.randomG();
			this.qk = {};
			this.ge = {};
			this.Et = 0;
			this.Ee = {};
			this.Z = a;
			this.v = p.randomG(100) + 1;
			this.Rs = new h(this, new l(this.Z, this), !0);
			this.jv = b.addRepetitiveTask(this.kv, 5E3, this);
			f.addBeforeUnloadHandler(this);
			f.addUnloadHandler(this)
		}
		var s = a.getLoggerProxy(m.Ra);
		q.prototype = {
			toString: function() {
				return ["[|PushPageCollectionHandler", this.v, "]"].join("|")
			},
			Di: function(a, b) {
				return -1 == a ? !0 : this.wd(a) ? b ? this.ja(b) : !0 : !1
			},
			ja: function(a) {
				return a == this.v
			},
			wd: function(b) {
				return this.u[b] ? this.u[b] : (s.logDebug(a.resolve(125)), null)
			},
			Lm: function(a) {
				return(a = this.wd(a)) ? a.Lm() : null
			},
			Rc: function(b) {
				b = this.Mk[b];
				return "undefined" == typeof b ? (s.logDebug(a.resolve(126)), null) : this.wd(b)
			},
			yu: function(b, c, g) {
				var d = this.Xr++,
					k = new l(this.Z, this);
				b = new e(b, c, this, k, g);
				this.u[d] = b;
				s.logDebug(a.resolve(127), this);
				b.Bn(d, this.v, this.Z)
			},
			xu: function(b) {
				var c = this.Xr++;
				b = new d(this, b);
				this.u[c] = b;
				s.logDebug(a.resolve(128), this);
				return c
			},
			lq: function(b, c) {
				s.logDebug(a.resolve(129), this);
				b && this.u[b] && this.u[b].rA(c)
			},
			xr: function(c) {
				delete this.Mk[c];
				var g;
				if((g = this.ge[c]) && g.pk) {
					var d = g.Bx();
					g.pk = !1;
					5E3 < d && this.Rp(0);
					s.logDebug(a.resolve(130));
					b.addTimedTask(this.gA, d, this, [c, g.Xs])
				}
			},
			Rp: function(b) {
				var c = this.Z.cd;
				c && c.fx(this.Z.f.xb()) > b && s.logWarn(a.resolve(124))
			},
			Li: function(b) {
				s.logDebug(a.resolve(131), this);
				var c = this.Mk[b];
				c && this.u[c] ? this.u[c].gk(b) : (s.logError(a.resolve(121), this), g.fail());
				this.xr(b)
			},
			Sk: function(b, c, g) {
				s.logDebug(a.resolve(132), this, g);
				b && this.u[b] && this.u[b].Sk(c, g)
			},
			jd: function(b, g, d) {
				s.logDebug(a.resolve(133), this, g);
				var e = ++this.Et,
					l = c.ca({
						LS_table: b,
						LS_op: "reconf",
						LS_win_phase: e
					}, g);
				this.Ee[b] = e;
				g = new k(this.Z.ha, b, e, this, g, d);
				this.Z.f.KA(b, l, g)
			},
			Sf: function(a, b) {
				this.Ee[a] == b && delete this.Ee[a]
			},
			xy: function(a, b) {
				return this.Ee[a] && this.Ee[a] == b ? !0 : !1
			},
			Wp: function(a) {
				delete this.ge[a];
				delete this.qk[a];
				delete this.Ee[a]
			},
			Up: function() {
				this.ge = {};
				this.qk = {};
				this.Et = 0;
				this.Ee = {}
			},
			Ki: function(b) {
				s.logDebug(a.resolve(134), this, b);
				if(this.u[b]) {
					var c = this.u[b].Oe,
						g;
					for(g in c) this.Li(g);
					this.u[b].ka();
					delete this.u[b]
				}
			},
			Bu: function(a) {
				this.qk[a] = !0
			},
			wA: function(a) {
				this.ge[a] && (this.ge[a].pk = !0)
			},
			oy: function(a) {
				return this.qk[a]
			},
			fz: function(a) {
				var b = this.u,
					c;
				for(c in b) b[c].onStatusChange(a);
				return !0
			},
			gz: function(a, b) {
				var c = this.u,
					g;
				for(g in c) c[g].Rf(a, b)
			},
			qr: function(b, c, d, e, k, l) {
				g.verifyOk(this.Z.ue()) || s.logError(a.resolve(122));
				k = this.u[e];
				if(!k) s.logError(a.resolve(123), this, e), g.fail();
				else if(this.Z.ue()) {
					var f;
					k.ay(c, d, b) ? f = k.Mm(c) : (f = this.Xy++, this.Mk[f] = e, e = this.Gw(l, f), k.ni(f, c, e.add, d, b), this.ge[f] = new n(e.remove));
					s.logDebug(a.resolve(135));
					k.ys(b, d, c, f)
				}
			},
			Jk: function(a, b, c) {
				3 <= c && this.Rp(1);
				(a = this.u[a].zx(b)) && this.Z.f.JA(b, a, this, 2 <= c)
			},
			Gw: function(a, b) {
				this.Ys++;
				var g = {
					LS_table: b,
					LS_req_phase: this.Ys,
					LS_win_phase: this.v
				};
				c.ca(a, g);
				return {
					add: c.ca(a, {
						LS_op: "add"
					}),
					remove: c.ca(g, {
						LS_op: "delete"
					})
				}
			},
			cs: function(a) {
				var b = this.u;
				this.u = {};
				for(var c in b) b[c].ms(a)
			},
			cz: function() {
				var a = this.u,
					b;
				for(b in a) a[b].ns()
			},
			kv: function() {
				for(var b in this.u) this.u[b].qh() || (s.logDebug(a.resolve(136), this), this.Ki(b))
			},
			vc: function() {
				this.Up();
				var a = this.u;
				this.v++;
				for(var b in a) a[b].vc(this.v)
			},
			Wc: function() {
				this.Up();
				var a = this.u;
				this.v++;
				for(var b in a) a[b].Wc(this.v)
			},
			gA: function(a, b) {
				this.ge[a] && this.Z.ue() && this.Z.f.LA(a, b, this)
			},
			ka: function() {
				b.stopRepetitiveTask(this.jv);
				f.removeBeforeUnloadHandler(this);
				f.removeUnloadHandler(this)
			},
			unloadEvent: function() {
				this.cs(!1)
			},
			preUnloadEvent: function() {
				this.cz()
			}
		};
		q.prototype.unloadEvent = q.prototype.unloadEvent;
		q.prototype.preUnloadEvent = q.prototype.preUnloadEvent;
		return q
	});
	define("lscl", ["LoggerManager", "BrowserDetection", "Helpers", "lscA"], function(h, f, e, d) {
		var b = f.isProbablyFX(1.5, !0) ? 10 : 50,
			c = b,
			a = 0,
			g = 0,
			l = 0,
			n = null,
			k = null,
			m = null,
			p = h.getLoggerProxy(d.Yd);
		return {
			ea: function() {
				c = b;
				l = g = a = 0;
				m = k = n = null
			},
			Nx: function() {
				n = a;
				k = g;
				m = l;
				var b = e.getTimeStamp();
				l || (l = b);
				6E4 <= b - l && (a = 0, l = b);
				g && 1E3 > b - g && a++;
				g = b
			},
			lk: function() {
				k != g && (a = n, g = k, l = m)
			},
			Mp: function() {
				if(0 != g) {
					if(!c) return !1;
					if(a >= c) return p.logError(h.resolve(137)), c = 0, !1
				}
				return !0
			}
		}
	});
	define("lscAH", ["Environment", "lscG"], function(h, f) {
		function e(d, b, c, a, g, e) {
			this.mB(d);
			this.ig(b);
			this.setData(c);
			this.xk(a);
			this.Nh(g);
			this.Ph(e)
		}
		e.ju = "GET";
		e.gi = "POST";
		e.prototype = {
			toString: function() {
				return ["[", this.gc, this.hi, this.Jb, this.Dg, "]"].join("|")
			},
			mB: function(d) {
				for(; d && "/" == d.substring(d.length - 1);) d = d.substring(0, d.length - 1);
				this.gc = d
			},
			ig: function(d) {
				for(; d && "/" == d.substring(0, 1);) d = d.substring(1);
				this.hi = d
			},
			xk: function(d) {
				this.Dg = d || e.gi
			},
			Nh: function(d) {
				this.vv = d || !1
			},
			Ph: function(d) {
				this.Gq = d || null
			},
			setData: function(d) {
				this.Jb = d || null
			},
			Ti: function(d) {
				this.Jb ? this.tv(d) || (this.Jb += d) : this.setData(d)
			},
			tv: function(d) {
				return this.Jb && -1 < this.Jb.indexOf(d)
			},
			getFile: L("hi"),
			Wa: function() {
				return this.hi ? this.gc + "/" + this.hi : this.gc
			},
			getData: L("Jb"),
			Ex: function() {
				return this.Jb ? this.Wa() + "?" + this.Jb : this.Wa()
			},
			Fr: function() {
				return !(0 == this.gc.indexOf("http://") || 0 == this.gc.indexOf("https://") || 0 == this.gc.indexOf("file:///"))
			},
			py: function(d, b) {
				if(!h.isBrowser()) return !1;
				if(this.Fr()) return h.isWebWorker() ? location.hostname == d : f.qc() == d;
				if(b) {
					if(!this.Hr(b)) return !1;
					if("file:" == b) return "" == d
				}
				d = d.replace(".", ".");
				return RegExp("^https?://(?:[a-z][a-z0-9-]+.)*" + d + "(?:/|$|:)", "i").test(this.gc)
			},
			Hr: function(d) {
				return h.isBrowser() && d.indexOf(":") == d.length - 1 ? this.Fr() ? location.protocol == d : 0 == this.gc.indexOf(d) : !1
			},
			Aa: function() {
				if(!h.isBrowser()) return !0;
				var d = h.isWebWorker() ? location.hostname : f.qc();
				return !this.py(d, location.protocol)
			},
			za: function() {
				return h.isBrowser() ? !this.Hr(location.protocol) : !0
			}
		};
		e.tu = new e("about:blank");
		return e
	});
	define("lscO", [], function() {
		function h(f, e, d, b, c) {
			this.$c = f;
			this.Ts = e;
			this.Us = b;
			this.md = d;
			this.He = c
		}
		h.Td = 1;
		h.Ue = 2;
		h.dl = 3;
		h.Se = 4;
		h.kd = 5;
		h.Vd = 6;
		h.fl = 7;
		h.Re = 8;
		h.ep = 9;
		h.prototype = {
			toString: function() {
				return ["[|ControlRequest", this.Us, this.md, this.He, this.$c, "]"].join("|")
			},
			getKey: L("Us")
		};
		return h
	});
	define("lsca", ["lscAH", "lscO", "lscG"], function(h, f, e) {
		function d() {}
		d.prototype = {
			toString: V("[Encoder]"),
			Rx: function(b, c, a) {
				var g = new h;
				g.ig((b.vd() == f.Se ? "msg" : b.vd() == f.kd ? "send_log" : b.vd() == f.Re ? "heartbeat" : "control") + this.gh());
				g.xk(h.gi);
				g.Nh(c);
				g.Ph(a);
				return g
			},
			yq: function(b, c, a) {
				for(a = a ? "" : "\r\n"; 0 < b.getLength();) {
					var g = b.$g(),
						d = g.Ts,
						e = g.md;
					if(e == f.Td && d.rh()) b.shift();
					else if(e != f.Ue || d.Eu())
						if(d && d.verifySuccess && d.verifySuccess()) b.shift();
						else return b = g.$c, e == f.Se ? a + this.qm(b, d, c) : e == f.Vd ? a + this.nm(b, d, c) : e == f.Re ? a + this.om(b, d, c) : e == f.kd ? a + this.pm(b, d, c) : a + this.mm(b, d, c);
					else d.Jj(), b.shift()
				}
				return null
			},
			expand: function(b, c) {
				var a = "";
				if(b)
					for(var g in b) g !== c && (a += g + "\x3d" + b[g] + "\x26");
				return a
			},
			Wg: function(b, c) {
				var a = this.expand(b);
				return a += this.expand(c)
			},
			zq: function(b, c, a) {
				var g = this.expand(b, a),
					g = g + this.expand(c, a);
				b[a] ? g += a + "\x3d" + b[a] : c && (g += a + "\x3d" + c[a]);
				return "LS_unq\x3d" + g.length + "\x26" + g
			},
			Yo: u(),
			gh: V(".js"),
			Em: V(0),
			Hm: V(2),
			mm: function(b, c, a, g) {
				g = e.ca(g, {
					LS_session: a
				});
				return this.Wg(b, g)
			},
			nm: function(b, c, a, g) {
				return this.Wg(b, g)
			},
			om: function(b, c, a, g) {
				return this.Wg(b, g)
			},
			pm: function(b, c, a, g) {
				return a ? (g = e.ca(g, {
					LS_session: a
				}), this.Wg(b, g)) : this.Wg(b)
			},
			qm: function(b, c, a, g) {
				return this.zq(b, g, "LS_message")
			}
		};
		return d
	});
	define("lscb", ["lsca", "Inheritance", "lscG"], function(h, f, e) {
		function d() {}
		var b = 1,
			c = {
				qm: "encodeMessageRequest",
				mm: "encodeControlRequest",
				nm: "encodeDestroyRequest",
				om: "encodeHeartbeatRequest",
				pm: "encodeLogRequest"
			},
			c = e.getReverse(c);
		d.prototype = {
			qm: function(a, b, l, f) {
				f = e.ca(f, {
					LS_session: l
				});
				b.Vo ? f.LS_msg_prog || a.LS_msg_prog || (f = e.ca(f, {
					LS_ack: "",
					LS_msg_prog: b.ga.Zv(b.lb)
				})) : (b.Pv(!0), f = e.ca(f, {
					LS_ack: "",
					LS_msg_prog: b.ga.Ur(b.lb)
				}));
				return this._callSuperMethod(d, c.encodeMessageRequest, [a,
					b, l, f
				])
			},
			mm: function(a, g, f, h) {
				h = e.ca(h, {
					LS_unique: b++
				});
				return this._callSuperMethod(d, c.encodeControlRequest, [a, g, f, h])
			},
			nm: function(a, g, f, h) {
				h = e.ca(h, {
					LS_unique: b++
				});
				return this._callSuperMethod(d, c.encodeDestroyRequest, [a, g, f, h])
			},
			om: function(a, g, f, h) {
				h = e.ca(h, {
					LS_unique: b++
				});
				return this._callSuperMethod(d, c.encodeHeartbeatRequest, [a, g, f, h])
			},
			pm: function(a, g, f, h) {
				h = e.ca(h, {
					LS_unique: b++
				});
				return this._callSuperMethod(d, c.encodeLogRequest, [a, g, f, h])
			},
			expand: function(a, b) {
				var c = "";
				if(a)
					for(var d in a) c = d !== b ? c + (d + "\x3d" + a[d] + "\x26") : c + (d + "\x3d" + encodeURIComponent(a[d]) + "\x26");
				return c
			},
			zq: function(a, b, c) {
				a = this.expand(a, c);
				return a += this.expand(b, c)
			}
		};
		f(d, h);
		return d
	});
	define("lscAI", ["lscb"], function(h) {
		function f() {
			for(var b in {
					ua: !0
				}) this.ii = b;
			this.Q = f
		}

		function e() {
			return !1
		}

		function d() {
			return !0
		}
		var b = new h;
		f.gp = "LS_container\x3dlsc\x26";
		f.kc = function(b, a) {
			for(var g in a) b[g] = !0 === a[g] ? d : !1 === a[g] ? e : a[g]
		};
		f.kc(f, {
			ya: !1,
			Aa: !1,
			za: !1,
			ic: !1,
			jc: !1,
			yf: !1,
			mc: !1
		});
		f.prototype = {
			aa: E(),
			tk: function(b, a, g, d, e, k) {
				this.Q.jc() ? b.Ti("LS_eng\x3d" + k + "\x26") : b.Ti(f.gp);
				return this.ua(b, a, g, d, e)
			},
			ua: V(!1),
			ne: function() {
				return b
			}
		};
		return f
	});
	define("lscf", ["lsca", "Inheritance"], function(h, f) {
		function e() {}
		e.prototype = {
			toString: V("[WSEncoder]"),
			Em: function(d) {
				return d.length + 2
			},
			gh: V("")
		};
		f(e, h);
		return e
	});
	define("lscAK", "lscAI Inheritance EnvironmentStatus Executor Environment LoggerManager lscG ASSERT lscf lscA".split(" "), function(h, f, e, d, b, c, a, g, l, n) {
		function k(a) {
			this._callSuperConstructor(k);
			this.k = !1;
			this.bb = this.Qj = this.Za = this.Ri = null;
			this.Be = this.wh = !1;
			this.Mh = null;
			this.Jn = !1;
			this.AC = a;
			this.Q = k
		}

		function m(a) {
			a = a.toLowerCase();
			a = 0 == a.indexOf("http://") ? a.replace("http://", "ws://") : a.replace("https://", "wss://");
			if(q) return new q(a, s);
			if("undefined" != typeof WebSocket) return new WebSocket(a, s);
			if("undefined" != typeof MozWebSocket) return new MozWebSocket(a, s);
			k.dm();
			return null
		}
		var p = c.getLoggerProxy(n.eb),
			q = null;
		b.isNodeJS() && (q = a.Ij("faye-websocket").Client);
		var s = "js.lightstreamer.com",
			t = new l,
			r = !1,
			D = {};
		k.dm = function(a) {
			a ? D[a] = !0 : r = !0
		};
		k.DA = function() {
			r = !1;
			D = {}
		};
		k.$x = function() {
			return r
		};
		h.kc(k, {
			ya: function(a) {
				if(r || a && D[a]) return !1;
				a = null;
				"undefined" != typeof WebSocket ? a = WebSocket : "undefined" != typeof MozWebSocket && (a = MozWebSocket);
				return a && 2 == a.prototype.CLOSED ? !1 : q || a
			},
			Aa: !0,
			za: function() {
				return !b.isBrowser() || "https:" != location.protocol
			},
			ic: !0,
			jc: !1,
			yf: !0,
			mc: !1
		});
		k.prototype = {
			toString: function() {
				return ["[|WebSocketConnection", this.k, this.Za, this.Ri, this.Ym(), "]"].join("|")
			},
			aa: function() {
				if(this.bb) {
					p.logDebug(c.resolve(142));
					this.Za = null;
					if(this.bb) try {
						this.bb.close(1E3)
					} catch(a) {
						p.logDebug(c.resolve(143), a)
					}
					this.Ya()
				}
			},
			Vz: function(a, b, g, e, k) {
				if(this.k) p.logError(c.resolve(138));
				else if(r) return !1;
				this.Be = !1;
				this.Mh = a.gc;
				this.Za = b;
				try {
					this.bb = m(this.Mh)
				} catch(f) {
					return p.logDebug(c.resolve(144), f), !1
				}
				d.addTimedTask(this.Wz, 6E3, this, [this.Za]);
				var l = this;
				this.bb.onmessage = function(a) {
					l.Cn(a, b, g)
				};
				this.bb.onerror = function() {
					l.vz(b, e)
				};
				this.bb.onclose = function(a) {
					l.mz(a, b, k, e)
				};
				this.bb.onopen = function() {
					l.Cz(b)
				};
				return !0
			},
			Wz: function(a) {
				if(a == this.Za && this.bb && !this.Jn) try {
					p.logDebug(c.resolve(145)), this.bb.close(1E3)
				} catch(b) {
					p.logDebug(c.resolve(146))
				}
			},
			ua: function(a, b) {
				if(this.k) return p.logError(c.resolve(139)), null;
				if(r) return !1;
				this.Qj = a;
				this.Ri = b;
				p.logDebug(c.resolve(147), a.Wa());
				this.Ym() && this.gt(b);
				return !0
			},
			Xx: function(a) {
				return g.verifyOk(this.Mh) ? 0 == this.Mh.indexOf(a) : (p.logError(c.resolve(140)), !1)
			},
			Ym: function() {
				return null != this.bb && 1 == this.bb.readyState
			},
			Eg: function(a, b) {
				if(!this.Ym()) return null;
				b && (this.Rt(b), a.Ti(h.gp));
				p.isDebugLogEnabled() && p.logDebug(c.resolve(148), a.getFile());
				try {
					this.bb.send(a.getFile() + "\r\n" + a.getData())
				} catch(g) {
					return p.logDebug(c.resolve(149), g), !1
				}
				return !0
			},
			gt: function(a) {
				var b = this.Eg(this.Qj, a);
				g.verifyOk(null !== b) || p.logError(c.resolve(141), a);
				b && (this.k = !0, this.AC.dw(this.Za))
			},
			Rt: G("Ri"),
			Cn: function(a, b, g) {
				this.Za != b || e.isUnloaded() || (p.isDebugLogEnabled() && p.logDebug(c.resolve(150), a.data), this.wh = !0, d.executeTask(g, [a.data, this.Ri]))
			},
			vz: function(a, b) {
				this.Za != a || e.isUnloaded() || (p.logDebug(c.resolve(151)), this.Be |= !this.wh, d.executeTask(b, ["wsc.unknown", this.Za, !0, this.Be]))
			},
			Cz: function(a) {
				this.Za != a || e.isUnloaded() || (this.Jn = !0, p.logDebug(c.resolve(152)), this.Qj && this.gt())
			},
			mz: function(a, b, g, k) {
				this.Za != b || e.isUnloaded() || (a = a ? a.code : -1, p.logDebug(c.resolve(153), a, this.wh), 1E3 == a || 1001 == a ? (d.modifyAllTaskParams(g, [this.Za, !0]), d.addPackedTimedTask(g, 300), this.Ya()) : (this.Be |= !this.wh, g = this.Za, this.Ya(), d.executeTask(k, ["wsc." + a, g, !0, this.Be])))
			},
			Ya: function() {
				this.Jn = this.k = !1;
				this.Qj = this.Za = null;
				this.wh = !1;
				this.Mh = this.bb = null
			},
			ne: function() {
				return t
			}
		};
		f(k, h);
		return k
	});
	define("lscR", ["Inheritance", "lscW"], function(h, f) {
		function e(d, b, c, a) {
			this._callSuperConstructor(e, [a]);
			this.lu = d;
			this.ru = c;
			this.d = b
		}
		e.prototype = {
			verifySuccess: function() {
				return !this.d.ja(this.ru)
			},
			he: function() {
				this.d.Zi(this.lu)
			},
			Nw: function() {
				return this.cf.Yi
			},
			Jj: E()
		};
		h(e, f);
		return e
	});
	define("lscr", "EnvironmentStatus Helpers LoggerManager Executor lscl lscA lscR lscO lscq ASSERT BrowserDetection lscAK".split(" "), function(h, f, e, d, b, c, a, g, l, n, k) {
		function m(a, b, c, g, e) {
			this.Dl = d.packTask(this.Mz, this);
			this.Cl = d.packTask(this.En, this);
			this.Bl = d.packTask(this.Dn, this);
			this.J = a;
			this.le = b;
			this.a = 1;
			this.qa = 0;
			this.Pa = 100 * f.randomG(100);
			this.e = c;
			this.K = g;
			this.xc = c.xc;
			this.b = c.b;
			this.Ta = c.Ta;
			this.ba = null;
			this.R = c.R;
			this.Mb = c.fh();
			this.Mr = this.sg = this.gg = 0;
			this.Je = this.Hd = this.dn = null;
			this.reset();
			e && (this.$e = e.$e, this.Ia = e.Ia, this.Md = e.Md, this.Pa = e.Pa, this.gg = e.gg, this.rk = e.rk, this.Tm = e.Tm)
		}
		var p = e.getLoggerProxy(c.Yd),
			q = e.getLoggerProxy(c.Te);
		m.ll = 1;
		m.Ud = 2;
		m.hp = 3;
		m.jp = 4;
		m.ip = 5;
		m.Yt = 7;
		m.eu = 8;
		m.EC = 9;
		m.HC = 10;
		m.du = 6;
		m.jl = 11;
		m.prototype = {
			reset: function() {
				this.$e = 0;
				this.Ia = this.Md = null;
				this.gg = 0;
				this.ng = this.fd = this.vl = !1;
				this.Co = "";
				this.dd = !1
			},
			ag: E(),
			Ic: function(a) {
				var b = this.a;
				this.a = a;
				this.qa++;
				a = this.qa;
				this.a != b && this.e.OB(this.K);
				return a == this.qa
			},
			nj: function() {
				this.Pa++
			},
			ja: function(a) {
				return this.Pa == a
			},
			Gm: function() {
				var a = this.a;
				return 1 == a ? c.ec : 11 == a ? c.Bg : 2 == a ? c.CONNECTING : 3 == a || 4 == a || 5 == a ? c.Ib + this.$q() : 10 == a ? c.Ve : c.Ib + this.Wq()
			},
			k: function() {
				return 1 != this.a && 2 != this.a && 11 != this.a
			},
			wy: function() {
				return 2 == this.a || 7 == this.a || 5 == this.a
			},
			Er: function() {
				return 3 == this.a || 8 == this.a || 9 == this.a || 10 == this.a
			},
			uy: function() {
				return !this.J
			},
			xb: function() {
				return this.k() ? this.Md : this.rk
			},
			pe: L("Ia"),
			Kb: function(a, c) {
				var g = 1 != this.a && 11 != this.a ? !1 : !0;
				if(!b.Mp()) return p.logDebug(e.resolve(170), this), this.wa("mad", g, !0), !1;
				!1 == g && (p.logDebug(e.resolve(171), this), this.wa("new." + (c || ""), !1, !1));
				p.logInfo(e.resolve(165), this);
				this.reset();
				this.Os();
				this.Ta.P("sessionId", null);
				this.Ta.P("serverSocketName", null);
				this.Ta.P("serverInstanceAddress", null);
				this.rk = this.Ta.Lh;
				this.Tm = this.b.ho;
				this.nj();
				return !0
			},
			be: function() {
				if(!b.Mp()) return this.wa("madb", !1, !0), !1;
				this.$e++;
				n.verifyOk(6 == this.a || 4 == this.a || 1 == this.a) || p.logError(e.resolve(154));
				if(1 == this.a) {
					if(!this.Ic(4)) return !1;
					this.Os();
					this.qe()
				}
				this.nj();
				this.J ? p.logDebug(e.resolve(172), this) : p.logInfo(e.resolve(166), this);
				return !0
			},
			Zs: function(a, b, c) {
				this.K = a;
				this.fd || (p.logDebug(e.resolve(173), this), this.dd = !1, 2 == this.a || 11 == this.a || 1 == this.a ? this.e.gf(this.K, b, c) : 6 == this.a || 4 == this.a ? this.e.Fo(this.K, b, c) : (this.fd = !0, this.ng = c, this.Co = b, this.Zi(b)))
			},
			AA: function(a) {
				this.K = a;
				this.dd || (p.logDebug(e.resolve(174), this), n.verifyOk(2 != this.a && 11 != this.a && 1 != this.a) || p.logError(e.resolve(155)), 6 == this.a || 4 == this.a ? this.e.wt(this.K) : (this.dd = !0, this.Zi("slow")))
			},
			Os: function() {
				1 != this.a && 11 != this.a || this.xc.jA();
				this.J && this.le && this.xc.at()
			},
			qe: E(),
			wa: function(a, b, c) {
				1 != this.a && (2 != this.a && 11 != this.a) && (this.e.Nj(this.xb()), b || this.HA(a), this.K = this.e.Iz(this.K, c), this.Ta.P("sessionId", null), this.Ta.P("serverSocketName", null), this.Ta.P("serverInstanceAddress", null), p.logInfo(e.resolve(167), this, a));
				this.kg(!c)
			},
			kg: function(a) {
				this.nj();
				this.reset();
				this.Ic(a ? 11 : 1);
				p.logDebug(e.resolve(175), this)
			},
			Mv: function(a) {
				if(this.Ic(3 == this.a ? 4 : 6)) {
					this.nj();
					var b = a;
					this.J && (a >= this.b.Fd || this.b.P("pollingMillis", a), b = this.jx());
					4 != this.a && b && 0 < b ? (p.logDebug(e.resolve(176)), this.Wb(b)) : this.Ed(this.qa)
				}
			},
			Ed: function(a, b, c) {
				a == this.qa && (p.logDebug(e.resolve(177), this), a = "timeout." + this.a + "." + this.$e, 11 == this.a && c && (a = c), 2 == this.a ? (this.wa("create.timeout", !0, !1), this.Wb(this.zl(), "create.timeout")) : 3 == this.a || 7 == this.a || 10 == this.a || 11 == this.a ? this.dd || this.fd ? this.e.gf(this.K, a + ".switch", this.ng) : !this.J || this.le ? this.Kb(this.Ia, a) : this.e.gf(this.K, a, !1) : 5 == this.a ? (this.sg--, this.dd || this.fd ? this.e.gf(this.K, a + ".switch", this.ng) : 0 < this.sg || this.le ? this.Kb(this.Ia, a) : this.J ? this.e.gf(this.K, a + ".switch", this.ng) : this.Xc(this.K, a)) : 6 == this.a ? (this.J && this.xc.iC(b), this.be("loop")) : 4 == this.a ? this.be("loop1") : 8 == this.a ? this.mC() : 9 == this.a ? this.lC() : (p.logError(e.resolve(156), this), n.fail()))
			},
			qo: function() {
				return this.le || this.e.qo()
			},
			Xc: function(a, b) {
				var c = this.qo();
				c && this.wa("giveup", 1 != this.a && 11 != this.a ? !1 : !0, !0);
				this.e.Xc(a, b, c)
			},
			pa: function(a, b, c, g, d) {
				d ? (this.wa(a, b, !1), this.Wb(this.zl(), a)) : g ? (this.wa(a, b, !1), this.Ed(this.qa, 0, "openfail")) : 8 == this.a || 10 == this.a || 9 == this.a || 7 == this.a || 6 == this.a ? (this.wa(a, b, !1), this.Wb(f.randomG(this.b.vm), a)) : 2 == this.a || 3 == this.a || 5 == this.a ? this.fd && !this.le || k.isProbablyAndroidBrowser() ? this.e.gf(this.K, this.Co + ".error", this.ng) : (this.wa(a, b, !1), this.Wb(this.zl(), a)) : (p.logError(e.resolve(157), a, this), n.fail())
			},
			wn: function(a) {
				this.ba && this.ba.Sq && this.ba.Sq();
				8 == this.a || 9 == this.a || 10 == this.a || 3 == this.a ? this.fd ? this.e.Fo(this.K, this.Co, this.ng) : this.dd ? this.e.wt(this.K) : this.Mv(a) : (p.logError(e.resolve(158), this), n.fail())
			},
			T: function() {
				2 == this.a ? this.Ic(3) && this.kC() : 3 != this.a && (7 == this.a || 5 == this.a || 9 == this.a || 10 == this.a || 8 == this.a ? this.Ic(8) && this.nC() : (p.logError(e.resolve(159), this), n.fail()))
			},
			am: function() {
				b.Nx();
				this.Je = f.getTimeStamp();
				n.verifyOk(1 == this.a || 11 == this.a) || p.logError(e.resolve(160));
				if(!this.Ic(2)) return !1;
				this.Wb(this.b.df);
				this.ba = this.e.Xq()
			},
			Kg: function() {
				this.Je = f.getTimeStamp();
				n.verifyOk(6 == this.a || 4 == this.a) || p.logError(e.resolve(161), this);
				if(!this.Ic(6 == this.a ? 7 : 5)) return !1;
				this.Wb(this.tw());
				this.ba = this.e.Xq()
			},
			Wb: function(a, b) {
				return d.addTimedTask(this.Ed, a, this, [this.qa, a, b])
			},
			nC: function() {
				if(0 < this.b.Bf) {
					var a = f.getTimeStamp();
					50 > a - this.Mr && this.dn ? d.modifyTaskParam(this.dn, 0, this.qa) : (this.Mr = a, this.dn = this.Wb(this.b.Bf))
				}
			},
			mC: function() {
				this.Ic(9) && this.Wb(this.b.Ek)
			},
			lC: function() {
				this.Ic(10) && this.Wb(this.b.Hd)
			},
			kC: function() {
				n.verifyValue(this.a, 3) || p.logError(e.resolve(162));
				this.Wb(this.b.Ek)
			},
			tw: function() {
				return this.J ? this.b.df + this.b.lj : 0 < this.sg && null != this.Hd ? this.Hd : this.b.df
			},
			jx: function() {
				if(4 == this.a) return this.b.Fd;
				var a = this.b.Fd;
				if(this.Je) var b = f.getTimeStamp() - this.Je,
					a = a > b ? a - b : 0;
				return a
			},
			zl: function() {
				var a = f.getTimeStamp() - this.Je;
				return a > this.b.jk ? 0 : this.b.jk - a
			},
			Vu: function() {
				this.Je || (p.logError(e.resolve(163), this), n.fail(), this.Hd = null);
				var a = f.getTimeStamp() - this.Je,
					b = this.b.df;
				this.Hd = (a > b ? b : a) + b
			},
			Mz: function(a, c) {
				!h.isUnloaded() && this.ja(c) && "" !== a && (null == a ? (b.lk(), this.pa("nullresp")) : this.ba.tp(c, a))
			},
			En: function(a, c, g, d) {
				!h.isUnloaded() && this.ja(c) && (b.lk(), this.pa("failure." + a, !1, g, d))
			},
			Dn: function(a, c) {
				this.ja(a) && (b.lk(), this.pa("wrongend", null, c))
			},
			Cq: function() {
				this.pa("eval")
			},
			Jz: function() {
				this.fd || this.dd || this.e.Kz(this.K)
			},
			Qz: function() {
				q.isDebugLogEnabled() && q.logDebug(e.resolve(178));
				this.T();
				8 == this.a && (this.sg = 1)
			},
			Hz: function(a) {
				q.isDebugLogEnabled() && q.logDebug(e.resolve(179), a);
				this.gg = a;
				this.b.P("maxBandwidth", a)
			},
			tz: function() {
				q.isDebugLogEnabled() && q.logDebug(e.resolve(180));
				this.pa("error41", !0)
			},
			xz: function() {
				q.isDebugLogEnabled() && q.logDebug(e.resolve(181));
				this.T()
			},
			Bz: function(a, b, c, g, d, k) {
				q.isDebugLogEnabled() && q.logDebug(e.resolve(182));
				var f = this.rk;
				null == b || this.Tm || (f = b = l.pv(f, b));
				f != this.Md && (this.e.Nj(this.Md), this.Md = f, this.e.An(this.Md));
				g && (this.J ? this.b.P("idleMillis", g) : this.b.P("keepaliveMillis", g));
				2 == this.a ? this.Ia = a : (n.verifyValue(this.Ia, a) || p.logError(e.resolve(164)), this.Vu());
				this.xc.NB(this.J);
				this.T();
				3 == this.a ? (this.e.vc(c), this.Ta.P("sessionId", a), this.Ta.P("serverSocketName", d), this.Ta.P("serverInstanceAddress", this.Md), this.vl && (this.Ai(), this.vl = !1)) : this.e.xs(c);
				k && this.e.wz(k)
			},
			yz: function(a) {
				q.isDebugLogEnabled() && q.logDebug(e.resolve(183));
				this.wn(a)
			},
			Fn: function(a) {
				b.lk();
				this.pa(a, !0)
			},
			js: function(a) {
				q.isDebugLogEnabled() && q.logDebug(e.resolve(184), a);
				this.wa("end", !0, !0)
			},
			Hn: function(a, b) {
				this.T();
				this.e.Hn(a, b)
			},
			Yb: function(a) {
				this.T();
				this.e.Yb(a)
			},
			Xb: function(a) {
				this.T();
				this.e.Xb(a)
			},
			Dd: function(a) {
				this.T();
				this.e.Dd(a)
			},
			xn: function(a, b) {
				this.T();
				this.e.xn(a, b)
			},
			zn: function(a, b) {
				this.T();
				this.e.zn(a, b)
			},
			yn: function(a, b, c, g) {
				this.T();
				this.e.yn(a, b, g, c)
			},
			Ae: function(a, b) {
				this.T();
				this.e.Ae(a, b)
			},
			Qf: function(a, b, c, g) {
				this.T();
				this.e.Qf(a, b, g, c)
			},
			Tf: function(a, b, c) {
				this.T();
				this.e.Tf(a, b, c)
			},
			Rf: function(a, b) {
				this.js(b);
				this.e.Rf(a, b)
			},
			onUnsubscription: function(a) {
				this.T();
				this.e.onUnsubscription(a)
			},
			onSubscription: function(a, b, c, g, d) {
				this.T();
				this.e.onSubscription(a, b, c, g, d)
			},
			Sf: function(a, b) {
				this.T();
				this.e.Sf(a, b)
			},
			Zi: function(b) {
				p.logInfo(e.resolve(168), this);
				var c = l.Qw(b, this.xc.Cm());
				b = new a(b, this, this.Pa, this.b);
				this.R.Fc(this.Ia, c, g.fl, b)
			},
			HA: function(a) {
				p.logInfo(e.resolve(169), this);
				a = l.Iw(this.Ia, a);
				this.R.Fc(this.Ia, a, g.Vd, null, this.xb())
			},
			Ai: function() {
				1 != this.a && 11 != this.a && (2 == this.a ? this.vl = !0 : 0 >= this.gg && 0 >= this.b.Tc || this.gg != this.b.Tc && this.R.Fc(null, l.Cw(this.b), g.dl, null))
			}
		};
		return m
	});
	define("lscAJ", [], function() {
		function h() {
			this.Qn = !1;
			this.Yj = 0;
			this.ap = !1
		}
		h.prototype = {
			Hq: function(f, e) {
				if(!e && !this.ny(f)) return null;
				0 == this.Yj && "/*" == f.substring(0, 2) && (this.ap = !0);
				var d = -1;
				if(e && !this.ap) d = f.length;
				else {
					d = f.lastIndexOf(";\n");
					if(0 > d) return null;
					d += 2
				}
				var b = f.substring(this.Yj, d);
				0 == this.Yj && this.ap && (b = b.substring(2, b.length));
				this.Yj = d;
				return b
			},
			yo: function(f) {
				return this.Hq(f, !1)
			},
			xo: function(f) {
				return this.Hq(f, !0)
			},
			ny: function(f) {
				if(this.Qn) return !0;
				var e = f.indexOf("setPhase("),
					d = f.indexOf("setPhase(ph)");
				if(-1 < e) {
					if(-1 >= d) return this.Qn = !0;
					e = f.indexOf("setPhase(", e + 1);
					if(-1 < e && f.lastIndexOf(";\n") > e) return this.Qn = !0
				}
				return !1
			}
		};
		return h
	});
	define("lscAN", "lscAI Inheritance Executor BrowserDetection EnvironmentStatus lscAJ Environment LoggerManager lscG lscA".split(" "), function(h, f, e, d, b, c, a, g, l, n) {
		function k() {
			this._callSuperConstructor(k);
			this.k = !1;
			this.Db = this.W = this.lc = this.t = null;
			this.wo = !1;
			this.Q = k
		}

		function m(a) {
			return function() {
				e.executeTask(a)
			}
		}
		var p = g.getLoggerProxy(n.eb),
			q = a.isBrowser() ? 2 : 3,
			s = !0,
			t;
		a.isNodeJS() && (t = l.Ij("xmlhttprequest").XMLHttpRequest);
		var r = null;
		h.kc(k, {
			ya: function() {
				if(null !== r) return r;
				d.isProbablyIE(9, !0) ? r = !1 : "undefined" != typeof XMLHttpRequest ? "undefined" != typeof(new XMLHttpRequest).withCredentials ? r = !0 : a.jy() && (r = !0) : !a.isBrowser() && t && (r = !0);
				null === r && (r = !1);
				return r
			},
			yf: function() {
				return !d.isProbablyOldOpera() && !d.isProbablyPlaystation()
			},
			Aa: !0,
			za: !0,
			ic: function() {
				return "file:" != n.wg || !a.isBrowserDocument() && !a.isNodeJS()
			},
			jc: !1,
			mc: !0
		});
		k.prototype = {
			toString: function() {
				return ["[|XSXHRConnection", this.k, this.t, this.lc, "]"].join("|")
			},
			aa: function() {
				if(this.k) {
					p.logDebug(g.resolve(185));
					this.t = null;
					if(this.W) try {
						this.W.abort()
					} catch(a) {
						p.logDebug(g.resolve(186))
					}
					this.Ya()
				}
			},
			ua: function(a, b, d, k, f) {
				if(this.k) return null;
				this.W = t ? new t : new XMLHttpRequest;
				this.Db = new c;
				d = e.packTask(this.Cn, this, [b, d, f, k]);
				this.W.onreadystatechange = m(d);
				this.t = b;
				this.lc = null;
				p.logDebug(g.resolve(187), a.Wa());
				try {
					this.W.open(a.Dg, a.Wa(), !0);
					this.W.withCredentials = a.vv;
					var l = a.Gq;
					if(l)
						for(var h in l) this.W.setRequestHeader(h, l[h]);
					this.W.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
					this.W.send(a.getData());
					this.k = !0
				} catch(r) {
					return p.logDebug(g.resolve(188), r), !1
				}
				return !0
			},
			Cn: function(a, c, d, k) {
				this.t != a || b.isUnloaded() || (a = null, this.xf() && c && (3 == this.W.readyState ? a = this.Db.yo(this.W.responseText) : 4 == this.W.readyState && (a = this.Db.xo(this.W.responseText)), p.isDebugLogEnabled() && p.logDebug(g.resolve(189), a), null != a && e.executeTask(c, [a, this.t])), 4 == this.W.readyState && (this.xf() || (this.wo ? (k && e.executeTask(k, ["status0", this.t, !1, s]), s = !s, this.wo = !1) : c && e.executeTask(c, [null, this.t])), p.logDebug(g.resolve(190)), 4 != this.W.readyState && "" != a || !d || e.addTimedTask(this.Mf, 100, this, [this.t, d]), this.Ya()))
			},
			Mf: function(a, b) {
				e.executeTask(b, [a])
			},
			Ya: function() {
				this.k = !1;
				this.t = null;
				this.W && (delete this.W.onreadystatechange, delete this.W)
			},
			xf: function() {
				try {
					if(null === this.lc) {
						if(this.W.readyState < q) return !1;
						this.lc = 200 <= this.W.status && 299 >= this.W.status;
						0 == this.W.status && (this.wo = !0)
					}
					return this.lc
				} catch(a) {
					return p.logDebug(g.resolve(191), a), !1
				}
			}
		};
		f(k, h);
		return k
	});
	define("lscAE", "lscAI Inheritance Executor EnvironmentStatus lscAJ LoggerManager lscA".split(" "), function(h, f, e, d, b, c, a) {
		function g() {
			this._callSuperConstructor(g);
			this.k = !1;
			this.sa = this.Db = this.t = null;
			this.Ch = 0;
			this.Q = g
		}

		function l(a) {
			return function() {
				e.executeTask(a)
			}
		}
		var n = c.getLoggerProxy(a.eb),
			k = null;
		h.kc(g, {
			ya: function() {
				return null !== k ? k : k = "undefined" != typeof XDomainRequest ? !0 : !1
			},
			yf: !0,
			Aa: !0,
			za: !1,
			ic: !1,
			jc: !1,
			mc: !1
		});
		g.prototype = {
			toString: function() {
				return ["[|IEXSXHRConnection",
					this.k, this.t, "]"
				].join("|")
			},
			aa: function() {
				if(this.k) {
					n.logDebug(c.resolve(192));
					this.t = null;
					if(this.sa) try {
						this.sa.abort()
					} catch(a) {
						n.logDebug(c.resolve(193))
					}
					this.Ya()
				}
			},
			ua: function(a, g, d, k, f) {
				if(this.k) return null;
				this.Ch = 0;
				this.sa = new XDomainRequest;
				this.Db = new b;
				f = e.packTask(this.CA, this, [g, d, f, k]);
				var h = e.packTask(this.Hp, this, [g, k, "xdr.err"]);
				k = e.packTask(this.Hp, this, [g, k, "xdr.timeout"]);
				d = e.packTask(this.Qs, this, [g, d, !1]);
				this.sa.onload = l(f);
				this.sa.onerror = l(h);
				this.sa.ontimeout = l(k);
				this.sa.onprogress = l(d);
				this.t = g;
				n.logDebug(c.resolve(194), a.Wa());
				try {
					this.sa.open(a.Dg, a.Wa()), this.sa.send(a.getData()), this.k = !0
				} catch(D) {
					return n.logDebug(c.resolve(195), D), !1
				}
				return !0
			},
			Hp: function(a, b, g) {
				this.t != a || d.isUnloaded() || (n.logDebug(c.resolve(196)), e.executeTask(b, [g, a, !1, 0 == this.Ch]))
			},
			Qs: function(a, b, g) {
				this.t != a || d.isUnloaded() || (this.Ch++, b && (a = g ? this.Db.xo(String(this.sa.responseText)) : this.Db.yo(String(this.sa.responseText)), n.isDebugLogEnabled() && n.logDebug(c.resolve(197), a), null != a && e.executeTask(b, [a, this.t])))
			},
			CA: function(a, b, g, k) {
				this.t != a || d.isUnloaded() || (0 == this.Ch && -1 < String(this.sa.responseText).indexOf("LS_window.alert('License not valid for this Client version');") ? k && e.executeTask(k, ["license", a, !1, !0]) : this.Qs(a, b, !0), this.Ya(), n.logDebug(c.resolve(198)), g && e.addTimedTask(this.Mf, 100, this, [g, a]))
			},
			Mf: function(a, b) {
				e.executeTask(a, [b])
			},
			Ya: function() {
				this.k = !1;
				this.Db = this.t = null;
				this.Ch = 0;
				this.sa && (this.sa.onload = null, this.sa.onerror = null, this.sa.ontimeout = null, this.sa = this.sa.onprogress = null)
			}
		};
		f(g, h);
		return g
	});
	define("lscAA", ["lscAI", "Inheritance", "Executor"], function(h, f, e) {
		function d() {
			this._callSuperConstructor(d)
		}
		h.kc(d, {
			ya: !1,
			Aa: !1,
			za: !1,
			ic: !1,
			jc: !1,
			mc: !1
		});
		d.prototype = {
			ua: function(b, c, a) {
				a && e.addTimedTask(this.Cd, 1E3, this, [a, c]);
				return !0
			},
			Cd: function(b, c) {
				e.executeTask(b, ["", c])
			}
		};
		f(d, h);
		return d
	});
	define("lsce", ["lscb", "Inheritance"], function(h, f) {
		function e() {}
		e.prototype = {
			Em: V(15),
			Hm: function(d) {
				return d ? encodeURIComponent(d).length - d.length : 0
			},
			Yo: function(d) {
				return "LS_querystring\x3d" + encodeURIComponent(d)
			}
		};
		f(e, h);
		return e
	});
	define("lscd", ["lsce", "Inheritance"], function(h, f) {
		function e() {}
		e.prototype = {
			toString: V("[LegacyEncoder]"),
			gh: V(".html"),
			Yo: u()
		};
		f(e, h);
		return e
	});
	define("lscAB", "lscAI lscAA Inheritance IFrameHandler Executor Environment LoggerManager lscd lscA lscG".split(" "), function(h, f, e, d, b, c, a, g, l, n) {
		function k(a) {
			this._callSuperConstructor(k);
			a && (this.target = n.nk(a), d.getFrameWindow(a, !0));
			this.k = !1;
			this.Q = k;
			this.tj = 0
		}
		var m = new g,
			p = a.getLoggerProxy(l.eb);
		h.kc(k, {
			ya: function() {
				return c.isBrowserDocument()
			},
			Aa: !0,
			za: !0,
			ic: !0,
			jc: !0,
			mc: !1
		});
		k.prototype = {
			toString: function() {
				return ["[|FormConnection", this.target, "]"].join("|")
			},
			aa: function() {
				p.logDebug(a.resolve(199));
				this.k = !1;
				this.tj++
			},
			ua: function(c, g, d, e) {
				if(this.k) return null;
				this._callSuperMethod(k, this.ii, [c, g, d, e]);
				try {
					this.tj++;
					var f = this.nw();
					if(!f) return !1;
					p.logDebug(a.resolve(200), c.Wa());
					f.Oc.method = c.Dg;
					f.Oc.target = this.target;
					f.Oc.action = c.Wa();
					f.$j.value = c.getData();
					f.Oc.submit();
					b.addTimedTask(this.zv, 1E3, this, [f.Oc, this.tj]);
					return this.k = !0
				} catch(l) {
					return p.logDebug(a.resolve(201), l), !1
				}
			},
			nw: function() {
				var a = document.getElementsByTagName("BODY")[0];
				if(!a) return null;
				var b = {};
				b.Oc = document.createElement("FORM");
				try {
					b.Oc.acceptCharset = "utf-8"
				} catch(c) {}
				b.Oc.style.display = "none";
				b.$j = document.createElement("INPUT");
				b.$j.type = "hidden";
				b.$j.name = "LS_querystring";
				b.Oc.appendChild(b.$j);
				a.appendChild(b.Oc);
				return b
			},
			zv: function(a, b) {
				a.parentNode.removeChild(a);
				b == this.tj && (this.k = !1)
			},
			ne: function() {
				return m
			}
		};
		e(k, f);
		return k
	});
	define("lscAC", "lscAI lscAA lscAH Inheritance IFrameHandler Executor EnvironmentStatus Environment lscAB LoggerManager lscd lscA lscG".split(" "), function(h, f, e, d, b, c, a, g, l, n, k, m, p) {
		function q(a) {
			this._callSuperConstructor(q);
			this.target = p.nk(a);
			this.Gc = 0;
			this.k = !1;
			this.$i = null;
			b.getFrameWindow(this.target, !0);
			this.Q = q
		}
		var s = new k,
			t = n.getLoggerProxy(m.eb);
		h.kc(q, {
			ya: function() {
				return g.isBrowserDocument()
			},
			Aa: !1,
			za: !1,
			ic: !0,
			jc: !0,
			yf: !0,
			mc: !1
		});
		q.prototype = {
			toString: function() {
				return ["[|FrameConnection", this.k, this.target, this.Gc, this.$i, "]"].join("|")
			},
			mu: function(a) {
				a == this.Gc && (this.Gc++, this.k && (this.vp(this.Gc, e.tu), this.k = !1))
			},
			aa: function() {
				t.logDebug(n.resolve(202));
				var a = ++this.Gc;
				c.addTimedTask(this.mu, 0, this, [a])
			},
			vp: function(c, g, d, e, k) {
				if(c == this.Gc && !a.isUnloading()) {
					this._callSuperMethod(q, this.ii, [g, d, e, k]);
					this.Gc++;
					t.logDebug(n.resolve(203), g.Wa());
					try {
						b.getFrameWindow(this.target).location.replace(g.Ex()), this.k = !0
					} catch(f) {
						return t.logDebug(n.resolve(204), f), !1
					}
					return !0
				}
			},
			Iy: function(a, b, c, g) {
				this.$i || (this.$i = new l(this.target));
				this.Gc++;
				if(a = this.$i.ua(a, b, c, g)) this.k = !0;
				return a
			},
			ua: function(a, b, g, d) {
				if(a.method == e.gi) return this.Iy(a, b, g, d);
				var k = ++this.Gc;
				c.addTimedTask(this.vp, 0, this, [k, a, b, g, d]);
				return !0
			},
			ne: function() {
				return s
			}
		};
		d(q, f);
		return q
	});
	define("lscy", "LoggerManager lscAC lscAH lscG Executor EnvironmentStatus IFrameHandler Global Environment Inheritance Dismissable lscA Helpers".split(" "), function(h, f, e, d, b, c, a, g, l, n, k, m, p) {
		function q(a) {
			this.path = a;
			this.Gg = p.randomG();
			this.status = l.isBrowserDocument() && (window.ActiveXObject || "undefined" != typeof XMLHttpRequest) ? 2 : -1;
			this.pi = ++t;
			this.Pc = "LS_AJAXFRAME_" + this.pi;
			this.initTouches();
			this.Nu()
		}
		var s = h.getLoggerProxy(m.eb),
			t = 0,
			r = {};
		q.rw = function(a) {
			r[a] || (r[a] = new q(a), r[a].ua(!1));
			return r[a]
		};
		q.prototype = {
			toString: function() {
				return ["[|AjaxFrameHandler", this.status, "]"].join("|")
			},
			Nu: function() {
				var a = this;
				g.xa(this.pi, "LS_a", function(b) {
					a.lz(b)
				}, "A")
			},
			clean: function() {
				this.status = -1;
				g.Kl(this.pi, "LS_a", "A");
				var b = this.path;
				r[b] && delete r[b];
				a.disposeFrame(this.Pc)
			},
			ea: function(a) {
				this.Gg++;
				this.status = a ? 3 : 0
			},
			ua: function(a) {
				if(-1 != this.status && (s.logDebug(h.resolve(205)), !this.zd())) {
					this.ea(a);
					a = this.Gg;
					d.Dr() && s.logDebug(h.resolve(206));
					var c = "id\x3d" + this.pi + "\x26";
					d.Pm() || (c += "domain\x3d" + d.qc() + "\x26");
					c = new e(this.path, "xhr.html", c);
					(new f(this.Pc)).ua(c);
					b.addTimedTask(this.kw, 1E4, this, [a]);
					b.addTimedTask(this.Ix, 2E3, this, [a])
				}
			},
			lz: function() {
				c.isUnloaded() || 1 == this.status || (s.logDebug(h.resolve(207)), this.status = 1)
			},
			kw: function(a) {
				-1 == this.status || (this.Gg != a || this.zd()) || (s.logDebug(h.resolve(208)), this.ua(!0))
			},
			Ix: function(a) {
				-1 == this.status || (this.Gg != a || this.zd()) || (s.logDebug(h.resolve(209)), this.status = 4)
			},
			disable: function() {
				this.status = -1;
				this.Gg++
			},
			zd: function() {
				return 1 === this.status
			},
			zr: function() {
				return -1 === this.status || 3 === this.status || 4 === this.status
			},
			MA: function(b, c, g, d) {
				if(this.zr()) return !1;
				if(1 !== this.status) return null;
				s.logDebug(h.resolve(210), b);
				var e;
				try {
					e = !1 !== a.getFrameWindow(this.Pc).sendRequest(b, c, g, d)
				} catch(k) {
					e = !1, s.logDebug(h.resolve(211), k)
				}!1 === e && this.disable();
				return e
			}
		};
		n(q, k, !0, !0);
		return q
	});
	define("lscAL", "lscAI Inheritance lscy EnvironmentStatus Executor Environment LoggerManager lscA".split(" "), function(h, f, e, d, b, c, a, g) {
		function l() {
			this._callSuperConstructor(l);
			this.error = this.response = this.lc = this.sender = this.t = null;
			this.k = !1;
			this.a = 0;
			this.LS_x = this.uz;
			this.Uc = null;
			this.Q = l
		}
		var n = a.getLoggerProxy(g.eb);
		h.kc(l, {
			ya: function() {
				return c.isBrowserDocument() && (window.ActiveXObject || "undefined" != typeof XMLHttpRequest)
			},
			Aa: !1,
			za: !1,
			ic: !0,
			jc: !1,
			mc: !0
		});
		l.prototype = {
			toString: function() {
				return ["[|XHRConnection", this.k, this.a, this.t, "]"].join("|")
			},
			ua: function(b, c, g, d, f) {
				this.Uc = e.rw(b.gc);
				if(this.Uc.zr()) return this.Uc.dismiss(), !1;
				if(!this.Uc.zd() || this.k) return null;
				this.Uc.touch();
				this.t = c;
				this.lc = null;
				this.response = g;
				this.error = d;
				this.bq = f;
				this.a++;
				var l = this,
					h = this.a;
				this.LS_h = function() {
					l.ws(h)
				};
				this.k = !0;
				n.logDebug(a.resolve(212), b.Wa());
				return this.Uc.MA(b.Wa(), b.getData(), this, b.Gq)
			},
			aa: function() {
				if(this.k) {
					this.Ya();
					n.logDebug(a.resolve(213));
					try {
						this.sender && this.sender.abort && this.sender.abort()
					} catch(b) {
						n.logDebug(a.resolve(214), b)
					}
					this.Fi()
				}
			},
			xf: function() {
				try {
					if(null === this.lc) {
						if(2 > this.sender.readyState) return !1;
						this.lc = 200 <= this.sender.status && 299 >= this.sender.status
					}
					return this.lc
				} catch(b) {
					return n.logDebug(a.resolve(215), b), !1
				}
			},
			ws: function(c) {
				d.isUnloaded() || (c != this.a || !this.sender) || 4 != this.sender.readyState && "complete" != this.sender.readyState || (c = null, this.xf() && (c = this.sender.responseText, c = c.toString(), "/*" == c.substring(0, 2) && (c = c.substring(2, c.length - 2))), n.isDebugLogEnabled() && n.logDebug(a.resolve(216), c), this.response && b.executeTask(this.response, [c, this.t]), b.addTimedTask(this.Mf, 100, this, [this.t]), this.Ya(), this.Fi())
			},
			Mf: function(a) {
				b.executeTask(this.bq, [a])
			},
			uz: function() {
				d.isUnloaded() || (this.Uc.disable(), n.logDebug(a.resolve(217)), this.Ya(), this.error && b.executeTask(this.error, ["xhr.unknown", this.t]), this.Fi())
			},
			Fi: function() {
				try {
					delete this.sender.onreadystatechange
				} catch(b) {
					n.logDebug(a.resolve(218), b)
				}
				try {
					delete this.sender
				} catch(c) {
					n.logDebug(a.resolve(219), c)
				}
				this.response = this.error = null;
				this.Uc && this.Uc.dismiss()
			},
			Ya: function() {
				this.k = !1;
				this.a++
			}
		};
		f(l, h);
		return l
	});
	define("lscAM", "lscAI lscAL Inheritance EnvironmentStatus Executor BrowserDetection lscAJ Environment LoggerManager lscA".split(" "), function(h, f, e, d, b, c, a, g, l, n) {
		function k() {
			this._callSuperConstructor(k);
			this.Db = null;
			this.Q = k
		}
		var m = l.getLoggerProxy(n.eb),
			p = null;
		h.kc(k, {
			ya: function() {
				return null !== p ? p : p = g.isBrowserDocument() ? c.isProbablyIE() ? !1 : "undefined" != typeof XMLHttpRequest ? "undefined" != typeof(new XMLHttpRequest).addEventListener : !1 : !1
			},
			yf: function() {
				return !c.isProbablyOldOpera()
			},
			Aa: !1,
			za: !1,
			ic: !0,
			jc: !1,
			mc: !0
		});
		k.prototype = {
			toString: function() {
				return ["[|XHRStreamingConnection", this.k, this.a, this.t, "]"].join("|")
			},
			ua: function(b, c, g, d, e) {
				b = this._callSuperMethod(k, this.ii, [b, c, g, d, e]);
				m.logDebug(l.resolve(220));
				b && (this.Db = new a);
				return b
			},
			ws: function(a) {
				!d.isUnloaded() && (a == this.a && this.sender) && (a = null, this.xf() && this.response && (3 == this.sender.readyState ? a = this.Db.yo(this.sender.responseText) : 4 == this.sender.readyState && (a = this.Db.xo(this.sender.responseText)), m.isDebugLogEnabled() && m.logDebug(l.resolve(221), a), null != a && b.executeTask(this.response, [a, this.t])), 4 == this.sender.readyState && (!this.xf() && this.response && b.executeTask(this.response, [null, this.t]), m.isDebugLogEnabled() && m.logDebug(l.resolve(222)), 4 != this.sender.readyState && "" != a || !this.bq || b.addTimedTask(this.Mf, 100, this, [this.t]), this.Ya(), this.Fi()))
			}
		};
		e(k, f);
		return k
	});
	define("lscE", ["Executor", "IFrameHandler", "Global", "BrowserDetection", "lscG"], function(h, f, e, d, b) {
		function c(c) {
			this.sm = c;
			this.ob = !1;
			this.hn = b.qc();
			this.qq = this.Wi = !1;
			this.Ej = -1;
			this.wq = c = b.nk(this.cr() + "_" + this.hn);
			h.addTimedTask(this.ev, 3E3, this);
			var d = "about:blank";
			this.Hj() && (this.Ej = ++a, d = e.xa(this.Ej, "EQCallback_" + c, this.Gx(), "Q"), d = "javascript:(function(){document.open();" + ("document.domain\x3d'" + b.qc() + "';") + ("parent." + d + "(window);") + "document.close();})()");
			try {
				this.pc = f.getFrameWindow(c, !0, d), this.Sy() ? h.addTimedTask(this.im, 1, this) : this.Hj() || this.im()
			} catch(n) {}
		}
		var a = 0;
		c.prototype = {
			br: V(null),
			di: V(!0),
			ka: function() {
				h.addTimedTask(f.disposeFrame, 0, f, [this.wq]);
				null !== this.Ej && e.Kl(this.Ej, "EQCallback_" + this.wq, "Q");
				this.qq = !0
			},
			mg: function() {
				return this.Wi || this.qq ? !1 : b.qc() == this.hn ? !0 : this.rn() ? !1 : !0
			},
			zd: L("ob"),
			im: function() {
				var a = this.br();
				this.Hj() ? this.pc.document.write("\x3cscript\x3edocument.domain\x3d'" + this.hn + "';\x3c/script\x3e") : d.isProbablyOldOpera() && !a || this.pc.document.open();
				a && this.pc.document.write(a);
				this.Hj() || d.isProbablyOldOpera() && !a || this.pc.document.close();
				this.ob = this.di()
			},
			Gx: function() {
				var a = this;
				return function(b) {
					a.pc = b;
					a.im()
				}
			},
			Hj: function() {
				return d.isProbablyIE() && !b.Pm()
			},
			rn: function() {
				return d.isProbablyIE() || d.isProbablyOldOpera() || d.isProbablyKonqueror(4.4, !0)
			},
			Sy: function() {
				return d.isProbablyKonqueror()
			},
			ou: function(a, b) {
				this.Wi = !0;
				this.sm && (this.sm.De = [a, b], h.executeTask(this.sm))
			},
			ev: function() {
				this.ob || this.ou(5)
			}
		};
		return c
	});
	define("lscAG", "LoggerManager Executor lscE Inheritance Dismissable lscA Helpers".split(" "), function(h, f, e, d, b, c, a) {
		function g(a, b) {
			this.qu = a;
			this._callSuperConstructor(g, [b]);
			this.Rg = null;
			this.initTouches()
		}

		function l(a, b, c) {
			try {
				a.appendChild(b), b.src = c
			} catch(g) {}
		}
		var n = h.getLoggerProxy(c.eb);
		g.prototype = {
			toString: V("[JSONPFrame]"),
			Mu: function(a, b) {
				try {
					var c = this.Dw();
					if(!c) return c;
					var g = this.pc.document.createElement("script");
					g.id = a;
					g.type = "text/javascript";
					f.addTimedTask(l, 50, null, [c, g, b])
				} catch(d) {
					return n.logDebug(h.resolve(223), d), !1
				}
				return !0
			},
			Dv: function(a) {
				var b = this.pc.document.getElementById(a);
				f.addTimedTask(function() {
					b && b.parentNode && b.parentNode.removeChild(b)
				}, 4E3)
			},
			clean: function() {
				this.ka()
			},
			Dw: function() {
				if(this.Rg) return this.Rg;
				this.Rg = this.pc.document.getElementsByTagName("BODY")[0];
				if(!this.Rg) {
					if(this.kf) return 2E3 < a.getTimeStamp() - this.kf ? !1 : null;
					this.kf = a.getTimeStamp();
					return null
				}
				return this.Rg
			},
			cr: function() {
				return "LS6__JF_" + this.qu
			}
		};
		d(g, e);
		d(g, b, !0, !0);
		return g
	});
	define("lscc", ["lsce", "Inheritance"], function(h, f) {
		function e() {}
		e.prototype = {
			toString: V("[JSONPEncoder]")
		};
		f(e, h);
		return e
	});
	define("lscAF", "lscAI lscAA Inheritance Helpers Environment lscAG Executor LoggerManager lscc lscA".split(" "), function(h, f, e, d, b, c, a, g, l, n) {
		function k(b) {
			this._callSuperConstructor(k);
			this.originalTarget = b;
			this.target = b + d.randomG();
			this.Nb = new c(this.target, a.packTask(this.Zr, this));
			this.Qi = 0;
			this.Zn = "script_" + d.randomG();
			this.kf = null;
			this.Ep = !1;
			this.Mq = !0;
			this.Q = k
		}
		var m, p;
		for(p in {
				tk: !0
			}) m = p;
		var q = g.getLoggerProxy(n.eb),
			s = /(^|&)LS_domain=[^&]*/,
			t = new l;
		h.kc(k, {
			ya: function() {
				return b.isBrowserDocument()
			},
			Aa: !0,
			za: !0,
			ic: !0,
			jc: !0,
			mc: !1
		});
		k.prototype = {
			toString: function() {
				return ["[|JSONPConnection", this.target, this.Zn, this.kf, "]"].join("|")
			},
			Zr: function() {
				this.Ep = !0
			},
			tk: function(a, b, c, g, d, e) {
				(this.Mq || 10 == this.Qi) && a.Ti("LS_force_head\x3dtrue\x26");
				this.Mq = !1;
				var f = a.getData(),
					f = f.replace(s, "");
				0 == f.indexOf("\x26") && (f = f.substring(1));
				a.setData(f);
				return this._callSuperMethod(k, m, [a, b, c, g, d, e])
			},
			ua: function(b, e, f, l) {
				this.aa();
				if(this.Ep) return !1;
				if(!this.Nb.mg() && this.Nb.rn() || 10 == this.Qi) this.Nb.ka(), this.Qi = 0, this.target = this.originalTarget + d.randomG(), this.Nb = new c(this.target, a.packTask(this.Zr, this));
				if(!this.Nb.zd()) return null;
				this.Qi++;
				q.logDebug(g.resolve(224), b.Wa());
				var h = b.Wa(),
					n = b.getData(),
					h = this.Nb.Mu(this.Zn, h + "?" + n);
				if(!h) return h;
				this.Nb.touch();
				this._callSuperMethod(k, this.ii, [b, e, f, l]);
				return !0
			},
			aa: function() {
				this.Nb.dismiss();
				if(this.Nb.mg() || !this.Nb.rn()) {
					q.logDebug(g.resolve(225));
					try {
						this.Nb.Dv(this.Zn)
					} catch(a) {}
				}
			},
			ne: function() {
				return t
			}
		};
		e(k, f);
		return k
	});
	define("lscz", "LoggerManager lscAN lscAE lscAM lscAL lscAC lscAF lscAB lscAA lscAK lscA".split(" "), function(h, f, e, d, b, c, a, g, l, n, k) {
		function m(a, b, c) {
			this.jn = a;
			this.Tu = b;
			this.Jp = c;
			this.Xj = -1
		}

		function p() {
			return !1
		}
		var q = h.getLoggerProxy(k.eb);
		m.MC = function() {
			n.ya = p
		};
		m.NC = function() {
			f.ya = p;
			e.ya = p;
			d.ya = p;
			b.ya = p
		};
		m.LC = function() {
			g.ya = p;
			c.ya = p
		};
		m.qp = [];
		k = [f, e, d, c];
		for(var s = 0; s < k.length; s++) k[s].yf() && m.qp.push(k[s]);
		m.Zt = [f, e, b, a, g];
		m.xg = [f, e, b, a, c];
		m.ey = function(a) {
			return a.Q === c
		};
		m.SC = function(a) {
			return a.Q.prototype.Cd != l.prototype.Cd
		};
		m.wf = function(a, b, c, g, d, e, f) {
			q.logDebug(h.resolve(226), b);
			if(!b.ya(a)) return q.logDebug(h.resolve(227)), !1;
			if(c && !b.Aa()) return q.logDebug(h.resolve(228)), !1;
			if(g && !b.ic()) return q.logDebug(h.resolve(229)), !1;
			if(d && !b.za()) return q.logDebug(h.resolve(230)), !1;
			if(e && !b.mc()) return q.logDebug(h.resolve(231)), !1;
			if(a = f) {
				a: {
					for(a = 0; a < f.length; a++)
						if(f[a] == b) {
							b = !0;
							break a
						}
					b = !1
				}
				a = !b
			}
			if(a) return q.logDebug(h.resolve(232)), !1;
			q.logDebug(h.resolve(233));
			return !0
		};
		m.prototype = {
			Rm: function() {
				return this.Xj < this.jn.length - 1
			},
			hr: function(a, b, c, g, d) {
				for(q.logDebug(h.resolve(234), a, b, c, g, d); this.Rm();) {
					this.Xj++;
					var k = this.jn[this.Xj];
					if(!((this.Jp || this.Tu) && k === e || this.Jp && k === f || !this.wf(a, k, b, c, g, d))) return k
				}
				return null
			},
			wf: function(a, b, c, g, d, e) {
				return m.wf(a, b, c, g, d, e, this.jn)
			},
			Dc: function() {
				q.logDebug(h.resolve(235));
				this.Xj = -1
			}
		};
		return m
	});
	define("lscAD", ["lscAC", "BrowserDetection", "IFrameHandler", "Executor"], function(h, f, e, d) {
		function b() {
			this.Gj = !1
		}
		b.prototype = {
			hA: function(b) {
				(this.Gj = b === h) && e.getFrameWindow("LS6__HOURGLASS", !0)
			},
			QB: function() {
				d.addTimedTask(this.RB, 900, this)
			},
			RB: function() {
				if(this.Gj && (this.Gj = !1, !f.isProbablyAKhtml() && !f.isProbablyIE(6, !0) && !f.isProbablyIE(9, !1))) try {
					window.open("about:blank", "LS6__HOURGLASS", null, !0)
				} catch(b) {}
			}
		};
		return b
	});
	define("lscs", "lscA Inheritance lscr lscz lscAD lscAH lscG lscq Executor LoggerManager BrowserDetection EnvironmentStatus lscAE lscAN".split(" "), function(h, f, e, d, b, c, a, g, l, n, k, m, p, q) {
		function s(a, b, c, g, d, e) {
			this._callSuperConstructor(s, arguments);
			this.Ye = this.Fj = this.oc = this.va = this.hq = null;
			this.ag(e)
		}

		function t(a) {
			a && a != y || (y++, z = D)
		}
		var r = {
				Kb: "createSession",
				be: "bindSession",
				kg: "shutdown",
				Kg: "bindSent",
				T: "onEvent",
				pa: "onErrorEvent"
			},
			r = a.getReverse(r),
			D = 1,
			z = 1,
			y = 1,
			w = n.getLoggerProxy(h.Yd),
			x = n.getLoggerProxy(h.Te);
		s.prototype = {
			ag: function(a) {
				a = a || !this.b.Ii;
				this.hq = new d(d.xg, !1, a);
				this.oc = this.J ? new d(d.xg, !1, a) : new d(d.qp, !this.b.Zo, a);
				this.va = null
			},
			Wq: function() {
				return this.J ? h.Wd : h.vg
			},
			$q: function() {
				return this.J ? h.Wd : h.yg
			},
			toString: function() {
				return ["[|SessionHTTP", this.J, this.le, this.a, this.qa, this.Pa, this.sg, this.Ia, this.fd, this.dd, "]"].join("|")
			},
			Kb: function(a, b) {
				if(!this._callSuperMethod(s, r.createSession, [a, b])) return !1;
				this.bm(this.qa, b, a);
				return !0
			},
			bm: function(b, c, g) {
				if(b == this.qa) {
					this.e.oq();
					if(a.Dr()) {
						if(0 >= z) {
							w.logDebug(n.resolve(237));
							l.addTimedTask(this.bm, 3E3, this, [b, g, "offline"]);
							return
						}
						z--;
						0 == z && l.addTimedTask(t, 2E4, null, [y])
					}
					b = this.Eq(g, this.bm, c);
					null !== b && (b ? this.am() : !1 === b && (w.logWarn(n.resolve(236)), this.pa("no_impl_available", !0, !1, !1, !0)))
				}
			},
			be: function(a) {
				if(!this._callSuperMethod(s, r.bindSession, [a])) return !1;
				this.Ye && this.Ye.aa();
				this.ew();
				this.si(this.qa, a);
				return !0
			},
			ew: function() {
				if(!m.isLoaded() && (null === this.b.Dk && (k.isProbablyAndroidBrowser() || k.isProbablyApple()) || !0 === this.b.Dk)) {
					var a = this.$e,
						b = this;
					m.addOnloadHandler(function() {
						l.addTimedTask(function() {
							a == b.$e && b.a == e.eu && b.Zi("spinfix")
						}, b.b.to)
					})
				}
			},
			si: function(a, c) {
				if(a == this.qa) {
					this.Fj || this.J || (this.Fj = new b);
					var g = this.Eq(null, this.si, c);
					null !== g && (g ? this.Kg() : !1 !== g || this.J || this.Xc(this.K, "streaming.unavailable"))
				}
			},
			qe: function() {
				this.a != e.ll && (this.a != e.Ud && this.a != e.jl) && (0 < this.b.kk && !this.J ? this.R.MB(this.b.kk) : this.R.At())
			},
			kg: function(a) {
				this._callSuperMethod(s, r.shutdown, [a]);
				this.Ye && this.Ye.aa()
			},
			bh: function(a, b, d) {
				var f = this.a == e.ll || this.a == e.jl,
					k = this.xb(),
					k = new c(k + h.gl);
				k.Nh(this.b.Tb());
				k.Ph(this.b.Yg(f));
				var l = !k.za() && !k.Aa();
				a = g.hx(this.Pa, this.Ia, this.b, this.Ta, f, this.J, a, b, this.xc.Cm(), d, l);
				k.setData(a);
				x.logDebug(n.resolve(238), k);
				return k
			},
			Eq: function(a, b, f) {
				var k = this.a == e.ll || this.a == e.jl,
					h = !k,
					r = this.bh(a, f, !0),
					t = this.xb();
				this.R.tl(null);
				this.va && this.va.Q == p && (this.va = null);
				var s = k ? this.hq : this.oc;
				this.va && !s.wf(t, this.va.Q, r.Aa(), this.b.Tb(), r.za(), this.b.lh(k)) && (s.Dc(), this.va = null);
				for(var m = !1, q = (this.J ? "LS6__POLLFRAME" : "LS6__PUSHFRAME") + "_" + this.Mb;
					(this.va || s.Rm()) && !1 === m;) {
					if(!this.va) {
						m = s.hr(t, r.Aa(), this.b.Tb(), r.za(), this.b.lh(k));
						if(!m) return s.Dc(), !1;
						this.va = new m(q)
					}
					r.xk(d.ey(this.va) && h ? c.ju : c.gi);
					r.ig(g.jr(k, this.J, this.va.ne().gh()));
					m = this.va.tk(r, this.Pa, this.Dl, this.Cl, this.Bl, this.Mb);
					if(null === m) return w.logDebug(n.resolve(239)), l.addTimedTask(b, 50, this, [this.qa, f, a]),
						null;
					!1 === m ? this.va = null : (w.logDebug(n.resolve(240)), s.Dc(), this.Ye = this.va)
				}
				return m
			},
			Kg: function() {
				this._callSuperMethod(s, r.bindSent);
				this.qn() && this.Fj.hA(this.Ye.Q)
			},
			qn: function() {
				return !this.J
			},
			pa: function(a, b, c, g, d) {
				!g || this.va.Q != q && this.va.Q != p || this.e.oz(this.K);
				this._callSuperMethod(s, r.onErrorEvent, arguments)
			},
			T: function() {
				this.a == e.ip && t();
				!this.qn() || this.a != e.Yt && this.a != e.ip || this.Fj.QB();
				this._callSuperMethod(s, r.onEvent)
			}
		};
		f(s, e);
		return s
	});
	define("lscu", "lscA lscr lscs Inheritance lscAK lscz lscq Executor LoggerManager ASSERT lscAH lscG".split(" "), function(h, f, e, d, b, c, a, g, l, n, k, m) {
		function p(a, b, c, g, d, e) {
			this._callSuperConstructor(p, arguments);
			this.V = null;
			this.cc = 1;
			this.Uf = null;
			this.qf = !1
		}
		var q = {
				am: "createSent",
				Ed: "onTimeout",
				wn: "onLoop",
				En: "onStreamError",
				Dn: "onStreamEnd",
				pa: "onErrorEvent",
				kg: "shutdown"
			},
			q = m.getReverse(q),
			s = l.getLoggerProxy(h.Yd);
		p.prototype = {
			toString: function() {
				return ["[|SessionWS",
					this.J, this.le, this.a, this.qa, this.Pa, this.cc, this.sg, this.Ia, this.V, this.fd, this.dd, "]"
				].join("|")
			},
			de: G("cc"),
			Wq: function() {
				return this.J ? h.Cg : h.fi
			},
			$q: function() {
				return h.yg
			},
			Kn: function() {
				n.verifyValue(this.cc, 1) || s.logError(l.resolve(241));
				this.Uf = this.Pa;
				this.V = new b(this);
				var a = this.xb(),
					g = new k(a + h.gl);
				g.Nh(this.b.Tb());
				g.Ph(this.b.Yg(!1));
				if(c.wf(a, b, g.Aa(), this.b.Tb(), g.za(), this.b.lh(!1)) && (s.logDebug(l.resolve(248)), this.V.Vz(g, this.Uf, this.Dl, this.Cl, this.Bl))) return this.R.tl(this.V),
					this.de(2), !0;
				this.de(5);
				return !1
			},
			am: function() {
				this._callSuperMethod(p, q.createSent);
				this.b.km && !this.qf && this.Kn()
			},
			si: function(c, d) {
				if(c == this.qa)
					if(this.qf = !1, 1 == this.cc ? this.Kn() : 2 != this.cc || this.V.Xx(this.xb()) || (s.logWarn(l.resolve(246)), this.V.aa(), this.de(1), this.Kn()), 6 == this.cc) this.Xc(this.K, "ws.early.closed");
					else if(5 == this.cc) this.Xc(this.K, "ws.notgood");
				else if(3 == this.cc) b.dm(this.xb()), this.Xc(this.K, "ws.early.openfail");
				else {
					var e = this.bh(null, d, !1),
						f = !1;
					e.ig(a.jr(!1, this.J, this.V.ne().gh()));
					var k = !1;
					2 == this.cc ? (f = this.V.tk(e, this.Pa, this.Dl, this.Cl, this.Bl, this.Mb), k = !0) : 4 == this.cc ? f = this.V.Eg(e, this.Pa) : (n.fail(), s.logError(l.resolve(242), this));
					null === f ? (s.logDebug(l.resolve(249)), g.addTimedTask(this.si, 50, this, [c, d])) : !1 === f ? (s.logWarn(l.resolve(247)), this.Xc(this.K, "ws.false")) : k || (s.logDebug(l.resolve(250)), this.Kg())
				}
			},
			dw: function(a) {
				this.Uf == a && (s.logDebug(l.resolve(251)), this.Kg(), this.de(4))
			},
			Ed: function(a, b, c) {
				a == this.qa && (this.a == f.Ud && (this.qf = !0), this._callSuperMethod(p, q.onTimeout, [a, b, c]))
			},
			wn: function(a) {
				this._callSuperMethod(p, q.onLoop, [a]);
				this.V && this.V.Rt(this.Pa)
			},
			En: function(a, b, c, g) {
				c ? b == this.Uf && this._callSuperMethod(p, q.onStreamError, [a, this.Pa, c, g]) : (this.a == f.Ud && (this.qf = !0), this._callSuperMethod(p, q.onStreamError, arguments))
			},
			Dn: function(a, b) {
				b ? a == this.Uf && (this.a == f.cu || this.a == f.Ud || this.a == f.hp ? this.pa("ws.early.end", !1, !0) : (n.verifyDiffValue(this.a, f.jp) || s.logError(l.resolve(243), this), this._callSuperMethod(p, q.onStreamEnd, [this.Pa, b]))) : (this.a == f.Ud && (this.qf = !0), this._callSuperMethod(p, q.onStreamEnd, arguments))
			},
			pa: function(a, c, g, d, e) {
				g ? (n.verifyDiffValue(this.cc, 1) || s.logError(l.resolve(244), this), d ? this.de(3) : this.de(6), this.a == f.cu || this.a == f.Ud || this.a == f.hp ? s.logDebug(l.resolve(252), this) : this.a == f.jp ? (s.logDebug(l.resolve(253), this), d && b.dm(this.xb()), this.Xc(this.K, "ws.error." + a)) : this.J && this.a == f.du ? (n.verifyNotOk(d) || s.logError(l.resolve(245), this), s.logDebug(l.resolve(254), this), this.wa(a, c, !1), this.Ed(this.qa, 0, "ws.broken.wait")) : this._callSuperMethod(p, q.onErrorEvent, arguments)) : (this.a == f.Ud && (this.qf = !0), this._callSuperMethod(p, q.onErrorEvent, arguments))
			},
			kg: function(a) {
				this._callSuperMethod(p, q.shutdown, [a]);
				this.V && (this.Uf = null, this.V.aa(), this.V = null, this.R.tl(null));
				this.de(1)
			},
			qn: V(!1),
			qe: function() {
				this.R.At()
			}
		};
		d(p, e);
		return p
	});
	define("lscm", ["Global", "LoggerManager", "EnvironmentStatus", "ASSERT", "lscA"], function(h, f, e, d, b) {
		function c(a, b) {
			this.aC = b;
			this.Xv(a)
		}
		var a = f.getLoggerProxy(b.Te),
			g = !1;
		c.HB = function(a) {
			g = a
		};
		c.prototype = {
			ce: function(b) {
				a.logDebug(f.resolve(256), b);
				this.f = b
			},
			Xv: function(a) {
				var b = this;
				h.xa(a, "LS_e", function(a, c, g, d, e, f, h, l) {
					b.Ez(a, c, g, d, e, f, h, l)
				});
				h.xa(a, "LS_t", E());
				h.xa(a, "LS_u", function(a, c, g) {
					b.Es(a, c, g)
				});
				h.xa(a, "LS_v", function(a, c) {
					b.Es(a, c, !0)
				});
				h.xa(a, "LS_o", function(a, c) {
					b.Dd(a, c)
				});
				h.xa(a, "LS_n", function(a, c) {
					b.Yb(a, c)
				});
				h.xa(a, "LS_s", function(a, c) {
					b.Xb(a, c)
				});
				h.xa(a, "LS_l", function(a, c, g, d) {
					b.pa(a, c, g, d)
				});
				h.xa(a, "LS_w", function(a, c, g, d, e, f, h) {
					b.nz(a, c, g, d, e, f, h)
				});
				h.xa(a, "setTimeout", function(a, b) {
					setTimeout(a, b)
				});
				h.xa(a, "alert", function(a) {
					"undefined" != typeof alert ? alert(a) : "undefined" != typeof console && console.log(a)
				})
			},
			wc: function(b, c, d, h) {
				var p = !g && !e.isUnloaded() && null != this.f;
				p && b && (p &= this.f.ja(b));
				p && c && (p &= this.aC.ja(c));
				p && !h && (p = d ? p & this.f.wy() : p & this.f.Er());
				a.isDebugLogEnabled() && a.logDebug(f.resolve(257), p);
				return p
			},
			Ez: function(a, b, c, g, d, e, f, h) {
				if(this.wc(b, null, 1 == a, 3 == a || 4 == a))
					if(1 == a) this.f.Bz(c, g, e, d, f, h);
					else if(2 == a) this.f.yz(c);
				else if(3 == a) this.f.Fn("syncerror");
				else if(4 == a) {
					a = 30;
					if(null != c) {
						a = c;
						if(41 == a) {
							this.f.tz();
							return
						}
						if(48 == a) {
							this.f.Fn("expired");
							return
						}
						if(0 < a && 30 > a || 39 < a) a = 39
					}
					this.pa(a, b, null, "The session has been forcibly closed by the Server")
				} else 5 == a ? this.f.Hz(c) : this.f.js("Unsupported Server version")
			},
			Es: function(a, b, c) {
				2 > b.length ? this.wc(a) && this.f.xz() : this.wc(null, a) && this.f.Hn(b, c || !1)
			},
			Yb: function(a, b) {
				this.wc(null, a) && this.f.Yb(b)
			},
			Xb: function(a, b) {
				this.wc(null, a) && this.f.Xb(b)
			},
			Dd: function(a, b) {
				this.wc(null, a) && this.f.Dd(b)
			},
			zz: function(b, c, g, e) {
				if(this.wc())
					if(d.verifyValue(g.substring(0, 3), "MSG") || a.logError(f.resolve(255), g), g = g.substr(3), 39 == b)
						for(b = parseInt(e), c = parseInt(c), b = c - b + 1; b <= c; b++) this.f.Ae(g, b);
					else 38 == b ? this.f.Ae(g, c) : 0 >= b ? this.f.yn(g, b, e, c) : this.f.Qf(g, b, e, c)
			},
			pa: function(a, b, c, g) {
				null != c && isNaN(c) ? this.zz(a, b, c, g) : null != c ? this.wc(null, b) && this.f.Tf(c, a, g) : this.wc(b, null, null, !0) && this.f.Rf(a, g)
			},
			nz: function(b, c, g, d, e, h, s) {
				if(this.wc(null, 4 == b || 5 == b || 9 == b ? null : c))
					if(4 == b) this.f.xn(g, c);
					else if(5 == b) this.f.zn(g, c);
				else if(8 == b) this.f.onUnsubscription(g);
				else if(6 == b) this.f.onSubscription(g, d, e, h + 1, s + 1);
				else 9 == b ? this.f.Sf(g, c) : a.logDebug(f.resolve(258), b)
			}
		};
		return c
	});
	define("lscU", ["lscO"], function(h) {
		function f(e, d, b) {
			this.Qd = d;
			this.md = b;
			this.ga = e
		}
		f.prototype = {
			rh: function() {
				var e = this.ga.Rc(this.Qd);
				return e ? e.$m(this.Qd) : !0
			},
			Eu: function() {
				return this.ga.oy(this.Qd)
			},
			Cd: function() {
				if(this.md == h.Td) {
					var e = this.ga.Rc(this.Qd);
					e && e.fs(this.Qd);
					this.ga.Bu(this.Qd)
				} else this.md == h.Ue && this.ga.wA(this.Qd)
			},
			Jj: function() {
				this.ga.Wp(this.Qd)
			}
		};
		return f
	});
	define("lscv", ["LoggerManager", "Global", "Helpers", "ASSERT", "lscA"], function(h, f, e, d, b) {
		function c(a, b) {
			this.ek = 0;
			this.Na = null;
			this.nh = !1;
			this.b = a;
			this.d = null;
			this.Ru(b)
		}
		var a = h.getLoggerProxy(b.Te),
			g = h.getLoggerProxy(b.Yd);
		c.prototype = {
			toString: function() {
				return ["[", "lscv", this.Na, this.ek, 0.5, 7E3, "]"].join("|")
			},
			gy: function(a) {
				return null != this.Na && this.Na > a
			},
			ce: G("d"),
			Cm: function() {
				return null != this.Na && 0 < this.Na ? Math.round(this.Na) : null
			},
			at: function() {
				this.Na = null;
				this.nh = !1
			},
			jA: function() {
				this.nh = !1
			},
			iC: function(a) {
				this.Kt(a)
			},
			WB: function(b, c) {
				a.logDebug(h.resolve(262));
				this.d && this.d.ja(b) && (d.verifyOk(this.d.Er()) || a.logError(h.resolve(259)), this.d.uy() && (this.Kt(1E3 * c) ? this.b.so && this.d.Jz() : this.d.Qz()))
			},
			Ru: function(a) {
				var b = this;
				f.xa(a, "LS_s", function(a, c) {
					b.WB(a, c)
				})
			},
			NB: function(a) {
				a || this.at();
				this.ek = e.getTimeStamp()
			},
			Kt: function(a) {
				var b = e.getTimeStamp();
				if(!this.ek) return !0;
				a = b - this.ek - a;
				if(null == this.Na) return this.Na = a, g.logDebug(h.resolve(263)), !1;
				if(2E4 < a && a > 2 * this.Na && (this.nh = !this.nh)) return g.logInfo(h.resolve(260)), 7E3 < this.Na;
				this.Na = 0.5 * this.Na + 0.5 * a;
				if(60 > this.Na) return this.Na = 0, g.logDebug(h.resolve(264)), !1;
				if(this.gy(7E3)) return g.logInfo(h.resolve(261)), !0;
				g.logDebug(h.resolve(265));
				return !1
			}
		};
		return c
	});
	define("lscP", ["LoggerManager", "lscO", "ASSERT", "lscA"], function(h, f, e, d) {
		function b(a) {
			this.Eb = [];
			this.keys = {};
			this.ri = a;
			this.Oy = 0
		}
		var c = h.getLoggerProxy(d.zg);
		b.prototype = {
			toString: function() {
				return ["[|ControlRequestBatch", this.ri, this.Eb.length, "]"].join("|")
			},
			zp: function(a, b) {
				this.keys[a] = b;
				this.Eb.push(a)
			},
			Ze: function(a, b) {
				var d = a.md;
				if(d == f.Se || d == f.kd || d == f.Re) {
					if(this.ri != d) return c.logError(h.resolve(266), this), e.fail(), !1;
					this.zp(this.Oy++, a);
					return !0
				}
				if(this.ri != f.Td) return c.logError(h.resolve(267), this), e.fail(), !1;
				var n;
				switch(d) {
					case f.dl:
						n = "C";
						break;
					case f.fl:
						n = "F";
						break;
					case f.ep:
						n = "X" + a.getKey();
						break;
					default:
						n = a.getKey()
				}
				var k = this.keys[n];
				c.logDebug(h.resolve(271), this, n, a);
				if(k) {
					if(d == f.dl || d == f.fl) {
						b || (c.logDebug(h.resolve(272)), this.Ao(n, a));
						return
					}
					if(d == f.Ue) {
						k.He ? (c.logDebug(h.resolve(273)), b || this.Ao(n, a)) : k.md == f.Ue ? c.logDebug(h.resolve(274)) : (c.logDebug(h.resolve(275)), e.verifyNotOk(b) || c.logError(h.resolve(268), this), b || this.vA(n));
						return
					}
					if(d == f.Vd) {
						for(; k && a.He != k.He;) c.logDebug(h.resolve(276)), n += "_", k = this.keys[n];
						if(k) {
							c.logDebug(h.resolve(277));
							return
						}
					} else {
						b || (c.logDebug(h.resolve(278)), this.Ao(n, a));
						return
					}
				}
				c.logDebug(h.resolve(279));
				this.zp(n, a)
			},
			getLength: function() {
				return this.Eb.length
			},
			Ao: function(a, b) {
				this.keys[a] = b
			},
			Wn: function(a) {
				if(this.Eb.length <= a) return c.logError(h.resolve(269)), null;
				var b = this.Eb[a];
				this.Eb.splice(a, 1);
				a = this.keys[b];
				delete this.keys[b];
				return a
			},
			vA: function(a) {
				if(!this.keys[a]) return c.logError(h.resolve(270)),
					null;
				for(var b = 0; b < this.Eb.length; b++)
					if(this.Eb[b] == a) return this.Wn(b)
			},
			shift: function() {
				return this.Wn(0)
			},
			pop: function() {
				return this.Wn(this.Eb.length - 1)
			},
			Cf: function() {
				return this.Km(this.Eb.length - 1)
			},
			$g: function() {
				return this.Km(0)
			},
			Km: function(a) {
				return 0 >= this.Eb.length ? null : this.keys[this.Eb[a]]
			},
			vd: L("ri")
		};
		return b
	});
	define("lscN", "lscO lscP LoggerManager lscAH Executor lscz lscA ASSERT".split(" "), function(h, f, e, d, b, c, a, g) {
		function l() {
			this.a = this.$c = this.Lc = this.Ea = null
		}

		function n(a, b, c, g) {
			this.Sm = this.Ni = this.vj = this.$l = this.ln = this.La = this.oc = null;
			this.Hh = this.cg = 0;
			this.a = this.status = this.g = 1;
			this.bi = 0;
			this.n = null;
			this.bw = !1;
			this.ga = a;
			this.b = b;
			this.Va = c;
			this.V = null;
			this.ag(g);
			this.Dc()
		}
		var k = e.getLoggerProxy(a.zg),
			m = {
				1: "IDLE",
				2: "STAND BY",
				3: "WAITING RESP"
			};
		n.prototype = {
			toString: function() {
				return ["[|ControlConnectionHandler", m[this.status], this.n, this.Hh, "]"].join("|")
			},
			qB: function(a) {
				this.Hh = a;
				k.logDebug(e.resolve(297), this)
			},
			MB: function(a) {
				this.cg = a;
				k.logInfo(e.resolve(287), this);
				1 == this.status && this.ht(this.g)
			},
			ht: function(a) {
				1 == this.status && (this.g == a && 0 != this.cg) && (k.logDebug(e.resolve(298), this), this.Fc(null, "", h.Re))
			},
			At: function() {
				k.logInfo(e.resolve(288), this);
				this.cg = 0
			},
			ag: function(a) {
				this.oc = new c(c.Zt, !1, !this.b.Ii || a);
				this.La = null
			},
			aa: function() {
				k.logDebug(e.resolve(299));
				this.La && this.La.aa()
			},
			ia: function(a) {
				this.g++;
				1 == a && 0 < this.cg && b.addTimedTask(this.ht, this.cg, this, [this.g]);
				this.status = a
			},
			Dc: function() {
				k.logDebug(e.resolve(300), this);
				this.Hh = 0;
				this.ln = new f(h.Se);
				this.$l = new f(h.Td);
				this.Sm = new f(h.Re);
				this.V = null;
				this.cg = 0;
				this.vj || (this.vj = new f(h.kd));
				this.Ni || (this.Ni = new f(h.Td));
				this.hk = [this.ln, this.$l, this.vj, this.Ni, this.Sm];
				this.a++;
				var a = this.n ? this.n.vd() : null;
				null !== a && a !== h.Vd && a !== h.kd ? (g.verifyDiffValue(this.status, 1) || k.logError(e.resolve(280)), this.aa(), this.n = null, this.ia(1), this.Ua(!1, "reset1")) : null === a && (g.verifyValue(this.status, 1) || k.logError(e.resolve(281)), g.verifyValue(this.n, null) || k.logError(e.resolve(282)), this.Ua(!1, "reset2"))
			},
			tl: function(a) {
				a ? k.logDebug(e.resolve(301), this) : this.V && k.logDebug(e.resolve(302), this);
				this.V = a
			},
			Fc: function(a, c, g, d, e) {
				b.addTimedTask(this.zu, 0, this, [this.a, a, c, g, d, e])
			},
			Gl: function(a, b) {
				return b == h.Vd || b == h.kd ? !0 : this.a === a
			},
			Bp: function(a, b) {
				a == h.Se ? this.ln.Ze(b) : a == h.kd ? this.vj.Ze(b) : a == h.Vd ? this.Ni.Ze(b) : a == h.Re ? this.Sm.Ze(b) : this.$l.Ze(b)
			},
			zu: function(a, b, c, g, d, f) {
				this.Gl(a, g) && (k.logInfo(e.resolve(289), this, c), a = new h(c, d, g, b, f), this.Bp(g, a), 1 == this.status ? this.Ua(!0, "add") : k.logDebug(e.resolve(303), this))
			},
			Ua: function(a, c) {
				!0 === a ? (k.logDebug(e.resolve(304), a, this), this.mq(this.g, c)) : b.addTimedTask(this.mq, !1 === a ? 0 : a, this, [this.g, "async." + c])
			},
			mq: function(a, b) {
				if(a == this.g) {
					for(var c = 0; 1 > c;) {
						c++;
						this.ia(2);
						k.logDebug(e.resolve(305), b, this);
						var g = null;
						null != this.n ? (k.logDebug(e.resolve(306)), g = this.et(this.n)) : (k.logDebug(e.resolve(307)), g = this.GA());
						if(1 == g) k.logInfo(e.resolve(290)), this.n = null;
						else {
							if(2 == g) {
								k.logInfo(e.resolve(291));
								this.Ua(200, "later");
								return
							}
							if(3 == g) {
								k.logWarn(e.resolve(284));
								this.n && this.n.vn(!0);
								this.n = null;
								this.Ua(!1, "no");
								return
							}
							if(4 == g) {
								k.logInfo(e.resolve(292));
								this.ia(3);
								this.n.vn();
								this.Ua(4E3, "http");
								return
							}
							if(5 == g) k.logInfo(e.resolve(293)), this.ia(3), this.n.vn(), this.n = null, this.ia(1);
							else {
								k.logInfo(e.resolve(294));
								this.aa();
								this.ia(1);
								return
							}
						}
					}
					this.Ua(!1, "limit")
				}
			},
			GA: function() {
				for(var a = 0; a < this.hk.length;) {
					this.bi = this.bi < this.hk.length - 1 ? this.bi + 1 : 0;
					if(0 < this.hk[this.bi].getLength()) return this.et(this.hk[this.bi]);
					a++
				}
				return null
			},
			et: function(c) {
				var f = this.ga.xb(),
					h;
				h = this.b.Tb();
				var l = this.b.Yg(!1),
					n = c.$g();
				n ? (n = new d((n.He && !0 !== n.He ? n.He : f) + a.gl), n.Nh(h), n.Ph(l), h = n) : h = null;
				if(null == h) return k.logDebug(e.resolve(308)), 1;
				k.logDebug(e.resolve(309));
				l = !1;
				if(this.V) {
					k.logDebug(e.resolve(310));
					l = this.jq(c, this.V);
					if(null == l) return k.logDebug(e.resolve(311)), 1;
					h.ig(l.getFile());
					h.setData(l.getData());
					l = this.V.Eg(h);
					if(!1 === l) this.V = null;
					else return null === l ? 2 : 5
				}
				this.La && !this.oc.wf(f, this.La.Q, h.Aa(), this.b.Tb(), h.za(), this.b.lh(!1)) && (this.oc.Dc(), this.La = null);
				for(; this.La || this.oc.Rm();) {
					if(!this.La) {
						l = this.oc.hr(f, h.Aa(), this.b.Tb(), h.za(), this.b.lh(!1));
						if(!l) return k.logWarn(e.resolve(285), this.La), g.fail(), this.oc.Dc(), 3;
						this.La = new l("LS6__CONTROLFRAME");
						k.logDebug(e.resolve(312), this.La)
					}
					l = this.jq(c, this.La);
					if(null == l) return k.logDebug(e.resolve(313)), 1;
					h.ig(l.getFile());
					h.setData(l.getData());
					h.xk(l.Dg);
					this.n.nB(this.g);
					this.La.aa();
					this.bw && (h.Jb = h.Jb.replace(/LS_session=.*&/g, "LS_session\x3dFAKE\x26"));
					l = this.La.ua(h, this.n.a, b.packTask(this.Fz, this), b.packTask(this.pa, this));
					if(!1 === l) k.logDebug(e.resolve(314)), this.La = null;
					else {
						if(null === l) return k.logDebug(e.resolve(315)), 2;
						this.oc.Dc();
						return 4
					}
				}!1 !== l && (k.logError(e.resolve(283)), g.fail());
				return 3
			},
			jq: function(a, b) {
				var c = b.ne();
				if(null == this.n) this.n = new l, this.n.pt(c), this.n.fill(a, this.Hh, this.ga.pe(), this.b.Tb(), this.b.Yg(!1));
				else if(this.n.Ty(c) && (this.n.pt(c), c = this.n.pA(this.Hh, this.ga.pe(), this.b.Tb(), this.b.Yg(!1))))
					for(var g = c.vd(); 0 < c.getLength();) this.Bp(g, c.shift());
				return this.n.isEmpty() ? this.n = null : this.n.$c
			},
			Fz: function(a, b) {
				if(this.n && b == this.n.a) {
					k.logInfo(e.resolve(295), b);
					this.ia(1);
					var c = this.n.$g().md;
					this.n = null;
					c == h.Vd || this.Yx(a) ? this.Ua(!1, "ready4next") : this.ga.XB()
				}
			},
			Yx: function(a) {
				return "" === a ? !0 : null === a.match(/^window.LS_lastError\[\d+] = "sync error";$/m)
			},
			pa: function(a, b) {
				this.n && b == this.n.a && (k.logInfo(e.resolve(296), this, a), this.ia(1), this.n = null, this.Ua(!1, "error"))
			}
		};
		l.prototype = {
			toString: function() {
				return this.Ea ? this.Ea.toString() : null
			},
			vd: function() {
				return this.Ea ? this.Ea.vd() : null
			},
			$g: function() {
				return this.Ea ? this.Ea.$g() : null
			},
			getLength: function() {
				return this.Ea ? this.Ea.getLength() : 0
			},
			shift: function() {
				return this.Ea ? this.Ea.shift() : null
			},
			Ty: function(a) {
				return a != this.Lc
			},
			pt: G("Lc"),
			fill: function(a, b, c, g, d) {
				if(!(0 >= a.getLength()))
					if(this.Ea = new f(a.vd()), this.$c = this.Lc.Rx(a, g, d), g = "", d = this.Lc.yq(a, c, !0), null === d) this.$c = this.Ea = null;
					else {
						var h = this.Lc.Em(this.$c.getFile()),
							l = this.Lc.Hm(d) + d.length;
						0 < b && l + h > b && k.logWarn(e.resolve(286), g);
						do g += d, this.Ea.Ze(a.shift()), h += l, 0 < a.getLength() && (d = this.Lc.yq(a, c)) && (l = this.Lc.Hm(d) + d.length); while (d && (0 == b || h + l < b) && 0 < a.getLength());
						g ? this.$c.setData(this.Lc.Yo(g)) : this.$c = null
					}
			},
			pA: function(a, b, c, g) {
				var d = this.Ea;
				this.Ea = null;
				this.fill(d, a, b, c, g);
				return 0 < d.getLength() ? d : null
			},
			nB: G("a"),
			isEmpty: function() {
				return 0 >= this.getLength()
			},
			vn: function(a) {
				for(var c = 0, g = null; g = this.Ea.Km(c);)(g = g.Ts) && b.addTimedTask(g.Cd, 0, g, [a]), c++
			}
		};
		return n
	});
	define("lscS", ["Inheritance", "lscW", "lscG"], function(h, f) {
		function e(b, a, g, d, f, h, m) {
			this._callSuperConstructor(e, [a]);
			this.fo = d;
			this.lb = f;
			this.fg = h;
			this.a = g;
			this.ga = b;
			this.Vo = m
		}
		var d, b;
		for(b in {
				Cd: !0
			}) d = b;
		e.prototype = {
			Cd: function(b) {
				this._callSuperMethod(e, d, [b]);
				b || (this.ga.NA(this.fg, this.lb), this.Vo || this.ga.Yy(this.fg, this.lb))
			},
			verifySuccess: function() {
				return this.ga.dv(this.a) && this.fo.p[this.lb] && null != this.fo.p[this.lb].Dh ? !1 : !0
			},
			he: function() {
				this.ga.BA(this.lb, this)
			},
			Jj: E(),
			Pv: G("Vo")
		};
		h(e, f);
		return e
	});
	define("lscT", ["lscS", "lscO", "LoggerManager", "lscA"], function(h, f, e, d) {
		function b(a, b, c) {
			this.ki = !1;
			this.Cj = 0;
			this.Ld = {};
			this.gd = {};
			this.Ot = 0;
			this.R = a;
			this.s = b;
			this.cf = c
		}
		var c = e.getLoggerProxy(d.zg);
		b.prototype = {
			aa: function() {
				this.ki = !1;
				this.Ld = {};
				this.Ot = 0;
				this.gd = {};
				this.Cj++;
				c.logDebug(e.resolve(321))
			},
			pl: function() {
				c.logDebug(e.resolve(322));
				if(!this.ki) {
					for(var a in this.Ld) {
						var b = this.Ld[a],
							d;
						for(d in b.p)
							if(null != b.p[d].Dh) {
								var f = new h(this, this.cf, this.Cj, b, d);
								this.co(d, query, f)
							}
					}
					this.ki = !0
				}
			},
			Eg: function(a, b, f, n) {
				c.logDebug(e.resolve(323));
				var k = this.Ld[b];
				null == k && (k = {
					Hf: 0,
					p: {}
				}, this.Ld[b] = k);
				k.Hf++;
				a = {
					LS_message: a
				};
				var m = !1;
				f && (a.LS_outcome = "", m = !0);
				b != d.Cc && (a.LS_sequence = encodeURIComponent(b), m = !0);
				n && (a.LS_max_wait = n, m = !0);
				m && (a.LS_ack = "", a.LS_msg_prog = b == d.Cc ? this.Ur(k.Hf) : k.Hf);
				n = {};
				n.Dh = a;
				n.Bd = f;
				k.p[k.Hf] = n;
				this.ki && (c.logDebug(e.resolve(324), a), b = new h(this, this.cf, this.Cj, k, k.Hf, b, m), this.co(k.Hf, a, b))
			},
			Ur: function(a) {
				var b = ++this.Ot;
				this.gd[b] = a;
				return b
			},
			Ih: function(a) {
				return this.gd[a] ? this.gd[a] : a
			},
			sA: function(a) {
				for(var b in this.gd)
					if(this.gd[b] == a) {
						delete this.gd[b];
						break
					}
			},
			Zv: function(a) {
				for(var b in this.gd)
					if(this.gd[b] == a) return b
			},
			dv: function(a) {
				return a == this.Cj
			},
			BA: function(a, b) {
				var d = b.fo.p[a].Dh;
				c.logDebug(e.resolve(325), d);
				this.co(a, d, b)
			},
			co: function(a, b, c) {
				this.R.Fc(a, b, f.Se, c)
			},
			uu: function(a, b) {
				b = a == d.Cc ? this.Ih(b) : b;
				c.logInfo(e.resolve(316), a, b);
				var f = this.Ld[a];
				f.p[b] && (null != f.p[b].Dh && (c.logDebug(e.resolve(326)), f.p[b].Dh = null), null == f.p[b].Bd && (c.logDebug(e.resolve(327)), this.We(a, b)))
			},
			Yy: function(a, b) {
				c.logDebug(e.resolve(328), a, b);
				this.We(a, b)
			},
			We: function(a, b) {
				c.logDebug(e.resolve(329));
				var f = this.Ld[a];
				f && f.p[b] && (delete f.p[b], a == d.Cc && this.sA(b))
			},
			wb: function(a, b) {
				var c = this.Ld[a];
				return c && c.p[b] && c.p[b].Bd ? c.p[b].Bd : null
			},
			NA: function(a, b) {
				c.logDebug(e.resolve(330), a, b);
				var d = this.wb(a, b);
				if(d) {
					var f = this.s.wd(d.mb);
					f && f.vs(d.Oa)
				}
			},
			nu: function(a, b) {
				b = a == d.Cc ? this.Ih(b) : b;
				c.logInfo(e.resolve(317), a, b);
				var f = this.wb(a, b);
				if(f) {
					var h = this.s.wd(f.mb);
					h && h.ts(f.Oa)
				}
				this.We(a, b)
			},
			bz: function(a, b) {
				b = a == d.Cc ? this.Ih(b) : b;
				c.logInfo(e.resolve(318), a, b);
				var f = this.wb(a, b);
				if(f) {
					var h = this.s.wd(f.mb);
					h && h.Ae(f.Oa)
				}
				this.We(a, b)
			},
			az: function(a, b, f, h) {
				h = a == d.Cc ? this.Ih(h) : h;
				c.logInfo(e.resolve(319), a, h);
				var k = this.wb(a, h);
				if(k) {
					var m = this.s.wd(k.mb);
					m && m.us(k.Oa, b, f)
				}
				this.We(a, h)
			},
			dz: function(a, b, f, h) {
				h = a == d.Cc ? this.Ih(h) : h;
				c.logInfo(e.resolve(320), a, h);
				var k = this.wb(a, h);
				if(k) {
					var m = this.s.wd(k.mb);
					m && m.Qf(k.Oa, b, f)
				}
				this.We(a, h)
			}
		};
		return b
	});
	define("lsci", ["LoggerManager", "Executor", "Global", "ASSERT", "lscA"], function(h, f, e, d, b) {
		function c(a) {
			this.Va = a;
			this.vb = [];
			this.rr = !1;
			this.lsc = {};
			this.lsc.LS_window = e["_" + a];
			this.Cv = this.mw(this.lsc)
		}
		var a = h.getLoggerProxy(b.eb);
		c.prototype = {
			toString: function() {
				return "[EvalQueue|" + this.vb.length + "]"
			},
			mw: function() {
				eval("var lsc \x3d arguments[0]");
				return function(a) {
					with(lsc) eval(a)
				}
			},
			tp: function(b, c) {
				this.mg() && (this.vb.push({
					Rj: b,
					tb: c
				}), a.isDebugLogEnabled() && a.logDebug(h.resolve(332)), f.addTimedTask(this.Mi, 0, this))
			},
			ce: G("d"),
			Mi: function() {
				for(a.isDebugLogEnabled() && a.logDebug(h.resolve(333), this.vb.length); 0 < this.vb.length;) {
					var b = this.vb.shift();
					if(this.d && this.d.ja(b.Rj)) try {
						this.Cv(b.tb)
					} catch(c) {
						this.rr = !0, this.vb = [], d.fail(), a.logError(h.resolve(331), c, b.tb), this.d.Cq()
					} else a.isDebugLogEnabled() && a.logDebug(h.resolve(334), b.Rj, this.d)
				}
			},
			mg: function() {
				return !this.rr
			},
			ka: E()
		};
		return c
	});
	define("lsch", [], function() {
		function h(f) {
			this.lsc = {};
			this.lsc.LS_window = f;
			this.ob = !1
		}
		h.prototype = {
			zd: L("ob"),
			Fw: L("lsc"),
			Vv: function(f) {
				eval("var lsc \x3d this.lsc");
				with(lsc) eval(f);
				this.ob = !0
			}
		};
		return h
	});
	define("lscw", "LoggerManager Executor lscE Inheritance Global lsch lscA".split(" "), function(h, f, e, d, b, c, a) {
		function g(a, d) {
			this.Va = a;
			this._callSuperConstructor(g, [f.packTask(this.ps, this)]);
			this.vb = [];
			this.Pi = d ? d : new c(b["_" + a])
		}
		var l = h.getLoggerProxy(a.eb),
			n = 0;
		g.prototype = {
			toString: function() {
				return "[WrappedEvalQueue|" + this.vb.length + "]"
			},
			tp: function(a, b) {
				this.mg() && (this.vb.push({
					Rj: a,
					tb: b
				}), l.isDebugLogEnabled() && l.logDebug(h.resolve(336)), f.addTimedTask(this.Mi, 0, this))
			},
			Sq: function() {
				this.Wi = !0
			},
			ce: G("d"),
			br: V("\x3cscript\x3ewindow.evalProxy \x3d function(lsc,_p){with(lsc){eval(_p);}};\x3c/script\x3e"),
			di: function() {
				return this.pc.evalProxy ? !0 : !1
			},
			cr: function() {
				return "LS6__EQ_" + this.Va + "_" + ++n
			},
			Mi: function() {
				if(this.ob)
					for(l.isDebugLogEnabled() && l.logDebug(h.resolve(337)); 0 < this.vb.length;) {
						var a = this.vb.shift();
						if(this.d && this.d.ja(a.Rj)) {
							var b = null,
								c = null;
							if(!this.Pi.zd() && (-1 < (b = a.tb.indexOf("// END OF HEADER")) || -1 < (c = a.tb.indexOf("myEnv.LS_window \x3d LS_window;")))) {
								var d; - 1 < b ? (d = a.tb.substring(0, b), b = a.tb.substring(b)) : (d = a.tb.substring(0, c + 28), b = a.tb.substring(c + 28));
								a.tb = b;
								this.Pi.Vv(d)
							}
							try {
								this.pc.evalProxy(this.Pi.Fw(), a.tb)
							} catch(g) {
								this.ps(a.tb, g);
								break
							}
						}
					} else f.addTimedTask(this.Mi, 100, this)
			},
			ps: function(a, b) {
				this.Wi = !0;
				this.vb = [];
				l.logError(h.resolve(335), b, a);
				this.d && this.d.Cq()
			}
		};
		d(g, e);
		return g
	});
	define("lsct", "Executor BrowserDetection ASSERT LoggerManager Helpers lscq lscl lscAK lscs lscu EnvironmentStatus Global lscm lscO lscU lscA lscv lscN lscT lsci lscw".split(" "), function(h, f, e, d, b, c, a, g, l, n, k, m, p, q, s, t, r, D, z, y, w) {
		function x(a, b) {
			this.status = A;
			this.g = 0;
			this.Ol = this.d = null;
			this.me = "";
			this.Ce = a;
			this.s = b;
			this.b = a.ha;
			this.Ta = a.ta;
			this.Mb = a.fh();
			this.xc = new r(this.b, this.Mb);
			this.Zz = new p(this.Mb, b);
			k.addUnloadHandler(this);
			this.Wv();
			this.jf = null;
			this.R = new D(this, a.ha, this.Mb, !1);
			this.Kd = new z(this.R, this.s, this.b)
		}

		function O(a) {
			switch(a) {
				case A:
					return "No session";
				case P:
					return "WS Streaming";
				case J:
					return "prepare WS Streaming";
				case M:
					return "WS Polling";
				case H:
					return "prepare WS Polling";
				case v:
					return "HTTP Streaming";
				case I:
					return "prepare HTTP Streaming";
				case B:
					return "HTTP Polling";
				case F:
					return "prepare HTTP Polling";
				case Q:
					return "Shutting down"
			}
		}
		var A = 1,
			P = 2,
			J = 3,
			M = 4,
			H = 5,
			v = 6,
			I = 7,
			B = 8,
			F = 9,
			Q = 10,
			K = {};
		K[P] = I;
		K[v] = F;
		K[M] = J;
		K[B] = J;
		K["_" + P] = J;
		K["_" + v] = F;
		K["_" + M] = J;
		K["_" + B] = I;
		var R = {};
		R[P] = I;
		R[v] = F;
		R[M] = J;
		R[B] = J;
		R["_" + P] = J;
		R["_" + v] = F;
		R["_" + M] = J;
		R["_" + B] = F;
		var S = {};
		S[P] = J;
		S[v] = I;
		S[M] = H;
		S[B] = F;
		var U = {};
		U[P] = H;
		U[v] = F;
		U[I] = F;
		U[F] = F;
		var T = {};
		T[J] = !0;
		T[H] = !0;
		T[I] = !0;
		T[F] = !0;
		var C = d.getLoggerProxy(t.Te),
			N = d.getLoggerProxy(t.Yd);
		x.prototype = {
			Wv: function() {
				var a = this;
				m.xa(this.Mb, "LS_forceReload", function() {
					a.d && a.d.pa("server.exit", !0)
				})
			},
			ia: function(a) {
				this.status = a;
				this.g++
			},
			wa: function(a, b, c) {
				this.status != A && this.status != Q && this.d && this.d.wa(a ? "api" : b, !1, c)
			},
			XB: function() {
				this.status != A && this.status != Q && this.d && this.d.Fn("control.syncerror")
			},
			qh: function() {
				return this.status != A && this.status != Q
			},
			Kb: function(b, c, d, g, e, f, h) {
				b && a.ea();
				this.oq();
				b = b ? "api" : f;
				this.me = c ? "_" : "";
				!h && this.qh() ? (c = g ? e ? F : H : e ? I : J, this.ia(c), this.vo(b), this.d.Zs(this.g, b, d)) : (this.$s(), h = this.d ? this.d.pe() : null, b = "new." + b, this.wa(!1, b, !1), c = g ? e ? B : M : e ? v : P, this.ia(c), this.Ms(g, d, e), this.d.Kb(h, b))
			},
			Ms: function(a, b, c, d) {
				this.d = new(c ? l : n)(a, b, this, this.g, d, null !== this.jf);
				d && d.kg();
				this.xc.ce(this.d);
				this.ba && this.ba.ce(this.d);
				this.Zz.ce(this.d)
			},
			be: function(a, b, c, d) {
				this.ia(b ? c ? B : M : c ? v : P);
				this.Ms(b, a, c, this.d);
				this.d.be(d)
			},
			qo: function() {
				return "_" == this.me && S[this.status] == R[this.me + this.status]
			},
			Xc: function(a, b, c) {
				a == this.g && (c ? (N.logInfo(d.resolve(343)), this.ia(A)) : (a = R[this.status] || this.status, N.logInfo(d.resolve(344), O(this.status), O(a)), a == A || a == Q ? (N.logError(d.resolve(338)), e.fail()) : (this.ia(a), this.vo(b), this.d.Zs(this.g, b, !1))))
			},
			Kz: function(a) {
				a == this.g && (a = U[this.status], N.logInfo(d.resolve(345), O(this.status), O(a)), a ? (this.ia(a), this.vo("slow"), this.d.AA(this.g)) : (N.logError(d.resolve(339), O(this.status), this.d), e.fail()))
			},
			gf: function(a, b, c) {
				a == this.g && (a = K[this.me + this.status] || this.status, N.logInfo(d.resolve(346), O(this.status), O(a)), a == A || a == Q ? (N.logError(d.resolve(340)), e.fail()) : this.Kb(!1, "_" == this.me, c, a == J || a == I ? !1 : !0, a == J || a == H ? !1 : !0, b, !0))
			},
			Fo: function(a, b, c) {
				a == this.g && (a = this.status, N.logInfo(d.resolve(347), O(this.status)), T[a] ? this.be(c, a == J || a == I ? !1 : !0, a == J || a == H ? !1 : !0, b) : (N.logError(d.resolve(341)), e.fail()))
			},
			wt: function(a) {
				N.logInfo(d.resolve(348));
				this.Fo(a, "slow", !1)
			},
			VB: function(a, b) {
				if(a == this.g) {
					var c = this.status;
					N.logInfo(d.resolve(349), O(this.status));
					T[c] ? this.Kb(!1, "_" == this.me, !1, c == J || c == I ? !1 : !0, c == J || c == H ? !1 : !0, "switch.timeout." + b, !0) : (N.logError(d.resolve(342)), e.fail())
				}
			},
			vo: function(a) {
				h.addTimedTask(this.VB, this.b.Do + (this.xc.Cm() || 0), this, [this.g, a])
			},
			$s: function() {
				this.R.Dc();
				this.Kd.aa()
			},
			Xl: function() {
				var a = null !== this.jf;
				this.d && this.d.ag(a);
				this.R && this.R.ag(a)
			},
			oz: function(a) {
				a == this.g && (this.jf = b.getTimeStamp(), this.Xl())
			},
			oq: function() {
				null !== this.jf && 1E3 < b.getTimeStamp() - this.jf && (this.jf = null, this.Xl())
			},
			ue: function() {
				return this.d ? this.d.k() : null
			},
			Gm: function() {
				return this.d ? this.d.Gm() : t.ec
			},
			xb: function() {
				return this.d ? this.d.xb() : this.Ta.Lh
			},
			pe: function() {
				return this.d ? this.d.pe() : null
			},
			Xq: function() {
				if(!this.ba || !this.ba.mg()) {
					if(f.isProbablyIE(9, !0)) {
						var a = null;
						this.ba && (a = this.ba.Pi, this.ba.ka());
						this.ba = new w(this.Mb, a)
					} else this.ba = new y(this.Mb);
					this.ba.ce(this.d)
				}
				return this.ba
			},
			ka: function() {
				this.ba && this.ba.ka();
				k.removeUnloadHandler(this)
			},
			unloadEvent: function() {
				this.wa(!1, "unload", !0);
				this.ia(Q)
			},
			fh: L("Mb"),
			OB: function(a) {
				a == this.g && this.Ce.ez()
			},
			vc: function(a) {
				N.logInfo(d.resolve(350), this);
				this.xs(a);
				this.Kd.pl();
				this.s.vc();
				this.qe()
			},
			xs: function(a) {
				N.logDebug(d.resolve(351), this);
				a && this.R.qB(a)
			},
			Iz: function(a, b) {
				if(a != this.g) return null;
				N.logDebug(d.resolve(352), this);
				this.$s();
				this.Ce.Wc();
				b ? this.ia(A) : this.ia(this.status);
				return this.g
			},
			Hn: function(a, b) {
				var c = this.s.Rc(a[0]);
				c ? (C.isDebugLogEnabled() && C.logDebug(d.resolve(354), a), c.Ds(a, b)) : (this.s.xr(a[0]), C.logDebug(d.resolve(353), this))
			},
			Dd: function(a) {
				var b = this.s.Rc(a[0]);
				b ? (C.isDebugLogEnabled() && C.logDebug(d.resolve(356), a), b.zs(a[0], a[1], a[2])) : C.logDebug(d.resolve(355), this)
			},
			Yb: function(a) {
				var b = this.s.Rc(a[0]);
				b ? (C.isDebugLogEnabled() && C.logDebug(d.resolve(358), a), b.Yb(a[0], a[1])) : C.logDebug(d.resolve(357), this)
			},
			Xb: function(a) {
				var b = this.s.Rc(a[0]);
				b ? (C.isDebugLogEnabled() && C.logDebug(d.resolve(360), a), b.Xb(a[0], a[1])) : C.logDebug(d.resolve(359), this)
			},
			Rf: function(a, b) {
				C.isDebugLogEnabled() && C.logDebug(d.resolve(361), a, b);
				this.s.gz(a, b)
			},
			Tf: function(a, b, c) {
				var g = this.s.Rc(a);
				g ? (C.isDebugLogEnabled() && C.logDebug(d.resolve(363), a, b, c), g.Tf(b, c, a)) : C.logDebug(d.resolve(362), this)
			},
			onUnsubscription: function(a) {
				this.s.Wp(a);
				var b = this.s.Rc(a);
				b ? (C.isDebugLogEnabled() && C.logDebug(d.resolve(365), a), b.Cs(a)) : C.logDebug(d.resolve(364), this)
			},
			Sf: function(a, b) {
				C.isDebugLogEnabled() && C.logDebug(d.resolve(366), a, b);
				this.s.Sf(a, b)
			},
			onSubscription: function(a, b, c, g, e) {
				var f = this.s.Rc(a);
				f ? (C.isDebugLogEnabled() && C.logDebug(d.resolve(368), a, b, c, g, e), f.Bs(a, g, e, b, c)) : C.logDebug(d.resolve(367), this)
			},
			xn: function(a, b) {
				C.isDebugLogEnabled() && C.logDebug(d.resolve(369), a, b);
				this.Kd.uu(a, b)
			},
			zn: function(a, b) {
				C.isDebugLogEnabled() && C.logDebug(d.resolve(370), a, b);
				this.Kd.nu(a, b)
			},
			yn: function(a, b, c, g) {
				C.isDebugLogEnabled() && C.logDebug(d.resolve(371), a, g, b, c);
				this.Kd.az(a, b, g, c)
			},
			Ae: function(a, b) {
				C.isDebugLogEnabled() && C.logDebug(d.resolve(372), a, b);
				this.Kd.bz(a, b)
			},
			Qf: function(a, b, c, g) {
				C.isDebugLogEnabled() && C.logDebug(d.resolve(373), a, g, b, c);
				this.Kd.dz(a, b, g, c)
			},
			Nj: function(a) {
				this.Ce.Nj(a)
			},
			An: function(a) {
				C.isDebugLogEnabled() && C.logDebug(d.resolve(374), a);
				this.Ce.An(a)
			},
			wz: function(a) {
				this.Ol && (a != this.Ol && g.$x()) && (g.DA(), this.Kb(!1, "_" == this.me, !1, !1, !1, "ip", !1));
				this.Ol = a
			},
			ok: function(a, b, c, d) {
				this.Kd.Eg(a, b, c, d)
			},
			Jd: function(a, b) {
				var d = c.Xw(this.g, a, b);
				this.R.Fc(null, d, q.kd, null)
			},
			Ai: function() {
				this.d && this.d.Ai()
			},
			JA: function(a, b, c, d) {
				this.R.Fc(a, b, q.Td, new s(c, a, q.Td), d)
			},
			LA: function(a, b, c) {
				this.R.Fc(a, b, q.Ue, new s(c, a, q.Ue))
			},
			KA: function(a, b, c) {
				this.R.Fc(a, b, q.ep, c)
			},
			qe: function() {
				this.d && this.d.qe()
			}
		};
		x.prototype.unloadEvent = x.prototype.unloadEvent;
		return x
	});
	define("lscj", "Global lscA LoggerManager lscJ lscK lscL lscn lsct lscO Executor lscAY".split(" "), function(h, f, e, d, b, c, a, g, l, n, k) {
		function m(f, l, p, m, y) {
			this.M = new d(l);
			this.M.hg(this, !0);
			this.nf = null;
			f ? this.nf = f : (s.logWarn(e.resolve(375)), this.nf = "default");
			this.ta = new b(m);
			this.ta.hg(this, !0);
			this.ha = new c(p);
			this.ha.hg(this, !0);
			this.en = null;
			if(this.M.Xm) {
				this.cd = null;
				do this.Va = "s" + q++; while (h.Mx(this.Va, "lsEngine"))
			} else this.cd = new k(this.nf, y ? null : n.packTask(this.Si, this)), this.Va = this.cd.da();
			this.s = new a(this);
			this.f = new g(this, this.s);
			h.xa(this.Va, "lsEngine", this);
			h.Cu(this);
			this.M.Qg && this.Oi()
		}
		var p = "1679.2";
		isNaN(p) && (p = 0);
		var q = 0,
			s = e.getLoggerProxy(f.Yd);
		m.prototype = {
			toString: V("[LightstreamerEngine]"),
			ue: function() {
				return this.f.ue()
			},
			Wc: function() {
				this.s.Wc()
			},
			Nj: function(a) {
				this.cd && this.cd.Vs(a)
			},
			An: function(a) {
				this.cd && this.cd.vu(a)
			},
			af: function(a, b, c) {
				var d = this.s.u,
					g;
				for(g in d) d[g].is(a, b, c);
				"maxBandwidth" == b ? this.f.Ai(c) : "forcedTransport" == b ? this.M.Qg && this.Oi() : "reverseHeartbeatMillis" == b ? this.f.qe() : "corsXHREnabled" != b && "xDomainStreamingEnabled" != b || this.f.Xl();
				return !0
			},
			ez: function() {
				var a = this.yb();
				if(this.en != a) {
					var b = this.en;
					this.en = a;
					this.s.fz(a, b);
					if(this.onStatusChange) this.onStatusChange(a)
				}
			},
			hb: L("s"),
			Jd: function(a) {
				this.f.Jd(a, p);
				return !0
			},
			fh: L("Va"),
			Si: function() {
				this.f.wa(!1, "suicide", !0);
				this.f.ka();
				h.fv(this.Va);
				h.xA(this);
				this.cd && this.cd.ka();
				this.s.cs(!0);
				this.s.ka()
			},
			ix: function() {
				var a = [],
					b = this.s.u,
					c;
				for(c in b)
					if(b[c].qh()) try {
						var d = b[c].jh();
						a.push(d)
					} catch(g) {}
					return a
			},
			sq: function() {
				s.logInfo(e.resolve(376));
				this.M.P("connectionRequested", !1);
				this.f.wa(!0, "api", !0)
			},
			Oi: function() {
				s.logInfo(e.resolve(377));
				this.M.P("connectionRequested", !0);
				var a = this.ha.zm;
				null === a ? this.f.Kb(!0, !1, !1, !1, !1) : this.Jv(a)
			},
			Jv: function(a) {
				var b = a == f.kl || a == f.ei;
				this.f.Kb(!0, b, !b, a == f.Cg || a == f.Wd, a == f.Wd || a == f.vg || a == f.ei)
			},
			ok: function(a, b, c, d) {
				var g = this.yb();
				if(g == f.ec || g == f.Bg) return !1;
				this.f.ok(a, b, c, d);
				return !0
			},
			yb: function() {
				return this.f.Gm()
			}
		};
		return m
	});
	define("lscAS", "lscK lscL lscJ lscA lscG lscAf LoggerManager".split(" "), function(h, f, e, d, b, c, a) {
		function g(a) {
			this.c = a
		}

		function l(a) {
			return null == a ? null : a.toString()
		}
		var n = a.getLoggerProxy(d.Ra);
		g.prototype = {
			toString: V("[Client EventBridge]"),
			$z: function(b) {
				n.logDebug(a.resolve(378), this);
				this.c.j.Bn(parseInt(b.Xo), parseInt(b.v), l(b.status), new h(b.ta), new f(b.ha), new e(b.M), parseInt(b.Va), !0 === b.qb)
			},
			rv: function(b) {
				n.logDebug(a.resolve(379), this);
				("lscK" == b.es ? this.c.ta : "lscL" == b.es ? this.c.ha : this.c.M).P(l(b.lA), b.sC)
			},
			Gk: function(b) {
				n.logDebug(a.resolve(380), this);
				this.c.j.Gk(l(b.status))
			},
			uk: function(c) {
				n.logDebug(a.resolve(381), this);
				this.c.j.uk(b.ef(c.a))
			},
			io: function(c) {
				n.logDebug(a.resolve(382), this);
				this.c.j.lt(b.ef(c.a))
			},
			Sv: function(b) {
				n.logDebug(a.resolve(383), this);
				this.c.j.xe(!0 === b.UB)
			},
			Tv: function() {
				n.logDebug(a.resolve(384), this);
				this.c.j.kn()
			},
			sk: function(b) {
				n.logDebug(a.resolve(385), this);
				this.c.sk(parseInt(b.wm), l(b.Ab))
			},
			YB: function(b) {
				n.logDebug(a.resolve(386), this);
				this.c.h.Pj(l(b.Le), parseInt(b.G), parseInt(b.Bb), parseInt(b.Fb))
			},
			Rk: function(a) {
				var b = c(a.Hu, !1);
				this.c.h.Rk(b, a.IB ? !0 : !1)
			},
			$B: function(b) {
				n.logDebug(a.resolve(388), this);
				this.c.h.Dd(parseInt(b.G), parseInt(b.item), parseInt(b.Ly))
			},
			rm: function(b) {
				n.logDebug(a.resolve(389), this);
				this.c.h.Yb(parseInt(b.G), parseInt(b.item))
			},
			Nl: function(b) {
				n.logDebug(a.resolve(390), this);
				this.c.h.Xb(parseInt(b.G), parseInt(b.item))
			},
			ZB: function(b) {
				n.logDebug(a.resolve(391), this);
				this.c.h.Bq(parseInt(b.wm), l(b.Ab), parseInt(b.G))
			},
			dC: function(b) {
				n.logDebug(a.resolve(392), this);
				this.c.h.Dt(parseInt(b.G), parseInt(b.Ey), parseInt(b.Uu), parseInt(b.Dy), parseInt(b.fw))
			},
			eC: function() {
				n.logDebug(a.resolve(393), this)
			},
			Au: function(b) {
				n.logDebug(a.resolve(394), this);
				this.c.h.Ft(parseInt(b.G))
			},
			Aj: function(b) {
				n.logDebug(a.resolve(395), this);
				this.c.p.Aj(parseInt(b.Oa), parseInt(b.ml), l(b.Ab))
			},
			wj: function(b) {
				n.logDebug(a.resolve(396), this);
				this.c.p.wj(parseInt(b.Oa))
			},
			Bj: function(b) {
				n.logDebug(a.resolve(397), this);
				this.c.p.Bj(parseInt(b.Oa))
			},
			yj: function(b) {
				n.logDebug(a.resolve(398), this);
				this.c.p.yj(parseInt(b.Oa), parseInt(b.ml), l(b.Ab))
			},
			zj: function(b) {
				n.logDebug(a.resolve(399), this);
				this.c.p.zj(parseInt(b.Oa))
			}
		};
		return g
	});
	define("EventDispatcher", ["Executor", "List", "Inheritance"], function(h, f, e) {
		function d() {
			this._callSuperConstructor(d)
		}

		function b() {
			this.initDispatcher()
		}
		b.prototype = {
			initDispatcher: function() {
				this.Yh = new d;
				this.Gt = !1
			},
			addListener: function(b) {
				b && !this.Yh.contains(b) && (b = {
					e: b,
					Sr: !0
				}, this.Yh.add(b), this.em("onListenStart", [this], b, !0))
			},
			removeListener: function(b) {
				b && (b = this.Yh.remove(b)) && this.em("onListenEnd", [this], b, !0)
			},
			getListeners: function() {
				return this.Yh.asArray()
			},
			useSynchEvents: function(b) {
				this.Gt = !0 === b
			},
			em: function(b, a, d, e) {
				this.Gt ? this.pq(b, a, d, !0) : h.addTimedTask(this.pq, 0, this, [b, a, d, e])
			},
			pq: function(b, a, d, e) {
				if(d && d.e[b] && (e || d.Sr)) try {
					a ? d.e[b].apply(d.e, a) : d.e[b].apply(d.e)
				} catch(f) {}
			},
			dispatchEvent: function(b, a) {
				var d = this;
				this.Yh.forEach(function(e) {
					d.em(b, a, e, !1)
				})
			}
		};
		b.prototype.initDispatcher = b.prototype.initDispatcher;
		b.prototype.addListener = b.prototype.addListener;
		b.prototype.removeListener = b.prototype.removeListener;
		b.prototype.getListeners = b.prototype.getListeners;
		b.prototype.useSynchEvents = b.prototype.useSynchEvents;
		b.prototype.dispatchEvent = b.prototype.dispatchEvent;
		d.prototype = {
			remove: function(b) {
				b = this.find(b);
				if(0 > b) return !1;
				var a = this.data[b];
				a.Sr = !1;
				this.data.splice(b, 1);
				return a
			},
			find: function(b) {
				for(var a = 0; a < this.data.length; a++)
					if(this.data[a].e == b) return a;
				return -1
			},
			asArray: function() {
				var b = [];
				this.forEach(function(a) {
					b.push(a.e)
				});
				return b
			}
		};
		e(d, f);
		return b
	});
	define("lscAP", "Executor lscA LoggerManager Inheritance Setter Environment IllegalStateException IllegalArgumentException Helpers".split(" "), function(h, f, e, d, b, c, a, g, l) {
		function n() {
			this.Kc = 5E3;
			this.gm = !1;
			this.S = this.oo = this.jg = this.$b = this.U = this.Yf = null
		}
		var k = /^[a-zA-Z0-9]*$/,
			m = {
				ATTACH: !0,
				"ATTACH:FAST": !0,
				IGNORE: !0,
				ABORT: !0
			},
			p = {
				CREATE: !0,
				ABORT: !0,
				WAIT: !0
			},
			q = {
				ATTACH: !0,
				"ATTACH:FAST": !0
			},
			s = e.getLoggerProxy(f.Ra);
		n.prototype = {
			pB: G("S"),
			RA: function(a) {
				this.Kc = this.checkPositiveNumber(a);
				this.S.Xu(this.Kc)
			},
			yv: function() {
				this.lm("default" + l.randomG(), "IGNORE", "CREATE", !0, null)
			},
			lm: function(a, b, d, h, l) {
				if(!a) throw new g("The share name is missing");
				if(!k.test(a)) throw new g("The given share name is not valid, use only alphanumeric characters");
				if(!p[d]) throw new g("sharePolicyOnNotFound must be one of: CREATE, ABORT, WAIT");
				if(!m[b]) throw new g("sharePolicyOnFound must be one of: ATTACH, ATTACH:FAST, IGNORE, ABORT");
				if(!c.isBrowserDocument()) {
					if(q[b]) throw new g("ATTACH* can only be used if the LightstreamerClient is loaded inside a browser document");
					h || (h = !0)
				}
				"file:" != f.wg || h || (s.logWarn(e.resolve(400)), h = !0);
				this.S.Jr() || (this.gm = !0, this.S.Kv(), this.gm = !1);
				this.Yf = this.checkBool(h, !0);
				this.U = a;
				this.$b = b;
				this.jg = d;
				this.oo = l;
				"IGNORE" == this.$b && "CREATE" == this.jg ? (s.logInfo(e.resolve(401)), this.S.rq(this.U, this.Yf)) : "IGNORE" != this.$b && "ABORT" != this.$b || "ABORT" != this.jg ? (s.logInfo(e.resolve(403)), this.S.uq(this.U, "ATTACH:FAST" == this.$b, this.Yf, this.Kc, this.oo)) : (s.logInfo(e.resolve(402)), this.S.hm())
			},
			Cr: function() {
				return this.S.hy()
			},
			tx: L("U"),
			ux: function() {
				return this.S.uw()
			},
			Pu: function() {
				return "IGNORE" == this.$b
			},
			os: function(a, b, c) {
				"ABORT" == this.$b ? (s.logInfo(e.resolve(404)), this.S.hm()) : "IGNORE" != this.$b ? (s.logInfo(e.resolve(405)), this.S.Gv(b, c)) : s.logInfo(e.resolve(406))
			},
			vC: function(a) {
				this.S.Gl(a) && this.S.uq(this.U, "ATTACH:FAST" == this.$b, this.Yf, this.Kc, this.oo)
			},
			Mj: function(a, b) {
				"CREATE" == this.jg ? (s.logInfo(e.resolve(407)), this.S.rq(this.U, b || this.Yf)) : "WAIT" == this.jg ? (s.logInfo(e.resolve(408), 1E3), h.addTimedTask(this.vC, 1E3, this, [a])) : (s.logInfo(e.resolve(409)), this.S.hm())
			},
			qz: function() {
				this.gm || (s.logInfo(e.resolve(410)), this.lm(this.U, this.$b, -1 < this.$b.indexOf("ATTACH") ? "CREATE" : this.jg, this.Yf, null))
			}
		};
		n.prototype.setCheckShareTimeout = n.prototype.RA;
		n.prototype.enableSharing = n.prototype.lm;
		n.prototype.isMaster = n.prototype.Cr;
		n.prototype.getShareName = n.prototype.tx;
		n.prototype.getSharedClients = n.prototype.ux;
		d(n, b, !0, !0);
		return n
	});
	define("LightstreamerClient", "Helpers Global lscAR Executor CookieManager lscAY lscJ lscL lscK lscAV lscAT lscAU lscAe lscD lscj lscAS Inheritance Setter EventDispatcher lscA EnvironmentStatus IllegalArgumentException Environment LoggerManager lscAP IllegalStateException ASSERT lscm".split(" "), function(h, f, e, d, b, c, a, g, l, n, k, m, p, q, s, t, r, D, z, y, w, x, O, A, P, J, M, H) {
		function v(b, c) {
			this.C = v;
			this._callSuperConstructor(v);
			this.Pk = ++Q;
			this.Lf = this.Lk = this.Zc = this.pb = this.j = null;
			this.p = new m;
			this.ma = 0;
			this.g = 1;
			this.ve = y.ec;
			this.cq = new g;
			this.Vl = new l;
			this.Wl = new P;
			this.connectionOptions = this.cq;
			this.connectionDetails = this.Vl;
			this.connectionSharing = this.Wl;
			this.M = new a;
			this.ha = this.cq;
			this.ta = this.Vl;
			this.hc = this.Wl;
			b && this.ta.tt(b);
			c && this.ta.mt(c);
			this.M.hg(this);
			this.ha.hg(this);
			this.ta.hg(this);
			this.hc.pB(this);
			this.h = new p(this.ha);
			this.mn = 2E3;
			this.Kc = null;
			"undefined" != typeof console && O.isBrowser() && F.logWarn(A.resolve(411))
		}

		function I(a, b) {
			var d = c.Jm();
			d.Ll(b, a);
			d.Gh(b, a)
		}
		var B = A.getLoggerProxy(y.Ra),
			F = A.getLoggerProxy(y.bl),
			Q = 0,
			K = /^[a-zA-Z0-9_]*$/;
		v.setLoggerProvider = function(a) {
			A.setLoggerProvider(a)
		};
		v.LIB_NAME = "javascript_client";
		v.LIB_VERSION = "6.2.7 build 1679.2";
		v.simulateSilence = function(a) {
			H.HB(a)
		};
		v.prototype = {
			toString: function() {
				return ["[|LightstreamerClient", this.Pk, this.g, this.ma, "]"].join("|")
			},
			af: function(a, b, c) {
				this.j && this.j.ft(a, b, c);
				return !0
			},
			ds: function(a, b) {
				b != this.M && this.dispatchEvent("onPropertyChange", [a])
			},
			rq: function(a, b) {
				B.logInfo(A.resolve(412), a, b);
				this.qd(9);
				this.M.P("isLocalEngine", b);
				var c = new s(a, this.M, this.ha, this.ta, this.hc.Pu()),
					c = new k(this, c);
				this.sl(c);
				c.bound(!0)
			},
			hm: function() {
				this.qd(7);
				B.logInfo(A.resolve(413));
				this.dispatchEvent("onShareAbort")
			},
			Kv: function() {
				if(1 != this.g) {
					var a = this.g;
					this.qd(1);
					this.j && (5 == a ? (B.logInfo(A.resolve(414)), this.j.Fy()) : (B.logInfo(A.resolve(415)), this.j.un(), this.j.xe()))
				}
			},
			Gl: function(a) {
				return this.ma == a
			},
			uq: function(a, b, c, d, g) {
				this.qd(2);
				c || this.kA(a, g);
				this.pb && (this.pb.Qv(b), this.pb.ot(d));
				B.logDebug(A.resolve(426));
				(b = f.sx(a)) ? this.hc.os(this.ma, b, !0): this.Dp(this.ma, a) ? this.hc.Mj(this.ma) : c ? this.hc.Mj(this.ma) : this.ao(this.ma, g)
			},
			Gv: function(a, b) {
				if(b) {
					B.logInfo(A.resolve(416));
					var c = new k(this, a);
					this.qd(8);
					this.sl(c);
					c.bound(!1)
				} else B.logInfo(A.resolve(417)), this.qd(3), this.sl(this.Zc)
			},
			ao: function(a, b, c) {
				if(this.ma == a) {
					B.logDebug(A.resolve(427));
					c = this.rt((c || 100) + 50);
					this.Lf = null;
					this.Zc.ea(!0);
					var g = d.packTask(this.he, this, [a]);
					this.pb.FA(b, g, a) ? (g = d.packTask(this.Zy, this, [a + 1, b]), this.Zc.rz(this.pb, g) ? (B.logDebug(A.resolve(430)), this.hc.os(this.ma, b, !1)) : (B.logDebug(A.resolve(429), c), d.addTimedTask(this.ao, c, this, [a, b, c]))) : (B.logDebug(A.resolve(428), c), d.addTimedTask(this.ao, c, this, [a, b, c]))
				}
			},
			he: function(a) {
				this.ma == a && this.hc.Mj(this.ma, !0)
			},
			Zy: function(a) {
				this.ma == a && 3 == this.g && (B.logDebug(A.resolve(431)), this.Zc.ea(!0), this.ma == a && this.Aq(!1))
			},
			Xu: function(a) {
				this.pb && this.pb.ot(a)
			},
			Dp: function(a, c, g) {
				if(a != this.ma || !b.areCookiesEnabled()) return !0;
				var e = this.vy(c, g);
				if(!0 !== e && !1 !== e) return d.addTimedTask(this.Dp, e.oi, this, [a, c, e]), !1;
				if(g) {
					if(e) return !1;
					this.hc.Mj(this.ma)
				}
				return !0
			},
			vy: function(a, b) {
				var d = {
						oi: 0
					},
					g = !1,
					e = h.getTimeStamp(),
					f = c.Jm(),
					k = f.ck(a);
				if(!k) return B.logDebug(A.resolve(432)), !1;
				B.logDebug(A.resolve(433), this);
				for(var l = 0; l < k.length; l++) {
					var n = f.$f(a, k[l]);
					if(!n || 5 > n.length) I(k[l], a);
					else if(b && b[k[l]]) {
						if(n[y.Bc] != b[k[l]]) return B.logInfo(A.resolve(418)), !0;
						B.logInfo(A.resolve(419))
					} else {
						var p = Number(n[y.Bc]) + y.Xd + 2E3 - e; - 6E4 >= p ? (B.logInfo(A.resolve(420)), I(k[l], a)) : (p < this.mn && (p = this.mn), d[k[l]] = n[y.Bc], g = !0, d.oi = d.oi > p ? d.oi : p)
					}
				}
				if(g) return B.logInfo(A.resolve(421)), d;
				B.logInfo(A.resolve(422));
				return !1
			},
			Jr: function() {
				return 1 == this.g
			},
			cy: function() {
				return 7 == this.g
			},
			qd: function(a) {
				a == this.g ? M.verifyOk(2 == a || 1 == a) : (1 == this.g && 7 != a && f.xa(this.Pk, "lsPage", this, "P"), 7 != a && 6 != a && 5 != a && 1 != a && 8 != a || this.Fv(), 1 == a && f.Kl(this.Pk, "lsPage", "P"), this.g = a, this.ma++)
			},
			hy: function() {
				return 5 == this.g ? !0 : 4 == this.g ? !1 : null
			},
			kA: function(a, b) {
				if(!this.pb) {
					var c = d.packTask(this.rt, this);
					this.pb = new e(b || null, a, !0, c, this.Kc);
					this.Zc = new n(this, this.Pk);
					this.Lk = new q(this.Zc, new t(this), !1);
					this.pb.pC(d.packTask(this.he, this, [this.ma]))
				}
			},
			Fv: function() {
				this.pb && (this.pb.Su(), this.pb = null, this.Zc && (this.Zc.ka(), this.Zc = null), q.remove(this.Lk), this.Lk = null)
			},
			rt: function(a) {
				2500 < a ? a = 2500 : 50 > a && (a = 50);
				return this.Lf = this.Lf && this.Lf < a ? this.Lf : a
			},
			sl: function(a) {
				this.j && this.j != a && this.j.ka();
				this.j = a;
				this.h.Eo(a);
				this.p.Eo(a)
			},
			ls: function(a, b, c, d, g) {
				B.logDebug(A.resolve(434));
				this.qd(b ? 5 : 4);
				b || (this.ha.Hi(d), this.M.Hi(g), this.ta.Hi(c))
			},
			Aq: function(a) {
				this.mn = a ? 1E4 : 2E3;
				B.logInfo(A.resolve(423));
				this.M.Qg ? this.Lg(y.Bg) : this.Lg(y.ec);
				this.j.ka();
				this.j = null;
				w.isUnloading() || w.isUnloaded() ? this.qd(1) : (M.verifyOk(5 != this.g || a), this.hc.qz(this.ma))
			},
			uw: function() {
				if(5 == this.g || 4 == this.g) try {
					return this.j.tf().ix()
				} catch(a) {
					this.j && this.j.Ei && d.addTimedTask(this.j.Ei, 0, this.j)
				}
				return []
			},
			sv: function() {
				if(!this.ta.Lh) throw new J("Configure the server address before trying to connect");
				this.Jr() && this.hc.yv();
				if(this.cy()) throw new J("Cannot connect in the current status, reconfigure sharing policies.");
				F.logInfo(A.resolve(424));
				d.addTimedTask(this.Ku, 0, this)
			},
			Ku: function() {
				if(!this.ve || this.ve != y.CONNECTING && this.ve != y.Ve && 0 != this.ve.indexOf(y.Ib)) {
					F.logDebug(A.resolve(435));
					this.M.P("connectionRequested", !0);
					var a = this.j;
					a && a.yi()
				}
			},
			disconnect: function() {
				F.logInfo(A.resolve(425));
				d.addTimedTask(this.Lu, 0, this)
			},
			Lu: function() {
				F.logDebug(A.resolve(436));
				this.M.P("connectionRequested", !1);
				var a = this.j;
				a && a.zi()
			},
			yb: L("ve"),
			sendMessage: function(a, b, c, g, e) {
				if(!b) b = y.Cc;
				else if(!K.test(b)) throw new x("The given sequence name is not valid, use only alphanumeric characters plus underscore, or null");
				c = c ? this.checkPositiveNumber(c) : null;
				e = this.checkBool(e, !0);
				d.addTimedTask(this.Ju, 0, this, [a, b, g, c, e])
			},
			Ju: function(a, b, c, d, g) {
				5 != this.g && 4 != this.g || !this.j.qb ? g ? this.p.Uv(a, b, c, d) : c && this.p.fireEvent("onAbort", c, [a, !1]) : this.p.ah(a, b, c, d)
			},
			sk: function(a, b) {
				this.dispatchEvent("onServerError", [a, b])
			},
			io: function() {
				this.h.dA();
				this.p.iv()
			},
			PA: function() {
				this.h.Kx();
				this.p.Jx()
			},
			Lg: function(a) {
				a != this.ve && (this.ve = a, this.dispatchEvent("onStatusChange", [a]))
			},
			Jd: function(a) {
				return 5 != this.g && 4 != this.g || !this.j.qb ? !1 : (this.j.Rq(a), !0)
			},
			xx: function() {
				var a = [],
					b = this.h.yc,
					c;
				for(c in b) b[c].Bt || a.push(b[c]);
				return a
			},
			zo: function(a) {
				this.h.ni(a)
			},
			Pt: function(a) {
				this.h.gk(a)
			},
			addListener: function(a) {
				this._callSuperMethod(v, "addListener", [a])
			},
			removeListener: function(a) {
				this._callSuperMethod(v, "removeListener", [a])
			},
			getListeners: function() {
				return this._callSuperMethod(v, "getListeners")
			}
		};
		v.setLoggerProvider = v.setLoggerProvider;
		v.prototype.connect = v.prototype.sv;
		v.prototype.disconnect = v.prototype.disconnect;
		v.prototype.getStatus = v.prototype.yb;
		v.prototype.sendMessage = v.prototype.sendMessage;
		v.prototype.getSubscriptions = v.prototype.xx;
		v.prototype.subscribe = v.prototype.zo;
		v.prototype.unsubscribe = v.prototype.Pt;
		v.prototype.addListener = v.prototype.addListener;
		v.prototype.removeListener = v.prototype.removeListener;
		v.prototype.getListeners = v.prototype.getListeners;
		r(v, z, !1, !0);
		r(v, D, !0, !0);
		return v
	});
	define("lscAc", ["lscA", "ASSERT"], function(h, f) {
		function e(d, b, c) {
			this.Wf = d;
			this.Kr = b;
			this.fk = c
		}
		e.prototype = {
			rs: function(d, b, c) {
				this.po() && (f.verifyValue(b, 1), this.Wf.JB(this.fk, c))
			},
			Oz: function(d, b) {
				this.po() && this.Wf.KB(d, b, this.fk)
			},
			onItemUpdate: function(d) {
				if(this.po()) return f.verifyValue(d.bj(), 1), d = d.Sd, this.Wf.tB(d.length - 2), d = this.uv(d), this.Wf.update(d, !1, !0)
			},
			po: function() {
				return this.Wf.sr(this.Kr, this.fk)
			},
			uv: function(d) {
				var b = this.Wf,
					c = this.Kr,
					a = [];
				a[0] = b.Me;
				a[1] = c;
				a.Jc = [];
				for(var c = b.dr() + 2, g = 2, e = 2; e < c; e++) e == b.keyCode + 1 ? a[e] = this.fk : e == b.gb + 1 ? a[e] = "UPDATE" : e <= b.la.zb + 1 ? a[e] = h.Ag : (a[e] = d[g], d.Oo[g] ? a[e] = h.Ag : a.Jc.push(e - 1), g++);
				return a
			}
		};
		e.prototype.onSubscriptionError = e.prototype.Oz;
		e.prototype.onItemUpdate = e.prototype.onItemUpdate;
		e.prototype.onItemLostUpdates = e.prototype.rs;
		return e
	});
	define("lscAb", ["LoggerManager", "IllegalArgumentException", "lscA"], function(h, f, e) {
		function d(b, a, d, e, f) {
			this.Cy = a;
			this.By = b;
			this.pu = e;
			this.la = d;
			this.Sd = f
		}
		var b = h.getLoggerProxy(e.bl);
		d.prototype = {
			Im: L("By"),
			bj: L("Cy"),
			getValue: function(b) {
				b = this.$h(b);
				return(b = this.Sd[b]) && b.QC ? b.value : b
			},
			Ir: function(b) {
				b = this.$h(b);
				return !this.Sd.Oo[b]
			},
			sy: L("pu"),
			forEachChangedField: function(c) {
				for(var a = this.Sd.Jc, d = 0; d < a.length; d++) {
					var e = this.la.getName(a[d]),
						f = this.Sd[a[d] + 1];
					try {
						c(e, a[d], f)
					} catch(k) {
						b.logErrorExc(k, h.resolve(437))
					}
				}
			},
			Pq: function(c) {
				for(var a = 2; a < this.Sd.length; a++) {
					var d = a - 1,
						e = this.la.getName(d),
						f = this.Sd[a];
					try {
						c(e, d, f)
					} catch(k) {
						b.logErrorExc(k, h.resolve(438))
					}
				}
			},
			$h: function(b) {
				b = isNaN(b) ? this.la.oe(b) : b;
				if(null == b) throw new f("the specified field does not exist");
				if(0 >= b || b > this.la.Fm() + 1) throw new f("the specified field position is out of bounds");
				return b + 1
			},
			ex: function() {
				return this.Sd.length - 2
			},
			Kw: function(b) {
				return this.la.getName(b)
			}
		};
		d.prototype.getItemName = d.prototype.Im;
		d.prototype.getItemPos = d.prototype.bj;
		d.prototype.getValue = d.prototype.getValue;
		d.prototype.isValueChanged = d.prototype.Ir;
		d.prototype.isSnapshot = d.prototype.sy;
		d.prototype.forEachChangedField = d.prototype.forEachChangedField;
		d.prototype.forEachField = d.prototype.Pq;
		return d
	});
	define("lscX", [], function() {
		function h() {
			this.ac = null;
			this.zb = 0
		}
		h.prototype = {
			ut: G("ac"),
			Fm: function() {
				return this.ac ? this.zb + this.ac.zb : this.zb
			},
			Nd: G("zb")
		};
		return h
	});
	define("lscY", ["Inheritance", "lscX"], function(h, f) {
		function e(d) {
			this._callSuperConstructor(e);
			this.list = d;
			for(var b = {}, c = 0; c < d.length; c++) b[d[c]] = c + 1;
			this.bt = b;
			this.zb = d.length
		}
		e.prototype = {
			Nd: E(),
			Am: function() {
				return this.list.join(" ")
			},
			oe: function(d) {
				return this.bt[d] ? this.bt[d] : this.ac ? (d = this.ac.oe(d), null !== d ? d + this.zb : null) : null
			},
			getName: function(d) {
				return d > this.zb && this.ac ? this.ac.getName(d - this.zb) : this.list[d - 1] || null
			},
			Qc: L("list")
		};
		h(e, f);
		return e
	});
	define("lscZ", ["Inheritance", "lscX"], function(h, f) {
		function e(d) {
			this._callSuperConstructor(e);
			this.name = d
		}
		e.prototype = {
			Am: L("name"),
			oe: function(d) {
				return this.ac ? (d = this.ac.oe(d), null !== d ? d + this.zb : null) : null
			},
			getName: function(d) {
				return this.ac ? this.ac.getName(d - this.zb) : null
			},
			Qc: L("name")
		};
		h(e, f);
		return e
	});
	define("Matrix", [], function() {
		function h(f) {
			this.Y = f || {}
		}
		h.prototype = {
			insert: function(f, e, d) {
				e in this.Y || (this.Y[e] = {});
				this.Y[e][d] = f
			},
			get: function(f, e) {
				return f in this.Y && e in this.Y[f] ? this.Y[f][e] : null
			},
			del: function(f, e) {
				if(!(!f in this.Y)) {
					e in this.Y[f] && delete this.Y[f][e];
					for(var d in this.Y[f]) return;
					delete this.Y[f]
				}
			},
			insertRow: function(f, e) {
				this.Y[e] = f
			},
			getRow: function(f) {
				return f in this.Y ? this.Y[f] : null
			},
			delRow: function(f) {
				f in this.Y && delete this.Y[f]
			},
			getEntireMatrix: L("Y"),
			isEmpty: function() {
				for(var f in this.Y) return !1;
				return !0
			},
			forEachElement: function(f) {
				for(var e in this.Y) this.forEachElementInRow(e, f)
			},
			forEachRow: function(f) {
				for(var e in this.Y) f(e)
			},
			forEachElementInRow: function(f, e) {
				var d = this.Y[f],
					b;
				for(b in d) e(d[b], f, b)
			}
		};
		h.prototype.insert = h.prototype.insert;
		h.prototype.get = h.prototype.get;
		h.prototype.del = h.prototype.del;
		h.prototype.insertRow = h.prototype.insertRow;
		h.prototype.getRow = h.prototype.getRow;
		h.prototype.delRow = h.prototype.delRow;
		h.prototype.getEntireMatrix = h.prototype.getEntireMatrix;
		h.prototype.forEachElement = h.prototype.forEachElement;
		h.prototype.forEachElementInRow = h.prototype.forEachElementInRow;
		h.prototype.forEachRow = h.prototype.forEachRow;
		h.prototype.isEmpty = h.prototype.isEmpty;
		return h
	});
	define("Subscription", "lscAc lscAb lscY lscZ Inheritance Setter Matrix Executor lscA EventDispatcher IllegalArgumentException IllegalStateException LoggerManager lscG ASSERT Helpers".split(" "), function(h, f, e, d, b, c, a, g, l, n, k, m, p, q, s, t) {
		function r(b, c, d) {
			this._callSuperConstructor(r);
			b = (new String(b)).toUpperCase();
			if(!b || !y[b]) throw new k("The given value is not a valid subscription mode. Admitted values are MERGE, DISTINCT, RAW, COMMAND");
			this.ld = b;
			this.la = this.Mc = this.Pb = this.Ub = this.zf = this.Af = null;
			this.rc = "RAW" === b ? null : "yes";
			this.ik = this.Me = this.Ji = this.ji = this.sp = this.xp = this.Ge = this.$a = null;
			this.ze = new a;
			this.Vc = new a;
			this.e = null;
			this.ab = 1;
			this.Nk = 0;
			this.fc = null;
			this.Fb = 0;
			this.Bb = null;
			this.Fh;
			this.ak;
			this.mk = this.Lj = 0;
			this.sb = this.ld == l.ug ? 2 : 1;
			this.Po = this.keyCode = this.gb = null;
			this.Pd = new a;
			this.Th = this.Ke = this.Od = null;
			this.TB = l.hl;
			if(c) {
				if(!d || !t.isArray(d)) throw new k("Please specify a valid field list");
				t.isArray(c) ? this.Qh(c) : this.Qh([c]);
				this.wk(d)
			} else if(d) throw new k("Please specify a valid item or item list");
		}

		function D(a, b) {
			for(var c = 0; c < a.length; c++)
				if(a[c]) {
					if(-1 < a[c].indexOf(" ")) throw new k(b + A);
					if(!isNaN(a[c])) throw new k(b + P);
				} else throw new k(b + O);
		}

		function z(a, b) {
			return a - b
		}
		var y = {
				COMMAND: !0,
				RAW: !0,
				MERGE: !0,
				DISTINCT: !0
			},
			w = l.Ag,
			x = p.getLoggerProxy(l.zg),
			O = " name cannot be empty",
			A = " name cannot contain spaces",
			P = " name cannot be a number";
		r.prototype = {
			toString: function() {
				return ["[|Subscription", this.ab, this.Nk,
					this.fc, this.Fb, this.Bb, "]"
				].join("|")
			},
			Vp: function() {
				this.Me = null;
				this.ze = new a;
				this.Vc = new a;
				this.la.Nd(0);
				this.Ub.Nd(0);
				3 == this.sb && (this.la.ut(null), this.Pd = new a);
				this.ak = this.Fh = null;
				x.logDebug(p.resolve(443), this)
			},
			kz: function(a, b, c) {
				this.Cb();
				if(!this.Ub) throw new k("Invalid Subscription, please specify an item list or item group");
				if(!this.la) throw new k("Invalid Subscription, please specify a field list or field schema");
				this.ab = 5;
				this.Bb = b;
				this.fc = a;
				this.e = c;
				this.Fb++;
				this.Lj++;
				s.verifyValue(this.Lj, 1);
				this.bh();
				x.logInfo(p.resolve(440), this);
				return !0
			},
			Nz: function() {
				this.Fb++;
				this.ab = 2;
				x.logDebug(p.resolve(444), this)
			},
			Pj: function(a) {
				this.Me = a;
				this.ab = 3;
				x.logDebug(p.resolve(445), this)
			},
			Dz: function() {
				var a = this.te();
				this.ab = 5;
				this.Vp();
				a && this.ks();
				x.logDebug(p.resolve(446), this)
			},
			Gz: function() {
				this.Wx();
				var a = this.te();
				this.ab = 1;
				this.fc = this.Bb = null;
				delete this.ik;
				3 == this.sb && this.yA();
				this.Vp();
				this.Lj--;
				s.verifyValue(this.Lj, 0);
				a && this.ks();
				this.e = null;
				x.logDebug(p.resolve(447), this)
			},
			Pz: function() {
				this.Fh && (g.addPackedTimedTask(this.Fh, this.ak), this.ak = this.Fh = null, x.logDebug(p.resolve(448), this))
			},
			Lz: function(a, b, c, d) {
				this.ab = 4;
				this.mk++;
				s.verifyValue(this.mk, 1);
				x.logInfo(p.resolve(441), this);
				3 == this.sb && this.la.ut(this.Th);
				this.Mc && 1 != this.sb && this.vB(b, a);
				this.Ub.Nd(c);
				this.la.Nd(d);
				this.dispatchEvent("onSubscription")
			},
			ks: function() {
				this.mk--;
				s.verifyValue(this.mk, 0);
				x.logInfo(p.resolve(442), this);
				this.dispatchEvent("onUnsubscription")
			},
			yA: function() {
				var a = this;
				this.Pd.forEachElement(function(b, c, d) {
					a.Xn(c, d)
				})
			},
			tA: function() {
				var a = this;
				this.Pd.forEachElementInRow(function(b, c, d) {
					a.Xn(c, d)
				})
			},
			Hl: function(a) {
				return a == this.Fb
			},
			Sp: function(a) {
				return this.Bb == a
			},
			Iu: function(a, b) {
				this.Fh = a;
				this.ak = b
			},
			Uq: function() {
				if(null != this.$a) {
					var a = this.$a;
					return {
						LS_requested_max_frequency: "unlimited" == a ? 0 : a
					}
				}
				return {}
			},
			bh: function() {
				var a = {
					LS_mode: this.ld,
					LS_id: encodeURIComponent(this.Ub.Am()),
					LS_schema: encodeURIComponent(this.la.Am())
				};
				null != this.Ji && (a.LS_data_adapter = encodeURIComponent(this.Ji));
				null != this.ji && (a.LS_selector = encodeURIComponent(this.ji));
				null != this.xp && (a.LS_start = this.xp);
				null != this.sp && (a.LS_end = this.sp);
				null != this.rc && (a.LS_snapshot = "yes" === this.rc ? "true" : "no" === this.rc ? "false" : this.rc);
				q.ca(a, this.Uq());
				if(null != this.Ge) {
					var b = this.Ge;
					"unlimited" != b && 0 < b && (a.LS_requested_buffer_size = b)
				}
				x.logDebug(p.resolve(449), this);
				return this.ik = a
			},
			sB: function() {
				if(this.ld == l.ug && null != this.Pb && (this.gb = this.Pb.oe("command"), this.keyCode = this.Pb.oe("key"), !this.gb || !this.keyCode)) throw new k("A field list for a COMMAND subscription must contain the key and command fields");
			},
			vB: function(a, b) {
				x.logDebug(p.resolve(450), this, a, b);
				this.gb = a;
				this.keyCode = b
			},
			Cb: function() {
				if(this.ph()) throw new m("Cannot modify an active Subscription, please unsubscribe before applying any change");
			},
			Wx: function() {
				if(!this.ph()) throw new m("Subscription is not active");
			},
			bo: function() {
				if(this.ld != l.ug) throw new m("Second level field list is only available on COMMAND Subscriptions");
			},
			Sl: function() {
				if(this.ld != l.ug) throw new m("This method can only be used on COMMAND subscriptions");
			},
			iy: function() {
				return 1 == this.ab
			},
			an: function() {
				return 2 == this.ab
			},
			Zm: function() {
				return 3 == this.ab
			},
			te: function() {
				return 4 == this.ab
			},
			ky: function() {
				return 5 == this.ab
			},
			ph: function() {
				return 1 != this.ab
			},
			rh: function() {
				return this.te()
			},
			Qh: function(a) {
				this.Cb();
				if(!t.isArray(a)) throw new k(" Please specifiy a valid array");
				D(a, "An item");
				this.Af = null == a ? null : new e(a);
				this.zf = null;
				this.Ub = this.Af
			},
			Vw: function() {
				if(!this.Af) {
					if(this.zf) throw new m("This Subscription was initiated using an item group, use getItemGroup instead of using getItems");
					throw new m("The  item list/item group of this Subscription was not initiated");
				}
				return this.Af.Qc()
			},
			qt: function(a) {
				this.Cb();
				this.Af = null;
				this.Ub = this.zf = null == a ? null : new d(a)
			},
			Uw: function() {
				if(!this.zf) {
					if(this.Af) throw new m("This Subscription was initiated using an item list, use getItems instead of using getItemGroup");
					throw new m("The  item list/item group of this Subscription was not initiated");
				}
				return this.zf.Qc()
			},
			wk: function(a) {
				this.Cb();
				if(!t.isArray(a)) throw new k(" Please specifiy a valid array");
				D(a, "A field");
				this.Pb = null == a ? null : new e(a);
				this.Mc = null;
				this.la = this.Pb;
				this.sB()
			},
			Zq: function() {
				if(!this.Pb) {
					if(this.Mc) throw new m("This Subscription was initiated using a field schema, use getFieldSchema instead of using getFields");
					throw new IllegalStateExceptio("The field list/field schema of this Subscription was not initiated");
				}
				return this.Pb.Qc()
			},
			jo: function(a) {
				this.Cb();
				this.Pb = null;
				this.la = this.Mc = null == a ? null : new d(a)
			},
			Lw: function() {
				if(!this.Mc) {
					if(this.Pb) throw new m("This Subscription was initiated using a field list, use getFields instead of using getFieldSchema");
					throw new IllegalStateExceptio("The field list/field schema of this Subscription was not initiated");
				}
				return this.Mc.Qc()
			},
			dj: L("ld"),
			Oh: function(a) {
				this.Cb();
				this.Ji = a;
				x.logDebug(p.resolve(451), this, a)
			},
			Hw: L("Ji"),
			Ak: function(a) {
				this.Cb();
				this.ji = a;
				x.logDebug(p.resolve(452), this, a)
			},
			px: L("ji"),
			Rh: function(a) {
				a && (a = new String(a), a = a.toLowerCase());
				var b = this.$a;
				if(this.ph()) {
					if(!a && 0 != a || null == this.$a) throw new m("Can't change the frequency from/to 'unfiltered' or null while the Subscription is active");
					if("unfiltered" == a || "unfiltered" == this.$a) throw new m("Can't change the frequency from/to 'unfiltered' or null while the Subscription is active");
				}
				if(a || 0 == a)
					if("unfiltered" == a || "unlimited" == a) this.$a = a;
					else try {
						this.$a = this.checkPositiveNumber(a, !1, !0)
					} catch(c) {
						throw new k("The given value is not valid for this setting; use null, 'unlimited', 'unfiltered' or a positive number instead");
					} else this.$a = null;
				if((this.an() || this.Zm() || this.te()) && String(b) != String(this.$a) && (this.bh(), this.e.jd(this, this.Uq()), 3 == this.sb)) {
					var d = this;
					this.Pd.forEachElement(function(a) {
						s.verifyOk(d.te());
						a.Rh(d.$a)
					})
				}
				x.logDebug(p.resolve(453), this, this.$a)
			},
			mx: L("$a"),
			zk: function(a) {
				this.Cb();
				if(a || 0 == a)
					if(a = new String(a), a = a.toLowerCase(), "unlimited" == a) this.Ge = a;
					else try {
						this.Ge = this.checkPositiveNumber(a)
					} catch(b) {
						throw new k("The given value is not valid for this setting; use null, 'unlimited' or a positive number instead");
					} else this.Ge = null;
				x.logDebug(p.resolve(454), this, this.Ge)
			},
			lx: L("Ge"),
			mo: function(a) {
				this.Cb();
				if(a || 0 == a)
					if(a = new String(a), a = a.toLowerCase(), "no" == a) this.rc = a;
					else {
						if(this.ld == l.il) throw new m("Snapshot is not permitted if RAW was specified as mode");
						if("yes" == a) this.rc = a;
						else {
							if(isNaN(a)) throw new k("The given value is not valid for this setting; use null, 'yes', 'no' or a positive number instead");
							if(this.ld != l.el) throw new m("Numeric values are only allowed when the subscription mode is DISTINCT");
							try {
								this.rc = this.checkPositiveNumber(a)
							} catch(b) {
								throw new k("The given value is not valid for this setting; use null, 'yes', 'no' or a positive number instead");
							}
						}
					} else this.rc = null;
				x.logDebug(p.resolve(455), this, this.rc)
			},
			nx: L("rc"),
			UA: function(a) {
				this.Cb();
				this.bo();
				if(!t.isArray(a)) throw new k(" Please specifiy a valid array");
				D(a, "A field");
				this.Od = null == a ? null : new e(a);
				this.Ke = null;
				this.Th = this.Od;
				this.Ns()
			},
			zw: function() {
				if(!this.Od) {
					if(this.Ke) throw new m("The second level of this Subscription was initiated using a field schema, use getCommandSecondLevelFieldSchema instead of using getCommandSecondLevelFields");
					throw new m("The second level of this Subscription was not initiated");
				}
				return this.Od.Qc()
			},
			TA: function(a) {
				this.Cb();
				this.bo();
				this.Od = null;
				this.Th = this.Ke = null == a ? null : new d(a);
				this.Ns()
			},
			yw: function() {
				if(!this.Ke) {
					if(this.Od) throw new m("The second level of this Subscription was initiated using a field list, use getCommandSecondLevelFields instead of using getCommandSecondLevelFieldSchema");
					throw new m("The second level of this Subscription was not initiated");
				}
				return this.Ke.Qc()
			},
			SA: function(a) {
				this.Cb();
				this.bo();
				this.Po = a;
				x.logDebug(p.resolve(456), this, a)
			},
			xw: L("Po"),
			getValue: function(a, b) {
				return this.ze.get(this.Nt(a), this.Mt(b))
			},
			Aw: function(a, b, c) {
				this.Sl();
				return this.Vc.get(this.Nt(a) + " " + b, this.Mt(c, !0))
			},
			fr: function() {
				this.Sl();
				if(!this.Mc && this.Pb) throw new m("This Subscription was initiated using a field list, key field is always 'key'");
				if(null == this.keyCode) throw new m("The position of the key field is currently unknown");
				return this.keyCode
			},
			Vq: function() {
				this.Sl();
				if(!this.Mc && this.Pb) throw new m("This Subscription was initiated using a field list, command field is always 'command'");
				if(null == this.gb) throw new m("The position of the command field is currently unknown");
				return this.gb
			},
			Mt: function(a, b) {
				var c = this.$h(a, this.la, b);
				if(null === c) throw new k("the specified field does not exist");
				if(!1 === c) throw new k("the specified field position is out of bounds");
				return c
			},
			Nt: function(a) {
				a = this.$h(a, this.Ub);
				if(null === a) throw new k("the specified item does not exist");
				if(!1 === a) throw new k("the specified item position is out of bounds");
				return a
			},
			$h: function(a, b, c) {
				a = isNaN(a) ? b.oe(a) : a;
				return null == a ? null : 0 >= a || a > (c ? b.Fm() : b.zb) ? !1 : a
			},
			Ns: function() {
				this.sb = null == this.Th ? 2 : 3
			},
			rm: function(a) {
				this.dispatchEvent("onEndOfSnapshot", [this.Ub.getName(a), a])
			},
			Nl: function(b) {
				var c = this.Ub.getName(b);
				2 == this.sb ? this.Vc = new a : 3 == this.sb && (this.Vc = new a, this.tA(b));
				this.dispatchEvent("onClearSnapshot", [c, b])
			},
			Ky: function(a, b) {
				this.dispatchEvent("onItemLostUpdates", [this.Ub.getName(a), a, b])
			},
			JB: function(a, b) {
				this.dispatchEvent("onCommandSecondLevelItemLostUpdates", [b, a])
			},
			OA: function(a, b) {
				this.dispatchEvent("onSubscriptionError", [a, b])
			},
			KB: function(a, b, c) {
				this.dispatchEvent("onCommandSecondLevelSubscriptionError", [a, b, c])
			},
			update: function(a, b, c) {
				s.verifyValue(4, this.ab);
				var d = a[1],
					g = new String(d);
				1 != this.sb && (g = this.Xz(a, d, c));
				3 != this.sb || c || this.Lx(a);
				1 == this.sb ? this.St(this.ze, d, a, !0) : this.St(this.Vc, g, a, !0);
				a = new f(this.Ub.getName(d), d, this.la, b, a);
				this.dispatchEvent("onItemUpdate", [a]);
				"DELETE" == this.Vc.get(g, this.gb) && this.Vc.delRow(g)
			},
			St: function(a, b, c, d) {
				var g = c.length - 2,
					e = 1,
					f = 2;
				for(c.Oo = {}; e <= g; e++, f++) c[f] !== w ? a.insert(c[f], b, e) : d && (c[f] = a.get(b, e), c.Oo[f] = !0)
			},
			Xz: function(a, b, c) {
				var d;
				if("undefined" == typeof a[this.keyCode + 1] || "undefined" == typeof a[this.gb + 1]) return x.logWarn(p.resolve(439)), null;
				d = a[this.keyCode + 1] == w ? b + " " + this.ze.get(b, this.keyCode) : b + " " + a[this.keyCode + 1];
				if(c) a[this.keyCode + 1] = w, a[this.gb + 1] == this.Vc.get(d, this.gb) ? a[this.gb + 1] = w : (a.Jc.push(this.gb), a.Jc.sort(z));
				else {
					a.Jc = [];
					for(c = 2; c < a.length; c++) a[c] && a[c] == w ? a[c] = this.ze.get(b, c - 1) : this.ze.insert(a[c], b, c - 1), a[c] == this.Vc.get(d, c - 1) ? a[c] = w : a.Jc.push(c - 1);
					if(3 == this.sb && (b = this.dr() + 2, b > a.length))
						for(c = a.length; c < b; c++) a[c] = w
				}
				return d
			},
			Lx: function(a) {
				var b = a[1],
					c = a[this.keyCode + 1] == w ? this.ze.get(b, this.keyCode) : a[this.keyCode + 1];
				a = a[this.gb + 1];
				var d = this.sr(b, c);
				"DELETE" == a ? d && this.Xn(b, c) : d || this.Du(b, c)
			},
			My: function() {
				this.Bt = !0
			},
			sr: function(a, b) {
				return null !== this.Pd.get(a, b)
			},
			Xn: function(a, b) {
				this.e.gk(this.Pd.get(a, b));
				this.Pd.del(a, b)
			},
			Du: function(a, b) {
				var c = new r(this.TB);
				c.My();
				this.Pd.insert(c, a, b);
				try {
					c.Qh([b])
				} catch(d) {
					this.dispatchEvent("onCommandSecondLevelSubscriptionError", [14, "The received key value is not a valid name for an Item", b]);
					return
				}
				this.Od ? c.wk(this.Od.Qc()) : c.jo(this.Ke.Qc());
				c.Oh(this.Po);
				c.mo("yes");
				c.$a = this.$a;
				var g = new h(this, a, b);
				c.addListener(g);
				this.e.ni(c)
			},
			tB: function(a) {
				this.Th.Nd(a)
			},
			dr: function() {
				return this.la.Fm()
			},
			addListener: function(a) {
				this._callSuperMethod(r, "addListener", [a])
			},
			removeListener: function(a) {
				this._callSuperMethod(r, "removeListener", [a])
			},
			getListeners: function() {
				return this._callSuperMethod(r, "getListeners")
			}
		};
		r.prototype.isActive = r.prototype.ph;
		r.prototype.isSubscribed = r.prototype.rh;
		r.prototype.setItems = r.prototype.Qh;
		r.prototype.getItems = r.prototype.Vw;
		r.prototype.setItemGroup = r.prototype.qt;
		r.prototype.getItemGroup = r.prototype.Uw;
		r.prototype.setFields = r.prototype.wk;
		r.prototype.getFields = r.prototype.Zq;
		r.prototype.setFieldSchema = r.prototype.jo;
		r.prototype.getFieldSchema = r.prototype.Lw;
		r.prototype.getMode = r.prototype.dj;
		r.prototype.setDataAdapter = r.prototype.Oh;
		r.prototype.getDataAdapter = r.prototype.Hw;
		r.prototype.setSelector = r.prototype.Ak;
		r.prototype.getSelector = r.prototype.px;
		r.prototype.setRequestedMaxFrequency = r.prototype.Rh;
		r.prototype.getRequestedMaxFrequency = r.prototype.mx;
		r.prototype.setRequestedBufferSize = r.prototype.zk;
		r.prototype.getRequestedBufferSize = r.prototype.lx;
		r.prototype.setRequestedSnapshot = r.prototype.mo;
		r.prototype.getRequestedSnapshot = r.prototype.nx;
		r.prototype.setCommandSecondLevelFields = r.prototype.UA;
		r.prototype.getCommandSecondLevelFields = r.prototype.zw;
		r.prototype.setCommandSecondLevelFieldSchema = r.prototype.TA;
		r.prototype.getCommandSecondLevelFieldSchema = r.prototype.yw;
		r.prototype.setCommandSecondLevelDataAdapter = r.prototype.SA;
		r.prototype.getCommandSecondLevelDataAdapter = r.prototype.xw;
		r.prototype.getValue = r.prototype.getValue;
		r.prototype.getCommandValue = r.prototype.Aw;
		r.prototype.getKeyPosition = r.prototype.fr;
		r.prototype.getCommandPosition = r.prototype.Vq;
		r.prototype.addListener = r.prototype.addListener;
		r.prototype.removeListener = r.prototype.removeListener;
		r.prototype.getListeners = r.prototype.getListeners;
		b(r, n, !1, !0);
		b(r, c, !0, !0);
		return r
	});
	define("LogMessages", ["LoggerManager"], function(h) {
		function f() {}
		var e = [],
			e = "You have Norton Internet Security or Norton\nPersonal Firewall installed on this computer.\nIf no real-time data show up, then you need\nto disable Ad Blocking in Norton Internet\nSecurity and then refresh this page{Trying to attach to a cross-page engine{Exception while trying to attach to a cross-page engine{Manually set page{Reset page{Testing page{Cross-page engine not found{Probably blocked popup detected: firefox-safari case{Cross-page engine attached{Verify if the found cross-page engine can be used{can't use found cross-page engine: page is now closed{can't use found cross-page engine: uneffective popup detected, chrome case{problem closing the generated popup{Probably blocked popup detected: opera common case{can't use found cross-page engine: Lightstreamer singleton not available{can't use found cross-page engine: Lightstreamer singleton content unavailable{Ready to use found cross-page engine: looks ok{can't use found cross-page engine: exception throw while accessing it{Removing wrong address?{SharedStatus is ready{Started refresh thread{There is a concurrent engine. Close this one{Stopped refresh thread{Engine is probably dying, skip one cookie refresh{Checking status{No engines{Checking shared status to verify if there are similar engines alive{Engine found, no values though{Engine found, not compatible though{Write engine shared status{Found an engine with a newer status{try auto-search to get sharing Window{verify given pointer to get sharing Window{Giving up search for sharing Window{Testing sharing window{Test sharing window result: {Sharing window identified{Sharing window unexpectedly disappeared{Giving up search for sharing Window due to Opera behavior{Giving up search for sharing Window, special case detected{Giving up search for sharing Window,no special case detected{different hosts case detected{Opera case detected{Chrome case detected{Safari (\x3e\x3d7) case detected{No compatible sharing detected{Unexpected missing values in sharing cookie{Skipping already-used cookie{Skipping not compatible engine{Removing sharing from black-list{Slow to update cookie detected{Skipping too-old cookie{Prepare cookie for update-check{update-check failed{Valid sharing detected{Testing identified engine{not IN global{not IN ITS global{exception {Testing available engines{exception {Starting share check{Stopping share check{New value for setting received from API{New value for setting received from internal settings{Broadcasting setting to shared LightstreamerClient instances{Setting changed, firing notification{Unexpectedly missing session id{Bind request generated{Create request generated{Destroy request generated{Force rebind request generated{Path selected{Received session start notification{Received session end notification{Unaexpectedly found remote window for a second time{synchronization with engine lost{checking binding synchronization{checking session synchronization{Sending cross-window event to engine{Sending cross-window session-event to engine{Sending cross-window sync-event to engine{Sending cross-window sync-session-event to engine{Sending event{Unable to send message to remote engine, will check engine health{Unexpected state while changing subscription params{Unexpected call{Subscribing subscription{Unsubscribing subscription{Requesting an id for Subscription to the engine{Received an id for Subscription from the engine{Sending Subscription authorization to the engine{Restoring all pending Subscriptions{Pausing active Subscription{Pausing all active Subscriptions{Missing expected cross-page event handler{Exception thrown while executing cross-page event handler{Event received{Closing cross-window bridge{Exception while sending cross-window event to client. The client will be removed{Sending cross-window event to client{Sending cross-window session event to client{Sending cross-window session-changing event to client{Exception while accessing cross-window client{Page proxy reference broken{Client reference broken{Handler reference broken{Page number mismatching{Broken due to exception{Exception while accessing cross-window client's subscription{newPage cross-window event received{table cross-window event received{tableRequestSubmission cross-window event received{tableRemove cross-window event received{update subscription cross-window event received{deletePage cross-window event received{sendLog cross-window event received{sendMex cross-window event received{engineConfiguration cross-window event received{callConnect cross-window event received{callDisconnect cross-window event received{Dismissing subscription that's still indexed from a client that was dismissed{Client unexpectedly disconnected{Client unexpectedly disappeared while handling its subscription{There is probably another web application connected to the same Lightstreamer Server within this browser instance. That could prevent the current application from connecting to the Server. Please close the other application to unblock the current one{Can't find page anymore{Can't find subscription anymore{New remote client attached to engine{New local client attached to engine{Dismissing subscription: before it was completely activated{Prepare to send unsubscription request to server{Dismissing subscription{Updating subscription params: before it was completely activated{Updating subscription params{Dismissing client{Notify back to the client that the subscription was handled{Dismissing all clients{It has been detected that the JavaScript engine of this browser is not respecting the timeouts in setTimeout method calls. The Client has been disconnected from the Server in order to avoid reconnection loops. To try again, just refresh the page.{Unexpected openSocket call{Unexpected WebSocket _load call{Open path is disappeared{Unexpected send outcome while websocket is ready-to-send{Closing WebSocket connection{Error closing WebSocket connection{Error opening WebSocket connection{timeout on WS open{error on closing a timed out WS{Preparing to bind on WebSocket connection{Sending data over WebSocket{Error sending data over WebSocket{New data received on connection opened using WebSocket{Error on WebSocket connection{WebSocket connection ready{WebSocket connection close event received{Unexpected phase during binding of session{Unexpected phase during slow handling{Unexpected timeout event while session is _OFF{Unexpected error event while session is an non-active status{Unexpected loop event while session is an non-active status{Unexpected push event while session is an non-active status{Unexpected phase after create request sent{Unexpected phase after bind request sent{Unexpected phase during OK execution{Unexpected empty start time{Unexpected session id received on bind OK{Opening new session{Binding session{Closing session{Sending request to the server to force a rebind on the current connection{Sending request to the server to destroy the current session{Mad timeouts? Avoid connection{Opening on server, send destroy{Binding session{Switch requested{Slow requested{Session shutdown{Make pause before next bind{Timeout event{Synch event received{Available bandwidth event received{Error41 event received{Keepalive event received{OK event received{Loop event received{End event received{Closing connection opened using CORS-XHR{Error non closing connection opened using CORS-XHR{Sending request using CORS-XHR{Error opening connection using CORS-XHR{New data received on connection opened using CORS-XHR{Connection opened using CORS-XHR completed{Error reading CORS-XHR status{Closing connection opened using XDomainRequest{Error non closing connection opened using XDomainRequest{Sending request using XDomainRequest{Error opening connection using XDomainRequest{Error on connection opened using XDomainRequest{New data received on connection opened using XDomainRequest{Connection opened using XDomainRequest completed{Closing connection opened using html form; actually doing nothing{Sending request using html form{Error while sending request using html form{Closing connection opened using replace on forever-frame{Sending request using replace on forever-frame{Error while sending request using  replace on forever-frame{Loading XHR frame to perform non-cross-origin requests{Client is offline, will retry later to load XHR frame{XHR frame loaded{XHR frame loading timeout expired, try to reload{XHR frame loading timeout expired again, will not try again{Passing request to the XHR frame{Error passing request to the XHR frame{Sending request using XHR{Closing connection opened using XHR{Error closing connection opened using XHR{Error reading XHR status{XHR response complete{Error on connection opened using XHR{Error on disposing XHR's callback{Error on disposing XHR{Streaming enabled on XHR{New data received on connection opened using XHR{XHR response complete{Error opening connection using JSONP technique{Sending request using JSONP technique{Closing connection opened using JSONP technique{Verify if a connection class is appropriate{This class is not available on the current environment{Cross-origin request is needed, this class is not able to make cross-origin requests{Cookies on request are required, this class can't guarantee that cookies will be actually sent{Cross-protocol request is needed, this class is not able to make cross-protocol requests{Extra headers are given, this class is not able to send requests containing extra headers{This class can't be used in the current context{This class is good{Searching for an appropriate connection class{Restart connection selector{Unable to use available connections to connect to server{Client is offline, delaying connection to server{Connection request generated{Connection currently unavailable, delaying connection{Connection open to the server{Unexpected ws phase while opening connection{Unexpected ws phase during binding{Unexpected phase for an clean end of a WS{Unexpected connection error on a connection that was not yet open{can't be unable-to-open since the connection is already open{A control link was received while earlyWSOpenEnabled is set to true, a WebSocket was wasted.{Unexpected WebSocket failure{Open WebSocket to server{WebSockets currently unavailable, delaying connection{Connection to server bound upon WebSocket{Connection to server open upon WebSocket{WebSocket was broken before it was used{WebSocket was broken while we were waiting the first bind{WebSocket was broken while we were waiting{Unexpected message outcome sequence{Changing reference session{Command phase check{Unexpected command received, ignoring{Sync message received while session wasn't in receiving status{Huge delay detected by sync signals. Restored from standby/hibernation?{Delay detected by sync signals{Sync message received{First sync message, check not performed{No delay detected by sync signals{No delay detected by sync signals{Unexpected request type was given to this batch{Unexpected request type was given to this batch; expecting ADD REMOVE DESTROY or CONSTRAIN{ADD after REMOVE?{Trying to remove by index non-existent request{Trying to remove by key non-existent request{Storing request{Substituting CONSTRAINT or FORCE_REBIND request{Replacing 'second' ADD request with a REMOVE request for the same subscription{REMOVE request already stored, skipping{ADD request for the involved subscription was not yet sent; there is no need to send the related REMOVE request or the original ADD one, removing both{Same session id on different servers, store two different DESTROY requests{Verified duplicated DESTROY request, skipping{Duplicated ADD or CHANGE_SUB request, substitute the old one with the new one{Storing confirmed{Batch handler unexpectedly idle; a batch was waiting{Batch handler unexpectedly not idle; nothing ready to be sent was found{Batch object not null{Unexpected sending outcome{Can't find an appropriate connection to send control batch{Unable to find a connection for control requests, will try again later{A single request size exceeds the \x3crequest_limit\x3e configuration setting for the Server. Trying to send it anyway although it will be refused{Start sending reverse heartbeat to the server{Stop sending reverse heartbeat to the server{New request to be sent to server{Some controls don't need to be sent anymore, keep on dequeing{Delaying control requests; waiting for a connection to become available{Control request sent through HTTP connection{Control request sent through WebSocket, keep on dequeuing{Control requests queue is now empty{Control request got answer{Error from network{Batch length limit changed{Preparing reverse heartbeat{Close current connection if any and applicable{Reset Controls handler status{Enabling control requests over WebSocket now{Disabling control requests over WebSocket now{Still waiting previous control request batch to return{Ready to dequeue control requests to be sent to server{starting dequeuing{Send previously composed batch{Generate and send new batch{Empty batch, exit{Ready to send batch on net, choosing connection{WebSocket should be available, try to send through it{Empty request was generated, exit{Connection for control batch chosen{Empty request for HTTP was generated, exit{Connection failed, will try a different connection{Connection temporarily unavailable, will try later{Ack received for message{OK outcome received{DISCARDED outcome received{DENIED outcome received{ERROR outcome received{Closing message handler{Activating message handler{Preparing message request{Forward prepared message to control handler{No ack was received for a message; forwarding it again to the control handler{Ack received, stopping automatic retransmissions{Ack received, no outcome expected, clean structures{Not waiting for ack, purging{Message handled, clean structures{Message on the net notification{Unexpected error occurred while executing server-sent commands!{Enqueuing received data{Dequeuing received data{Data can't be handled{Unexpected error occurred while executing server-sent commands!{Enqueuing received data{Dequeuing received data{Unexpected fallback type; switching because the current session type cannot be established{Unexpected fallback type; switching because of a slow connection was detected{Unexpected fallback type switching with new session{Unexpected fallback type switching with a force rebind{Unexpected fallback type switching because of a failed force rebind{Can't initiate session, giving up, disabling automatic reconnections{Unable to establish session of the current type. Switching session type{Slow session detected. Switching session type{Setting up new session type{Switching current session type{Slow session switching{Failed to switch session type. Starting new session{Session started{Session bound{Session closed{Discarding update for dismissed page{Received new update{Discarding lost updates notification for dismissed page{Received lost updates event{Discarding end of snapshot notification for dismissed page{Received end of snapshot event{Discarding snapshot clearing notification for dismissed page{Received snapshot clearing event{Received server error event{Discarding subscription error notification for dismissed page{Received subscription error event{Discarding unsubscription notification for dismissed page{Received unsubscription event{Received reconfiguration OK event{Discarding subscription notification for dismissed page{Received subscription event{Received message ack{Received message-ok notification{Received message-deny notification{Received message-discarded notification{Received message-error notification{New control link received{A valid sharing name was not specified, using 'default'{Dismissing current session and stopping automatic reconnections.{Opening a new session and starting automatic reconnections.{pageCallback cross-window event received{configurationChange cross-window event received{statusChange cross-window event received{sessionReadyNotification cross-window event received{sessionEnd cross-window event received{engineDeath cross-window event received{engineDying cross-window event received{serverError cross-window event received{tableCallback cross-window event received{updatePage cross-window event received{tableOverflow cross-window event received{endOfSnapshot cross-window event received{clearSnapshot cross-window event received{tableError cross-window event received{tableSubscription cross-window event received{tableUnsubscription cross-window event received{addRequestSent cross-window event received{messageError cross-window event received{messageComplete cross-window event received{messageOnNetwork cross-window event received{messageDenied cross-window event received{messageDiscarded cross-window event received{Forcing preventCrossWindowShare because page is on file:///{A new sharing will be immediately created{No way to obtain a sharing, this client will fail immediately{A sharing will now be searched{A sharing was found but attaching is disabled, this client will fail{A sharing was found, this will attach to it{A sharing was found, but accordingly with the configuration it will be ignored{No sharing was found, a new sharing will be created{No sharing was found, will keep on searching after a pause{No sharing was found, no sharing will be created, this client will fail{Sharing lost, trying to obtain a new one{Developer tools are known to cause performance and memory issues with Lightstreamer.{Creating new sharing{According to the configuration of connectionSharing a connection cannot be established{Killing current sharing{Detaching from current sharing{Using local sharing{Using cross-window sharing{Found a likely valid engine{Found a probably obsolete or slow engine{Found a likely dead engine{Wait another check before creating an engine{Can create an engine now{Current share is not avalable anymore; re-entering share search{Connect requested{Disconnect requested{Searching for available sharing{Performing search{Window was not found, try later{Found Window not valid, try later{Window found!{No answer from sharing, reset{No other engines{Checking other engines{Client now attached to engine{Executing connect{Executing disconnect{An exception was thrown while executing the Function passed to the forEachChangedField method{An exception was thrown while executing the Function passed to the forEachField method{key and/or command position not correctly configured{Subscription entered the active state{Subscription is now subscribed to{Subscription is not subscribed to anymore{Subscription reset{Subscription waiting to be sent to server{Subscription queued to be sent to server{Subscription is now on hold{Subscription exits the active status; it can now be modified{Subscription sent to server{Subscription request generated{Received position of COMMAND and KEY fields from server{Adapter Set assigned{Selector assigned{Requested Max Frequency assigned{Requested Buffer Size assigned{Snapshot Required assigned{Second level Data Adapter Set assigned{Problem calling event on Flash object{Problem calling event on Flash object{Problem calling event on Flash object{Problem calling event on Flash object{Problem calling event on Flash object{Unable to get the Flash movie object reference{The flash object is unexpectedly disappeared{Notification from the flash object received, the object is still incomplete though; will check again later{Ready to make the bridge{Problem calling event on Flash object{Problem calling event on Flash object{Flash object is ready{Waiting a LightstreamerClient instance to create bridge{Waiting the flash object instance to create bridge{Waiting notification from the flash object to create bridge{Flash object disappeared or not yet found{Flash object disappeared or not yet ready{Flash object disappeared or not yet ready{Preparing subscription for flash{Subscribing subscription for flash{The LightstreamerClient is unexpectedly disappeared{The referenced Subscription does not exist{Unsubscribing subscription for flash{The LightstreamerClient is unexpectedly disappeared{The referenced Subscription does not exist{The referenced Subscription does not exist{The referenced Subscription does not exist{The referenced Subscription does not exist{The referenced Subscription does not exist".split("{");
		h.resolve = function(d) {
			return d + "] " + e[d]
		};
		f.Zw = function(d) {
			return h.resolve(d)
		};
		h.resolve = h.resolve;
		f.getMessage = f.Zw;
		return f
	});
	define("SimpleLogLevels", [], function() {
		var h = {
				FATAL: 5,
				ERROR: 4,
				WARN: 3,
				INFO: 2,
				DEBUG: 1
			},
			f = {
				priority: function(e) {
					return h[e] || 0
				}
			};
		f.priority = f.priority;
		return f
	});
	define("SimpleLogAppender", ["SimpleLogLevels"], function(h) {
		function f(e, d) {
			this.nn = h.priority(e) ? e : "INFO";
			this.Op = d || "*";
			this.on = null
		}
		f.prototype = {
			setLoggerProvider: function(e) {
				e && (e.getLogger && e.Qq) && (this.on = e)
			},
			log: E(),
			composeLine: function(e, d, b, c) {
				return e + " | " + d + " | " + c + " | " + b
			},
			getLevel: L("nn"),
			setLevel: function(e) {
				this.nn = e = h.priority(e) ? e : "INFO";
				null != this.on && this.on.Qq()
			},
			getCategoryFilter: L("Op"),
			setCategoryFilter: function(e) {
				this.Op = e || "*"
			}
		};
		f.prototype.log = f.prototype.log;
		f.prototype.setLoggerProvider = f.prototype.setLoggerProvider;
		f.prototype.composeLine = f.prototype.composeLine;
		f.prototype.getLevel = f.prototype.getLevel;
		f.prototype.setLevel = f.prototype.setLevel;
		f.prototype.getCategoryFilter = f.prototype.getCategoryFilter;
		f.prototype.setCategoryFilter = f.prototype.setCategoryFilter;
		return f
	});
	define("BufferAppender", ["Inheritance", "SimpleLogAppender", "SimpleLogLevels"], function(h, f, e) {
		function d(b, c, a) {
			this._callSuperConstructor(d, [b, c]);
			this.tr = !a || 0 > a ? 0 : a;
			this.je = 0;
			this.Cf = -1;
			this.buffer = {}
		}
		d.prototype = {
			reset: function() {
				this.je = 0;
				this.Cf = -1;
				this.buffer = {}
			},
			extractLog: function(b) {
				res = this.getLog(null, b);
				this.reset();
				return res
			},
			getLog: function(b, c, a) {
				var d = "";
				b ? (b = this.Cf - b + 1, b < this.je && (b = this.je)) : b = this.je;
				c = c || "\n";
				for(a = e.priority(a || "DEBUG"); b <= this.Cf;) e.priority(this.buffer[b].Hy) >= a && (d += this.buffer[b].Py), d += c, b++;
				return d
			},
			log: function(b, c, a, d) {
				var e = ++this.Cf;
				0 != this.tr && e >= this.tr && (this.buffer[this.je] = null, this.je++);
				a = this.composeLine(b, c, a, d);
				this.buffer[e] = {
					Hy: c,
					Py: a
				}
			},
			getLength: function() {
				return this.Cf - this.je + 1
			}
		};
		d.prototype.reset = d.prototype.reset;
		d.prototype.getLog = d.prototype.getLog;
		d.prototype.extractLog = d.prototype.extractLog;
		d.prototype.log = d.prototype.log;
		d.prototype.getLength = d.prototype.getLength;
		h(d, f);
		return d
	});
	define("ConsoleAppender", ["Inheritance", "SimpleLogAppender", "IllegalStateException"], function(h, f, e) {
		function d(b, c) {
			if("undefined" == typeof console) throw new e("This appender can't work if a console is not available. Enable the Browser console if possible or change appender.");
			this._callSuperConstructor(d, [b, c])
		}
		d.prototype = {
			log: function(b, c, a, d) {
				a = this.composeLine(b, c, a, d);
				switch(c) {
					case "DEBUG":
						if(console.debug) {
							console.debug(a);
							return
						}
						break;
					case "INFO":
						if(console.info) {
							console.info(a);
							return
						}
						break;
					case "WARN":
						if(console.warn) {
							console.warn(a);
							return
						}
					default:
						if(console.error) {
							console.error(a);
							return
						}
				}
				console.log(a)
			}
		};
		d.prototype.log = d.prototype.log;
		h(d, f);
		return d
	});
	define("FunctionAppender", ["Inheritance", "SimpleLogAppender"], function(h, f) {
		function e(d, b, c, a) {
			this._callSuperConstructor(e, [d, b]);
			this.lw = c;
			this.iz = a || null
		}
		e.prototype = {
			log: function(d, b, c, a) {
				var e = this.lw;
				if(e.apply) {
					d = this.composeLine(d, b, c, a);
					try {
						e.apply(this.iz, [d])
					} catch(f) {}
				}
			}
		};
		e.prototype.log = e.prototype.log;
		h(e, f);
		return e
	});
	define("RemoteAppender", ["Inheritance", "BufferAppender", "Executor", "IllegalArgumentException", "SimpleLogLevels"], function(h, f, e, d) {
		function b(c, a, g) {
			this._callSuperConstructor(b, [c, a, 10]);
			this.Uo = !1;
			if(!g) throw new d("a LightstreamerClient instance is necessary for a RemoteAppender to work.");
			this.rp = g
		}
		b.prototype = {
			log: function(c, a, d, e) {
				this._callSuperMethod(b, "log", [c, a, d, e]);
				this.up(!0)
			},
			up: function(b) {
				if(!(0 >= this.getLength())) {
					if(0 == this.rp.yb().indexOf("CONNECTED")) {
						var a = this.Yv();
						if(this.rp.Jd(a)) {
							this.reset();
							this.Uo = !1;
							return
						}
					}
					this.Uo && b || (this.Uo = !0, e.addTimedTask(this.up, 2E3, this))
				}
			},
			Yv: function(c, a) {
				var d = this._callSuperMethod(b, "extractLog", ["LS_log"]),
					d = d.split("LS_log");
				a = "LS_log";
				for(var e = {}, f = 0; f < d.length; f++) 0 != d[f].length && (e[a + (f + 1)] = encodeURIComponent(d[f].replace(/[\n\r\f]/g, "||")));
				return e
			},
			extractLog: V(null)
		};
		b.prototype.extractLog = b.prototype.extractLog;
		b.prototype.log = b.prototype.log;
		h(b, f, !1, !0);
		return b
	});
	define("SimpleLogger", ["SimpleLogLevels"], function(h) {
		function f(e, d) {
			this.sh = e;
			this.Mg = d;
			this.If = "DEBUG"
		}
		f.prototype = {
			fatal: function(e) {
				this.isFatalEnabled() && this.sh.dispatchLog(this.Mg, "FATAL", e)
			},
			isFatalEnabled: function() {
				return h.priority("FATAL") >= h.priority(this.If)
			},
			error: function(e) {
				this.isErrorEnabled() && this.sh.dispatchLog(this.Mg, "ERROR", e)
			},
			isErrorEnabled: function() {
				return h.priority("ERROR") >= h.priority(this.If)
			},
			warn: function(e) {
				this.isWarnEnabled() && this.sh.dispatchLog(this.Mg, "WARN", e)
			},
			isWarnEnabled: function() {
				return h.priority("WARN") >= h.priority(this.If)
			},
			info: function(e) {
				this.isInfoEnabled() && this.sh.dispatchLog(this.Mg, "INFO", e)
			},
			isInfoEnabled: function() {
				return h.priority("INFO") >= h.priority(this.If)
			},
			debug: function(e) {
				this.isDebugEnabled() && this.sh.dispatchLog(this.Mg, "DEBUG", e)
			},
			isDebugEnabled: function() {
				return h.priority("DEBUG") >= h.priority(this.If)
			},
			setLevel: function(e) {
				this.If = h.priority(e) ? e : "DEBUG"
			}
		};
		f.prototype.fatal = f.prototype.fatal;
		f.prototype.isFatalEnabled = f.prototype.isFatalEnabled;
		f.prototype.error = f.prototype.error;
		f.prototype.isErrorEnabled = f.prototype.isErrorEnabled;
		f.prototype.warn = f.prototype.warn;
		f.prototype.isWarnEnabled = f.prototype.isWarnEnabled;
		f.prototype.info = f.prototype.info;
		f.prototype.isInfoEnabled = f.prototype.isInfoEnabled;
		f.prototype.debug = f.prototype.debug;
		f.prototype.isDebugEnabled = f.prototype.isDebugEnabled;
		f.prototype.setLevel = f.prototype.setLevel;
		return f
	});
	define("SimpleLoggerProvider", ["SimpleLogger", "SimpleLogLevels"], function(h, f) {
		function e() {
			this.Sa = [];
			this.Ef = {}
		}
		e.prototype = {
			Dj: function() {
				var d = 100,
					b = 0;
				if(0 < this.Sa.length) {
					for(var c = 0; c < this.Sa.length; c++) f.priority(this.Sa[c].getLevel()) < d && (d = f.priority(this.Sa[c].getLevel()), b = c);
					return this.Sa[b].getLevel()
				}
				return null
			},
			ko: function(d) {
				for(var b in this.Ef) this.Ef[b].setLevel(d)
			},
			av: function(d, b) {
				var c = [];
				if("*" === d.getCategoryFilter()) return !0;
				for(var c = d.getCategoryFilter().split(" "), a = 0; a < c.length; a++)
					if(c[a] == b) return !0;
				return !1
			},
			addLoggerAppender: function(d) {
				d && (d.log && d.getLevel) && (this.Sa.push(d), d.setLoggerProvider && d.setLoggerProvider(this));
				this.ko(this.Dj())
			},
			removeLoggerAppender: function(d) {
				for(var b = 0; b < this.Sa.length; b++)
					if(this.Sa[b] === d) {
						this.Sa.splice(b, 1);
						this.ko(this.Dj());
						break
					}
			},
			Qq: function() {
				this.ko(this.Dj())
			},
			getLogger: function(d) {
				this.Ef[d] || (this.Ef[d] = new h(this, d), 0 < this.Sa.length && this.Ef[d].setLevel(this.Dj()));
				return this.Ef[d]
			},
			dispatchLog: function(d, b, c) {
				var a;
				a = "undefined" != typeof window ? window.name : "";
				var e = 0,
					h = new Date,
					e = h.getHours();
				10 > e && (a += "0");
				a = a + e + ":";
				e = h.getMinutes();
				10 > e && (a += "0");
				a += e;
				a += ":";
				e = h.getSeconds();
				10 > e && (a += "0");
				a += e;
				a += ",";
				a += h.getMilliseconds();
				e = f.priority(b);
				for(h = 0; h < this.Sa.length; h++) f.priority(this.Sa[h].getLevel()) <= e && this.av(this.Sa[h], d) && this.Sa[h].log(d, b, c, a)
			}
		};
		e.prototype.addLoggerAppender = e.prototype.addLoggerAppender;
		e.prototype.removeLoggerAppender = e.prototype.removeLoggerAppender;
		e.prototype.getLogger = e.prototype.getLogger;
		e.prototype.dispatchLog = e.prototype.dispatchLog;
		return e
	});
}());
var classes = ['LightstreamerClient', 'Subscription', 'LogMessages', 'BufferAppender', 'ConsoleAppender', 'FunctionAppender', 'RemoteAppender', 'SimpleLoggerProvider'];
oneRequire(classes, function() {
	for(var i = 0; i < classes.length; i++) exports[classes[i]] = arguments[i];
});