class Menu extends Phaser.Scene {
    constructor() {
      super({ key: 'menuScene' });
    }
    preload() {
      this.load.image('menu', './assets/menu.png');
    }
    create() {
      let centerX = this.cameras.main.width / 2;
      let centerY = this.cameras.main.height / 2;
      this.add.image(centerX, centerY, 'menu');
      let instructions = "Typing Tutor Turbo\n\nInstructions:\nType the words correctly!\n\nPress SPACE to start!";
      let instructionText = this.add.text(centerX, centerY + 50, instructions, { font: "32px Arial", fill: "#ffffff", align: "center" });
      instructionText.setOrigin(0.5);
      this.input.keyboard.on("keydown-SPACE", () => {
        this.scene.start("playScene");
      });
    }
  }
  window.Menu = Menu;
  