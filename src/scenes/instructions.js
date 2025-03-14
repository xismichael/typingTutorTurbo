class Instructions extends Phaser.Scene {
    constructor() {
      super({ key: 'instructionsScene' });
    }
  
    preload() {
    }
  
    create() {
      let centerX = this.cameras.main.width / 2;
      let centerY = this.cameras.main.height / 2;

      let instructionsText = "How to Play\n\n1. Type each word correctly to earn points.\n2. Some letters have shields – you must break them by typing it multiple times\n3. The letter you click may go to other words\n4. A letter turns white when its been finished typing\n\nPress I to return to the menu";
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
