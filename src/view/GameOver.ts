// Liberapp 2020 Tahiti Katagai
// ゲームオーバー表示

class GameOver extends GameObject{

    static I:GameOver = null;

    texts:egret.TextField[] = [];
    buttonOK:Button = null;
    step:number = 0;
    readonly fadeInFrame:number = 64;

    constructor() {
        super();

        GameOver.I = this;

        this.buttonOK = new Button("クリア", Util.width/16, BackColor, 0.50, 0.3, 1.4, 0.2, FontColor, 1.0, -1, true, this.onTapRetry, this );
        egret.Tween.get(this.buttonOK.text,{loop:false})
            .to({alpha:0}, 0)
            .to({alpha:1}, 1000)
        egret.Tween.get(this.buttonOK.display,{loop:false})
            .to({alpha:0}, 0)
            .to({alpha:1}, 1000)
    }

    onDestroy() {
        this.texts.forEach( text =>{ GameObject.baseDisplay.removeChild( text ); });
        this.texts = null;
        GameOver.I = null;
    }
    
    update() {
     }

    onTapRetry(){
        GameObject.transit = SceneSelect.loadScene;
    }
}
