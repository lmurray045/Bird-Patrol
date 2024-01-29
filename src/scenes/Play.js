class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        //place tile sprite
        //this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)
        this.clouds1  = this.add.tileSprite(0, 0, 640, 480, 'clouds1').setOrigin(0, 0)
        this.clouds2  = this.add.tileSprite(0, 0, 640, 480, 'clouds2').setOrigin(0, 0)


        //Green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0)
        //white borders
        this.add.rectangle(0,0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)
        //add rocket
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)

        //add ships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*4, 'bird', 0, 30).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*6, 'bird', 0, 20).setOrigin(0,0)
        this.ship03 = new Spaceship(this,  game.config.width - borderUISize*3, borderUISize*9 + borderPadding*3, 'bird', 0, 10).setOrigin(0, 0)
        this.alien = new Alien(this, game.config.width + borderUISize*6, borderUISize*4 + borderPadding, 'alien', 0, 50).setOrigin(0,0)
        this.alien.setScale(2);

        this.ship01.play('flapping', true)
        this.ship02.play('flapping', true)
        this.ship03.play('flapping', true)

        // define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        this.p1Score = 0

        //define score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig)
        

        //particle emmitter
        //CITATION: I used the phaser3 examples documentation to see how particle emitters worked: https://phaser.io/examples/v3/view/game-objects/particle-emitter/explode-emitter
        this.emitter = this.add.particles(0, 0, 'explode', {
           frequency: -1, 
           gravityY: 400,
           lifespan: 3000,
           scale: 1.5,
           speed: {min: 10, max: 400} ,
           texture: 'explode'
        })


        // GAME OVER flag
        this.gameOver = false

        //timer
        scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }, null, this)

    }

    update() {
        
        //check for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
          }

        this.clouds2.tilePositionX -= 4
        this.clouds1.tilePositionX -= 1
        if(!this.gameOver) {
            this.p1Rocket.update()
            this.ship01.update()
            this.ship02.update()
            this.ship03.update()
            this.alien.update()
        }

        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)
        }
        if(this.checkAlienCollision(this.p1Rocket, this.alien)) {
            this.p1Rocket.reset()
            this.shipExplode(this.alien)
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
        }

        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
        }

        this.ship01.on('animationcomplete', () => {
            this.anims.play("flapping")
        })

        this.ship02.on('animationcomplete', () => {
            this.anims.play("flapping")
        })

        this.ship03.on('animationcomplete', () => {
            this.anims.play("flapping")
        })
        
    }

    checkCollision(rocket, ship) {
        //simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true
            } else {
                return false
            }
    }

    checkAlienCollision(rocket, alien) {
        //simple AABB checking
        if (rocket.x < alien.x + alien.displayWidth &&
            rocket.x + rocket.width > alien.x &&
            rocket.y < alien.y + alien.displayHeight &&
            rocket.height + rocket.y > alien.y) {
                return true
            } else {
                return false
            }
    }

    shipExplode(ship) {
        //hide ship
        ship.alpha = 0
        // create explosion sprite at ships pos
        this.emitter.explode(400, ship.x + 30, ship.y + 16)   //make particles happen
        if(ship.type == 'alien') {
            let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
            boom.anims.play('explode') 
            boom.on("animationcomplete", () => {        // callback after anim ends
                ship.reset()                            // reset ship
                ship.alpha = 1                          // make visible
                boom.destroy()                         // remove explosion sprite
            })
        } else {
            let boom = this.add.sprite(ship.x, ship.y, 'pop').setOrigin(0, 0);
            boom.anims.play('bird-pop') 
            boom.on("animationcomplete", () => {        // callback after anim ends
                ship.reset()                            // reset ship
                ship.alpha = 1                          // make visible
                boom.destroy()                         // remove explosion sprite
            })
        }                 // play animation
        // score add and text update
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score
        let randInt = Math.floor((Math.random() * 10)) % 5
        if (randInt == 0) {
            this.sound.play('sfx-explosion')
        } else if(randInt == 1) {
            this.sound.play('sfx-boom1')
        } else if(randInt == 2) {
            this.sound.play('sfx-boom2')
        } else if(randInt == 3) {
            this.sound.play('sfx-boom3')
        } else {
            this.sound.play('sfx-boom4')
        }
    }
}