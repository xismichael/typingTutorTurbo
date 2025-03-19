class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'menuScene' });
    }
  
    preload() {
        this.load.image('menu', './assets/menu.png');
        this.load.spritesheet('letters', './assets/A-Z.png', { frameWidth: 100, frameHeight: 100 });
    }
  
    create() {
        let centerX = this.cameras.main.width / 2;
        let centerY = this.cameras.main.height / 2;
  
        let bg = this.add.image(centerX, centerY, 'menu').setOrigin(0.5, 0.5);
        bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
  
        // space, I and C keys with fade-out transitions
        this.input.keyboard.on("keydown-SPACE", () => {
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start("playScene");
            });
        });
        this.input.keyboard.on("keydown-I", () => {
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start("instructionsScene");
            });
        });
        this.input.keyboard.on("keydown-C", () => {
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start("creditsScene");
            });
        });
  
        // bouncing title letters
        let words = ["TYPING", "TUTOR", "TURBO"];
        let rowSpacing = 120;
        let startingY = centerY - ((words.length - 1) * rowSpacing) / 2;
  
        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            let rowY = startingY + i * rowSpacing;
            let startX = centerX - (word.length * 100) / 2;
            for (let j = 0; j < word.length; j++) {
                let char = word[j];
                let letterIndex = char.charCodeAt(0) - 65;
                let variant = Phaser.Math.Between(0, 4);
                let frame = letterIndex * 13 + variant;
                let letterSprite = this.add.sprite(startX + j * 100 + 50, rowY + 50, 'letters', frame);
  
                this.tweens.add({
                    targets: letterSprite,
                    y: letterSprite.y + 20,
                    ease: 'Sine.inOut',
                    duration: 800,
                    yoyo: true,
                    repeat: -1,
                    delay: Phaser.Math.Between(0, 500)
                });
            }
        }
  
        // bottom label text
        let textY = startingY + 2 * rowSpacing + 250;
        let instructions = "Press SPACE to play\n I ---> Tutorial C ---> for Credits";
        let instructionText = this.add.text(centerX, textY, instructions, {
            fontFamily: 'Comic Sans MS',
            fontSize: '28px',  // Smaller font size
            fill: '#ffffff',
            align: 'center',
            padding: {
                x: 19,
                y: 19
            }
        });
        instructionText.setOrigin(0.5);
        instructionText.setPadding(0, 0, 0, 10);
  
        // make the text pulsate by scaling up and down
        this.tweens.add({
            targets: instructionText,
            scale: 1.1,         
            ease: 'Sine.inOut',
            duration: 1200,
            yoyo: true,
            repeat: -1
        });
    }
}
  
window.Menu = Menu;