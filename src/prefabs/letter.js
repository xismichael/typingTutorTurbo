class Letter extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, char, texture, state = "normal") {
        super(scene, x, y, texture);

        this.scene = scene;
        this.char = char.toUpperCase();
        this.state = state;
        this.shieldStrength = 1;
        this.texture = texture;
        this.alpha = 1;

        // Get frame index from sprite sheets
        this.defaultFrame = this.getFrameIndex(this.char) * 22 + this.randomColor();
        this.typedFrame = this.getFrameIndex(this.char) * 22 + 20;
        this.shieldFrame = this.getFrameIndex(this.char) * 22 + this.randomColor() + 10;

        // Add sprite to scene
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);


        // Set texture
        this.setTexture(this.texture);

        // Apply initial state behavior
        this.applyState();
    }

    getFrameIndex(char) {
        return char.charCodeAt(0) - 65; // A = 0, B = 1, ..., Z = 25
    }

    randomColor() {
        let x = Math.floor(Math.random() * 10);
        if (x % 2) {
            return x - 1;
        }

        return x;
    }

    applyState() {
        switch (this.state) {
            case "vanishing":
                this.fadeOutOverTime();
                break;
            case "shielded":
                this.shieldStrength = 10//Phaser.Math.Between(1, 10); // Needs multiple presses
                this.setFrame(this.shieldFrame); // Start from the first shield frame
                break;
            case "typed":
                this.setFrame(this.typedFrame);
                break;
            default:
                this.setFrame(this.defaultFrame);
                break;
        }
    }

    hitShield() {
        if (this.state === "shielded") {
            this.shieldStrength--;

            // Update shield frame
            this.shieldFrame = this.getFrameIndex(this.char) * 22 + this.randomColor() + 10;

            if (this.shieldStrength > 0) {
                this.setFrame(this.shieldFrame); // Update shield breaking effect
            } else {
                this.removeShield();
            }
        }
    }

    removeShield() {
        this.state = "normal";
        this.setFrame(this.defaultFrame);
    }

    // fadeOutOverTime() {
    //     this.scene.tweens.add({
    //         targets: this,
    //         alpha: { from: 1, to: 0 },  // Fully transparent
    //         duration: Phaser.Math.Between(3000, 6000),  // Time in milliseconds
    //         ease: 'Linear',
    //     });
    // }
    fadeOutOverTime() {
        this.scene.tweens.add({
            targets: this,
            alpha: { from: this.alpha, to: 0 }, // Ensure a smooth transition
            duration: Phaser.Math.Between(3000, 6000),
            ease: 'Linear'
        });
    }



    startVanishing() {
        let fadeTime = Phaser.Math.Between(3000, 6000); // Random fade duration

        this.scene.time.addEvent({
            delay: fadeTime,
            callback: () => {
                this.setAlpha(0); // Make the letter invisible
                this.state = "vanished"; // Update state
                this.reappearAfterDelay();
            },
            loop: false
        });
    }

    reappearAfterDelay() {
        let reappearTime = Phaser.Math.Between(2000, 4000); // Time before reappearing

        this.scene.time.addEvent({
            delay: reappearTime,
            callback: () => {
                this.setAlpha(1); // Make the letter visible again
                this.state = "normal"; // Reset state
                this.startVanishing(); // Restart fading cycle
            },
            loop: false
        });
    }

    setState(newState) {
        this.state = newState;
        this.applyState();
    }

    isShielded() {
        return this.state === "shielded";
    }

    isTyped() {
        return this.state === "typed";
    }
}
