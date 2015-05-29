(function () {
  "use strict";

  var path = require("path");

  module.exports = function () {
    // TODO: Specify file and folder information here...
    var src = "./app/";
    var outputRoot = "./public";
    var indexHtmlFile = path.join(outputRoot, "index.html");

    var config = {
      src: src,
      mainBowerFilterFilters: {
        js: ["*.js", "**/*.js"],
        html: ["**/*.html"],
        jade: ["**/*.jade"],
        css: ["**/*.css"],
        assets: [
          '*',
          '!**/*.css',
          '!**/*.js',
          '!**/*.jade',
          '!**/*.less']
      },
      additionalVendorFiles: [
      ],
      temp: "./.temp/",
      sass: "./styles/styles.scss",
      fontLocation: {
        find: "../fonts/",
        replaceWith: "./"
      },
      client: {
        // The final output for your source
        appJsFile: "app.js",
        // The final output for vendor source
        vendorJsFile: "vendor.js",
        // The final output for vendor css
        vendorCssFile: "vendor.css",
        // The folder where all JavaScript output will reside (accessible from web)
        jsFolder: path.join(outputRoot, "js"),
        // The folder where assets will reside (accessible from web)
        assetsFolder: path.join(outputRoot, "assets")
      },
      index: indexHtmlFile
    };

    return config;
  };
}());