var MainScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "MainScene" });
    },
    init: function() {
    },
    preload: function() {
        // import background photo
        this.load.setBaseURL('https://laurareese03.github.io/');
        this.load.image('space_back', 'assets/space_back2.jpg');
    },

    create: function() {
        // set up background
        const back_img = this.add.image(640, 360, 'space_back').setOrigin(0.5);
        back_img.scale = 0.7

        // set up cheese count
        cheese_amount = 0;
        cheese_per_sec = 0;
        console.log(cheese_amount);
        const test = this.add.text(240, 360, 'test', { fill: '#fff', fontSize: 50 }).setOrigin(0.5);
        test.setInteractive();
        test.on('pointerdown', () => this.onClickCheese() );

        // set up all objects for buying
        this.createAutoClickers();
        this.createBuildings();
        this.createCatInstants();
        this.createCatProgressives();

        //setInterval(this.updateStatsBySecond, 1000);
    
    },
    update: function() {},

    // onclick of cheese
    onClickCheese: function() {
        // increase cheese amount
        cheese_amount += 1;
        // update display value
        console.log(cheese_amount);
    },

    // onclick of buying an autoclicker
    onClickBuyAutoClicker: function(clicker) {
        // check if it's unlocked
        console.log(clicker.is_unlocked);
        if (clicker.is_unlocked) {    
            // get cost of clicker
            console.log(clicker.cost);
            click_cost = clicker.cost;
            // if enough cheese owned
            if (cheese_amount >= click_cost) {
                // subtract amount of cheese cost from owned
                cheese_amount -= click_cost;
                // increase cheese per second amount
                cheese_per_sec += clicker.base_output;
            }
        }
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

