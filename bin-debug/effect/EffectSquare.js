// Liberapp 2020 - Tahiti Katagai
// エフェクト　四角い波動
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
var EffectSquare = (function (_super) {
    __extends(EffectSquare, _super);
    function EffectSquare(x, y, w, h, color, alpha, wr, hr, vx, vy) {
        if (wr === void 0) { wr = 1 / 4; }
        if (hr === void 0) { hr = 1 / 8; }
        if (vx === void 0) { vx = 0; }
        if (vy === void 0) { vy = 0; }
        var _this = _super.call(this) || this;
        _this.w = 0;
        _this.h = 0;
        _this.vx = 0;
        _this.vy = 0;
        _this.vr = 0.8;
        _this.rate = 0;
        _this.delta = (1 / 20);
        _this.dw = w;
        _this.dh = h;
        _this.wr = wr;
        _this.hr = hr;
        _this.c = color;
        _this.maxA = alpha;
        _this.vx = vx;
        _this.vy = vy;
        _this.vr *= randF(0.8, 1.2);
        _this.delta *= randF(0.8, 1.2);
        _this.setShape(x + vx, y + vy, _this.w, _this.h, color, _this.maxA);
        return _this;
    }
    EffectSquare.prototype.setShape = function (x, y, w, h, color, alpha) {
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
        shape.graphics.beginFill(color, alpha);
        shape.graphics.drawRect(-0.5 * w, -0.5 * h, w, h);
        shape.graphics.endFill();
    };
    EffectSquare.prototype.update = function () {
        this.X += this.vx;
        this.Y += this.vy;
        this.vx *= this.vr;
        this.vy *= this.vr;
        this.rate += this.delta;
        if (this.rate < 0.7) {
            this.w += (this.dw - this.w) * this.wr;
            this.h += (this.dh - this.h) * this.hr;
        }
        else {
            this.w += (0 - this.w) * this.hr; // switch rate
            this.h += (0 - this.h) * this.wr;
        }
        //let a = (1-this.rate) * this.maxA;
        var a = this.maxA;
        this.setShape(this.X, this.Y, this.w, this.h, this.c, a);
        if (this.rate >= 1) {
            this.destroy();
            return;
        }
    };
    return EffectSquare;
}(GameObject));
__reflect(EffectSquare.prototype, "EffectSquare");
//# sourceMappingURL=EffectSquare.js.map