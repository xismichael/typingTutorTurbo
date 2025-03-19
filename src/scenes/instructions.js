class Instructions extends Phaser.Scene {
  constructor() {
    super({ key: 'instructionsScene' });
  }

  preload() {
  }

  create() {
    let centerX = this.cameras.main.width / 2;
    let centerY = this.cameras.main.height / 2;

    let instructionsText = "How to Play\n\n" +
                           "- Use the up and down arrow keys to pick which word you want to type\n\n" +
                           "- When the letter turns white you may move on to the next\n\n" +
                           "- Hollow letters are shielded and require multiple clicks to turn white\n\n" +
                           "- Solid letters only require 1 click\n\n" +
                           "- WATCH OUT! typing a letter for a word may go towards other words\n\n" +
                           "- Earn points and beat high scores!\n\n" +
                           "Press I to return back to menu";

    let text = this.add.text(centerX, centerY, instructionsText, {
      fontFamily: 'Comic Sans MS',
      fontSize: '36px',
      fill: '#ffffff',
      align: 'center'
    });
    text.setOrigin(0.5);

    this.input.keyboard.on("keydown-I", () => {
      this.cameras.main.fadeOut(500, 0, 0, 0);
    });

    this.cameras.main.on('camerafadeoutcomplete', () => {
      this.scene.start("menuScene");
    });
  }
}

window.Instructions = Instructions;
