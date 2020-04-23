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
        _this.buttonOK = null;
        _this.step = 0;
        _this.fadeInFrame = 64;
        GameOver.I = _this;
        _this.buttonOK = new Button("クリア", Util.width / 16, BackColor, 0.50, 0.3, 1.4, 0.2, FontColor, 1.0, -1, true, _this.onTapRetry, _this);
        egret.Tween.get(_this.buttonOK.text, { loop: false })
            .to({ alpha: 0 }, 0)
            .to({ alpha: 1 }, 1000);
        egret.Tween.get(_this.buttonOK.display, { loop: false })
            .to({ alpha: 0 }, 0)
            .to({ alpha: 1 }, 1000);
        return _this;
    }
    GameOver.prototype.onDestroy = function () {
        this.texts.forEach(function (text) { GameObject.baseDisplay.removeChild(text); });
        this.texts = null;
        GameOver.I = null;
    };
    GameOver.prototype.update = function () {
    };
    GameOver.prototype.onTapRetry = function () {
        GameObject.transit = SceneSelect.loadScene;
    };
    GameOver.I = null;
    return GameOver;
}(GameObject));
__reflect(GameOver.prototype, "GameOver");
//# sourceMappingURL=GameOver.js.map