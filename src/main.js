
let config = {
    type: Phaser.AUTO,
    // width: Math.floor(window.innerWidth * 0.75),
    // height: Math.floor(window.innerHeight * 0.75),
    width: 1500,
    height: 1000,
    render: {
        pixelArt: true,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [Play],
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH // Centers the game on the screen
    }
};

let game = new Phaser.Game(config);
let gameWidth = config.width;
let gameHeight = config.height;
let UIbar = gameHeight / 5;
let pointerBar = gameWidth / 8;
let marginWidth = (gameHeight - UIbar) / 20;
let letterBoxHeight = (gameHeight - UIbar - marginWidth * 2) / 5;
let letterBoxWidth = gameWidth - pointerBar - marginWidth * 2;
let letterBoxX = pointerBar + marginWidth;
let letterBoxY = UIbar + marginWidth;