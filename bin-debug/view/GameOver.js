// Liberapp 2020 Tahiti Katagai
// ゲームオーバー表示
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
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        var _this = _super.call(this) || this;
        _this.texts = [];
        _this.retryButton = null;
        _this.step = 0;
        _this.fadeInFrame = 64;
        GameOver.I = _this;
        _this.texts[0] = Util.newTextField("SCORE : " + Score.I.point.toFixed(), Util.width / 12, Font2Color, 0.5, 0.3, true, false);
        egret.Tween.get(_this.texts[0], { loop: false })
            .to({ alpha: 0 }, 0)
            .to({ alpha: 1 }, 1000);
        GameObject.baseDisplay.addChild(_this.texts[0]);
        return _this;
    }
    GameOver.prototype.onDestroy = function () {
        this.texts.forEach(function (text) { GameObject.baseDisplay.removeChild(text); });
        this.texts = null;
        GameOver.I = null;
    };
    GameOver.prototype.update = function () {
        this.step++;
        if (this.step == this.fadeInFrame) {
            this.retryButton = new Button("リトライ", Util.width / 16, BackColor, 0.50, 0.55, 0.4, 0.1, Font2Color, 1.0, -1, true, this.onTapRetry, this);
            if (Score.I.point > Score.I.bestScore) {
                Util.setSaveDataNumber(SaveKeyBestScore, Score.I.point);
                this.texts[1] = Util.newTextField("NEW RECORD!", Util.width / 13, Font2Color, 0.5, 0.4, true, false);
                egret.Tween.get(this.texts[1], { loop: true })
                    .to({ alpha: 0 }, 500)
                    .to({ alpha: 1 }, 500);
                GameObject.baseDisplay.addChild(this.texts[1]);
            }
        }
    };
    GameOver.prototype.onTapRetry = function () {
        GameObject.transit = ScenePlay.loadScene;
        // this.destroy();
    };
    GameOver.I = null;
    return GameOver;
}(GameObject));
__reflect(GameOver.prototype, "GameOver");
//# sourceMappingURL=GameOver.js.map