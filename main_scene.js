var MainScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "MainScene" });
    },
    init: function() {
    },
    preload: function() {
    },
    /*createAutoClickers: function() {
        const forkAC = new AutoClick(1, 1, 1, 1, True);
        const spoonAC = new AutoClick(1, 1, 1, 1, True);
        const sporkAC = new AutoClick(1, 1, 1, 1, True);
        const shovelAC = new AutoClick(1, 1, 1, 1, True);
        const pickaxeAC = new AutoClick(1, 1, 1, 1, True);
        const jackhammerAC = new AutoClick(1, 1, 1, 1, True);
        const drillAC = new AutoClick(1, 1, 1, 1, True);
        const excavatorAC = new AutoClick(1, 1, 1, 1, True);
        const cheesemineAC = new AutoClick(1, 1, 1, 1, True);
    },*/

    createBuildings: function() {
        const cardboardboxB = new Building(1, 1);
        const catCaveB = new Building(1, 1);
        const shedB = new Building(1, 1);
        const houseB = new Building(1, 1);
        const barnB = new Building(1, 1);
        const studioApartmentComplexB = new Building(1, 1);
        const multibedApartmentComplexB = new Building(1, 1);
        const catopiaB = new Building(1, 1);
    },

    createCatInstants: function() {
        const treatCI = new CatInstant(1, 1);
        const treatpileCI = new CatInstant(1, 1);
        const cheesewheelCI = new CatInstant(1, 1);
        const catnipCI = new CatInstant(1, 1);
    }, 

    createCatProgressives: function() {
        const ballCP = new CatProgressive(1, 1, 1, True);
        const mouseCP = new CatProgressive(1, 1, 1, True);
        const ponytailholderCP = new CatProgressive(1, 1, 1, True);
        const twisttieCP = new CatProgressive(1, 1, 1, True);
        const laserpointerCP = new CatProgressive(1, 1, 1, True);
        const cushionCP = new CatProgressive(1, 1, 1, True);
        const keyboardCP = new CatProgressive(1, 1, 1, True);
        const scratcherCP = new CatProgressive(1, 1, 1, True);
        const treeCP = new CatProgressive(1, 1, 1, True);
    },
    create: function() {
        //this.createAutoClickers();
        this.createBuildings();
        this.createCatInstants();
        this.createCatProgressives();
        var text = this.add.text(
            640, 
            360, 
            "Main Scene", 
            {
                fontSize: 50,
                color: "#000000",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);
    
    },
    update: function() {}



});

