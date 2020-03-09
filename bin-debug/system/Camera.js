// Liberapp 2020 - Tahiti Katagai
// 2Dカメラ
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Camera2D = (function () {
    function Camera2D() {
    }
    Camera2D.initial = function () {
        Camera2D.x = 0;
        Camera2D.y = 0;
        Camera2D.localX = 0;
        Camera2D.localY = 0;
        Camera2D.scale = 1;
        Camera2D.rotation = 0;
    };
    Camera2D.process = function () {
        GameObject.gameDisplay.anchorOffsetX = Camera2D.x;
        GameObject.gameDisplay.anchorOffsetY = Camera2D.y;
        GameObject.gameDisplay.x = this.localX;
        GameObject.gameDisplay.y = this.localY;
        GameObject.gameDisplay.scaleX = GameObject.gameDisplay.scaleY = Camera2D.scale;
        GameObject.gameDisplay.rotation = Camera2D.rotation;
    };
    return Camera2D;
}());
__reflect(Camera2D.prototype, "Camera2D");
//# sourceMappingURL=Camera.js.map