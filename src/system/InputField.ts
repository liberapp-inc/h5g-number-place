// Liberapp 2020 - Tahiti Katagai
// 入力フィールド

class InputField extends GameObject{

    text:egret.TextField = null;
    onChange:(string)=>void = null;

    constructor( maxChars:number, fontsize:number, fontRGB:number, xRatio:number, yRatio:number, wRatio:number, hRatio:number, rgb:number, alpha:number, onChange:(string)=>void ) {
        super();

        let shape = new egret.Shape();
        GameObject.baseDisplay.addChild(shape);
        shape.graphics.beginFill( rgb, alpha );
        let w = wRatio * Util.width;
        let h = hRatio * Util.height;
        shape.graphics.drawRoundRect(-0.5*w, -0.5*h, w, h, h*0.4);
        shape.graphics.endFill();
        shape.touchEnabled = true;
        shape.x = xRatio * Util.width;
        shape.y = yRatio * Util.height;
        this.display = shape;

        this.text = new egret.TextField;
        this.text.type = egret.TextFieldType.INPUT;
        this.text.maxChars = maxChars;
        this.text.size = fontsize;
        this.text.textColor = fontRGB;
        this.text.width = w;
        this.text.height = h;
        this.text.x = Util.width  * xRatio - this.text.width * 0.5 + fontsize * 0.5;
        this.text.y = Util.height * yRatio - fontsize * 0.5;

        GameObject.baseDisplay.addChild( this.text );

        this.onChange = onChange;
        if( this.onChange ) this.text.addEventListener(egret.Event.CHANGE, ()=>this.onChange(this.text.text), this);
    }

    onDestroy(){
        GameObject.baseDisplay.removeChild( this.text );
    }

    update() {
    }
}

