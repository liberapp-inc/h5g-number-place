// Liberapp 2020 - Tahiti Katagai
// ９ｘ９マス全体の３ｘ３マス区分けライン
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
var BlockLine = (function (_super) {
    __extends(BlockLine, _super);
    function BlockLine() {
        var _this = _super.call(this) || this;
        var shape = new egret.Shape();
        _this.display = shape;
        GameObject.baseDisplay.addChild(shape);
        shape.graphics.lineStyle(5, 0x505050);
        var ix;
        var iy;
        var w = Util.w(BoxWpw) * 3;
        var h = Util.h(BoxHph) * 3;
        var x;
        var y;
        _this.setRectLine(shape, 1, 1);
        _this.setRectLine(shape, 4, 1);
        _this.setRectLine(shape, 7, 1);
        _this.setRectLine(shape, 1, 4);
        _this.setRectLine(shape, 4, 4);
        _this.setRectLine(shape, 7, 4);
        _this.setRectLine(shape, 1, 7);
        _this.setRectLine(shape, 4, 7);
        _this.setRectLine(shape, 7, 7);
        return _this;
    }
    BlockLine.prototype.setRectLine = function (shape, ix, iy) {
        var x = Util.w(0.50 + (ix - 4) * BoxWpw);
        var y = Util.h(0.35 + (iy - 4) * BoxHph);
        var w = Util.w(BoxWpw) * 3;
        var h = Util.h(BoxHph) * 3;
        shape.graphics.drawRect(x - 0.5 * w, y - 0.5 * h, w, h);
    };
    BlockLine.prototype.onDestroy = function () {
    };
    BlockLine.prototype.update = function () { };
    return BlockLine;
}(GameObject));
__reflect(BlockLine.prototype, "BlockLine");
//# sourceMappingURL=BlockLine.js.map