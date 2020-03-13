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
        this.text = Util.newTextField("", Util.width / 22, Font2Color, 0.0, 0.0, true, true);
        GameObject.baseDisplay.addChild( this.text );

        this.bestScore = Util.getSaveDataNumber( SaveKeyBestScore, DefaultBestScore );
        //?? test ハイスコアいつでもテスト用
        // this.bestScore = 3;
    }
    
    onDestroy() {
        this.text.parent.removeChild( this.text );
        this.text = null;
        // this.textBest.parent.removeChild( this.textBest );
        // this.textBest = null;
        Score.I = null;
    }

    update(){}

    addPoint( point:number=1 ){
        this.setPoint( this.point + point );
    }

    setPoint( point:number ){
		// if(this.Meter != 0) g.drawString("走行距離:"+this.count+"M",10,35);
        const prev = this.point.toFixed();
        const next = point.toFixed();
        this.point = point;
        if( prev != next ){
            this.text.text = "" + next + "";
            // if( this.bestScore < this.point ){
            //     this.textBest.text = "BEST:" + this.point.toFixed();
            // }
        }
    }
}
