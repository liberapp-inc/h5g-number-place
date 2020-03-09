// Liberapp 2020 - Tahiti Katagai
// ランダム XorShift
// シード指定で乱数周期を再現できる
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// global
function randInt() { return globalRandom.int(); } // 0 ~ max (整数)
function rand01() { return globalRandom.f01(); } // 0以上 1未満
function randF(min, max) { return globalRandom.f(min, max); } // min以上 max未満
function randI(min, max) { return globalRandom.i(min, max); } // min以上 max未満（整数）
function randBool(rate) {
    if (rate === void 0) { rate = 0.5; }
    return globalRandom.bool(rate);
}
var Random = (function () {
    function Random(seed) {
        if (seed === void 0) { seed = Math.floor(Math.random() * Random.max); }
        // XOR Shift
        this.x = 123456789;
        this.y = 362436069;
        this.z = 521288629;
        this.w = seed;
    }
    Random.prototype.int = function () { return (this.next() & Random.max); }; // 0 ~ max (整数)
    Random.prototype.f01 = function () { return this.int() / (Random.max + 1); }; // 0以上 1未満
    Random.prototype.f = function (min, max) { return min + this.f01() * (max - min); }; // min以上 max未満
    Random.prototype.i = function (min, max) { return Math.floor(this.f(min, max)); }; // min以上 max未満（整数）
    Random.prototype.bool = function (rate) {
        if (rate === void 0) { rate = 0.5; }
        return (this.f01() < rate);
    };
    Random.prototype.next = function () {
        var t;
        t = this.x ^ (this.x << 11);
        this.x = this.y;
        this.y = this.z;
        this.z = this.w;
        return this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8));
    };
    Random.max = 0x3fffffff;
    return Random;
}());
__reflect(Random.prototype, "Random");
var globalRandom = new Random(); // singleton instance
//# sourceMappingURL=Random.js.map