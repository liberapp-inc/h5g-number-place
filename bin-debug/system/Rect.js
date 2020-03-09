// Liberapp 2020 - Tahiti Katagai
// 四角形描画
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect(x, y, w, h, color, gameDisplay, dispFront) {
        if (gameDisplay === void 0) { gameDisplay = false; }
        if (dispFront === void 0) { dispFront = false; }
        var _this = _super.call(this) || this;
        var shape = new egret.Shape();
        _this.display = shape;
        var doc = gameDisplay ? GameObject.gameDisplay : GameObject.baseDisplay;
        if (dispFront)
            doc.addChild(_this.display);
        else
            doc.addChildAt(_this.display, 1);
        shape.graphics.beginFill(color, 1);
        shape.graphics.drawRect(x, y, w, h);
        shape.graphics.endFill();
        return _this;
    }
    Rect.prototype.update = function () {
    };
    return Rect;
}(GameObject));
__reflect(Rect.prototype, "Rect");
//# sourceMappingURL=Rect.js.map