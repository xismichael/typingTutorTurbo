class Loser extends Phaser.Scene {
    constructor() {
      super({ key: 'loserScene' });
    }
    preload() {
      this.load.image('loser', './assets/loserscreen.png');
    }
    create() {
      let centerX = this.cameras.main.width / 2;
      let centerY = this.cameras.main.height / 2;
      this.add.image(centerX, centerY, 'loser');
      let instructionText = this.add.text(centerX, centerY + 100, "Press SPACE to play again", { font: "32px Arial", fill: "#ffffff" });
      instructionText.setOrigin(0.5);
      this.input.keyboard.once("keydown-SPACE", () => {
        this.scene.start("menuScene");
      });
    }
  }
  window.Loser = Loser;
  