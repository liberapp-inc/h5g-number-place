// Liberapp 2020 - Tahiti Katagai
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// UnityのGameObject+MonoBehaviourライクなタスク管理クラス
//  update()に毎フレームの処理を書く
//  オブジェクトを破棄するときはdestroy()を呼ぶ
//  破棄のときに後処理が必要なら、onDestroy()に記述
//  生成時の初期化はUnityと違い、constructor()を使う（引数を渡せる）
//  シーンを切り替えたい場合は transitにシーンロード関数を設定（全オブジェクトを破棄してからtransitを実行）
var GameObject = (function () {
    function GameObject() {
        this.display = null;
        GameObject.objects.push(this);
    }
    Object.defineProperty(GameObject.prototype, "X", {
        get: function () { return this.display.x; },
        set: function (x) { this.display.x = x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "Y", {
        get: function () { return this.display.y; },
        set: function (y) { this.display.y = y; },
        enumerable: true,
        configurable: true
    });
    GameObject.prototype.destroy = function () { this.deleteFlag = true; };
    GameObject.prototype.onDestroy = function () { };
    GameObject.initial = function (displayObjectContainer) {
        GameObject.baseDisplay = displayObjectContainer;
        GameObject.gameDisplay = new egret.DisplayObjectContainer();
        GameObject.baseDisplay.addChild(GameObject.gameDisplay);
    };
    GameObject.process = function () {
        GameObject.objects.forEach(function (obj) { return obj.update(); });
        GameObject.objects = GameObject.objects.filter(function (obj) {
            if (obj.deleteFlag)
                obj._delete();
            return (!obj.deleteFlag);
        });
        if (GameObject.transit) {
            GameObject.dispose();
            GameObject.transit();
            GameObject.transit = null;
        }
    };
    GameObject.dispose = function () {
        GameObject.objects = GameObject.objects.filter(function (obj) { obj.destroy(); obj._delete(); return false; });
    };
    GameObject.prototype._delete = function () {
        this.onDestroy();
        if (this.display) {
            this.display.parent.removeChild(this.display);
            this.display = null;
        }
    };
    // system
    GameObject.objects = [];
    return GameObject;
}());
__reflect(GameObject.prototype, "GameObject");
//# sourceMappingURL=GameObject.js.map