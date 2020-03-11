// Liberapp 2020 - Tahiti Katagai
// ゲーム

const SaveKeyBestScore = "numpla-bestScore";
const DefaultBestScore = 50;

const BACK_COLOR = 0xf8fafc;    // index.htmlで設定
const FONT_COLOR = 0x101010;
const FONT2_COLOR = 0xd00000;

const BoxColor = 0xf0f0f0;
const RelateBoxColor = 0x80c0f0;
const SelectBoxColor = 0xf0c080;

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

    initialData:string = "008000010041700293293540070036900000007000800000005740080072961614009520070000300";

    initialNumbs:number[] = [];
    correctNumbs:number[] = [];
    numbs:number[] = [];

    currentBoxID = -1;
    touchedBoxID = -1;
    touchedKeyID = -1;

    constructor() {
        super();
        Game.I = this;

        // マスボタン９ｘ９
        for( let ix=0 ; ix<9 ; ix++ ){
            for( let iy=0 ; iy<9 ; iy++ ){
                let i = ix + iy*9;
                let numText = this.initialData[i];
                let num = parseInt( numText );
                this.initialNumbs[ i ] = num;
                this.numbs[ i ] = num;

                if( num == 0 ) numText = "";
                let xr = 0.50 + (ix-4) * BoxWpw;
                let yr = 0.35 + (iy-4) * BoxHph;
                this.boxes[ i ] = new Button( numText, 24, FONT_COLOR, xr, yr, BoxWpw*0.9, BoxHph*0.9, BoxColor, 1, FONT2_COLOR, (btn:Button)=>this.onBox(btn), this, i );
            }
        }

        // 数値キー １〜９
        for( let ix=0 ; ix<3 ; ix++ ){
            for( let iy=0 ; iy<3 ; iy++ ){
                let i = 1 + ix + iy*3;
                let numText = i.toFixed();
                let xr = 0.50 + (ix-1) * KeyWpw;
                let yr = 0.80 + (iy-1) * KeyHph;
                this.keys[ i ] = new Button( numText, 28, FONT_COLOR, xr, yr, KeyWpw, KeyHph, BoxColor, 1, FONT2_COLOR, (btn:Button)=>this.onKey(btn), this, i );
            }
        }
    }

    onBox( btn:Button ){
        this.touchedBoxID = btn.keyId;
    }
    onKey( btn:Button ){
        this.touchedKeyID = btn.keyId;
    }

	onDestroy(){
        Game.I = null;
    }

	update(){
        if( GameOver.I != null ) return;

        // マス選択　カラー変更
        let num;
        if( this.touchedBoxID >= 0 ){
            if( this.currentBoxID >= 0 ){
                num = this.numbs[ this.currentBoxID ];
                this.boxes[ this.currentBoxID ].setColor( BoxColor );
                this.boxes[ this.currentBoxID ].setText( num > 0 ? num.toFixed() : "" );
            }
            this.currentBoxID = this.touchedBoxID;
            num = this.numbs[ this.currentBoxID ];
            this.boxes[ this.currentBoxID ].setColor( SelectBoxColor );
            this.boxes[ this.currentBoxID ].setText( num > 0 ? num.toFixed() : "" );
        }
        
        // 数字キー入力
        if( this.touchedKeyID >= 0 ){
            if( this.currentBoxID >= 0 ){
                if( this.initialNumbs[ this.currentBoxID ] == 0 ){
                    this.numbs[ this.currentBoxID ] = this.touchedKeyID;
                    this.boxes[ this.currentBoxID ].setText( this.touchedKeyID.toFixed() );
                }
            }
        }

        this.touchedBoxID = -1;
        this.touchedKeyID = -1;
	}
}

