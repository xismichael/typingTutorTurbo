class Pointer extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, wordRows) {
        super(scene, x, y, texture);

        this.scene = scene;
        this.wordRows = wordRows;
        this.currentRow = 0;

        this.scene.add.existing(this);

        // Enable keyboard input
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        // Initial position
        this.y = this.wordRows[this.currentRow];
    }

    moveUp() {
        if (this.currentRow === 0) {
            this.currentRow = this.wordRows.length - 1;
        }
        else {
            this.currentRow--;
        }
        this.y = this.wordRows[this.currentRow];
    }

    moveDown() {
        if (this.currentRow === this.wordRows.length - 1) {
            this.currentRow = 0;
        }
        else {
            this.currentRow++;
        }
        this.y = this.wordRows[this.currentRow];
    }

    getCurrentY() {
        return this.y;
    }
}

