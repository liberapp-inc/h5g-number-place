// Liberapp 2020 - Tahiti Katagai
// タイトルシーン

class SceneTitle extends GameObject{

    texts:egret.TextField[] = [];
    startButton:Button = null;
    settingsButton:Button = null;

    static loadScene() {
        new SceneTitle();
    }

    constructor() {
        super();

        this.texts[0] = Util.newTextField("ナンプレ", Util.width / 9, FontColor, 0.5, 0.25, true, true);
        this.texts[1] = Util.newTextField("あああ", Util.width / 20, FontColor, 0.5, 0.35, true, false);

        let bestScore = Util.getSaveDataNumber( SaveKeyBestScore, DefaultBestScore );
        this.texts[2] = Util.newTextField("BEST"+bestScore+"", Util.width / 14, FontColor, 0.5, 0.45, true, true);

        this.startButton = new Button("スタート", Util.width/16, BackColor, 0.50, 0.70, 0.7, 0.12, FontColor, 1.0, -1, true, this.onTapStart, this );

        this.texts.forEach( text =>{ if( text ){ GameObject.baseDisplay.addChild( text ); } });
    }

	onDestroy(){
        this.texts.forEach( text =>{ if( text ){ text.parent.removeChild( text ); } });
        this.texts = null;
    }

	update(){
	}

    onTapStart(){
        // console.log( this.texts[0].text );       // "this" is mine
        GameObject.transit = ScenePlay.loadScene;
    }
}
