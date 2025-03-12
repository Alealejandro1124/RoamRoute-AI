/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   apiFetch: () => (/* binding */ apiFetch),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"(pages-dir-node)/./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n\n\n// A simple fetch wrapper that attaches the token if present\nasync function apiFetch(url, options = {}) {\n    // Attempt to read the token from localStorage\n    const token =  false ? 0 : null;\n    // Merge default headers with any passed-in headers\n    const headers = {\n        ...options.headers\n    };\n    // If no Content-Type is specified, default to JSON\n    if (!headers['Content-Type']) {\n        headers['Content-Type'] = 'application/json';\n    }\n    // If we have a token, attach it as a Bearer token\n    if (token) {\n        headers['Authorization'] = `Bearer ${token}`;\n    }\n    const finalOptions = {\n        ...options,\n        headers\n    };\n    const res = await fetch(url, finalOptions);\n    return res;\n}\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n        ...pageProps\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\aleal\\\\Desktop\\\\UNCC\\\\Spring 2025\\\\ITIS 4010\\\\Assignment6\\\\roamroute-ai-1\\\\frontend\\\\pages\\\\_app.tsx\",\n        lineNumber: 34,\n        columnNumber: 10\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDK0I7QUFFL0IsNERBQTREO0FBQ3JELGVBQWVBLFNBQVNDLEdBQVcsRUFBRUMsVUFBdUIsQ0FBQyxDQUFDO0lBQ25FLDhDQUE4QztJQUM5QyxNQUFNQyxRQUFRLE1BQTZCLEdBQUdDLENBQW9DLEdBQUc7SUFFckYsbURBQW1EO0lBQ25ELE1BQU1FLFVBQWtDO1FBQ3RDLEdBQUdKLFFBQVFJLE9BQU87SUFDcEI7SUFFQSxtREFBbUQ7SUFDbkQsSUFBSSxDQUFDQSxPQUFPLENBQUMsZUFBZSxFQUFFO1FBQzVCQSxPQUFPLENBQUMsZUFBZSxHQUFHO0lBQzVCO0lBRUEsa0RBQWtEO0lBQ2xELElBQUlILE9BQU87UUFDVEcsT0FBTyxDQUFDLGdCQUFnQixHQUFHLENBQUMsT0FBTyxFQUFFSCxPQUFPO0lBQzlDO0lBRUEsTUFBTUksZUFBZTtRQUNuQixHQUFHTCxPQUFPO1FBQ1ZJO0lBQ0Y7SUFFQSxNQUFNRSxNQUFNLE1BQU1DLE1BQU1SLEtBQUtNO0lBQzdCLE9BQU9DO0FBQ1Q7QUFFQSxTQUFTRSxNQUFNLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFZO0lBQy9DLHFCQUFPLDhEQUFDRDtRQUFXLEdBQUdDLFNBQVM7Ozs7OztBQUNqQztBQUVBLGlFQUFlRixLQUFLQSxFQUFDIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGFsZWFsXFxEZXNrdG9wXFxVTkNDXFxTcHJpbmcgMjAyNVxcSVRJUyA0MDEwXFxBc3NpZ25tZW50Nlxccm9hbXJvdXRlLWFpLTFcXGZyb250ZW5kXFxwYWdlc1xcX2FwcC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUHJvcHMgfSBmcm9tICduZXh0L2FwcCc7XG5pbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWxzLmNzcyc7XG5cbi8vIEEgc2ltcGxlIGZldGNoIHdyYXBwZXIgdGhhdCBhdHRhY2hlcyB0aGUgdG9rZW4gaWYgcHJlc2VudFxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFwaUZldGNoKHVybDogc3RyaW5nLCBvcHRpb25zOiBSZXF1ZXN0SW5pdCA9IHt9KSB7XG4gIC8vIEF0dGVtcHQgdG8gcmVhZCB0aGUgdG9rZW4gZnJvbSBsb2NhbFN0b3JhZ2VcbiAgY29uc3QgdG9rZW4gPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NfdG9rZW4nKSA6IG51bGw7XG5cbiAgLy8gTWVyZ2UgZGVmYXVsdCBoZWFkZXJzIHdpdGggYW55IHBhc3NlZC1pbiBoZWFkZXJzXG4gIGNvbnN0IGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgLi4ub3B0aW9ucy5oZWFkZXJzIGFzIFJlY29yZDxzdHJpbmcsIHN0cmluZz4sIC8vIHByZXNlcnZlIGFueSBjdXN0b20gaGVhZGVyc1xuICB9O1xuXG4gIC8vIElmIG5vIENvbnRlbnQtVHlwZSBpcyBzcGVjaWZpZWQsIGRlZmF1bHQgdG8gSlNPTlxuICBpZiAoIWhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSB7XG4gICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSAnYXBwbGljYXRpb24vanNvbic7XG4gIH1cblxuICAvLyBJZiB3ZSBoYXZlIGEgdG9rZW4sIGF0dGFjaCBpdCBhcyBhIEJlYXJlciB0b2tlblxuICBpZiAodG9rZW4pIHtcbiAgICBoZWFkZXJzWydBdXRob3JpemF0aW9uJ10gPSBgQmVhcmVyICR7dG9rZW59YDtcbiAgfVxuXG4gIGNvbnN0IGZpbmFsT3B0aW9ucyA9IHtcbiAgICAuLi5vcHRpb25zLFxuICAgIGhlYWRlcnMsXG4gIH07XG5cbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsLCBmaW5hbE9wdGlvbnMpO1xuICByZXR1cm4gcmVzO1xufVxuXG5mdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzKSB7XG4gIHJldHVybiA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+O1xufVxuXG5leHBvcnQgZGVmYXVsdCBNeUFwcDtcbiJdLCJuYW1lcyI6WyJhcGlGZXRjaCIsInVybCIsIm9wdGlvbnMiLCJ0b2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJoZWFkZXJzIiwiZmluYWxPcHRpb25zIiwicmVzIiwiZmV0Y2giLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(pages-dir-node)/./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();