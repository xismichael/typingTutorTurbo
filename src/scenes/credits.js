class Credits extends Phaser.Scene {
    constructor() {
        super({ key: 'creditsScene' });
    }
  
    preload() {
        // Load your new images
        this.load.image('arcade', './assets/arcade.jpg');
        this.load.image('thefake', './assets/thefake.jpg');
    }
  
    create() {
        let centerX = this.cameras.main.width / 2;
        let centerY = this.cameras.main.height / 2;
  
        // Create the left image
        let leftImage = this.add.image(200, centerY, 'arcade').setOrigin(0.5);
        leftImage.setDisplaySize(450, 300); 
  
        // Create the right image
        let rightImage = this.add.image(this.cameras.main.width - 200, centerY, 'thefake').setOrigin(0.5);
        rightImage.setDisplaySize(450, 300); 
  
        // Credits text in the center
        let creditsText = 
            "Credits\n\n" +
            "The Fake: Strong Bad Email\n\n" +
            "Background Music: Pixabay\n\n" +
            "Sound Effects: Pixabay\n\n" +
            "Art: Tony and Michael\n\n\n" +
            "Press C to Return to Menu";
  
        let text = this.add.text(centerX, centerY, creditsText, {
            fontFamily: 'Comic Sans MS',
            fontSize: '42px',
            fill: '#ffffff',
            align: 'center',
            padding: { left: 10, right: 10, top: 10, bottom: 10 },
            resolution: 2
        });
        text.setOrigin(0.5);
  
        // Pulsating animation for the credits text
        this.tweens.add({
            targets: text,
            scale: 1.1,
            ease: 'Sine.inOut',
            duration: 1500,
            yoyo: true,
            repeat: -1
        });
  
        // Return back to menu on "C" press
        this.input.keyboard.on("keydown-C", () => {
            this.cameras.main.fadeOut(500, 0, 0, 0);
        });
  
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start("menuScene");
        });
    }
}
  
window.Credits = Credits;
