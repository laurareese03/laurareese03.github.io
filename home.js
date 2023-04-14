var Home = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "Home" });
    },
    init: function() {},
    preload: function() {
        var text = this.add.text(
            640, 
            360, 
            "test", 
            {
                fontSize: 50,
                color: "#000000",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);
    },
    create: function() {
        this.time.addEvent({
            delay: 3000,
            loop: false,
            callback: () => {
                this.scene.start("SceneOne", { 
                    "message": "Game Over" 
                });
                
            }
        })
    
    },
    update: function() {}
});
