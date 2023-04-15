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
        createAutoClickers();
        createBuilding();
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



    createAutoClickers: function() {
        const forkAC = new AutoClick(1, 1, 1, 1, True);
        const spoonAC = new AutoClick(1, 1, 1, 1, True);
        const sporkAC = new AutoClick(1, 1, 1, 1, True);
        const shovelAC = new AutoClick(1, 1, 1, 1, True);
        const pickaxeAC = new AutoClick(1, 1, 1, 1, True);
        const jackhammerAC = new AutoClick(1, 1, 1, 1, True);
        const drillAC = new AutoClick(1, 1, 1, 1, True);
        const excavatorAC = new AutoClick(1, 1, 1, 1, True);
        const cheesemineAC = new AutoClick(1, 1, 1, 1, True);
    }
});

