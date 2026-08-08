<script>
	/**
	 * ParallaxBackground Component
	 * 2-layer parallax background driven by scroll + gyroscope
	 * Renders transparent if no images provided
	 */

	import { base } from '$app/paths';
	import { useDeviceMotion } from '$lib/composables/useDeviceMotion.svelte.js';

	let {
		backImage = '',
		middleImage = '',
		frontImage = '',
		day = 1
	} = $props();

	const motion = useDeviceMotion({ disableMouse: false });

	let hasImages = $derived(backImage || middleImage || frontImage);

	// Reduce parallax when page is tall (cap movement based on scroll height)
	let heightFactor = $derived(() => {
		if (typeof document === 'undefined') return 1;
		const h = document.documentElement.scrollHeight;
		return Math.min(1, 800 / h);
	});

	// Scroll-based depth offsets scaled by height
	let backY = $derived(motion.scrollY * 0.35 * heightFactor());
	let middleY = $derived(motion.scrollY * 0.15 * heightFactor());
	let frontY = $derived(motion.scrollY * 0.05 * heightFactor());

	// Gyroscope tilt offsets scaled by height
	let tiltX = $derived(motion.translateX * 0.3 * heightFactor());
	let tiltY = $derived(motion.translateY * 0.5 * heightFactor());

	let backTransform = $derived(
		`translate3d(${tiltX * 0.2}px, ${backY + tiltY * 0.2}px, 0)`
	);
	let middleTransform = $derived(
		`translate3d(${tiltX * 0.4}px, ${middleY + tiltY * 0.4}px, 0)`
	);
	let frontTransform = $derived(
		`translate3d(${tiltX * 0.6}px, ${frontY + tiltY * 0.6}px, 0)`
	);
</script>

{#if hasImages}
	<div class="letter-bg" aria-hidden="true">
		{#if backImage}
			<div
				class="letter-bg-layer back-layer"
				style="transform: {backTransform}; will-change: transform;"
			>
				<img
					src="{base}{backImage}"
					alt=""
					class="letter-bg-img object-cover"
					draggable="false"
				/>
			</div>
		{/if}

		{#if middleImage}
			<div
				class="letter-bg-layer middle-layer max-w-3xl mx-auto"
				style="transform: {middleTransform}; will-change: transform; {day === 1 ? '' : 'margin-top: 5%'}"
			>
				<img
					src="{base}{middleImage}"
					alt=""
					class="letter-bg-img object-cover"
					draggable="false"
				/>
			</div>
		{/if}

		{#if frontImage}
			<div
				class="letter-bg-layer front-layer max-w-3xl mx-auto"
				style="transform: {frontTransform}; will-change: transform; {day === 1 ? 'margin-top: 10%' : ''}"
			>
				<img
					src="{base}{frontImage}"
					alt=""
					class="letter-bg-img object-contain"
					draggable="false"
				/>
			</div>
		{/if}
	</div>
{/if}

<style>
	.letter-bg {
		position: fixed;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		z-index: 0;
	}

	.letter-bg-layer {
		position: absolute;
		inset: -20%;
		width: 140%;
		height: 140%;
	}

	.letter-bg-img {
		width: 100%;
		height: 100%;
		user-select: none;
		-webkit-user-drag: none;
	}

	.back-layer {
		filter: brightness(0.75);
		min-height: 100vh;
	}

	.middle-layer {
		filter: drop-shadow(5px -18px 40px rgba(0, 0, 0, 0.4));
		filter: brightness(0.9);
		scale: 1;
	}

	.front-layer {
		filter: drop-shadow(5px -18px 20px rgba(0, 0, 0, 0.8));
		filter: brightness(1.05);
		scale: calc(1 + 0.05 * 5dvh);
	}
</style>
