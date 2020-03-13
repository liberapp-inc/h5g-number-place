// Liberapp 2020 - Tahiti Katagai
// ゲーム

const SaveKeyBestScore = "numpla-bestScore";
const DefaultBestScore = 50;

const BackColor = 0xf8fafc;    // index.htmlで設定
const FontColor = 0x101010;
const Font2Color = 0xd00000;

const BoxColor = 0xf0f0f0;
const RelateBoxColor = 0xc0e0f0;
const SelectBoxColor = 0xf0c080;

const BoxCount = 9;
const BoxSizeInW = 10;
const BoxSizeInH = 15;
const BoxWpw = 1/BoxSizeInW;
const BoxHph = 1/BoxSizeInH;
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
        for( let ix=0 ; ix<BoxCount ; ix++ ){
            for( let iy=0 ; iy<BoxCount ; iy++ ){
                let i = ix + iy*BoxCount;
                let numText = this.initialData[i];
                let num = parseInt( numText );
                this.initialNumbs[ i ] = num;
                this.numbs[ i ] = num;

                if( num == 0 ) numText = "";
                let xr = 0.50 + (ix-4) * BoxWpw;
                let yr = 0.35 + (iy-4) * BoxHph;
                let bold = num != 0;
                this.boxes[ i ] = new Button( numText, 32, FontColor, xr, yr, BoxWpw*0.9, BoxHph*0.9, BoxColor, 1, Font2Color, bold, (btn:Button)=>this.onBox(btn), this, i );
            }
        }

        // 数値キー １〜９
        for( let ix=0 ; ix<3 ; ix++ ){
            for( let iy=0 ; iy<3 ; iy++ ){
                let i = 1 + ix + iy*3;
                let numText = i.toFixed();
                let xr = 0.50 + (ix-1) * KeyWpw;
                let yr = 0.80 + (iy-1) * KeyHph;
                this.keys[ i ] = new Button( numText, 38, FontColor, xr, yr, KeyWpw*0.9, KeyHph*0.9, BoxColor, 1, Font2Color, true, (btn:Button)=>this.onKey(btn), this, i );
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
                this.boxes[ this.currentBoxID ].setColor( BoxColor );
                this.boxes[ this.currentBoxID ].setTextColor( FontColor );
            }
            this.currentBoxID = this.touchedBoxID;

            // 対象エリアカラー
            let ix = this.currentBoxID % BoxCount;
            let iy = Math.floor( this.currentBoxID / BoxCount );
            this.setRelateBoxColor( ix, iy );
            this.setRelateTextColor( ix, iy );
            // 対象BOXカラー
            this.boxes[ this.currentBoxID ].setColor( SelectBoxColor );

        }
        
        // 数字キー入力
        if( this.touchedKeyID >= 0 ){
            if( this.currentBoxID >= 0 ){
                if( this.initialNumbs[ this.currentBoxID ] == 0 ){
                    this.numbs[ this.currentBoxID ] = this.touchedKeyID;
                    this.boxes[ this.currentBoxID ].setText( this.touchedKeyID.toFixed(), false );

                    // 判定（配置上のチェック）
                    let ix = this.currentBoxID % BoxCount;
                    let iy = Math.floor( this.currentBoxID / BoxCount );
                    this.setRelateTextColor( ix, iy );
                    if( this.checkNumber( ix, iy ) ){
                        this.boxes[ this.currentBoxID ].setTextColor( FontColor );
                    }else{
                        this.boxes[ this.currentBoxID ].setTextColor( 0xff0000 );
                    }
                }
            }
        }

        this.touchedBoxID = -1;
        this.touchedKeyID = -1;
	}

    setRelateBoxColor( ix:number, iy:number ){
        let numb = this.numbs[ ix + iy * BoxCount ];
        let headX = Math.floor(ix/3) * 3;
        let headY = Math.floor(iy/3) * 3;

        for( let i=0 ; i<BoxCount ; i++ ){
            for( let j=0 ; j<BoxCount ; j++ ){
                let index = i + j*BoxCount;
                // 対象のマスを水色に
                let inBox3x3 = i >= headX && i <= headX + 2 && j >= headY && j <= headY + 2;
                if( inBox3x3 || i == ix || j==iy ){
                    this.boxes[ index ].setColor( RelateBoxColor );
                }else{
                    this.boxes[ index ].setColor( BoxColor );
                }
            }
        }
    }

    setRelateTextColor( ix:number, iy:number ){
        let numb = this.numbs[ ix + iy * BoxCount ];
        // 同じ数値を強調
        for( let i=0 ; i<BoxCount ; i++ ){
            for( let j=0 ; j<BoxCount ; j++ ){
                let index = i + j*BoxCount;
                if( this.numbs[ index ] == numb ){
                    this.boxes[ index ].setTextColor( 0xff0000 );
                }else{
                    this.boxes[ index ].setTextColor( FontColor );
                }
            }
        }
    }

    // 判定（現在配置されている数字でダブリがないかチェック　正解かどうかではない）
    checkNumber( ix:number, iy:number ):boolean{
        let numb = this.numbs[ ix + iy * BoxCount ];
        let headX = Math.floor(ix/3) * 3;
        let headY = Math.floor(iy/3) * 3;

        for( let i=0 ; i<BoxCount ; i++ ){
            for( let j=0 ; j<BoxCount ; j++ ){
                if( i == ix && j == iy )
                    continue;
                
                // 対象のマスの数値を判定
                let index = i + j*BoxCount;
                let inBox3x3 = i >= headX && i <= headX + 2 && j >= headY && j <= headY + 2;
                if( inBox3x3 || i == ix || j==iy ){
                    if( this.numbs[ index ] == numb ){
                        return false;   // wrong
                    }
                }
            }
        }
        return true; // correct

        // // 横ライン
        // for( let i=0 ; i<BoxCount ; i++ ){
        //     if( i != ix && this.numbs[ i + iy * BoxCount ] == numb ){
        //         return false;
        //     }
        // }
        // // 縦ライン
        // for( let j=0 ; j<BoxCount ; j++ ){
        //     if( j != iy && this.numbs[ ix + j * BoxCount ] == numb ){
        //         return false;
        //     }
        // }
        // // ３ｘ３ブロック
        // let headX = Math.floor(ix/3) * 3;
        // let headY = Math.floor(iy/3) * 3;
        // for( let i=0 ; i<3 ; i++ ){
        //     for( let j=0 ; j<3 ; j++ ){
        //         let x = headX + i;
        //         let y = headY + j;
        //         if( x!=ix && y!=iy && this.numbs[ x + y * BoxCount ] == numb ){
        //             return false;
        //         }
        //     }
        // }
        // return true;    // correct
    }
}

