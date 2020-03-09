// Liberapp 2020 - Tahiti Katagai
// 入力フィールド
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
var InputField = (function (_super) {
    __extends(InputField, _super);
    function InputField(maxChars, fontsize, fontRGB, xRatio, yRatio, wRatio, hRatio, rgb, alpha, onChange) {
        var _this = _super.call(this) || this;
        _this.text = null;
        _this.onChange = null;
        var shape = new egret.Shape();
        GameObject.baseDisplay.addChild(shape);
        shape.graphics.beginFill(rgb, alpha);
        var w = wRatio * Util.width;
        var h = hRatio * Util.height;
        shape.graphics.drawRoundRect(-0.5 * w, -0.5 * h, w, h, h * 0.4);
        shape.graphics.endFill();
        shape.touchEnabled = true;
        shape.x = xRatio * Util.width;
        shape.y = yRatio * Util.height;
        _this.display = shape;
        _this.text = new egret.TextField;
        _this.text.type = egret.TextFieldType.INPUT;
        _this.text.maxChars = maxChars;
        _this.text.size = fontsize;
        _this.text.textColor = fontRGB;
        _this.text.width = w;
        _this.text.height = h;
        _this.text.x = Util.width * xRatio - _this.text.width * 0.5 + fontsize * 0.5;
        _this.text.y = Util.height * yRatio - fontsize * 0.5;
        GameObject.baseDisplay.addChild(_this.text);
        _this.onChange = onChange;
        if (_this.onChange)
            _this.text.addEventListener(egret.Event.CHANGE, function () { return _this.onChange(_this.text.text); }, _this);
        return _this;
    }
    InputField.prototype.onDestroy = function () {
        GameObject.baseDisplay.removeChild(this.text);
    };
    InputField.prototype.update = function () {
    };
    return InputField;
}(GameObject));
__reflect(InputField.prototype, "InputField");
//# sourceMappingURL=InputField.js.map