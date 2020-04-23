// Liberapp 2020 - Tahiti Katagai
// タイトルシーン
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
var SceneTitle = (function (_super) {
    __extends(SceneTitle, _super);
    function SceneTitle() {
        var _this = _super.call(this) || this;
        _this.texts = [];
        _this.startButton = null;
        _this.settingsButton = null;
        _this.texts[0] = Util.newTextField("HYPER SUDOKU", Util.width / 11, FontColor, 0.5, 0.25, true, true);
        _this.startButton = new Button("スタート", Util.width / 16, BackColor, 0.50, 0.70, 0.7, 0.12, FontColor, 1.0, -1, true, _this.onTapStart, _this);
        _this.texts.forEach(function (text) { if (text) {
            GameObject.baseDisplay.addChild(text);
        } });
        return _this;
    }
    SceneTitle.loadScene = function () {
        new SceneTitle();
    };
    SceneTitle.prototype.onDestroy = function () {
        this.texts.forEach(function (text) { if (text) {
            text.parent.removeChild(text);
        } });
        this.texts = null;
    };
    SceneTitle.prototype.inputData = function (data) {
        Game.initialData = data;
    };
    SceneTitle.prototype.update = function () {
    };
    SceneTitle.prototype.onTapStart = function () {
        // console.log( this.texts[0].text );       // "this" is mine
        GameObject.transit = SceneSelect.loadScene;
    };
    return SceneTitle;
}(GameObject));
__reflect(SceneTitle.prototype, "SceneTitle");
//# sourceMappingURL=SceneTitle.js.map