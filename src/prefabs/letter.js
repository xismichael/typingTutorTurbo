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

        // Initialize state
        this.initializeState();
    }

    getFrameIndex(char) {
        return char.charCodeAt(0) - 65; // A = 0, B = 1, ..., Z = 25
    }

    randomColor() {
        let x = Math.floor(Math.random() * 10);
        return x % 2 ? x - 1 : x;
    }

    initializeState() {
        switch (this.state) {
            case "vanishing":
                this.setFrame(this.defaultFrame);
                this.fadeOutOverTime();
                break;
            case "shielded":
                this.shieldStrength = Phaser.Math.Between(2, 8); // Needs multiple presses
                this.setFrame(this.shieldFrame);
                break;
            case "typed":
                this.setFrame(this.typedFrame);
                break;
            default:
                this.setFrame(this.defaultFrame);
                break;
        }
    }

    applyState() {
        switch (this.state) {
            case "shielded":
                this.hitShield();
                break;
            case "vanishing":
                this.stopFadingAndRestore(); // Stop fading when typed
                break;
            case "normal":
                this.state = "typed";
                this.setFrame(this.typedFrame);
                break;
            default:
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

    fadeOutOverTime() {
        this.fadeTween = this.scene.tweens.add({
            targets: this,
            alpha: { from: this.alpha, to: 0 }, // Smooth transition
            duration: Phaser.Math.Between(3000, 6000),
            ease: 'Linear'
        });
    }

    stopFadingAndRestore() {
        if (this.fadeTween) {
            this.fadeTween.stop(); // Stop the fading tween
        }
        this.alpha = 1;
        this.setState("normal");
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

