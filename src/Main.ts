// Liberapp 2020 - Tahiti Katagai
// ナンプレ

class Main extends eui.UILayer {

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
 
    private async addToStage() {
        // await this.loadResource();

        Util.initial( this );
        GameObject.initial( this.stage );
        // PhysicsObject.prepare( PIXEL_PER_METER );
        Camera2D.initial();

//        SceneTitle.loadScene();
        ScenePlay.loadScene();  // test
        egret.startTick(this.tickLoop, this);
    }

    // private async loadResource() {
    //     try {
    //         await RES.loadConfig("resource/default.res.json", "resource/");
    //         await RES.loadGroup("preload", 0);
    //     }
    //     catch (e) {
    //         console.error(e);
    //     }
    // }

    tickLoop(timeStamp:number):boolean{
        // PhysicsObject.progress();
        GameObject.process();
        Camera2D.process();
        return false;
    }
}

