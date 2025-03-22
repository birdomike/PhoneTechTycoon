import { componentData } from '../data.js';

export class DesignLab extends Phaser.Scene {
    constructor() {
        super('DesignLab');
    }
    
    create() {
        // Create lab background
        this.add.rectangle(640, 360, 1280, 720, 0x333333);
        
        // Add title
        this.add.text(640, 50, 'DESIGN LAB', { 
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
        
        // Initialize phone design data
        this.phoneDesign = {
            display: null,
            processor: null,
            camera: null,
            battery: null,
            materials: null,
            cost: 0,
            performance: 0
        };
        
        // Create component stations
        const stations = [
            { name: 'Display', type: 'displays', x: 250, y: 200 },
            { name: 'Processor', type: 'processors', x: 450, y: 200 },
            { name: 'Camera', type: 'cameras', x: 650, y: 200 },
            { name: 'Battery', type: 'batteries', x: 850, y: 200 },
            { name: 'Materials', type: 'materials', x: 1050, y: 200 }
        ];
        
        // Create stations
        stations.forEach(station => {
            this.createStation(station.name, station.type, station.x, station.y);
        });
        
        // Add phone preview area
        this.phonePreview = this.add.rectangle(1000, 500, 200, 350, 0x888888);
        this.phonePreview.setStrokeStyle(2, 0xffffff);
        
        // Add phone name
        this.phoneName = this.add.text(1000, 350, 'Your Phone', { 
            fontSize: '20px', 
            fill: '#fff'
        }).setOrigin(0.5);
        
        // Add stats display
        this.statsText = this.add.text(800, 600, 'Stats:\nCost: $0\nPerformance: 0', { 
            fontSize: '20px', 
            fill: '#fff' 
        });
        
        // Add assemble button (disabled initially)
        this.assembleButton = this.add.text(640, 650, 'ASSEMBLE PHONE', { 
            fontSize: '28px', 
            fill: '#888', // Gray when disabled
            backgroundColor: '#555',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5);
        
        // Selection panel (hidden initially)
        this.selectionPanel = null;
    }
    
    createStation(name, type, x, y) {
        const station = this.add.container(x, y);
        
        // Add station background
        const bg = this.add.rectangle(0, 0, 180, 100, 0x555555).setOrigin(0.5);
        
        // Add station label
        const label = this.add.text(0, 0, name, { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
        
        // Add status text (initially shows "Not Selected")
        const status = this.add.text(0, 35, 'Not Selected', { 
            fontSize: '16px', 
            fill: '#ff9999' 
        }).setOrigin(0.5);
        
        station.add([bg, label, status]);
        
        // Store reference to status text
        station.status = status;
        
        // Make station interactive
        bg.setInteractive({ useHandCursor: true });
        bg.on('pointerdown', () => {
            this.openComponentSelection(type, name, station);
        });
        
        return station;
    }
    
    openComponentSelection(componentType, stationName, station) {
        // Close existing panel if there is one
        if (this.selectionPanel) {
            this.selectionPanel.destroy();
        }
        
        // Create component selection panel
        this.selectionPanel = this.add.container(640, 360);
        
        // Add panel background
        const panelBg = this.add.rectangle(0, 0, 800, 500, 0x333333).setOrigin(0.5);
        panelBg.setStrokeStyle(2, 0xffffff);
        
        // Add title
        const title = this.add.text(0, -220, `Select ${stationName}`, { 
            fontSize: '28px', 
            fill: '#fff' 
        }).setOrigin(0.5);
        
        // Add close button
        const closeBtn = this.add.text(380, -220, 'X', { 
            fontSize: '24px', 
            fill: '#fff',
            backgroundColor: '#ff0000',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);
        
        closeBtn.setInteractive({ useHandCursor: true });
        closeBtn.on('pointerdown', () => {
            this.selectionPanel.destroy();
            this.selectionPanel = null;
        });
        
        this.selectionPanel.add([panelBg, title, closeBtn]);
        
        // Add component options
        const components = componentData[componentType];
        
        components.forEach((component, index) => {
            const y = -120 + (index * 100);
            
            const componentBtn = this.add.container(0, y);
            
            const btnBg = this.add.rectangle(0, 0, 700, 80, 0x555555).setOrigin(0.5);
            const btnText = this.add.text(-330, -15, component.name, { 
                fontSize: '22px', 
                fill: '#fff' 
            }).setOrigin(0, 0.5);
            
            // Add component stats as text
            let statsText = '';
            for (const [key, value] of Object.entries(component)) {
                if (key !== 'id' && key !== 'name') {
                    statsText += `${key}: ${value} | `;
                }
            }
            statsText = statsText.slice(0, -3); // Remove the last separator
            
            const btnStats = this.add.text(-330, 15, statsText, { 
                fontSize: '16px', 
                fill: '#ccc' 
            }).setOrigin(0, 0.5);
            
            componentBtn.add([btnBg, btnText, btnStats]);
            
            btnBg.setInteractive({ useHandCursor: true });
            btnBg.on('pointerdown', () => {
                // Store the selected component
                const typeKey = componentType.endsWith('s') ? 
                    componentType.slice(0, -1) : componentType;
                
                this.phoneDesign[typeKey] = component;
                
                // Update station status
                station.status.setText(component.name);
                station.status.setFill('#99ff99');
                
                // Update phone stats
                this.updatePhoneStats();
                
                // Close the selection panel
                this.selectionPanel.destroy();
                this.selectionPanel = null;
                
                // Check if all components are selected to enable assemble button
                this.checkAssembleButton();
            });
            
            this.selectionPanel.add(componentBtn);
        });
    }
    
    updatePhoneStats() {
        // Recalculate phone stats based on selected components
        let totalCost = 0;
        let totalPerformance = 0;
        let componentsSelected = 0;
        
        for (const [type, component] of Object.entries(this.phoneDesign)) {
            if (component && typeof component === 'object') {
                totalCost += component.cost || 0;
                totalPerformance += component.performance || 0;
                componentsSelected++;
            }
        }
        
        this.phoneDesign.cost = totalCost;
        this.phoneDesign.performance = totalPerformance;
        
        // Update stats display
        this.statsText.setText(
            `Stats:\nCost: $${totalCost}\nPerformance: ${totalPerformance}`
        );
        
        // Update phone visualization
        this.updatePhoneVisualization();
    }
    
    updatePhoneVisualization() {
        // Very basic visualization - just change color based on materials
        if (this.phoneDesign.materials) {
            const quality = this.phoneDesign.materials.performance / 5; // Scale 0-1
            const color = Phaser.Display.Color.HSLToColor(0.6, 0.8, 0.2 + (quality * 0.4)).color;
            this.phonePreview.setFillStyle(color);
        }
        
        // Adjust phone size based on display size if selected
        if (this.phoneDesign.display) {
            const size = this.phoneDesign.display.size;
            const height = 250 + (size * 20); // Simple scaling
            this.phonePreview.setSize(height / 2, height);
        }
    }
    
    checkAssembleButton() {
        const requiredComponents = ['display', 'processor', 'camera', 'battery', 'materials'];
        const allSelected = requiredComponents.every(comp => this.phoneDesign[comp] !== null);
        
        if (allSelected) {
            // Enable assemble button
            this.assembleButton.setFill('#fff');
            this.assembleButton.setBackgroundColor('#4287f5');
            
            if (!this.assembleButton.input || !this.assembleButton.input.enabled) {
                this.assembleButton.setInteractive({ useHandCursor: true });
                this.assembleButton.on('pointerdown', () => {
                    // In the future, this will transition to the assembly scene
                    console.log('Assemble button clicked!');
                    alert('Assembly feature coming soon!');
                });
            }
        }
    }
}