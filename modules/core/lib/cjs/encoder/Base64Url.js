"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Base64Url=void 0;var index_js_1=require("../errors/index.js"),Base64Url=function(){function e(){}return e.decode=function(e){if(!/^[A-Za-z0-9\-_]+$/.test(e))throw new index_js_1.DecodingError("Invalidly encoded Base64URL string");for(var r="",t=0;t<e.length;t++){var n=this.REVERSE_DICT.get(e[t]).toString(2);r+="0".repeat(this.BASIS-n.length)+n}return r},e.DICT="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",e.REVERSE_DICT=new Map([["A",0],["B",1],["C",2],["D",3],["E",4],["F",5],["G",6],["H",7],["I",8],["J",9],["K",10],["L",11],["M",12],["N",13],["O",14],["P",15],["Q",16],["R",17],["S",18],["T",19],["U",20],["V",21],["W",22],["X",23],["Y",24],["Z",25],["a",26],["b",27],["c",28],["d",29],["e",30],["f",31],["g",32],["h",33],["i",34],["j",35],["k",36],["l",37],["m",38],["n",39],["o",40],["p",41],["q",42],["r",43],["s",44],["t",45],["u",46],["v",47],["w",48],["x",49],["y",50],["z",51],["0",52],["1",53],["2",54],["3",55],["4",56],["5",57],["6",58],["7",59],["8",60],["9",61],["-",62],["_",63]]),e.BASIS=6,e.LCM=24,e}();exports.Base64Url=Base64Url;