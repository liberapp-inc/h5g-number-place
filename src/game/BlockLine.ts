// Liberapp 2020 - Tahiti Katagai
// ９ｘ９マス全体の３ｘ３マス区分けライン

class BlockLine extends GameObject{

    constructor() {
        super();

        let shape = new egret.Shape();
        this.display = shape;
        GameObject.baseDisplay.addChild(shape);

        shape.graphics.lineStyle( 2, 0x000000 );

        let ix;
        let iy;
        let w = Util.w( BoxWpw ) * 3;
        let h = Util.h( BoxHph ) * 3;
        let x;
        let y;

        this.setRectLine( shape, 1, 1 );
        this.setRectLine( shape, 4, 1 );
        this.setRectLine( shape, 7, 1 );
        this.setRectLine( shape, 1, 4 );
        this.setRectLine( shape, 4, 4 );
        this.setRectLine( shape, 7, 4 );
        this.setRectLine( shape, 1, 7 );
        this.setRectLine( shape, 4, 7 );
        this.setRectLine( shape, 7, 7 );
    }
    setRectLine( shape:egret.Shape, ix:number, iy:number ){
        let x = Util.w( 0.50 + (ix-4) * BoxWpw );
        let y = Util.h( 0.35 + (iy-4) * BoxHph );
        let w = Util.w( BoxWpw ) * 3;
        let h = Util.h( BoxHph ) * 3;
        shape.graphics.drawRect( x-0.5*w, y-0.5*h, w, h );
    }

    onDestroy(){
    }

    update(){}
}

