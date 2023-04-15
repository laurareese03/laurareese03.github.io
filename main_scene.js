var MainScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "MainScene" });
    },
    init: function() {
    },
    preload: function() {
    },
    

    create: function() {
        // set up all objects for buying
        this.createAutoClickers();
        this.createBuildings();
        this.createCatInstants();
        this.createCatProgressives();

        //setInterval(this.updateStatsBySecond, 1000);

        // test text display
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
    update: function() {},

    // onclick of cheese
    onClickCheese: function() {
        // increase cheese amount

        // update display value

    },

    // onclick of buying an autoclicker
    onClickBuyAutoClicker: function(clicker) {
        // check if it's unlocked

            // get cost of clicker

            // if enough cheese owned

                // subtract amount of cheese cost from owned

                // increase cheese per second amount

    },

    onClickUpgradeBuilding: function() {

    },

    onClickBuyCatInstant(item) {

    },

    onClickBuyCatProgressive(item) {

    },

    updateStatsBySecond: function() {
        //console.log("hi")
    },

    createAutoClickers: function() {
        const forkAC = new AutoClick(1, 1, 1, 1, true);
        const spoonAC = new AutoClick(1, 1, 1, 1, true);
        const sporkAC = new AutoClick(1, 1, 1, 1, true);
        const shovelAC = new AutoClick(1, 1, 1, 1, true);
        const pickaxeAC = new AutoClick(1, 1, 1, 1, true);
        const jackhammerAC = new AutoClick(1, 1, 1, 1, true);
        const drillAC = new AutoClick(1, 1, 1, 1, true);
        const excavatorAC = new AutoClick(1, 1, 1, 1, true);
        const cheesemineAC = new AutoClick(1, 1, 1, 1, true);
    },

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
        let treatCI = new CatInstant(1, 1);
        let treatpileCI = new CatInstant(1, 1);
        let cheesewheelCI = new CatInstant(1, 1);
        let catnipCI = new CatInstant(1, 1);
    }, 

    createCatProgressives: function() {
        console.log("cat progressives");
        const ballCP = new CatProgressive(1, 1, 1, true);
        const mouseCP = new CatProgressive(1, 1, 1, true);
        const ponytailholderCP = new CatProgressive(1, 1, 1, true);
        const twisttieCP = new CatProgressive(1, 1, 1, true);
        const laserpointerCP = new CatProgressive(1, 1, 1, true);
        const cushionCP = new CatProgressive(1, 1, 1, true);
        const keyboardCP = new CatProgressive(1, 1, 1, true);
        const scratcherCP = new CatProgressive(1, 1, 1, true);
        const treeCP = new CatProgressive(1, 1, 1, true);
    }

});

