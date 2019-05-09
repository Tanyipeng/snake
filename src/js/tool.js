var tool = {
  inherit: function (target, origin) {
    var F = function () {};
    F.prototype = origin.prototype;
    target.prototype = new F();
    target.prototype.constructor = target;
    target.prototype.uber = origin;
    return target;
  },
  // 返回子类    子类继承父类私有属性和原型属性
  extend: function (origin) {
    var result = function () {
      origin && origin.apply(this, arguments);
    };
    origin && this.inherit(result, origin);
    return result;
  },
  // 返回单例子类    子类继承父类私有属性和原型属性
  single: function (origin) {
    var singleResult = (function () {
      var instance;
      return function () {
        if (!instance) {
          instance = this;
          origin && origin.apply(this, arguments);
        }
        return instance;
      }
    })();
    origin && this.inherit(singleResult, origin);
    return singleResult;
  },
  throttle: function(fn, t) {
    var lock = false;
    var args = [].slice.call(arguments, 2);
    var _args = [];
    return function() {
      if(lock) return;
      lock = true;
      _args = [].slice.call(arguments);
      setTimeout(function() {
        lock = false;
      }, t)
      fn.apply(this, args.concat(_args));
    }
  }
}