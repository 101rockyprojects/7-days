<script>
	import { base } from '$app/paths';
	import ParallaxBackground from './ParallaxBackground.svelte';

	let { songUrl = 'https://meloday.rockybarrios10.workers.dev/bFEgS8Eu50?specialDay' } = $props();

	let isPlaying = $state(false);
	let audio = $state(null);

	function togglePlay() {
		if (!audio) {
			audio = new Audio(songUrl);
			audio.addEventListener('ended', () => { isPlaying = false; });
			audio.addEventListener('error', () => { isPlaying = false; });
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

<div class="relative min-h-screen w-full overflow-hidden select-none">
	<!-- Background -->
	<ParallaxBackground backImage="/images/mix-bg.jpeg" day={0} />

	<!-- Dark overlay -->
	<div class="absolute inset-0 bg-black/50"></div>

	<!-- Content -->
	<div class="relative z-10 flex flex-col items-center justify-center min-h-screen gap-8 px-4">
		<!-- Title -->
		<h1 class="text-4xl md:text-5xl font-[family-name:var(--font-felipa)] text-white text-center drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
			Awesome Mix Vol. 1
		</h1>

		<!-- Vinyl -->
		<div class="relative w-56 h-56 md:w-72 md:h-72">
			<img
				src="{base}/images/vinil.jpg"
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
