var MainScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "MainScene" });
    },
    init: function() {
    },

    preload: function() {
      this.load.setBaseURL('https://labs.phaser.io');
      this.load.spritesheet('cheese', 'assets/sprites/donut.png', {
        frameWidth: 300,
        frameHeight: 300
      });
    },
    create: function() {
      const startBtn = this.add.sprite(640, 200, 'cheese').setOrigin(.5).setInteractive();
      // this.startBtn.anchor.set(0.5, .5);
      // var button = this.add.button(632, 400, 'button', this.actionOnClick, this, 2, 1, 0);
      startBtn.on('pointerdown', () => console.log('You pressed the cheese!') );
      // var text = this.add.text(
      //     640, 
      //     360, 
      //     "Main Scene", 
      //     {
      //         fontSize: 50,
      //         color: 'red',
      //         fontStyle: "bold"
      //     }
      // ).setOrigin(0.5);
    },
    update: function() {},
});

