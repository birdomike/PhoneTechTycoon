export class Settings extends Phaser.Scene {
    constructor() {
        super('Settings');
    }
    
    create() {
        // Basic background
        this.add.rectangle(640, 360, 1280, 720, 0x222233);
        
        // Add title
        this.add.text(640, 50, 'SETTINGS', { 
            fontSize: '36px', 
            fontStyle: 'bold',
            fill: '#fff'
        }).setOrigin(0.5);
        
        // Add back button
        this.add.text(100, 50, 'Back', { 
            fontSize: '24px', 
            fill: '#fff',
            backgroundColor: '#333',
            padding: { x: 15, y: 10 }
        })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
        
        // Coming soon message
        this.add.text(640, 360, 'Settings - Coming Soon', { 
            fontSize: '32px', 
            fill: '#fff'
        }).setOrigin(0.5);
    }
}