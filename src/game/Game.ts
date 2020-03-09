// Liberapp 2020 - Tahiti Katagai
// ゲーム

const SaveKeyBestScore = "numpla-bestScore";
const DefaultBestScore = 50;

const BACK_COLOR = 0xf8fafc;    // index.htmlで設定
const FONT_COLOR = 0x101010;
const FONT2_COLOR = 0xd00000;
const BoxColor = 0xf0f0f0;

const BoxInW = 10;
const BoxInH = 15;
const BoxWpw = 1/BoxInW;
const BoxHph = 1/BoxInH;
const KeyInW = 8;
const KeyInH = 12;
const KeyWpw = 1/KeyInW;
const KeyHph = 1/KeyInH;

class Game extends GameObject{

    static I:Game;

    counter:number = 0;

    private localTouchBegan:boolean = false;
    press:boolean = false;
    touch:boolean = false;
    tapX:number = 0;
    tapY:number = 0;

    boxes:Button[] = [];
    keys:Button[] = [];

    currentBoxID = -1;
    touchedBoxID = -1;
    touchedKeyID = 0;

    constructor() {
        super();
        Game.I = this;

        // GameObject.gameDisplay.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touchBegin(e), this);
        // GameObject.gameDisplay.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => this.touchMove(e), this);
        // GameObject.gameDisplay.stage.addEventListener(egret.TouchEvent.TOUCH_END, (e: egret.TouchEvent) => this.touchEnd(e), this);

        // マスボタン９ｘ９
        for( let ix=0 ; ix<9 ; ix++ ){
            for( let iy=0 ; iy<9 ; iy++ ){
                let i = ix + iy*9;
                let numText = i.toFixed();
                let xr = 0.50 + (ix-4) * BoxWpw;
                let yr = 0.35 + (iy-4) * BoxHph; 
                this.boxes[ i ] = new Button( numText, 16, FONT_COLOR, xr, yr, BoxWpw, BoxHph, BoxColor, 1, true, this.onBox, null, i );
            }
        }

        // 数値キー １〜９
        for( let ix=0 ; ix<3 ; ix++ ){
            for( let iy=0 ; iy<3 ; iy++ ){
                let i = 1 + ix + iy*3;
                let numText = i.toFixed();
                let xr = 0.50 + (ix-1) * KeyWpw;
                let yr = 0.80 + (iy-1) * KeyHph;
                this.boxes[ i ] = new Button( numText, 16, FONT_COLOR, xr, yr, KeyWpw, KeyHph, BoxColor, 1, true, this.onKey, null, i );
            }
        }
    }

    onBox(){
        let btn = ( <any>this ) as Button;
        Game.I.touchedBoxID = btn.keyId;
    }
    onKey(){
        let btn = ( <any>this ) as Button;
        Game.I.touchedKeyID = btn.keyId;
    }

	onDestroy(){
        Game.I = null;
        // GameObject.gameDisplay.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touchBegin(e), this);
        // GameObject.gameDisplay.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => this.touchMove(e), this);
        // GameObject.gameDisplay.stage.removeEventListener(egret.TouchEvent.TOUCH_END, (e: egret.TouchEvent) => this.touchEnd(e), this);
    }

    // touchBegin(e:egret.TouchEvent){
    //     this.localTouchBegan = 
    //     this.press = 
    //     this.touch = true;
    //     this.tapX = e.localX;
    //     this.tapY = e.localY;
    // }
    // touchMove(e:egret.TouchEvent){
    //     this.tapX = e.localX;
    //     this.tapY = e.localY;
    // }
    // touchEnd(e:egret.TouchEvent){
    //     this.touch = false;
    // }
    // touchUpdate(){
    //     if( this.localTouchBegan ){
    //         this.localTouchBegan = false;
    //     }else{
    //         this.press = false;
    //     }
    // }

	update(){
        if( GameOver.I != null ) return;

        // this.touchUpdate();


        // マス選択
        
        // 数字キー入力
        
	}
}

