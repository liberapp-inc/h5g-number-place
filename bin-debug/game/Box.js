// Liberapp 2020 - Tahiti Katagai
// 9x9のマス１つ
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
var Box = (function (_super) {
    __extends(Box, _super);
    function Box(text, xRatio, yRatio, wRatio, hRatio, bold, onTap, thisObject, id) {
        if (id === void 0) { id = 0; }
        var _this = _super.call(this) || this;
        _this.text = null;
        _this.onTap = null;
        _this.thisObject = null;
        _this.keyId = 0;
        _this.press = false;
        _this.touch = false;
        _this.x = 0;
        _this.y = 0;
        _this.lineRgb = 0; //BoxLineColor;
        _this.rgb = ColorCellNone; // BoxColor;
        _this.alpha = 1;
        _this.xr = xRatio;
        _this.yr = yRatio;
        _this.wr = wRatio;
        _this.hr = hRatio;
        _this.fontSize = 36;
        _this.fontRgb = ColorFontNone;
        _this.setDisplay(_this.lineRgb, _this.rgb, _this.alpha, xRatio, yRatio, wRatio, hRatio);
        if (text != null) {
            _this.text = Util.newTextField(text, _this.fontSize, _this.fontRgb, _this.xr, _this.yr, bold, false);
            GameObject.baseDisplay.addChild(_this.text);
        }
        _this.onTap = onTap;
        _this.thisObject = thisObject;
        _this.keyId = id;
        if (_this.onTap)
            _this.display.addEventListener(egret.TouchEvent.TOUCH_TAP, function (btn) { return _this.onTap(_this); }, _this.thisObject);
        _this.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touchBegin, _this);
        _this.display.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.touchMove, _this);
        _this.display.addEventListener(egret.TouchEvent.TOUCH_END, _this.touchEnd, _this);
        return _this;
    }
    Box.prototype.onDestroy = function () {
        var _this = this;
        if (this.onTap)
            this.display.removeEventListener(egret.TouchEvent.TOUCH_TAP, function (btn) { return _this.onTap(_this); }, this.thisObject);
        GameObject.baseDisplay.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        GameObject.baseDisplay.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        GameObject.baseDisplay.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        if (this.text)
            GameObject.baseDisplay.removeChild(this.text);
    };
    Box.prototype.setDisplay = function (lineRgb, rgb, alpha, xr, yr, wr, hr) {
        var shape = this.display;
        if (shape == null) {
            this.display = shape = new egret.Shape();
            GameObject.gameDisplay.addChild(shape);
        }
        else {
            shape.graphics.clear();
        }
        // if( lineRgb>=0 )    shape.graphics.lineStyle( 1, lineRgb );
        // else                shape.graphics.lineStyle( 0 );
        shape.graphics.beginFill(rgb, alpha);
        var w = wr * Util.width;
        var h = hr * Util.height;
        shape.graphics.drawRect(-0.5 * w, -0.5 * h, w, h);
        shape.graphics.endFill();
        shape.touchEnabled = true;
        shape.x = xr * Util.width;
        shape.y = yr * Util.height;
        this.display = shape;
    };
    Box.prototype.setColor = function (rgb) {
        this.rgb = rgb;
        this.setDisplay(this.lineRgb, this.rgb, this.alpha, this.xr, this.yr, this.wr, this.hr);
    };
    Box.prototype.setText = function (text) {
        var tf = this.text;
        this.text.text = text;
        this.text.size = this.fontSize;
        tf.x = Util.width * this.xr - tf.width * 0.5;
        tf.y = Util.height * this.yr - tf.height * 0.5;
    };
    Box.prototype.setTextColor = function (color) {
        if (this.text) {
            this.text.textColor = color;
        }
    };
    Box.prototype.setNote = function (bit) {
        var text = ""; // "123\n456\n789"  スペース２つで１文字幅
        text += ((bit & (1 << 1)) != 0) ? "1" : "  ";
        text += ((bit & (1 << 2)) != 0) ? "2" : "  ";
        text += ((bit & (1 << 3)) != 0) ? "3" : "  ";
        text += "\n";
        text += ((bit & (1 << 4)) != 0) ? "4" : "  ";
        text += ((bit & (1 << 5)) != 0) ? "5" : "  ";
        text += ((bit & (1 << 6)) != 0) ? "6" : "  ";
        text += "\n";
        text += ((bit & (1 << 7)) != 0) ? "7" : "  ";
        text += ((bit & (1 << 8)) != 0) ? "8" : "  ";
        text += ((bit & (1 << 9)) != 0) ? "9" : "  ";
        var tf = this.text;
        this.text.text = text;
        this.text.size = this.fontSize * 0.5;
        tf.x = Util.width * this.xr - tf.width * 0.5;
        tf.y = Util.height * this.yr - tf.height * 0.5;
    };
    Box.prototype.setOutline = function (lineRgb) {
        this.lineRgb = lineRgb;
        this.setDisplay(this.lineRgb, this.rgb, this.alpha, this.xr, this.yr, this.wr, this.hr);
    };
    Box.prototype.update = function () {
        var scale = this.touch ? 0.95 : 1.0;
        this.display.scaleX = this.display.scaleY = (this.display.scaleX + (scale - this.display.scaleX) * 0.25);
        this.press = false;
    };
    // touch
    Box.prototype.touchBegin = function (e) {
        this.x = e.stageX;
        this.y = e.stageY;
        this.press = true;
        this.touch = true;
    };
    Box.prototype.touchMove = function (e) {
        this.x = e.stageX;
        this.y = e.stageY;
        this.touch = true;
    };
    Box.prototype.touchEnd = function (e) {
        this.touch = false;
    };
    return Box;
}(GameObject));
__reflect(Box.prototype, "Box");
//# sourceMappingURL=Box.js.map