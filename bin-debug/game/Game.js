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
        _this.currentBoxID = -1;
        _this.touchedBoxID = -1;
        _this.touchedKeyID = 0;
        Game.I = _this;
        // GameObject.gameDisplay.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touchBegin(e), this);
        // GameObject.gameDisplay.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => this.touchMove(e), this);
        // GameObject.gameDisplay.stage.addEventListener(egret.TouchEvent.TOUCH_END, (e: egret.TouchEvent) => this.touchEnd(e), this);
        // マスボタン９ｘ９
        for (var ix = 0; ix < 9; ix++) {
            for (var iy = 0; iy < 9; iy++) {
                var i = ix + iy * 9;
                var numText = i.toFixed();
                var xr = 0.50 + (ix - 4) * BoxWpw;
                var yr = 0.35 + (iy - 4) * BoxHph;
                _this.boxes[i] = new Button(numText, 16, FONT_COLOR, xr, yr, BoxWpw, BoxHph, BoxColor, 1, true, _this.onBox, null, i);
            }
        }
        // 数値キー １〜９
        for (var ix = 0; ix < 3; ix++) {
            for (var iy = 0; iy < 3; iy++) {
                var i = 1 + ix + iy * 3;
                var numText = i.toFixed();
                var xr = 0.50 + (ix - 1) * KeyWpw;
                var yr = 0.80 + (iy - 1) * KeyHph;
                _this.boxes[i] = new Button(numText, 16, FONT_COLOR, xr, yr, KeyWpw, KeyHph, BoxColor, 1, true, _this.onKey, null, i);
            }
        }
        return _this;
    }
    Game.prototype.onBox = function () {
        var btn = this;
        Game.I.touchedBoxID = btn.keyId;
    };
    Game.prototype.onKey = function () {
        var btn = this;
        Game.I.touchedKeyID = btn.keyId;
    };
    Game.prototype.onDestroy = function () {
        Game.I = null;
        // GameObject.gameDisplay.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touchBegin(e), this);
        // GameObject.gameDisplay.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => this.touchMove(e), this);
        // GameObject.gameDisplay.stage.removeEventListener(egret.TouchEvent.TOUCH_END, (e: egret.TouchEvent) => this.touchEnd(e), this);
    };
    // touchBegin(e:egret.TouchEvent){
    //     this.localTouchBegan = 
    //     this.press = 
    //     this.touch = true;
    //     this.tapX = e.localX;
    //     this.tapY = e.localY;
    // }
    // touchMove(e:egret.TouchEvent){
    //     this.tapX = e.localX;
    //     this.tapY = e.localY;
    // }
    // touchEnd(e:egret.TouchEvent){
    //     this.touch = false;
    // }
    // touchUpdate(){
    //     if( this.localTouchBegan ){
    //         this.localTouchBegan = false;
    //     }else{
    //         this.press = false;
    //     }
    // }
    Game.prototype.update = function () {
        if (GameOver.I != null)
            return;
        // this.touchUpdate();
        // マス選択
        // 数字キー入力
    };
    return Game;
}(GameObject));
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map