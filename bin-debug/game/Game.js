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
var SaveKeyClearTime = "HyperSudokuClearTime"; // +問題番号Keyにクリア時間を記録
var BackColor = 0xffffff; // index.htmlで設定
var FontColor = 0x90A0C0; //0x00e8e8;
// 未入力
var ColorCellNone = 0xCFDCE5;
var ColorFontNone = 0x5C9399;
// 問題 固定数値
var ColorCellFixed = 0xA3BBCC;
var ColorFontFixed = ColorFontNone;
// 入力済み 
var ColorCellEnter = ColorCellNone;
var ColorFontEnter = 0x203868;
// 選択
var ColorCellPick = 0xFFFF00;
var ColorFontPick = 0x203868;
var ColorCellPickEnter = ColorCellNone;
var ColorFontPickEnter = 0x203868;
var ColorCellPickFixed = 0xA3BBCC;
var ColorFontPickFixed = ColorFontNone;
// 選択と同じ数
var ColorCellEqual = ColorCellNone; //0x203868; おそらく指示間違い
var ColorFontEqual = ColorCellPick;
var ColorCellEqualFixed = 0xA3BBCC;
var ColorFontEqualFixed = ColorCellPick;
// ガイド　未入力　入力済み
var ColorCellGuide = 0xE2E1CF;
var ColorFontGuide = ColorFontEnter;
var ColorFontGuideFixed = 0x5CB399;
var KeyColor = FontColor; //0xff50ff;
var KeyLineColor = FontColor; //0x803080;
var KeyFontColor = BackColor; //0x200020;
var EffectColor = 0x5CB399; //0x00ffe0;
var BoxCount = 9;
var BoxSizeInW = 10;
var BoxSizeInH = 15;
var BoxWpw = 1 / BoxSizeInW;
var BoxHph = 1 / BoxSizeInH;
var KeyInW = 8;
var KeyInH = 12;
var KeyWpw = 1 / KeyInW;
var KeyHph = 1 / KeyInH;
var BoxCenterXpw = 0.50;
var BoxCenterYph = 0.40;
var KeyCenterXpw = 0.50;
var KeyCenterYph = 0.85;
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this.texts = [];
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
        _this.count = 0;
        Game.I = _this;
        _this.texts[0] = Util.newTextField("問題" + (Game.initialGame + 1), Util.width / 20, FontColor, 0.5, 0.05, true, true);
        _this.texts.forEach(function (text) { if (text) {
            GameObject.baseDisplay.addChild(text);
        } });
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
                var xr = BoxCenterXpw + (ix - 4) * BoxWpw;
                var yr = BoxCenterYph + (iy - 4) * BoxHph;
                var fixed = num != 0;
                _this.boxes[i] = new Box(numText, xr, yr, BoxWpw * 0.95, BoxHph * 0.95, true, function (btn) { return _this.onBox(btn); }, _this, i);
                if (fixed == false) {
                    _this.boxes[i].setColor(ColorCellNone);
                    _this.boxes[i].setTextColor(ColorFontNone);
                }
                else {
                    _this.boxes[i].setColor(ColorCellFixed);
                    _this.boxes[i].setTextColor(ColorFontFixed);
                }
            }
        }
        // 数値キー １〜９
        for (var ix = 0; ix < 3; ix++) {
            for (var iy = 0; iy < 3; iy++) {
                var i = 1 + ix + iy * 3;
                var numText = i.toFixed();
                var xr = KeyCenterXpw + (ix - 1) * KeyWpw;
                var yr = KeyCenterYph + (iy - 1) * KeyHph;
                _this.keys[i] = new Button(numText, 42, KeyFontColor, xr, yr, KeyWpw * 0.9, KeyHph * 0.9, KeyColor, 1, KeyLineColor, true, function (btn) { return _this.onKey(btn); }, _this, i);
            }
        }
        // 削除キー
        _this.delKey = new Button("×", 42, KeyFontColor, 0.8, KeyCenterYph - KeyHph, KeyWpw * 0.9, KeyHph * 0.9, KeyColor, 1, KeyLineColor, true, function (btn) { return _this.onDelKey(btn); }, _this);
        // Backキー
        _this.delKey = new Button("<", 30, KeyFontColor, 0.05, 0.04, KeyWpw * 0.7, KeyHph * 0.7, KeyColor, 1, KeyLineColor, true, function (btn) { return _this.onBackKey(btn); }, _this);
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
    Game.prototype.onBackKey = function (btn) {
        GameObject.transit = SceneSelect.loadScene;
    };
    Game.prototype.onDestroy = function () {
        Game.I = null;
        this.texts.forEach(function (text) { if (text) {
            text.parent.removeChild(text);
        } });
        this.texts = null;
    };
    Game.prototype.update = function () {
        if (GameOver.I != null)
            return;
        // マス選択　カラー変更
        if (this.touchedBoxID >= 0 && this.touchedBoxID != this.currentBoxID) {
            if (this.currentBoxID >= 0) {
                if (this.initialNumbs[this.currentBoxID] == 0) {
                    this.boxes[this.currentBoxID].setColor(ColorCellPick);
                    this.boxes[this.currentBoxID].setTextColor(ColorFontPick);
                }
                else {
                    this.boxes[this.currentBoxID].setColor(ColorCellPickFixed);
                    this.boxes[this.currentBoxID].setTextColor(ColorFontPickFixed);
                }
            }
            this.currentBoxID = this.touchedBoxID;
            // 対象エリアカラー
            var ix = this.currentBoxID % BoxCount;
            var iy = Math.floor(this.currentBoxID / BoxCount);
            this.setGuideBoxColor(ix, iy);
            this.setEqualTextColor(ix, iy, this.numbs[this.currentBoxID]);
            // 対象BOXカラー
            this.count = 0;
            var box = this.boxes[this.currentBoxID];
            box.setColor(ColorCellPick);
            box.setTextColor(ColorFontPick);
            this.effectChooseBox(box.X, box.Y);
        }
        // カーソル点滅
        if (this.currentBoxID >= 0) {
            this.count++;
            var box = this.boxes[this.currentBoxID];
            if ((this.count & 0x10) == 0) {
                box.setColor(ColorCellPick);
            }
            else {
                if (this.initialNumbs[this.currentBoxID] == 0)
                    box.setColor(ColorCellNone);
                else
                    box.setColor(ColorCellFixed);
            }
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
                                this.setGuideBoxColor(ix, iy);
                                this.setEqualTextColor(ix, iy, this.touchedKeyID);
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
        this.setGuideBoxColor(ix, iy);
        this.setEqualTextColor(ix, iy, numb);
        if (this.checkNumber(ix, iy, numb)) {
            box.setTextColor(ColorFontEnter); // NumberColor );
            this.effectRightNumber(box.X, box.Y);
        }
        else {
            box.setTextColor(ColorFontEnter); //ColorFontEnterWrong );
        }
        this.updateBoxOutline3x3(ix, iy);
        if (this.checkClear()) {
            new GameOver();
            if (Util.getSaveDataNumber(SaveKeyClearTime + Game.initialGame, 999) > Score.I.point)
                Util.setSaveDataNumber(SaveKeyClearTime + Game.initialGame, Score.I.point);
        }
    };
    Game.prototype.updateBoxOutline3x3 = function (ix, iy) {
        // let lineRgb = this.checkNumber3x3( ix, iy ) ? 0x000000 : BoxLineColor;
        // let headX = Math.floor(ix/3) * 3;
        // let headY = Math.floor(iy/3) * 3;
        // for( let i=0 ; i<3 ; i++ ){
        //     for( let j=0 ; j<3 ; j++ ){
        //         let x = headX + i;
        //         let y = headY + j;
        //         this.boxes[ x + y*BoxCount ].setOutline( lineRgb );
        //     }
        // }
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
        new EffectSquare(px, Util.h(BoxCenterXpw + randF(-0.2, +0.2)), Util.w(BoxWpw), Util.h(1.4), EffectColor, 0.5, 1 / 6, 1 / 2);
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
        new EffectFrame(px, Util.h(BoxCenterXpw), Util.w(BoxWpw * 0.5), Util.h(1.5), EffectColor, 0.5, 1 / 6, 1 / 2);
        // chainer
        new EffectChainer(0, px, py, +Util.w(BoxWpw), 0, 5);
        new EffectChainer(0, px, py, -Util.w(BoxWpw), 0, 5);
        new EffectChainer(0, px, py, 0, +Util.h(BoxHph), 5);
        new EffectChainer(0, px, py, 0, -Util.h(BoxHph), 5);
    };
    Game.prototype.setGuideBoxColor = function (ix, iy) {
        var headX = Math.floor(ix / 3) * 3;
        var headY = Math.floor(iy / 3) * 3;
        for (var i = 0; i < BoxCount; i++) {
            for (var j = 0; j < BoxCount; j++) {
                var index = i + j * BoxCount;
                var box = this.boxes[index];
                // 対象のマスを水色に
                var inBox3x3 = i >= headX && i <= headX + 2 && j >= headY && j <= headY + 2;
                if (inBox3x3 || i == ix || j == iy) {
                    if (this.initialNumbs[index] > 0) {
                        box.setColor(ColorCellGuide);
                        box.setTextColor(ColorFontGuideFixed);
                    }
                    else {
                        box.setColor(ColorCellGuide);
                        box.setTextColor(ColorFontGuide);
                    }
                }
                else {
                    // const fixed = this.initialNumbs[index]==0 ? ColorCellNone : ColorCellFixed; // BoxColor : FixedBoxColor;
                    if (this.initialNumbs[index] > 0) {
                        box.setColor(ColorCellFixed);
                        box.setTextColor(ColorFontFixed);
                    }
                    else {
                        var numb = this.numbs[index];
                        if (numb == 0) {
                            box.setColor(ColorCellNone);
                            box.setTextColor(ColorFontNone);
                        }
                        else {
                            box.setColor(ColorCellEnter);
                            box.setTextColor(ColorFontEnter);
                        }
                    }
                }
            }
        }
    };
    Game.prototype.setEqualTextColor = function (ix, iy, numb) {
        //let numb = this.numbs[ ix + iy * BoxCount ];
        // 同じ数値を強調
        for (var i = 0; i < BoxCount; i++) {
            for (var j = 0; j < BoxCount; j++) {
                var index_1 = i + j * BoxCount;
                if (this.numbs[index_1] == numb) {
                    this.boxes[index_1].setTextColor(ColorFontEqual); //EqualNumberColor );
                    // }else{
                    // const color = this.initialNumbs[ index ] == 0 ? ColorFontNone : ColorFontFixed; ////NumberColor : FixedNumberColor;
                    // this.boxes[ index ].setTextColor( color );
                }
            }
        }
        var index = ix + iy * BoxCount;
        if (this.initialNumbs[index] == 0)
            // this.boxes[ ix + iy * BoxCount ].setTextColor( this.checkNumber(ix, iy, numb) ?  RightNumberColor : WrongNumberColor );
            this.boxes[index].setTextColor(ColorFontEnter);
    };
    // 判定（現在配置されている数字でダブリがないかチェック　正解かどうかではない）
    Game.prototype.checkNumber = function (ix, iy, numb) {
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