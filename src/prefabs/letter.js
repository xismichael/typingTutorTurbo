class Letter extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, char, texture, state = "normal", underline) {
        super(scene, x, y, texture);

        this.scene = scene;
        this.char = char.toUpperCase();
        this.state = state;
        this.startingShieldStrength = Phaser.Math.Between(1, 7);
        this.alpha = 1;
        this.defaultTexture = texture;
        this.underline = underline;

        this.totalFramesPerLetter = 13;
        this.totalRegularFrames = 5;
        this.totalShieldedFrames = 7;
        this.typedFrameIndex = 12;
        this.shieldedFrameIndex = 5;


        // Get frame index from sprite sheets
        this.defaultFrame = this.getFrameIndex(this.char) * this.totalFramesPerLetter + this.randomColor();
        this.typedFrame = this.getFrameIndex(this.char) * this.totalFramesPerLetter + this.typedFrameIndex;
        this.shieldFrame = this.getFrameIndex(this.char) * this.totalFramesPerLetter + this.shieldedFrameIndex; //+ this.randomColor() 

        // Add sprite to scene
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        // Set texture
        this.setTexture(this.defaultTexture);

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
        return Math.floor(Math.random() * this.totalRegularFrames);
    }

    initializeState() {
        switch (this.state) {
            case "vanishing":
                this.fadeOut();
                break;
            case "shielded":
                this.shieldStrength = this.startingShieldStrength; // Needs multiple presses
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
        let newFrame = this.getFrameIndex(this.char) * this.totalFramesPerLetter + this.randomColor() + this.shieldedFrameIndex;
        while (this.shieldFrame == newFrame) {
            newFrame = this.getFrameIndex(this.char) * this.totalFramesPerLetter + this.randomColor() + this.shieldedFrameIndex;
        }
        return newFrame;
    }

    hitShield() {

        if (this.shieldStrength > 1) {
            this.shieldStrength--;
            //console.log(`Shield hit! Remaining strength: ${this.shieldStrength}`);

            // Update shield frame to indicate progress
            this.setFrame(this.shieldFrame + this.shieldStrength);//+ Math.floor((this.startingShieldStrength - this.shieldStrength) * (this.totalShieldedFrames / this.startingShieldStrength)));


            // Restart the regeneration timer
            this.startShieldRegenTimer();
        } else {
            this.removeShield();
        }

        // if (this.state === "shielded") {
        //     this.shieldStrength--;

        //     // Update shield frame
        //     this.shieldFrame = this.newShieldFrame();

        //     if (this.shieldStrength > 0) {
        //         this.setFrame(this.shieldFrame);
        //     } else {
        //         this.removeShield();
        //     }
        // }
    }

    startShieldRegenTimer() {
        // Clear any existing timer to avoid overlap
        if (this.regenTimer) {
            this.regenTimer.remove(false);
        }

        // Set a timer for shield regeneration
        this.regenTimer = this.scene.time.delayedCall(800, () => {
            if (this.state === "shielded") {
                this.shieldStrength = this.startingShieldStrength; // Reset shield to full strength
                //console.log("Shield regenerated to full strength!");
                this.setFrame(this.shieldFrame); // Reset shield frame
            }
        });
    }

    removeShield() {
        this.state = "normal";
        //this.applyState();
        this.setFrame(this.defaultFrame);

    }


    fadeOut() {
        this.setTexture(this.underline);
        //this.setFrame(this.defaultFrame);

        //this.alpha = 0;

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

        //this.alpha = 1;

        this.setTexture(this.defaultTexture);
        this.setFrame(this.defaultFrame);
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

