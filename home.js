var Home = new Phaser.Class({
    
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "Home" });
    },
    init: function() {},
    preload: function() {
        this.load.image('space_back', 'assets/space_back.webp');
    },
    
    create: function() {
        this.load.setBaseURL('https://laurareese03.github.io/');
        this.add.image(640, 360, 'space_back');
        const helloButton = this.add.text(640, 360, 'START', { fill: '#000', fontSize: 50 }).setOrigin(0.5);
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
