
let config = {
    type: Phaser.AUTO,
    width: Math.floor(window.innerWidth * 0.75),
    height: Math.floor(window.innerHeight * 0.75),
    render: {
        pixelArt: true,
    },
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: -300 },  // Enable physics gravity
            debug: false
        }
    },
    scene: [Test],
    scale: {
        //mode: Phaser.Scale.FIT, // Ensures the game scales to fit the screen
        autoCenter: Phaser.Scale.CENTER_BOTH // Centers the game on the screen
    }
};

let game = new Phaser.Game(config);
let gameWidth = config.width;
let gameHeight = config.height;
config.log("hello world")