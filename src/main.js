//Liam Murray
//Working title
//Mods Implemeted:
//5    //enemy spaceship type: Created a new class "alien", inherting from Spaceship, and added new movement/point values
//5    //Explosions: used particle generator to create green particle explosions
//3    //Random Explosions (5 total, including Nathans)
//1    //Updated Background sprite
//3    //implemented paralax scrolling with the clouds
//    //
//total: 20pts
// Hours:
// Citations:

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