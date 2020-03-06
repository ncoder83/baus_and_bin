class GameScene extends Phaser.Scene{
    constructor(){
        super("gamesceen")
    }

    // preload(){
        
    // }

    create(){
        this.background = this.add.tileSprite(0,0, config.width, config.height, 'background');
        this.background.setOrigin(0,0);
        this.background.setScale(2);
        
        this.otherbackground = this.add.tileSprite(0,0,config.width, config.height,"star-background");
        this.otherbackground.setOrigin(0,0);

        // this.player = this.physics.add.image(20, config.height/2, 'rocket');
        // this.player.setOrigin(0,0);
        // this.player.setScale(0.2);

        this.ship = this.add.sprite(20, config.height/2, "ship");
        this.ship.play("ship_anim");
        this.ship.setOrigin(0,0);
        this.ship.setScale(0.2);
        
        this.badguy = this.add.image(config.width/2 + 20, config.height/2, "badguy") 
        this.badguy.setOrigin(0,0);
        this.badguy.setScale(0.2);

        this.enemies = this.physics.add.group();
        this.enemies.add(this.badguy);
        this.setupTitleScore();

        this.score = 0;
        this.scoreLabel = this.add.bitmapText(10,5,"pixelFont", "SCORE", 16).setScale(1.5);

        this.beamSound = this.sound.add("beam-sound");
        this.hurtSound = this.sound.add("hurt-sound");
        this.upgradeSound = this.sound.add("upgrade-sound");

        this.mainSound  = this.sound.add("main_song");
        var musicConfig = {
            mute:false,
            volume:1,
            rate:1,
            detune:0,
            seek:0,
            loop:false,
            delay: 0
        };
        this.mainSound.play(musicConfig);


    }

    setupTitleScore(){
        var graphics = this.add.graphics();
        graphics.fillStyle(0x000000,1);
        graphics.beginPath();
        graphics.moveTo(0,0);
        graphics.lineTo(config.width, 0);
        graphics.lineTo(config.width, 20);
        graphics.lineTo(0,20);
        graphics.lineTo(0,0);
        graphics.closePath();
        graphics.fillPath();
    }

    update(){
        this.background.tilePositionX += 0.05;
        this.otherbackground.tilePositionX += 0.02;
    }

}