var easing = {
  def: "easeOutQuad",
  swing: function (t, e, n, i) {
    return easing[easing.def](t, e, n, i)
  },
  easeInQuad: function (t, e, n, i) {
    return n * (t /= i) * t + e
  },
  easeOutQuad: function (t, e, n, i) {
    return -n * (t /= i) * (t - 2) + e
  },
  easeInOutQuad: function (t, e, n, i) {
    return (t /= i / 2) < 1 ? n / 2 * t * t + e : -n / 2 * (--t * (t - 2) - 1) + e
  },
  easeInCubic: function (t, e, n, i) {
    return n * (t /= i) * t * t + e
  },
  easeOutCubic: function (t, e, n, i) {
    return n * ((t = t / i - 1) * t * t + 1) + e
  },
  easeInOutCubic: function (t, e, n, i) {
    return (t /= i / 2) < 1 ? n / 2 * t * t * t + e : n / 2 * ((t -= 2) * t * t + 2) + e
  },
  easeInQuart: function (t, e, n, i) {
    return n * (t /= i) * t * t * t + e
  },
  easeOutQuart: function (t, e, n, i) {
    return -n * ((t = t / i - 1) * t * t * t - 1) + e
  },
  easeInOutQuart: function (t, e, n, i) {
    return (t /= i / 2) < 1 ? n / 2 * t * t * t * t + e : -n / 2 * ((t -= 2) * t * t * t - 2) + e
  },
  easeInQuint: function (t, e, n, i) {
    return n * (t /= i) * t * t * t * t + e
  },
  easeOutQuint: function (t, e, n, i) {
    return n * ((t = t / i - 1) * t * t * t * t + 1) + e
  },
  easeInOutQuint: function (t, e, n, i) {
    return (t /= i / 2) < 1 ? n / 2 * t * t * t * t * t + e : n / 2 * ((t -= 2) * t * t * t * t + 2) + e
  },
  easeInSine: function (t, e, n, i) {
    return -n * Math.cos(t / i * (Math.PI / 2)) + n + e
  },
  easeOutSine: function (t, e, n, i) {
    return n * Math.sin(t / i * (Math.PI / 2)) + e
  },
  easeInOutSine: function (t, e, n, i) {
    return -n / 2 * (Math.cos(Math.PI * t / i) - 1) + e
  },
  easeInExpo: function (t, e, n, i) {
    return 0 == t ? e : n * Math.pow(2, 10 * (t / i - 1)) + e
  },
  easeOutExpo: function (t, e, n, i) {
    return t == i ? e + n : n * (-Math.pow(2, -10 * t / i) + 1) + e
  },
  easeInOutExpo: function (t, e, n, i) {
    return 0 == t ? e : t == i ? e + n : (t /= i / 2) < 1 ? n / 2 * Math.pow(2, 10 * (t - 1)) + e : n / 2 * (-Math.pow(2, -10 * --t) + 2) + e
  },
  easeInCirc: function (t, e, n, i) {
    return -n * (Math.sqrt(1 - (t /= i) * t) - 1) + e
  },
  easeOutCirc: function (t, e, n, i) {
    return n * Math.sqrt(1 - (t = t / i - 1) * t) + e
  },
  easeInOutCirc: function (t, e, n, i) {
    return (t /= i / 2) < 1 ? -n / 2 * (Math.sqrt(1 - t * t) - 1) + e : n / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + e
  },
  easeInElastic: function (t, e, n, i) {
    var a = 1.70158
      , r = 0
      , o = n;
    if (0 == t)
      return e;
    if (1 == (t /= i))
      return e + n;
    if (r || (r = .3 * i),
      o < Math.abs(n)) {
      o = n;
      var a = r / 4
    } else
      var a = r / (2 * Math.PI) * Math.asin(n / o);
    return -(o * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * i - a) * Math.PI / r)) + e
  },
  easeOutElastic: function (t, e, n, i) {
    var a = 1.70158
      , r = 0
      , o = n;
    if (0 == t)
      return e;
    if (1 == (t /= i))
      return e + n;
    if (r || (r = .3 * i),
      o < Math.abs(n)) {
      o = n;
      var a = r / 4
    } else
      var a = r / (2 * Math.PI) * Math.asin(n / o);
    return o * Math.pow(2, -10 * t) * Math.sin(2 * (t * i - a) * Math.PI / r) + n + e
  },
  easeInOutElastic: function (t, e, n, i) {
    var a = 1.70158
      , r = 0
      , o = n;
    if (0 == t)
      return e;
    if (2 == (t /= i / 2))
      return e + n;
    if (r || (r = .3 * i * 1.5),
      o < Math.abs(n)) {
      o = n;
      var a = r / 4
    } else
      var a = r / (2 * Math.PI) * Math.asin(n / o);
    return 1 > t ? -.5 * o * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * i - a) * Math.PI / r) + e : o * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t * i - a) * Math.PI / r) * .5 + n + e
  },
  easeInBack: function (t, e, n, i, a) {
    return void 0 == a && (a = 1.70158),
    n * (t /= i) * t * ((a + 1) * t - a) + e
  },
  easeOutBack: function (t, e, n, i, a) {
    return void 0 == a && (a = 1.70158),
    n * ((t = t / i - 1) * t * ((a + 1) * t + a) + 1) + e
  },
  easeInOutBack: function (t, e, n, i, a) {
    return void 0 == a && (a = 1.70158),
      (t /= i / 2) < 1 ? n / 2 * t * t * (((a *= 1.525) + 1) * t - a) + e : n / 2 * ((t -= 2) * t * (((a *= 1.525) + 1) * t + a) + 2) + e
  },
  easeInBounce: function (t, e, n, i) {
    return n - easing.easeOutBounce(i - t, 0, n, i) + e
  },
  easeOutBounce: function (t, e, n, i) {
    return (t /= i) < 1 / 2.75 ? 7.5625 * n * t * t + e : 2 / 2.75 > t ? n * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + e : 2.5 / 2.75 > t ? n * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + e : n * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + e
  },
  easeInOutBounce: function (t, e, n, i) {
    return i / 2 > t ? .5 * easing.easeInBounce(2 * t, 0, n, i) + e : .5 * easing.easeOutBounce(2 * t - i, 0, n, i) + .5 * n + e
  }
};

!function () {
  for (var t = 0, e = ["webkit", "moz"], n = 0; n < e.length && !window.requestAnimationFrame; ++n)
    window.requestAnimationFrame = window[e[n] + "RequestAnimationFrame"],
      window.cancelAnimationFrame = window[e[n] + "CancelAnimationFrame"] || window[e[n] + "CancelRequestAnimationFrame"];
  window.requestAnimationFrame || (window.requestAnimationFrame = function (e) {
      var n = (new Date).getTime()
        , i = Math.max(0, 16.7 - (n - t))
        , a = window.setTimeout(function () {
        e(n + i)
      }, i);
      return t = n + i,
        a
    }
  ),
  window.cancelAnimationFrame || (window.cancelAnimationFrame = function (t) {
      clearTimeout(t)
    }
  )
}();

var TIME = function () {
  var t, e, n, i = {}, a = (new Date).getTime();
  i.timers = {},
    i.clock = function () {
      e = (new Date).getTime(),
        n = e - a,
        n = n > 200 ? 20 : n,
        a = e;
      for (var r in i.timers)
        i.timers[r] && i.timers[r].started && i.timers[r].clock(n);
      t = window.requestAnimationFrame(i.clock)
    }
    ,
    i.stop = function () {
      window.cancelAnimationFrame(t)
    }
    ,
    i.getTimer = function (t, e, n, i) {
      return new r(t, e, n, i)
    }
  ;
  var r = function (t, e, n, a) {
    this.cvs = t,
      this.ctx = e,
      this.name = n,
      this.startAction = a,
      this.timeBodys = [],
      i.timers[this.name] = this
  };
  return r.prototype.start = function () {
    this.startAction && this.startAction(),
      this.startAction = null,
      this.started = !0
  }
    ,
    r.prototype.pause = function () {
      this.started = !1
    }
    ,
    r.prototype.add = function (t) {
      this.timeBodys.push(t)
    }
    ,
    r.prototype.remove = function () {
      try {
        delete i.timers[this.name]
      } catch (t) {
        i.timers[this.name] = null
      }
    }
    ,
    r.prototype.clock = function (t) {
      var n = this;
      this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height),
        this.timeBodys.forEach(function (i) {
          n.ctx.save(),
            i.clock(t, e),
            n.ctx.restore()
        })
    }
    ,
    r.prototype.destory = function () {
      i.timers[this.name] = null
    }
    ,
    i
}();

TIME.clock(),
  !function () {
    function t() {
      h = {
        left: [],
        right: []
      };
      for (var t = 0, e = 1, n = {}, i = w * (1 + m), a = -O; i + 500 > t;)
        n = {
          timePass: 0,
          percent: 0,
          start: 0
        },
          t = a + e / g * (e / g) * d + O,
          n.width = t - a,
          a = t,
          n.xCrood = parseInt(-t),
          h.left.push(n),
          e++;
      for (t = 0,
             e = 0,
             n = {},
             i = s - w * (1 - m),
             a = 0; i + 500 > t;)
        n = {
          timePass: 0,
          percent: 0,
          start: 0
        },
          t = a + e / g * (e / g) * d + O,
          n.width = t - a,
          a = t,
          n.xCrood = parseInt(+t),
          h.right.push(n),
          e++
    }

    function e(t, e) {
      var n, i = p / 2;
      e.forEach(function (e, a) {
        n = Math.abs(a - t),
          e.percent = i > n ? 1 - easing.easeInOutSine(n, 0, 1, i) : 0
      })
    }

    function n(t) {
      u.fillStyle = v,
        t.forEach(function (t) {
          for (var e, n, i, a, r, o, c = t.width, h = t.xCrood > 0 ? -1 : 1, d = 0; f > d; d++)
            e = (d - f / 2) * (1.3 * c + t.percent * c / 4) + l,
              r = (f / 2 - Math.abs(d - f / 2)) / (f / 2),
              o = Math.abs(n - w) / (.4 * s),
              n = t.xCrood + e * m + w + h * t.percent * c * M,
              a = r * I * c * (1 + o * t.percent * .2),
              i = e,
              u.drawImage(A, 0, 0, A.width, A.height, parseInt(n), parseInt(i), parseInt(a), parseInt(a))
        })
    }

    function i(t, e, n, i) {
      E.push({
        powerX: 0,
        datas: e,
        moveDis: n,
        initDis: t,
        dur: i,
        pass: 0
      })
    }

    function a() {
      function a(t) {
        u.fillStyle = "#fff",
          h.left.forEach(function (t) {
            t.percent = 0
          }),
          h.right.forEach(function (t) {
            t.percent = 0
          }),
          o += t,
        o > r && (i(30, h.left, g, c),
          i(30, h.right, g, c),
          o = 0,
          r = 1e3 * Math.random() + 5e3,
          c = s + parseInt(s * Math.random() - s / 2) / 4);
        for (var a, f = E.length - 1; f >= 0; f--)
          a = E[f],
            a.pass += t,
            a.powerX = easing.easeOutQuad(a.pass, a.initDis, a.moveDis, a.dur),
          a.powerX >= a.moveDis && E.splice(f, 1),
            e(a.powerX, a.datas);
        n(h.left),
          n(h.right)
      }

      var r = 2e3
        , o = 0
        , s = 8e3
        , c = s;
      return t(),
        a
    }

    var r = document.body.clientWidth || document.documentElement.clientWidth
      , o = document.querySelectorAll("#soundCvs")[0];
    o.width = r,
      o.height = 1279;
    var u = o.getContext("2d")
      , s = o.width
      , c = o.height
      , h = {
      left: [],
      right: []
    }
      , f = 61
      , d = 70
      , m = .15
      , w = .6 * s
      , l = .5 * c
      , p = 25
      , M = 6
      , I = .5
      , v = "#d9d9d9"
      , g = 200 * s / 2560
      , O = 6
      , A = document.createElement("canvas")
      , y = A.getContext("2d");
    A.width = 30,
      A.height = 30,
      y.fillStyle = v,
      y.beginPath(),
      y.arc(A.width / 2, A.height / 2, A.width / 2, 0, 2 * Math.PI),
      y.fill();
    var E = []
      , C = TIME.getTimer(o, u, "soundwave", function () {
      C.add({
        clock: a()
      })
    })
  }();


TIME.timers.soundwave.start();//卡开始运行条件
//TIME.timers.soundwave.pause()  暂停条件
$(() => {
  $(window).scroll(() => {
    var scrollTop = $(window).scrollTop();//滚动高度
    var offsetTop = $(".hifi").offset().top;
    if (scrollTop >= offsetTop) {
      TIME.timers.soundwave.start();
    } else {
      TIME.timers.soundwave.pause();
    }
  })
})