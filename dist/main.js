/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _timeDecend_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timeDecend.js */ \"./src/timeDecend.js\");\n\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", function() {\r\n    const time = new _timeDecend_js__WEBPACK_IMPORTED_MODULE_0__.TimeDecend('10/18/2022 11:20:00');\r\n    //const time = new TimeDecend('10/19/2021 11:20:00');\r\n    //const time = new TimeDecend('17/10/2021 18:42:00');\r\n    new _timeDecend_js__WEBPACK_IMPORTED_MODULE_0__.TimeDecend('10/18/2021 13:23:00', {//http://localhost/time-decend/\r\n        container: '.lg--clock-descend-2',\r\n        //redirectAfterFinishing: 'https://developer.mozilla.org/es/docs/Web/CSS/box-shadow',\r\n        messageAfterFinishing: 'Mi mensaje',\r\n        waitingTime:  10000,\r\n        timeBeforeRedirecting:  5000,\r\n    });\r\n});\n\n//# sourceURL=webpack://time-decend/./src/index.js?");

/***/ }),

/***/ "./src/timeDecend.js":
/*!***************************!*\
  !*** ./src/timeDecend.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TimeDecend\": () => (/* binding */ TimeDecend)\n/* harmony export */ });\nclass TimeDecend {\r\n\r\n    seconds = 0;\r\n    unformattedSeconds = 0;\r\n    minutes = 0;\r\n    hours = 0;\r\n    days = 0;\r\n\r\n    constructor(date, settings = {}) {\r\n        this.date = this.getValidDate(date);\r\n        this.dateNow = new Date().getTime();\r\n        this.interval = setInterval(this.render, 1000);\r\n\r\n        this.settings = {\r\n            container: (settings.container ? settings.container : '.lg--clock-descend'),\r\n            labelSeconds: (settings.labelSeconds ? settings.labelSeconds : 'Seconds'),\r\n            labelMinutes: (settings.labelSeconds ? settings.labelSeconds : 'Minutes'),\r\n            labelHours: (settings.labelSeconds ? settings.labelSeconds : 'Hours'),\r\n            labelDays: (settings.labelSeconds ? settings.labelSeconds : 'Days'),\r\n            redirectAfterFinishing: (settings.redirectAfterFinishing ? settings.redirectAfterFinishing : ''),\r\n            messageAfterFinishing: (settings.messageAfterFinishing ? settings.messageAfterFinishing : ''),\r\n            timeBeforeRedirecting: (settings.timeBeforeRedirecting ? Number(settings.timeBeforeRedirecting) : 5000),\r\n            waitingTime: (settings.waitingTime ? Number(settings.waitingTime) : 3000),\r\n\r\n        };\r\n    }\r\n\r\n    /**\r\n     * \r\n     * @param {*} date | string date\r\n     * @param {*} milliseconds true | false\r\n     * @returns int / string of date\r\n     */\r\n    getValidDate = (date) => {\r\n        try {\r\n            let tempDate = new Date(date);\r\n            if(tempDate != 'Invalid Date') {\r\n                return tempDate.getTime();\r\n            }\r\n            let arratDate = date.split('/')\r\n            if(arratDate.length === 3) {\r\n                tempDate = new Date(`${arratDate[1]}/${arratDate[0]}/${arratDate[1]}`);\r\n                //return tempDate.getTime();\r\n                return 0;\r\n            }\r\n            return date;\r\n\r\n        } catch (error) {\r\n            return error.message;\r\n        }\r\n    }\r\n\r\n    _seconds = () => {\r\n        this.dateNow = new Date().getTime();\r\n\r\n        let milliseconds = this.date - this.dateNow;\r\n        this.unformattedSeconds = Math.floor(milliseconds / 1000);\r\n        return this.seconds = this.unformattedSeconds % 60;\r\n    }\r\n\r\n    _minutes = () => {\r\n        return this.minutes = Math.floor((this.unformattedSeconds / 60) % 60);\r\n    }\r\n\r\n    _hours = () => {\r\n        return this.hours = Math.floor((this.unformattedSeconds / (60 * 60)) % (60 * 60) % 24);\r\n    }\r\n\r\n    _days = () => {\r\n        return this.days = Math.floor((this.unformattedSeconds / (24 * 60 * 60)) % (60 * 60));\r\n    }\r\n    _showMessage(html) {\r\n        let obj = this;\r\n        if(this.unformattedSeconds <= 0) {\r\n            setTimeout(function() {\r\n                const $clockContainersListAsArray = [...document.querySelectorAll(obj.settings.container)];\r\n                $clockContainersListAsArray.forEach(container => {\r\n                    container.innerHTML = html;\r\n                });\r\n            }, obj.settings.waitingTime);\r\n        }\r\n    }\r\n    _redirect() {\r\n        let obj = this;\r\n        if(this.settings.redirectAfterFinishing) {\r\n            setTimeout(function() {\r\n                window.location.href = obj.settings.redirectAfterFinishing;\r\n            }, obj.settings.timeBeforeRedirecting);\r\n        }\r\n    }\r\n\r\n    render = () => {\r\n        let seconds =  this._seconds();\r\n        this._minutes();\r\n        this._hours();\r\n        this._days();\r\n\r\n        let numberDays = ('0' + this.days).slice(-2);\r\n        if(this.days > 99) numberDays = ('0' + this.days).slice(-3);\r\n        if(this.days > 999) numberDays = ('0' + this.days).slice(-4);\r\n\r\n        let html = ` \r\n        <div class=\"lg--container-clock-descend\">\r\n            <div class=\"digits\">\r\n                <span class=\"lg--item-digits\">\r\n                    <span class=\"lg--print-days-label\">${this.settings.labelDays}</span>\r\n                    <span class=\"lg--print-days-number\">${(numberDays < 0 ? '00' : numberDays)}</span>\r\n                </span>\r\n                <span class=\"lg--item-digits\">\r\n                    <span class=\"lg--print-hours-label\">${this.settings.labelHours}</span>\r\n                    <span class=\"lg--print-hours-number\">${(this.hours < 0 ? '00': ('0' + this.hours).slice(-2))}</span>\r\n                </span>\r\n                <span class=\"lg--item-digits\">\r\n                    <span class=\"lg--print-minutes-label\">${this.settings.labelMinutes}</span>\r\n                    <span class=\"lg--print-minutes-number\">${(this.minutes < 0 ? '00': ('0' + this.minutes).slice(-2))}</span>\r\n                </span>\r\n                </span>\r\n                <span class=\"lg--item-digits\">\r\n                    <span class=\"lg--print-seconds-label\">${this.settings.labelSeconds}</span>\r\n                    <span class=\"lg--print-seconds-number\">${(this.seconds < 0 ? '00' : ('0' + this.seconds).slice(-2))}</span>\r\n                </span>\r\n            </div>\r\n        </div>\r\n        `;\r\n\r\n        let htmlAfterFinishing = `\r\n            <div class=\"lg--container-clock-descend\">\r\n                <div class=\"digits\">\r\n                    <div class=\"message\">\r\n                        <p>\r\n                            ${this.settings.messageAfterFinishing}\r\n                        </p>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            `;\r\n\r\n        const $clockContainersListAsArray = [...document.querySelectorAll(this.settings.container)];\r\n        $clockContainersListAsArray.forEach(container => {\r\n            container.innerHTML = html;\r\n        });\r\n\r\n        if(this.unformattedSeconds <= 0) {\r\n            clearInterval(this.interval);\r\n            this._showMessage(htmlAfterFinishing);\r\n            this._redirect();\r\n        }\r\n    }\r\n\r\n}\n\n//# sourceURL=webpack://time-decend/./src/timeDecend.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;