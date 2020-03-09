// Liberapp 2020 - Tahiti Katagai
// スタート時の説明テキスト
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
var StartMessage = (function (_super) {
    __extends(StartMessage, _super);
    function StartMessage() {
        var _this = _super.call(this) || this;
        _this.rectFilter = null;
        _this.texts = [];
        _this.button = null;
        StartMessage.I = _this;
        _this.rectFilter = new Rect(0, Util.h(0.325), Util.width, Util.h(0.3), 0x000000, false, true);
        _this.rectFilter.display.alpha = 0.4;
        _this.texts[0] = Util.newTextField("空いているマスをタップで選択", Util.width / 20, FONT_COLOR, 0.5, 0.4, true, false);
        _this.texts[1] = Util.newTextField("下の１〜９の数字キーで入力しよう", Util.width / 20, FONT_COLOR, 0.5, 0.5, true, false);
        _this.texts.forEach(function (text) { GameObject.baseDisplay.addChild(text); });
        _this.button = new Button(null, 0, 0, 0.5, 0.5, 1, 1, 0x000000, 0.0, false, _this.onTap, _this); // 透明な全画面ボタン
        return _this;
    }
    StartMessage.prototype.onDestroy = function () {
        this.rectFilter.destroy();
        this.rectFilter = null;
        this.texts.forEach(function (text) { text.parent.removeChild(text); });
        this.texts = null;
        this.button.destroy();
        StartMessage.I = null;
    };
    StartMessage.prototype.update = function () {
    };
    StartMessage.prototype.onTap = function () {
        // this.destroy();  できない罠 このthis=this.button(呼び出し元)
        if (StartMessage.I) {
            StartMessage.I.destroy();
        }
    };
    StartMessage.I = null;
    return StartMessage;
}(GameObject));
__reflect(StartMessage.prototype, "StartMessage");
//# sourceMappingURL=StartMessage.js.map