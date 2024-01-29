//Liam Murray
//Working title
//Mods Implemeted:
//5    //enemy spaceship type: Created a new class "alien", inherting from Spaceship, and added new movement/point values
//5    //Explosions: used particle generator to create green particle explosions
//3    //Random Explosions (5 total, including Nathans)
//1    //Updated Background sprite
//3    //implemented paralax scrolling with the clouds
//3    //made animated ship sprite (I made them birds)
//total: 20pts
// Hours: 11
// Citations:
// //I used the phaser3 examples documentation to see how particle emitters worked: https://phaser.io/examples/v3/view/game-objects/particle-emitter/explode-emitter

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