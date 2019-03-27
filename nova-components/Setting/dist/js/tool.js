/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = null
/* template */
var __vue_template__ = __webpack_require__(14)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/partials/Label.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-75249dbc", Component.options)
  } else {
    hotAPI.reload("data-v-75249dbc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(15)
/* template */
var __vue_template__ = __webpack_require__(16)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/partials/Info.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-91852820", Component.options)
  } else {
    hotAPI.reload("data-v-91852820", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);
module.exports = __webpack_require__(22);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

Nova.booting(function (Vue, router, store) {
    router.addRoutes([{
        name: 'setting',
        path: '/setting',
        component: __webpack_require__(5)
    }]);
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(6)
/* template */
var __vue_template__ = __webpack_require__(21)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/Tool.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-68ff5483", Component.options)
  } else {
    hotAPI.reload("data-v-68ff5483", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partials_Toggle__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partials_Toggle___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__partials_Toggle__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__partials_Text__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__partials_Text___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__partials_Text__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




var setting = {
    name: null,
    version: null
};

var social_profile = {
    facebook_url: null
};

/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        ToggleSetting: __WEBPACK_IMPORTED_MODULE_0__partials_Toggle___default.a,
        TextSetting: __WEBPACK_IMPORTED_MODULE_1__partials_Text___default.a
    },

    data: function data() {
        return {
            loading: false,
            saving: '',
            settings: { 'name': 'test', 'copyright_year': '1378' },
            app: { 'sms_messgae': '', 'before_hours': '' },
            settingConfig: [],
            errors: [],
            file: ''
        };
    },

    mounted: function mounted() {
        var vm = this;

        // Nova.request().get('/nova-vendor/setting')
        //     .then(response => {
        //         vm.settingConfig = response.data.settingConfig
        //         vm.settings = response.data.settings
        //         setTimeout(() => { vm.loading = false }, 200)
        // })

        vm.loadDefaultSetting();
    },


    methods: {
        handleToggle: function handleToggle(key) {
            this.settings[key] = !this.settings[key];
        },
        handleInput: function handleInput(input) {
            this.settings[input.key] = input.value;
        },
        saveAndReload: function saveAndReload(groupName) {
            var _this = this;

            this.saving = groupName;

            var settingsToUpdate = {};

            var keys = this.settingConfig.filter(function (g) {
                return g.name == groupName;
            })[0].settings.map(function (settingItem) {
                return settingItem.key;
            });

            keys.forEach(function (key) {
                settingsToUpdate[key] = _this.settings[key];
            });

            Nova.request().post('/nova-vendor/setting', { settings: settingsToUpdate }).then(function (response) {
                if (response.status == 202) {
                    _this.saving = '';
                    _this.$toasted.show('Settings saved!', { type: 'success' });
                }
            }).catch(function (error) {
                console.log(error);
                _this.saving = '';
            });
        },
        loadDefaultSetting: function loadDefaultSetting() {
            var _this2 = this;

            Nova.request().get("/nova-vendor/setting").then(function (response) {
                _this2.app = response.data.setting.app;
                setTimeout(function () {
                    _this2.loading = false;
                }, 200);
            }).catch(function () {
                return _this2.error = true;
            });
        },
        updateSetting: function updateSetting() {
            var _this3 = this;

            this.loading = true;
            this.errors = [];
            console.log(this.app);
            Nova.request().put("/nova-vendor/setting", { data: { app: this.app } }).then(function (response) {
                _this3.app = response.data.setting.app;
                _this3.admin = response.data.setting.admin;
                setTimeout(function () {
                    _this3.loading = false;
                }, 200);
                _this3.$toasted.success(response.data.message, {
                    duration: 3000
                    //onComplete : () => window.location.reload(true)
                });
            }).catch(function (error) {
                // console.log(error.response.data.errors)
                _this3.errors = error.response.data.errors;
                setTimeout(function () {
                    _this3.loading = false;
                }, 200);
                // console.log(this.errors['data.app.name'])
            });
        },

        /*
        Handles a change on the file upload
        */
        handleFileUpload: function handleFileUpload() {
            var _this4 = this;

            // console.log(this.$refs.file.files)
            this.file = this.$refs.file.files[0];
            this.loading = true;
            var fd = new FormData();
            fd.append('image', this.file, this.file.name);
            Nova.request().post("/nova-vendor/setting/uploadImage", fd).then(function (response) {
                _this4.app.logo = response.data;
                setTimeout(function () {
                    _this4.loading = false;
                }, 200);
                _this4.$toasted.success(response.data.message, {
                    duration: 3000
                    // onComplete : () => window.location.reload(true)
                });
            }).catch(function (error) {
                console.log(error.response.data.errors);
                _this4.errors = error.response.data.errors;
                setTimeout(function () {
                    _this4.loading = false;
                }, 200);
                // console.log(this.errors['data.app.name'])
            });
            // setTimeout(() => { this.loading = false }, 200)
        },
        getLogo: function getLogo(logo) {

            return '../uploads/' + logo;
        }
    }
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(8)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(13)
/* template */
var __vue_template__ = __webpack_require__(17)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1a6abd16"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/partials/Toggle.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1a6abd16", Component.options)
  } else {
    hotAPI.reload("data-v-1a6abd16", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(11)("15d1babd", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1a6abd16\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Toggle.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1a6abd16\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Toggle.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)(false);
// imports


// module
exports.push([module.i, "\n.toggle[data-v-1a6abd16] {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\n}\n.slider[data-v-1a6abd16] {\r\n    position: relative;\r\n    margin-right: 1rem;\r\n    width: 4rem;\r\n    height: 2rem;\r\n    background: var(--50);\r\n    -webkit-transition: .2s ease-out;\r\n    transition: .2s ease-out;\r\n    border-radius: 1rem;\r\n    cursor: pointer;\r\n    -webkit-box-shadow: inset 0px 1px 2px rgba(0,0,0,0.15);\r\n            box-shadow: inset 0px 1px 2px rgba(0,0,0,0.15)\n}\n.slider[data-v-1a6abd16]::before {\r\n    position: absolute;\r\n    content: \"\";\r\n    height: 1.5rem;\r\n    width: 1.5rem;\r\n    left: .25rem;\r\n    top: .25rem;\r\n    background: white;\r\n    -webkit-transition: .2s;\r\n    transition: .2s;\r\n    border-radius: 50%;\r\n    -webkit-box-shadow: 0px 1px 3px rgba(0,0,0,0.15);\r\n            box-shadow: 0px 1px 3px rgba(0,0,0,0.15);\n}\n.toggle.on .slider[data-v-1a6abd16] {\r\n    background: var(--info);\n}\n.toggle.on .slider[data-v-1a6abd16]::before {\r\n    -webkit-transform: translateX(2rem);\r\n            transform: translateX(2rem);\n}\r\n", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(12)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 12 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Label__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Label___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Label__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Info__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Info___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Info__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        name: String,
        setting: Object,
        description: String,
        link: Object
    },

    components: {
        SettingLabel: __WEBPACK_IMPORTED_MODULE_0__Label___default.a,
        SettingInfo: __WEBPACK_IMPORTED_MODULE_1__Info___default.a
    },

    methods: {
        toggle: function toggle(e) {
            this.$emit('toggle', this.setting.key);
        }
    }
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "w-1/4 py-6 px-8" }, [
    _c(
      "p",
      {
        staticClass:
          "inline-block text-black text-lg font-bold leading-tight py-2"
      },
      [_vm._t("default")],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-75249dbc", module.exports)
  }
}

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        text: String,
        url: String
    }
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "flex items-center" }, [
    _c(
      "p",
      { staticClass: "text-80 leading-tight" },
      [
        _vm._t("default"),
        _vm._v(" "),
        _c(
          "a",
          {
            staticClass: "no-underline dim text-primary",
            attrs: { href: _vm.url, target: "_blank" }
          },
          [_vm._v(_vm._s(_vm.text))]
        )
      ],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-91852820", module.exports)
  }
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "flex border-b border-40" },
    [
      _c("setting-label", [_vm._v(_vm._s(_vm.name))]),
      _vm._v(" "),
      _c("div", { staticClass: "w-1/6 py-6 px-8" }, [
        _c(
          "div",
          {
            staticClass: "toggle py-1",
            class: { on: _vm.setting.value },
            on: { click: _vm.toggle }
          },
          [_c("span", { staticClass: "slider" })]
        )
      ]),
      _vm._v(" "),
      _c(
        "setting-info",
        {
          staticClass: "py-6 px-8 w-1/2",
          attrs: { text: _vm.link.text || "", url: _vm.link.url || "" }
        },
        [_vm._v(_vm._s(_vm.description))]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1a6abd16", module.exports)
  }
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(19)
/* template */
var __vue_template__ = __webpack_require__(20)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/partials/Text.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-70cff4ef", Component.options)
  } else {
    hotAPI.reload("data-v-70cff4ef", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Label__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Label___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Label__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Info__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Info___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Info__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        name: String,
        setting: Object,
        description: String,
        link: Object
    },

    components: {
        SettingLabel: __WEBPACK_IMPORTED_MODULE_0__Label___default.a,
        SettingInfo: __WEBPACK_IMPORTED_MODULE_1__Info___default.a
    },

    methods: {
        input: function input(e) {
            this.$emit('input', {
                key: this.setting.key,
                value: e.target.value
            });
        }
    }
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "flex border-b border-40" },
    [
      _c("setting-label", [_vm._v(_vm._s(_vm.name))]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "w-1/2 py-6 px-8" },
        [
          _c("input", {
            staticClass: "w-full form-control form-input form-input-bordered",
            domProps: { value: _vm.setting.value },
            on: { input: _vm.input }
          }),
          _vm._v(" "),
          _vm.description || _vm.link.text
            ? _c(
                "setting-info",
                {
                  staticClass: "pt-3",
                  attrs: { text: _vm.link.text || "", url: _vm.link.url || "" }
                },
                [_vm._v(_vm._s(_vm.description))]
              )
            : _vm._e()
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-70cff4ef", module.exports)
  }
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "relative" }, [
    _vm.loading
      ? _c(
          "div",
          {
            staticClass:
              "rounded-lg flex items-center justify-center absolute pin z-50 bg-40 -m-4"
          },
          [_c("loader", { staticClass: "text-60" })],
          1
        )
      : _vm._e(),
    _vm._v(" "),
    _c(
      "div",
      [
        _c("heading", { staticClass: "mb-6" }, [_vm._v("Settings")]),
        _vm._v(" "),
        _c(
          "tabs",
          [
            _c("tab", { attrs: { name: "Application Site" } }, [
              _c("div", { staticClass: "card" }, [
                _c(
                  "form",
                  {
                    on: {
                      submit: function($event) {
                        $event.preventDefault()
                        return _vm.updateSetting($event)
                      }
                    }
                  },
                  [
                    _c("div", [
                      _c("div", { staticClass: "flex border-b border-40" }, [
                        _c("div", { staticClass: "w-1/4 px-8 py-6" }, [
                          _c(
                            "label",
                            { staticClass: "inline-block text-80 h-9 pt-2" },
                            [_vm._v("SMS Message")]
                          ),
                          _vm._v(" "),
                          _c("p", {
                            staticClass: "text-sm leading-normal text-80 italic"
                          })
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "w-3/4 px-8 py-6" }, [
                          _c("textarea", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.app.sms_messgae,
                                expression: "app.sms_messgae"
                              }
                            ],
                            staticClass:
                              "w-full form-control form-input form-input-bordered",
                            staticStyle: { height: "105px" },
                            attrs: {
                              name: "sms_messgae",
                              placeholder: "SMS Message",
                              cols: "4",
                              rows: "10"
                            },
                            domProps: { value: _vm.app.sms_messgae },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.app,
                                  "sms_messgae",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _vm.errors["data.app.sms_messgae"]
                            ? _c(
                                "div",
                                {
                                  class: [
                                    "help-text error-text mt-2 text-danger"
                                  ]
                                },
                                [
                                  _vm._v(
                                    "\n                                    @" +
                                      _vm._s(
                                        _vm.errors["data.app.sms_messgae"][0]
                                      ) +
                                      "\n                                "
                                  )
                                ]
                              )
                            : _vm._e()
                        ])
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "flex border-b border-40" }, [
                        _c("div", { staticClass: "w-1/4 px-8 py-6" }, [
                          _c(
                            "label",
                            {
                              staticClass: "inline-block text-80 h-9 pt-2",
                              attrs: { for: "Version" }
                            },
                            [_vm._v("Send (Hours Before Appointment)")]
                          ),
                          _vm._v(" "),
                          _c("p", {
                            staticClass: "text-sm leading-normal text-80 italic"
                          })
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "w-1/4 px-8 py-6" }, [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.app.before_hours,
                                expression: "app.before_hours"
                              }
                            ],
                            staticClass:
                              "w-full form-control form-input form-input-bordered",
                            attrs: {
                              placeholder: "Send Hours Before Appointment",
                              type: "number"
                            },
                            domProps: { value: _vm.app.before_hours },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.app,
                                  "before_hours",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _vm.errors["data.app.before_hours"]
                            ? _c(
                                "div",
                                {
                                  class: [
                                    "help-text error-text mt-2 text-danger"
                                  ]
                                },
                                [
                                  _vm._v(
                                    "\n                                    @" +
                                      _vm._s(
                                        _vm.errors["data.app.before_hours"][0]
                                      ) +
                                      "\n                                "
                                  )
                                ]
                              )
                            : _vm._e()
                        ])
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "bg-30 flex px-8 py-4" }, [
                      _c(
                        "button",
                        {
                          staticClass:
                            "ml-auto btn btn-default btn-primary mr-3",
                          attrs: { type: "submit" }
                        },
                        [
                          _vm._v(
                            "\n                            Save Settings\n                        "
                          )
                        ]
                      )
                    ])
                  ]
                )
              ])
            ])
          ],
          1
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-68ff5483", module.exports)
  }
}

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);