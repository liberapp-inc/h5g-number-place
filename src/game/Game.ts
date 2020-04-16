// Liberapp 2020 - Tahiti Katagai
// ゲーム

const SaveKeyClearTime = "HyperSudokuClearTime";    // +問題番号Keyにクリア時間を記録

const BackColor = 0xffffff;    // index.htmlで設定
const FontColor = 0x00e8e8;

// 未入力
const ColorCellNone = 0xCFDCE5;
const ColorFontNone = 0x5C9399;
// 問題 固定数値
const ColorCellFixed = 0xA3BBCC;
const ColorFontFixed = ColorFontNone;
// 入力済み 
const ColorCellEnter = ColorCellNone;
const ColorFontEnter = 0x203868;
// 選択
const ColorCellPick = 0xFFFF00;
const ColorFontPick = 0x203868;
const ColorCellPickEnter = ColorCellNone;
const ColorFontPickEnter = 0x203868;
const ColorCellPickFixed = 0xA3BBCC;
const ColorFontPickFixed = ColorFontNone;
// 選択と同じ数
const ColorCellEqual = ColorCellNone; //0x203868; おそらく指示間違い
const ColorFontEqual = ColorCellPick;
const ColorCellEqualFixed = 0xA3BBCC;
const ColorFontEqualFixed = ColorCellPick;
// ガイド　未入力　入力済み
const ColorCellGuide = 0xE2E1CF;
const ColorFontGuide = ColorFontEnter;
const ColorFontGuideFixed = 0x5CB399;





// const BoxColor = 0x205080;
// const BoxLineColor = 0x00ffff;
// const FixedBoxColor  = 0x203868;
// const RelateBoxColor = 0x002040;
// const SelectBoxColor = 0x001020;

// const NumberColor = 0x00ffff;
// const FixedNumberColor = 0xff0060;
// const RightNumberColor = 0x00ffff;
// const WrongNumberColor = 0xffff00;
// const EqualNumberColor = 0xffff00;

const KeyColor = FontColor;     //0xff50ff;
const KeyLineColor = FontColor; //0x803080;
const KeyFontColor = BackColor;//0x200020;

const EffectColor = 0x00ffe0;

const BoxCount = 9;
const BoxSizeInW = 10;
const BoxSizeInH = 15;
const BoxWpw = 1/BoxSizeInW;
const BoxHph = 1/BoxSizeInH;
const KeyInW = 8;
const KeyInH = 12;
const KeyWpw = 1/KeyInW;
const KeyHph = 1/KeyInH;

const BoxCenterXpw = 0.50;
const BoxCenterYph = 0.40;
const KeyCenterXpw = 0.50;
const KeyCenterYph = 0.85;

class Game extends GameObject{

    static I:Game;
    static initialGame:number;
    static initialData:string = "008000010041700293293540070036900000007000800000005740080072961614009520070000300";

    timer:Timer;
    texts:egret.TextField[] = [];
    
    private localTouchBegan:boolean = false;
    press:boolean = false;
    touch:boolean = false;
    tapX:number = 0;
    tapY:number = 0;

    boxes:Box[] = [];
    keys:Button[] = [];
    delKey:Button;

    initialNumbs:number[] = [];
    numbs:number[] = [];
    notes:number[] = [];

    currentBoxID = -1;
    touchedBoxID = -1;
    touchedKeyID = -1;

    constructor() {
        super();
        Game.I = this;

        this.timer = new Timer();

        this.texts[0] = Util.newTextField("問題"+(Game.initialGame+1), Util.width / 20, FontColor, 0.5, 0.05, true, true);
        this.texts.forEach( text =>{ if( text ){ GameObject.baseDisplay.addChild( text ); } });

        // マスボタン９ｘ９
        for( let ix=0 ; ix<BoxCount ; ix++ ){
            for( let iy=0 ; iy<BoxCount ; iy++ ){
                let i = ix + iy*BoxCount;
                let numText = Game.initialData[i];
                let num = parseInt( numText );
                this.initialNumbs[ i ] = num;
                this.numbs[ i ] = num;
                this.notes[ i ] = 0;

                if( num == 0 ) numText = "";
                let xr = BoxCenterXpw + (ix-4) * BoxWpw;
                let yr = BoxCenterYph + (iy-4) * BoxHph;
                let fixed = num != 0;
                this.boxes[ i ] = new Box( numText, xr, yr, BoxWpw*0.95, BoxHph*0.95, true, (btn:Box)=>this.onBox(btn), this, i );
                if( fixed == false ){
                    this.boxes[ i ].setColor( ColorCellNone );
                    this.boxes[ i ].setTextColor( ColorFontNone );
                }else{
                    this.boxes[ i ].setColor( ColorCellFixed );
                    this.boxes[ i ].setTextColor( ColorFontFixed );
                }
            }
        }

        // 数値キー １〜９
        for( let ix=0 ; ix<3 ; ix++ ){
            for( let iy=0 ; iy<3 ; iy++ ){
                let i = 1 + ix + iy*3;
                let numText = i.toFixed();
                let xr = KeyCenterXpw + (ix-1) * KeyWpw;
                let yr = KeyCenterYph + (iy-1) * KeyHph;
                this.keys[ i ] = new Button( numText, 42, KeyFontColor, xr, yr, KeyWpw*0.9, KeyHph*0.9, KeyColor, 1, KeyLineColor, true, (btn:Button)=>this.onKey(btn), this, i );
            }
        }
        // 削除キー
        this.delKey = new Button( "×", 42, KeyFontColor, 0.8, KeyCenterYph-KeyHph, KeyWpw*0.9, KeyHph*0.9, KeyColor, 1, KeyLineColor, true, (btn:Button)=>this.onDelKey(btn), this );
        // Backキー
        this.delKey = new Button( "<", 30, KeyFontColor, 0.05, 0.04, KeyWpw*0.7, KeyHph*0.7, KeyColor, 1, KeyLineColor, true, (btn:Button)=>this.onBackKey(btn), this );
    }

    onBox( btn:Box ){
        this.touchedBoxID = btn.keyId;
    }
    onKey( btn:Button ){
        this.touchedKeyID = btn.keyId;
    }
    onDelKey( btn:Button ){
        if( this.currentBoxID >= 0 ){
            if( this.initialNumbs[ this.currentBoxID ] == 0 ){
                this.numbs[ this.currentBoxID ] = 0;
                this.notes[ this.currentBoxID ] = 0;
                this.boxes[ this.currentBoxID ].setText( "" );
                this.setBoxNumber( this.currentBoxID, 0 );
            }
        }
    }
    onBackKey( btn:Button ){
        GameObject.transit = SceneSelect.loadScene;
    }   

	onDestroy(){
        Game.I = null;
        this.texts.forEach( text =>{ if( text ){ text.parent.removeChild( text ); } });
        this.texts = null;
    }

	update(){
        if( GameOver.I != null ) return;

        // マス選択　カラー変更
        let num;
        if( this.touchedBoxID >= 0 && this.touchedBoxID != this.currentBoxID ){
            if( this.currentBoxID >= 0 ){
                if( this.initialNumbs[ this.currentBoxID ] == 0 ){
                    this.boxes[ this.currentBoxID ].setColor( ColorCellPick );
                    this.boxes[ this.currentBoxID ].setTextColor( ColorFontPick );
                }else{
                    this.boxes[ this.currentBoxID ].setColor( ColorCellPickFixed );
                    this.boxes[ this.currentBoxID ].setTextColor( ColorFontPickFixed );
                }
            }
            this.currentBoxID = this.touchedBoxID;

            // 対象エリアカラー
            let ix = this.currentBoxID % BoxCount;
            let iy = Math.floor( this.currentBoxID / BoxCount );
            this.setGuideBoxColor( ix, iy );
            this.setEqualTextColor( ix, iy, this.numbs[ this.currentBoxID ] );
            // 対象BOXカラー
            let box = this.boxes[ this.currentBoxID ];
            box.setColor( ColorCellPick );
            box.setTextColor( ColorFontPick );
            this.effectChooseBox( box.X, box.Y );
        }
        
        // 数字キー入力
        if( this.touchedKeyID >= 0 ){
            if( this.currentBoxID >= 0 ){
                if( this.initialNumbs[ this.currentBoxID ] == 0 ){
                    // メモがあれば追加削除
                    if( this.notes[ this.currentBoxID ] != 0 ){
                        this.notes[ this.currentBoxID ] ^= (1<<this.touchedKeyID);
                        if( this.notes[ this.currentBoxID ] != 0 ){
                            this.boxes[ this.currentBoxID ].setNote( this.notes[ this.currentBoxID ] );
                            // メモでも正解エフェクト
                            if( (this.notes[ this.currentBoxID ] & (1<<this.touchedKeyID)) != 0 ){
                                const ix = this.currentBoxID % BoxCount;
                                const iy = Math.floor( this.currentBoxID / BoxCount );
                                this.setGuideBoxColor( ix, iy );
                                this.setEqualTextColor(ix, iy, this.touchedKeyID );
                                if( this.checkNumber( ix, iy, this.touchedKeyID ) ){
                                    const box = this.boxes[ this.currentBoxID ];
                                    this.effectRightNumber( box.X, box.Y );
                                }
                            }
                        }else{
                            this.setBoxNumber( this.currentBoxID, this.touchedKeyID );
                        }
                    }
                    // 同じ数字ならメモ追加削除
                    else if( this.numbs[ this.currentBoxID ] == this.touchedKeyID ){
                        this.setBoxNumber( this.currentBoxID, 0 );
                        this.notes[ this.currentBoxID ] ^= (1<<this.touchedKeyID);
                        this.boxes[ this.currentBoxID ].setNote( this.notes[ this.currentBoxID ] );
                    }
                    else{
                        this.setBoxNumber( this.currentBoxID, this.touchedKeyID );
                    }
                }
            }
        }

        this.touchedBoxID = -1;
        this.touchedKeyID = -1;
	}

    private setBoxNumber( boxID:number, numb:number ){
        // マスに設定
        this.numbs[ boxID ] = numb;
        this.boxes[ boxID ].setText( numb>0 ? numb.toFixed() : "" );

        // 判定（配置上のチェック）
        let box = this.boxes[ boxID ];
        let ix = boxID % BoxCount;
        let iy = Math.floor( boxID / BoxCount );
        this.setGuideBoxColor( ix, iy );
        this.setEqualTextColor( ix, iy, numb );
        if( this.checkNumber( ix, iy, numb ) ){
            box.setTextColor( ColorFontEnter ); // NumberColor );
            this.effectRightNumber( box.X, box.Y );
        }else{
            box.setTextColor( ColorFontEnter ); //ColorFontEnterWrong );
        }

        this.updateBoxOutline3x3( ix, iy );

        if( this.checkClear() ){
            new GameOver();
            if( Util.getSaveDataNumber(SaveKeyClearTime+Game.initialGame, 999) > Score.I.point )
                Util.setSaveDataNumber( SaveKeyClearTime+Game.initialGame, Score.I.point );
        }
    }

    updateBoxOutline3x3( ix:number, iy:number ){
        // let lineRgb = this.checkNumber3x3( ix, iy ) ? 0x000000 : BoxLineColor;

        // let headX = Math.floor(ix/3) * 3;
        // let headY = Math.floor(iy/3) * 3;
        // for( let i=0 ; i<3 ; i++ ){
        //     for( let j=0 ; j<3 ; j++ ){
        //         let x = headX + i;
        //         let y = headY + j;
        //         this.boxes[ x + y*BoxCount ].setOutline( lineRgb );
        //     }
        // }
    }

    checkNumber3x3( ix:number, iy:number ):boolean{
        let headX = Math.floor(ix/3) * 3;
        let headY = Math.floor(iy/3) * 3;

        for( let i=0 ; i<3 ; i++ ){
            for( let j=0 ; j<3 ; j++ ){
                let x = headX + i;
                let y = headY + j;
                if( this.checkNumber( x, y, this.numbs[ x + y * BoxCount ] ) == false ){
                    return false; // 3x3 wrong
                }
            }
        }
        return true; // 3x3 correct
    }

    effectChooseBox( px:number, py:number ){
        new EffectSquare( Util.w(randF(0.2,0.8)), py, Util.w(1.4), Util.h(BoxHph), EffectColor, 0.5, 1/3, 1/9 );
        new EffectSquare( px, Util.h(BoxCenterXpw+randF(-0.2,+0.2)), Util.w(BoxWpw), Util.h(1.4), EffectColor, 0.5, 1/6, 1/2 );
    }
    effectRightNumber( px:number, py:number ){
        for( let i=0 ; i<0 ; i++ ){
            let s = Util.w(BoxWpw)*randF(0.25,1.5);
            let v = 20;
            let vx = randF(-v, +v);
            let vy = randF(-v, +v);
            new EffectFrame(px+vx*5, py+vy*5, s, s, EffectColor, 0.5, 1/2, 1/6, vx, vy).delta *= randF(0.5,1);
            new EffectFrame(px+vy*5, py+vx*5, s, s, EffectColor, 0.5, 1/6, 1/2, vx, vy).delta *= randF(0.5,1);
        }
        new EffectFrame( Util.w(0.50), py, Util.w(1.5), Util.h(BoxHph*0.5), EffectColor, 0.5, 1/3, 1/9 );
        new EffectFrame( px, Util.h(BoxCenterXpw), Util.w(BoxWpw*0.5), Util.h(1.5), EffectColor, 0.5, 1/6, 1/2 );

        // chainer
        new EffectChainer( 0, px, py, +Util.w(BoxWpw), 0, 5 );
        new EffectChainer( 0, px, py, -Util.w(BoxWpw), 0, 5 );
        new EffectChainer( 0, px, py, 0, +Util.h(BoxHph), 5 );
        new EffectChainer( 0, px, py, 0, -Util.h(BoxHph), 5 );
    }


    setGuideBoxColor( ix:number, iy:number ){
        let numb = this.numbs[ ix + iy * BoxCount ];
        let headX = Math.floor(ix/3) * 3;
        let headY = Math.floor(iy/3) * 3;

        for( let i=0 ; i<BoxCount ; i++ ){
            for( let j=0 ; j<BoxCount ; j++ ){
                let index = i + j*BoxCount;
                let box = this.boxes[ index ];
                // 対象のマスを水色に
                let inBox3x3 = i >= headX && i <= headX + 2 && j >= headY && j <= headY + 2;
                if( inBox3x3 || i == ix || j==iy ){
                    if( this.initialNumbs[index]==0 ){
                        box.setColor( ColorCellGuide );
                        box.setTextColor( ColorFontGuide );
                    }else{
                        box.setColor( ColorCellGuide );
                        box.setTextColor( ColorFontGuideFixed );
                    }
                }else{
                    // const fixed = this.initialNumbs[index]==0 ? ColorCellNone : ColorCellFixed; // BoxColor : FixedBoxColor;
                    if( this.initialNumbs[index]==0 ){
                        if( numb == 0 ){
                            box.setColor( ColorCellNone );
                            box.setTextColor( ColorFontNone );
                        }else{
                            box.setColor( ColorCellEnter );
                            box.setTextColor( ColorFontEnter );
                        }
                    }else{
                        box.setColor( ColorCellFixed );
                        box.setTextColor( ColorFontFixed );
                    }
                }
            }
        }
    }

    setEqualTextColor( ix:number, iy:number, numb:number ){
        //let numb = this.numbs[ ix + iy * BoxCount ];
        // 同じ数値を強調
        for( let i=0 ; i<BoxCount ; i++ ){
            for( let j=0 ; j<BoxCount ; j++ ){
                let index = i + j*BoxCount;
                if( this.numbs[ index ] == numb ){
                    this.boxes[ index ].setTextColor( ColorFontEqual );//EqualNumberColor );
                // }else{
                    // const color = this.initialNumbs[ index ] == 0 ? ColorFontNone : ColorFontFixed; ////NumberColor : FixedNumberColor;
                    // this.boxes[ index ].setTextColor( color );
                }
            }
        }
        let index = ix + iy*BoxCount;
        if( this.initialNumbs[ index ] == 0 )
            // this.boxes[ ix + iy * BoxCount ].setTextColor( this.checkNumber(ix, iy, numb) ?  RightNumberColor : WrongNumberColor );
            this.boxes[ ix + iy * BoxCount ].setTextColor( ColorFontEnter );
    }

    // 判定（現在配置されている数字でダブリがないかチェック　正解かどうかではない）
    checkNumber( ix:number, iy:number, numb:number ):boolean{
        // 横ライン
        for( let i=0 ; i<BoxCount ; i++ )
            if( i != ix && this.numbs[ i + iy * BoxCount ] == numb )
                return false;
        
        // 縦ライン
        for( let j=0 ; j<BoxCount ; j++ )
            if( j != iy && this.numbs[ ix + j * BoxCount ] == numb )
                return false;
        
        // ３ｘ３ブロック
        let headX = Math.floor(ix/3) * 3;
        let headY = Math.floor(iy/3) * 3;
        for( let i=0 ; i<3 ; i++ ){
            for( let j=0 ; j<3 ; j++ ){
                let x = headX + i;
                let y = headY + j;
                if( x!=ix && y!=iy && this.numbs[ x + y * BoxCount ] == numb ){
                    return false;
                }
            }
        }
        return true;    // correct
    }

    // クリアチェック　すべての入力ナンバーをチェック
    checkClear():boolean {
        // すべて入力済みか
        for( let i=0 ; i<this.numbs.length ; i++ ){
            if( this.numbs[ i ] == 0 ){
                return false;
            }
        }

        for( let i=0 ; i<BoxCount ; i++ ){
            for( let j=0 ; j<BoxCount ; j++ ){
                let index = i + j*BoxCount;
                if( this.initialNumbs[ index ] == 0 ){
                    if( this.checkNumber( i, j, this.numbs[ index ] ) == false ){
                        return false;
                    }
                }
            }
        }
        return true; // correct
    }
}

