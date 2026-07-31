<script>
	/**
	 * LetterCard Component
	 * Displays a romantic letter with polaroid-style image and hidden secret digit
	 * Enhanced with smooth reveal animations and tactile interactions
	 */

	let {
		day = 1,
		date = '',
		title = '',
		text = '',
		imageUrl = '',
		secretDigit = 0
	} = $props();

	let showSecret = $state(false);
	let isRevealing = $state(false);

	// Toggle secret digit visibility with animation
	function toggleSecret() {
		if (!showSecret) {
			isRevealing = true;
			setTimeout(() => {
				showSecret = true;
				isRevealing = false;
			}, 300);
		} else {
			showSecret = false;
		}
	}

	// Parse text to highlight the secret digit naturally
	let formattedText = $derived(() => {
		if (!text) return '';

		// Split into sentences
		const sentences = text.split(/(?<=[.!?])\s+/);

		return sentences.map((sentence) => {
			// Check if this sentence contains the digit as a word
			const digitRegex = new RegExp(`\\b(${secretDigit})\\b`);
			if (digitRegex.test(sentence)) {
				return sentence.replace(
					digitRegex,
					'<span class="inline-block px-1 py-0.25 text-velvet-red font-bold rounded mx-0.25 text-4xl">$1</span>'
				);
			}
			return sentence;
		}).join(' ');
	});
</script>

<article class="max-w-2xl mx-auto" aria-label="Carta del día {day}">
	<!-- Polaroid Container -->
	<div class="relative group">
		<!-- Shadow Layer -->
		<div class="absolute inset-0 bg-black/20 rounded-2xl transform rotate-2 group-hover:rotate-1 transition-transform duration-500"></div>

		<!-- Main Card -->
		<div class="relative bg-gradient-to-b from-[#F5F0E1] to-[#E8DCC8] p-3 pb-14 md:p-4 md:pb-16 rounded-2xl transform rotate-1 group-hover:rotate-0 transition-all duration-500 shadow-2xl">
			<!-- Image Container -->
			<div class="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden">
				{#if imageUrl}
					<img
						src={imageUrl}
						alt="Carta día {day}"
						class="w-full h-full object-cover"
						loading="lazy"
					/>
				{:else}
					<div class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F5F0E1] via-[#E8DCC8] to-[#D4C4A8]">
						<span class="text-7xl mb-4 animate-float">💌</span>
						<span class="text-[#8B7355] font-[family-name:var(--font-script)] text-lg">Carta #{day}</span>
					</div>
				{/if}

				<!-- Vignette Overlay -->
				<div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
			</div>

			<!-- Day Label - Polaroid Style -->
			<div class="absolute bottom-3 left-0 right-4 md:bottom-4 md:right-6 text-right">
				<span class="font-[family-name:var(--font-script)] text-velvet-red text-2xl md:text-xl">
					Día {day}
				</span>
			</div>

			<!-- Tape Effect -->
			<div class="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#D4AF37]/20 rounded-sm transform -rotate-2 backdrop-blur-sm"></div>
		</div>
	</div>

	<!-- Letter Content -->
	<div class="mt-10 space-y-8">
		<!-- Date & Title -->
		<header class="text-center space-y-3">
			<time class="inline-block text-[#D4AF37] text-sm font-[family-name:var(--font-cinzel)] tracking-[0.2em] uppercase">
				{date}
			</time>
			<h2 class="text-3xl md:text-4xl text-[#F5F0E1] font-[family-name:var(--font-felipa)] leading-tight">
				{title}
			</h2>
			<div class="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"></div>
		</header>

		<!-- Letter Body -->
		<div class="parchment rounded-xl p-6 md:p-8 shadow-lg relative overflow-hidden">
			<!-- Decorative Corner -->
			<div class="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#D4AF37]/30 rounded-tl-xl"></div>
			<div class="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#D4AF37]/30 rounded-br-xl"></div>

			<p class="text-velvet-red font-[family-name:var(--font-script)] text-3xl leading-[0.85] italic">
				{@html formattedText()}
			</p>
		</div>

		<!-- Secret Digit Section -->
		<div class="text-center">
			<button
				onclick={toggleSecret}
				class="group/btn opacity-15 inline-flex items-center gap-3 px-4 py-2 mb-3 rounded-full transition-all duration-300
					{showSecret
						? 'bg-[#D4AF37] text-[#0a0a0a] shadow-lg shadow-[#D4AF37]/30'
						: 'bg-[#2b0d0d] text-[#D4AF37] border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10'}"
				aria-expanded={showSecret}
				aria-label="{showSecret ? 'Ocultar secreto' : 'Revelar secreto'}"
			>
				<span class="wax-seal w-8 h-8 flex items-center justify-center text-xs text-white transition-transform duration-300 group-hover/btn:scale-110">
					{showSecret ? '✨' : '🔒'}
				</span>
				<span class="font-[family-name:var(--font-cinzel)] text-sm tracking-wide">
					{showSecret ? 'Secreto Revelado' : 'Revelar Secreto'}
				</span>
			</button>

			<!-- Secret Digit Reveal -->
			{#if showSecret}
				<div class="mt-6 animate-zoom-in">
					<div class="inline-flex items-center justify-center w-20 h-20 bg-deep-bordeaux text-cream text-4xl font-[family-name:var(--font-cinzel)] font-bold rounded-2xl shadow-xl shadow-[#D4AF37]/40 transform rotate-3 hover:rotate-0 transition-transform duration-300 relative">
						{secretDigit}
						<span class="absolute -bottom-2 -right-1 w-10 h-10 text-lg">
							🤫
						</span>
					</div>
				</div>
			{/if}
			
		</div>
	</div>
</article>
