import { MainMenu } from './scenes/MainMenu.js';
import { DesignLab } from './scenes/DesignLab.js';
import { ResearchLab } from './scenes/ResearchLab.js';
import { Settings } from './scenes/Settings.js';

const config = {
    type: Phaser.AUTO,
    title: 'PhoneTech Tycoon',
    description: 'Design, Test, Innovate',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [
        MainMenu,
        DesignLab,
        ResearchLab,
        Settings
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

new Phaser.Game(config);