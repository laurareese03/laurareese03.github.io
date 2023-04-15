var Home = new Phaser.Class({
    
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "Home" });
    },
    init: function() {},
    preload: function() {
        this.load.setBaseURL('https://laurareese03.github.io/');
        this.load.image('space_back', 'assets/space_back2.jpg');
    },
    
    create: function() {
        const back_img = this.add.image(640, 360, 'space_back').setOrigin(0.5);
        
        this.add.text(640, 200, 'To The Mewn', { fill: '#fff', fontSize: 100 }).setOrigin(0.5);

        back_img.scale = 0.7
        const helloButton = this.add.text(640, 400, 'START', { fill: '#fff', fontSize: 80 }).setOrigin(0.5);
        helloButton.setInteractive();
        helloButton.on('pointerdown', () => this.updateScene() );

    
    },
    update: function() {},

    updateScene: function() { 
        this.scene.start("MainScene", { 
            "message": "Start Game" 
        });
    }
});
