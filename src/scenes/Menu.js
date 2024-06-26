class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload () {
        //load images
        this.load.image('rocket', './assets/img/rocket.png')
        //this.load.image('spaceship', './assets/img/spaceship.png')
        this.load.image('alien', './assets/img/Alien.png')
        this.load.image('starfield', './assets/img/starfield.png')
        this.load.image('clouds1', './assets/img/clouds1.png')
        this.load.image('clouds2', './assets/img/clouds2.png')
        this.load.spritesheet('explosion', './assets/img/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })
        this.load.spritesheet('pop', './assets/img/pop.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 4
        })
        this.load.spritesheet('bird', './assets/img/bird.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 3
        })
        this.load.image('explode', './assets/img/Explode.png')

        //audio
        this.load.audio('sfx-select', './assets/img/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/img/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/img/sfx-shot.wav')
        this.load.audio('sfx-boom1', './assets/img/Boom1.wav')
        this.load.audio('sfx-boom2', './assets/img/Boom2.wav')
        this.load.audio('sfx-boom3', './assets/img/Boom3.wav')
        this.load.audio('sfx-boom4', './assets/img/Boom4.wav')
    }

    create() {
        //animation
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        })

        this.anims.create({
            key: 'bird-pop',
            frames: this.anims.generateFrameNumbers('pop', {start: 0, end: 4, first: 0}),
            frameRate: 12
        })

        this.anims.create({
            key: 'flapping',
            frames: this.anims.generateFrameNumbers('bird', {start: 0, end: 3, first: 0}),
            frameRate: 12,
            repeat: -1
        })

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height /2 - borderUISize - borderPadding, 'BIRD PATROL', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height /2, "Use <--> arrows to move & (F) to fire", menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height /2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5)
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
    }
}