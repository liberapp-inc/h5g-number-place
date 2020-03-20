// Liberapp 2020 - Tahiti Katagai
// エフェクト　四角いライン

class EffectFrame extends GameObject{

    w:number = 0;
    h:number = 0;
    dw:number;
    dh:number;
    wr:number;
    hr:number;
    c:number;
    maxA:number;

    vx:number = 0;
    vy:number = 0;
    vr:number = 0.8;

    rate:number = 0;
    delta:number = (1/20);

    constructor( x:number, y:number, w:number, h:number, color:number, alpha:number, wr:number = 1/4, hr:number = 1/8, vx:number=0, vy:number=0 ) {
        super();

        this.dw = w;
        this.dh = h;
        this.wr = wr;
        this.hr = hr;
        this.c = color;
        this.maxA = alpha;
        this.vx = vx;
        this.vy = vy;
        this.vr *= randF( 0.8, 1.2 );
        this.delta *= randF( 0.8, 1.2 );
        this.setShape( x+vx, y+vy, this.w, this.h, color, this.maxA );
    }

    setShape( x:number, y:number, w:number, h:number, color:number, alpha:number ){
        let shape = this.display as egret.Shape;
        if( this.display == null ){
            this.display = shape = new egret.Shape();
            GameObject.gameDisplay.addChild(this.display);
        }else{
            shape.graphics.clear();
        }

        shape.x = x;
        shape.y = y;
        shape.graphics.lineStyle( 10, color, alpha );
        shape.graphics.drawRect( -0.5*w, -0.5*h, w, h );
    }

    update() {

        this.X += this.vx;
        this.Y += this.vy;
        this.vx *= this.vr;
        this.vy *= this.vr;

        this.rate += this.delta;
        if( this.rate < 0.7 ){
            this.w += (this.dw - this.w) * this.wr;
            this.h += (this.dh - this.h) * this.hr;
        }else{
            this.w += (0 - this.w) * this.hr;   // switch rate
            this.h += (0 - this.h) * this.wr;
        }
        //let a = (1-this.rate) * this.maxA;
        let a = this.maxA;
        this.setShape( this.X, this.Y, this.w, this.h, this.c, a );

        if( this.rate >= 1 ){
            this.destroy();
            return;
        }
    }
}
