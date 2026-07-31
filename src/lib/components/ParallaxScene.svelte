<script>
	/**
	 * ParallaxScene Component
	 * Container that detects input source and provides tilt values
	 * Wraps ParallaxLayer components for depth effects
	 */

	import { useDeviceMotion } from '$lib/composables/useDeviceMotion.svelte.js';
	import { parallaxConfig } from '$lib/config/parallax.js';
	import ParallaxLayer from './ParallaxLayer.svelte';

	let {
		environment = 'field',
		showPermissionButton = true,
		enableScroll = true,
		children
	} = $props();

	const motion = useDeviceMotion();

	// Permission button state
	let showButton = $state(false);
	let permissionRequested = $state(false);

	// Check if we need to show permission button
	$effect(() => {
		const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
		const needsPermission = typeof DeviceOrientationEvent !== 'undefined' &&
			typeof DeviceOrientationEvent.requestPermission === 'function';

		if (isTouchDevice && needsPermission && !permissionRequested) {
			showButton = true;
		}

		return () => motion.cleanup();
	});

	// Handle permission request
	async function handleEnableMotion() {
		const granted = await motion.requestPermission();
		permissionRequested = true;
		if (granted) {
			showButton = false;
		}
	}

	// Compute scene transform for 3D effect
	let sceneTransform = $derived(
		`perspective(1000px) rotateY(${motion.tiltXDeg}deg) rotateX(${-motion.tiltYDeg}deg)`
	);
</script>

<div
	class="parallax-scene"
	style="transform: {sceneTransform};"
>
	<!-- Background Layer -->
	<ParallaxLayer
		speed={parallaxConfig.defaultSpeeds.far}
		tiltX={motion.translateX}
		tiltY={motion.translateY}
		scrollOffset={enableScroll ? motion.scrollY : 0}
	>
		<div class="parallax-bg"></div>
	</ParallaxLayer>

	<!-- Mid Layer -->
	<ParallaxLayer
		speed={parallaxConfig.defaultSpeeds.mid}
		tiltX={motion.translateX}
		tiltY={motion.translateY}
		scrollOffset={enableScroll ? motion.scrollY : 0}
	>
		<div class="parallax-mid"></div>
	</ParallaxLayer>

	<!-- Content Layer -->
	<ParallaxLayer
		speed={parallaxConfig.defaultSpeeds.near}
		tiltX={motion.translateX}
		tiltY={motion.translateY}
		scrollOffset={enableScroll ? motion.scrollY : 0}
	>
		{@render children?.()}
	</ParallaxLayer>

	<!-- Permission Button (iOS) -->
	{#if showButton && showPermissionButton}
		<div class="permission-overlay">
			<button
				onclick={handleEnableMotion}
				class="permission-button"
				aria-label="Activar efectos de movimiento"
			>
				<span class="permission-icon">📱</span>
				<span class="permission-text">Activar Efectos</span>
			</button>
		</div>
	{/if}
</div>

<style>
	.parallax-scene {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		transform-style: preserve-3d;
	}

	.parallax-bg,
	.parallax-mid {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.permission-overlay {
		position: absolute;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 100;
	}

	.permission-button {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 24px;
		background: rgba(0, 0, 0, 0.8);
		color: white;
		border: none;
		border-radius: 28.8px;
		font-family: var(--font-helvetica-now);
		font-size: 14px;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.permission-button:hover {
		background: rgba(0, 0, 0, 0.9);
	}

	.permission-icon {
		font-size: 20px;
	}

	.permission-text {
		font-weight: 500;
	}
</style>
