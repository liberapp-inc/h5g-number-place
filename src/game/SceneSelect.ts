// Liberapp 2020 - Tahiti Katagai
// 問題選択シーン

const GamesCountW = 9;
const GamesCountH = 11;

class SceneSelect extends GameObject{

    static sudokuList:string[] = [
        "005284100062000980701000203300805004500407001200106008804000607073000850009718400",
        "923067104000000006504130207800000600201040803009000002705029301300000000402810765",
        "003800400056010070100023058001204007034000560600507800320670004060080130008005700",
        "015800043800035200900060700500027900092500036030600070027100089300042100600080400",
        "008000010041700293293540070036900000007000800000005740080072961614009520070000300",
        "030000600150208703078900521010300807000009000080051030590803160023105040060400000",
        "000010000590302047708409306300000005054000890060020030800571004241030758000040000",
        "342179600000400000001650000060305000195000406200000715024893000008060000016724800",
        "193280000500300002700090003230009008906000215000701030000950604000806020082100709",
        "802157409004000200307000605005000300601905804000346000750020063000090000003768100",
        "056000270280000034100000008004803900038507460027000380000000000045000890001395700",
        "004000500061805940570060032600000003705000804800030005980000056023456780000000000",
        "451000326070010050000562000000030000123406789000070000000647000060020030587000264",
        "000000000135704896200568007700000005943000261008000700009000300002000600006951400",
        "000000800012009430345601290078000100000000000004000560026403958031700640009000000",
        "000000000052703680090805010087602130000000000029304870070506040038907250000000000",
        "200050006050239040007000200020010030010702050070040010002000100060384020300020004",
        "752900000800300000100600000900100000374809650006003020001708590000006080000091034",
        "002060500700802004004010300200608007010070020300401006003040100100706005005080700",
        "040900256600002001000000907900027040000608000070150002409000000800200004213005090",
        "013506780000000000084000250200107005100258006400309001076000190000090000000075000",
        "076000180800702009200060004030508040008000600090216030040000020003000900000309000",
        "080060070200908004009020100006010500002000400000372000068000910020040080500080002",
        "001249700050000030700030008200001003300407009407000801100000005070000080009683100",
        "860090000570081000000074200000027410000030000023456780090000060001248900000000000",
        "100000000000009230003807490006508920000000000035702800058106700064200000000000006",
        "030000020900000006004952100005000200006517300007000400008243500009000600020009700",
        "100070008200040009050602030008000600000803000400050007500030006090401080006000200",
        "204000605030000070005080900020905080901000307000403000010040090008000700040508060",
        "150096000700520000009300000047000003360000048800000250000009100000073006000450029",
        "008100000006070000009000500007000230004000109362000800891000400000031900000045700",
        "000000000007906200010000040000000000120345067600000008730000019041000650009402800",
        "153400000642000000000015230000026400000000000014730000087500000000001679000009580",
        "000000000000708000608000504060090080059000420200040007700501002090020070004070600",
        "000004015000030078009100000004206007050000020100805400000008600530070000820300000",
        "100050008050704090009020300000405000460000051008060400001000800000030000040109060",
        "080700900060900300001008040004003070000000000010400800020300600007004080005006010",
        "060807030400000002005000900900000005070603080800000006008000400500000008030508070",
        "001000000020001860300008004400806000000705001503000046650204000000300000004009000",
        "040000250700500008600039000007000080005090700080000400000750009500008006029000070",
        "002400008010070000050000290001008004000305000300200900074000050000060070200001600",
        "000003050200600100800700000500300870600205003089006004000009007001002005020400000",
        "000000000087100065060700038058900000000010000000002410270006040410005670000000000",
        "005300000029000000860000000100004000000097230204800097070000001003700060000052800",
        "080090000040001700300500008004200060809000107070003800600007003001800070000050080",
        "100002009005800000009600740600000490000010000028000003074005800000007200500300006",
        "004600000070010300300800040406000005010000090900000702020003009008090060000007100",
        "000000000000907000013080740080405070095030120000000000900704001030050080002000600",
        "043000000500200000600100350700003004000508000800900007026007005000001008000000940",
        "000000000002800500060320010043010000005402100000090720010067040007005300000000000",
        "000030000700208004000605000064000180200000005300000009012304560000050000000816000",
        "450000000760040000000900062028003500000010000001500890690008000000060084000000031",
        "200040000080002100003700050006000030400090006010000400070008200005300070000010008",
        "003000600020907030800050002070000060009020800040000070300010004090605020005000100",
        "006010000070605000010003000050002000003060005000700018800000960500300200090407000",
        "000000000000843900000725300091570000042390000065000080087000430000009600000000000",
        "027000000900400180000005002001800009030000060700001300600900000053004007000000840",
        "006002004003007000400900800500400092070030000010008600002000058000760000000001400",
        "000078000000300200005000010030010560200000700104500039340020000000050000009400300",
        "000004800000000039024680000002468000000000000000135700000013570690000000005700000",
        "900000120000500030087600045090006000000400050120008760030009000045000003000000000",
        "054000060000100007000082001009004050005000100060900300600470000300008000090000280",
        "005701800200000003000000000900030004040507090300060005000000000400000006007802100",
        "078490000100006000400007000082910000004600890009054002006000008000200040000069700",
        "000070000000301000002000400040008060070060020090402050016000890050000030009183500",
        "000000000001000000002900050003070080004010060085000030546000890730002640000008300",
        "000007800000084300000612000003190000071500000856000000360000002000000014000000530",
        "000064200003100050010000000090023600400500010307000000601092700020000030050000000",
        "012340000400006900000000080000000060005700002060030009090010006008200001000000070",
        "830000000600005200000490080005000070007060900020000100010073000002900007000000054",
        "060010080090020070004008003007004009600500300500600800080030010020040090000000000",
        "120009500034056020000700080000000060000000040500000300048027000001380000000500000",
        "000100000056000780000002000000200005081000640400003000000600000068000390000004000",
        "000000000079350000060070000090060000035840000000003258000006004000002003000009675",
        "000000000000243000001000500070080030010500920040006050090000040006172800000000000",
        "000016000008500400020000037000000083004030100350000000910000020007008600000450000",
        "003700000040000000900085600600020800010000070002090003001360004000000020000002500",
        "000000000004867900050000030020010050000305000007090000800100200300000700076248000",
        "405000607000010000302080504000020000007305800020000030030809020000000000000706000",
        "000000000042900000100000000200000000306400820400605003098001004000007005000000310",
        "005670000040008003000000098000000086000345000270000000590000000600400020000027900",
    ];

    texts:egret.TextField[] = [];
    games:Button[] = [];
    backButton:Button = null;

    static loadScene() {
        new SceneSelect();
    }

    constructor() {
        super();

        this.texts[0] = Util.newTextField("問題選択", Util.width / 20, FontColor, 0.5, 0.05, true, true);
        this.texts.forEach( text =>{ if( text ){ GameObject.baseDisplay.addChild( text ); } });
        
        for( let ix=0 ; ix<GamesCountW ; ix++ ){
            for( let iy=0 ; iy<GamesCountH ; iy++ ){
                let index = ix + iy*GamesCountW;
                if( index >= SceneSelect.sudokuList.length )
                    break;
                let xr = 0.50 + (ix-4) * BoxWpw;
                let yr = 0.50 + (iy-4) * BoxHph;
                let color = Util.getSaveDataNumber( SaveKeyClearTime+index, 0 ) > 0 ? BoxColor : FontColor;
                this.games[ index ] = new Button( ""+(index+1), Util.width/20, BackColor, xr, yr, BoxWpw*0.85, BoxHph*0.85, color, 1.0, -1, true, (btn:Button)=>this.onTapGames(btn), this, index );
            }
        }

        this.backButton = new Button("◀", Util.width/20, BackColor, 0.10, 0.10, BoxWpw, BoxHph, FontColor, 1.0, -1, true, this.onTapBack, this );
    }

	onDestroy(){
        this.texts.forEach( text =>{ if( text ){ text.parent.removeChild( text ); } });
        this.texts = null;
    }

	update(){
	}

    onTapGames( btn:Button ){
        Game.initialGame = btn.keyId;
        Game.initialData = SceneSelect.sudokuList[ btn.keyId ];
        GameObject.transit = ScenePlay.loadScene;
    }
    onTapBack(){
        GameObject.transit = SceneTitle.loadScene;
    }
}