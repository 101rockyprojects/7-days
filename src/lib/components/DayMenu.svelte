<script>
	/**
	 * DayMenu Component
	 * Horizontal timeline for navigating between days (1-6) and vault (7)
	 * Enhanced with smooth animations and visual feedback
	 */

	let { unlockedDays = [], selectedDay = 1, onSelect, showVault = false } = $props();

	// Days configuration
	const days = [
		{ number: 1, label: 'Día 1', shortLabel: '1' },
		{ number: 2, label: 'Día 2', shortLabel: '2' },
		{ number: 3, label: 'Día 3', shortLabel: '3' },
		{ number: 4, label: 'Día 4', shortLabel: '4' },
		{ number: 5, label: 'Día 5', shortLabel: '5' },
		{ number: 6, label: 'Día 6', shortLabel: '6' }
	];
</script>

<nav
	class="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
	aria-label="Navegación de días"
>
	<div class="max-w-4xl mx-auto px-4 py-3">
		<div class="flex items-center justify-center gap-2 md:gap-3">
			{#each days as day, index}
				{@const isUnlocked = unlockedDays.includes(day.number)}
				{@const isActive = selectedDay === day.number}
				{@const isPast = unlockedDays.includes(day.number) && day.number < selectedDay}

				<button
					onclick={() => onSelect(day.number)}
					disabled={!isUnlocked}
					class="relative group transition-all duration-400
						{isActive
							? 'z-10'
							: 'hover:scale-105'}"
					style="animation-delay: {index * 50}ms"
					aria-label="{isUnlocked ? day.label : day.label + ' bloqueado'}"
					aria-current={isActive ? 'page' : undefined}
				>
					<!-- Active Indicator -->
					{#if isActive}
						<div class="absolute -inset-1 bg-[#D4AF37] rounded-full opacity-20 animate-pulse-glow"></div>
					{/if}

					<!-- Button Content -->
					<div
						class="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full text-sm font-semibold transition-all duration-300
							{isActive
								? 'bg-gradient-to-br from-[#D4AF37] to-[#B8962E] text-[#0a0a0a] shadow-lg shadow-[#D4AF37]/30'
								: isUnlocked
									? 'bg-[#2b0d0d] text-[#D4AF37] border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10'
									: 'bg-[#1a1a1a] text-gray-600 border border-gray-800 cursor-not-allowed'}"
					>
						{#if isUnlocked}
							{#if isPast && !isActive}
								<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
								</svg>
							{:else}
								<span class="md:hidden">{day.shortLabel}</span>
								<span class="hidden md:inline">{day.label.split(' ')[1]}</span>
							{/if}
						{:else}
							<svg class="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
							</svg>
						{/if}
					</div>

					<!-- Tooltip -->
					<div
						class="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#0a0a0a] text-[#D4AF37] text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none border border-[#D4AF37]/20"
					>
						{day.label}
					</div>
				</button>
			{/each}

			<!-- Divider -->
			{#if showVault}
				<div class="w-px h-8 bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent mx-1"></div>

				<!-- Vault Button (Day 7) -->
				{@const isVaultUnlocked = unlockedDays.includes(7)}
				<button
					onclick={() => onSelect(7)}
					disabled={!isVaultUnlocked}
					class="relative group transition-all duration-400 {isVaultUnlocked ? 'hover:scale-105' : ''}"
					aria-label="{isVaultUnlocked ? 'Abrir la cámara del tesoro' : 'Cámara del tesoro bloqueada'}"
				>
					<!-- Pulse Effect -->
					{#if isVaultUnlocked && selectedDay !== 7}
						<div class="absolute -inset-2 bg-[#CC0000] rounded-full opacity-20 animate-pulse"></div>
					{/if}

					<!-- Active Indicator -->
					{#if selectedDay === 7}
						<div class="absolute -inset-1 bg-[#CC0000] rounded-full opacity-30 animate-pulse-glow"></div>
					{/if}

					<div
						class="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full text-lg transition-all duration-300
							{selectedDay === 7
								? 'bg-gradient-to-br from-[#CC0000] to-[#8B0000] text-white shadow-lg shadow-[#CC0000]/30'
								: isVaultUnlocked
									? 'bg-[#2b0d0d] text-[#CC0000] border border-[#CC0000]/30 hover:border-[#CC0000] hover:bg-[#CC0000]/10'
									: 'bg-[#1a1a1a] text-gray-600 border border-gray-800 cursor-not-allowed'}"
					>
						{#if isVaultUnlocked}
							🔐
						{:else}
							🔒
						{/if}
					</div>

					<!-- Tooltip -->
					<div class="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#0a0a0a] text-[#CC0000] text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none border border-[#CC0000]/20">
						La Cámara
					</div>
				</button>
			{/if}
		</div>
	</div>
</nav>
