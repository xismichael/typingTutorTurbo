class Loser extends Phaser.Scene {
  constructor() {
    super({ key: 'loserScene' });
  }

  preload() {
    // Load loserscreen image
    this.load.image('loser', './assets/loserscreen.png');

    // Load stats music
    this.load.audio("statsMusic", "assets/stats.mp3");
  }

  create(data) {
    // Stop background music when entering loser scene
    let bgMusic = this.sound.get("backgroundMusic");
    if (bgMusic && bgMusic.isPlaying) {
        bgMusic.stop();
    }

    // Ensure stats music resets and plays every time
    if (this.sound.get("statsMusic")) {
        this.sound.removeByKey("statsMusic"); // Remove any old instance
    }

    this.statsMusic = this.sound.add("statsMusic", { loop: false, volume: 0.5 });
    this.statsMusic.play();

    // Center coordinates
    let centerX = this.cameras.main.width / 2;
    let centerY = this.cameras.main.height / 2;

    this.add.image(centerX, centerY, 'loser').setOrigin(0.5);

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
      lineSpacing: 20              
    };

    // stats display
    let statsDisplay = this.add.text(centerX, centerY - 50, statsText, statsStyle);
    statsDisplay.setOrigin(0.5);

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

    // space to play again
    let instructionText = this.add.text(centerX, centerY + 200, "Press SPACE to return to menu", instructionStyle);
    instructionText.setOrigin(0.5);

    // space to return to menu
    this.input.keyboard.once("keydown-SPACE", () => {
      // Stop stats music before leaving scene
      if (this.statsMusic && this.statsMusic.isPlaying) {
        this.statsMusic.stop();
      }

      this.cameras.main.fadeOut(500, 0, 0, 0);
    });

    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start("menuScene");
    });
  }

  shutdown() {
    // Stop and remove stats music when leaving scene
    if (this.statsMusic && this.statsMusic.isPlaying) {
      this.statsMusic.stop();
      this.sound.removeByKey("statsMusic"); // Ensure it reloads next time
    }
  }
}

window.Loser = Loser;
