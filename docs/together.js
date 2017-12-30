(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Together = exports.Together = function () {
    function Together(parentNode, attribute, subtree) {
        _classCallCheck(this, Together);

        this.parentNode = parentNode;
        this.attribute = attribute || "bind";
        this.state = new WeakMap();

        var els = parentNode.querySelectorAll("[data-" + this.attribute + "=\"*\"]");

        for (var i = 0; i < els.length; i++) {
            this.state.set(els[i], el.textContent);
        };
    }

    _createClass(Together, [{
        key: "attr",
        value: function attr() {
            return "data-" + this.attribute;
        }
    }, {
        key: "getElementsByStateProp",
        value: function getElementsByStateProp(stateProp) {
            return this.parentNode.querySelectorAll("[data-" + this.attribute + "='" + stateProp + "']");
        }
    }, {
        key: "set",
        value: function set(stateProp, text) {
            var _this = this;

            var els = this.getElementsByStateProp(stateProp);
            requestAnimationFrame(function () {
                for (var i = 0; i < els.length; i++) {
                    var _el = els[i];

                    _el.textContent = text;
                    _this.state.set(_el, text);
                }
            });
        }
    }, {
        key: "size",
        value: function size(stateProp) {
            return this.getElementsByStateProp(stateProp).length;
        }
    }, {
        key: "get",
        value: function get(stateProp) {
            var els = this.getElementsByStateProp(stateProp);
            if (els.length) {
                return this.state.get(els[0]);
            }
        }
    }, {
        key: "delete",
        value: function _delete(stateProp) {
            var _this2 = this;

            var els = this.getElementsByStateProp(stateProp);
            requestAnimationFrame(function () {
                for (var i = 0; i < els.length; i++) {
                    var _el2 = els[i];
                    _this2.state.delete(_el2);
                    _el2.remove();
                }
            });
        }
    }, {
        key: "downgrade",
        value: function downgrade(el) {
            el.removeAttribute(this.attr());
        }
    }, {
        key: "upgrade",
        value: function upgrade(el, stateProp) {
            el.setAttribute(this.attr(), stateProp);
        }
    }]);

    return Together;
}();

/***/ })
/******/ ]);
});