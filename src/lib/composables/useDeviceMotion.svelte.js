/**
 * useDeviceMotion - Svelte 5 Rune-based composable for device sensors
 * Handles gyroscope, accelerometer, and provides fallback to mouse/scroll
 */

export function useDeviceMotion({ disableMouse = false } = {}) {
  // Sensor state
  let alpha = $state(null);
  let beta = $state(null);
  let gamma = $state(null);
  let isSupported = $state(false);
  let permissionState = $state('prompt'); // 'prompt' | 'granted' | 'denied'
  let inputMode = $state('static'); // 'gyroscope' | 'accelerometer' | 'mouse' | 'scroll' | 'static'

  // Base orientation for relative positioning
  let baseOrientation = $state(null);

  // Mouse state (desktop fallback)
  let mouseX = $state(0);
  let mouseY = $state(0);
  let innerWidth = $state(0);
  let innerHeight = $state(0);

  // Scroll state
  let scrollY = $state(0);

  // Derived: relative orientation values
  let relativeBeta = $derived(
    baseOrientation && beta !== null ? beta - baseOrientation.beta : 0
  );
  let relativeGamma = $derived(
    baseOrientation && gamma !== null ? (gamma - baseOrientation.gamma) * -1 : 0
  );

  // Derived: normalized tilt values (-1 to 1)
  let normalizedTiltX = $derived.by(() => {
    if (inputMode === 'gyroscope' && isSupported) {
      return Math.max(-1, Math.min(1, relativeGamma / 45));
    }
    if (inputMode === 'mouse') {
      return (mouseX / innerWidth) * 2 - 1;
    }
    return 0;
  });

  let normalizedTiltY = $derived.by(() => {
    if (inputMode === 'gyroscope' && isSupported) {
      return Math.max(-1, Math.min(1, relativeBeta / 45));
    }
    if (inputMode === 'mouse') {
      return (mouseY / innerHeight) * 2 - 1;
    }
    return 0;
  });

  // Derived: CSS transform values
  let tiltXDeg = $derived(normalizedTiltX * 15); // Max 15 degrees
  let tiltYDeg = $derived(normalizedTiltY * 15);
  let translateX = $derived(normalizedTiltX * 25); // Max 25px
  let translateY = $derived(normalizedTiltY * 25);

  // Handle device orientation
  function handleOrientation(event) {
    if (event.alpha === null && event.beta === null && event.gamma === null) {
      return;
    }

    alpha = event.alpha;
    beta = event.beta;
    gamma = event.gamma;
    isSupported = true;
    inputMode = 'gyroscope';

    // Calibrate on first real data
    if (!baseOrientation) {
      baseOrientation = {
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma
      };
    }
  }

  // Handle device motion (accelerometer)
  function handleMotion(event) {
    const acceleration = event.accelerationIncludingGravity;
    if (!acceleration || acceleration.x === null) {
      return;
    }

    // Use acceleration for translation
    const sensitivity = 25;
    translateX = acceleration.x * -sensitivity;
    translateY = acceleration.y * sensitivity;
    inputMode = 'accelerometer';
    isSupported = true;
  }

  // Handle mouse move (desktop fallback)
  function handleMouseMove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    if (inputMode === 'static') {
      inputMode = 'mouse';
    }
  }

  // Handle scroll (additional depth)
  function handleScroll() {
    scrollY = window.scrollY;
  }

  // Request permission for iOS
  async function requestPermission() {
    // Check if iOS permission API is available
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const permission = await DeviceOrientationEvent.requestPermission();
        permissionState = permission;

        if (permission === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
          return true;
        }
        return false;
      } catch (error) {
        console.error('Permission request failed:', error);
        permissionState = 'denied';
        return false;
      }
    }

    // Non-iOS: no permission needed
    window.addEventListener('deviceorientation', handleOrientation);
    permissionState = 'granted';
    return true;
  }

  // Initialize based on device capabilities
  function initialize() {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const hasDeviceOrientation = 'DeviceOrientationEvent' in window;
    const hasDeviceMotion = 'DeviceMotionEvent' in window;

    if (isTouchDevice && hasDeviceOrientation) {
      // Check if iOS permission is needed
      const needsPermission = typeof DeviceOrientationEvent.requestPermission === 'function';

      if (needsPermission) {
        // Will need user gesture to request permission
        inputMode = 'mouse'; // Default until permission granted
      } else {
        // No permission needed, start listening
        window.addEventListener('deviceorientation', handleOrientation);
      }
    } else if (hasDeviceMotion) {
      window.addEventListener('devicemotion', handleMotion);
    }

    // Always add mouse and scroll listeners as fallback (unless mouse disabled)
    if (!disableMouse) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Set up resize listener
    function handleResize() {
      innerWidth = window.innerWidth;
      innerHeight = window.innerHeight;
    }
    handleResize();
    window.addEventListener('resize', handleResize);
  }

  // Cleanup
  function cleanup() {
    if (typeof window === 'undefined') return;
    window.removeEventListener('deviceorientation', handleOrientation);
    window.removeEventListener('devicemotion', handleMotion);
    if (!disableMouse) {
      window.removeEventListener('mousemove', handleMouseMove);
    }
    window.removeEventListener('scroll', handleScroll);
  }

  // Auto-initialize (client only)
  if (typeof window !== 'undefined') {
    initialize();
  }

  return {
    // Getters
    get alpha() { return alpha; },
    get beta() { return beta; },
    get gamma() { return gamma; },
    get isSupported() { return isSupported; },
    get permissionState() { return permissionState; },
    get inputMode() { return inputMode; },

    // Relative values
    get relativeBeta() { return relativeBeta; },
    get relativeGamma() { return relativeGamma; },

    // Normalized values (-1 to 1)
    get normalizedTiltX() { return normalizedTiltX; },
    get normalizedTiltY() { return normalizedTiltY; },

    // CSS-ready values
    get tiltXDeg() { return tiltXDeg; },
    get tiltYDeg() { return tiltYDeg; },
    get translateX() { return translateX; },
    get translateY() { return translateY; },

    // Mouse state
    get mouseX() { return mouseX; },
    get mouseY() { return mouseY; },
    get innerWidth() { return innerWidth; },
    get innerHeight() { return innerHeight; },

    // Scroll state
    get scrollY() { return scrollY; },

    // Methods
    requestPermission,
    cleanup
  };
}
