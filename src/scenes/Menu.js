class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload () {
        //load images
        this.load.image('rocket', './assets/img/rocket.png')
        this.load.image('spaceship', './assets/img/spaceship.png')
        this.load.image('starfield', './assets/img/starfield.png')
        this.load.spritesheet('explosion', './assets/img/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })

        //audio
        this.load.audio('sfx-select', './assets/img/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/img/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/img/sfx-shot.wav')
    }

    create() {
        //animation
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        })
        this.add.text(20, 20, "Rocket Patrol Menu")
        this.scene.start("playScene")
    }
}