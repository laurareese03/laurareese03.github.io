// don't let cheese Counter go below 0!!!!!

var cheeseCounter, catCounter, autoclick_tiers, autoclickers, next_autoclick_tier_index;
var forkAC, spoonAC, sporkAC,  shovelAC, pickaxeAC, jackhammerAC, drillAC, excavatorAC, cheesemineAC
var upgradebuildingBtn, upgradebuildingPrice;
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
        this.load.image('cat', 'assets/cat.png');
        // autoclickers
        this.load.image('fork', 'assets/fork.png');
        this.load.image('spoon', 'assets/spoon.png');
        this.load.image('shovel', 'assets/shovel.png');
        this.load.image('pickaxe', 'assets/pickaxe.png');
        this.load.image('jackhammer', 'assets/jackhammer.png');
        this.load.image('drill', 'assets/drill.png');
        this.load.image('excavator', 'assets/excavator.png');
        this.load.image('cheesemine', 'assets/cheesemine.png');
        // locked autoclickers
        this.load.image('lockedspoon', 'assets/spoon_locked.png');
        this.load.image('lockedshovel', 'assets/shovel_locked.png');
        this.load.image('lockedpick', 'assets/pickaxe_pickaxe.png');
        this.load.image('lockedjack', 'assets/jackhammer_locked.png');
        this.load.image('lockeddrill', 'assets/drill_locked.png');
        this.load.image('lockedexca', 'assets/excavator_locked.png');
        this.load.image('lockedmine', 'assets/cheesemine_locked.png');
        // building upgrades
        this.load.image('cardboardbox', 'assets/cardboard_box.png');
        this.load.image('cathouse', 'assets/cathouse.png');
        this.load.image('shed', 'assets/Shed.png');
        this.load.image('house', 'assets/House.png');
        this.load.image('barn', 'assets/barn.png');
        this.load.image('apartment', 'assets/Apartment.png');
        this.load.image('catopia', 'assets/catopia.png');
        // cat items - progressive
        this.load.image('ball', 'assets/ball.png');
        this.load.image('mouse', 'assets/mouse.png');
        this.load.image('hairtie', 'assets/mouse.png');
        this.load.image('twisttie', 'assets/twist_tie.png');
        this.load.image('laserpointer', 'assets/laser_pointer.png');
        this.load.image('cushion', 'assets/cushion.png');
        this.load.image('keyboard', 'assets/keyboard.png');
        this.load.image('scratcher', 'assets/scratcher.png');
        this.load.image('tree', 'assets/tree.png');
        // cat items - instant
        this.load.image('treat', 'assets/treat.png');
        this.load.image('treatpile', 'assets/treat_pile.png');
        this.load.image('cheesewheel', 'assets/cheese_wheel.png');
        this.load.image('catnip', 'assets/catnip.png');
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
      max_cats = 1;

      // Cheese Visual
      const moon_img = this.add.image(640, 300, 'moon').setOrigin(0.5);
      moon_img.scale = 3.5; 

      // cat visual
      this.add.image(640, 125, 'cat').setOrigin(0.5);

      moon_img.setInteractive();
      moon_img.on('pointerdown', () => this.onClickCheese() );

      autoclick_tiers = [1,3,7,15,30,50,75,100,150]
      
      // set up all objects for buying
      this.createAutoClickers();
      this.createBuildings();
      this.createCatInstants();
      this.createCatProgressives();

      // building visual
      upgradebuildingBtn = this.add.image(640, 650, buildings[curr_building].image, { fill: '#fff', fontSize: 50, fontFamily: "American Typewriter" }).setOrigin(0.5);
      upgradebuildingBtn.setInteractive();
      upgradebuildingBtn.on('pointerdown', () => this.onClickUpgradeBuilding() );

      // building visual
      upgradebuildingBtn = this.add.image(640, 650, buildings[curr_building].image, { fill: '#fff', fontSize: 50, fontFamily: "American Typewriter" }).setOrigin(0.5);
      upgradebuildingBtn.setInteractive();
      upgradebuildingBtn.on('pointerdown', () => this.onClickUpgradeBuilding() );

      // building visual
      upgradebuildingBtn = this.add.image(640, 650, buildings[curr_building].image, { fill: '#fff', fontSize: 50, fontFamily: "American Typewriter" }).setOrigin(0.5);
      upgradebuildingBtn.setInteractive();
      upgradebuildingBtn.on('pointerdown', () => this.onClickUpgradeBuilding() );
      upgradebuildingPrice = this.add.text(720, 672, buildings[curr_building].cost, { fill: '#000', fontSize: 15, fontFamily: "American Typewriter" }).setOrigin(0.5);

      cheeseCounter = this.add.text(640, 515, "Cheese: " + cheese_amount + " (" + cheese_per_sec + "/sec)", { fill: '#fff', fontSize: 40, fontFamily: "American Typewriter" }).setOrigin(0.5);
      catCounter = this.add.text(640, 35, "Cats: " + Math.floor(cat_amount) + " (" + Math.round(cats_per_sec*60) + "/min)", { fill: '#fff', fontSize: 40, fontFamily: "American Typewriter" }).setOrigin(0.5);
      autoclickers = [forkAC, spoonAC, sporkAC,  shovelAC, pickaxeAC, jackhammerAC, drillAC, excavatorAC, cheesemineAC]
      next_autoclick_tier_index = 1;

      setInterval(this.updateStatsBySecond, 1000);
    
    },
    update: function() {
      cheeseCounter.setText("Cheese: " + cheese_amount + " (" + cheese_per_sec + "/sec)");
      catCounter.setText("Cats: " + Math.floor(cat_amount) + " (" + Math.round(cats_per_sec*60) + "/min)");
      // autoclicker counters
      forkCounter.setText(forkAC.owned);
      spoonCounter.setText(spoonAC.owned);
      sporkCounter.setText(sporkAC.owned);
      shovelCounter.setText(shovelAC.owned);
      pickaxeCounter.setText(pickaxeAC.owned);
      jackhammerCounter.setText(jackhammerAC.owned);
      drillCounter.setText(drillAC.owned);
      excavatorCounter.setText(excavatorAC.owned);
      cheesemineCounter.setText(cheesemineAC.owned);

      // cat progressive counters
      ballCounter.setText(ballCP.owned);
      mouseCounter.setText(mouseCP.owned);
      hairtieCounter.setText(hairtieCP.owned);
      twisttieCounter.setText(twisttieCP.owned);
      laserpointerCounter.setText(laserpointerCP.owned);
      cushionCounter.setText(cushionCP.owned);
      keyboardCounter.setText(keyboardCP.owned);
      scratcherCounter.setText(scratcherCP.owned);
      treeCounter.setText(treeCP.owned);
      upgradebuildingBtn.setTexture(buildings[curr_building].image);
      upgradebuildingPrice.setText(buildings[curr_building].cost);
    },

    // onclick of cheese
    onClickCheese: function() {
        // increase cheese amount
        cheese_amount += 1;
    },

    // onclick of buying an autoclicker
    onClickBuyAutoClicker: function(clicker) {
        console.log("auto", forkAC.owned);
        // check if it's unlocked
        if (clicker.is_unlocked) {    
            // get cost of clicker
            click_cost = clicker.cost;
            // if enough cheese owned
            if (cheese_amount >= click_cost) {
                // subtract amount of cheese cost from owned
                cheese_amount -= click_cost;
                // increase cheese per second amount
                cheese_per_sec += clicker.base_output;
                // increase owned number of autoclicker
                clicker.owned += 1;
            }
        }
    },

    onClickUpgradeBuilding: function() {
        console.log(curr_building, buildings[curr_building], max_cats)
        // get the next building object
        next_building = buildings[curr_building + 1];
        // check enough cheese to buy
        if (cheese_amount >= next_building.cost) {
            // remove funds
            cheese_amount -= next_building.cost;
            // move current building location
            curr_building += 1;
            // update cat max
            max_cats = buildings[curr_building].cat_limit;
        }
    },

    onClickBuyCatInstant(item) {
        console.log(item.cost);
        // get cost of item
        item_cost = item.cost;
        // if enough cheese owned and enough space for cats
        if (cheese_amount >= item_cost && cat_amount < max_cats) {
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
        // if enough cheese owned and space for cats
        if (cheese_amount >= item_cost & cat_amount < max_cats) {
          // subtract amount of cheese cost from owned
          cheese_amount -= item_cost;
          // increase cats per second amount
          cats_per_sec += item.cats_per_sec;
          // update displayed cats per minute

          // update owned of this item
          item.owned += 1;
        }
      }
    },

    updateStatsBySecond: function() {
        // add cheese per second to cheese amount
        cheese_amount += cheese_per_sec;
        // add cats per second to cats amount  
        if (cat_amount < max_cats)  
          cat_amount += cats_per_sec;
        console.log(cat_amount, autoclick_tiers[next_autoclick_tier_index])
        if (cat_amount >= autoclick_tiers[next_autoclick_tier_index]) {
          console.log(autoclickers[next_autoclick_tier_index], 'blah')
          autoclickers[next_autoclick_tier_index].is_unlocked(true);
          next_autoclick_tier_index += 1;
        }
        
    },

    createAutoClickers: function() {
        forkAC = new AutoClick(1, autoclick_tiers[0], 1, 0, true);
        spoonAC = new AutoClick(3, autoclick_tiers[1], 5, 0, false);
        sporkAC = new AutoClick(5, autoclick_tiers[2], 10, 0, false);
        shovelAC = new AutoClick(10, autoclick_tiers[3], 20, 0, false);
        pickaxeAC = new AutoClick(50, autoclick_tiers[4], 50, 0, false);
        jackhammerAC = new AutoClick(100, autoclick_tiers[5], 75, 0, false);
        drillAC = new AutoClick(500, autoclick_tiers[6], 1, 0, false);
        excavatorAC = new AutoClick(1000, autoclick_tiers[7], 150, 0, false);
        cheesemineAC = new AutoClick(5000, autoclick_tiers[8], 250, 0, false);

        // FORK
        forkCounter = this.add.text(35, 60, forkAC.owned, { fill: '#fff', fontSize: 35, fontFamily: "American Typewriter" }).setOrigin(0.5);
        forkCost = this.add.text(290, 45, forkAC.cost, { fill: '#fff', fontSize: 30, fontFamily: "American Typewriter" });
        const fork_cheese = this.add.image(317, 60, 'moon').setOrigin(0.5);
        fork_cheese.scale = 0.25; 
        const forkDisplay = this.add.image(175, 60, 'fork').setOrigin(0.5);
        forkDisplay.scale = 1.4;
        forkDisplay.setInteractive();
        forkDisplay.on('pointerdown', () => this.onClickBuyAutoClicker(forkAC) );

        // SPOON
        spoonCounter = this.add.text(35, 135, spoonAC.owned, { fill: '#fff', fontSize: 35, fontFamily: "American Typewriter" }).setOrigin(0.5);
        spoonCost = this.add.text(290, 120, spoonAC.cost, { fill: '#fff', fontSize: 30, fontFamily: "American Typewriter" });
        const spoon_cheese = this.add.image(320, 135, 'moon').setOrigin(0.5);
        spoon_cheese.scale = 0.25; 
        const spoonDisplay = this.add.image(175, 135, 'lockedspoon').setOrigin(0.5);
        spoonDisplay.scale = 1.4;
        spoonDisplay.setInteractive();
        spoonDisplay.on('pointerdown', () => this.onClickBuyAutoClicker(spoonAC) );

        // SPORK
        sporkCounter = this.add.text(35, 210, sporkAC.owned, { fill: '#fff', fontSize: 35, fontFamily: "American Typewriter" }).setOrigin(0.5);
        sporkCost = this.add.text(290, 195, sporkAC.cost, { fill: '#fff', fontSize: 30, fontFamily: "American Typewriter" })
        const spork_cheese = this.add.image(320, 210, 'moon').setOrigin(0.5);
        spork_cheese.scale = 0.25; 
        const sporkDisplay = this.add.image(175, 210, 'lockedspoon').setOrigin(0.5);
        sporkDisplay.scale = 1.4;
        sporkDisplay.setInteractive();
        sporkDisplay.on('pointerdown', () => this.onClickBuyAutoClicker(sporkAC) ).setOrigin(0.5);

        // SHOVEL
        shovelCounter = this.add.text(35, 285, shovelAC.owned, { fill: '#fff', fontSize: 35, fontFamily: "American Typewriter" }).setOrigin(0.5);
        shovelCost = this.add.text(290, 270, shovelAC.cost, { fill: '#fff', fontSize: 30, fontFamily: "American Typewriter" });
        const shovel_cheese = this.add.image(335, 285, 'moon').setOrigin(0.5);
        shovel_cheese.scale = 0.25; 
        const shovelDisplay = this.add.image(175, 285, 'lockedshovel').setOrigin(0.5);
        shovelDisplay.scale = 1.4;
        shovelDisplay.setInteractive();
        shovelDisplay.on('pointerdown', () => this.onClickBuyAutoClicker(shovelAC) );
        spoonDisplay.scale = 1.4;

        // PICKAXE
        pickaxeCounter = this.add.text(35, 360, pickaxeAC.owned, { fill: '#fff', fontSize: 35, fontFamily: "American Typewriter" }).setOrigin(0.5);
        pickaxeCost = this.add.text(290, 345, pickaxeAC.cost, { fill: '#fff', fontSize: 30, fontFamily: "American Typewriter" });
        const pickaxe_cheese = this.add.image(335, 360, 'moon').setOrigin(0.5);
        pickaxe_cheese.scale = 0.25; 
        const pickaxeDisplay = this.add.image(175, 360, 'lockedpick').setOrigin(0.5);
        pickaxeDisplay.scale = 1.4;
        pickaxeDisplay.setInteractive();
        pickaxeDisplay.on('pointerdown', () => this.onClickBuyAutoClicker(pickaxeAC) );

        // JACKHAMMER
        jackhammerCounter = this.add.text(35, 435, jackhammerAC.owned, { fill: '#fff', fontSize: 35, fontFamily: "American Typewriter" }).setOrigin(0.5);
        jackhammerCost = this.add.text(290, 420, jackhammerAC.cost, { fill: '#fff', fontSize: 30, fontFamily: "American Typewriter" });
        const jackhammer_cheese = this.add.image(350, 435, 'moon').setOrigin(0.5);
        jackhammer_cheese.scale = 0.25; 
        const jackhammerDisplay = this.add.image(175, 435, 'lockedjack').setOrigin(0.5);
        jackhammerDisplay.scale = 1.4;
        jackhammerDisplay.setInteractive();
        jackhammerDisplay.on('pointerdown', () => this.onClickBuyAutoClicker(jackhammerAC) ).setOrigin(0.5);

        // DRILL
        drillCounter = this.add.text(35, 510, drillAC.owned, { fill: '#fff', fontSize: 35, fontFamily: "American Typewriter" }).setOrigin(0.5);
        drillCost = this.add.text(290, 495, drillAC.cost, { fill: '#fff', fontSize: 30, fontFamily: "American Typewriter" });
        const drill_cheese = this.add.image(350, 510, 'moon').setOrigin(0.5);
        drill_cheese.scale = 0.25; 
        const drillDisplay = this.add.image(175, 510, 'lockeddrill').setOrigin(0.5);
        drillDisplay.scale = 1.4;
        drillDisplay.setInteractive();
        drillDisplay.on('pointerdown', () => this.onClickBuyAutoClicker(drillAC) ).setOrigin(0.5);

        // EXCAVATOR
        excavatorCounter = this.add.text(35, 585, excavatorAC.owned, { fill: '#fff', fontSize: 35, fontFamily: "American Typewriter" }).setOrigin(0.5);
        excavatorCost = this.add.text(290, 570, excavatorAC.cost, { fill: '#fff', fontSize: 30, fontFamily: "American Typewriter" });
        const excavator_cheese = this.add.image(365, 585, 'moon').setOrigin(0.5);
        excavator_cheese.scale = 0.25; 
        const excavatorDisplay = this.add.image(175, 585, 'lockedexca').setOrigin(0.5);
        excavatorDisplay.scale = 1.4;
        excavatorDisplay.setInteractive();
        excavatorDisplay.on('pointerdown', () => this.onClickBuyAutoClicker(excavatorAC) ).setOrigin(0.5);

        // CHEESE MINE
        cheesemineCounter = this.add.text(35, 660, cheesemineAC.owned, { fill: '#fff', fontSize: 35, fontFamily: "American Typewriter" }).setOrigin(0.5);
        cheesemineCost = this.add.text(290, 645, cheesemineAC.cost, { fill: '#fff', fontSize: 30, fontFamily: "American Typewriter" });
        const cheesemine_cheese = this.add.image(365, 660, 'moon').setOrigin(0.5);
        cheesemine_cheese.scale = 0.25; 
        const cheesemineDisplay = this.add.image(175, 660, 'lockedmine').setOrigin(0.5);
        cheesemineDisplay.scale = 1.4;
        cheesemineDisplay.setInteractive();
        cheesemineDisplay.on('pointerdown', () => this.onClickBuyAutoClicker(cheesemineAC) ).setOrigin(0.5);
    },

    createBuildings: function() {
        curr_building = 0;
        
        const cardboardboxB = new Building(1, 1, 'cardboardbox');
        const catCaveB = new Building(1, 10, 'cathouse');
        const shedB = new Building(1, 100, 'shed');
        const houseB = new Building(1, 500, 'house');
        const barnB = new Building(1, 1000, 'barn');
        const apartmentB = new Building(1, 5000, 'apartment');
        const catopiaB = new Building(1, 15000, 'catopia');

        buildings = [];
        buildings.push(cardboardboxB, catCaveB, shedB, houseB, barnB, apartmentB, catopiaB);
    },

    createCatInstants: function() {
        // TREAT
        treatCI = new CatInstant(5, 1);   
        const treatDisplay = this.add.image(400, 60, 'treat').setOrigin(0.5);
        treatDisplay.scale = 1.4;
        treatDisplay.setInteractive();
        treatDisplay.on('pointerdown', () => this.onClickBuyCatInstant(treatCI) );

        // TREAT PILE
        treatpileCI = new CatInstant(25, 5);
        const treatpileDisplay = this.add.image(400, 135, 'treatpile').setOrigin(0.5);
        treatpileDisplay.scale = 1.4;
        treatpileDisplay.setInteractive();
        treatpileDisplay.on('pointerdown', () => this.onClickBuyCatInstant(treatpileCI) );        

        // CHEESE WHEEL
        cheesewheelCI = new CatInstant(100, 15);
        const cheesewheelDisplay = this.add.image(880, 60, 'cheesewheel', { fill: '#fff', fontSize: 40 }).setOrigin(0.5);
        cheesewheelDisplay.scale = 1.4;
        cheesewheelDisplay.setInteractive();
        cheesewheelDisplay.on('pointerdown', () => this.onClickBuyCatInstant(cheesewheelCI) );

        // CATNIP
        catnipCI = new CatInstant(200, 30);
        const catnipDisplay = this.add.image(880, 135, 'catnip', { fill: '#fff', fontSize: 40 }).setOrigin(0.5);
        catnipDisplay.scale = 1.4;
        catnipDisplay.setInteractive();
        catnipDisplay.on('pointerdown', () => this.onClickBuyCatInstant(catnipCI) );

    }, 

    createCatProgressives: function() {
        // BALL
        ballCP = new CatProgressive(0, 1, 0.033, 0, true);
        console.log(ballCP)
        ballCounter = this.add.text(1245, 60, ballCP.owned, { fill: '#fff', fontSize: 35, fontFamily: "American Typewriter" }).setOrigin(0.5);
        
        ballCost = this.add.text(957, 45, ballCP.cost, { fill: '#fff', fontSize: 30, fontFamily: "American Typewriter" });
        const ball_cheese = this.add.image(985, 60, 'moon').setOrigin(0.5);
        ball_cheese.scale = 0.25; 
        const ballDisplay = this.add.image(1110, 60, 'ball').setOrigin(0.5);
        ballDisplay.scale = 1.4;
        ballDisplay.setInteractive();
        ballDisplay.on('pointerdown', () => this.onClickBuyCatProgressive(ballCP) );

        // MOUSE
        mouseCP = new CatProgressive(0, 15, 0.083, 0, true);
        mouseCounter = this.add.text(1245, 135, mouseCP.owned, { fill: '#fff', fontSize: 35, fontFamily: "American Typewriter" }).setOrigin(0.5);
        mouseCost = this.add.text(940, 120, mouseCP.cost, { fill: '#fff', fontSize: 30, fontFamily: "American Typewriter" });
        const mouse_cheese = this.add.image(985, 135, 'moon').setOrigin(0.5);
        mouse_cheese.scale = 0.25; 
        const mouseDisplay = this.add.image(1110, 135, 'mouse').setOrigin(0.5);
        mouseDisplay.scale = 1.4;
        mouseDisplay.setInteractive();
        mouseDisplay.on('pointerdown', () => this.onClickBuyCatProgressive(mouseCP) );

        // HAIR TIE
        hairtieCP = new CatProgressive(0, 50, 0.17, 0, true);
        hairtieCounter = this.add.text(1245, 210, hairtieCP.owned, { fill: '#fff', fontSize: 35, fontFamily: "American Typewriter" }).setOrigin(0.5);
        hairtieCost = this.add.text(940, 195, hairtieCP.cost, { fill: '#fff', fontSize: 30, fontFamily: "American Typewriter" });
        const hairtie_cheese = this.add.image(985, 210, 'moon').setOrigin(0.5);
        hairtie_cheese.scale = 0.25; 
        const hairtieDisplay = this.add.image(1110, 210, 'hairtie').setOrigin(0.5);
        hairtieDisplay.scale = 1.4;
        hairtieDisplay.setInteractive();
        hairtieDisplay.on('pointerdown', () => this.onClickBuyCatProgressive(hairtieCP) );

        // TWIST TIE
        twisttieCP = new CatProgressive(0, 100, 1, 0.33, true);
        twisttieCounter = this.add.text(1245, 285, twisttieCP.owned, { fill: '#fff', fontSize: 35, fontFamily: "American Typewriter" }).setOrigin(0.5);
        twisttieCost = this.add.text(925, 270, twisttieCP.cost, { fill: '#fff', fontSize: 30, fontFamily: "American Typewriter" });
        const twisttie_cheese = this.add.image(985, 285, 'moon').setOrigin(0.5);
        twisttie_cheese.scale = 0.25; 
        const twisttieDisplay = this.add.image(1110, 285, 'twisttie').setOrigin(0.5);
        twisttieDisplay.scale = 1.4;
        twisttieDisplay.setInteractive();
        twisttieDisplay.on('pointerdown', () => this.onClickBuyCatProgressive(twisttieCP) );

        // LASER POINTER
        laserpointerCP = new CatProgressive(0, 400, 0.5, 0, true);
        laserpointerCounter = this.add.text(1245, 360, laserpointerCP.owned, { fill: '#fff', fontSize: 35, fontFamily: "American Typewriter" }).setOrigin(0.5);
        laserpointerCost = this.add.text(925, 345, laserpointerCP.cost, { fill: '#fff', fontSize: 30, fontFamily: "American Typewriter" });
        const laserpointer_cheese = this.add.image(985, 360, 'moon').setOrigin(0.5);
        laserpointer_cheese.scale = 0.25; 
        const laserpointerDisplay = this.add.image(1110, 360, 'laserpointer').setOrigin(0.5);
        laserpointerDisplay.scale = 1.4;
        laserpointerDisplay.setInteractive();
        laserpointerDisplay.on('pointerdown', () => this.onClickBuyCatProgressive(laserpointerCP) );

        // CUSHION
        cushionCP = new CatProgressive(0, 750, 0.83, 0, true);
        cushionCounter = this.add.text(1245, 435, cushionCP.owned, { fill: '#fff', fontSize: 35, fontFamily: "American Typewriter" }).setOrigin(0.5);
        cushionCost = this.add.text(925, 420, cushionCP.cost, { fill: '#fff', fontSize: 30, fontFamily: "American Typewriter" });
        const cushion_cheese = this.add.image(985, 435, 'moon').setOrigin(0.5);
        cushion_cheese.scale = 0.25; 
        const cushionDisplay = this.add.image(1110, 435, 'cushion').setOrigin(0.5);
        cushionDisplay.scale = 1.4;
        cushionDisplay.setInteractive();
        cushionDisplay.on('pointerdown', () => this.onClickBuyCatProgressive(cushionCP) );

        // KEYBOARD
        keyboardCP = new CatProgressive(0, 1250, 1.67, 0, true);
        keyboardCounter = this.add.text(1245, 510, keyboardCP.owned, { fill: '#fff', fontSize: 35, fontFamily: "American Typewriter" }).setOrigin(0.5);
        keyboardCost = this.add.text(910, 495, keyboardCP.cost, { fill: '#fff', fontSize: 30, fontFamily: "American Typewriter" });
        const keyboard_cheese = this.add.image(985, 510, 'moon').setOrigin(0.5);
        keyboard_cheese.scale = 0.25; 
        const keyboardDisplay = this.add.image(1110, 510, 'keyboard').setOrigin(0.5);
        keyboardDisplay.scale = 1.4;
        keyboardDisplay.setInteractive();
        keyboardDisplay.on('pointerdown', () => this.onClickBuyCatProgressive(keyboardCP) );

        // SCRATCHER
        scratcherCP = new CatProgressive(0, 2000, 2.5, 0, true);
        scratcherCounter = this.add.text(1245, 585, scratcherCP.owned, { fill: '#fff', fontSize: 35, fontFamily: "American Typewriter" }).setOrigin(0.5);
        scratcherCost = this.add.text(910, 570, scratcherCP.cost, { fill: '#fff', fontSize: 30, fontFamily: "American Typewriter" });
        const scratcher_cheese = this.add.image(985, 585, 'moon').setOrigin(0.5);
        scratcher_cheese.scale = 0.25; 
        const scratcherDisplay = this.add.image(1110, 585, 'scratcher').setOrigin(0.5);
        scratcherDisplay.scale = 1.4;
        scratcherDisplay.setInteractive();
        scratcherDisplay.on('pointerdown', () => this.onClickBuyCatProgressive(scratcherCP) );

        // TREE
        treeCP = new CatProgressive(0, 5000, 3.33, 0, true);
        treeCounter = this.add.text(1245, 660, treeCP.owned, { fill: '#fff', fontSize: 35, fontFamily: "American Typewriter" }).setOrigin(0.5);
        treeCost = this.add.text(910, 645, treeCP.cost, { fill: '#fff', fontSize: 30, fontFamily: "American Typewriter" });
        const tree_cheese = this.add.image(985, 660, 'moon').setOrigin(0.5);
        tree_cheese.scale = 0.25; 
        const treeDisplay = this.add.image(1110, 660, 'tree').setOrigin(0.5);
        treeDisplay.scale = 1.4;
        treeDisplay.setInteractive();
        treeDisplay.on('pointerdown', () => this.onClickBuyCatProgressive(treeCP) );


    }

});

