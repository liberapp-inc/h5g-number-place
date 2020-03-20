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
var BoxLineColor = 0x00ffff;
var FixedBoxColor = 0x203868;
var RelateBoxColor = 0x002040;
var SelectBoxColor = 0x001020;
var NumberColor = 0x00ffff;
var FixedNumberColor = 0xff0060;
var RightNumberColor = 0x00ffff;
var WrongNumberColor = 0xffff00;
var EqualNumberColor = 0xffff00;
var KeyColor = 0xff50ff;
var KeyLineColor = 0x803080;
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
                if (bold) {
                    _this.boxes[i].setColor(FixedBoxColor);
                    _this.boxes[i].setTextColor(FixedNumberColor);
                }
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
                this.setBoxNumber(this.currentBoxID, 0);
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
                this.boxes[this.currentBoxID].setTextColor(NumberColor);
            }
            this.currentBoxID = this.touchedBoxID;
            // 対象エリアカラー
            var ix = this.currentBoxID % BoxCount;
            var iy = Math.floor(this.currentBoxID / BoxCount);
            this.setRelateBoxColor(ix, iy);
            this.setRelateTextColor(ix, iy, this.numbs[this.currentBoxID]);
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
                            // メモでも正解エフェクト
                            if ((this.notes[this.currentBoxID] & (1 << this.touchedKeyID)) != 0) {
                                var ix = this.currentBoxID % BoxCount;
                                var iy = Math.floor(this.currentBoxID / BoxCount);
                                this.setRelateTextColor(ix, iy, this.touchedKeyID);
                                if (this.checkNumber(ix, iy, this.touchedKeyID)) {
                                    var box = this.boxes[this.currentBoxID];
                                    this.effectRightNumber(box.X, box.Y);
                                }
                            }
                        }
                        else {
                            this.setBoxNumber(this.currentBoxID, this.touchedKeyID);
                        }
                    }
                    else if (this.numbs[this.currentBoxID] == this.touchedKeyID) {
                        this.setBoxNumber(this.currentBoxID, 0);
                        this.notes[this.currentBoxID] ^= (1 << this.touchedKeyID);
                        this.boxes[this.currentBoxID].setNote(this.notes[this.currentBoxID]);
                    }
                    else {
                        this.setBoxNumber(this.currentBoxID, this.touchedKeyID);
                    }
                }
            }
        }
        this.touchedBoxID = -1;
        this.touchedKeyID = -1;
    };
    Game.prototype.setBoxNumber = function (boxID, numb) {
        // マスに設定
        this.numbs[boxID] = numb;
        this.boxes[boxID].setText(numb > 0 ? numb.toFixed() : "");
        // 判定（配置上のチェック）
        var box = this.boxes[boxID];
        var ix = boxID % BoxCount;
        var iy = Math.floor(boxID / BoxCount);
        this.setRelateTextColor(ix, iy, numb);
        if (this.checkNumber(ix, iy, numb)) {
            box.setTextColor(NumberColor);
            this.effectRightNumber(box.X, box.Y);
        }
        else {
            box.setTextColor(WrongNumberColor);
        }
        this.updateBoxOutline3x3(ix, iy);
        if (this.checkClear()) {
            new GameOver();
        }
    };
    Game.prototype.updateBoxOutline3x3 = function (ix, iy) {
        var lineRgb = this.checkNumber3x3(ix, iy) ? 0x000000 : BoxLineColor;
        var headX = Math.floor(ix / 3) * 3;
        var headY = Math.floor(iy / 3) * 3;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var x = headX + i;
                var y = headY + j;
                this.boxes[x + y * BoxCount].setOutline(lineRgb);
            }
        }
    };
    Game.prototype.checkNumber3x3 = function (ix, iy) {
        var headX = Math.floor(ix / 3) * 3;
        var headY = Math.floor(iy / 3) * 3;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var x = headX + i;
                var y = headY + j;
                if (this.checkNumber(x, y, this.numbs[x + y * BoxCount]) == false) {
                    return false; // 3x3 wrong
                }
            }
        }
        return true; // 3x3 correct
    };
    Game.prototype.effectChooseBox = function (px, py) {
        new EffectSquare(Util.w(randF(0.2, 0.8)), py, Util.w(1.4), Util.h(BoxHph), EffectColor, 0.5, 1 / 3, 1 / 9);
        new EffectSquare(px, Util.h(randF(0.35 - 0.2, 0.35 + 0.2)), Util.w(BoxWpw), Util.h(1.4), EffectColor, 0.5, 1 / 6, 1 / 2);
    };
    Game.prototype.effectRightNumber = function (px, py) {
        for (var i = 0; i < 0; i++) {
            var s = Util.w(BoxWpw) * randF(0.25, 1.5);
            var v = 20;
            var vx = randF(-v, +v);
            var vy = randF(-v, +v);
            new EffectFrame(px + vx * 5, py + vy * 5, s, s, EffectColor, 0.5, 1 / 2, 1 / 6, vx, vy).delta *= randF(0.5, 1);
            new EffectFrame(px + vy * 5, py + vx * 5, s, s, EffectColor, 0.5, 1 / 6, 1 / 2, vx, vy).delta *= randF(0.5, 1);
        }
        new EffectFrame(Util.w(0.50), py, Util.w(1.5), Util.h(BoxHph * 0.5), EffectColor, 0.5, 1 / 3, 1 / 9);
        new EffectFrame(px, Util.h(0.35), Util.w(BoxWpw * 0.5), Util.h(1.5), EffectColor, 0.5, 1 / 6, 1 / 2);
        // chainer
        new EffectChainer(0, px, py, +Util.w(BoxWpw), 0, 5);
        new EffectChainer(0, px, py, -Util.w(BoxWpw), 0, 5);
        new EffectChainer(0, px, py, 0, +Util.h(BoxHph), 5);
        new EffectChainer(0, px, py, 0, -Util.h(BoxHph), 5);
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
    Game.prototype.setRelateTextColor = function (ix, iy, numb) {
        //let numb = this.numbs[ ix + iy * BoxCount ];
        // 同じ数値を強調
        for (var i = 0; i < BoxCount; i++) {
            for (var j = 0; j < BoxCount; j++) {
                var index_1 = i + j * BoxCount;
                if (this.numbs[index_1] == numb) {
                    this.boxes[index_1].setTextColor(EqualNumberColor);
                }
                else {
                    var color = this.initialNumbs[index_1] == 0 ? NumberColor : FixedNumberColor;
                    this.boxes[index_1].setTextColor(color);
                }
            }
        }
        var index = ix + iy * BoxCount;
        if (this.initialNumbs[index] == 0)
            this.boxes[ix + iy * BoxCount].setTextColor(this.checkNumber(ix, iy, numb) ? RightNumberColor : WrongNumberColor);
    };
    // 判定（現在配置されている数字でダブリがないかチェック　正解かどうかではない）
    Game.prototype.checkNumber = function (ix, iy, numb) {
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
        //let numb = this.numbs[ ix + iy * BoxCount ];
        // 横ライン
        for (var i = 0; i < BoxCount; i++)
            if (i != ix && this.numbs[i + iy * BoxCount] == numb)
                return false;
        // 縦ライン
        for (var j = 0; j < BoxCount; j++)
            if (j != iy && this.numbs[ix + j * BoxCount] == numb)
                return false;
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
                    if (this.checkNumber(i, j, this.numbs[index]) == false) {
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