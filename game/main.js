var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var scrollingBackground;
var platforms;
var cursors;
var player;
var score = 0;
var scoreText;
var gameOver = false;
var music;
var boom;
var game = new Phaser.Game(config);

function preload() {
    this.load.image('rocket', 'assets/rocket.png');
    this.load.image('background', 'assets/background.png');
    this.load.image('badguy', 'assets/bad_guy_boss.png');

    this.load.image('badguy2', 'assets/bad_guy.png')
    this.load.image('top', 'assets/top_platform.png');
    this.load.image('bottom', 'assets/bottom_platform.png');
    this.load.audio('bullet', 'assets/canon_shoot.wav');
    this.load.audio('upgrade', 'assets/upgrade.wav');
    this.load.audio('badguy_hurt', 'assets/bad_guy_hurt.wav');
    this.load.audio('main_song', ['assets/main_track.mp3', 'assets/main_track.ogg']);
}

function create() {
    //add background image
    //this.add.image(0, 0, 'background').setOrigin(0, 0);
    scrollingBackground = this.add.tileSprite(0, 0, 800, 600, 'background').setOrigin(0, 0).setScale(2);
    music = this.sound.add('main_song');
    boom = this.sound.add('badguy_hurt');
    // music = this.game.add.audio('mainsong');
    music.play();
    //
    //add rocket player 
    player = this.physics.add.image(20, 250, 'rocket').setOrigin(0, 0).setScale(0.2);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //add the top and the bottom borders 
    platforms = this.physics.add.staticGroup();
    platforms.create(0, 0, 'top').setOrigin(0, 0).setScale(1).refreshBody();
    platforms.create(0, 500, 'bottom').setOrigin(0, 0).setScale(1).refreshBody();

    //setup cursors for UP, RIGHT, DOWN, LEFT keys
    cursors = this.input.keyboard.createCursorKeys();

    //add bad guy in a group 
    badguys = this.physics.add.group();
    var badguy = badguys.create(700, 250, 'badguy');
    badguy.setBounce(1);
    badguy.setScale(0.3);
    badguy.setOrigin(0, 0);
    badguy.setCollideWorldBounds(true);
    badguy.setVelocity(Phaser.Math.Between(-200, 200), 20);
    badguy.allowGravity = false;

    var badguy2 = badguys.create(900, 250, 'badguy2');
    badguy2.setBounce(1);
    badguy2.setScale(0.3);
    badguy2.setOrigin(0, 0);
    badguy2.setCollideWorldBounds(true);
    badguy2.setVelocity(Phaser.Math.Between(-5, 800), 20);
    badguy2.allowGravity = false;

    //setting score text
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FFF' });

    //add collision between player and top and bottom border
    this.physics.add.collider(player, platforms);

    //
    this.physics.add.collider(badguys, platforms);

    //setting up what should happen when the player gets hit by bad guy
    this.physics.add.collider(player, badguys, playerIsHit, null, this);
}

function update() {

    if (gameOver) {
        boom.play();
        boom.stop();
        music.stop();
        return;
    }
    scrollingBackground.tilePositionX += 2;
    player.setVelocity(0);

    if (cursors.left.isDown) {
        player.setVelocityX(-200);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(200);
    }
    else if (cursors.up.isDown) {
        player.setVelocityY(-200);
    }
    else if (cursors.down.isDown) {
        player.setVelocityY(200);
    }
}

function addToScore() {
    score += 10;
    scoreText.setText('Score: ' + score);
}

function playerIsHit() {
    this.physics.pause();
    player.setTint(0xFF0000);
    gameOver = true;
}