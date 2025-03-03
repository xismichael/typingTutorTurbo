
class Test extends Phaser.Scene {
    constructor() {
        super("testScene");
    }

    preload() {
        // Load the test spritesheet for letter A
        this.load.spritesheet("testSpriteA", "./assets/A-Z.png", {
            frameWidth: 100,
            frameHeight: 100
        });

        this.load.spritesheet("pointer", "./assets/pointer.png", {
            frameWidth: 150,
            frameHeight: 100

        });

        this.load.json('wordList', './assets/wordlist.json');
    }

    create() {
        this.wordList = this.cache.json.get('wordList');

        //first width
        // let UIbar = gameHeight / 5;
        // let pointerBar = gameWidth / 5;
        // let marginWidth = (gameHeight - UIbar) / 20;
        // let letterBoxHeight = (gameHeight - UIbar - marginWidth * 2) / 5;
        // let letterBoxWidth = gameWidth - pointerBar - marginWidth * 2;
        // let letterBoxX = pointerBar + marginWidth;
        // let letterBoxY = UIbar + marginWidth;
        // this.add.rectangle(0, 0, pointerBar, gameHeight, "0x997EE5").setOrigin(0, 0);
        // this.add.rectangle(0, 0, gameWidth, UIbar, "0x667EE5").setOrigin(0, 0);
        // this.add.rectangle(pointerBar, UIbar, gameWidth - pointerBar, marginWidth, "0xE090A4").setOrigin(0, 0);
        // this.add.rectangle(pointerBar, UIbar, marginWidth, gameHeight - UIbar, "0xE090A4").setOrigin(0, 0);
        // this.add.rectangle(pointerBar, gameHeight - marginWidth, gameWidth - pointerBar, marginWidth, "0xE090A4").setOrigin(0, 0);
        // this.add.rectangle(gameWidth - marginWidth, UIbar, marginWidth, gameHeight - UIbar, "0xE090A4").setOrigin(0, 0);
        // this.add.rectangle(letterBoxX, letterBoxY, letterBoxWidth, letterBoxHeight, "0xDE1F09").setOrigin(0, 0);
        // this.add.rectangle(letterBoxX, letterBoxY + letterBoxHeight, letterBoxWidth, letterBoxHeight, "0xDE4409").setOrigin(0, 0);
        // this.add.rectangle(letterBoxX, letterBoxY + letterBoxHeight * 2, letterBoxWidth, letterBoxHeight, "0xDE1F09").setOrigin(0, 0);
        // this.add.rectangle(letterBoxX, letterBoxY + letterBoxHeight * 3, letterBoxWidth, letterBoxHeight, "0xDE4409").setOrigin(0, 0);
        // this.add.rectangle(letterBoxX, letterBoxY + letterBoxHeight * 4, letterBoxWidth, letterBoxHeight, "0xDE1F09").setOrigin(0, 0);


        let row = [letterBoxY + letterBoxHeight / 2, letterBoxY + letterBoxHeight / 2 + letterBoxHeight, letterBoxY + letterBoxHeight / 2 + letterBoxHeight * 2, letterBoxY + letterBoxHeight / 2 + letterBoxHeight * 3, letterBoxY + letterBoxHeight / 2 + letterBoxHeight * 4];
        this.pointer = new Pointer(this, pointerBar / 2, 0, "pointer", row);
        this.testLetter1 = new Word(this, letterBoxX + 50, letterBoxY + letterBoxHeight / 2, this.getRandomWord(), "testSpriteA");
        this.testLetter2 = new Word(this, letterBoxX + 50, letterBoxY + letterBoxHeight / 2 + letterBoxHeight, this.getRandomWord(), "testSpriteA");
        this.testLetter3 = new Word(this, letterBoxX + 50, letterBoxY + letterBoxHeight / 2 + letterBoxHeight * 2, this.getRandomWord(), "testSpriteA");
        this.testLetter4 = new Word(this, letterBoxX + 50, letterBoxY + letterBoxHeight / 2 + letterBoxHeight * 3, this.getRandomWord(), "testSpriteA");
        this.testLetter5 = new Word(this, letterBoxX + 50, letterBoxY + letterBoxHeight / 2 + letterBoxHeight * 4, this.getRandomWord(), "testSpriteA");

        this.input.keyboard.on("keydown", this.handleKeyPress, this);
    }

    update() {
        //this.testLetter2.destroy();
    }

    handleKeyPress(event) {
        let key = event.key.toUpperCase();

        // Handle pointer movement
        if (key === "ARROWUP") {
            this.pointer.moveUp();
            return;
        } else if (key === "ARROWDOWN") {
            this.pointer.moveDown();
            return;
        }

        // Handle letter input only for the word at the pointer position
        let wordAtPointer = this.words.find(word => word.y === this.pointer.getCurrentY());

        if (wordAtPointer) {
            wordAtPointer.handleKeyPress(event);
        }
    }

    repositionWords() {
        let letterBoxY = gameHeight / 5 + (gameHeight - gameHeight / 5) / 20; // UI margin
        let letterBoxHeight = (gameHeight - gameHeight / 5 - (gameHeight - gameHeight / 5) / 10) / 5;

        // Reposition remaining words to the first 4 rows
        this.words.forEach((word, index) => {
            let newY = letterBoxY + letterBoxHeight / 2 + index * letterBoxHeight;
            this.tweens.add({
                targets: word,
                y: newY,
                duration: 200,
                ease: "Power2"
            });
        });

        // Leave the last row empty
        if (this.words.length < 5) {
            //console.log("Bottom row is now empty.");
            new Word(this, letterBoxX + 50, letterBoxY + letterBoxHeight / 2 + letterBoxHeight * 4, this.getRandomWord(), "testSpriteA");
        }
    }

    getRandomWord() {

        // Randomly select a word from the list
        let randomIndex = Math.floor(Math.random() * this.wordList.length);
        return this.wordList[randomIndex];
    }

}
