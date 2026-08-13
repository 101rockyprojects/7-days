<script>
	import { base } from '$app/paths';
	import menuData from '$lib/data/menu.json';
  	import ParallaxBackground from './ParallaxBackground.svelte';
	import FloatingStickers from './FloatingStickers.svelte';

	import { onMount } from 'svelte';

	let { onSelect, partnerName = 'Mi Amor', isDay7Unlocked = false, isDevMode = false } = $props();

	let sections = $derived(
		menuData.days.filter(s => !s.unlockDay || isDay7Unlocked)
	);

	let visible = $state(new Set());
	let sectionNodes = $state({});
	let zoomingSection = $state(null);

	let bgImages = $derived({
		back: menuData.background.back || '',
		middle: menuData.background.middle || '',
		front: menuData.background.front || ''
	});

	function checkCenter() {
		const viewH = window.innerHeight;
		const center = viewH / 2;
		const newVisible = new Set();

		for (const [id, node] of Object.entries(sectionNodes)) {
			if (!node) continue;
			const rect = node.getBoundingClientRect();
			const elCenter = rect.top + rect.height / 2;
			const dist = Math.abs(elCenter - center);
			if (dist < viewH * 0.35) {
				newVisible.add(id);
			}
		}

		visible = newVisible;
	}

	onMount(() => {
		window.addEventListener('scroll', checkCenter, { passive: true });
		checkCenter();
		return () => window.removeEventListener('scroll', checkCenter);
	});

	function trackNode(node, id) {
		sectionNodes[id] = node;
		return {
			destroy() { delete sectionNodes[id]; }
		};
	}

	function handleSelect(sectionId) {
		zoomingSection = sectionId;
	}

	function onZoomEnd(e) {
		if (e.target.classList.contains('menu-img') && zoomingSection) {
			const id = zoomingSection;
			zoomingSection = null;
			onSelect(id);
		}
	}
</script>

{#if !isDevMode}
<!-- TODO: remove this overlay when MainMenu is ready -->
<div class="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col items-center justify-center gap-4" style="background: repeating-linear-gradient(45deg, #0a0a0a, #0a0a0a 20px, #1a1a00 20px, #1a1a00 40px);">
	<span class="text-[#E8C84A] text-4xl font-[family-name:var(--font-felipa)]">🚧 En construcción 🚧</span>
	<span class="text-[#E8C84A]/60 text-sm font-[family-name:var(--font-cinzel)]">Menú principal listo pronto</span>
	<span class="text-[#E8C84A]/60 text-sm font-[family-name:var(--font-cinzel)] font-bold">No te desesperes, chiquita ;)</span>
</div>
{/if}

<div class="min-h-screen bg-[#0a0a0a] flex flex-col items-center px-[2dvw] pt-20 pb-8 md:pt-24 md:pb-12 relative overflow-hidden">
	<!-- Parallax Background -->
	<!-- Parallax Background -->
	<ParallaxBackground backImage={bgImages.back} middleImage={bgImages.middle} frontImage={bgImages.front} day={0}/>
	<FloatingStickers stickers={menuData.stickers || []} />

	<header class="text-center my-12 space-y-3 relative z-10">
		<!-- Glow backdrop -->
		<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
			<div class="w-80 h-32 bg-[#AC8400]/10 rounded-full blur-3xl animate-pulse-glow"></div>
		</div>

		<h1 class="header-title relative text-6xl md:text-8xl md:mt-5 font-[family-name:var(--font-felipa)] font-bold leading-tighter drop-shadow-sm">
			<span class="gold-text text-white drop-shadow-[0_0_20px_rgba(232,200,74,0.3)]" data-text="Feliz día,">Feliz día,</span>
			<br />
			<span class="partner-name text-velvet-red" data-text="{partnerName}">{partnerName}</span>
		</h1>
	</header>

	<div class="grid grid-cols-1 sm:grid-cols-2 gap-20 w-full max-w-5xl relative z-10 justify-items-center">
		{#each sections as section, i}
			<button
				class="menu-item group relative rounded-2xl cursor-pointer border-none p-0 text-left"
				class:in-viewport={visible.has(section.id)}
				class:zooming={zoomingSection === section.id}
				style="margin: {3 + i * 0.5}dvw; aspect-ratio: {section.aspectRatio === 'vertical' ? '3/4' : section.aspectRatio === 'horizontal' ? '4/3; max-width: 18em' : '1; max-width: 12em'};"
				onclick={() => handleSelect(section.id)}
				ontransitionend={onZoomEnd}
				aria-label={section.title}
			>
				<img
					src="{base}{section.image}"
					alt={section.title}
					class="menu-img w-full h-full object-cover transition-transform duration-500 ease-out"
					use:trackNode={section.id}
				/>

				<div
					class="tooltip-overlay absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
				>
					<span class="text-white w-max text-3xl md:text-4xl font-[family-name:var(--font-felipa)] drop-shadow-lg">
						{section.title}
					</span>
					<span class="text-white text-sm font-[family-name:var(--font-legible)] tracking-wider mt-1 italic">
						{section.subtitle}
					</span>
				</div>
			</button>
		{/each}
	</div>

	<footer class="mt-20 md:mt-14 text-center relative z-10 bg-[#0a0a0a]/80 px-4 py-6 rounded-lg">
		<p class="text-white text-4xl font-[family-name:var(--font-script)] italic">
			Cada sección guarda una pieza de nuestra historia...
		</p>
	</footer>
</div>

<style>
	.gold-text {
		background: linear-gradient(135deg, #ffeeab, #f7d97f, #fff8da, #ffebb4, #f8eec3);
		background-size: 200% auto;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: shimmer 4s ease-in-out infinite;
		filter: drop-shadow(0 0 20px rgba(232, 200, 74, 0.3));
		-webkit-text-stroke-width: 2px;
  		-webkit-text-stroke-color: rgba(255, 229, 137, 0.945);
		text-shadow: 0 0 40px rgba(78, 64, 9, 0.88);
	}

	.partner-name {
		background: linear-gradient(135deg, #e64747, #e94040, #be2739, #b60202);
		background-size: 200% auto;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: shimmer 4s ease-in-out infinite 0.5s;
		-webkit-text-stroke-width: 1px;
  		-webkit-text-stroke-color: rgba(179, 13, 13, 0.87);
		text-shadow: 0 -10px 20px rgba(255, 9, 9, 0.8);
	}

	.header-title {
		animation: floatTitle 6s ease-in-out infinite;
		text-shadow: 0 0 40px rgba(232, 200, 74, 0.2);
	}

	@keyframes shimmer {
		0%, 100% { background-position: 0% center; }
		50% { background-position: 200% center; }
	}

	@keyframes floatTitle {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-5px); }
	}

	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(10px); }
		to { opacity: 1; transform: translateY(0); }
	}

	.menu-item:active {
		transform: scale(0.97);
	}

	.menu-item:nth-child(1) { --tilt: -15deg; --slide-x: -15px; --slide-y: 80px; animation-delay: 2s; }
	.menu-item:nth-child(2) { --tilt: -12deg; --slide-x: -25px; --slide-y: 8px; animation-delay: 1s; }
	.menu-item:nth-child(3) { --tilt: -7deg; --slide-x: 20px; --slide-y: 35px; animation-delay: 2s; }
	.menu-item:nth-child(4) { --tilt: 18deg; --slide-x: -12px; --slide-y: -10px; animation-delay: 0.5s; }

	.menu-item {
		transform: rotate(var(--tilt, 0deg)) translate(var(--slide-x, 0), var(--slide-y, 0));
		transition: transform 0.4s ease;
		overflow: visible;
		animation: float 4s ease-in-out infinite;
	}

	@keyframes float {
		0%, 100% { translate: 0 0; }
		50% { translate: 0 -6px; }
	}

	.tooltip-overlay {
		background: radial-gradient(circle, rgba(0,0,0,0.85) 0%, transparent 80%);
	}

	.menu-img {
		will-change: transform;
	}

	@media (min-width: 640px) {
		.menu-item {
			scale: 1.15;
		}
	}

	@media (hover: hover) {
		.menu-item:hover {
			transform: rotate(0deg) translate(0, 0) scale(1.05);
		}
		.menu-item:hover .menu-img {
			transform: scale(1.5);
		}
		.menu-item:hover .tooltip-overlay {
			opacity: 1;
		}
	}

	/* Active state: when in center of viewport */
	.menu-item.in-viewport {
		transform: rotate(0deg) translate(0, 0) scale(1.1);
		z-index: 10;
	}

	.menu-item.in-viewport .tooltip-overlay {
		opacity: 1;
	}

	.menu-item.in-viewport .menu-img {
		transform: scale(1.1);
	}

	.menu-item.zooming {
		z-index: 20;
		pointer-events: none;
	}

	.menu-item.zooming .menu-img {
		transform: scale(8) rotate(var(--tilt));
		transition: transform 0.5s cubic-bezier(0.4, 0.2, 0.1, 0);
	}

	.menu-item.zooming .tooltip-overlay {
		opacity: 0;
	}
</style>
