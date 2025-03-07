class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // Load the test spritesheet for letter
        this.load.spritesheet("testSpriteA", "./assets/A-Z.png", {
            frameWidth: 100,
            frameHeight: 100
        });

        //Load underline
        this.load.spritesheet("underline", "./assets/underline.png", {
            frameWidth: 100,
            frameHeight: 100
        });

        // Load the pointer
        this.load.spritesheet("pointer", "./assets/pointer.png", {
            frameWidth: 150,
            frameHeight: 100

        });

        //load the wordlist
        this.load.json('wordList', './assets/wordlist.json');
    }

    create() {
        this.wordList = this.cache.json.get('wordList');


        //initialize letter Y positions
        let row = [letterBoxY + letterBoxHeight / 2, letterBoxY + letterBoxHeight / 2 + letterBoxHeight, letterBoxY + letterBoxHeight / 2 + letterBoxHeight * 2, letterBoxY + letterBoxHeight / 2 + letterBoxHeight * 3, letterBoxY + letterBoxHeight / 2 + letterBoxHeight * 4];

        //initialize pointer
        this.pointer = new Pointer(this, pointerBar / 2, 0, "pointer", row);

        //initialize starting 5 words 
        this.testLetter1 = new Word(this, letterBoxX + 50, letterBoxY + letterBoxHeight / 2, this.getRandomWord(), "testSpriteA", "underline");
        this.testLetter2 = new Word(this, letterBoxX + 50, letterBoxY + letterBoxHeight / 2 + letterBoxHeight, this.getRandomWord(), "testSpriteA", "underline");
        this.testLetter3 = new Word(this, letterBoxX + 50, letterBoxY + letterBoxHeight / 2 + letterBoxHeight * 2, this.getRandomWord(), "testSpriteA", "underline");
        this.testLetter4 = new Word(this, letterBoxX + 50, letterBoxY + letterBoxHeight / 2 + letterBoxHeight * 3, this.getRandomWord(), "testSpriteA", "underline");
        this.testLetter5 = new Word(this, letterBoxX + 50, letterBoxY + letterBoxHeight / 2 + letterBoxHeight * 4, this.getRandomWord(), "testSpriteA", "underline");

        //enable keyboard interactions
        this.input.keyboard.on("keydown", this.handleKeyPress, this);
    }

    handleKeyPress(event) {
        let key = event.key.toUpperCase();

        // Handle pointer movement
        if (key === "ARROWUP") {

            //!!!!!!!!
            //INSERT POINTER MOVE SOUND
            //!!!!!!!!

            this.pointer.moveUp();
            return;
        }
        else if (key === "ARROWDOWN") {

            //!!!!!!!!
            //INSERT POINTER MOVE SOUND
            //!!!!!!!!

            this.pointer.moveDown();
            return;
        }

        // Handle letter input only for the word at the pointer position
        let wordAtPointer = this.words.find(word => word.y === this.pointer.getCurrentY());

        if (wordAtPointer) {
            wordAtPointer.handleKeyPress(event);
        }
    }

    update() {

    }

    //function for repositioning words after the word is complete
    repositionWords() {
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


            //!!!!!!!!
            //INSERT NEW/DESTROY WORD SOUND
            //!!!!!!!!


            new Word(this, letterBoxX + 50, letterBoxY + letterBoxHeight / 2 + letterBoxHeight * 4, this.getRandomWord(), "testSpriteA", "underline");
        }
    }

    //get a random word from wordlist
    getRandomWord() {
        let randomIndex = Math.floor(Math.random() * this.wordList.length);
        return this.wordList[randomIndex];
    }


}