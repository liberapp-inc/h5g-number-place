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
var BackColor = 0x000000; // index.htmlで設定
var FontColor = 0x00ffff;
var BoxColor = 0x205080;
var BoxFontColor = 0xff0060;
var FixedBoxColor = 0x204070;
var RelateBoxColor = 0x002040;
var SelectBoxColor = 0x001020;
var RightFontColor = 0x0040ff;
var WrongFontColor = 0xffff00;
var EqualNumbColor = 0xffff00;
var KeyColor = 0xff50ff;
var KeyLineColor = 0;
var KeyFontColor = 0x200020;
var EffectColor = 0x00ffe0;
var BoxCount = 9;
var BoxSizeInW = 10;
var BoxSizeInH = 15;
var BoxWpw = 1 / BoxSizeInW;
var BoxHph = 1 / BoxSizeInH;
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
        _this.initialNumbs = [];
        _this.numbs = [];
        _this.notes = [];
        _this.currentBoxID = -1;
        _this.touchedBoxID = -1;
        _this.touchedKeyID = -1;
        Game.I = _this;
        // マスボタン９ｘ９
        for (var ix = 0; ix < BoxCount; ix++) {
            for (var iy = 0; iy < BoxCount; iy++) {
                var i = ix + iy * BoxCount;
                var numText = Game.initialData[i];
                var num = parseInt(numText);
                _this.initialNumbs[i] = num;
                _this.numbs[i] = num;
                _this.notes[i] = 0;
                if (num == 0)
                    numText = "";
                var xr = 0.50 + (ix - 4) * BoxWpw;
                var yr = 0.35 + (iy - 4) * BoxHph;
                var bold = num != 0;
                _this.boxes[i] = new Box(numText, xr, yr, BoxWpw * 0.95, BoxHph * 0.95, bold, function (btn) { return _this.onBox(btn); }, _this, i);
                if (bold)
                    _this.boxes[i].setColor(FixedBoxColor);
            }
        }
        // 数値キー １〜９
        for (var ix = 0; ix < 3; ix++) {
            for (var iy = 0; iy < 3; iy++) {
                var i = 1 + ix + iy * 3;
                var numText = i.toFixed();
                var xr = 0.50 + (ix - 1) * KeyWpw;
                var yr = 0.80 + (iy - 1) * KeyHph;
                _this.keys[i] = new Button(numText, 42, KeyFontColor, xr, yr, KeyWpw * 0.9, KeyHph * 0.9, KeyColor, 1, KeyLineColor, true, function (btn) { return _this.onKey(btn); }, _this, i);
            }
        }
        // 削除キー
        _this.delKey = new Button("×", 42, KeyFontColor, 0.8, 0.8 - KeyHph, KeyWpw * 0.9, KeyHph * 0.9, KeyColor, 1, KeyLineColor, true, function (btn) { return _this.onDelKey(btn); }, _this);
        return _this;
    }
    Game.prototype.onBox = function (btn) {
        this.touchedBoxID = btn.keyId;
    };
    Game.prototype.onKey = function (btn) {
        this.touchedKeyID = btn.keyId;
    };
    Game.prototype.onDelKey = function (btn) {
        if (this.currentBoxID >= 0) {
            if (this.initialNumbs[this.currentBoxID] == 0) {
                this.numbs[this.currentBoxID] = 0;
                this.notes[this.currentBoxID] = 0;
                this.boxes[this.currentBoxID].setText("");
            }
        }
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
                this.boxes[this.currentBoxID].setColor(BoxColor);
                this.boxes[this.currentBoxID].setTextColor(FontColor);
            }
            this.currentBoxID = this.touchedBoxID;
            // 対象エリアカラー
            var ix = this.currentBoxID % BoxCount;
            var iy = Math.floor(this.currentBoxID / BoxCount);
            this.setRelateBoxColor(ix, iy);
            this.setRelateTextColor(ix, iy);
            // 対象BOXカラー
            var box = this.boxes[this.currentBoxID];
            box.setColor(SelectBoxColor);
            this.effectChooseBox(box.X, box.Y);
        }
        // 数字キー入力
        if (this.touchedKeyID >= 0) {
            if (this.currentBoxID >= 0) {
                if (this.initialNumbs[this.currentBoxID] == 0) {
                    // メモがあれば追加削除
                    if (this.notes[this.currentBoxID] != 0) {
                        this.notes[this.currentBoxID] ^= (1 << this.touchedKeyID);
                        if (this.notes[this.currentBoxID] != 0) {
                            this.boxes[this.currentBoxID].setNote(this.notes[this.currentBoxID]);
                        }
                        else {
                            this.setBoxNumber();
                        }
                    }
                    else if (this.numbs[this.currentBoxID] == this.touchedKeyID) {
                        this.numbs[this.currentBoxID] = 0;
                        this.notes[this.currentBoxID] ^= (1 << this.touchedKeyID);
                        this.boxes[this.currentBoxID].setNote(this.notes[this.currentBoxID]);
                    }
                    else {
                        this.setBoxNumber();
                    }
                }
            }
        }
        this.touchedBoxID = -1;
        this.touchedKeyID = -1;
    };
    Game.prototype.setBoxNumber = function () {
        // マスに設定
        this.numbs[this.currentBoxID] = this.touchedKeyID;
        this.boxes[this.currentBoxID].setText(this.touchedKeyID.toFixed());
        // 判定（配置上のチェック）
        var box = this.boxes[this.currentBoxID];
        var ix = this.currentBoxID % BoxCount;
        var iy = Math.floor(this.currentBoxID / BoxCount);
        this.setRelateTextColor(ix, iy);
        if (this.checkNumber(ix, iy)) {
            box.setTextColor(FontColor);
            this.effectRightNumber(box.X, box.Y);
        }
        else {
            box.setTextColor(WrongFontColor);
        }
        if (this.checkClear()) {
            new GameOver();
        }
    };
    Game.prototype.setBoxOutline33 = function () {
    };
    Game.prototype.effectChooseBox = function (x, y) {
        new EffectSquare(Util.w(0.50), y, Util.w(1.4), Util.h(BoxHph), EffectColor, 0.5, 1 / 3, 1 / 9);
        new EffectSquare(x, Util.h(0.35), Util.w(BoxWpw), Util.h(1.4), EffectColor, 0.5, 1 / 6, 1 / 2);
    };
    Game.prototype.effectRightNumber = function (x, y) {
        for (var i = 0; i < 4; i++) {
            var s = Util.w(BoxWpw) * randF(0.25, 1.5);
            var v = 20;
            var vx = randF(-v, +v);
            var vy = randF(-v, +v);
            new EffectSquare(x + vx * 5, y + vy * 5, s, s, EffectColor, 0.5, 1 / 2, 1 / 6, vx, vy).delta *= randF(0.5, 1);
            new EffectSquare(x + vy * 5, y + vx * 5, s, s, EffectColor, 0.5, 1 / 6, 1 / 2, vx, vy).delta *= randF(0.5, 1);
        }
        new EffectSquare(Util.w(0.50), y, Util.w(1.5), Util.h(BoxHph * 0.5), EffectColor, 0.5, 1 / 3, 1 / 9);
        new EffectSquare(x, Util.h(0.35), Util.w(BoxWpw * 0.5), Util.h(1.5), EffectColor, 0.5, 1 / 6, 1 / 2);
    };
    Game.prototype.setRelateBoxColor = function (ix, iy) {
        var numb = this.numbs[ix + iy * BoxCount];
        var headX = Math.floor(ix / 3) * 3;
        var headY = Math.floor(iy / 3) * 3;
        for (var i = 0; i < BoxCount; i++) {
            for (var j = 0; j < BoxCount; j++) {
                var index = i + j * BoxCount;
                // 対象のマスを水色に
                var inBox3x3 = i >= headX && i <= headX + 2 && j >= headY && j <= headY + 2;
                var color = 0;
                if (inBox3x3 || i == ix || j == iy) {
                    color = RelateBoxColor;
                }
                else {
                    color = this.initialNumbs[index] == 0 ? BoxColor : FixedBoxColor;
                }
                this.boxes[index].setColor(color);
            }
        }
    };
    Game.prototype.setRelateTextColor = function (ix, iy) {
        var numb = this.numbs[ix + iy * BoxCount];
        // 同じ数値を強調
        for (var i = 0; i < BoxCount; i++) {
            for (var j = 0; j < BoxCount; j++) {
                var index = i + j * BoxCount;
                if (this.numbs[index] == numb) {
                    this.boxes[index].setTextColor(EqualNumbColor);
                }
                else {
                    this.boxes[index].setTextColor(BoxFontColor);
                }
            }
        }
    };
    // 判定（現在配置されている数字でダブリがないかチェック　正解かどうかではない）
    Game.prototype.checkNumber = function (ix, iy) {
        // let numb = this.numbs[ ix + iy * BoxCount ];
        // let headX = Math.floor(ix/3) * 3;
        // let headY = Math.floor(iy/3) * 3;
        // for( let i=0 ; i<BoxCount ; i++ ){
        //     for( let j=0 ; j<BoxCount ; j++ ){
        //         if( i == ix && j == iy )
        //             continue;
        //         // 対象のマスの数値を判定
        //         let index = i + j*BoxCount;
        //         let inBox3x3 = i >= headX && i <= headX + 2 && j >= headY && j <= headY + 2;
        //         if( inBox3x3 || i == ix || j==iy ){
        //             if( this.numbs[ index ] == numb ){
        //                 return false;   // wrong
        //             }
        //         }
        //     }
        // }
        // return true; // correct
        // こちらのほうが対象を絞って高速　
        var numb = this.numbs[ix + iy * BoxCount];
        // 横ライン
        for (var i = 0; i < BoxCount; i++) {
            if (i != ix && this.numbs[i + iy * BoxCount] == numb) {
                return false;
            }
        }
        // 縦ライン
        for (var j = 0; j < BoxCount; j++) {
            if (j != iy && this.numbs[ix + j * BoxCount] == numb) {
                return false;
            }
        }
        // ３ｘ３ブロック
        var headX = Math.floor(ix / 3) * 3;
        var headY = Math.floor(iy / 3) * 3;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var x = headX + i;
                var y = headY + j;
                if (x != ix && y != iy && this.numbs[x + y * BoxCount] == numb) {
                    return false;
                }
            }
        }
        return true; // correct
    };
    // クリアチェック　すべての入力ナンバーをチェック
    Game.prototype.checkClear = function () {
        // すべて入力済みか
        for (var i = 0; i < this.numbs.length; i++) {
            if (this.numbs[i] == 0) {
                return false;
            }
        }
        for (var i = 0; i < BoxCount; i++) {
            for (var j = 0; j < BoxCount; j++) {
                var index = i + j * BoxCount;
                if (this.initialNumbs[index] == 0) {
                    if (this.checkNumber(i, j) == false) {
                        return false;
                    }
                }
            }
        }
        return true; // correct
    };
    Game.initialData = "008000010041700293293540070036900000007000800000005740080072961614009520070000300";
    return Game;
}(GameObject));
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map