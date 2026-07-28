<script>
	/**
	 * PasscodeInput Component
	 * 6-digit passcode input with vault aesthetic and validation
	 * Enhanced with tactile feedback and portal animation
	 */

	let {
		correctPasscode = '000000',
		onSuccess,
		onError,
		comfortMessages = [],
		hints = []
	} = $props();

	// State
	let digits = $state(['', '', '', '', '', '']);
	let isShaking = $state(false);
	let errorMessage = $state('');
	let hintMessage = $state('');
	let isPortalOpen = $state(false);
	let isUnlocked = $state(false);
	let activeInput = $state(0);

	// Input refs for focus management
	let inputRefs = $state([]);

	// Handle digit input
	function handleInput(index, event) {
		const value = event.target.value.replace(/\D/g, '');

		if (value.length > 1) {
			event.target.value = value.slice(-1);
		}

		digits[index] = event.target.value;

		// Auto-advance to next input
		if (event.target.value && index < 5) {
			activeInput = index + 1;
			inputRefs[index + 1]?.focus();
		}

		// Check if all digits are entered
		if (digits.every((d) => d !== '') && digits.join('').length === 6) {
			validatePasscode();
		}
	}

	// Handle keydown for navigation
	function handleKeydown(index, event) {
		if (event.key === 'Backspace') {
			if (!digits[index] && index > 0) {
				activeInput = index - 1;
				inputRefs[index - 1]?.focus();
			} else {
				digits[index] = '';
			}
		} else if (event.key === 'ArrowLeft' && index > 0) {
			activeInput = index - 1;
			inputRefs[index - 1]?.focus();
		} else if (event.key === 'ArrowRight' && index < 5) {
			activeInput = index + 1;
			inputRefs[index + 1]?.focus();
		}
	}

	// Validate the entered passcode
	function validatePasscode() {
		const entered = digits.join('');

		if (entered === correctPasscode) {
			// Success!
			isUnlocked = true;
			setTimeout(() => {
				isPortalOpen = true;
			}, 500);
			setTimeout(() => {
				onSuccess?.();
			}, 1500);
		} else {
			// Error!
			isShaking = true;
			errorMessage = comfortMessages[Math.floor(Math.random() * comfortMessages.length)];
			hintMessage = hints[Math.floor(Math.random() * hints.length)];

			setTimeout(() => {
				isShaking = false;
				digits = ['', '', '', '', '', ''];
				activeInput = 0;
				inputRefs[0]?.focus();
			}, 600);

			onError?.();
		}
	}

	// Handle paste
	function handlePaste(event) {
		event.preventDefault();
		const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);

		if (pasted.length === 6) {
			digits = pasted.split('');
			validatePasscode();
		}
	}
</script>

<!-- Portal Overlay -->
{#if isPortalOpen}
	<div class="fixed inset-0 z-[100] bg-[#0a0a0a]">
		<div class="min-h-screen flex items-center justify-center">
			<div class="text-center animate-zoom-in">
				<div class="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8962E] flex items-center justify-center animate-pulse-glow">
					<span class="text-6xl">🔓</span>
				</div>
				<h1 class="text-4xl md:text-6xl font-[var(--font-uncial)] text-gold-gradient animate-zoom-in-down">
					Bienvenido
				</h1>
			</div>
		</div>
	</div>
{/if}

<div class="w-full max-w-lg mx-auto px-4">
	<div class="text-center space-y-10">
		<!-- Vault Icon -->
		<div class="relative inline-block">
			<div class="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-2xl animate-pulse"></div>
			<div
				class="relative wax-seal w-28 h-28 flex items-center justify-center text-5xl transition-all duration-500
					{isUnlocked ? 'scale-110 shadow-xl shadow-[#D4AF37]/50' : ''}"
			>
				{isUnlocked ? '🔓' : '🔐'}
			</div>
		</div>

		<!-- Title -->
		<div class="space-y-2">
			<h1 class="text-3xl md:text-5xl font-[var(--font-uncial)] text-gold-gradient">
				La Cámara del Tesoro
			</h1>
			<p class="text-[#FFFDD0]/70 font-[var(--font-cinzel)] text-sm tracking-wide">
				Ingresa el código de 6 dígitos
			</p>
		</div>

		<!-- Passcode Input Grid -->
		<div
			class="relative {isShaking ? 'animate-shake' : ''}"
			onpaste={handlePaste}
		>
			<!-- Background Glow -->
			<div class="absolute inset-0 bg-[#D4AF37]/5 rounded-2xl blur-xl"></div>

			<div class="relative flex justify-center gap-3 md:gap-4">
				{#each digits as _, index}
					<div class="relative">
						<!-- Active Indicator -->
						{#if activeInput === index && !digits[index]}
							<div class="absolute -inset-1 bg-[#D4AF37]/20 rounded-xl animate-pulse"></div>
						{/if}

						<input
							type="text"
							inputmode="numeric"
							pattern="[0-9]"
							maxlength="1"
							bind:this={inputRefs[index]}
							value={digits[index]}
							oninput={(e) => handleInput(index, e)}
							onkeydown={(e) => handleKeydown(index, e)}
							onfocus={() => (activeInput = index)}
							class="relative w-12 h-14 md:w-14 md:h-16 text-center text-2xl md:text-3xl font-bold rounded-xl border-2 transition-all duration-300
								{digits[index]
									? 'border-[#D4AF37] bg-gradient-to-b from-[#2b0d0d] to-[#1a0a0a] text-[#D4AF37] shadow-lg shadow-[#D4AF37]/20'
									: activeInput === index
										? 'border-[#D4AF37]/60 bg-[#0a0a0a] text-white'
										: 'border-[#D4AF37]/20 bg-[#0a0a0a] text-white hover:border-[#D4AF37]/40'}
								focus:border-[#D4AF37] focus:shadow-lg focus:shadow-[#D4AF37]/30 focus:outline-none"
							aria-label="Dígito {index + 1}"
							autocomplete="off"
						/>

						<!-- Dot Indicator -->
						{#if digits[index]}
							<div class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#D4AF37] rounded-full"></div>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<!-- Error Message -->
		{#if errorMessage}
			<div class="space-y-3 animate-fade-in-up">
				<div class="inline-flex items-center gap-2 px-4 py-2 bg-[#CC0000]/10 border border-[#CC0000]/30 rounded-full">
					<span class="text-[#CC0000]">💔</span>
					<p class="text-[#CC0000] font-[var(--font-cinzel)] text-sm">
						{errorMessage}
					</p>
				</div>
				{#if hintMessage}
					<p class="text-[#D4AF37]/50 text-sm italic font-[var(--font-qwitcher)]">
						{hintMessage}
					</p>
				{/if}
			</div>
		{/if}

		<!-- Instructions -->
		<div class="space-y-4">
			<div class="flex items-center justify-center gap-4 text-[#FFFDD0]/40 text-sm">
				<div class="flex items-center gap-2">
					<kbd class="px-2 py-1 bg-[#1a1a1a] rounded border border-gray-700 text-xs">←</kbd>
					<kbd class="px-2 py-1 bg-[#1a1a1a] rounded border border-gray-700 text-xs">→</kbd>
				</div>
				<span class="font-[var(--font-atkinson)]">navegar</span>
			</div>
			<p class="text-[#FFFDD0]/30 text-xs font-[var(--font-cinzel)]">
				Los números están ocultos en las cartas diarias
			</p>
		</div>
	</div>
</div>
