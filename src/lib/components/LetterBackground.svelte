<script>
	/**
	 * LetterBackground Component
	 * 2-layer parallax background driven by scroll + gyroscope
	 * Renders transparent if no images provided
	 */

	import { base } from '$app/paths';
	import { useDeviceMotion } from '$lib/composables/useDeviceMotion.svelte.js';

	let {
		backImage = '',
		middleImage = '',
		frontImage = ''
	} = $props();

	const motion = useDeviceMotion({ disableMouse: false });

	let hasImages = $derived(backImage || middleImage || frontImage);

	// Scroll-based depth offsets (back moves more, middle medium, front less)
	let backY = $derived(motion.scrollY * 0.35);
	let middleY = $derived(motion.scrollY * 0.18);
	let frontY = $derived(motion.scrollY * 0.05);

	// Gyroscope tilt offsets
	let tiltX = $derived(motion.translateX * 0.3);
	let tiltY = $derived(motion.translateY * 0.3);

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
				class="letter-bg-layer middle-layer max-w-2xl mx-auto"
				style="transform: {middleTransform}; will-change: transform;"
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
				class="letter-bg-layer front-layer max-w-2xl mx-auto"
				style="transform: {frontTransform}; will-change: transform;"
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
		filter: brightness(0.85);
		scale: 0.85;
	}

	.middle-layer {
		filter: drop-shadow(5px -18px 40px rgba(0, 0, 0, 0.4));
		filter: brightness(0.95);
		scale: 1;
		margin-top: 5%;
		min-width: 100vw;
	}

	.front-layer {
		filter: drop-shadow(5px -18px 20px rgba(0, 0, 0, 0.8));
		filter: brightness(1.05);
		scale: 1.15;
	}
</style>
