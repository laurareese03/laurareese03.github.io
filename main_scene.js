// don't let cheese Counter go below 0!!!!!

var cheeseCounter, catCounter, autoclick_tiers, next_autoclick_tier_index;

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
        this.load.image('moon', 'assets/moon.png');
        this.load.image('button', 'assets/Button.png');
    },

    create: function() {
        // set up background
        const back_img = this.add.image(640, 360, 'space_back').setOrigin(0.5);
        back_img.scale = 0.7

        // set up cheese count
        cheese_amount = 0;
        cheese_per_sec = 0;

        // set up cat amount
        cat_amount = 1;
        cats_per_sec = 0;

        // Cheese Visual
        const moon_img = this.add.image(640, 200, 'moon').setOrigin(0.5);
        const cheeseBtn = this.add.text(640, 200, 'cheese', { fill: '#fff', fontSize: 50 }).setOrigin(0.5);

        cheeseBtn.setInteractive();
        cheeseBtn.on('pointerdown', () => this.onClickCheese() );

        // building visual
        const upgradebuildingBtn = this.add.text(640, 300, 'upgrade building', { fill: '#fff', fontSize: 50 }).setOrigin(0.5);
        upgradebuildingBtn.setInteractive();
        upgradebuildingBtn.on('pointerdown', () => this.onClickUpgradeBuilding() );

        cheeseCounter = this.add.text(640, 250, cheese_amount, { fill: '#fff', fontSize: 50 }).setOrigin(0.5);
        catCounter = this.add.text(640, 450, cat_amount, { fill: '#fff', fontSize: 50 }).setOrigin(0.5);

        // Stats box
        const statsBox = this.add.text(640, 500, 'stat', { fill: '#fff', fontSize: 50 }).setOrigin(0.5);

        // Autoclickers
        const autoClickers = this.add.text(200, 360, 'autoclicker', { fill: '#fff', fontSize: 50 }).setOrigin(0.5);

        // CatStuff
        const catStuff = this.add.text(1100, 360, 'cats!', { fill: '#fff', fontSize: 50 }).setOrigin(0.5);

        cheeseCounter = this.add.text(640, 100, cheese_amount, { fill: '#fff', fontSize: 50 }).setOrigin(0.5);
        catCounter = this.add.text(640, 600, cat_amount, { fill: '#fff', fontSize: 50 }).setOrigin(0.5);

        // set up all objects for buying
        this.createAutoClickers();
        this.createBuildings();
        this.createCatInstants();
        this.createCatProgressives();

        autoclick_tiers = [1,3,7,15,30,50,75,100,150]
        autoclickers = [forkAC, spoonAC, sporkAC,  shovelAC, pickaxeAC, jackhammerAC, drillAC, excavatorAC, cheesemineAC]
        next_autoclick_tier_index = 1;

        setInterval(this.updateStatsBySecond, 1000);
    
    },
    update: function() {
      cheeseCounter.setText(cheese_amount);
      catCounter.setText(cat_amount);
    },

    // onclick of cheese
    onClickCheese: function() {
        // increase cheese amount
        cheese_amount += 1;
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
        // get the next building object
        next_building = buildings[curr_building + 1];
        // check enough cheese to buy
        if (cheese_amount >= next_building.cost) {
            // move current building location
            curr_building += 1;
            // update cat max
            max_cats = curr_building.cat_limit;
        }
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
                cats_per_sec += item.cats_per_sec;
                // update displayed cats per minute

            }
        }
      }
    },

    updateStatsBySecond: function() {
        // add cheese per second to cheese amount
        cheese_amount += cheese_per_sec;
        // add cats per second to cats amount    
        cat_amount += cats_per_sec;
        console.log(cat_amount, autoclick_tiers[next_autoclick_tier_index])
        if (cat_amount >= autoclick_tiers[next_autoclick_tier_index]) {
          console.log(autoclickers[next_autoclick_tier_index])
          autoclickers[next_autoclick_tier_index].setUnlock()
          next_autoclick_tier_index += 1;
        }
        
    },

    createAutoClickers: function() {
        forkAC = new AutoClick(1, autoclick_tiers[0], 1, 0, true);
        spoonAC = new AutoClick(3, autoclick_tiers[1], 1, 0, false);
        sporkAC = new AutoClick(5, autoclick_tiers[2], 1, 0, false);
        shovelAC = new AutoClick(10, autoclick_tiers[3], 1, 0, false);
        pickaxeAC = new AutoClick(50, autoclick_tiers[4], 1, 0, false);
        jackhammerAC = new AutoClick(100, autoclick_tiers[5], 1, 0, false);
        drillAC = new AutoClick(500, autoclick_tiers[6], 1, 0, false);
        excavatorAC = new AutoClick(1000, autoclick_tiers[7], 1, 0, false);
        cheesemineAC = new AutoClick(5000, autoclick_tiers[8], 1, 0, false);

        // Autoclickers
        const button_fork = this.add.image(100, 150, 'button');
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

        curr_building = 0;
        
        const cardboardboxB = new Building(1, 1);
        const catCaveB = new Building(1, 3);
        const shedB = new Building(1, 50);
        const houseB = new Building(1, 250);
        const barnB = new Building(1, 500);
        const studioApartmentComplexB = new Building(1, 1000);
        const multibedApartmentComplexB = new Building(1, 2000);
        const catopiaB = new Building(1, 10000);

        buildings = [];
        buildings.push(cardboardboxB, catCaveB, shedB, houseB, barnB, studioApartmentComplexB, multibedApartmentComplexB, catopiaB);
    },

    createCatInstants: function() {
        let treatCI = new CatInstant(1, 1);   
        const treatDisplay = this.add.text(1100, 50, 'Treat', { fill: '#fff', fontSize: 40 }).setOrigin(0.5);
        treatDisplay.setInteractive();
        treatDisplay.on('pointerdown', () => this.onClickBuyCatInstant(treatCI) );

        let treatpileCI = new CatInstant(1, 1);
        const treatpileDisplay = this.add.text(1100, 100, 'Treat Pile', { fill: '#fff', fontSize: 40 }).setOrigin(0.5);
        treatpileDisplay.setInteractive();
        treatpileDisplay.on('pointerdown', () => this.onClickBuyCatInstant(treatpileCI) );        

        let cheesewheelCI = new CatInstant(1, 1);
        const cheesewheelDisplay = this.add.text(1100, 150, 'Cheese Wheel', { fill: '#fff', fontSize: 40 }).setOrigin(0.5);
        cheesewheelDisplay.setInteractive();
        cheesewheelDisplay.on('pointerdown', () => this.onClickBuyCatInstant(cheesewheelCI) );

        let catnipCI = new CatInstant(1, 1);
        const catnipDisplay = this.add.text(1100, 200, 'Catnip', { fill: '#fff', fontSize: 40 }).setOrigin(0.5);
        catnipDisplay.setInteractive();
        catnipDisplay.on('pointerdown', () => this.onClickBuyCatInstant(catnipCI) );

    }, 

    createCatProgressives: function() {
        const ballCP = new CatProgressive(1, 0.033, 0, true);
        const ballDisplay = this.add.text(1100, 250, 'Ball', { fill: '#fff', fontSize: 40 }).setOrigin(0.5);
        ballDisplay.setInteractive();
        ballDisplay.on('pointerdown', () => this.onClickBuyCatProgressive(ballCP) );

        const mouseCP = new CatProgressive(1, 0.083, 0, true);
        const mouseDisplay = this.add.text(1100, 300, 'Mouse', { fill: '#fff', fontSize: 40 }).setOrigin(0.5);
        mouseDisplay.setInteractive();
        mouseDisplay.on('pointerdown', () => this.onClickBuyCatProgressive(mouseCP) );

        const ponytailholderCP = new CatProgressive(1, 0.17, 0, true);
        const ponytailholderDisplay = this.add.text(1100, 350, 'Ponytail Holder', { fill: '#fff', fontSize: 40 }).setOrigin(0.5);
        ponytailholderDisplay.setInteractive();
        ponytailholderDisplay.on('pointerdown', () => this.onClickBuyCatProgressive(ponytailholderCP) );

        const twisttieCP = new CatProgressive(1, 1, 0.33, true);
        const twisttieDisplay = this.add.text(1100, 400, 'Twist Tie', { fill: '#fff', fontSize: 40 }).setOrigin(0.5);
        twisttieDisplay.setInteractive();
        twisttieDisplay.on('pointerdown', () => this.onClickBuyCatProgressive(twisttieCP) );

        const laserpointerCP = new CatProgressive(1, 0.5, 0, true);
        const laserpointerDisplay = this.add.text(1100, 450, 'Laser Pointer', { fill: '#fff', fontSize: 40 }).setOrigin(0.5);
        laserpointerDisplay.setInteractive();
        laserpointerDisplay.on('pointerdown', () => this.onClickBuyCatProgressive(laserpointerCP) );

        const cushionCP = new CatProgressive(1, 1, 0.83, true);
        const cushionDisplay = this.add.text(1100, 500, 'Cushion', { fill: '#fff', fontSize: 40 }).setOrigin(0.5);
        cushionDisplay.setInteractive();
        cushionDisplay.on('pointerdown', () => this.onClickBuyCatProgressive(cushionCP) );

        const keyboardCP = new CatProgressive(1, 1, 1.67, true);
        const keyboardDisplay = this.add.text(1100, 550, 'Keyboard', { fill: '#fff', fontSize: 40 }).setOrigin(0.5);
        keyboardDisplay.setInteractive();
        keyboardDisplay.on('pointerdown', () => this.onClickBuyCatProgressive(keyboardCP) );

        const scratcherCP = new CatProgressive(1, 1, 2.5, true);
        const scratcherDisplay = this.add.text(1100, 600, 'Scratcher', { fill: '#fff', fontSize: 40 }).setOrigin(0.5);
        scratcherDisplay.setInteractive();
        scratcherDisplay.on('pointerdown', () => this.onClickBuyCatProgressive(scratcherCP) );

        const treeCP = new CatProgressive(1, 1, 3.33, true);
        const treeDisplay = this.add.text(1100, 650, 'Tree', { fill: '#fff', fontSize: 40 }).setOrigin(0.5);
        treeDisplay.setInteractive();
        treeDisplay.on('pointerdown', () => this.onClickBuyCatProgressive(treeCP) );


    }

});

