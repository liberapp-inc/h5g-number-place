// Liberapp 2020 - Tahiti Katagai
// タイマー表示
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
var Timer = (function (_super) {
    __extends(Timer, _super);
    function Timer() {
        var _this = _super.call(this) || this;
        _this.timer = 0;
        return _this;
    }
    Timer.prototype.onDestroy = function () {
    };
    Timer.prototype.update = function () {
        this.timer += 1 / 60;
        Score.I.setPoint(this.timer);
    };
    return Timer;
}(GameObject));
__reflect(Timer.prototype, "Timer");
//# sourceMappingURL=Timer.js.map