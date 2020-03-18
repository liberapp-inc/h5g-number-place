// Liberapp 2020 - Tahiti Katagai
// エフェクト　丸い円の波動
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
var EffectCircle = (function (_super) {
    __extends(EffectCircle, _super);
    function EffectCircle(x, y, radius, color) {
        if (color === void 0) { color = 0xffc000; }
        var _this = _super.call(this) || this;
        _this.frame = EffectCircle.maxFrame;
        _this.radius = radius;
        _this.color = color;
        _this.setShape(x, y, _this.radius);
        return _this;
    }
    EffectCircle.prototype.setShape = function (x, y, radius) {
        var shape = this.display;
        if (this.display == null) {
            this.display = shape = new egret.Shape();
            GameObject.gameDisplay.addChild(this.display);
        }
        else {
            shape.graphics.clear();
        }
        shape.x = x;
        shape.y = y;
        shape.graphics.lineStyle(3 + 10 * (this.frame / EffectCircle.maxFrame), this.color);
        shape.graphics.drawCircle(0, 0, radius);
    };
    EffectCircle.prototype.update = function () {
        if ((--this.frame) <= 0) {
            this.destroy();
            return;
        }
        this.radius *= 1.03;
        this.setShape(this.display.x, this.display.y, this.radius);
    };
    EffectCircle.maxFrame = 30;
    return EffectCircle;
}(GameObject));
__reflect(EffectCircle.prototype, "EffectCircle");
//# sourceMappingURL=EffectCircle.js.map