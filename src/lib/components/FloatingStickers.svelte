<script>
	/**
	 * FloatingStickers Component
	 * Semi-fixed decorative stickers at page bottom
	 * Gyroscopic + subtle scroll parallax
	 */

	import { onMount } from 'svelte';
	import { base } from '$app/paths';

	let { stickers = [], playing = false } = $props();

	let scrollY = $state(0);
	let tiltX = $state(0);
	let tiltY = $state(0);
	let isMobile = $state(false);

	onMount(() => {
		const mq = window.matchMedia('(max-width: 639px)');
		isMobile = mq.matches;
		mq.addEventListener('change', (e) => { isMobile = e.matches; });

		function handleOrientation(e) {
			tiltX = Math.max(-30, Math.min(30, e.gamma || 0)) / 30;
			tiltY = Math.max(-30, Math.min(30, (e.beta || 0) - 45)) / 30;
		}

		function handleMouse(e) {
			tiltX = (e.clientX / window.innerWidth - 0.5) * 2;
			tiltY = (e.clientY / window.innerHeight - 0.5) * 2;
		}

		function handleScroll() {
			scrollY = window.scrollY;
		}

		if (window.DeviceOrientationEvent) {
			window.addEventListener('deviceorientation', handleOrientation, { passive: true });
		}
		window.addEventListener('mousemove', handleMouse, { passive: true });
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('deviceorientation', handleOrientation);
			window.removeEventListener('mousemove', handleMouse);
			window.removeEventListener('scroll', handleScroll);
		};
	});

	function getSize(size) {
		if (isMobile) {
			switch (size) {
				case 'tiny': return 'calc(2em + 5dvw)';
				case 'small': return 'calc(3em + 5dvw)';
				case 'medium': return 'calc(3.5em + 6dvw)';
				case 'large': return 'calc(4em + 7.5dvw)';
				case 'extralarge': return 'calc(8em + 10dvw)';
				default: return 'calc(4em + 5dvw)';
			}
		}
		switch (size) {
			case 'tiny': return 'calc(3em + 5dvw)';
			case 'small': return 'calc(5em + 5dvw)';
			case 'medium': return 'calc(6em + 6dvw)';
			case 'large': return 'calc(7em + 7.5dvw)';
			case 'extralarge': return 'calc(15em + 10dvw)';
			default: return 'calc(7em + 5dvw)';
		}
	}

	function getTransform(sticker, i) {
		const gyroX = tiltX * 18;
		const gyroY = tiltY * 12;
		const parallax = scrollY * (0.02 + i * 0.008);
		const rotate = sticker.rotate || 0;
		return `translate(${gyroX}px, ${gyroY - parallax}px) rotate(${rotate}deg)`;
	}
</script>

<div class="floating-stickers pointer-events-none" aria-hidden="true">
	{#each stickers as sticker, i}
		{@const sz = getSize(sticker.size)}
		<div
			class="sticker"
			class:bounce={playing}
			style="
				{sticker.side}: {isMobile ? (sticker.sideMargin > 5 ? `${(sticker.sideMargin * 0.5) - 3}em` : '-30px') : (`${(sticker.sideMargin) - 1}em` || '1em')};
				bottom: {sticker.bottom || '10%'};
				width: {sz};
				height: {sz};
				transform: {getTransform(sticker, i)};
			"
		>
			<img
				src="{base}{sticker.image}"
				alt=""
				class="sticker-img"
				loading="lazy"
			/>
		</div>
	{/each}
</div>

<style>
	.floating-stickers {
		position: fixed;
		inset: 0;
		z-index: 5;
		overflow: hidden;
		pointer-events: none;
	}

	.sticker {
		position: absolute;
		transition: transform 0.15s ease-out;
		will-change: transform;
		filter: drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.25));
	}

	.sticker.bounce {
		animation: bounce 1.5s ease-in-out infinite;
	}

	@keyframes bounce {
		0%, 100% { translate: 0 0; }
		25% { translate: 3px -5px; }
		50% { translate: -2px -8px; }
		75% { translate: -4px -3px; }
	}

	.sticker-img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		border-radius: 30%;
		opacity: 1;
		filter: saturate(0.75);
		mask-image: radial-gradient(ellipse at top, black 60%, transparent 100%);
		-webkit-mask-image: radial-gradient(circle, black 60%, transparent 100%);
	}
</style>
