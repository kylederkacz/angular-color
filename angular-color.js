/*! angular-color - v0.1.0 - 2014-10-26
* https://github.com/kylederkacz/angular-color
* Copyright (c) 2014 ; Licensed  */
angular.module('angular-color', []);
angular.module('angular-color')
    .factory('Color', function() {

        return {
            componentToHex: function (c) {
                var hex = c.toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            },

            rgbToHex: function (r, g, b) {
                return this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
            },

            hexToRgb: function (hex) {
                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? {
                    red: parseInt(result[1], 16),
                    green: parseInt(result[2], 16),
                    blue: parseInt(result[3], 16)
                } : null;
            },

            getDiffColor: function (rgbColors, percent) {

                var segmentSize = 1 / (rgbColors.length - 1);
                var startIdx = Math.floor(percent / segmentSize);
                var endIdx = Math.ceil(percent / segmentSize);
                
                if (percent > 1) {
                    startIdx = rgbColors.length - 2;
                    endIdx = rgbColors.length - 1;
                    percent = 1;
                }
                else if (percent < 0) {
                    startIdx = 0;
                    endIdx = 1;
                }

                percent = (percent - (startIdx * segmentSize)) / segmentSize;

                var newR = rgbColors[startIdx].red +
                    Math.round((rgbColors[endIdx].red - rgbColors[startIdx].red) * percent);
                var newG = rgbColors[startIdx].green +
                    Math.round((rgbColors[endIdx].green - rgbColors[startIdx].green) * percent);
                var newB = rgbColors[startIdx].blue +
                    Math.round((rgbColors[endIdx].blue - rgbColors[startIdx].blue) * percent);
                return this.rgbToHex(newR, newG, newB);
            }

        };
    });