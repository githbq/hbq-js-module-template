/*!
* JsBridge@1.0.0-beta.1
* (c) 2018-2018 github.com
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.JsBridge = factory());
}(this, (function () { 'use strict';

  var __DEBUG_MODE__ = true

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defineProperty = _defineProperty;

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  var objectSpread = _objectSpread;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  /**
  * entry
  */
  var JsBridge =
  /*#__PURE__*/
  function () {
    // JsBridge 方法名统一前缀 
    // 前端事件执行完，通知native的统一事件名
    // 普通请求回调事件挂载对象
    // 事件请求回调挂载对象
    // jsEngine 名, iOS为 webkit
    // 一个自增的序列每次发起调用时增加一个值
    function JsBridge(options) {
      classCallCheck(this, JsBridge);

      defineProperty(this, "jsBridgePrefix", 'JsBridge');

      defineProperty(this, "nativeReceiveEventName", 'NativeReceiveEvent');

      defineProperty(this, "callbacks", {});

      defineProperty(this, "events", {});

      defineProperty(this, "jsEngine", 'webkit');

      defineProperty(this, "id", 0);

      if (!(this instanceof JsBridge)) {
        return new JsBridge(options);
      }

      window["".concat(this.jsBridgePrefix, "Receive")] = this.receive;
    }
    /**
     * 向native发起调用
     * @param name 
     * @param data 
     * @param callback 
     */


    createClass(JsBridge, [{
      key: "invoke",
      value: function invoke(name, data, callback) {
        var handler = window[this.jsEngine].messageHandlers[name];

        if (!handler) {
          return this;
        }

        handler.postMessage(objectSpread({}, data, {
          callbackId: ++this.id
        }));

        if (callback) {
          this.callbacks[this.id] = callback;
        }

        return this;
      }
      /**
       * 接收native的回调,前端不需要调用此方法,由native方调用
       * @param reponse 
       */

    }, {
      key: "receive",
      value: function receive(response) {
        var eventName = response.eventName,
            callbackId = response.callbackId,
            responseId = response.responseId,
            data = response.data;

        if (callbackId) {
          this.callbacks[callbackId] && this.callbacks[callbackId]();
        } else if (eventName) {
          var result = this.emit(eventName, data);
          this.invoke(this.nativeReceiveEventName, {
            result: result,
            responseId: responseId
          });
        }
      }
      /**
       * 由native触发web端的事件时执行
       * @param name 
       * @param options 
       * @returns 返回事件执行的结果 
       */

    }, {
      key: "emit",
      value: function emit(name, options) {
        if (!this.events[name]) {
          return this;
        }

        var totalResult = {};
        this.events[name].forEach(function (callback) {
          var result = callback(options);
          Object.assign(totalResult, result);
        });
        return totalResult;
      }
      /**
       * 添加事件绑定供native调用
       * @param name 事件名
       * @param callback 
       */

    }, {
      key: "on",
      value: function on(name, callback) {
        if (!name || !callback) return;
        this.events[name] = this.events[name] || [];
        this.events[name].push(callback);
        return this;
      }
      /**
       * 移除事件绑定
       * @param name 
       * @param callback 
       */

    }, {
      key: "off",
      value: function off(name, callback) {
        var _this = this;

        if (!name || !this.events[name]) return this;

        if (!callback) {
          delete this.events[name];
          return this;
        }

        var callbacks = [];
        this.events[name].forEach(function (n) {
          if (_this.events[name] !== callback) {
            callbacks.push(n);
          }
        });
        this.events[name] = callbacks;
        return this;
      }
    }]);

    return JsBridge;
  }();
  console.log('__DEBUG_MODE__', __DEBUG_MODE__);

  return JsBridge;

})));
