<script>
	import { base } from '$app/paths';
	import menuData from '$lib/data/menu.json';
  	import ParallaxBackground from './ParallaxBackground.svelte';

	let { onSelect, partnerName = 'Mi Amor', isDay7Unlocked = false } = $props();

	let sections = $derived(
		menuData.days.filter(s => !s.unlockDay || isDay7Unlocked)
	);

	let visible = $state(new Set());

	let bgImages = $derived({
		back: menuData.background.back || '',
		middle: menuData.background.middle || '',
		front: menuData.background.front || ''
	});

	function setupObserver(node, id) {
		const observer = new IntersectionObserver(
			entries => {
				for (const entry of entries) {
					if (entry.isIntersecting) visible.add(id);
					else visible.delete(id);
					visible = visible;
				}
			},
			{ threshold: 0.4 }
		);
		observer.observe(node);
		return { destroy: () => observer.disconnect() };
	}
</script>

<div class="min-h-screen bg-[#0a0a0a] flex flex-col items-center px-[2dvw] pt-20 pb-8 md:pt-24 md:pb-12 relative overflow-hidden">
	<!-- Parallax Background -->
	<!-- Parallax Background -->
	<ParallaxBackground backImage={bgImages.back} middleImage={bgImages.middle} frontImage={bgImages.front} day={0}/>

	<header class="text-center mb-10 md:mb-14 space-y-3 relative z-10">
		<h1
			class="text-4xl md:text-6xl lg:text-7xl font-[family-name:var(--font-felipa)] leading-tight gold-text"
		>
			Hola, {partnerName}
		</h1>
		<p class="text-[#D2CFA0]/60 font-[family-name:var(--font-cinzel)] text-base md:text-lg tracking-wide">
			Tres años de amor, aventura y recuerdos
		</p>
	</header>

	<div class="grid grid-cols-1 sm:grid-cols-2 gap-[4dvw] w-full max-w-5xl relative z-10">
		{#each sections as section, i}
			<button
				class="menu-item group relative rounded-2xl cursor-pointer border-none p-0 text-left"
				style="margin: {3 + i * 0.5}dvw; aspect-ratio: 4/3; object-fit: revert;"
				onclick={() => onSelect(section.id)}
				aria-label={section.title}
			>
				<img
					src="{base}{section.image}"
					alt={section.title}
					class="menu-img w-full h-full object-cover transition-transform duration-500 ease-out"
					class:scale-110={visible.has(section.id)}
					loading="lazy"
					use:setupObserver={section.id}
				/>

				<div
					class="tooltip-overlay absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
				>
					<span class="text-white text-2xl md:text-3xl font-[family-name:var(--font-felipa)] drop-shadow-lg">
						{section.title}
					</span>
					<span class="text-white text-sm font-[family-name:var(--font-cinzel)] tracking-wider mt-1">
						{section.subtitle}
					</span>
				</div>
			</button>
		{/each}
	</div>

	<footer class="mt-10 md:mt-14 text-center relative z-10">
		<p class="text-[#D2CFA0]/30 text-sm font-[family-name:var(--font-script)] italic">
			Cada sección guarda una pieza de nuestra historia...
		</p>
	</footer>
</div>

<style>
	.gold-text {
		background: linear-gradient(135deg, #E8C84A, #AC8400, #B8962E);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.menu-item:active {
		transform: scale(0.97);
	}

	.menu-item:nth-child(1) { --tilt: 8deg; --slide-x: 15px; --slide-y: -10px; }
	.menu-item:nth-child(2) { --tilt: -12deg; --slide-x: -25px; --slide-y: 8px; }
	.menu-item:nth-child(3) { --tilt: -7deg; --slide-x: 20px; --slide-y: 15px; }
	.menu-item:nth-child(4) { --tilt: 18deg; --slide-x: -12px; --slide-y: -20px; }

	.menu-item {
		transform: rotate(var(--tilt, 0deg)) translate(var(--slide-x, 0), var(--slide-y, 0));
		transition: transform 0.4s ease;
		overflow: visible;
	}

	.menu-item:nth-child(1) { transform: rotate(8deg) translate(15px, -10px); }
	.menu-item:nth-child(2) { transform: rotate(-12deg) translate(-25px, 8px); }
	.menu-item:nth-child(3) { transform: rotate(-7deg) translate(20px, 15px); }
	.menu-item:nth-child(4) { transform: rotate(18deg) translate(-12px, -20px); }

	.tooltip-overlay {
		background: radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, transparent 70%);
	}

	.menu-img {
		will-change: transform;
	}

	@media (hover: hover) {
		.menu-item:hover {
			transform: rotate(0deg) translate(0, 0) scale(1.05);
		}
		.menu-item:hover .menu-img {
			transform: scale(1.1);
		}
	}
</style>
