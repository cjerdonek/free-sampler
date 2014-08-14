'use strict';

// As a hack to avoid the following error when loading scripts_vendor/bigint.js,
// we ensure 'module' is defined.
window.module = window.module || {};

// Uncomment the below to see the "omitted" part of an error message
// in the console.  This is a work-around for an issue that was fixed
// in Chrome version 37.  See here for more info:
// http://stackoverflow.com/questions/22527436/how-to-see-whats-omitted-in-chrome-debug-console
// window.onerror = function (errorMsg, url, lineNumber, columnNumber, errorObject) {
//     if (errorObject && /<omitted>/.test(errorMsg)) {
//         console.error('Full exception message: ' + errorObject.message);
//     }
// };