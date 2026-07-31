<script>
	/**
	 * MainMenu Component
	 * 3D card grid for navigating to the three sections
	 * Enhanced with parallax environment cards
	 */

	import EnvironmentCard from './EnvironmentCard.svelte';

	let { onSelect, partnerName = 'Mi Amor', isDay7Unlocked = false } = $props();

	// Sections configuration with environments
	const baseSections = [
		{
			id: 'receipt',
			title: 'El Recibo',
			subtitle: 'Servicios de Amor',
			icon: '🧾',
			description: 'Un recibo lúdico de todos los servicios de amor prestados',
			environment: 'field',
			active: true
		},
		{
			id: 'roblox',
			title: 'Nuestro Mundo',
			subtitle: 'Memorias de Juegos',
			icon: '🎮',
			description: 'Citas virtuales y aventuras de gaming juntos',
			environment: 'mountains',
			active: false
		},
		{
			id: 'odyssey',
			title: 'La Odisea',
			subtitle: 'Nuestra Historia Épica',
			icon: '📖',
			description: 'La gran narrativa de nuestro amor',
			environment: 'palace',
			active: false
		}
	];

	const reviewSection = {
		id: 'review',
		title: 'Tu Reseña',
		subtitle: 'Califica Nuestro Amor',
		icon: '📝',
		description: 'Tu opinión me hace mejor cada día',
		environment: 'sky',
		active: false,
		isNew: true
	};

	let sections = $derived(isDay7Unlocked ? [...baseSections, reviewSection] : baseSections);
</script>

<div class="min-h-screen bg-[#0a0a0a]">
	<!-- Background Particles -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none">
		{#each Array(20) as _, i}
			<div
				class="absolute w-1 h-1 bg-[#AC8400]/20 rounded-full animate-float"
				style="left: {Math.random() * 100}%; top: {Math.random() * 100}%; animation-delay: {Math.random() * 5}s; animation-duration: {3 + Math.random() * 4}s;"
			></div>
		{/each}
	</div>

	<!-- Welcome Header -->
	<header class="relative text-center mb-12 md:mb-16 space-y-4 pt-8">
		<div class="animate-zoom-in-down">
			<h1 class="text-4xl md:text-6xl lg:text-7xl font-[family-name:var(--font-felipa)] text-gold-gradient leading-tight">
				Hola, {partnerName}
			</h1>
		</div>
		<div class="animate-fade-in-up" style="animation-delay: 200ms;">
			<p class="text-[#D2CFA0]/60 font-[family-name:var(--font-cinzel)] text-base md:text-lg tracking-wide">
				Tres años de amor, aventura y recuerdos
			</p>
			<div class="mt-4 flex items-center justify-center gap-3">
				<div class="w-12 h-px bg-gradient-to-r from-transparent to-[#AC8400]/50"></div>
				<span class="text-[#AC8400] text-sm">❤️</span>
				<div class="w-12 h-px bg-gradient-to-l from-transparent to-[#AC8400]/50"></div>
			</div>
		</div>
	</header>

	<!-- Environment Card Grid -->
	<div class="relative grid grid-cols-1 {isDay7Unlocked ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'} gap-6 md:gap-8 max-w-6xl w-full px-4">
		{#each sections as section, index}
			<div class="animate-fade-in-up {section.isNew ? 'animate-review-glow' : ''}" style="animation-delay: {index * 150}ms;">
				<EnvironmentCard
					environmentId={section.environment}
					title={section.title}
					subtitle={section.subtitle}
					icon={section.icon}
					description={section.description}
					onclick={() => onSelect(section.id)}
					active={section.active}
				/>
				{#if section.isNew}
					<div class="absolute -top-2 -right-2 px-2 py-0.5 bg-[#AC8400] text-[#0a0a0a] text-xs font-bold rounded-full animate-pulse z-10">
						✨ NUEVO
					</div>
				{/if}
			</div>
		{/each}
	</div>

	<!-- Footer Note -->
	<footer class="mt-12 md:mt-16 text-center animate-fade-in-up" style="animation-delay: 600ms;">
		<p class="text-[#D2CFA0]/30 text-sm font-[family-name:var(--font-script)] italic">
			Cada sección guarda una pieza de nuestra historia...
		</p>
	</footer>
</div>

<style>
	/* Animation keyframes */
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes zoomInDown {
		from {
			transform: translateY(-60px) scale(0.8);
			opacity: 0;
		}
		to {
			transform: translateY(0) scale(1);
			opacity: 1;
		}
	}

	@keyframes float {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	.animate-fade-in-up {
		animation: fadeInUp 0.6s ease-out forwards;
		opacity: 0;
	}

	.animate-zoom-in-down {
		animation: zoomInDown 0.8s ease-out forwards;
	}

	.animate-float {
		animation: float 3s ease-in-out infinite;
	}

	.text-gold-gradient {
		background: linear-gradient(135deg, #E8C84A, #AC8400, #B8962E);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
</style>
