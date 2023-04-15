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

        // set up cat amount
        cat_amount = 0;
        cats_per_sec = 0;

        // Cheese Visual
        const cheeseBtn = this.add.text(640, 200, 'cheese', { fill: '#fff', fontSize: 50 }).setOrigin(0.5);
        cheeseBtn.setInteractive();
        cheeseBtn.on('pointerdown', () => this.onClickCheese() );

        // Stats box
        const statsBox = this.add.text(640, 500, 'stat', { fill: '#fff', fontSize: 50 }).setOrigin(0.5);

        // Autoclickers
        const autoClickers = this.add.text(200, 360, 'autoclicker', { fill: '#fff', fontSize: 50 }).setOrigin(0.5);

        // CatStuff
        const catStuff = this.add.text(1100, 360, 'cats!', { fill: '#fff', fontSize: 50 }).setOrigin(0.5);

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
        console.log(item.cost);
        // get cost of item
        item_cost = item.cost;
        // if enough cheese owned
        if (cheese_amount >= item_cost) {
            // subtract amount of cheese cost from owned
            cheese_amount -= item_cost;
            // increase number of cats
            cat_amount += item.num_cats;
        }
            cat_amount += item.num_cats;
        }
    },

    onClickBuyCatProgressive(item) {
        // check if it's been unlocked
        if (item.is_unlocked) {
            // get cost of item
            item_cost = item.cost;
            // if enough cheese owned
            if (cheese_amount >= item_cost) {
                // subtract amount of cheese cost from owned
                cheese_amount -= item_cost;
                // increase cats per second amount
                
                // update displayed cats per minute

            }
        }
    },

    updateStatsBySecond: function() {
        // add cheese per second to cheese amount
        cheese_amount += cheese_per_sec;
        // update cheese display value

        // add cats per second to cats amount    
        
        // update cat display value
        
    },

    createAutoClickers: function() {
        forkAC = new AutoClick(1, 1, 1, 1, true);
        spoonAC = new AutoClick(1, 1, 1, 1, true);
        sporkAC = new AutoClick(1, 1, 1, 1, true);
        shovelAC = new AutoClick(1, 1, 1, 1, true);
        pickaxeAC = new AutoClick(1, 1, 1, 1, true);
        jackhammerAC = new AutoClick(1, 1, 1, 1, true);
        drillAC = new AutoClick(1, 1, 1, 1, true);
        excavatorAC = new AutoClick(1, 1, 1, 1, true);
        cheesemineAC = new AutoClick(1, 1, 1, 1, true);

        // Autoclickers
        const forkDisplay = this.add.text(50, 125, 'Fork', { fill: '#fff', fontSize: 40 });
        forkDisplay.setInteractive();
        forkDisplay.on('pointerdown', () => this.onClickBuyAutoClicker(forkAC) );

        const spoonDisplay = this.add.text(50, 175, 'Spoon', { fill: '#fff', fontSize: 40 });
        spoonDisplay.setInteractive();
        spoonDisplay.on('pointerdown', () => this.onClickBuyAutoClicker(spoonAC) );

        const sporkDisplay = this.add.text(50, 225, 'Spork', { fill: '#fff', fontSize: 40 });
        sporkDisplay.setInteractive();
        sporkDisplay.on('pointerdown', () => this.onClickBuyAutoClicker(sporkAC) );

        const shovelDisplay = this.add.text(50, 275, 'Shovel', { fill: '#fff', fontSize: 40 });
        shovelDisplay.setInteractive();
        shovelDisplay.on('pointerdown', () => this.onClickBuyAutoClicker(shovelAC) );

        const pickaxeDisplay = this.add.text(50, 325, 'Pickaxe', { fill: '#fff', fontSize: 40 });
        pickaxeDisplay.setInteractive();
        pickaxeDisplay.on('pointerdown', () => this.onClickBuyAutoClicker(pickaxeAC) );

        const jackhammerDisplay = this.add.text(50, 375, 'Jackhammer', { fill: '#fff', fontSize: 40 });
        jackhammerDisplay.setInteractive();
        jackhammerDisplay.on('pointerdown', () => this.onClickBuyAutoClicker(jackhammerAC) );

        const drillDisplay = this.add.text(50, 425, 'Drill', { fill: '#fff', fontSize: 40 });
        drillDisplay.setInteractive();
        drillDisplay.on('pointerdown', () => this.onClickBuyAutoClicker(drillAC) );

        const excavatorDisplay = this.add.text(50, 475, 'Excavator', { fill: '#fff', fontSize: 40 });
        excavatorDisplay.setInteractive();
        excavatorDisplay.on('pointerdown', () => this.onClickBuyAutoClicker(excavatorAC) );

        const cheesemineDisplay = this.add.text(50, 525, 'Cheese Mine', { fill: '#fff', fontSize: 40 });
        cheesemineDisplay.setInteractive();
        cheesemineDisplay.on('pointerdown', () => this.onClickBuyAutoClicker(cheesemineAC) );
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
        const treatDisplay = this.add.text(1100, 100, 'Treat', { fill: '#fff', fontSize: 40 }).setOrigin(0.5);
        treatDisplay.setInteractive();
        treatDisplay.on('pointerdown', () => this.onClickBuyCatInstant(treatCI) );

        let treatpileCI = new CatInstant(1, 1);
        const treatpileDisplay = this.add.text(1100, 150, 'Treat Pile', { fill: '#fff', fontSize: 40 }).setOrigin(0.5);
        treatpileDisplay.setInteractive();
        treatpileDisplay.on('pointerdown', () => this.onClickBuyCatInstant(treatpileCI) );        

        let cheesewheelCI = new CatInstant(1, 1);
        const cheesewheelDisplay = this.add.text(1100, 200, 'Cheese Wheel', { fill: '#fff', fontSize: 40 }).setOrigin(0.5);
        cheesewheelDisplay.setInteractive();
        cheesewheelDisplay.on('pointerdown', () => this.onClickBuyCatInstant(cheesewheelCI) );

        let catnipCI = new CatInstant(1, 1);
        const catnipDisplay = this.add.text(1100, 250, 'Catnip', { fill: '#fff', fontSize: 40 }).setOrigin(0.5);
        catnipDisplay.setInteractive();
        catnipDisplay.on('pointerdown', () => this.onClickBuyCatInstant(catnipCI) );

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

