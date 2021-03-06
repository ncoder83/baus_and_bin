class Beam extends Phaser.GameObjects.Sprite{
    constructor(scene){
        var x = scene.ship.x + 120;
        var y = scene.ship.y;

        super(scene, x, y, "beam");
        scene.add.existing(this);

        this.play("beam_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.x = 250;
        scene.projectiles.add(this);        
    }

    update(){
        if(this.x > config.width - 20)
            this.destroy();
    }
}