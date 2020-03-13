// Liberapp 2020 - Tahiti Katagai
// プレイシーン
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
var ScenePlay = (function (_super) {
    __extends(ScenePlay, _super);
    function ScenePlay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScenePlay.loadScene = function () {
        new BlockLine();
        new Game();
        new Score();
    };
    ScenePlay.prototype.update = function () {
    };
    return ScenePlay;
}(GameObject));
__reflect(ScenePlay.prototype, "ScenePlay");
//# sourceMappingURL=ScenePlay.js.map