"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ConsentLanguages=void 0;var ConsentLanguages=function(){function e(){}return e.prototype.has=function(n){return e.langSet.has(n)},e.prototype.forEach=function(n){e.langSet.forEach(n)},Object.defineProperty(e.prototype,"size",{get:function(){return e.langSet.size},enumerable:!1,configurable:!0}),e.langSet=new Set(["BG","CA","CS","DA","DE","EL","EN","ES","ET","FI","FR","HR","HU","IT","JA","LT","LV","MT","NL","NO","PL","PT","RO","RU","SK","SL","SV","TR","ZH"]),e}();exports.ConsentLanguages=ConsentLanguages;