class Menu extends Phaser.Scene {
  constructor() {
      super({ key: 'menuScene' });
  }

  preload() {
      this.load.image('menu', './assets/menu.png');
  }

  create() {
      // Calculate the center of the screen
      let centerX = this.cameras.main.width / 2;
      let centerY = this.cameras.main.height / 2;

      let bg = this.add.image(centerX, centerY, 'menu').setOrigin(0.5, 0.5);
      bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

      // Text content
      let instructions = 
          "Typing Tutor Turbo\n\n" +
          "Instructions:\n" +
          "Type the words correctly!\n" +
          "Beware of Shields!\n\n"+
          "Press SPACE to start!";

      let instructionText = this.add.text(centerX-10, centerY + 150, instructions, {
          fontFamily: 'Comic Sans MS',   
          fontSize: '36px',
          fill: '#ffffff',               
          align: 'center'
      });
      instructionText.setOrigin(0.5);

      
      let gradient = instructionText.context.createLinearGradient(0, 0, instructionText.width, 0);
      gradient.addColorStop(0, '#ff0000');
      gradient.addColorStop(0.2, '#ffff00');
      gradient.addColorStop(0.4, '#00ff00');
      gradient.addColorStop(0.6, '#00ffff');
      gradient.addColorStop(0.8, '#0000ff');
      gradient.addColorStop(1, '#ff00ff');

      instructionText.setFill(gradient);

      // press space to start
      this.input.keyboard.on("keydown-SPACE", () => {
          this.scene.start("playScene");
      });
  }
}

window.Menu = Menu;
