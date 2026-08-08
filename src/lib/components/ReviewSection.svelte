<script>
	/**
	 * ReviewSection Component
	 * Multi-step wizard for ratings, spicy requests, and coupons
	 * With WhatsApp integration and localStorage persistence
	 */

	import html2canvas from 'html2canvas';

	let { data } = $props();

	const STORAGE_KEY = 'review-data';

	// Form state
	let currentStep = $state(0); // 0=rating, 1=spicy, 2=coupons, 3=send
	let isSaved = $state(false);
	let isSending = $state(false);

	// Rating state
	let ratings = $state({});
	let improveText = $state('');

	// Spicy state
	let spicyRequests = $state({});

	// Coupon state
	let couponEdits = $state({});

	// Initialize defaults
	function initDefaults() {
		data.rating.categories.forEach(cat => {
			ratings[cat.id] = cat.default;
		});
		improveText = '';
		data.spicy.categories.forEach(cat => {
			spicyRequests[cat.id] = '';
		});
		data.coupons.forEach(coupon => {
			couponEdits[coupon.id] = { ...coupon };
		});
	}

	// Load from localStorage
	function loadSaved() {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const parsed = JSON.parse(saved);
				ratings = parsed.ratings || ratings;
				improveText = parsed.improveText || '';
				spicyRequests = parsed.spicyRequests || spicyRequests;
				couponEdits = parsed.couponEdits || couponEdits;
				return true;
			}
		} catch (e) {
			console.error('Error loading review data:', e);
		}
		return false;
	}

	// Save to localStorage
	function saveData() {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify({
				ratings,
				improveText,
				spicyRequests,
				couponEdits,
				lastSaved: new Date().toISOString()
			}));
			isSaved = true;
			setTimeout(() => isSaved = false, 2000);
		} catch (e) {
			console.error('Error saving review data:', e);
		}
	}

	// Initialize once
	initDefaults();
	loadSaved();

	// Auto-save on any change
	$effect(() => {
		// Track all reactive dependencies
		const _ = JSON.stringify({ ratings, improveText, spicyRequests, couponEdits });
		if (_ !== '{}') {
			saveData();
		}
	});

	// Navigate steps
	function nextStep() {
		if (currentStep < 3) {
			currentStep++;
		}
	}

	function prevStep() {
		if (currentStep > 0) {
			currentStep--;
		}
	}

	function goToStep(step) {
		currentStep = step;
	}

	// Generate WhatsApp message
	function generateMessage() {
		let msg = '💕 *Reseña de Amor* 💕\n\n';

		// Rating
		msg += '⭐ *CALIFICACIÓN:*\n';
		data.rating.categories.forEach(cat => {
			msg += `• ${cat.icon} ${cat.label}: ${ratings[cat.id]}/10\n`;
		});
		if (improveText) {
			msg += `\n📝 *Mejoras:*\n${improveText}\n`;
		}

		// Spicy requests
		msg += '\n🔥 *PETICIONES PICANTES:*\n';
		data.spicy.categories.forEach(cat => {
			const value = spicyRequests[cat.id];
			if (value) {
				msg += `• ${cat.icon} ${cat.label}: ${value}\n`;
			}
		});

		// Coupons
		msg += '\n🎁 *CUPONES:*\n';
		data.coupons.forEach((coupon, i) => {
			const edit = couponEdits[coupon.id];
			msg += `${i + 1}. ${edit.icon} *${edit.title}* - ${edit.description}\n`;
		});

		return msg;
	}

	// Send via WhatsApp
	function sendWhatsApp() {
		isSending = true;
		const message = generateMessage();
		const encoded = encodeURIComponent(message);
		const url = `https://api.whatsapp.com/send?phone=${data.whatsappNumber}&text=${encoded}`;

		setTimeout(() => {
			window.open(url, '_blank');
			isSending = false;
		}, 500);
	}

	// Download coupon as image
	async function downloadCoupon(couponId) {
		const element = document.getElementById(`coupon-${couponId}`);
		if (!element) return;

		try {
			const canvas = await html2canvas(element, {
				backgroundColor: null,
				scale: 2
			});
			const link = document.createElement('a');
			link.download = `cupon-${couponId}.png`;
			link.href = canvas.toDataURL('image/png');
			link.click();
		} catch (e) {
			console.error('Error downloading coupon:', e);
		}
	}

	// Get step palette classes
	function getStepClasses(step) {
		switch (step) {
			case 0: // Rating - normal palette
				return {
					bg: 'bg-[#1A1410]',
					accent: '#AC8400',
					text: '#D2CFA0',
					border: 'border-[#AC8400]/30',
					inputBg: 'bg-[#2b0d0d]',
					sliderTrack: '#B8962E',
					sliderThumb: '#CC0000'
				};
			case 1: // Spicy - bordo/obscure
				return {
					bg: 'bg-[#2b0d0d]',
					accent: '#CC0000',
					text: '#F5F0E1',
					border: 'border-[#CC0000]/30',
					inputBg: 'bg-[#1a0808]',
					sliderTrack: '#1a0808',
					sliderThumb: '#CC0000'
				};
			case 2: // Coupons - light palette
				return {
					bg: 'bg-[#121309]',
					accent: '#722F37',
					text: '#D2CFA0',
					border: 'border-[#722F37]/30',
					inputBg: 'bg-white',
					sliderTrack: '#E8DCC8',
					sliderThumb: '#722F37'
				};
			default:
				return {
					bg: 'bg-[#0a0a0a]',
					accent: '#AC8400',
					text: '#D2CFA0',
					border: 'border-[#AC8400]/30',
					inputBg: 'bg-[#1a1a1a]'
				};
		}
	}

	let stepClasses = $derived(getStepClasses(currentStep));
</script>

<div class="min-h-screen {stepClasses.bg} transition-colors duration-500">
	<!-- Header -->
	<header class="sticky top-0 z-40 glass border-b border-white/10">
		<div class="max-w-2xl mx-auto px-4 py-3">
			<div class="flex items-center justify-center">
				<h2 class="font-[family-name:var(--font-felipa)] text-lg" style="color: {stepClasses.accent}">
					{data.ui.title}
				</h2>
			</div>

			<!-- Step Progress -->
			<div class="flex items-center gap-2 mt-3">
				{#each ['⭐', '🔥', '🎁', '📤'] as icon, i}
					<button
						onclick={() => goToStep(i)}
						class="flex-1 h-1.5 rounded-full transition-all duration-300 cursor-pointer"
						style="background: {i <= currentStep ? stepClasses.accent : 'rgba(255,255,255,0.1)'}"
						aria-label="Paso {i + 1}"
					></button>
				{/each}
			</div>
			<div class="flex justify-between mt-1 text-xs" style="color: {stepClasses.text}80">
				<span>Calificación</span>
				<span>Peticiones</span>
				<span>Cupones</span>
				<span>Enviar</span>
			</div>
		</div>
	</header>

	<!-- Content -->
	<div class="max-w-2xl mx-auto px-4 py-6 pb-24">
		{#if currentStep === 0}
			<!-- STEP 1: Rating -->
			<div class="step-enter space-y-6">
				<div class="text-center mb-8">
					<h3 class="text-2xl font-[family-name:var(--font-felipa)] mb-2" style="color: {stepClasses.accent}">
						{data.ui.step1Title}
					</h3>
					<p class="text-sm" style="color: {stepClasses.text}80">
						Del 1 al 10, ¿cómo calificarías...?
					</p>
				</div>

				{#each data.rating.categories as category}
					<div class="rounded-xl p-4 {stepClasses.inputBg} border {stepClasses.border}">
						<div class="flex items-center justify-between mb-3">
							<label class="font-medium flex items-center gap-2" style="color: {stepClasses.text}">
								<span>{category.icon}</span>
								<span>{category.label}</span>
							</label>
							<span class="text-2xl font-bold" style="color: {stepClasses.accent}">
								{ratings[category.id]}
							</span>
						</div>
						<input
							type="range"
							min="1"
							max="10"
							bind:value={ratings[category.id]}
							class="w-full"
							style="background: {stepClasses.sliderTrack}; accent-color: {stepClasses.sliderThumb}"
						/>
						<div class="flex justify-between text-xs mt-1" style="color: {stepClasses.text}60">
							<span>1</span>
							<span>5</span>
							<span>10</span>
						</div>
					</div>
				{/each}

				<!-- Improve text -->
				<div class="rounded-xl p-4 {stepClasses.inputBg} border {stepClasses.border}">
					<label class="block font-medium mb-3" style="color: {stepClasses.text}">
						📝 {data.rating.improveLabel}
					</label>
					<textarea
						bind:value={improveText}
						placeholder={data.rating.improvePlaceholder}
						rows="4"
						class="w-full bg-transparent border-none outline-none resize-none text-sm"
						style="color: {stepClasses.text}"
					></textarea>
				</div>
			</div>

		{:else if currentStep === 1}
			<!-- STEP 2: Spicy Requests -->
			<div class="step-enter space-y-6">
				<div class="text-center mb-8">
					<h3 class="text-2xl font-[family-name:var(--font-felipa)] mb-2" style="color: {stepClasses.accent}">
						{data.ui.step2Title}
					</h3>
					<p class="text-sm" style="color: {stepClasses.text}80">
						¿Qué te gustaría ver o hacer juntos?
					</p>
				</div>

				{#each data.spicy.categories as category}
					<div class="rounded-xl p-4 {stepClasses.inputBg} border {stepClasses.border}">
						<label class="block font-medium mb-3" style="color: {stepClasses.text}">
							<span>{category.icon}</span> {category.label}
						</label>
						<input
							type="text"
							bind:value={spicyRequests[category.id]}
							placeholder={category.placeholder}
							class="w-full bg-transparent border-none outline-none text-sm placeholder:opacity-40"
							style="color: {stepClasses.text}"
						/>
					</div>
				{/each}
			</div>

		{:else if currentStep === 2}
			<!-- STEP 3: Coupons -->
			<div class="step-enter space-y-6">
				<div class="text-center mb-8">
					<h3 class="text-2xl font-[family-name:var(--font-felipa)] mb-2" style="color: {stepClasses.accent}">
						{data.ui.step3Title}
					</h3>
					<p class="text-sm" style="color: {stepClasses.text}80">
						Descarga tus cupones especiales
					</p>
				</div>

				<div class="grid grid-cols-2 gap-4">
					{#each data.coupons as coupon}
						{@const edit = couponEdits[coupon.id]}
						<div
							id="coupon-{coupon.id}"
							class="coupon-card p-4 text-center"
							style="background: {edit.color}15; color: {edit.color}; border-color: {edit.color}"
						>
							<div class="text-3xl mb-2">{edit.icon}</div>
							<h4 class="font-[family-name:var(--font-cinzel)] font-bold text-sm mb-1">{edit.title}</h4>
							<p class="text-xs opacity-80 leading-tight">{edit.description}</p>
							<div class="mt-3 pt-3 border-t border-current/20">
								<span class="text-3xl font-[family-name:var(--font-script)] italic">Ilimitado & Inexpirable</span>
							</div>
						</div>
					{/each}
				</div>

				<!-- Download all button -->
				<div class="flex justify-center mt-6">
					<button
						onclick={() => data.coupons.forEach(c => downloadCoupon(c.id))}
						class="px-6 py-3 rounded-xl font-[family-name:var(--font-cinzel)] text-sm border transition-all duration-300 hover:scale-105"
						style="background: {stepClasses.accent}20; border-color: {stepClasses.accent}; color: {stepClasses.accent}"
					>
						📥 Descargar Todos los Cupones
					</button>
				</div>
			</div>

		{:else}
			<!-- STEP 4: Send -->
			<div class="step-enter space-y-6">
				<div class="text-center mb-8">
					<h3 class="text-2xl font-[family-name:var(--font-felipa)] mb-2" style="color: {stepClasses.accent}">
						📤 Enviar Reseña
					</h3>
					<p class="text-sm" style="color: {stepClasses.text}80">
						Revisa tu reseña y envíamela por WhatsApp
					</p>
				</div>

				<!-- Summary -->
				<div class="rounded-xl p-4 {stepClasses.inputBg} border {stepClasses.border} space-y-4">
					<!-- Rating Summary -->
					<div>
						<h4 class="font-[family-name:var(--font-cinzel)] text-sm mb-2" style="color: {stepClasses.accent}">
							⭐ Calificación
						</h4>
						<div class="space-y-1">
							{#each data.rating.categories as cat}
								<div class="flex justify-between text-sm" style="color: {stepClasses.text}">
									<span>{cat.icon} {cat.label}</span>
									<span class="font-bold">{ratings[cat.id]}/10</span>
								</div>
							{/each}
						</div>
						{#if improveText}
							<p class="mt-2 text-xs p-2 rounded" style="color: {stepClasses.text}80; background: {stepClasses.accent}10">
								📝 {improveText}
							</p>
						{/if}
					</div>

					<!-- Spicy Summary -->
					<div>
						<h4 class="font-[family-name:var(--font-cinzel)] text-sm mb-2" style="color: {stepClasses.accent}">
							🔥 Peticiones Picantes
						</h4>
						<div class="space-y-1">
							{#each data.spicy.categories as cat}
								{#if spicyRequests[cat.id]}
									<div class="text-sm" style="color: {stepClasses.text}">
										<span>{cat.icon} {cat.label}:</span>
										<span class="opacity-80">{spicyRequests[cat.id]}</span>
									</div>
								{/if}
							{/each}
						</div>
					</div>

					<!-- Coupons Summary -->
					<div>
						<h4 class="font-[family-name:var(--font-cinzel)] text-sm mb-2" style="color: {stepClasses.accent}">
							🎁 Cupones
						</h4>
						<div class="space-y-1">
							{#each data.coupons as coupon, i}
								<div class="text-sm" style="color: {stepClasses.text}">
									<span>{i + 1}. {coupon.icon} {coupon.title}</span>
								</div>
							{/each}
						</div>
					</div>
				</div>

				<!-- Send Button -->
				<button
					onclick={sendWhatsApp}
					disabled={isSending}
					class="w-full py-4 rounded-xl font-[family-name:var(--font-cinzel)] text-lg font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
					style="background: linear-gradient(135deg, #25D366, #128C7E); color: white"
				>
					{#if isSending}
						Abriendo WhatsApp...
					{:else}
						📱 {data.ui.sendButton}
					{/if}
				</button>

				<p class="text-center text-xs" style="color: {stepClasses.text}60">
					{data.ui.editMode}
				</p>
			</div>
		{/if}
	</div>

	<!-- Bottom Navigation -->
	<div class="fixed bottom-0 left-0 right-0 glass border-t border-white/10">
		<div class="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
			{#if currentStep > 0}
				<button
					onclick={prevStep}
					class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
					style="color: {stepClasses.accent}; border: 1px solid {stepClasses.accent}40"
				>
					← {data.ui.previous}
				</button>
			{:else}
				<div></div>
			{/if}

			{#if currentStep < 3}
				<button
					onclick={nextStep}
					class="px-6 py-2 rounded-lg text-sm font-bold transition-all duration-200 hover:scale-105"
					style="background: {stepClasses.accent}; color: {currentStep === 2 ? '#F5F0E1' : '#0a0a0a'}"
				>
					{data.ui.next} →
				</button>
			{:else}
				<button
					onclick={() => goToStep(0)}
					class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
					style="color: {stepClasses.accent}; border: 1px solid {stepClasses.accent}40"
				>
					✏️ {data.ui.editButton}
				</button>
			{/if}
		</div>
	</div>

	{#if isSaved}
		<div class="fixed bottom-16 left-1/2 -translate-x-1/2 z-50">
			<span class="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 animate-fade-in-up whitespace-nowrap">
				{data.ui.savedIndicator}
			</span>
		</div>
	{/if}
</div>
