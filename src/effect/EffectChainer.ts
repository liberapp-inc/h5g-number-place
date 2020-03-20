// Liberapp 2020 - Tahiti Katagai
// エフェクト連鎖生成クラス

class EffectChainer extends GameObject{

    type:number;
    x:number;
    y:number;
    vx:number;
    vy:number;
    count:number;
    inter:number;
    ticks:number = 0;

    constructor( type:number, x:number, y:number, vx:number, vy:number, count:number ) {
        super();

        this.type = type;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.count = count;

        switch( type ){
            case 0:
            this.inter = 3;
        }
    }

    update() {

        this.ticks++;

        if( this.ticks % this.inter == 0 ){
            switch( this.type ){
                case 0: this.create0(); break;
            }

            if( --this.count <= 0 ){
                this.destroy();
            }
        }
    }

    // 連続四角ライン
    create0(){
        this.x += this.vx;
        this.y += this.vy;

        let s = Util.w(BoxWpw)*randF(0.25,1.0);
        let v = 5;
        let vx = randF(-v, +v);
        let vy = randF(-v, +v);
        new EffectFrame( this.x+vx*5, this.y+vy*5, s, s, EffectColor, 0.5, 1/2, 1/6, vx, vy).delta *= randF(0.5,1);
    }
}
