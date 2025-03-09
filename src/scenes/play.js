class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // Load the test spritesheet for letter
        this.load.spritesheet("letterSheet", "./assets/A-Z.png", {
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

        // Load sound effects
        this.load.audio("shieldBreak", "assets/shieldbreak.mp3");
        this.load.audio("letterMiss", "assets/lettermiss.mp3");
        this.load.audio("letterHit", "assets/letterhit.mp3");
        this.load.audio("pointerMove", "assets/pointermove.mp3");
        this.load.audio("wordComplete", "assets/wordcomplete.mp3");
    }

    create() {
        this.wordList = this.cache.json.get('wordList');

        // Create sound effect objects
        this.sfx = {
            shieldBreak: this.sound.add("shieldBreak"),
            letterMiss: this.sound.add("letterMiss"),
            letterHit: this.sound.add("letterHit"),
            pointerMove: this.sound.add("pointerMove"),
            wordComplete: this.sound.add("wordComplete")
        };

        //initialize letter Y positions
        let row = [letterBoxY + letterBoxHeight / 2, letterBoxY + letterBoxHeight / 2 + letterBoxHeight, letterBoxY + letterBoxHeight / 2 + letterBoxHeight * 2, letterBoxY + letterBoxHeight / 2 + letterBoxHeight * 3, letterBoxY + letterBoxHeight / 2 + letterBoxHeight * 4];

        //initialize pointer
        this.pointer = new Pointer(this, pointerBar / 2, 0, "pointer", row);

        //initialize starting 5 words 
        this.testLetter1 = new Word(this, letterBoxX + 50, letterBoxY + letterBoxHeight / 2, this.getRandomWord(), "letterSheet", "underline");
        this.testLetter2 = new Word(this, letterBoxX + 50, letterBoxY + letterBoxHeight / 2 + letterBoxHeight, this.getRandomWord(), "letterSheet", "underline");
        this.testLetter3 = new Word(this, letterBoxX + 50, letterBoxY + letterBoxHeight / 2 + letterBoxHeight * 2, this.getRandomWord(), "letterSheet", "underline");
        this.testLetter4 = new Word(this, letterBoxX + 50, letterBoxY + letterBoxHeight / 2 + letterBoxHeight * 3, this.getRandomWord(), "letterSheet", "underline");
        this.testLetter5 = new Word(this, letterBoxX + 50, letterBoxY + letterBoxHeight / 2 + letterBoxHeight * 4, this.getRandomWord(), "letterSheet", "underline");

        //enable keyboard interactions
        this.input.keyboard.on("keydown", this.handleKeyPress, this);

        //initialize score keeping and combo multiplier
        this.score = 0;
        this.combo = 1;
        this.maxCombo = 2;

        //add score text
        let scoreTextConfog = {
            fontFamily: 'Comic Sans MS, Arial, sans-serif', // Fun and inviting font
            fontSize: '64px',  // Large and playful
            color: '#FF6F61',  // Bright coral color
            stroke: '#FFFFFF',  // White stroke around text
            strokeThickness: 6, // Thickness of the stroke
            shadow: {
                offsetX: 3,
                offsetY: 3,
                color: '#333333',
                blur: 5,
                stroke: true,
                fill: true
            },
            align: 'center'
        };

        this.scoreText = this.add.text(gameWidth / 2, UIbar / 2, `Score: ${this.score}`, scoreTextConfog).setOrigin(0, 0);
    }

    handleKeyPress(event) {
        let key = event.key.toUpperCase();

        // Handle pointer movement
        if (key === "ARROWUP") {
            this.pointer.moveUp();
            return;
        }
        else if (key === "ARROWDOWN") {
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
            new Word(this, letterBoxX + 50, letterBoxY + letterBoxHeight / 2 + letterBoxHeight * 4, this.getRandomWord(), "letterSheet", "underline");
        }
    }

    //get a random word from wordlist
    getRandomWord() {
        let randomIndex = Math.floor(Math.random() * this.wordList.length);
        return this.wordList[randomIndex];
    }

    addPoints(points) {
        this.score += Math.floor(points * this.combo);
        this.combo = Math.min(this.combo + 0.1, this.maxCombo);
        this.updateScoreText();
    }

    losePoints(points) {
        this.score = Math.max(0, this.score - points);
        this.combo = 1;
        this.updateScoreText();
    }

    updateScoreText() {
        this.scoreText.setText(`Score: ${this.score}`);
    }
}
