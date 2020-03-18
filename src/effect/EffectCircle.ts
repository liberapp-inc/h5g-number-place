// Liberapp 2020 - Tahiti Katagai
// エフェクト　丸い円の波動

class EffectCircle extends GameObject{

    radius:number;
    color:number;

    static readonly maxFrame:number = 30;
    frame:number = EffectCircle.maxFrame;

    constructor( x:number, y:number, radius:number, color:number=0xffc000 ) {
        super();

        this.radius = radius;
        this.color = color;
        this.setShape(x, y, this.radius);
    }

    setShape(x:number, y:number, radius:number){
        let shape = this.display as egret.Shape;
        if( this.display == null ){
            this.display = shape = new egret.Shape();
            GameObject.gameDisplay.addChild(this.display);
        }else{
            shape.graphics.clear();
        }
        shape.x = x;
        shape.y = y;
        shape.graphics.lineStyle(3 + 10*(this.frame/EffectCircle.maxFrame), this.color);
        shape.graphics.drawCircle(0, 0, radius);
    }

    update() {
        if( (--this.frame) <= 0 ){
            this.destroy();
            return;
        }

        this.radius *= 1.03;
        this.setShape( this.display.x, this.display.y, this.radius );
    }
}
