
class Test extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // Load the test spritesheet for letter A
        this.load.spritesheet("testSpriteA", "./assets/testSpriteA.png", {
            frameWidth: 100,
            frameHeight: 100
        });
    }

    create() {
        // Get screen width and height
        // let gameWidth = this.sys.game.config.width;
        // let gameHeight = this.sys.game.config.height;

        // Create a test letter 'A' at the center of the screen
        this.testLetter = new Letter(this, gameWidth / 2, gameHeight / 2, "A", "testSpriteA", "shielded");

        // Add letter to scene
        this.add.existing(this.testLetter);

        // Listen for keyboard input
        this.input.keyboard.on("keydown", this.handleKeyPress, this);
    }

    handleKeyPress(event) {
        console.log(`Key Pressed: ${event.key.toUpperCase()}`);

        // Example: Triggering applyState() when any key is pressed
        this.testLetter.applyState();
    }
}
