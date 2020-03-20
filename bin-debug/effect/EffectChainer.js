// Liberapp 2020 - Tahiti Katagai
// エフェクト連鎖生成クラス
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
var EffectChainer = (function (_super) {
    __extends(EffectChainer, _super);
    function EffectChainer(type, x, y, vx, vy, count) {
        var _this = _super.call(this) || this;
        _this.ticks = 0;
        _this.type = type;
        _this.x = x;
        _this.y = y;
        _this.vx = vx;
        _this.vy = vy;
        _this.count = count;
        switch (type) {
            case 0:
                _this.inter = 3;
        }
        return _this;
    }
    EffectChainer.prototype.update = function () {
        this.ticks++;
        if (this.ticks % this.inter == 0) {
            switch (this.type) {
                case 0:
                    this.create0();
                    break;
            }
            if (--this.count <= 0) {
                this.destroy();
            }
        }
    };
    // 連続四角ライン
    EffectChainer.prototype.create0 = function () {
        this.x += this.vx;
        this.y += this.vy;
        var s = Util.w(BoxWpw) * randF(0.25, 1.0);
        var v = 5;
        var vx = randF(-v, +v);
        var vy = randF(-v, +v);
        new EffectFrame(this.x + vx * 5, this.y + vy * 5, s, s, EffectColor, 0.5, 1 / 2, 1 / 6, vx, vy).delta *= randF(0.5, 1);
    };
    return EffectChainer;
}(GameObject));
__reflect(EffectChainer.prototype, "EffectChainer");
//# sourceMappingURL=EffectChainer.js.map