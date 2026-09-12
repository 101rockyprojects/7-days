<script>
	import { base } from '$app/paths';
	import ParallaxBackground from './ParallaxBackground.svelte';
	import FloatingStickers from './FloatingStickers.svelte';

	let { songUrl = `${base}/loco-loco.mp3` } = $props();

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
	let repeat = $state(false);
	let audio = $state(null);

	function togglePlay() {
		if (!audio) {
			audio = new Audio(songUrl);
			audio.loop = repeat;
			audio.addEventListener('ended', () => { if (!repeat) isPlaying = false; });
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

	function toggleRepeat() {
		repeat = !repeat;
		if (audio) audio.loop = repeat;
	}
</script>

<div class="tape-section">
	<!-- Background -->
	<ParallaxBackground backImage="/images/mix-bg.jpeg" middleImage="/images/lilies-right.webp" day={0} />
	<FloatingStickers {stickers} playing={isPlaying} />

	<!-- Dark overlay -->
	<div class="absolute inset-0 bg-black/50"></div>

	<!-- Content -->
	<div class="tape-content">
		<!-- Title -->
		<section class="text-center space-y-0 shrink-0">
			<h1 class="text-4xl md:text-5xl font-[family-name:var(--font-uncial)] text-white text-center drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
				Loco Loco
			</h1>
			<p class="text-white text-lg md:text-xl font-[family-name:var(--font-felipa)] text-center italic">
			    by @101rocky_bp w/ Suno
			</p>
		</section>

		<!-- Vinyl -->
		<div class="relative w-44 h-44 md:w-56 md:h-56 shrink-0">
			<img
				src="{base}/images/golden-vinil-disk.webp"
				alt="Vinyl"
				class="w-full h-full object-cover rounded-full shadow-[0_0_60px_rgba(0,0,0,0.8)]"
				class:spin={isPlaying}
				draggable="false"
			/>
			<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
				<div class="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/10"></div>
			</div>
		</div>

		<!-- Controls -->
		<div class="flex items-center gap-3 shrink-0">
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

			<!-- Repeat button -->
			<button
				onclick={toggleRepeat}
				class="w-10 h-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:scale-110 active:scale-95"
				class:active={repeat}
				aria-label={repeat ? 'Desactivar repetición' : 'Activar repetición'}
			>
				<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					<path d="M17 2l4 4-4 4"/>
					<path d="M3 11V9a4 4 0 0 1 4-4h14"/>
					<path d="M7 22l-4-4 4-4"/>
					<path d="M21 13v2a4 4 0 0 1-4 4H3"/>
				</svg>
			</button>
		</div>

		<!-- Lyrics section -->
		<div class="lyrics-mask">
			<div class="lyrics-scroll">
				<p>Hey, mi reina</p>
				<br>
				<p>Hace rato ando pensando, y no puedo soportar</p>
				<p>Componiendo y observando, ya no puedo respirar.</p>
				<p>Bebé, tú me vuelves loco, sería estúpido negar</p>
				<p>Tengo mi cerebro roto, de cómo poderle hablar...</p>
				<br>
				<p>A esa carita, (eso que mueves, de un lado a otro)</p>
				<p>Mis manos necesitan (cómo encender, poquito a poco)</p>
				<p>Y eso me tiene loco, loco loco...</p>
				<p>(y eso me tiene loco)</p>
				<br>
				<p>Deslumbra su presencia, saca esa inocencia,</p>
				<p>Pongámole indecencia, que esto no es mucha ciencia.</p>
				<p>Dale, mi reina, estoy en urgencia'</p>
				<p>Haz que esas caderas me hagan pedir clemencia</p>
				<br>
				<p>La reina roja está de racha, ñ</p>
				<p>cuidado me emborracha</p>
				<p>Soy adicto a los ojos café de esa bella muchacha.</p>
				<p>Enséñame, maestra</p>
				<p>Si eso' labios' tú me presta',</p>
				<p>me tomo un Daiquiri y hasta unos tragos extra.</p>
				<br>
				<p>Buena chica, me tienta'</p>
				<p>con sal y pimienta,</p>
				<p>Me derriten sus curva' cada vez que se sienta.</p>
				<p>Contra la tormenta,</p>
				<p>la distancia no cuenta,</p>
				<p>mi odisea sucede cuando tus ojos me encuentran...</p>
				<br>
				<p>Esta diosa está mortal, deja lo banal</p>
				<p>Ni Dante podría contra tu booty infernal</p>
				<p>Instinto animal, ritmo occidental</p>
				<p>Ya anhelo ir a recogerte en la capital (ja, ja)</p>
				<br>
				<p>Me quitas el aliento</p>
				<p>Debo dejar de hablar</p>
				<p>Solo es cuestión de tiempo</p>
				<p>Que te saque a bailar.</p>
				<p>Milagros, tú me vuelves loco (oh, oh)</p>
				<p>Sería estúpido negar (bebé, bebé)</p>
				<p>Tengo mi cerebro roto (culpa tuya)</p>
				<p>Anhelo poderle hablar...</p>
				<br>
				<p>A esa carita (eso que mueves, de un lado a otro)</p>
				<p>Mis manos necesitan (encenderte, poco a poco)</p>
				<p>Y eso me tiene loco, loco loco</p>
				<p>(Yo sé que soy tu loco)</p>
				<p>Ay, princesita (yo solo pienso, en un nosotros)</p>
				<p>Mis manos desean acariciarte (poco a poco)</p>
				<p>Yo sé que soy un loco, loco loco</p>
				<br>
				<p>(Eh, eh, eh)</p>
				<br>
				<p>Suno music</p>
				<p>El ingeniero</p>
				<p>Siempre por encima de tus expectativas</p>
				<br>
				<p>Mamasita, ya no puedo esperar</p>
				<p>Déjame invitarte a bailar</p>
				<p>Mua</p>
			</div>
		</div>
	</div>
</div>

<style>
	.tape-section {
		position: relative;
		width: 100%;
		height: 100dvh;
		overflow: hidden;
		user-select: none;
	}

	.tape-content {
		position: relative;
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		max-height: 100dvh;
		gap: 1.5rem;
		padding: 2rem 1rem;
		box-sizing: border-box;
	}

	.spin {
		animation: spin 3s linear infinite;
	}

	@keyframes spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	.lyrics-mask {
		position: relative;
		width: 100%;
		max-width: 32rem;
		flex: 1 1 0;
		min-height: 0;
		overflow: hidden;
		-webkit-mask-image: linear-gradient(
			to bottom,
			transparent 0%,
			black 15%,
			black 85%,
			transparent 100%
		);
		mask-image: linear-gradient(
			to bottom,
			transparent 0%,
			black 15%,
			black 85%,
			transparent 100%
		);
	}

	.lyrics-scroll {
		height: 100%;
		overflow-y: auto;
		padding: 2rem 1rem;
		color: rgba(255, 255, 255, 0.8);
		font-family: var(--font-felipa);
		font-size: 0.875rem;
		line-height: 1.625;
		text-align: center;
	}

	@media (min-width: 768px) {
		.lyrics-scroll {
			font-size: 1rem;
		}
	}

	.lyrics-scroll > :global(p + p) {
		margin-top: 1rem;
	}

	.lyrics-scroll > :global(br + p) {
		margin-top: 1.25rem;
	}

	.lyrics-scroll::-webkit-scrollbar {
		width: 4px;
	}

	.lyrics-scroll::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.2);
		border-radius: 2px;
	}

	.lyrics-scroll::-webkit-scrollbar-track {
		background: transparent;
	}

	button.active {
		background: rgba(255, 255, 255, 0.25);
		border-color: rgba(255, 255, 255, 0.5);
		box-shadow: 0 0 12px rgba(255, 255, 255, 0.15);
	}
</style>
