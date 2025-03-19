class Credits extends Phaser.Scene {
    constructor() {
        super({ key: 'creditsScene' });
    }
  
    preload() {
    }
  
    create() {
        let centerX = this.cameras.main.width / 2;
        let centerY = this.cameras.main.height / 2;
  
        let creditsText = "Credits\n\nThe Fake: Strong Bad Email\n\nBackground Music: Pixabay\n\nSound Effects: Pixabay\n\nArt: Tony and Michael\n\n\nPress C to Return to Menu";
        let text = this.add.text(centerX, centerY, creditsText, {
            fontFamily: 'Comic Sans MS',
            fontSize: '42px',
            fill: '#ffffff',
            align: 'center'
        });
        text.setOrigin(0.5);
  
        // return back to menu
        this.input.keyboard.on("keydown-C", () => {
            this.cameras.main.fadeOut(500, 0, 0, 0);
        });
  
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start("menuScene");
        });
    }
}
  
window.Credits = Credits;
