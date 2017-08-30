#!/usr/bin/env node
var fs = require("fs");
var path = require("path");
var input = process.argv;
var inputDir = input[2];
//var inputMinType = input[4] || "css";
var outFile = input[3] || "out";
var compressor = require("node-minify");
var uglifycss = require("uglifycss");
var uglifyjs = require("uglify-js");
var cssFiles = [];
var jsFiles = [];

var walk = function(currentDirPath, callback) {

    fs.readdirSync(currentDirPath).forEach(function(name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walk(filePath, callback);
        }
    });    

    if (jsFiles.length > 0)
    {
        var uglifiedJs = uglifyjs.processFiles(jsFiles);
        fs.writeFile(outFile + ".min.js", uglified);
    }

    if (cssFiles.length > 0)
    {
        var uglified = uglifycss.processFiles(cssFiles);
        fs.writeFile(outFile + ".min.css", uglified);
    }
}

var minifyAll = function(dir, options, callback){
    options = options || {};
    //options.type = options.type || inputMinType;
    options.outFile = options.outFile || outFile;

    walk(dir, function(path, result){
        if (path.substr(-3) === ".js") {
            jsFiles.push(path);
        } else if (path.substr(-4) === ".css") {
            cssFiles.push(path);
        }        
    });
};

if (inputDir){
    minifyAll(inputDir);
}

module.exports = minifyAll;
