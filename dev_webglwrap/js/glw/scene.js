/* global GLW */

GLW.Scene = function () {
    this.objects = new Set();
    this.camera = null;
    this.background_color = {r: 0.5, g: 0.5, b: 0.5};
};