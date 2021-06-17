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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(1);
            var content = __webpack_require__(2);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(3);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after{content:\"\";content:none}q:before,q:after{content:\"\";content:none}table{border-collapse:collapse;border-spacing:0}body{background-color:#ffffff !important;padding:0px !important;width:100% !important;max-width:100% !important}h1,h2,h3,h4,h5,h6{color:inherit !important;text-transform:none !important}img{max-width:100%;height:auto;-o-object-fit:cover;object-fit:cover}h3.form_header{display:none}p{margin-bottom:24px;line-height:1.4}.en__component--column{padding-left:0 !important;padding-right:0 !important;margin-top:0}.en__component--row--2 .en__component--column{width:100%}.en_component--input-fields .en__component--row--2 .en__component--column{width:auto !important}.en__field__input--select{width:100%}@media (max-width: 641px){.en__field--checkbox .en__field__label--item{margin:0}}.en__field__input--select{min-width:0}@media (min-width: 641px){.en__field__input--select{width:258px}}.en__component{position:relative;font-family:Proxima Nova, sans-serif}.en__component--heading{color:#344857;display:none !important;text-align:center}@media (min-width: 640px){.en__component--heading{display:flex !important}}.en__component--heading h1{font-size:30px;font-family:Raleway, sans-serif}.en__component--heading h1 strong{font-weight:bold !important}input[type=\"text\"],input[type=\"number\"],input[type=\"email\"]{background-color:#f7f7fa;border:1px solid #CCCCCC;border-radius:4px;height:48px;box-sizing:border-box}@media (max-width: 641px){input[type=\"text\"],input[type=\"number\"],input[type=\"email\"]{width:100%}}label.en__field__label{font-size:14px;font-family:\"Proxima Nova\", sans-serif;color:#344857;margin-bottom:6px}select{height:48px;border-radius:4px;border:1px solid #CCCCCC;width:100%}.en__component--row:not(.en__component--hero){max-width:65rem;margin-left:auto;margin-right:auto}.en__component--row--2{display:flex;justify-content:center;box-sizing:border-box}@media (max-width: 640px){.en__component--row--2{flex-direction:column}}.en__component--row--3{display:flex;flex-wrap:wrap;justify-content:center;box-sizing:border-box;max-width:65rem;margin:0 auto;padding:0 !important}.en__component--row--3 .en__component--column{position:static;flex:1 0 auto;box-sizing:border-box;margin:10px;border-radius:4px;overflow:hidden;width:100%}@media screen and (min-width: 640px){.en__component--row--3 .en__component--column{width:calc(50% - 20px) !important}}@media screen and (min-width: 840px){.en__component--row--3 .en__component--column{flex:0 1 auto;width:calc(33.33% - 20px) !important}}@media (max-width: 840px){div.en__component--hero[style]{background:#B64815 !important}}.en__component--hero-wrapper{background:#B64815}.en__component--hero{width:100%;height:100%;min-height:540px;max-width:1500px;margin-bottom:24px;display:flex;justify-content:space-between;align-items:center;margin-left:auto;margin-right:auto;background:#B64815}.en__component--hero h1,.en__component--hero h2{color:#FFFFFF}.en__component--hero .en__component--hero-wrap-responsive .en__component--button-cta{display:none}@media (min-width: 840px){.en__component--hero .en__component--hero-wrap-responsive{display:none !important}}.en__component--hero .hero-content-responsive{display:flex;justify-content:center;align-items:center;margin-bottom:24px}.en__component--hero .hero-content-responsive .en__component--hero-logo{margin-right:12px}.en__component--hero .hero-content-responsive h1{font-size:25px;margin:0}.en__component--hero .hero-content-responsive h2{font-size:16px}.en__component--hero-wrap{display:none}@media (min-width: 840px){.en__component--hero-wrap{display:flex;padding:24px 70px 24px 24px}}.en__component--hero-logo{align-self:flex-start;max-width:117px;content:url(\"data:image/svg+xml;charset=UTF-8, <svg width='117' height='118' viewBox='0 0 117 118' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M58.109 117.14C90.2017 117.14 116.218 90.9173 116.218 58.57C116.218 26.2227 90.2017 0 58.109 0C26.0163 0 0 26.2227 0 58.57C0 90.9173 26.0163 117.14 58.109 117.14Z' fill='white'/><path d='M29.4062 42.641H20.5592L11.5342 76.307H19.0102L22.6342 63.212L22.2342 64.937C27.2772 65.379 38.3342 65.468 39.9342 53.169C41.5282 41.27 29.4062 42.641 29.4062 42.641ZM30.2472 56.709C27.7252 59.098 24.0982 58.257 24.0982 58.257L25.1152 54.497L26.4862 49.497C27.0172 49.453 30.6442 49.055 31.6622 49.897C32.7682 50.782 31.9722 55.073 30.2462 56.71L30.2472 56.709Z' fill='%23B64815'/><path d='M62.4974 45.207C61.9082 44.2655 61.0202 43.5489 59.9754 43.172C53.5614 41.09 48.2964 46.003 44.6244 50.736C40.8956 55.6996 38.7941 61.6955 38.6084 67.901C38.7854 71.573 39.6704 75.687 43.4304 77.147C49.5794 78.695 54.0924 73.475 57.4084 69.14C57.7624 68.521 58.3814 67.99 58.3814 67.282C58.1164 67.149 57.8944 66.928 57.5814 66.928C56.8957 67.9763 56.1266 68.9675 55.2814 69.892C53.1584 71.971 50.4594 73.608 47.3624 72.9C43.9564 71.352 43.8234 67.37 44.1334 63.92C44.287 62.5942 44.5837 61.2889 45.0184 60.027L47.3184 59.363C52.4054 57.682 58.4184 57.328 61.8284 52.196C62.9784 50.249 63.9074 47.33 62.4924 45.206L62.4974 45.207ZM51.1724 56.532C44.2274 58.788 45.9524 57.859 45.9524 57.859C45.9524 57.859 51.2604 42.021 56.6574 43.879C62.1434 45.737 58.1574 54.279 51.1714 56.531L51.1724 56.532Z' fill='%23B64815'/><path d='M66.4351 42.774L88.6431 42.641L86.6971 49.896L79.4421 50.029L72.0531 76.307H63.9131L71.0351 49.985H64.3551L66.4351 42.774Z' fill='%23B64815'/><path d='M95.1012 42.729L78.9102 76.263H87.2711L89.8372 70.733H97.3582V76.219L104.702 76.175V42.641L95.1022 42.729H95.1012ZM92.8452 64.096L97.2691 54.496L97.3132 54.363V64.096H92.8452Z' fill='%23B64815'/></svg>\")}.en__component--hero-content{color:#FFFFFF;margin:10px 50px;width:auto}@media (min-width: 840px){.en__component--hero-content{width:50%}}.en__component--hero-content button.en__component--button-cta{background:#FBE706;transition:background 0.2s ease-in-out;border:0;padding:20px 40px;border-radius:4px;font-size:17px;color:#B64815;font-weight:bold;margin-top:24px;cursor:pointer}.en__component--hero-content button.en__component--button-cta:hover{transition:background 0.2s ease-in-out;background:#fff}.en__component--hero-content h1{font-family:Raleway, sans-serif;font-weight:800;font-size:57px;color:#FBE706;margin-bottom:20px}.en__component--hero-content h2{font-family:Raleway, sans-serif;font-weight:500;font-size:24px}.en__component--hero-content p{font-family:\"Proxima Nova\", sans-serif;line-height:26px;font-size:18px;margin:6px 0}.en__component--hero-content p.small-bold{font-size:16px;font-weight:bold}.en__component--hero-image{display:flex;flex:0 0 auto}.en__component--hero-image img{max-height:540px}.en__component--selectAmount{display:flex;flex-direction:row;justify-content:center;margin-top:8px}.en__component--selectAmount .amount{font-family:Raleway, sans-serif;font-weight:bold;font-size:32px;margin:0 6px;width:60px;text-align:center}.en__component--selectAmount .increase,.en__component--selectAmount .decrease{cursor:pointer}.en__component--selectAmount .decrease::before{content:url(\"data:image/svg+xml;charset=UTF-8, <svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='15' cy='15' r='14.5' stroke='%23344857'/><rect x='11' y='15' width='8' height='2' fill='%23344857'/></svg>\")}.en__component--selectAmount .increase::before{line-height:25px;content:url(\"data:image/svg+xml;charset=UTF-8, <svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='15' cy='15' r='14.5' stroke='%23344857'/><rect x='11' y='15' width='8' height='1' fill='%23344857'/><rect x='15.5' y='11.5' width='8' height='1' transform='rotate(90 15.5 11.5)' fill='%23344857'/></svg>\")}.en__component--carePackage{padding-top:0}.en__component--carePackage-content{background:#fff0ca;color:#344857;height:auto;margin:10px;padding:16px;display:flex;flex-direction:column;justify-content:center;align-items:center;border-radius:4px}@media (min-width: 640px){.en__component--carePackage-content{flex-direction:row}}.en__component--carePackage-content .carePackage-total{position:relative;display:flex;flex-direction:column;justify-content:center;align-items:center;border:1px solid #344857;border-radius:4px;padding:32px;width:100%;height:100%;box-sizing:border-box;text-align:center;order:2;margin:24px 0}@media (min-width: 640px){.en__component--carePackage-content .carePackage-total{order:1;max-width:174px}}.en__component--carePackage-content .carePackage-total .totalAmount{font-family:Raleway, sans-serif;font-weight:800;font-size:58px;display:flex}.en__component--carePackage-content .carePackage-total .totalAmount::before{display:flex;justify-content:center;align-items:center;content:url(\"data:image/svg+xml;charset=UTF-8, <svg xmlns='http://www.w3.org/2000/svg' width='11' height='22' fill='none' viewBox='0 0 11 22'><path fill='%23344857' d='M10.268 13.085c-.097-.338-.214-.632-.352-.881-.138-.25-.335-.494-.591-.732-.257-.238-.488-.43-.692-.576-.205-.146-.486-.309-.843-.49-.357-.18-.64-.314-.848-.403-.208-.088-.51-.209-.904-.363-.35-.138-.61-.243-.782-.316-.17-.073-.396-.177-.675-.311-.279-.135-.487-.254-.625-.357-.137-.104-.284-.23-.44-.38-.157-.15-.267-.31-.33-.479-.063-.169-.095-.353-.095-.553 0-.522.223-.948.67-1.278.446-.33 1.023-.496 1.73-.496.312 0 .63.044.954.133.324.088.6.188.831.3.231.11.449.234.654.368.204.134.35.236.435.305.085.07.14.115.162.138.097.077.197.104.301.081.112-.008.197-.07.257-.184l.904-1.682c.09-.154.07-.3-.056-.438-.044-.046-.1-.1-.167-.161-.067-.062-.212-.173-.436-.335-.223-.16-.46-.305-.708-.432-.25-.126-.573-.255-.972-.385-.397-.131-.809-.22-1.233-.265V.885c0-.108-.033-.196-.1-.265C6.25.55 6.164.516 6.06.516H4.553c-.096 0-.18.037-.25.11-.071.073-.107.159-.107.259v2.074c-1.168.23-2.117.744-2.846 1.543C.621 5.302.256 6.23.256 7.29c0 .315.032.615.095.899.063.284.142.54.235.766.093.227.225.45.396.668.171.22.333.407.485.565.153.157.352.32.597.49.246.168.456.305.631.408.175.104.408.223.698.357.29.135.519.236.686.306.168.069.396.165.687.287.401.162.7.287.893.375.193.088.439.211.736.369.298.157.515.301.653.432.138.13.262.292.374.484.112.191.168.395.168.61 0 .607-.23 1.075-.687 1.405-.457.33-.988.496-1.59.496-.275 0-.55-.03-.826-.092-.967-.2-1.871-.68-2.712-1.44l-.022-.023c-.067-.085-.157-.12-.268-.104-.12.015-.205.062-.257.139l-1.15 1.555c-.111.153-.104.31.023.472.037.046.102.116.195.208.093.092.266.236.52.432.252.196.527.38.825.553.298.173.675.343 1.133.512.458.17.932.288 1.423.357v2.017c0 .1.035.186.106.259.07.073.154.11.251.11h1.507c.104 0 .19-.035.257-.104.067-.07.1-.158.1-.265v-2.017c1.183-.2 2.145-.724 2.885-1.572.74-.849 1.11-1.86 1.11-3.036 0-.384-.048-.745-.146-1.083z'/></svg>\")}.en__component--carePackage-content .carePackage-total::before{position:absolute;left:calc(50% - 15px);top:-10px;margin:0 auto;content:url(\"data:image/svg+xml;charset=UTF-8, <svg width='30' height='27' viewBox='0 0 30 27' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M14.7595 21.6229L6.5 26.1553V9.5H23.5V26.1553L15.2405 21.6229L15 21.4909L14.7595 21.6229Z' stroke='%23344857'/><path d='M10.4796 3.25161C10.8119 3.82325 11.2488 4.55196 11.722 5.34117C12.5449 6.71372 13.4776 8.26928 14.1608 9.5H2.10794C1.55945 8.76231 0.902321 7.65888 0.628937 6.4365C0.335911 5.1263 0.482566 3.69345 1.68465 2.3781C4.4043 -0.597834 8.68544 0.165522 10.4796 3.25161Z' stroke='%23344857'/><path d='M19.5204 3.25161C19.1881 3.82325 18.7512 4.55196 18.278 5.34117C17.4551 6.71372 16.5224 8.26928 15.8392 9.5H27.8921C28.4406 8.76231 29.0977 7.65888 29.3711 6.4365C29.6641 5.1263 29.5174 3.69345 28.3154 2.3781C25.5957 -0.597834 21.3146 0.165522 19.5204 3.25161Z' stroke='%23344857'/></svg>\")}.en__component--carePackage-content .carePackage-content{margin:0 50px;order:1}@media (min-width: 640px){.en__component--carePackage-content .carePackage-content{order:2}}.en__component--carePackage-content .carePackage-content h1{font-family:Raleway, sans-serif;font-weight:bold;font-size:24px;margin-bottom:12px}.en__component--carePackage-content .carePackage-content label{font-size:18px}.en__component--carePackage-content .carePackage-content .container{display:block;position:relative;padding:0 0 0 35px !important;margin-bottom:12px;cursor:pointer;font-size:18px;font-family:Proxima Nova;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.en__component--carePackage-content .carePackage-content .container input{position:absolute;opacity:0;cursor:pointer;height:0;width:0}.en__component--carePackage-content .carePackage-content .checkmark{position:absolute;top:0;left:0;height:25px;width:25px;background-color:transparent;border:1px solid #344857;border-radius:5px}.en__component--carePackage-content .carePackage-content .checkmark:after{content:\"\";position:absolute;display:none}.en__component--carePackage-content .carePackage-content input:checked ~ label .checkmark:after{display:block}.en__component--carePackage-content .carePackage-content .checkmark:after{left:9px;top:5px;width:5px;height:10px;border:solid #344857;border-width:0 3px 3px 0;transform:rotate(45deg)}.en__component--carePackage-content .carePackage-content label{margin:0 !important;width:100% !important}.en__component--carePackage-content .carePackage-image{order:3;display:block}@media (min-width: 640px){.en__component--carePackage-content .carePackage-image{display:none}}@media (min-width: 840px){.en__component--carePackage-content .carePackage-image{display:block}}.donationCard img{display:none}.donationCard .en__component--donationAmount{display:none}@media (min-width: 640px){.donationCard img{display:block}.donationCard .en__component--donationAmount{display:block}}.en__component--wrap{height:100%;background-color:#FFF0CA}.en__component--customAmount{position:relative;display:flex;flex-direction:column;background:#EA9412;width:100%;border-radius:4px;overflow:hidden}@media (min-width: 688px){.en__component--customAmount{width:calc(50% - 10px)}}@media (min-width: 840px){.en__component--customAmount{width:auto}}.en__component--customAmount .en__component--content{display:flex;justify-content:center;align-items:center;height:100%}.en__component--customAmount .en__component--customDonationAmount-wrap{position:absolute;left:0;right:0;bottom:-25px;z-index:100;display:flex;flex-direction:row;justify-content:center;align-items:center;border-radius:2px;width:auto;height:auto;margin:0 auto;box-sizing:border-box}.en__component--customAmount .en__component--customDonationAmount{display:flex;flex-direction:row;flex:0;background:#FFFFFF;color:#344857;padding:0 16px}.en__component--customAmount .en__component--customDonationAmount input::-webkit-outer-spin-button,.en__component--customAmount .en__component--customDonationAmount input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}.en__component--customAmount .en__component--customDonationAmount input[type=number]{-moz-appearance:textfield}.en__component--customAmount .en__component--customDonationAmount input{height:50px;margin:0 14px;border:0;width:auto;max-width:105px;font-size:16px;font-family:ProximaNova, sans-serif;color:#344857;background-color:#FFFFFF;min-width:auto}.en__component--customAmount .en__component--customDonationAmount .en__component--usd{display:flex;justify-content:center;align-items:center;font-size:12px}.en__component--customAmount .en__component--customDonationAmount::before{display:flex;justify-content:center;align-items:center;content:url(\"data:image/svg+xml;charset=UTF-8, <svg xmlns='http://www.w3.org/2000/svg' width='11' height='22' fill='none' viewBox='0 0 11 22'><path fill='%23344857' d='M10.268 13.085c-.097-.338-.214-.632-.352-.881-.138-.25-.335-.494-.591-.732-.257-.238-.488-.43-.692-.576-.205-.146-.486-.309-.843-.49-.357-.18-.64-.314-.848-.403-.208-.088-.51-.209-.904-.363-.35-.138-.61-.243-.782-.316-.17-.073-.396-.177-.675-.311-.279-.135-.487-.254-.625-.357-.137-.104-.284-.23-.44-.38-.157-.15-.267-.31-.33-.479-.063-.169-.095-.353-.095-.553 0-.522.223-.948.67-1.278.446-.33 1.023-.496 1.73-.496.312 0 .63.044.954.133.324.088.6.188.831.3.231.11.449.234.654.368.204.134.35.236.435.305.085.07.14.115.162.138.097.077.197.104.301.081.112-.008.197-.07.257-.184l.904-1.682c.09-.154.07-.3-.056-.438-.044-.046-.1-.1-.167-.161-.067-.062-.212-.173-.436-.335-.223-.16-.46-.305-.708-.432-.25-.126-.573-.255-.972-.385-.397-.131-.809-.22-1.233-.265V.885c0-.108-.033-.196-.1-.265C6.25.55 6.164.516 6.06.516H4.553c-.096 0-.18.037-.25.11-.071.073-.107.159-.107.259v2.074c-1.168.23-2.117.744-2.846 1.543C.621 5.302.256 6.23.256 7.29c0 .315.032.615.095.899.063.284.142.54.235.766.093.227.225.45.396.668.171.22.333.407.485.565.153.157.352.32.597.49.246.168.456.305.631.408.175.104.408.223.698.357.29.135.519.236.686.306.168.069.396.165.687.287.401.162.7.287.893.375.193.088.439.211.736.369.298.157.515.301.653.432.138.13.262.292.374.484.112.191.168.395.168.61 0 .607-.23 1.075-.687 1.405-.457.33-.988.496-1.59.496-.275 0-.55-.03-.826-.092-.967-.2-1.871-.68-2.712-1.44l-.022-.023c-.067-.085-.157-.12-.268-.104-.12.015-.205.062-.257.139l-1.15 1.555c-.111.153-.104.31.023.472.037.046.102.116.195.208.093.092.266.236.52.432.252.196.527.38.825.553.298.173.675.343 1.133.512.458.17.932.288 1.423.357v2.017c0 .1.035.186.106.259.07.073.154.11.251.11h1.507c.104 0 .19-.035.257-.104.067-.07.1-.158.1-.265v-2.017c1.183-.2 2.145-.724 2.885-1.572.74-.849 1.11-1.86 1.11-3.036 0-.384-.048-.745-.146-1.083z'/></svg>\")}.en__component--customAmount .en__component--content h1{font-size:34px;color:#FFFFFF !important;font-family:Raleway, sans-serif;font-weight:800;line-height:32px;text-align:center}.en__component--customAmount img{position:relative;bottom:0}.en__component--content{padding:30px 20px;color:#344857;box-sizing:border-box;text-align:center;font-size:22px;font-family:\"Proxima Nova\", sans-serif;z-index:10}.en__component--content h1{font-family:Raleway, sans-serif;font-weight:bold;font-size:24px;margin-bottom:12px}.en__component--content .en__component--quantity{font-family:\"Proxima Nova\", sans-serif;font-size:16px;margin-top:6px}.en__component--donationAmount.urgent{background:#E93F23}.en__component--donationAmount.urgent::after{display:flex;justify-content:center;align-items:center;position:relative;top:-21px;content:url(\"data:image/svg+xml;charset=UTF-8, <svg width='61' height='61' viewBox='0 0 61 61' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M7.0785 26.8322C6.09771 28.3463 6.29299 29.9669 8.17637 31.187C10.0413 32.395 11.5941 31.9199 12.5869 30.3874L14.9791 26.6945L13.6496 25.8333L11.2814 29.4892C10.7252 30.3478 9.87159 30.6337 8.92991 30.0237C7.96975 29.4017 7.88166 28.5059 8.43785 27.6473L10.8061 23.9913L9.47668 23.1301L7.0785 26.8322Z' fill='white'/><path d='M17.709 35.5481L19.3998 36.1446L18.7734 32.9608C19.5825 33.048 20.5807 32.6653 21.0125 31.4412C21.4663 30.1549 20.9176 28.8999 19.4757 28.3912L16.2392 27.2493L13.7982 34.1684L15.2712 34.688L16.1459 32.2088L17.2247 32.5894L17.709 35.5481ZM19.512 30.9002C19.3071 31.4811 18.7293 31.6972 18.138 31.4886L16.5924 30.9433L17.2658 29.0346L18.8114 29.5799C19.4027 29.7885 19.717 30.3193 19.512 30.9002Z' fill='white'/><path d='M21.7453 34.0483C21.5097 36.3463 23.108 38.0139 25.2418 38.2327C26.5659 38.3684 27.6615 37.9278 28.4908 37.1724L28.7769 34.3821L25.2971 34.0254L25.1603 35.3604L27.1081 35.56L27.0172 36.4464C26.6707 36.6984 26.0518 36.9114 25.3843 36.8429C24.0602 36.7072 23.2016 35.5908 23.3429 34.2121C23.4842 32.8333 24.5515 31.9143 25.8755 32.0501C26.6415 32.1286 27.2238 32.5974 27.5103 33.1465L28.8733 32.5785C28.4038 31.6568 27.527 30.8261 26.0169 30.6713C23.8831 30.4526 21.9819 31.7394 21.7453 34.0483Z' fill='white'/><path d='M31.6885 38.2188L36.8336 37.5226L36.6521 36.1818L33.0549 36.6686L32.8263 34.979L36.3472 34.5025L36.1672 33.1726L32.6463 33.6491L32.4324 32.0685L36.0297 31.5817L35.8497 30.2518L30.7046 30.9481L31.6885 38.2188Z' fill='white'/><path d='M45.1975 35.0224L46.6033 34.4795L43.9599 27.6352L42.5028 28.198L44.2149 32.6308L39.3321 29.4226L37.834 30.0012L40.4773 36.8454L41.9344 36.2827L40.159 31.6856L45.1975 35.0224Z' fill='white'/><path d='M51.4205 31.5104L52.715 30.6167L49.3277 25.7103L51.0839 24.4979L50.3027 23.3664L45.4869 26.6911L46.2681 27.8227L48.0333 26.604L51.4205 31.5104Z' fill='white'/></svg>\")}.en__component--donationAmount{position:absolute;margin:6px 0 0 6px;background:#EA9412;color:#FFFFFF;padding:24px 4px;font-size:24px;text-transform:uppercase;font-weight:bold;border-radius:50%;width:72px;height:72px;box-sizing:border-box;text-align:center;font-family:Raleway, sans-serif}.en__component--donationAmount::before{position:relative;top:-4px;margin-right:2px;content:url(\"data:image/svg+xml;charset=UTF-8, <svg xmlns='http://www.w3.org/2000/svg' width='8' height='16' fill='none' viewBox='0 0 8 16'><path fill='%23fff' d='M7.888 9.74c-.075-.26-.165-.489-.27-.682-.106-.193-.257-.382-.455-.567-.197-.185-.374-.333-.531-.446-.157-.113-.373-.24-.648-.38-.274-.14-.491-.244-.651-.312-.16-.069-.392-.163-.695-.282-.268-.107-.468-.189-.6-.245-.131-.057-.304-.137-.519-.241-.214-.104-.374-.197-.48-.277-.106-.08-.218-.178-.338-.295-.12-.116-.205-.24-.253-.37-.049-.131-.073-.274-.073-.429 0-.404.171-.735.514-.99.343-.257.786-.385 1.33-.385.24 0 .484.035.732.103.249.069.462.146.639.232.177.087.344.182.502.286.157.104.268.183.334.237.066.053.107.089.124.107.075.06.152.08.232.062.086-.006.151-.053.197-.143l.695-1.303c.068-.12.054-.232-.043-.34-.034-.035-.077-.077-.129-.125-.051-.047-.163-.133-.334-.259-.172-.125-.353-.236-.545-.334-.191-.098-.44-.198-.746-.3-.305-.1-.621-.17-.947-.205V.286c0-.084-.026-.152-.077-.206C4.8.027 4.736 0 4.655 0H3.498c-.074 0-.139.028-.193.085-.054.056-.081.123-.081.2v1.608c-.898.178-1.627.577-2.187 1.196-.56.62-.84 1.34-.84 2.161 0 .244.024.476.073.696.048.22.108.419.18.594.071.176.173.348.304.518.132.17.256.316.373.438.117.121.27.248.459.379s.35.237.484.317c.135.08.313.173.536.277.223.104.4.183.528.236l.527.223c.309.125.537.222.686.29.149.069.337.164.566.286.229.122.396.234.502.335.105.101.201.226.287.375.086.149.129.307.129.473 0 .47-.176.834-.528 1.09-.351.255-.759.383-1.222.383-.211 0-.423-.023-.634-.07-.743-.156-1.438-.528-2.083-1.117l-.018-.018c-.051-.065-.12-.092-.205-.08-.092.012-.158.047-.198.107L.06 12.187c-.085.12-.08.241.017.366.03.036.08.09.15.161.072.072.205.183.4.335.194.152.405.295.634.429.228.134.518.266.87.397.352.13.716.223 1.093.277v1.562c0 .078.027.145.082.201.054.057.118.085.193.085h1.157c.08 0 .146-.027.197-.08.052-.054.077-.122.077-.206v-1.562c.91-.155 1.648-.561 2.217-1.219.569-.658.853-1.442.853-2.353 0-.297-.037-.577-.112-.84z'/></svg>\")}.en__component--slider-wrap{display:flex;justify-content:space-between;margin-bottom:24px;font-size:12px}.en__component--slider{width:100%;margin:5px 30px}.en__component--slider input{width:100%}.en__component--slider .bubble{position:absolute;top:-30px;left:50%;transform:translateX(-50%);background:#000000;color:white;padding:4px 12px}.en__component--slider .bubble::after{content:\"\";position:absolute;width:2px;height:2px;background:#000000;bottom:-1px;left:50%}.tooltip-value{font-size:16px;font-weight:normal;text-transform:none}.tooltip-value--zero{text-transform:uppercase;font-weight:800}.en__submit{display:flex;margin:50px auto}.en__submit button{background:#e93f23;padding:20px 40px;border-radius:4px;color:#FFFFFF;border:0;font-size:17px;font-family:\"Open Sans\", sans-serif;margin:0 auto}.en__component--input-fields{padding:10px}.en__component--input-fields .en__component--column--1{display:flex;flex:1 1 auto}@media (min-width: 641px){.en__component--input-fields .en__component--column--1{align-items:flex-start;align-content:flex-start;max-width:60%}}.en__component--input-fields .en__component--column--2{display:flex;flex:1 1 20%;flex-direction:column}.en__component--input-fields .en__field{display:flex;flex-direction:column}.en__component--input-fields .en__field--emailAddress{width:100%}@media (min-width: 641px){.en__component--input-fields .en__field--emailAddress{max-width:258px}}@media (min-width: 921px){.en__component--input-fields .en__field--emailAddress{max-width:526px}}.en__component--input-fields .en__field--emailAddress input{width:100%}.email--signup .en__component--formblock{display:flex}.email--signup .en__component--formblock .en__field{display:flex;flex-direction:row-reverse}.en__component--input-fields .en__component--column--1{flex-basis:100%;flex:2}@media (min-width: 641px){.en__component--input-fields .en__component--column--1{margin-left:10px}}@media (min-width: 641px){.en__component--input-fields .en__donation--billing--info{border-right:1px solid #d7dadd}}.en__component--input-fields .en__column--cc{flex-basis:100%;flex:1}@media (min-width: 641px){.en__component--input-fields .en__column--cc{margin-left:10px}}.en__donation--billing--info{display:flex;flex-wrap:wrap}@media (max-width: 641px){.en__donation--billing--info{flex-direction:column}}@media (min-width: 641px){.en__donation--billing--info .en__field{margin:0 12px 12px 0}}@media (min-width: 641px){.en__column--cc{padding:0 0 0 30px}}@media (min-width: 680px){.en__column--cc{padding:0 0 0 50px}}.en__column--cc select#en__field_transaction_paymenttype{width:100%;max-width:none;min-width:0}.en__column--cc input#en__field_transaction_ccnumber{width:100%;max-width:none;min-width:0}.en__column--cc .en__field{margin-bottom:12px}.cc__icons{margin-bottom:16px}.cc__icons ul{display:flex;flex-direction:row}.cc__icons ul li{margin-right:6px}.en__field--ccexpire .en__field__element--splitselect{display:flex}.en__field--ccexpire .en__field__element--splitselect .en__field__item{width:50%}.en__field--ccexpire .en__field__element--splitselect .en__field__item select{width:100%}.en__field--ccwrap{display:flex;flex-wrap:wrap}.en__field--ccwrap input{margin-right:12px}.en__field--ccwrap select{max-width:none;min-width:0}.en__field--ccwrap .en__field__element--splitselect .en__field__item:not(:last-child){margin:0 12px 12px 0}.en__field--ccwrap input[type=\"number\"],.en__field--ccwrap input[type=\"text\"],.en__field--ccwrap input[type=\"email\"]{min-width:0}.en__field--ccwrap .en__field--ccvv{width:115px;margin-right:12px}.en__field--ccwrap .en__field--ccvv .en__field__element--text{position:relative}.en__field--ccwrap .en__field--ccvv input{width:100% !important}.en__field--ccwrap .en__field--ccvv .ccvv__link{position:absolute;top:-28px;right:0}.en__field--ccwrap .en__field__item{padding:0}select{-webkit-appearance:none;-moz-appearance:none;background:transparent;background-image:url(\"data:image/svg+xml;charset=UTF-8, <svg xmlns='http://www.w3.org/2000/svg' width='8' height='6' fill='none' viewBox='0 0 8 6'><path fill='%238A8A8A' d='M0 0l4 6 4-6H0z'/></svg>\");background-repeat:no-repeat;background-position:right 10px center;padding:16px}.en__errorHeader{background:#E93F23;color:#FFFFFF !important;padding:16px !important;margin:0 10px 10px 10px;border-radius:4px}.en__error{padding-left:16px;margin:0 10px 0 10px !important}.en__field--bankRoutingNumber,.en__field--bankAccountNumber,.en__field--NOT_TAGGED_60,.en__field--bankAccountType,.en__field--NOT_TAGGED_99{display:none}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/sass/main.scss
var main = __webpack_require__(0);

// CONCATENATED MODULE: ./src/config.js
var options = {
  title: "<strong>Select gift(s)</strong> (select as many as you would like):",
  customAmount: true,
  customAmountImage: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/dog_cool_summer_slideshow/1800x1200_dog_cool_summer_other.jpg",
  heroImage: "https://martin.4sitestudios.com/peta/hero.png",
  heroImageResponsive: "https://martin.4sitestudios.com/peta/hero-responsive.png",
  footerContent: "Contact PETA  |  Disclaimer  |  Privacy Policy  |  Contest Terms and Conditions  |  Texting Terms and Conditions  |  Terms of Use  |  Donate Now  |  Report Website Abuse  |  \xA9 2021 PETA. Read our full policy.<br><br>\n\n  People for the Ethical Treatment of Animals<br>\n  501 Front St., Norfolk, VA 23510<br>\n  757-622-PETA (7382)<br>\n  757-622-0457 (fax)<br><br>\n  \n  PETA is a nonprofit, tax-exempt 501(c)(3) corporation (tax ID number 52-1218336)<br><br>\n  \n  image attribution \xA9 source | source additional info"
};
var donations = [{
  id: 0,
  quantity: 0,
  urgent: true,
  donationAmount: '2',
  imageURL: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/dog_cool_summer_slideshow/1800x1200_dog_cool_summer_other.jpg',
  title: 'Help provide support and care',
  content: 'Lorem ipsum $2'
}, {
  id: 1,
  quantity: 0,
  urgent: true,
  donationAmount: '5',
  imageURL: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/dog_cool_summer_slideshow/1800x1200_dog_cool_summer_other.jpg',
  title: 'Help provide support and care',
  content: 'Lorem ipsum $5'
}, {
  id: 2,
  quantity: 0,
  urgent: true,
  donationAmount: '7',
  imageURL: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/dog_cool_summer_slideshow/1800x1200_dog_cool_summer_other.jpg',
  title: 'Help provide support and care',
  content: 'Lorem ipsum $7'
}, {
  id: 3,
  quantity: 0,
  urgent: false,
  donationAmount: '10',
  imageURL: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/dog_cool_summer_slideshow/1800x1200_dog_cool_summer_other.jpg',
  title: 'Help provide support and care',
  content: 'Lorem ipsum $10'
}, {
  id: 4,
  quantity: 0,
  urgent: false,
  donationAmount: '30',
  imageURL: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/dog_cool_summer_slideshow/1800x1200_dog_cool_summer_other.jpg',
  title: 'Help provide support and care',
  content: 'Lorem ipsum $30'
}, {
  id: 5,
  quantity: 0,
  urgent: false,
  donationAmount: '70',
  imageURL: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/dog_cool_summer_slideshow/1800x1200_dog_cool_summer_other.jpg',
  title: 'Help provide support and care',
  content: 'Lorem ipsum $70'
}, {
  id: 6,
  quantity: 0,
  urgent: false,
  donationAmount: '265',
  imageURL: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/dog_cool_summer_slideshow/1800x1200_dog_cool_summer_other.jpg',
  title: 'Help provide support and care',
  content: 'Lorem ipsum $265'
}, {
  id: 7,
  quantity: 0,
  urgent: false,
  donationAmount: '567',
  imageURL: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/dog_cool_summer_slideshow/1800x1200_dog_cool_summer_other.jpg',
  title: 'Help provide support and care',
  content: 'Lorem ipsum $567'
}];

// CONCATENATED MODULE: ./src/index.js
 // import noUiSlider from 'nouislider';



window.enOnValidate = function () {
  var storedDonations = [];
  var currentDonations = document.querySelectorAll(".donationCard");
  currentDonations.forEach(function (donation, index) {
    var donationAmount = donation.querySelector(".en__component--donationAmount").textContent;
    var quantity = donation.querySelector(".amount").textContent;
    storedDonations.push({
      donationAmount: donationAmount,
      quantity: quantity
    });
  });
  localStorage.setItem("donations", JSON.stringify(storedDonations));
  var customAmountDonation = document.querySelector(".en__component--customAmount input").value;
  localStorage.setItem("customDonation", customAmountDonation);
  var repeatGift = document.querySelector("*[name='transaction.recurrpay']");
  localStorage.setItem("repeatGift", repeatGift.checked);
  return true;
}; // window.enOnError = function() {
//   console.log('Validation failed');
// }


window.addEventListener('DOMContentLoaded', function (event) {
  var inputDonation = document.querySelector("*[name='transaction.donationAmt.other']");
  var values = [];
  var radioButtonsContainer = document.querySelector(".en__field--donationAmt.en__field--withOther .en__field__element--radio");
  var radioButtons = radioButtonsContainer.children;
  var secondLastRadio = radioButtons[radioButtons.length - 2];
  var inputBtn = secondLastRadio.firstElementChild;
  inputBtn.checked = true;
  var recurrPay = document.querySelector(".en__field--recurrpay");
  recurrPay.classList.add("en__component--carePackage-content");
  recurrPay.querySelector('label.en__field__label').remove();
  recurrPay.querySelector('.en__field__element--checkbox').classList.add('carePackage-content');
  recurrPay.querySelector('.en__field__element--checkbox .en__field__item').classList.add('container');
  var checkbox = recurrPay.querySelector('.en__field__element--checkbox .en__field__item label');
  checkbox.insertAdjacentHTML('beforeend', '<div class="checkmark"></div>');
  recurrPay.insertAdjacentHTML('afterbegin', "\n  <div class=\"carePackage-total\">\n  <h3>Care Package Total</h3>\n  <div class=\"totalAmount\">0</div>\n  </div>\n  ");
  recurrPay.insertAdjacentHTML('beforeend', "\n  <div class=\"carePackage-image\">\n  <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"218\" height=\"200\" fill=\"none\" viewBox=\"0 0 218 200\">\n        <g clip-path=\"url(#clip0)\">\n            <path fill=\"#754C29\" d=\"M0 70.094c.879-.219.923-1.05 1.23-1.663 4.572-9.625 16.658-11.288 23.559-3.106 1.055 1.225 2.021 1.75 3.648 1.794 7.78.219 13.58 6.257 13.713 14.22.087 6.432.087 12.82 0 19.252 0 1.662.395 2.712 2.021 3.369 2.198.919 3.824 2.625 5.45 4.375 6.198 6.738 12.35 13.433 18.548 20.171.923 1.006 1.846 1.925 3.428 2.1 15.471 1.575 24.393 10.763 29.008 24.896 4.132 12.733 4.791 25.859 4.791 39.116 0 3.544-2.373 5.426-6.285 5.426-13.273.043-26.503 0-39.776 0-1.45 0-2.945.043-4.395-.044-3.429-.131-5.846-2.056-5.626-5.426.527-8.707-3.736-15.051-9.318-21.133-9.186-10.019-18.9-19.558-27.382-30.146-5.714-7.088-9.977-14.92-11.691-23.934-.132-.612-.132-1.356-.923-1.575V70.094zm51.291 85.627c-.22.175-.395.35-.615.481-.44-.569-.835-1.181-1.318-1.663-7.472-8.094-14.856-16.32-22.46-24.283-4.175-4.375-5.89-9.363-5.845-15.27.088-13.214.044-26.384 0-39.598 0-1.006 0-2.056-.22-3.019-.791-3.412-4.043-5.644-7.56-5.294-3.516.35-6.24 3.282-6.24 7-.045 12.69-.045 25.378.043 38.067 0 1.881.352 3.763.66 5.644 1.626 9.32 6.416 17.02 12.57 23.89 8.878 9.976 18.02 19.733 27.03 29.621 5.054 5.47 8.439 11.726 8.702 19.296.044 1.881.835 2.45 2.681 2.45 12.395-.044 24.745-.087 37.14 0 1.89 0 2.549-.612 2.549-2.538-.044-6.869-.484-13.695-1.495-20.477-1.054-7-2.769-13.87-6.329-20.126-4.307-7.526-10.812-11.858-19.47-12.383-3.297-.175-5.538-1.312-7.648-3.719-6.373-7.219-12.966-14.264-19.47-21.396-2.462-2.669-5.407-4.025-9.055-3.194-6.724 1.532-9.054 9.364-4.307 14.658 4.615 5.163 9.362 10.238 14.065 15.358 4.307 4.681 6.021 10.369 6.593 16.495zM28.13 89.346v12.689c0 2.494.044 2.494 2.242 1.575 1.01-.438 2.021-.832 3.12-1.05 1.275-.263 1.67-.919 1.67-2.144-.044-6.563.044-13.127-.044-19.69-.044-2.975-1.67-5.075-4.439-6.213-1.934-.787-2.505-.394-2.549 1.707-.044 4.375 0 8.75 0 13.126zM140.514 200h-21.537c-4.483 0-6.549-1.969-6.505-6.344.088-12.47.748-24.896 4.439-36.973 1.231-4.069 2.901-7.963 5.187-11.551 5.186-8.225 12.658-12.951 22.327-14.22 2.549-.35 4.439-1.269 6.153-3.194 5.758-6.475 11.735-12.82 17.625-19.208 1.802-1.969 3.692-3.763 6.153-4.813 1.275-.525 1.407-1.487 1.407-2.669V82.433c.044-9.276 5.362-14.92 14.636-15.314 1.362-.044 1.889-.875 2.593-1.663 3.604-4.244 8.131-6.125 13.669-4.988 5.406 1.138 8.922 4.463 10.592 9.67.527 1.662.659 3.413.659 5.163 0 10.37-.263 20.695.044 31.065.44 14.964-4.659 27.784-14.328 39.073-8.439 9.801-17.581 18.945-26.151 28.615-1.495 1.706-2.945 3.413-4.351 5.207-3.033 3.806-4.396 8.182-4.396 12.995 0 .656 0 1.312-.044 1.968-.175 3.763-2.153 5.776-5.977 5.82-7.384 0-14.768-.044-22.195-.044zm26.063-44.017c.615-6.344 2.285-12.032 6.636-16.67 4.659-5.032 9.318-10.107 13.933-15.183 2.637-2.887 3.516-6.213 1.89-9.888-2.593-5.951-10.065-7.088-14.724-2.144-6.373 6.738-12.702 13.52-18.767 20.521-2.681 3.106-5.362 5.513-9.757 4.9-.264-.044-.572.088-.879.131-9.318 1.444-15.427 6.957-19.119 15.314-5.406 12.208-6.154 25.246-6.241 38.329 0 1.575 1.01 1.663 2.197 1.663h37.755c1.582 0 2.241-.569 2.285-2.144.264-7.92 3.868-14.352 9.142-20.04 7.955-8.576 15.91-17.108 23.734-25.771 6.153-6.782 11.779-13.957 14.416-22.971 1.055-3.5 1.714-7.088 1.714-10.763.044-12.295.044-24.634 0-36.929 0-4.463-3.252-7.57-7.472-7.307-3.779.22-6.548 3.238-6.548 7.395-.044 13.388-.044 26.821 0 40.21 0 6.082-1.759 11.332-6.11 15.839-7.603 7.963-14.987 16.189-22.459 24.283-.308.482-.615 1.007-1.626 1.225zm23.206-66.637c0-4.463-.044-8.882 0-13.345 0-1.794-.747-2.144-2.329-1.575-2.813 1.006-4.659 3.5-4.659 6.738-.044 5.338 0 10.632 0 15.97 0 4.463 0 4.463 4.175 6.213.22.088.396.175.616.263 2.197.919 2.241.919 2.241-1.575 0-4.245-.044-8.489-.044-12.69z\"/>\n            <path fill=\"#A97C50\" d=\"M51.291 155.721c-.571-6.126-2.285-11.77-6.593-16.452-4.703-5.119-9.45-10.151-14.064-15.357-4.747-5.295-2.374-13.127 4.307-14.658 3.648-.831 6.593.481 9.054 3.194 6.505 7.132 13.098 14.133 19.47 21.396 2.154 2.406 4.352 3.544 7.648 3.719 8.703.525 15.164 4.857 19.47 12.382 3.56 6.257 5.275 13.083 6.33 20.127 1.055 6.782 1.494 13.608 1.494 20.477 0 1.925-.66 2.538-2.549 2.538-12.394-.044-24.745-.044-37.14 0-1.845 0-2.636-.569-2.68-2.45-.264-7.614-3.692-13.827-8.703-19.296-9.01-9.845-18.152-19.602-27.03-29.621-6.153-6.914-10.944-14.614-12.57-23.89-.308-1.882-.66-3.763-.66-5.645-.087-12.688-.087-25.377-.043-38.066 0-3.719 2.725-6.65 6.24-7 3.517-.35 6.77 1.881 7.56 5.294.22.963.22 2.013.22 3.019 0 13.214.088 26.384 0 39.598-.044 5.906 1.67 10.894 5.846 15.27 7.604 7.963 14.987 16.189 22.46 24.283.483.525.878 1.138 1.318 1.663.22-.219.395-.35.615-.525z\"/>\n            <path fill=\"#A97C50\" d=\"M28.129 89.346c0-4.376-.044-8.751 0-13.126 0-2.1.571-2.494 2.55-1.707 2.768 1.138 4.394 3.238 4.438 6.213.088 6.563.044 13.127.044 19.69 0 1.181-.44 1.881-1.67 2.144-1.055.218-2.11.656-3.12 1.05-2.198.919-2.242.919-2.242-1.575v-12.69zM166.576 155.983c1.055-.175 1.319-.743 1.715-1.181 7.471-8.095 14.855-16.32 22.459-24.284 4.307-4.506 6.109-9.757 6.109-15.839-.044-13.388-.044-26.82 0-40.21 0-4.156 2.725-7.175 6.549-7.394 4.219-.263 7.472 2.844 7.472 7.307.044 12.295.044 24.633 0 36.928 0 3.676-.704 7.22-1.714 10.764-2.638 9.013-8.263 16.189-14.417 22.971-7.867 8.663-15.822 17.195-23.733 25.771-5.275 5.688-8.879 12.12-9.142 20.039-.044 1.576-.704 2.144-2.286 2.144-12.57-.043-25.184-.043-37.754 0-1.187 0-2.242-.087-2.198-1.662.132-13.083.879-26.122 6.241-38.329 3.692-8.357 9.801-13.826 19.119-15.314.308-.044.572-.175.879-.131 4.395.612 7.076-1.838 9.757-4.901 6.066-7 12.395-13.782 18.768-20.52 4.703-4.944 12.13-3.807 14.724 2.144 1.626 3.675.747 7-1.89 9.888-4.615 5.076-9.274 10.107-13.933 15.183-4.439 4.594-6.109 10.282-6.725 16.626z\"/>\n            <path fill=\"#A97C50\" d=\"M189.783 89.346v12.689c0 2.494-.044 2.494-2.241 1.575-.22-.088-.396-.175-.616-.263-4.175-1.706-4.175-1.706-4.175-6.213 0-5.338-.044-10.632 0-15.97.044-3.238 1.846-5.732 4.659-6.738 1.582-.569 2.373-.219 2.329 1.575.044 4.463.044 8.882.044 13.345z\"/>\n            <path fill=\"#754C29\" d=\"M171.411 62.262c0 9.145-.044 18.245 0 27.39.044 5.644-2.329 9.538-7.603 11.901-15.779 7.045-31.47 14.22-47.204 21.44-5.538 2.538-10.9 2.494-16.394-.044-15.56-7.132-31.074-14.264-46.721-21.221-5.582-2.494-7.955-6.475-7.955-12.47.088-18.158.088-36.36 0-54.517-.044-5.776 2.373-9.67 7.78-12.033C69.003 15.883 84.606 8.97 100.21 1.925c5.801-2.625 11.383-2.581 17.141.088 15.251 6.957 30.502 13.826 45.841 20.52 5.714 2.494 8.219 6.52 8.131 12.602-.044 9.057.088 18.114.088 27.127zm-62.895-6.257c1.011-.35 2.022-.612 2.989-1.006 15.823-7.176 31.601-14.308 47.38-21.527.923-.394 2.154-.656 2.11-2.013-.088-1.137-1.231-1.4-2.066-1.794-15.823-7.088-31.689-14.176-47.512-21.308-1.802-.831-3.472-.788-5.274 0-15.998 7.132-32.04 14.22-48.083 21.308-.835.394-1.978.613-2.066 1.75-.088 1.357 1.187 1.576 2.11 2.013 15.779 7.176 31.601 14.352 47.38 21.527.967.438 2.022.7 3.032 1.05zm-54.5 11.07c0 7.394.088 14.789-.044 22.14-.043 2.494.836 3.981 3.165 5.031 14.548 6.52 29.052 13.17 43.6 19.777 2.989 1.357 3.56 1.007 3.56-2.231 0-15.052 0-30.06.044-45.11 0-2.32-.879-3.676-2.989-4.639C86.804 55.48 72.3 48.83 57.752 42.267c-3.076-1.4-3.736-.963-3.736 2.318v22.49zm109 0V44.673c0-3.282-.703-3.72-3.779-2.319-14.548 6.563-29.052 13.214-43.6 19.777-2.11.962-2.989 2.319-2.945 4.638.088 15.051.044 30.059.044 45.11 0 3.238.571 3.588 3.56 2.232 14.548-6.607 29.052-13.214 43.6-19.777 2.329-1.05 3.208-2.538 3.164-5.076-.131-7.394-.044-14.788-.044-22.183z\"/>\n            <path fill=\"#C49A6C\" d=\"M108.517 56.005c-1.055-.35-2.066-.612-2.989-1.006-15.823-7.176-31.601-14.351-47.38-21.527-.923-.394-2.197-.656-2.11-2.013.088-1.137 1.231-1.4 2.066-1.75 15.999-7.132 32.04-14.176 48.083-21.308 1.802-.788 3.472-.832 5.274 0 15.823 7.132 31.69 14.176 47.512 21.308.835.394 1.978.613 2.066 1.794.088 1.356-1.187 1.619-2.11 2.013-15.778 7.175-31.601 14.351-47.38 21.527-.967.35-2.021.612-3.032.962zM54.016 67.075V44.673c0-3.282.703-3.72 3.736-2.319 14.548 6.607 29.052 13.214 43.6 19.777 2.11.962 2.989 2.319 2.989 4.638-.088 15.051-.044 30.059-.044 45.11 0 3.238-.572 3.588-3.56 2.232-14.548-6.607-29.052-13.214-43.6-19.777-2.33-1.05-3.209-2.538-3.165-5.032.132-7.438.044-14.833.044-22.227zM163.016 67.075c0 7.394-.088 14.789.044 22.14.044 2.494-.835 4.025-3.165 5.075-14.548 6.519-29.052 13.17-43.6 19.777-3.032 1.356-3.56 1.006-3.56-2.232 0-15.05 0-30.059-.044-45.11 0-2.319.879-3.72 2.945-4.638 14.548-6.563 29.052-13.214 43.6-19.777 3.077-1.4 3.736-.962 3.78 2.32v22.445z\"/>\n            <path fill=\"#E93F23\" stroke=\"#FFF0CA\" stroke-miterlimit=\"10\" stroke-width=\"4.134\" d=\"M106.847 46.948c-.967-.787-3.297-2.319-5.231-3.456-5.757-3.238-6.548-3.72-8.878-5.338-4.307-2.976-6.153-5.951-6.153-9.976 0-1.97.176-2.713.923-3.895 1.275-1.968 3.12-3.456 5.45-4.331 1.67-.656 2.505-.919 5.274-.919 2.901 0 3.516.263 5.23.963 2.11.875 4.22 2.712 4.703 3.981l.264.788.659-1.094c3.824-6.257 16.043-6.17 20.306.175 1.362 2.013 1.494 6.3.307 8.707-1.582 3.15-4.483 5.557-11.251 9.232-4.439 2.407-9.494 6.082-9.845 6.563-.352.613.044.088-1.758-1.4z\"/>\n            <path fill=\"#FFF0CA\" d=\"M62.938 63.53c.088-.393.132-.83.264-1.224.22-.656.484-1.269.923-1.663.835-.787 1.846-.787 2.989 0 .747.481 1.362 1.181 1.89 1.97 1.45 2.1 2.241 4.418 2.593 6.868.132.876.176 1.707.132 2.582-.044 1.313-.308 2.538-.967 3.457-.484.656-1.143 1.006-2.022.875-.615-.088-1.187-.438-1.714-.875-.747-.657-1.362-1.444-1.89-2.363-.835-1.356-1.362-2.844-1.758-4.332-.308-1.181-.483-2.362-.527-3.544v-.087c.044-.613.044-1.138.087-1.663zM77.487 57.012c.351.218.659.437.967.743.703.744 1.23 1.62 1.626 2.582.615 1.487.923 2.975 1.055 4.463.044.875.044 1.75-.044 2.581-.176 1.576-.528 2.976-1.363 4.113-.351.525-.835.92-1.406 1.138-1.055.394-2.242-.088-3.209-1.313-.615-.787-1.099-1.663-1.45-2.625-.528-1.444-.791-2.844-.88-4.244-.087-1.575.045-3.02.44-4.376.308-.962.704-1.793 1.319-2.45.571-.569 1.23-.919 2.11-.787h.043c.308 0 .572.087.792.175zM84.695 100.459c-.615-.131-1.23-.612-1.89-.962-1.319-.744-2.637-1.444-3.956-2.144-.967-.481-1.89-.963-2.857-1.4-.615-.306-1.274-.569-1.89-.832-.57-.262-1.186-.393-1.758-.656-1.626-.656-3.164-1.575-4.527-3.063-1.406-1.531-2.197-3.369-2.33-5.381-.043-.394-.087-.788-.043-1.182.044-.656.22-1.269.44-1.837.131-.438.703-2.67 3.691-3.107.396-.044.572-.087 1.055-.175.572-.131 1.143-.263 1.67-.525.88-.481 1.67-1.094 2.462-1.75.703-.613 1.318-1.27 1.978-1.882.835-.743 1.846-1.181 3.032-1.006.88.131 1.714.613 2.418 1.4.659.657 1.758 2.625 1.977 3.238 1.055 2.713 2.066 5.47 3.385 8.095.615 1.225 2.549 4.287 2.725 4.769.527 1.269.879 2.625.967 3.894.175 2.406-.791 4.463-2.901 4.944-.835.175-1.758.131-2.681-.088-.264-.131-.572-.218-.967-.35.395.132-.572-.131 0 0zM99.858 80.639c-.088 1.312-.44 2.494-.967 3.544-.703 1.4-1.626 2.494-2.813 3.281-.923.613-1.89.963-3.076.876-.703-.044-1.407-.307-2.022-.92-.703-.656-1.143-1.487-1.363-2.406-.22-.831-.22-1.662-.131-2.45.307-2.538 1.362-4.375 2.944-5.82.791-.7 1.67-1.224 2.725-1.443.616-.131 1.275-.131 1.978.131 1.187.438 1.978 1.356 2.418 2.713.263.744.351 1.575.307 2.494zM82.893 70.444c.088-1.619.527-3.019 1.142-4.288.484-.919 1.055-1.706 1.758-2.363.791-.7 1.67-1.225 2.813-1.268.88 0 1.714.306 2.506 1.137.615.7.967 1.532 1.186 2.407.264 1.137.308 2.231.132 3.237-.264 2.1-1.01 3.85-2.198 5.251-.659.788-1.45 1.444-2.373 1.75-.66.219-1.318.306-2.11.088-1.054-.307-1.802-1.094-2.329-2.276-.396-.83-.527-1.706-.615-2.581.044-.306.044-.7.088-1.094zM123.064 81.383c.088-.482.132-.963.22-1.444.176-.832.44-1.707.835-2.582.747-1.619 1.67-2.625 2.725-3.063.704-.306 1.275-.262 1.758-.043 1.363.568 2.066 2.012 2.462 3.981.131.7.175 1.488.175 2.32-.044 1.312-.263 2.756-.835 4.33-.439 1.182-1.054 2.145-1.846 2.932-.571.526-1.098.788-1.582.876-.703.13-1.274 0-1.758-.35-.747-.482-1.275-1.357-1.67-2.407-.308-.831-.44-1.794-.484-2.888v-.087c-.043-.525 0-1.05 0-1.575zM136.294 60.25c.308-.132.615-.263.923-.263.659 0 1.143.306 1.494.831.572.788.879 1.925 1.011 3.282.088.787.088 1.619 0 2.494-.132 1.662-.483 3.456-1.186 5.338-.352.875-.748 1.75-1.275 2.537-.967 1.444-2.066 2.188-2.945 2.013-.571-.131-1.011-.525-1.362-1.094-.484-.831-.747-1.969-.835-3.238-.088-1.443 0-2.975.351-4.725.264-1.225.616-2.45 1.187-3.719.527-1.138 1.143-2.144 1.934-2.932l.044-.043c.22-.175.439-.307.659-.482zM143.415 94.946c-.528.482-1.143.7-1.758 1.007-1.187.612-2.418 1.269-3.604 1.969-.879.48-1.758 1.006-2.638 1.575-.571.35-1.186.744-1.758 1.137-.527.35-1.098.788-1.626 1.182-1.494 1.05-2.901 1.706-4.175 1.619-1.319-.044-2.066-1.007-2.198-2.844-.044-.35-.088-.7-.088-1.094.044-.7.22-1.444.352-2.188.132-.569.615-3.325 3.34-6.738.352-.438.528-.7.967-1.225.528-.7 1.055-1.4 1.495-2.188.791-1.356 1.538-2.8 2.241-4.2.615-1.27 1.187-2.582 1.802-3.85.747-1.576 1.67-3.02 2.769-4.114.791-.787 1.538-1.137 2.242-1.137.615 0 1.626.744 1.846 1.094.966 1.575 1.933 3.194 3.208 4.375.571.525 2.373 1.575 2.549 1.838.484.7.835 1.619.923 2.8.176 2.188-.703 5.163-2.593 7.745-.791 1.05-1.582 1.88-2.417 2.625-.264.131-.528.35-.879.612.351-.262-.572.482 0 0zM157.04 60.337c-.044 1.356-.352 2.844-.835 4.375-.616 2.013-1.451 4.07-2.506 5.995-.835 1.487-1.714 2.887-2.813 3.981-.659.656-1.274 1.138-1.889 1.182-.66.087-1.055-.263-1.275-.963-.176-.613-.22-1.356-.176-2.231.264-2.757 1.187-5.645 2.593-8.62.704-1.488 1.539-2.888 2.506-4.157.571-.743 1.186-1.4 1.802-1.881 1.054-.788 1.846-.744 2.241.131.264.525.352 1.225.352 2.188zM141.393 67.775c.087-1.663.439-3.457 1.01-5.338.44-1.356.923-2.713 1.583-4.113.703-1.487 1.538-2.888 2.549-4.069.791-.919 1.582-1.488 2.285-1.4.572.044.923.481 1.099 1.138.264.83.308 1.837.176 2.975-.22 2.319-.879 4.769-1.934 7.307-.571 1.444-1.318 2.844-2.154 4.156-.571.876-1.23 1.663-1.889 2.188-.967.744-1.671.744-2.154.175-.352-.437-.527-1.094-.571-1.881 0-.35-.044-.744 0-1.138z\"/>\n        </g>\n        <defs>\n            <clipPath id=\"clip0\">\n                <path fill=\"#fff\" d=\"M0 0H218V200H0z\"/>\n            </clipPath>\n        </defs>\n    </svg>\n  </div>");

  if (inputDonation) {
    inputDonation.value = 0;
    var donationButtons = document.querySelector(".en__field--donationAmt");
    donationButtons.style.display = "none";
    window.addEventListener('load', function () {
      displayDonations();
      lastElement();
      moveBasicFields();
      wrapElements();
      showBody();
      carePackageBtn();
      moveError();
    });

    if (localStorage.getItem('repeatGift') === 'true') {
      document.querySelector("*[name='transaction.recurrpay']").checked = true;
    }
  }

  function displayDonations() {
    var donationsHTML = '';
    var localStorageDonations = [];

    if (localStorage.getItem("donations") !== null) {
      localStorageDonations = JSON.parse(localStorage.getItem('donations'));
    }

    donations.forEach(function (e, i) {
      donationsHTML += "<div class=\"en__component en__component en__component--column donationCard\">\n      <div class=\"en__component--wrap\">\n        <div class='en__component--donationAmount ".concat(e.urgent ? 'urgent' : '', "'>").concat(localStorage.getItem('donations') ? localStorageDonations[i].donationAmount : e.donationAmount, "</div>\n        <img src=\"").concat(e.imageURL, "\" border=\"0\" />\n        <div class=\"en__component en__component--content\">\n          <h1>").concat(e.title, "</h1>\n          ").concat(e.content, "\n\n          <div class=\"en__component en__component--selectAmount\">\n            <div class=\"decrease\"></div>\n            <div class=\"amount\">").concat(localStorage.getItem('donations') ? localStorageDonations[i].quantity : e.quantity, "</div>\n            <div class=\"increase\"></div>\n          </div><!-- en__component--selectAmount -->\n          <div class=\"en__component--quantity\">Quantity</div>\n\n        </div>\n      </div>\n    </div>");
    });

    if (options.customAmount) {
      donationsHTML += "\n      <div class=\"en__component en__component en__component--column\">\n        <div class=\"en__component--wrap en__component--customAmount\">\n          <div class=\"en__component en__component--content\">\n            <h1>Amount of<br>your choice</h1>\n            <div class='en__component--customDonationAmount-wrap'>\n              <div class='en__component--customDonationAmount'>\n                <input type=\"number\" step=\"any\" placeholder=\"Other Amount\" value=\"".concat(localStorage.getItem('customDonation') ? localStorage.getItem('customDonation') : 0, "\" />\n                <div class=\"en__component--usd\">USD</div>\n              </div>\n            </div>\n          </div>\n          <img src=\"").concat(options.customAmountImage, "\" border=\"0\" />\n        </div>\n      </div>\n      ");
    }

    var shoppingCart = document.querySelector(".en__component--row--1");
    shoppingCart.insertAdjacentHTML('beforebegin', "\n    <div class=\"en__component--hero-wrapper\">\n    <div class=\"en__component en__component--row en__component--row--1 en__component--hero\" style=\"background: #B64815 url('".concat(options.heroImage, "');background-repeat: no-repeat; background-position: right; background-size: contain;\">\n\n      <div class=\"en__component--hero-wrap-responsive\">\n\n\n        \n        <div class=\"en__component--hero-content hero-content-responsive\">\n          <div class=\"en__component--hero-logo\"></div>\n          <div class=\"en__component--hero-hero-titles\">\n            <h2>Help a Distressed 'Backyard Dog'</h2>\n            <h1>Survive the Summer</h1>\n          </div>\n        </div>\n\n        <img src=\"").concat(options.heroImageResponsive, "\" border=\"0\" />\n        \n        <div class=\"en__component--hero-content\">\n          <p>The scorching sun and unrelenting heat of summer can be deadly for a dog kept chained outside without adequate shelter. For as little as $2, you can help provide support and care to a lonely dog, or you can give a sturdy doghouse and some relief to a dog struggling to survive the season\u2019s worst weather, by sponsoring a doghouse.</p>\n          <p class=\"small-bold\">Send a care package below\u2014a package of any size will be life-changing for a dog. Plus, our friends at v-dog will donate a 5-pound bag of healthy vegan dog food. Dogs need you!</p>\n          <button class=\"en__component--button-cta\">Send your care package!</button>\n        </div>\n\n      </div>\n      \n      <div class=\"en__component--hero-wrap\">\n        <div class=\"en__component--hero-logo\"></div>\n        <div class=\"en__component--hero-content\">\n          <h2>Help a Distressed 'Backyard Dog'</h2>\n          <h1>Survive the Summer</h1>\n          <p>The scorching sun and unrelenting heat of summer can be deadly for a dog kept chained outside without adequate shelter. For as little as $2, you can help provide support and care to a lonely dog, or you can give a sturdy doghouse and some relief to a dog struggling to survive the season\u2019s worst weather, by sponsoring a doghouse.</p>\n          <p class=\"small-bold\">Send a care package below\u2014a package of any size will be life-changing for a dog. Plus, our friends at v-dog will donate a 5-pound bag of healthy vegan dog food. Dogs need you!</p>\n          <button class=\"en__component--button-cta\">Send your care package!</button>\n        </div>\n      </div>\n\n    </div>\n    </div>\n    <div id=\"en__component--heading\" class=\"en__component en__component--row en__component--row--3 en__component--heading\">\n      <h1>").concat(options.title, "</h1>\n    </div>\n    <div class=\"en__component en__component--row en__component--row--3\">\n      ").concat(donationsHTML, "\n    </div>\n    "));
    var selectAmounts = document.querySelectorAll('.donationCard');
    var customDonationAmount = localStorage.getItem('customDonation') ? +localStorage.getItem('customDonation') : 0;

    if (selectAmounts) {
      getCustomDonationAmount();
      setSelectAmounts();
    }

    function getCustomDonationAmount() {
      var customAmount = document.querySelector('.en__component--customDonationAmount input');

      if (!customAmount) {
        return;
      }

      updateInput(customDonationAmount);
      customAmount.addEventListener('input', function (e) {
        if (e.target.value === '') {
          customDonationAmount = 0;
          updateInput(0);
        } else {
          customDonationAmount = +e.target.value;
          updateInput(customDonationAmount);
        }
      });
    }

    function setSelectAmounts() {
      selectAmounts.forEach(function (slider, index) {
        // values.push[0];
        createSelectAmount(slider, index);
      });
    }

    function createSelectAmount(slider, index) {
      var decrease = slider.querySelector('.decrease');
      var increase = slider.querySelector('.increase');
      var amount = slider.querySelector('.amount');
      var donationAmount = +slider.querySelector('.en__component--donationAmount').textContent;
      var currentAmount = +slider.querySelector('.en__component--selectAmount .amount').textContent;
      values.push({
        value: donationAmount,
        amount: currentAmount
      });
      updateInput(localStorage.getItem('customDonation') ? +localStorage.getItem('customDonation') : 0);
      decrease.addEventListener('click', function (e) {
        // const valueIndex = Math.max(values[index] - 1, 0);
        // values[index] = Math.max(values[index] - donationAmount, 0);
        var newAmount = Math.max(values[index].amount - 1, 0);
        values[index].amount = newAmount;
        amount.innerHTML = newAmount;
        updateInput(customDonationAmount);
      });
      increase.addEventListener('click', function (e) {
        // const valueIndex = Math.min(values[index] + 1, steps.length - 1);
        // values[index] = values[index] + donationAmount;
        var newAmount = values[index].amount + 1;
        values[index].amount = newAmount;
        amount.innerHTML = newAmount;
        updateInput(customDonationAmount);
      });
    }

    function updateInput(customAmount) {
      var carePackageTotal = document.querySelector(".totalAmount");
      var result = values.reduce(function (acc, current) {
        return acc + current.value * current.amount;
      }, 0);
      carePackageTotal.innerHTML = customAmount + result;
      inputDonation.value = customAmount + result;
    }
  }

  function moveBasicFields() {
    var firstName = document.querySelector(".en__field--firstName");
    var lastName = document.querySelector(".en__field--lastName");
    var emailAddress = document.querySelector(".en__field--emailAddress");
    var country = document.querySelector(".en__field--country");
    country.insertAdjacentElement('beforebegin', firstName);
    country.insertAdjacentElement('beforebegin', lastName);
    country.insertAdjacentElement('beforebegin', emailAddress);
    document.querySelector(".en__donation--billing--info").remove();
    var billingInfo = document.querySelector(".en__donation--billing--info");
    billingInfo.classList.add('en__component--column--1');
    var newDiv2 = document.createElement('div');
    var postCode = document.querySelector(".en__field--postcode");
    newDiv2.classList.add('email--signup');
    postCode.after(newDiv2);
    billingInfo.insertAdjacentElement('beforeend', billingInfo.nextElementSibling);
    billingInfo.insertAdjacentElement('beforeend', billingInfo.nextElementSibling);
    billingInfo.insertAdjacentElement('beforeend', billingInfo.nextElementSibling);
    var newDiv = document.createElement('div');
    newDiv.classList.add('en__component', 'en__component--formblock', 'en__column--cc', 'en__component--column--2');
    billingInfo.insertAdjacentElement('afterend', newDiv);
    var columnCC = document.querySelector(".en__column--cc");
    columnCC.insertAdjacentElement('beforeend', columnCC.nextElementSibling);
    columnCC.insertAdjacentElement('beforeend', columnCC.nextElementSibling);
    columnCC.insertAdjacentElement('beforeend', columnCC.nextElementSibling);
    columnCC.insertAdjacentElement('beforeend', columnCC.nextElementSibling);
    columnCC.insertAdjacentElement('beforeend', columnCC.nextElementSibling);
    var inputFields = document.querySelector(".en__component--input-fields");
    inputFields.insertAdjacentElement('afterbegin', columnCC);
    inputFields.insertAdjacentElement('afterbegin', billingInfo);
    newDiv2.insertAdjacentElement('afterbegin', billingInfo.lastElementChild);
    newDiv2.insertAdjacentElement('afterbegin', billingInfo.lastElementChild);
    newDiv2.insertAdjacentElement('afterbegin', billingInfo.lastElementChild);
  }

  function lastElement() {
    var row2 = document.querySelectorAll(".en__component--row--1");
    var lastColumn = row2[row2.length - 1];
    var lastColumnChild = lastColumn.lastElementChild; // lastColumnChild.classList.add('en__column--cc');
    // lastColumn.classList.add('en_component--input-fields');

    var newDiv = document.createElement('div');
    newDiv.classList.add('en__component', 'en__component--row', 'en__component--row--2', 'en__component--input-fields');
    lastColumn.insertAdjacentElement('beforebegin', newDiv);
  }

  function wrapElements() {
    var ccvv = document.querySelector(".en__field--ccvv");
    var ccexpire = document.querySelector(".en__field--ccexpire");
    ccvv.insertAdjacentHTML('beforebegin', "<div class=\"en__field--ccwrap\"></div>");
    var ccWrap = document.querySelector('.en__field--ccwrap');
    ccWrap.insertAdjacentElement('beforeend', ccvv);
    ccWrap.insertAdjacentElement('beforeend', ccexpire);
  }

  function showBody() {
    document.body.className += ' showBody';
  }

  function carePackageBtn() {
    var carePackageBtn = document.querySelectorAll(".en__component--button-cta");
    carePackageBtn.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector('.en__component--heading').scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  }

  function moveError() {
    var errorHeader = document.querySelector(".en__errorHeader");
    var errorFields = document.querySelectorAll(".en__error");

    if (errorHeader && errorHeader.parentNode) {
      var errorParent = errorHeader.parentNode;
      errorParent.appendChild(errorHeader);
      errorFields.forEach(function (error) {
        errorParent.appendChild(error);
      });
      setTimeout(function () {
        errorHeader.scrollIntoView();
      }, 1000);
    }
  }
});

/***/ })
/******/ ]);