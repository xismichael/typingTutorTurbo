class Loser extends Phaser.Scene {
  constructor() {
    super({ key: 'loserScene' });
  }

  preload() {
    // Load your background or "loser" image
    this.load.image('loser', './assets/loserscreen.png');
  }

  create(data) {
    // Center coordinates
    let centerX = this.cameras.main.width / 2;
    let centerY = this.cameras.main.height / 2;

    // Display the "game over" background image (if you want it to fill the screen, adjust accordingly)
    this.add.image(centerX, centerY, 'loser').setOrigin(0.5);

    // Create a multi-line text string with the player's stats
    let statsText = 
      `Total Points: ${data.score}\n` +
      `Words Completed: ${data.wordsCompleted}\n` +
      `Shields Broken: ${data.shieldsBroken}\n` +
      `Typos Made: ${data.typosMade}`;

    // Style for the stats text
    let statsStyle = {
      fontFamily: 'Comic Sans MS',  // Comic Sans
      fontSize: '48px',            // Large font
      fill: '#ffffff',             // White text
      align: 'center',
      stroke: '#000000',           // Black stroke
      strokeThickness: 6,
      shadow: {
        offsetX: 3,
        offsetY: 3,
        color: '#333333',
        blur: 5,
        stroke: true,
        fill: true
      },
      lineSpacing: 20              // Extra space between lines
    };

    // Display the stats in the middle of the screen
    let statsDisplay = this.add.text(centerX, centerY - 50, statsText, statsStyle);
    statsDisplay.setOrigin(0.5);

    // Smaller text style for instructions
    let instructionStyle = {
      fontFamily: 'Comic Sans MS',
      fontSize: '36px',
      fill: '#ffffff',
      align: 'center',
      stroke: '#000000',
      strokeThickness: 4,
      shadow: {
        offsetX: 2,
        offsetY: 2,
        color: '#333333',
        blur: 2,
        stroke: true,
        fill: true
      }
    };

    // Display instruction to restart the game (below the stats)
    let instructionText = this.add.text(centerX, centerY + 200, "Press SPACE to play again", instructionStyle);
    instructionText.setOrigin(0.5);

    // Listen for the SPACE key to return to the menu
    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("menuScene");
    });
  }
}

window.Loser = Loser;
