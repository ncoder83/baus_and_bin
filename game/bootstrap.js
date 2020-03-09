var settings = {
    totalEnemies: 12,
    shipSpeed:200,
};


var config = {
    width: 800,
    height:600,
    backgroundColor:0x000000,
    scene:[TitleScene, GameScene],
    pixelArt:true,
    physics:{
        default:"arcade",
        arcade:{
            gravity:{y: 0}, 
            debug:false
        }
    }  
};

var game = new Phaser.Game(config);