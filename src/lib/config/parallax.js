/**
 * Parallax System Configuration
 * Centralized presets for all parallax environments
 */

export const environments = {
  field: {
    id: 'field',
    name: 'El Campo',
    background: {
      gradient: 'linear-gradient(180deg, #87CEEB 0%, #E0F7FA 60%, #81C784 60%, #4CAF50 100%)',
      image: '/assets/environments/field.svg'
    },
    layers: {
      far: {
        speed: 0.1,
        elements: [
          { type: 'ellipse', cx: '20%', cy: '70%', rx: '120px', ry: '30px', fill: '#A5D6A7', opacity: 0.6 },
          { type: 'ellipse', cx: '70%', cy: '75%', rx: '100px', ry: '25px', fill: '#C8E6C9', opacity: 0.5 }
        ]
      },
      mid: {
        speed: 0.3,
        elements: [
          { type: 'circle', cx: '15%', cy: '65%', r: '4px', fill: '#FFEB3B' },
          { type: 'circle', cx: '35%', cy: '70%', r: '3px', fill: '#E91E63' },
          { type: 'circle', cx: '65%', cy: '68%', r: '5px', fill: '#FF9800' },
          { type: 'circle', cx: '85%', cy: '72%', r: '3px', fill: '#9C27B0' }
        ]
      },
      near: {
        speed: 0.6,
        elements: [
          { type: 'butterfly', x: '25%', y: '60%', size: '24px' },
          { type: 'dandelion', x: '75%', y: '65%', size: '20px' }
        ]
      }
    },
    colors: {
      primary: '#4CAF50',
      secondary: '#81C784',
      accent: '#FFEB3B',
      sky: '#87CEEB'
    }
  },

  mountains: {
    id: 'mountains',
    name: 'Las Montañas',
    background: {
      gradient: 'linear-gradient(180deg, #1A237E 0%, #7B1FA2 60%, #E1F5FE 100%)',
      image: '/assets/environments/mountains.svg'
    },
    layers: {
      far: {
        speed: 0.1,
        elements: [
          { type: 'polygon', points: '0,100% 15%,40% 30%,100%', fill: '#4A148C', opacity: 0.7 },
          { type: 'polygon', points: '25%,100% 45%,30% 65%,100%', fill: '#6A1B9A', opacity: 0.8 },
          { type: 'polygon', points: '50%,100% 70%,35% 90%,100%', fill: '#9C27B0', opacity: 0.6 }
        ]
      },
      mid: {
        speed: 0.3,
        elements: [
          { type: 'polygon', x: '10%', y: '60%', width: '20px', height: '60px', fill: '#1B5E20' },
          { type: 'polygon', x: '80%', y: '55%', width: '25px', height: '70px', fill: '#2E7D32' },
          { type: 'ellipse', cx: '30%', cy: '25%', rx: '40px', ry: '15px', fill: '#E1F5FE', opacity: 0.6 }
        ]
      },
      near: {
        speed: 0.6,
        elements: [
          { type: 'snowflake', x: '20%', y: '30%', size: '8px' },
          { type: 'snowflake', x: '60%', y: '20%', size: '6px' },
          { type: 'snowflake', x: '80%', y: '40%', size: '7px' }
        ]
      }
    },
    colors: {
      primary: '#9C27B0',
      secondary: '#7B1FA2',
      accent: '#E1F5FE',
      sky: '#1A237E'
    }
  },

  forest: {
    id: 'forest',
    name: 'El Bosque',
    background: {
      gradient: 'linear-gradient(180deg, #1B5E20 0%, #2E7D32 50%, #388E3C 100%)',
      image: '/assets/environments/forest.svg'
    },
    layers: {
      far: {
        speed: 0.1,
        elements: [
          { type: 'rect', x: '8%', y: '15%', width: '15px', height: '85%', fill: '#3E2723' },
          { type: 'rect', x: '25%', y: '10%', width: '20px', height: '90%', fill: '#4E342E' },
          { type: 'rect', x: '70%', y: '12%', width: '18px', height: '88%', fill: '#3E2723' },
          { type: 'rect', x: '88%', y: '18%', width: '16px', height: '82%', fill: '#4E342E' }
        ]
      },
      mid: {
        speed: 0.3,
        elements: [
          { type: 'ellipse', cx: '12%', cy: '12%', rx: '60px', ry: '30px', fill: '#1B5E20' },
          { type: 'ellipse', cx: '30%', cy: '8%', rx: '70px', ry: '35px', fill: '#2E7D32' },
          { type: 'ellipse', cx: '75%', cy: '10%', rx: '65px', ry: '32px', fill: '#1B5E20' }
        ]
      },
      near: {
        speed: 0.6,
        elements: [
          { type: 'firefly', x: '38%', y: '50%', size: '6px' },
          { type: 'firefly', x: '62%', y: '60%', size: '5px' },
          { type: 'firefly', x: '45%', y: '65%', size: '5.5px' }
        ]
      }
    },
    colors: {
      primary: '#1B5E20',
      secondary: '#2E7D32',
      accent: '#FFEB3B',
      mist: '#9E9E9E'
    }
  },

  palace: {
    id: 'palace',
    name: 'El Palacio',
    background: {
      gradient: 'linear-gradient(180deg, #4A148C 0%, #1A0A2E 100%)',
      image: '/assets/environments/palace.svg'
    },
    layers: {
      far: {
        speed: 0.1,
        elements: [
          { type: 'rect', x: '10%', y: '15%', width: '25px', height: '85%', fill: '#FFD700', opacity: 0.3 },
          { type: 'rect', x: '84%', y: '15%', width: '25px', height: '85%', fill: '#FFD700', opacity: 0.3 }
        ]
      },
      mid: {
        speed: 0.3,
        elements: [
          { type: 'rect', x: '24%', y: '35%', width: '8px', height: '50%', fill: '#FFD700', opacity: 0.6 },
          { type: 'circle', cx: '25%', cy: '32%', r: '8px', fill: '#FF9800', opacity: 0.8 },
          { type: 'rect', x: '74%', y: '40%', width: '8px', height: '45%', fill: '#FFD700', opacity: 0.6 },
          { type: 'circle', cx: '75%', cy: '38%', r: '8px', fill: '#FF9800', opacity: 0.8 }
        ]
      },
      near: {
        speed: 0.6,
        elements: [
          { type: 'petal', x: '38%', y: '60%', size: '10px', color: '#E91E63' },
          { type: 'petal', x: '62%', y: '65%', size: '8px', color: '#F48FB1' },
          { type: 'petal', x: '50%', y: '50%', size: '12px', color: '#E91E63' }
        ]
      }
    },
    colors: {
      primary: '#FFD700',
      secondary: '#FFA000',
      accent: '#B71C1C',
      interior: '#4A148C'
    }
  },

  beach: {
    id: 'beach',
    name: 'La Playa',
    background: {
      gradient: 'linear-gradient(180deg, #FF9800 0%, #FF5722 40%, #E91E63 60%, #0288D1 60%, #01579B 80%, #F5DEB3 80%, #DEB887 100%)',
      image: '/assets/environments/beach.svg'
    },
    layers: {
      far: {
        speed: 0.1,
        elements: [
          { type: 'circle', cx: '75%', cy: '30%', r: '35px', fill: '#FFD54F', opacity: 0.9 },
          { type: 'ellipse', cx: '25%', cy: '20%', rx: '50px', ry: '15px', fill: '#FFCC80', opacity: 0.6 }
        ]
      },
      mid: {
        speed: 0.3,
        elements: [
          { type: 'path', d: 'M0,20 Q12.5,15 25,20 Q37.5,25 50,20 Q62.5,15 75,20 Q87.5,25 100,20', stroke: '#4FC3F7', strokeWidth: 3, fill: 'none' },
          { type: 'rect', x: '12%', y: '55%', width: '8px', height: '25%', fill: '#5D4037' },
          { type: 'ellipse', cx: '14%', cy: '52%', rx: '40px', ry: '20px', fill: '#4CAF50', transform: 'rotate(-15deg)' }
        ]
      },
      near: {
        speed: 0.6,
        elements: [
          { type: 'seagull', x: '50%', y: '25%', size: '20px' },
          { type: 'seagull', x: '88%', y: '18%', size: '15px' },
          { type: 'shell', x: '38%', y: '88%', size: '12px' }
        ]
      }
    },
    colors: {
      primary: '#0288D1',
      secondary: '#FF9800',
      accent: '#F5DEB3',
      sunset: '#FF5722'
    }
  },

  sky: {
    id: 'sky',
    name: 'El Cielo',
    background: {
      gradient: 'linear-gradient(180deg, #0D47A1 0%, #1565C0 50%, #42A5F5 100%)',
      image: '/assets/environments/sky.svg'
    },
    layers: {
      far: {
        speed: 0.1,
        elements: [
          { type: 'star', x: '12%', y: '10%', size: '3px' },
          { type: 'star', x: '30%', y: '18%', size: '2px' },
          { type: 'star', x: '50%', y: '7%', size: '4px' },
          { type: 'star', x: '70%', y: '15%', size: '3px' },
          { type: 'star', x: '88%', y: '12%', size: '2px' }
        ]
      },
      mid: {
        speed: 0.3,
        elements: [
          { type: 'ellipse', cx: '25%', cy: '40%', rx: '60px', ry: '20px', fill: '#FFFFFF', opacity: 0.2 },
          { type: 'ellipse', cx: '75%', cy: '35%', rx: '50px', ry: '18px', fill: '#FFFFFF', opacity: 0.15 },
          { type: 'circle', cx: '50%', cy: '60%', r: '25px', fill: '#FFD54F', opacity: 0.8 }
        ]
      },
      near: {
        speed: 0.6,
        elements: [
          { type: 'lantern', x: '20%', y: '60%', size: '24px' },
          { type: 'lantern', x: '75%', y: '65%', size: '20px' },
          { type: 'lantern', x: '45%', y: '55%', size: '16px' }
        ]
      }
    },
    colors: {
      primary: '#0D47A1',
      secondary: '#42A5F5',
      accent: '#FFD54F',
      horizon: '#FF9800'
    }
  }
};

export const parallaxConfig = {
  // Default speeds for each layer
  defaultSpeeds: {
    far: 0.1,
    mid: 0.3,
    near: 0.6
  },

  // Input source priority
  inputPriority: ['gyroscope', 'accelerometer', 'mouse', 'scroll', 'static'],

  // Sensitivity multipliers
  sensitivity: {
    gyroscope: 0.5,
    accelerometer: 25,
    mouse: 30,
    scroll: 0.3
  },

  // iOS permission settings
  ios: {
    permissionTimeout: 1000,
    autoRequest: false
  },

  // Performance settings
  performance: {
    useRAF: true,
    maxFPS: 60,
    reducedMotion: 'disable'
  },

  // Animation settings
  animation: {
    springStiffness: 0.1,
    springDamping: 0.8,
    smoothing: 0.1
  }
};

export function getEnvironment(id) {
  return environments[id] || environments.field;
}

export function getEnvironmentList() {
  return Object.values(environments).map(env => ({
    id: env.id,
    name: env.name
  }));
}
