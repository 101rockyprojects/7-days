<script>
	/**
	 * MainMenu Component
	 * 3D card grid for navigating to the three sections
	 * Enhanced with immersive card effects and smooth transitions
	 */

	let { onSelect, partnerName = 'Mi Amor' } = $props();

	// State
	let hoveredCard = $state(null);
	let mousePosition = $state({ x: 0, y: 0 });

	// Sections configuration
	const sections = [
		{
			id: 'receipt',
			title: 'El Recibo',
			subtitle: 'Servicios de Amor',
			icon: '🧾',
			description: 'Un recibo lúdico de todos los servicios de amor prestados',
			gradient: 'from-white via-gray-50 to-gray-100',
			textColor: 'text-gray-800',
			accentColor: '#8B0000',
			active: true
		},
		{
			id: 'roblox',
			title: 'Nuestro Mundo',
			subtitle: 'Memorias de Juegos',
			icon: '🎮',
			description: 'Citas virtuales y aventuras de gaming juntos',
			gradient: 'from-[#722F37] to-[#4A0404]',
			textColor: 'text-white',
			accentColor: '#CC0000',
			active: false
		},
		{
			id: 'odyssey',
			title: 'La Odisea',
			subtitle: 'Nuestra Historia Épica',
			icon: '📖',
			description: 'La gran narrativa de nuestro amor',
			gradient: 'from-[#4A0404] to-[#2a0202]',
			textColor: 'text-[#FFFDD0]',
			accentColor: '#D4AF37',
			active: false
		}
	];

	// Handle mouse move for 3D effect
	function handleMouseMove(event, sectionId) {
		const rect = event.currentTarget.getBoundingClientRect();
		const x = (event.clientX - rect.left) / rect.width - 0.5;
		const y = (event.clientY - rect.top) / rect.height - 0.5;
		mousePosition = { x, y };
	}

	function handleMouseLeave() {
		hoveredCard = null;
		mousePosition = { x: 0, y: 0 };
	}
</script>

<div class="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-b from-[#0a0a0a] via-[#0f0505] to-[#0a0a0a]">
	<!-- Background Particles -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none">
		{#each Array(20) as _, i}
			<div
				class="absolute w-1 h-1 bg-[#D4AF37]/20 rounded-full animate-float"
				style="left: {Math.random() * 100}%; top: {Math.random() * 100}%; animation-delay: {Math.random() * 5}s; animation-duration: {3 + Math.random() * 4}s;"
			></div>
		{/each}
	</div>

	<!-- Welcome Header -->
	<header class="relative text-center mb-12 md:mb-16 space-y-4">
		<div class="animate-zoom-in-down">
			<h1 class="text-4xl md:text-6xl lg:text-7xl font-[var(--font-felipa)] text-gold-gradient leading-tight">
				Hola, {partnerName}
			</h1>
		</div>
		<div class="animate-fade-in-up" style="animation-delay: 200ms;">
			<p class="text-[#FFFDD0]/60 font-[var(--font-cinzel)] text-base md:text-lg tracking-wide">
				Tres años de amor, aventura y recuerdos
			</p>
			<div class="mt-4 flex items-center justify-center gap-3">
				<div class="w-12 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/50"></div>
				<span class="text-[#D4AF37] text-sm">❤️</span>
				<div class="w-12 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/50"></div>
			</div>
		</div>
	</header>

	<!-- 3D Card Grid -->
	<div class="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl w-full">
		{#each sections as section, index}
			<button
				onclick={() => onSelect(section.id)}
				onmouseenter={() => (hoveredCard = section.id)}
				onmouseleave={handleMouseLeave}
				onmousemove={(e) => handleMouseMove(e, section.id)}
				class="card-3d group relative rounded-2xl text-left transition-all duration-500 overflow-hidden
					{section.active
						? 'bg-gradient-to-br ' + section.gradient + ' border border-white/10 hover:border-white/20'
						: 'bg-gradient-to-br ' + section.gradient + ' border border-white/5 hover:border-white/10'}
					{hoveredCard === section.id ? 'z-10 scale-[1.02]' : ''}"
				style="animation-delay: {index * 150}ms; transform: perspective(1000px) rotateY({hoveredCard === section.id ? mousePosition.x * 10 : 0}deg) rotateX({hoveredCard === section.id ? -mousePosition.y * 10 : 0}deg);"
			>
				<!-- Card Content -->
				<div class="relative p-6 md:p-8 min-h-[280px] flex flex-col">
					<!-- Icon -->
					<div class="text-5xl md:text-6xl mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
						{section.icon}
					</div>

					<!-- Title -->
					<h2 class="text-2xl md:text-3xl font-[var(--font-slackey)] {section.textColor} mb-2 transition-all duration-300">
						{section.title}
					</h2>

					<!-- Subtitle -->
					<p class="text-[#FFFDD0]/60 font-[var(--font-cinzel)] text-xs tracking-wider uppercase mb-4">
						{section.subtitle}
					</p>

					<!-- Description -->
					<p class="text-[#FFFDD0]/50 text-sm font-[var(--font-atkinson)] leading-relaxed flex-grow">
						{section.description}
					</p>

					<!-- Bottom Action -->
					<div class="mt-6 flex items-center gap-2 text-[#D4AF37] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
						<span class="font-[var(--font-cinzel)] text-sm">Explorar</span>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</div>

					<!-- Hover Glow Effect -->
					<div
						class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
						style="background: radial-gradient(circle at {50 + mousePosition.x * 50}% {50 + mousePosition.y * 50}%, {section.accentColor}20, transparent 50%);"
					></div>
				</div>

				<!-- Visual Distinction for Inactive Sections -->
				{#if !section.active}
					<div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 to-transparent pointer-events-none"></div>
				{/if}
			</button>
		{/each}
	</div>

	<!-- Footer Note -->
	<footer class="mt-12 md:mt-16 text-center animate-fade-in-up" style="animation-delay: 600ms;">
		<p class="text-[#FFFDD0]/30 text-sm font-[var(--font-qwitcher)] italic">
			Cada sección guarda una pieza de nuestra historia...
		</p>
	</footer>
</div>
