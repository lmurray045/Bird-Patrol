class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload () {
        //load images
        this.load.image('rocket', './assets/img/rocket.png')
        this.load.image('spaceship', './assets/img/spaceship.png')
        this.load.image('starfield', './assets/img/starfield.png')
    }

    create() {
        this.add.text(20, 20, "Rocket Patrol Menu")
        this.scene.start("playScene")
    }
}