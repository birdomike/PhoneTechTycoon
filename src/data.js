// Component data structure
export const componentData = {
    displays: [
        { id: 'basic_lcd', name: 'Basic LCD', size: 4.7, resolution: 'HD', cost: 50, performance: 2 },
        { id: 'amoled', name: 'AMOLED', size: 5.5, resolution: 'FHD', cost: 120, performance: 7 }
    ],
    processors: [
        { id: 'basic_cpu', name: 'Basic CPU', cores: 2, speed: '1.8 GHz', cost: 80, performance: 3 },
        { id: 'mid_cpu', name: 'Mid-range CPU', cores: 4, speed: '2.2 GHz', cost: 150, performance: 6 }
    ],
    cameras: [
        { id: 'basic_cam', name: 'Basic Camera', mp: 8, features: 'HDR', cost: 40, performance: 2 },
        { id: 'dual_cam', name: 'Dual Camera', mp: 12, features: 'HDR, Portrait', cost: 100, performance: 5 }
    ],
    batteries: [
        { id: 'small_bat', name: 'Small Battery', capacity: '2000mAh', cost: 30, performance: 2 },
        { id: 'medium_bat', name: 'Medium Battery', capacity: '3000mAh', cost: 60, performance: 4 }
    ],
    materials: [
        { id: 'plastic', name: 'Plastic', durability: 3, cost: 20, performance: 1 },
        { id: 'aluminum', name: 'Aluminum', durability: 6, cost: 50, performance: 3 }
    ]
};