class Instructions extends Phaser.Scene {
  constructor() {
    super({ key: 'instructionsScene' });
  }

  preload() {
  }

  create() {
    let centerX = this.cameras.main.width / 2;
    let centerY = this.cameras.main.height / 2;

    // Header
    let header = this.add.text(centerX, centerY - 400, "How to Play", {
      fontFamily: 'Comic Sans MS',
      fontSize: '42px',
      fill: '#ff0000',
      fontStyle: 'bold',
      align: 'center'
    });
    header.setOrigin(0.5);

    // Main instructions content.
    let instructionsContent = "- Use the up and down arrow keys to pick which word you want to type\n\n" +
                                "- When the letter turns white you may move on to the next\n\n" +
                                "- Hollow letters are shielded and require multiple clicks to turn white\n\n" +
                                "- Solid letters only require 1 click\n\n" +
                                "- WATCH OUT! typing a letter for a word may go towards other words\n\n" +
                                "- SHIELDS REGENERATE so type quickly!\n\n" +
                                "- Earn points and beat high scores!";
    let instructions = this.add.text(centerX, centerY, instructionsContent, {
      fontFamily: 'Comic Sans MS',
      fontSize: '36px',
      fill: '#ffffff',
      align: 'center'
    });
    instructions.setOrigin(0.5);

   
    let returnText = this.add.text(centerX, centerY + 400, "Press I to return back to menu", {
      fontFamily: 'Comic Sans MS',
      fontSize: '24px',
      fill: '#ffffff',
      align: 'center'
    });
    returnText.setOrigin(0.5);

    // Fade out to menu when I is pressed
    this.input.keyboard.on("keydown-I", () => {
      this.cameras.main.fadeOut(500, 0, 0, 0);
    });

    this.cameras.main.on('camerafadeoutcomplete', () => {
      this.scene.start("menuScene");
    });
  }
}

window.Instructions = Instructions;
