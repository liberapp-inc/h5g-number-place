// Liberapp 2020 - Tahiti Katagai
// 汎用ボタン
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
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(text, fontsize, fontRGB, xRatio, yRatio, wRatio, hRatio, rgb, alpha, line, onTap, obj, id) {
        if (id === void 0) { id = 0; }
        var _this = _super.call(this) || this;
        _this.text = null;
        _this.onTap = null;
        _this.obj = null;
        _this.keyId = 0;
        _this.press = false;
        _this.touch = false;
        _this.x = 0;
        _this.y = 0;
        var shape = new egret.Shape();
        GameObject.baseDisplay.addChild(shape);
        if (line)
            shape.graphics.lineStyle(2, fontRGB);
        else
            shape.graphics.lineStyle(0);
        shape.graphics.beginFill(rgb, alpha);
        var w = wRatio * Util.width;
        var h = hRatio * Util.height;
        shape.graphics.drawRoundRect(-0.5 * w, -0.5 * h, w, h, h * 0.4);
        shape.graphics.endFill();
        shape.touchEnabled = true;
        shape.x = xRatio * Util.width;
        shape.y = yRatio * Util.height;
        _this.display = shape;
        if (text) {
            _this.text = Util.newTextField(text, fontsize, fontRGB, xRatio, yRatio, true, false);
            GameObject.baseDisplay.addChild(_this.text);
        }
        _this.onTap = onTap;
        _this.obj = (obj != null) ? obj : _this; // obj指定があればthis=objとしてコール、なければ(Button)thisからコール
        _this.keyId = id;
        if (_this.onTap)
            _this.display.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this.obj); // callback先のthisはobj
        _this.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touchBegin, _this);
        _this.display.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.touchMove, _this);
        _this.display.addEventListener(egret.TouchEvent.TOUCH_END, _this.touchEnd, _this);
        return _this;
    }
    Button.prototype.onDestroy = function () {
        if (this.onTap)
            this.display.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this.obj);
        GameObject.baseDisplay.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        GameObject.baseDisplay.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        GameObject.baseDisplay.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        if (this.text)
            GameObject.baseDisplay.removeChild(this.text);
    };
    Button.prototype.update = function () {
        var scale = this.touch ? 1.1 : 1.0;
        this.display.scaleX = this.display.scaleY = (this.display.scaleX + (scale - this.display.scaleX) * 0.25);
        this.press = false;
    };
    // touch
    Button.prototype.touchBegin = function (e) {
        this.x = e.stageX;
        this.y = e.stageY;
        this.press = true;
        this.touch = true;
    };
    Button.prototype.touchMove = function (e) {
        this.x = e.stageX;
        this.y = e.stageY;
        this.touch = true;
    };
    Button.prototype.touchEnd = function (e) {
        this.touch = false;
    };
    return Button;
}(GameObject));
__reflect(Button.prototype, "Button");
//# sourceMappingURL=Button.js.map