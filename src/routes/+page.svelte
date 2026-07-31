<script>
	import { parseUrlParams, getUnlockedDays } from '$lib/utils/dateUtils.js';
	import DayMenu from '$lib/components/DayMenu.svelte';
	import LetterCard from '$lib/components/LetterCard.svelte';
	import PasscodeInput from '$lib/components/PasscodeInput.svelte';
	import MainMenu from '$lib/components/MainMenu.svelte';
	import ReceiptSection from '$lib/components/ReceiptSection.svelte';
	import RobloxSection from '$lib/components/RobloxSection.svelte';
	import OdysseyBook from '$lib/components/OdysseyBook.svelte';
	import ReviewSection from '$lib/components/ReviewSection.svelte';
	import LetterBackground from '$lib/components/LetterBackground.svelte';

	import lettersData from '$lib/data/letters.json';
	import indexData from '$lib/data/index.json';
	import receiptData from '$lib/data/receipt.json';
	import robloxData from '$lib/data/roblox.json';
	import odysseyData from '$lib/data/odyssey.json';
	import reviewData from '$lib/data/review.json';

	// Parse URL params for dev mode
	const urlParams = parseUrlParams();

	// State management using Svelte 5 Runes
	let isDevMode = $state(urlParams.isDevMode);
	let simulatedDay = $state(urlParams.simulatedDay);
	let currentPhase = $state('letters');
	let selectedDay = $state(1);
	let passcodeVerified = $state(false);
	let activeSection = $state(null);
	let isTransitioning = $state(false);

	// Derived state
	let unlockedDays = $derived(getUnlockedDays(isDevMode, simulatedDay));
	let canAccessVault = $derived(isDevMode || unlockedDays.includes(6));
	let isDay7Unlocked = $derived(isDevMode || unlockedDays.includes(7));

	// Get current letter based on selected day
	let currentLetter = $derived(
		selectedDay >= 1 && selectedDay <= 6
			? lettersData.find((l) => l.day === selectedDay)
			: null
	);

	// Background images: show only on letters phase, transparent otherwise
	let bgImages = $derived(
		currentPhase === 'letters' && currentLetter?.background
			? {
					back: currentLetter.background.back || '',
					middle: currentLetter.background.middle || '',
					front: currentLetter.background.front || ''
				}
			: { back: '', middle: '', front: '' }
	);

	// Handle phase transition with animation
	function transitionTo(newPhase, callback) {
		isTransitioning = true;
		setTimeout(() => {
			callback();
			currentPhase = newPhase;
			setTimeout(() => {
				isTransitioning = false;
			}, 100);
		}, 300);
	}

	// Handle day selection from menu
	function handleDaySelect(day) {
		if (unlockedDays.includes(day)) {
			selectedDay = day;
			if (day === 6) {
				transitionTo('vault', () => {});
			} else {
				transitionTo('letters', () => {});
			}
		}
	}

	// Handle passcode success
	function handlePasscodeSuccess() {
		passcodeVerified = true;
		transitionTo('menu', () => {});
	}

	// Handle passcode error
	function handlePasscodeError() {
		// Error state is handled by PasscodeInput component
	}

	// Handle section selection from main menu
	function handleSectionSelect(section) {
		activeSection = section;
		transitionTo('section', () => {});
	}

	// Handle back navigation
	function handleBack() {
		if (currentPhase === 'section') {
			transitionTo('menu', () => {
				activeSection = null;
			});
		} else if (currentPhase === 'menu' || currentPhase === 'vault') {
			transitionTo('letters', () => {
				selectedDay = 1;
			});
		}
	}
</script>

<svelte:head>
	<title>7 Días de Agosto - {indexData.partnerName}</title>
	<meta name="description" content="Un regalo interactivo romántico para {indexData.partnerName}" />
</svelte:head>

<div class="min-h-screen bg-[#0a0a0a] text-white relative">
	<!-- Parallax Background -->
	<LetterBackground backImage={bgImages.back} middleImage={bgImages.middle} frontImage={bgImages.front} />

	<!-- Transition Overlay -->
	{#if isTransitioning}
		<div class="fixed inset-0 z-[60] bg-[#0a0a0a] animate-fade-in-up" style="animation-duration: 0.3s;"></div>
	{/if}

	<!-- Navigation Header (top-left corner only) -->
	{#if currentPhase !== 'letters' || selectedDay !== 1}
		<header class="fixed bottom-4 left-4 z-50">
			<button
				onclick={handleBack}
				class="flex items-center gap-2 px-3 py-2 glass rounded-lg border border-white/10 text-white hover:text-[#E8C84A] hover:border-[#AC8400]/30 transition-all duration-200 group"
				aria-label="Volver"
			>
				<svg class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
				<span class="font-[family-name:var(--font-cinzel)] text-xs tracking-wide">Volver</span>
			</button>
		</header>
	{/if}

	<!-- Phase 1: Daily Letters -->
	{#if currentPhase === 'letters'}
		<div class="min-h-screen">
			<!-- Day Menu -->
			<DayMenu
				{unlockedDays}
				{selectedDay}
				onSelect={handleDaySelect}
				showVault={canAccessVault}
			/>

			<!-- Letter Card -->
			{#if currentLetter}
				<div class="pt-24 md:pt-28 pb-12 px-4">
					<LetterCard
						day={currentLetter.day}
						date={currentLetter.date}
						title={currentLetter.title}
						text={currentLetter.text}
						imageUrl={currentLetter.imageUrl}
						secretDigit={currentLetter.secretDigit}
					/>
				</div>
			{:else}
				<div class="min-h-screen flex items-center justify-center">
					<div class="text-center space-y-4">
						<div class="text-6xl animate-float">💌</div>
						<p class="text-[#D2CFA0]/50 font-[family-name:var(--font-cinzel)]">
							Selecciona un día para leer la carta
						</p>
					</div>
				</div>
			{/if}
		</div>

		<!-- Phase 2: Passcode Vault -->
	{:else if currentPhase === 'vault'}
		<div class="min-h-screen flex items-center justify-center py-12">
			<PasscodeInput
				correctPasscode={indexData.passcode}
				onSuccess={handlePasscodeSuccess}
				onError={handlePasscodeError}
				comfortMessages={indexData.comfortMessages}
				hints={indexData.hints}
			/>
		</div>

		<!-- Phase 3: Main Menu -->
	{:else if currentPhase === 'menu'}
		<div class="min-h-screen">
			<MainMenu
				onSelect={handleSectionSelect}
				partnerName={indexData.partnerName}
				{isDay7Unlocked}
			/>
		</div>

		<!-- Phase 4: Section Content -->
	{:else if currentPhase === 'section'}
		<div class="min-h-screen">
			{#if activeSection === 'receipt'}
				<ReceiptSection items={receiptData} />
			{:else if activeSection === 'roblox'}
				<RobloxSection data={robloxData} />
			{:else if activeSection === 'odyssey'}
				<OdysseyBook pages={odysseyData} />
			{:else if activeSection === 'review'}
				<ReviewSection data={reviewData} />
			{/if}
		</div>
	{/if}
</div>
