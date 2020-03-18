// Liberapp 2020 - Tahiti Katagai
// エフェクト　- 効果線
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
var EffectLine = (function (_super) {
    __extends(EffectLine, _super);
    function EffectLine(x, y, vx, vy, color) {
        if (color === void 0) { color = 0xffc000; }
        var _this = _super.call(this) || this;
        _this.frame = 0;
        _this.x = x;
        _this.y = y;
        _this.vx = vx;
        _this.vy = vy;
        _this.color = color;
        _this.setShape(0.01);
        return _this;
    }
    EffectLine.create = function (x, y, r, color, count) {
        if (count === void 0) { count = 4; }
        for (var i = 0; i < count; i++) {
            var a = rand01() * Math.PI * 2;
            var vx = Math.cos(a);
            var vy = Math.sin(a);
            var vr = r * (2 + i);
            new EffectLine(x + vx * r, y + vy * r, vx * vr, vy * vr, color);
        }
    };
    EffectLine.prototype.setShape = function (rate) {
        var shape = this.display;
        if (this.display == null) {
            this.display = shape = new egret.Shape();
            GameObject.gameDisplay.addChild(this.display);
        }
        else {
            shape.graphics.clear();
        }
        rate = rate * Math.PI * 0.5;
        var rateS = Math.sin(rate);
        var rateD = 1 - Math.cos(rate);
        shape.graphics.lineStyle(6, this.color);
        shape.graphics.moveTo(this.x + this.vx * rateS, this.y + this.vy * rateS);
        shape.graphics.lineTo(this.x + this.vx * rateD, this.y + this.vy * rateD);
    };
    EffectLine.prototype.update = function () {
        if ((++this.frame) >= EffectLine.maxFrame) {
            this.destroy();
            return;
        }
        var rate = this.frame / EffectLine.maxFrame; // 0.0~1.0
        this.setShape(rate);
    };
    EffectLine.maxFrame = 30;
    return EffectLine;
}(GameObject));
__reflect(EffectLine.prototype, "EffectLine");
//# sourceMappingURL=EffectLine.js.map