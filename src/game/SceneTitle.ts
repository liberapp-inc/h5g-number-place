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

        this.texts[0] = Util.newTextField("HYPER SUDOKU", Util.width / 11, FontColor, 0.5, 0.25, true, true);
        
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
        GameObject.transit = SceneSelect.loadScene;
    }
}
