//import Letter from "./Letter.js";

class Word extends Phaser.GameObjects.Container {
    constructor(scene, x, y, word, texture, underline) {
        super(scene, x, y);

        this.scene = scene;
        this.word = word.toUpperCase();
        this.letters = [];
        this.underline = underline;

        let letterWidth = 100;
        //padding so that the word is always centered
        let padd = (letterBoxWidth - (this.word.length * 100)) / 2;

        // Generate letters
        for (let i = 0; i < this.word.length; i++) {
            let char = this.word[i];

            // Randomly assign states
            let state = Phaser.Math.RND.pick(["normal", "vanishing", "shielded"]);

            let letterX = padd + letterWidth * i;
            let letter = new Letter(scene, letterX, 0, char, texture, state, underline);

            this.letters.push(letter);
            this.add(letter);
        }

        // Add word to the scene's active word list
        if (!this.scene.words) this.scene.words = [];
        this.scene.words.push(this);

        //add the container
        this.scene.add.existing(this);
    }

    handleKeyPress(event) {
        let key = event.key.toUpperCase();
        let swapChance = 0.3; // 30% chance the letter will be applied to another word

        //if not a letter it returns
        if (!/^[A-Z]$/.test(key)) {
            return; // Only handle valid letters
        }

        // Get the first untyped letter in the word
        let firstUntypedLetter = this.letters.find(letter => !letter.isTyped());

        // Check if the typed key matches the first untyped letter
        if (firstUntypedLetter.char !== key) {
            //!!!!!!!!
            //INSERT LETTER MISS SOUND
            //!!!!!!!!

            //handle miss, score count, etc
            //to be implemented
            console.log(`Missed letter: ${key}. Expected: ${firstUntypedLetter.char}`);
            return;
        }

        //!!!!!!!!
        //INSERT LETTER HIT SOUND
        //!!!!!!!!

        let swapped = false;

        // Decide whether to swap to another word
        if (Math.random() < swapChance) {
            let otherWords = this.scene.words.filter(w => w !== this);

            for (let word of otherWords) {
                let alternativeLetter = word.letters.find(letter => !letter.isTyped() && letter.char === key);
                if (alternativeLetter) {
                    alternativeLetter.applyState(); // Apply the key press to another word instead

                    // Check if the target word is fully typed and remove it
                    if (word.isTyped()) {
                        word.removeWord();
                    }

                    swapped = true;
                    break;
                }
            }
        }

        // If not swapped, apply to the current word
        if (!swapped) {
            firstUntypedLetter.applyState();

            if (this.isTyped()) {
                this.removeWord();
            }
        }
    }


    removeWord() {
        // Remove the word from the scene's active words list
        this.scene.words = this.scene.words.filter(w => w !== this);
        // Destroy the word
        this.destroy();
    }

    isTyped() {
        return this.letters.every(letter => letter.isTyped());
    }

    destroy() {
        this.letters.forEach(letter => letter.destroy());
        this.scene.repositionWords();
        super.destroy();
    }
}
