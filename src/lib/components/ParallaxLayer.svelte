<script>
	/**
	 * ParallaxLayer Component
	 * Individual depth layer with speed-based transform
	 * Uses GPU-accelerated translate3d for smooth performance
	 */

	let {
		speed = 0.5,
		tiltX = 0,
		tiltY = 0,
		scrollOffset = 0,
		children
	} = $props();

	// Derived: compute layer transform based on speed and input values
	let layerX = $derived(tiltX * speed);
	let layerY = $derived(tiltY * speed);
	let scrollY = $derived(scrollOffset * speed * 0.3);

	// CSS custom properties for GPU acceleration
	let transformStyle = $derived(
		`transform: translate3d(${layerX}px, ${layerY + scrollY}px, 0); will-change: transform;`
	);
</script>

<div
	class="parallax-layer"
	style={transformStyle}
>
	{@render children?.()}
</div>

<style>
	.parallax-layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.parallax-layer :global(*) {
		pointer-events: auto;
	}
</style>
