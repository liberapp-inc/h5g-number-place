// Liberapp 2020 - Tahiti Katagai
// ゲーム
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
var SaveKeyBestScore = "numpla-bestScore";
var DefaultBestScore = 50;
var BACK_COLOR = 0xf8fafc; // index.htmlで設定
var FONT_COLOR = 0x101010;
var FONT2_COLOR = 0xd00000;
var BoxColor = 0xf0f0f0;
var RelateBoxColor = 0x80c0f0;
var SelectBoxColor = 0xf0c080;
var BoxInW = 10;
var BoxInH = 15;
var BoxWpw = 1 / BoxInW;
var BoxHph = 1 / BoxInH;
var KeyInW = 8;
var KeyInH = 12;
var KeyWpw = 1 / KeyInW;
var KeyHph = 1 / KeyInH;
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this.counter = 0;
        _this.localTouchBegan = false;
        _this.press = false;
        _this.touch = false;
        _this.tapX = 0;
        _this.tapY = 0;
        _this.boxes = [];
        _this.keys = [];
        _this.initialData = "008000010041700293293540070036900000007000800000005740080072961614009520070000300";
        _this.initialNumbs = [];
        _this.correctNumbs = [];
        _this.numbs = [];
        _this.currentBoxID = -1;
        _this.touchedBoxID = -1;
        _this.touchedKeyID = -1;
        Game.I = _this;
        // マスボタン９ｘ９
        for (var ix = 0; ix < 9; ix++) {
            for (var iy = 0; iy < 9; iy++) {
                var i = ix + iy * 9;
                var numText = _this.initialData[i];
                var num = parseInt(numText);
                _this.initialNumbs[i] = num;
                _this.numbs[i] = num;
                if (num == 0)
                    numText = "";
                var xr = 0.50 + (ix - 4) * BoxWpw;
                var yr = 0.35 + (iy - 4) * BoxHph;
                _this.boxes[i] = new Button(numText, 24, FONT_COLOR, xr, yr, BoxWpw * 0.9, BoxHph * 0.9, BoxColor, 1, FONT2_COLOR, function (btn) { return _this.onBox(btn); }, _this, i);
            }
        }
        // 数値キー １〜９
        for (var ix = 0; ix < 3; ix++) {
            for (var iy = 0; iy < 3; iy++) {
                var i = 1 + ix + iy * 3;
                var numText = i.toFixed();
                var xr = 0.50 + (ix - 1) * KeyWpw;
                var yr = 0.80 + (iy - 1) * KeyHph;
                _this.keys[i] = new Button(numText, 28, FONT_COLOR, xr, yr, KeyWpw, KeyHph, BoxColor, 1, FONT2_COLOR, function (btn) { return _this.onKey(btn); }, _this, i);
            }
        }
        return _this;
    }
    Game.prototype.onBox = function (btn) {
        this.touchedBoxID = btn.keyId;
    };
    Game.prototype.onKey = function (btn) {
        this.touchedKeyID = btn.keyId;
    };
    Game.prototype.onDestroy = function () {
        Game.I = null;
    };
    Game.prototype.update = function () {
        if (GameOver.I != null)
            return;
        // マス選択　カラー変更
        var num;
        if (this.touchedBoxID >= 0) {
            if (this.currentBoxID >= 0) {
                num = this.numbs[this.currentBoxID];
                this.boxes[this.currentBoxID].setColor(BoxColor);
                this.boxes[this.currentBoxID].setText(num > 0 ? num.toFixed() : "");
            }
            this.currentBoxID = this.touchedBoxID;
            num = this.numbs[this.currentBoxID];
            this.boxes[this.currentBoxID].setColor(SelectBoxColor);
            this.boxes[this.currentBoxID].setText(num > 0 ? num.toFixed() : "");
        }
        // 数字キー入力
        if (this.touchedKeyID >= 0) {
            if (this.currentBoxID >= 0) {
                if (this.initialNumbs[this.currentBoxID] == 0) {
                    this.numbs[this.currentBoxID] = this.touchedKeyID;
                    this.boxes[this.currentBoxID].setText(this.touchedKeyID.toFixed());
                }
            }
        }
        this.touchedBoxID = -1;
        this.touchedKeyID = -1;
    };
    return Game;
}(GameObject));
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map