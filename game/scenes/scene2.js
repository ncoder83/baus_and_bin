class GameScene extends Phaser.Scene{
    constructor(){
        super("gamescene")
    }

    create(){
        this.background = this.add.tileSprite(0,0, config.width, config.height, 'background');
        this.background.setOrigin(0,0);
        this.background.setScale(2);
        
        this.middleground = this.add.tileSprite(0,0,config.width, config.height,"star-background");
        this.middleground.setOrigin(0,0);
        

        this.ship = this.physics.add.sprite(20, config.height/2, "ship");
        this.ship.play("ship_anim");
        this.ship.setOrigin(0,0);
        this.ship.setScale(0.2);
        this.ship.setCollideWorldBounds(true);
        
        // this.badguy = this.add.sprite(config.width/2 + 20, this.randomY(), "enemy");        
        // this.badguy.setScale(0.2);
        // this.badguy.play("badguy_anim");

        this.enemies = this.physics.add.group();

        this.createEnemies(3);
                
        this.setupTitleScore();
      
        this.beamSound = this.sound.add("beam-sound");
        this.hurtSound = this.sound.add("hurt-sound");
        this.upgradeSound = this.sound.add("upgrade-sound");
        this.mainSound  = this.sound.add("main_song");
        
        this.setupMainScore();

        this.setupKeyboard();

        this.projectiles  = this.add.group();

        //when player bullets hit the enemy
        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);

        this.physics.add.overlap(this.ship, this.enemies, this.hurtPlayer, null, this);

    }

    createEnemies(count){
        for(let i = 0; i < count; i++){
            let badguy = this.add.sprite(config.width/2 + 20, this.randomY(), "enemy");        
            badguy.setOrigin(0,0);
            badguy.setScale(0.2);
            badguy.play("badguy_anim");
            this.enemies.add(badguy);
        }
    }

    setupMainScore(){
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

    setupKeyboard(){
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
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

        this.score = 0;
        this.scoreLabel = this.add.bitmapText(10,5,"pixelFont", "SCORE", 16).setScale(1.5);
    }

    hitEnemy(projectile, enemy){
        var explosion = new Explosion(this, enemy.x, enemy.y);
        projectile.destroy();
        this.resetEnemyPos(enemy);
        this.score += 15;
        var scoreFormatted = this.zeroPad(this.score, 8);
        this.scoreLabel.text = "SCORE " + scoreFormatted;
        this.hurtSound.play();
    }

    hurtPlayer(player, enemy){
        this.resetEnemyPos(enemy);
        
        if(this.ship.alpha < 1)
            return;
        var explosion = new Explosion(this, player.x, player.y);
        this.hurtSound.play();
        player.disableBody(true,true);

        this.time.addEvent({
            delay:1000,
            callback: this.resetPlayer,
            callbackScope:this,
            loop: false
        });
    }

    resetEnemyPos(enemy){
        enemy.x = config.width;
        var randomY = this.randomY();
        enemy.y = randomY;
    }

    randomY(){
        return Phaser.Math.Between(0, config.height - 20);
    }

    resetPlayer(){
        var x = 0;
        var y = config.height/2 - 8;
        this.ship.enableBody(true, x, y,true,true);
        this.ship.alpha = 0.5;

        var tween = this.tweens.add({
            targets: this.ship,
            x: 64,
            ease:'Power1',
            duration: 1500,
            repeat:0,
            onComplete: function(){
                this.ship.alpha = 1;
            },
            callbackScope:this
        });
    }

    moveEnemy(enemy, speed){
        enemy.x -= speed;
        if(enemy.x < 0)
            this.resetEnemyPos(enemy);
    }

    moveShip(){
        if(this.cursorKeys.left.isDown){
            // this.ship.setPositionX(-settings.shipSpeed);
            this.ship.setVelocityX(-settings.shipSpeed);
        }
        else if(this.cursorKeys.right.isDown){
            this.ship.setVelocityX(settings.shipSpeed);
        }
        
        if(this.cursorKeys.up.isDown){
            this.ship.setVelocityY(-settings.shipSpeed);
        }
        else if(this.cursorKeys.down.isDown){
            this.ship.setVelocityY(settings.shipSpeed);
        }
    }

    shootBeam(){
        var beam = new Beam(this);
        this.beamSound.play();
    }

    zeroPad(number, size){
        var stringNumber = String(number);
        while(stringNumber.length < (size || 2)){
            stringNumber = "0" + stringNumber;
        }
        return stringNumber;
    }

    update(){

        for(let i = 0; i < this.enemies.getChildren().length; i++){
            var enemy = this.enemies.getChildren()[i];
            this.moveEnemy(enemy, Phaser.Math.Between(1,4));
        }

        this.background.tilePositionX += 0.50;
        this.middleground.tilePositionX += 0.02;

        this.moveShip();

        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            if(this.ship.active){
                this.shootBeam();
            }
        }

        for(let i =0; i < this.projectiles.getChildren().length; i++){
            var beam = this.projectiles.getChildren()[i];
            beam.update();
        }
    }

}