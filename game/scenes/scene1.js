class TitleScene extends Phaser.Scene{
    constructor(){
        super("bootingscreen");
    }

    preload(){
        //loading all images for the game
        //mostly this is for the title screen data
        this.load.image('background', 'assets/images/background.png');
        this.load.image('star-background', 'assets/images/parallax-space-stars.png');
        this.load.image('play-button', 'assets/images/play-button.png');
        this.load.image('play-button-dark', 'assets/images/play-button-black.png');
        this.load.image('play-button-yellow', 'assets/images/play-button-yellow.png');
        this.load.image('option-button-yellow', 'assets/images/options-button.png');
        this.load.image('main-title', 'assets/images/main-title.png');

        //loading all the game audio
        this.load.audio('main_song', ['assets/audio/main_track.ogg', 'assets/audio/main_track.mp3']);
        this.load.audio('title_song', ['assets/audio/main-title.ogg', 'assets/audio/main-title.mp3']);
        this.load.audio('selection_sound', ['assets/audio/selection-sound.ogg', 'assets/audio/selection-sound.mp3']);

        //create a loading bar
        let loadingBar = this.add.graphics({fillStyle:{color: 0xFFFFFF}});

        this.load.on('progress', (percent) => {
            loadingBar.fillRect(0, config.height/2, config.width * percent, 50);            
        });

        this.load.image('rocket', 'assets/images/rocket.png');

        this.load.spritesheet('ship', 'assets/sprites/shipsprite.png',{
            frameWidth:1000, frameHeight:285
        })

        this.load.image('boss', 'assets/images/bad_guy_boss.png');
        this.load.image('badguy', 'assets/images/bad_guy.png');

        this.load.spritesheet('explosion', "assets/sprites/explosion.png",{
            frameWidth:16, frameHeight:16
        });

        this.load.audio('beam-sound', 'assets/audio/canon_shoot.wav');
        this.load.audio('hurt-sound', 'assets/audio/bad_guy_hurt.wav');
        this.load.audio('upgrade-sound', 'assets/audio/upgrade.wav');

        this.load.bitmapFont("pixelFont", "assets/fonts/font.png", "assets/fonts/font.xml");

    }

    create(){
        this.background = this.add.tileSprite(0,0, config.width, config.height, 'background');
        this.background.setOrigin(0,0);
        this.background.setScale(2);
        
        this.otherbackground = this.add.tileSprite(0,0,config.width, config.height,"star-background");
        this.otherbackground.setOrigin(0,0);
        
        this.add.image(config.width /2, config.height * 0.20, 'main-title').setScale(1.8);        
        this.playbutton = this.add.image(config.width /2, config.height * 0.60, "play-button-yellow").setScale(0.3);
        this.optionbutton = this.add.image(config.width /2, config.height * 0.73, 'option-button-yellow').setScale(0.4);

        this.selectionSound = this.sound.add('selection_sound');
        this.music = this.sound.add("title_song");
        var titleMusicConfig = {
            mute:false,
            volume:1,
            rate:1,
            detune: 0,
            seek:0,
            loop: false,
            delay: 0            
        };        
        // this.music.pauseOnBlur = false;
        this.music.play(titleMusicConfig);
        

        this.playbutton.setInteractive();

        this.playbutton.on('pointerover', () => {
           console.log("hover");
        });
        
        this.playbutton.on('pointerout', () => {
            console.log("out of here");
        });
        
        this.playbutton.on('pointerup', () => {
            console.log("clicked");
            this.selectionSound.play();
            this.music.stop();
            this.scene.start("gamesceen");

        });

        this.anims.create({
            key: "ship_anim",
            frames: this.anims.generateFrameNumbers("ship"),
            frameRate:20,
            repeat:-1
        });

        this.anims.create({
            key:"explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat:0,
            hideOnComplete:true
        });
    }

    update(){
        this.background.tilePositionX += 0.05;
        this.otherbackground.tilePositionX += 0.02;
    }
}