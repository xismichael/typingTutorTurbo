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

        // Load underline
        this.load.spritesheet("underline", "./assets/underline.png", {
            frameWidth: 100,
            frameHeight: 100
        });

        // Load the pointer
        this.load.spritesheet("pointer", "./assets/pointer.png", {
            frameWidth: 150,
            frameHeight: 100
        });

        // Load the wordlist
        this.load.json('wordList', './assets/wordlist.json');

        // Load sound effects
        this.load.audio("shieldBreak", "assets/shieldbreak.mp3");
        this.load.audio("letterMiss", "assets/lettermiss.mp3");
        this.load.audio("letterHit", "assets/letterhit.mp3");
        this.load.audio("pointerMove", "assets/pointermove.mp3");
        this.load.audio("wordComplete", "assets/wordcomplete.mp3");

        // Load background music
        this.load.audio("backgroundMusic", "assets/backgroundmusic.mp3");
    }

    create() {
        // Retrieve the word list from the JSON file
        this.wordList = this.cache.json.get('wordList');

        // Create sound effect objects
        this.sfx = {
            shieldBreak: this.sound.add("shieldBreak"),
            letterMiss: this.sound.add("letterMiss", { volume: 0.3 }),
            letterHit: this.sound.add("letterHit"),
            pointerMove: this.sound.add("pointerMove", { volume: 0.4 }),
            wordComplete: this.sound.add("wordComplete")
        };

        // Start background music if not already playing
        if (!this.sound.get("backgroundMusic")) {
            this.bgMusic = this.sound.add("backgroundMusic", { loop: true, volume: 0.2 });
            this.bgMusic.play();
        } else {
            this.bgMusic = this.sound.get("backgroundMusic");
        }


        // Initialize counters
        this.shieldsBroken = 0;
        this.wordsCompleted = 0;
        this.typosMade = 0;

        // when shieldBreak sound plays increment shieldsBroken
        this.sfx.shieldBreak.on('play', () => {
            this.shieldsBroken++;
        });

        // when wordComplete sound plays increment wordsCompleted
        this.sfx.wordComplete.on('play', () => {
            this.wordsCompleted++;
        });

        // when letterMiss sound plays increment typosMade
        this.sfx.letterMiss.on('play', () => {
            this.typosMade++;
        });
      

 
        this.score = 0;
        this.combo = 1;
        this.maxCombo = 2;

    
        //    letterBoxX, letterBoxY, letterBoxHeight, pointerBar, UIbar, gameWidth, gameHeight
        let row = [
            letterBoxY + letterBoxHeight / 2,
            letterBoxY + letterBoxHeight / 2 + letterBoxHeight,
            letterBoxY + letterBoxHeight / 2 + letterBoxHeight * 2,
            letterBoxY + letterBoxHeight / 2 + letterBoxHeight * 3,
            letterBoxY + letterBoxHeight / 2 + letterBoxHeight * 4
        ];

        // Initialize pointer 
        this.pointer = new Pointer(this, pointerBar / 2, 0, "pointer", row);

        // Create 5 words at original positions 
        this.testLetter1 = new Word(this, letterBoxX + 50, row[0], this.getRandomWord(), "letterSheet", "underline");
        this.testLetter2 = new Word(this, letterBoxX + 50, row[1], this.getRandomWord(), "letterSheet", "underline");
        this.testLetter3 = new Word(this, letterBoxX + 50, row[2], this.getRandomWord(), "letterSheet", "underline");
        this.testLetter4 = new Word(this, letterBoxX + 50, row[3], this.getRandomWord(), "letterSheet", "underline");
        this.testLetter5 = new Word(this, letterBoxX + 50, row[4], this.getRandomWord(), "letterSheet", "underline");

        this.words = [this.testLetter1, this.testLetter2, this.testLetter3, this.testLetter4, this.testLetter5];

        // Enable keyboard 
        this.input.keyboard.on("keydown", this.handleKeyPress, this);

        // 3 Minute Timer
        this.timeRemaining = 16;
        let commonTextConfig = {
            fontFamily: 'Comic Sans MS, Arial, sans-serif',
            fontSize: '64px',
            color: '#FF6F61',
            stroke: '#FFFFFF',
            strokeThickness: 6,
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

        // Create Timer Text
        this.timerText = this.add.text(pointerBar / 2, UIbar / 2, "Time: 3:00", commonTextConfig).setOrigin(0, 0);
        this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        // Create Score Text
        this.scoreText = this.add.text(gameWidth / 2, UIbar / 2, `Score: ${this.score}`, commonTextConfig).setOrigin(0, 0);
    }

    handleKeyPress(event) {
        let key = event.key.toUpperCase();

        // Pointer movement
        if (key === "ARROWUP") {
            this.pointer.moveUp();
            return;
        } else if (key === "ARROWDOWN") {
            this.pointer.moveDown();
            return;
        }

        // Letter input for the word at pointer position
        let wordAtPointer = this.words.find(word => word.y === this.pointer.getCurrentY());
        if (wordAtPointer) {
            wordAtPointer.handleKeyPress(event);
        }
    }

    update() {
        
    }

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
        // If fewer than 5 words remain, add a new word in the bottom row
        if (this.words.length < 5) {
            new Word(
                this,
                letterBoxX + 50,
                letterBoxY + letterBoxHeight / 2 + letterBoxHeight * 4,
                this.getRandomWord(),
                "letterSheet",
                "underline"
            );
        }
    }

    getRandomWord() {
        let randomIndex = Math.floor(Math.random() * this.wordList.length);
        return this.wordList[randomIndex];
    }

    //  scoring logic
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

    updateTimer() {
        this.timeRemaining--;
        let minutes = Math.floor(this.timeRemaining / 60);
        let seconds = this.timeRemaining % 60;
        this.timerText.setText("Time: " + minutes + ":" + (seconds < 10 ? "0" + seconds : seconds));
        if (this.timeRemaining <= 0) {
            // Pass stats to Loser scene
            this.scene.start("loserScene", {
                score: this.score,
                wordsCompleted: this.wordsCompleted,
                shieldsBroken: this.shieldsBroken,
                typosMade: this.typosMade
            });
        }
    }
}

window.Play = Play;
