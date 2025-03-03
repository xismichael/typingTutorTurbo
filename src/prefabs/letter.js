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
        this.defaultFrame = this.getFrameIndex(this.char) * 11 + this.randomColor();
        this.typedFrame = this.getFrameIndex(this.char) * 11 + 10;
        this.shieldFrame = this.getFrameIndex(this.char) * 11 + this.randomColor() + 5;

        // Add sprite to scene
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        // Set texture
        this.setTexture(this.texture);

        // Initialize state
        this.initializeState();

        //floating animation
        this.startFloatingEffect();
    }

    //get frame index based on the letter
    getFrameIndex(char) {
        return char.charCodeAt(0) - 65;
    }

    //random cllor
    randomColor() {
        let x = Math.floor(Math.random() * 5);
        return x;
    }

    initializeState() {
        switch (this.state) {
            case "vanishing":
                this.setFrame(this.defaultFrame);
                this.fadeOut();
                break;
            case "shielded":
                this.shieldStrength = Phaser.Math.Between(2, 6); // Needs multiple presses
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
                this.stopFadingAndRestore();
                break;
            case "normal":
                this.state = "typed";
                this.setFrame(this.typedFrame);
                break;
            default:
                break;
        }
    }

    newShieldFrame() {
        let newFrame = this.getFrameIndex(this.char) * 11 + this.randomColor() + 5;
        while (this.shieldFrame == newFrame) {
            newFrame = this.getFrameIndex(this.char) * 11 + this.randomColor() + 5;
        }
        return newFrame;
    }

    hitShield() {
        if (this.state === "shielded") {
            this.shieldStrength--;

            // Update shield frame
            this.shieldFrame = this.newShieldFrame();

            if (this.shieldStrength > 0) {
                this.setFrame(this.shieldFrame);
            } else {
                this.removeShield();
            }
        }
    }

    removeShield() {
        this.state = "normal";
        this.setFrame(this.defaultFrame);
    }

    fadeOut() {
        this.alpha = 0;

        // for fadding out slowly, which is removed because can be abused

        // this.fadeTween = this.scene.tweens.add({
        //     targets: this,
        //     alpha: { from: this.alpha, to: 0 }, // Smooth transition
        //     duration: Phaser.Math.Between(3000, 6000),
        //     ease: 'Linear'
        // });
    }

    stopFadingAndRestore() {
        // when fadeOut is tweened
        // if (this.fadeTween) {
        //     this.fadeTween.stop(); // Stop the fading tween
        // }

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

    //up and down motion for the letter
    startFloatingEffect() {
        let frameCounter = 0;
        let originalY = this.y;
        let floatAmount = -10;

        this.scene.time.addEvent({
            delay: 16,
            callback: () => {
                frameCounter++;

                if (frameCounter % 30 === 0) {
                    this.y = originalY; // Reset
                } else if (frameCounter % 15 === 0) {
                    this.y = originalY + floatAmount; // Move up
                }
            },
            loop: true
        });
    }
}

