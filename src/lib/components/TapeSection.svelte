<script>
	import { base } from '$app/paths';
	import ParallaxBackground from './ParallaxBackground.svelte';
	import FloatingStickers from './FloatingStickers.svelte';

	let { songUrl = `${base}/love-song.mp3`, isDevMode = false } = $props();

	const stickers = [
		{ image: '/images/ballon-letter-M.webp', side: 'left', sideMargin: 6, bottom: '30%', rotate: -5, size: 'large' },
		{ image: '/images/blue-balloon-heart.webp', side: 'left', sideMargin: 9, bottom: '72%', rotate: -50, size: 'tiny' },
		{ image: '/images/blue-balloon-heart.webp', side: 'left', sideMargin: 12, bottom: '74%', rotate: -12, size: 'small' },
		{ image: '/images/blue-balloon-23.webp', side: 'left', sideMargin: 22, bottom: '10%', rotate: -8, size: 'large' },
		{ image: '/images/blue-balloons-heart.webp', side: 'left', sideMargin: 0, bottom: '0%', rotate: 0, size: 'extralarge' },
		{ image: '/images/happy-birthday-balloons-center.webp', side: 'left', sideMargin: 10, bottom: '75%', rotate: 0, size: 'extralarge' },
		{ image: '/images/happy-birthday-cat.webp', side: 'right', sideMargin: 0, bottom: '8%', rotate: 7, size: 'large' },
		{ image: '/images/blue-heart-cake.webp', side: 'right', sideMargin: 8, bottom: '0%', rotate: -5, size: 'medium' },
		{ image: '/images/blue-balloon-heart.webp', side: 'right', sideMargin: 8, bottom: '72%', rotate: 50, size: 'small' },
		{ image: '/images/blue-balloon-heart.webp', side: 'right', sideMargin: 18, bottom: '74%', rotate: -55, size: 'tiny' },
		{ image: '/images/blue-balloon-heart.webp', side: 'right', sideMargin: 12, bottom: '75%', rotate: 9, size: 'medium' },
		{ image: '/images/brindis.webp', side: 'right', sideMargin: 21, bottom: '0%', rotate: 0, size: 'large' },
		{ image: '/images/happy-birthday-title.webp', side: 'right', sideMargin: 18, bottom: '16%', rotate: 3, size: 'extralarge' },
		{ image: '/images/red-balloons-heart.webp', side: 'right', sideMargin: 0, bottom: '18%', rotate: 7, size: 'extralarge' },
	];

	let isPlaying = $state(false);
	let audio = $state(null);

	function togglePlay() {
		if (!audio) {
			audio = new Audio(songUrl);
			audio.addEventListener('ended', () => { isPlaying = false; });
			audio.addEventListener('error', () => {
				isPlaying = false;
				audio = null;
			});
		}

		if (isPlaying) {
			audio.pause();
			isPlaying = false;
		} else {
			audio.play();
			isPlaying = true;
		}
	}
</script>

{#if !isDevMode}
<div class="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col items-center justify-center gap-4" style="background: repeating-linear-gradient(45deg, #0a0a0a, #0a0a0a 20px, #1a1a00 20px, #1a1a00 40px);">
	<span class="text-[#E8C84A] text-4xl font-[family-name:var(--font-felipa)]">🚧 En construcción 🚧</span>
	<span class="text-[#E8C84A]/60 text-sm font-[family-name:var(--font-cinzel)]">Sección lista pronto</span>
	<span class="text-[#E8C84A]/60 text-sm font-[family-name:var(--font-cinzel)] font-bold">No te desesperes, chiquita ;)</span>
</div>
{/if}

<div class="relative min-h-screen w-full overflow-hidden select-none">
	<!-- Background -->
	<ParallaxBackground backImage="/images/mix-bg.jpeg" middleImage="/images/lilies-right.webp" day={0} />
	<FloatingStickers {stickers} playing={isPlaying} />

	<!-- Dark overlay -->
	<div class="absolute inset-0 bg-black/50"></div>

	<!-- Content -->
	<div class="relative z-10 flex flex-col items-center justify-center min-h-screen gap-8 px-4">
		<!-- Title -->
		<section class="text-center space-y-0">
			<h1 class="text-4xl md:text-5xl font-[family-name:var(--font-uncial)] text-white text-center drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
				Love song
			</h1>
			<p class="text-white text-lg md:text-xl font-[family-name:var(--font-felipa)] text-center italic">
				Unseen Schaaf
			</p>
		</section>

		<!-- Vinyl -->
		<div class="relative w-56 h-56 md:w-72 md:h-72">
			<img
				src="{base}/images/golden-vinil-disk.webp"
				alt="Vinyl"
				class="w-full h-full object-cover rounded-full shadow-[0_0_60px_rgba(0,0,0,0.8)]"
				class:spin={isPlaying}
				draggable="false"
			/>
			<!-- Center hole -->
			<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
				<div class="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/10"></div>
			</div>
		</div>

		<!-- Play button -->
		<button
			onclick={togglePlay}
			class="group flex items-center gap-3 px-8 py-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:scale-105 active:scale-95"
			aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
		>
			{#if isPlaying}
				<svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
					<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
				</svg>
				<span class="text-white font-[family-name:var(--font-cinzel)] text-sm tracking-wide">Pausar</span>
			{:else}
				<svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
					<path d="M8 5v14l11-7z"/>
				</svg>
				<span class="text-white font-[family-name:var(--font-cinzel)] text-sm tracking-wide">Reproducir</span>
			{/if}
		</button>
	</div>
</div>

<style>
	.spin {
		animation: spin 3s linear infinite;
	}

	@keyframes spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}
</style>
