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

        this.texts[0] = Util.newTextField("ハイパーナンプレ", Util.width / 9, FontColor, 0.5, 0.25, true, true);
        
        this.texts[1] = Util.newTextField("配置入力テスト 0~9 81文字", 28, FontColor, 0.5, 0.45, true, false);
        new InputField( 9*9, 20, FontColor, 0.5, 0.5, 0.9, 0.05, RelateBoxColor, 1, this.inputData );

        this.startButton = new Button("スタート", Util.width/16, BackColor, 0.50, 0.70, 0.7, 0.12, FontColor, 1.0, -1, true, this.onTapStart, this );

        this.texts.forEach( text =>{ if( text ){ GameObject.baseDisplay.addChild( text ); } });
    }

	onDestroy(){
        this.texts.forEach( text =>{ if( text ){ text.parent.removeChild( text ); } });
        this.texts = null;
    }

    inputData( data:string ){
        Game.initialData = data;
    }

	update(){
	}

    onTapStart(){
        // console.log( this.texts[0].text );       // "this" is mine
        GameObject.transit = ScenePlay.loadScene;
    }
}
