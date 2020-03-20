// Liberapp 2020 - Tahiti Katagai
// 9x9のマス１つ

class Box extends GameObject{

    text:egret.TextField = null;

    onTap:(btn:Button)=>void = null;
    thisObject:any = null;
    keyId:number = 0;

    lineRgb:number;
    rgb:number;
    alpha:number;
    xr:number;
    yr:number;
    wr:number;
    hr:number;

    fontSize:number;
    fontRgb:number;

    press:boolean = false;
    touch:boolean = false;
    x:number = 0;
    y:number = 0;

    constructor( text:string, xRatio:number, yRatio:number, wRatio:number, hRatio:number, bold:boolean, onTap:(btn:Button)=>void, thisObject:any, id:number=0 ) {
        super();

        this.lineRgb = BoxLineColor;
        this.rgb = BoxColor;
        this.alpha = 1;
        this.xr = xRatio;
        this.yr = yRatio;
        this.wr = wRatio;
        this.hr = hRatio;

        this.fontSize = 36;
        this.fontRgb = NumberColor;

        this.setDisplay( this.lineRgb, this.rgb, this.alpha, xRatio, yRatio, wRatio, hRatio );

        if( text != null ){
            this.text = Util.newTextField(text, this.fontSize, this.fontRgb, this.xr, this.yr, bold, false);
            GameObject.baseDisplay.addChild( this.text );
        }
        this.onTap = onTap;
        this.thisObject = thisObject;
        this.keyId = id;
        if( this.onTap ) this.display.addEventListener(egret.TouchEvent.TOUCH_TAP, (btn:Button)=>this.onTap(this), this.thisObject);
        this.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.display.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this.display.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    }

    onDestroy(){
        if( this.onTap ) this.display.removeEventListener(egret.TouchEvent.TOUCH_TAP, (btn:Button)=>this.onTap(this), this.thisObject);
        GameObject.baseDisplay.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        GameObject.baseDisplay.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        GameObject.baseDisplay.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);

        if( this.text ) GameObject.baseDisplay.removeChild( this.text );
    }

    setDisplay( lineRgb:number, rgb:number, alpha:number, xr:number, yr:number, wr:number, hr:number ){
        let shape = this.display as egret.Shape;
        if( shape == null ){
            this.display = shape = new egret.Shape();
            GameObject.gameDisplay.addChild(shape);
        }else{
            shape.graphics.clear();
        }
        if( lineRgb>=0 )    shape.graphics.lineStyle( 1, lineRgb );
        else                shape.graphics.lineStyle( 0 );
        shape.graphics.beginFill( rgb, alpha );
        let w = wr * Util.width;
        let h = hr * Util.height;
        shape.graphics.drawRect( -0.5*w, -0.5*h, w, h );
        shape.graphics.endFill();
        shape.touchEnabled = true;
        shape.x = xr * Util.width;
        shape.y = yr * Util.height;
        this.display = shape;
    }

    setColor( rgb:number ){
        this.rgb = rgb;
        this.setDisplay( this.lineRgb, this.rgb, this.alpha, this.xr, this.yr, this.wr, this.hr );
    }

    setText( text:string ){
        let tf = this.text;
        this.text.text = text;
        this.text.size = this.fontSize;
        tf.x = Util.width  * this.xr - tf.width  * 0.5;
        tf.y = Util.height * this.yr - tf.height * 0.5;
    }
    setTextColor( color:number ){
        if( this.text ){
            this.text.textColor = color;
        }
    }
    setNote( bit:number ){
        let text = "";  // "123\n456\n789"  スペース２つで１文字幅

        text += ( (bit & (1<<1) ) != 0 ) ? "1" : "  ";
        text += ( (bit & (1<<2) ) != 0 ) ? "2" : "  ";
        text += ( (bit & (1<<3) ) != 0 ) ? "3" : "  ";
        text += "\n";
        text += ( (bit & (1<<4) ) != 0 ) ? "4" : "  ";
        text += ( (bit & (1<<5) ) != 0 ) ? "5" : "  ";
        text += ( (bit & (1<<6) ) != 0 ) ? "6" : "  ";
        text += "\n";
        text += ( (bit & (1<<7) ) != 0 ) ? "7" : "  ";
        text += ( (bit & (1<<8) ) != 0 ) ? "8" : "  ";
        text += ( (bit & (1<<9) ) != 0 ) ? "9" : "  ";

        let tf = this.text;
        this.text.text = text;
        this.text.size = this.fontSize * 0.5;
        tf.x = Util.width  * this.xr - tf.width  * 0.5;
        tf.y = Util.height * this.yr - tf.height * 0.5;
    }

    setOutline( lineRgb:number ){
        this.lineRgb = lineRgb;
        this.setDisplay( this.lineRgb, this.rgb, this.alpha, this.xr, this.yr, this.wr, this.hr );
    }

    update() {
        let scale = this.touch ? 0.95 : 1.0;
        this.display.scaleX = this.display.scaleY = ( this.display.scaleX + (scale - this.display.scaleX) * 0.25 );
        this.press = false;
    }

    // touch
    touchBegin(e:egret.TouchEvent) {
        this.x = e.stageX;
        this.y = e.stageY;
        this.press = true;
        this.touch = true;
    }
    touchMove(e:egret.TouchEvent) {
        this.x = e.stageX;
        this.y = e.stageY;
        this.touch = true;
    }
    touchEnd(e:egret.TouchEvent) {
        this.touch = false;
    }
}

