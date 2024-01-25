class Alien extends Spaceship {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame, pointValue)
        scene.add.existing(this)
        this.moveSpeed = 5
        this.counter = 0
    }

    update() {
        //movement pattern
        
        //frame calculations
        let frameMax = 100

        //pick how many frames the alien will go up/down and left
        // (up + left) * 2 must equal frameMax
        let frameUp = 10
        let frameLeft = 40

        //moveleft
        if (this.counter <= frameMax - (frameLeft + frameUp * 2)) {
            this.x -= this.moveSpeed
        }

        //moveUp
        else if (this.counter > frameMax - (frameLeft + frameUp * 2) && this.counter <= frameMax - (frameLeft + frameUp)) {
            this.y -= this.moveSpeed
        }

        //left again
        else if (this.counter > frameMax - (frameLeft + frameUp) && this.counter <= frameMax - (frameUp)) {
            this.x -= this.moveSpeed
        }

        //moveDown
        else if (this.counter > (frameMax - (frameUp)) && this.counter <= frameMax) {
            this.y += this.moveSpeed
        }

        //incriment counter
        this.counter++
        //reset counter
        if (this.counter == frameMax + 1) {
            this.counter = 0
        }

        //wrap from left to right edge
        if(this.x <= 0 - this.width) {
            this.x = game.config.width
        }
    }
}