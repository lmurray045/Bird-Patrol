//Liam Murray
//Working title
//Mods Implemeted:
    //enemy spaceship type: Created a new class "alien", inherting from Spaceship, and added new movement/point values
    //Explosions: used particle generator to create green particle explosions
    //Random Explosions (5 total, including Nathans)
    //Updated Background sprite
    //implemented paralax scrolling with the clouds
//

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config)

let keyFIRE, keyRESET, keyLEFT, keyRIGHT

//set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3