// Liberapp 2020 - Tahiti Katagai
// スコア表示
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
var Score = (function (_super) {
    __extends(Score, _super);
    // textBest:egret.TextField = null;
    function Score() {
        var _this = _super.call(this) || this;
        _this.point = 0;
        _this.bestScore = 0;
        _this.text = null;
        Score.I = _this;
        _this.point = 0;
        _this.text = Util.newTextField("TIME:0", Util.width / 28, FontColor, 0.9, 0.02, true, true);
        GameObject.baseDisplay.addChild(_this.text);
        _this.bestScore = Util.getSaveDataNumber(SaveKeyClearTime + Game.initialGame, 999);
        return _this;
    }
    Score.prototype.onDestroy = function () {
        this.text.parent.removeChild(this.text);
        this.text = null;
        Score.I = null;
    };
    Score.prototype.update = function () { };
    Score.prototype.addPoint = function (point) {
        if (point === void 0) { point = 1; }
        this.setPoint(this.point + point);
    };
    Score.prototype.setPoint = function (point) {
        var prev = this.point.toFixed();
        var next = point.toFixed();
        if (prev != next) {
            this.point = point;
            this.text.text = "TIME:" + next;
            // if( this.bestScore < this.point ){
            //     this.textBest.text = "BEST:" + this.point.toFixed();
            // }
        }
    };
    Score.I = null; // singleton instance
    return Score;
}(GameObject));
__reflect(Score.prototype, "Score");
//# sourceMappingURL=Score.js.map