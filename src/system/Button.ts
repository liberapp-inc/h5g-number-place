// Liberapp 2020 - Tahiti Katagai
// 汎用ボタン

class Button extends GameObject{

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

    constructor( text:string, fontsize:number, fontRgb:number, xRatio:number, yRatio:number, wRatio:number, hRatio:number, rgb:number, alpha:number, lineRgb:number, onTap:(btn:Button)=>void, thisObject:any, id:number=0 ) {
        super();

        this.lineRgb = lineRgb;
        this.rgb = rgb;
        this.alpha = alpha;
        this.xr = xRatio;
        this.yr = yRatio;
        this.wr = wRatio;
        this.hr = hRatio;

        this.fontSize = fontsize;
        this.fontRgb = fontRgb;

        this.setDisplay( lineRgb, rgb, alpha, xRatio, yRatio, wRatio, hRatio );

        if( text ){
            this.setText( text );
        }
        this.onTap = onTap;
        this.thisObject = thisObject;
        this.keyId = id;
        todo display に addlistenerしているので差し替え不可　clear()使うべし
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
        if( this.display ){
            this.display.parent.removeChild( this.display );
        }
        let shape = new egret.Shape();
        GameObject.baseDisplay.addChild(shape);
        if( lineRgb>=0 )    shape.graphics.lineStyle( 2, lineRgb );
        else                shape.graphics.lineStyle( 0 );
        shape.graphics.beginFill( rgb, alpha );
        let w = wr * Util.width;
        let h = hr * Util.height;
        shape.graphics.drawRoundRect(-0.5*w, -0.5*h, w, h, h*0.4);
        shape.graphics.endFill();
        shape.touchEnabled = true;
        shape.x = xr * Util.width;
        shape.y = yr * Util.height;
        this.display = shape;
    }
    setColor( rgb:number ){
        this.setDisplay( this.lineRgb, rgb, this.alpha, this.xr, this.yr, this.wr, this.hr );
    }

    setText( text:string ){
        if( this.text ) this.text.parent.removeChild( this.text );
        this.text = Util.newTextField(text, this.fontSize, this.fontRgb, this.xr, this.yr, true, false);
        GameObject.baseDisplay.addChild( this.text );
    }

    update() {
        let scale = this.touch ? 1.1 : 1.0;
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

