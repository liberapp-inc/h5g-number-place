// Liberapp 2020 - Tahiti Katagai
// スコア表示

class Score extends GameObject{

    static I:Score = null;   // singleton instance

    point:number = 0;
    bestScore:number = 0;
    text:egret.TextField = null;
    // textBest:egret.TextField = null;

    constructor() {
        super();

        Score.I = this;
        this.point = 0;
        this.text = Util.newTextField("TIME:0", Util.width / 28, FontColor, 0.9, 0.02, true, true);
        GameObject.baseDisplay.addChild( this.text );

        this.bestScore = Util.getSaveDataNumber( SaveKeyClearTime + Game.initialGame, 999 );
    }
    
    onDestroy() {
        this.text.parent.removeChild( this.text );
        this.text = null;
        Score.I = null;
    }

    update(){}

    addPoint( point:number=1 ){
        this.setPoint( this.point + point );
    }

    setPoint( point:number ){
        const prev = this.point.toFixed();
        const next = point.toFixed();
        if( prev != next ){
            this.point = point;
            this.text.text = "TIME:" + next;
            // if( this.bestScore < this.point ){
            //     this.textBest.text = "BEST:" + this.point.toFixed();
            // }
        }
    }
}
