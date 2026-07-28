<script>
	/**
	 * RobloxSection Component
	 * Simulates a Roblox-style menu with experiences, achievements, and profile
	 * Enhanced with authentic gaming UI aesthetics
	 */

	let { data = { experiences: [], achievements: [], profile: {} } } = $props();

	// State
	let activeTab = $state('experiences');
	let hoveredCard = $state(null);

	// Tabs configuration
	const tabs = [
		{ id: 'experiences', label: 'Experiencias', icon: '🎮' },
		{ id: 'achievements', label: 'Logros', icon: '🏆' },
		{ id: 'profile', label: 'Perfil', icon: '👤' }
	];

	// Format numbers
	function formatNumber(num) {
		if (num >= 1000) {
			return (num / 1000).toFixed(1) + 'K';
		}
		return num.toString();
	}
</script>

<div class="min-h-screen bg-gradient-to-b from-[#1a0a0a] via-[#2b0d0d] to-[#1a0a0a] pb-20">
	<!-- Content Area -->
	<main class="max-w-6xl mx-auto px-4 py-6 md:py-8">
		<!-- Experiences Tab -->
		{#if activeTab === 'experiences'}
			<section class="space-y-6">
				<div class="flex items-center justify-between">
					<h2 class="text-xl md:text-2xl font-[var(--font-slackey)] text-[#D4AF37]">
						🎮 Experiencias
					</h2>
					<span class="text-xs text-[#FFFDD0]/40 font-[var(--font-atkinson)]">
						{data.experiences.length} experiencias
					</span>
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
					{#each data.experiences as experience, index}
						<button
							onmouseenter={() => (hoveredCard = experience.title)}
							onmouseleave={() => (hoveredCard = null)}
							class="group relative bg-[#1a1a1a] rounded-xl overflow-hidden border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300 text-left"
							style="animation-delay: {index * 100}ms"
						>
							<!-- Thumbnail -->
							<div class="aspect-video bg-gradient-to-br from-[#2b0d0d] to-[#1a0a0a] relative overflow-hidden">
								{#if experience.image}
									<img
										src={experience.image}
										alt={experience.title}
										class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
										loading="lazy"
									/>
								{:else}
									<div class="w-full h-full flex items-center justify-center">
										<span class="text-5xl opacity-50 group-hover:opacity-75 group-hover:scale-110 transition-all duration-300">🎮</span>
									</div>
								{/if}

								<!-- Gradient Overlay -->
								<div class="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent"></div>

								<!-- Badge -->
								<div class="absolute top-3 right-3">
									<span class="px-2 py-0.5 bg-[#CC0000] text-white text-[10px] rounded font-bold uppercase tracking-wide shadow-lg">
										NUEVO
									</span>
								</div>

								<!-- Play Button Overlay -->
								<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
									<div class="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
										<svg class="w-5 h-5 text-[#0a0a0a] ml-0.5" fill="currentColor" viewBox="0 0 20 20">
											<path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
										</svg>
									</div>
								</div>
							</div>

							<!-- Info -->
							<div class="p-4">
								<h3 class="text-[#FFFDD0] font-[var(--font-slackey)] text-base mb-1 group-hover:text-[#D4AF37] transition-colors duration-200">
									{experience.title}
								</h3>
								<p class="text-[#FFFDD0]/50 text-sm font-[var(--font-atkinson)] line-clamp-2">
									{experience.description}
								</p>
							</div>
						</button>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Achievements Tab -->
		{#if activeTab === 'achievements'}
			<section class="space-y-6">
				<div class="flex items-center justify-between">
					<h2 class="text-xl md:text-2xl font-[var(--font-slackey)] text-[#D4AF37]">
						🏆 Logros
					</h2>
					<span class="text-xs text-[#FFFDD0]/40 font-[var(--font-atkinson)]">
						{data.achievements.length} desbloqueados
					</span>
				</div>

				<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
					{#each data.achievements as achievement, index}
						<div
							class="group relative bg-gradient-to-b from-[#2b0d0d] to-[#1a0a0a] rounded-xl p-4 text-center border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300"
							style="animation-delay: {index * 80}ms"
						>
							<!-- Badge Background -->
							<div class="absolute inset-0 rounded-xl bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

							<!-- Icon -->
							<div class="relative text-4xl md:text-5xl mb-3 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
								{achievement.icon}
							</div>

							<!-- Title -->
							<h3 class="relative text-[#FFFDD0] font-[var(--font-slackey)] text-xs md:text-sm leading-tight">
								{achievement.title}
							</h3>

							<!-- Sparkle Effect -->
							<div class="absolute top-2 right-2 text-[#D4AF37] text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								✨
							</div>

							<!-- Unlocked Badge -->
							<div class="mt-2 text-[10px] text-[#D4AF37]/60 font-[var(--font-atkinson)] uppercase tracking-wider">
								Desbloqueado
							</div>
						</div>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Profile Tab -->
		{#if activeTab === 'profile'}
			<section class="max-w-md mx-auto">
				<h2 class="text-xl md:text-2xl font-[var(--font-slackey)] text-[#D4AF37] mb-6 text-center">
					👤 Perfil
				</h2>

				<div class="bg-gradient-to-b from-[#2b0d0d] to-[#1a0a0a] rounded-2xl p-6 md:p-8 border border-white/5">
					<!-- Avatar -->
					<div class="relative w-32 h-32 mx-auto mb-6">
						<div class="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#B8962E] rounded-full animate-pulse-glow"></div>
						<div class="relative w-full h-full bg-gradient-to-br from-[#722F37] to-[#4A0404] rounded-full flex items-center justify-center text-5xl border-4 border-[#1a0a0a]">
							👤
						</div>
						<!-- Online Indicator -->
						<div class="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[#1a0a0a]"></div>
					</div>

					<!-- Username -->
					<h3 class="text-xl text-[#FFFDD0] font-[var(--font-slackey)] text-center mb-1">
						{data.profile.username}
					</h3>

					<!-- Bio -->
					<p class="text-[#FFFDD0]/50 text-center font-[var(--font-atkinson)] text-sm mb-6">
						{data.profile.bio}
					</p>

					<!-- Stats Grid -->
					<div class="grid grid-cols-2 gap-3">
						<div class="bg-[#0a0a0a] rounded-xl p-4 text-center border border-white/5">
							<div class="text-xl md:text-2xl font-bold text-[#D4AF37] font-[var(--font-atkinson)]">
								{formatNumber(data.profile.stats?.hoursTalked || 0)}
							</div>
							<div class="text-[10px] text-[#FFFDD0]/40 font-[var(--font-atkinson)] uppercase tracking-wider mt-1">
								Horas Habladas
							</div>
						</div>

						<div class="bg-[#0a0a0a] rounded-xl p-4 text-center border border-white/5">
							<div class="text-xl md:text-2xl font-bold text-[#D4AF37] font-[var(--font-atkinson)]">
								{formatNumber(data.profile.stats?.messagesSent || 0)}
							</div>
							<div class="text-[10px] text-[#FFFDD0]/40 font-[var(--font-atkinson)] uppercase tracking-wider mt-1">
								Mensajes
							</div>
						</div>

						<div class="bg-[#0a0a0a] rounded-xl p-4 text-center border border-white/5">
							<div class="text-xl md:text-2xl font-bold text-[#D4AF37] font-[var(--font-atkinson)]">
								{(data.profile.stats?.daysTogether || 0).toLocaleString()}
							</div>
							<div class="text-[10px] text-[#FFFDD0]/40 font-[var(--font-atkinson)] uppercase tracking-wider mt-1">
								Días Juntos
							</div>
						</div>

						<div class="bg-[#0a0a0a] rounded-xl p-4 text-center border border-white/5">
							<div class="text-xl md:text-2xl font-bold text-[#D4AF37] font-[var(--font-atkinson)]">
								{data.profile.stats?.virtualDates || 0}
							</div>
							<div class="text-[10px] text-[#FFFDD0]/40 font-[var(--font-atkinson)] uppercase tracking-wider mt-1">
								Citas Virtuales
							</div>
						</div>
					</div>
				</div>
			</section>
		{/if}
	</main>

	<!-- Bottom Navigation Bar -->
	<nav class="fixed bottom-0 left-0 right-0 z-40 bg-[#1a1a1a]/95 backdrop-blur-md border-t border-[#D4AF37]/20">
		<div class="max-w-6xl mx-auto px-4">
			<div class="flex items-center justify-center h-16 gap-2">
				{#each tabs as tab}
					<button
						onclick={() => (activeTab = tab.id)}
						class="flex-1 max-w-[120px] py-2 rounded-xl text-sm font-medium transition-all duration-200
							{activeTab === tab.id
								? 'bg-[#D4AF37] text-[#0a0a0a] shadow-lg shadow-[#D4AF37]/20'
								: 'text-[#FFFDD0]/70 hover:text-[#FFFDD0] hover:bg-white/5'}"
					>
						<span class="block text-lg mb-0.5">{tab.icon}</span>
						<span class="text-[10px]">{tab.label}</span>
					</button>
				{/each}
			</div>
		</div>
	</nav>
</div>
