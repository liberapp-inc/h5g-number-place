// Liberapp 2020 - Tahiti Katagai
// ゲームで便利に使えるUtilityクラス

class Util{

    public static width:  number;
    public static height: number;

    public static w( rate:number ){ return rate * Util.width;  }
    public static h( rate:number ){ return rate * Util.height; }

    static initial( eui:eui.UILayer ) {
        this.width  = eui.stage.stageWidth;
        this.height = eui.stage.stageHeight;
    }

    static break( condition:boolean, message:string ){
        if( condition ){
            console.log( message ); // breakpoint
        }
    }

    static clamp(value:number, min:number, max:number):number {
        if( value < min ) value = min;
        if( value > max ) value = max;
        return value;
    }

    static clamp01(value:number){
        return Util.clamp(value,0,1);
    }

    static lerp( src:number, dst:number, rate01:number ){
        return src + (dst-src) * rate01;
    }

    // 角度を-PI~+PI範囲で表現
    static deltaAngle( radian:number ):number {
        let d = (radian + Math.PI) / (Math.PI*2);
        d = (d * 0x10000) & 0xffff;
        d = d / 0x10000 * Math.PI*2 - Math.PI;
        return d;
    }

    static color( r:number, g:number, b:number):number {
        return ( Math.floor(r * 0xff)*0x010000 + Math.floor(g * 0xff)*0x0100 + Math.floor(b * 0xff) );
    }

    static colorLerp( c0:number, c1:number, rate01:number):number {
        let rate10 = 1 - rate01;
        let color = 
            ( ((c0&0xff0000) * rate10 + (c1&0xff0000) * rate01) & 0xff0000 ) +
            ( ((c0&0xff00) * rate10 + (c1&0xff00) * rate01) & 0xff00 ) +
            ( ((c0&0xff) * rate10 + (c1&0xff) * rate01) & 0xff );
        return color;
    }

    static newTextField(text:string, size:number, color:number, xRatio:number, yRatio:number, bold:boolean, adjust:boolean): egret.TextField {
        let tf = new egret.TextField();
        tf.text = text;
        tf.bold = bold;
        tf.size = size;
        tf.textColor = color;
        if( adjust ){
            // 画面上のテキスト向け
            tf.x = (Util.width  - tf.width)  * xRatio;
            tf.y = (Util.height - tf.height) * yRatio;
        }else{
            // ボタン上のテキスト向け
            tf.x = Util.width  * xRatio - tf.width  * 0.5;
            tf.y = Util.height * yRatio - tf.height * 0.5;
        }
        return tf;
    }
    
    static newShadowText( t:egret.TextField, color:number, offset:number=1.5 ){
        let tf = new egret.TextField();
        tf.text = t.text;
        tf.bold = t.bold;
        tf.size = t.size;
        tf.textColor = color;
        tf.x = t.x + offset;
        tf.y = t.y + offset;
        tf.alpha = 0.5;
        return tf;
    }

    static newBitmap( name:string, x:number, y:number, scale:number ):egret.Bitmap {
        let bitmap = new egret.Bitmap();
        bitmap.texture = RES.getRes(name);
        GameObject.baseDisplay.addChild( bitmap );
        bitmap.x = x;
        bitmap.y = y;
        bitmap.anchorOffsetX = bitmap.width  * 0.5;
        bitmap.anchorOffsetY = bitmap.height * 0.5;
        bitmap.scaleX = bitmap.scaleY = scale;
        return bitmap;
    }

    static getSaveDataNumber( key:string, defaultValue:number ):number {
        let s = egret.localStorage.getItem(key); // string
        let v = defaultValue;
        if( s != null ) v = parseInt( s );
        return v;
    }
    static setSaveDataNumber( key:string, value:number ){
        egret.localStorage.setItem(key, ""+value);
    }

    static getSaveDataString( key:string, defaultText:string ):string {
        let s = egret.localStorage.getItem(key); // string
        if( s == null ) s = defaultText;
        return s;
    }
    static setSaveDataString( key:string, text:string ){
        egret.localStorage.setItem(key, text);
    }
}

