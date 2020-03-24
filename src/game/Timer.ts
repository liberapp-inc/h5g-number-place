// Liberapp 2020 - Tahiti Katagai
// タイマー表示

class Timer extends GameObject{

    timer:number = 0;

    constructor() {
        super();
    }

	onDestroy(){
    }

	update(){
        this.timer += 1/60;
        Score.I.setPoint( this.timer );
	}
}
