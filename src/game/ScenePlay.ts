// Liberapp 2020 - Tahiti Katagai
// プレイシーン

class ScenePlay extends GameObject{

    static loadScene() {
        new BlockLine();
        new Game();
        new Score();
    }

    update(){
    }
}

