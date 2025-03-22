export class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }
    
    preload() {
        // Load assets for main menu
        // Using a colored rectangle for now instead of an image
    }
    
    create() {
        // Create a background
        this.add.rectangle(640, 360, 1280, 720, 0x87CEEB);
        
        // Add game title
        this.add.text(640, 150, 'PhoneTech Tycoon', { 
            fontSize: '64px', 
            fontStyle: 'bold',
            fill: '#fff'
        }).setOrigin(0.5);
        
        // Add game subtitle
        this.add.text(640, 220, 'Design, Test, Innovate', { 
            fontSize: '32px', 
            fill: '#fff'
        }).setOrigin(0.5);
        
        // Create buttons to navigate to different scenes
        this.createButton(640, 350, 'DESIGN LAB', 'DesignLab');
        this.createButton(640, 450, 'R&D LAB', 'ResearchLab');
        this.createButton(640, 550, 'SETTINGS', 'Settings');
    }
    
    createButton(x, y, text, targetScene) {
        const button = this.add.text(x, y, text, { 
            fontSize: '28px', 
            fill: '#fff',
            backgroundColor: '#4287f5',
            padding: { x: 30, y: 15 }
        }).setOrigin(0.5);
        
        button.setInteractive({ useHandCursor: true });
        
        // Add hover effect
        button.on('pointerover', () => {
            button.setBackgroundColor('#5a9bff');
        });
        
        button.on('pointerout', () => {
            button.setBackgroundColor('#4287f5');
        });
        
        button.on('pointerdown', () => {
            this.scene.start(targetScene);
        });
        
        return button;
    }
}