<script>
	/**
	 * OdysseyBook Component
	 * Virtual book with page-turning experience
	 * Two pages rendered simultaneously for smooth transitions
	 */

	import { base } from '$app/paths';

	let { pages = [] } = $props();

	let currentPage = $state(0);
	let isFlipping = $state(false);
	let flipDirection = $state('next');
	let touchStartX = $state(0);

	function nextPage() {
		if (currentPage < pages.length - 1 && !isFlipping) {
			flipDirection = 'next';
			isFlipping = true;
			setTimeout(() => {
				currentPage++;
				isFlipping = false;
			}, 600);
		}
	}

	function prevPage() {
		if (currentPage > 0 && !isFlipping) {
			flipDirection = 'prev';
			isFlipping = true;
			setTimeout(() => {
				currentPage--;
				isFlipping = false;
			}, 600);
		}
	}

	function handleKeydown(event) {
		if (event.key === 'ArrowRight' || event.key === ' ') {
			event.preventDefault();
			nextPage();
		} else if (event.key === 'ArrowLeft') {
			event.preventDefault();
			prevPage();
		}
	}

	function handleTouchStart(event) {
		touchStartX = event.touches[0].clientX;
	}

	function handleTouchEnd(event) {
		const touchEndX = event.changedTouches[0].clientX;
		const deltaX = touchStartX - touchEndX;
		if (Math.abs(deltaX) > 50) {
			if (deltaX > 0) nextPage();
			else prevPage();
		}
	}

	let currentPageData = $derived(pages[currentPage]);
	let nextPageData = $derived(pages[currentPage + 1]);
	let isFirstPage = $derived(currentPage === 0);
	let isLastPage = $derived(currentPage === pages.length - 1);
	let progress = $derived(pages.length > 0 ? ((currentPage + 1) / pages.length) * 100 : 0);
</script>

<svelte:window onkeydown={handleKeydown} />

<div
	class="min-h-screen bg-[#0a0505] flex flex-col"
	ontouchstart={handleTouchStart}
	ontouchend={handleTouchEnd}
>
	<!-- Ambient Background -->
	<div class="fixed inset-0 pointer-events-none overflow-hidden">
		<div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0505_70%)]"></div>
		{#each Array(15) as _, i}
			<div
				class="absolute w-1 h-1 bg-[#AC8400]/10 rounded-full animate-float"
				style="left: {10 + Math.random() * 80}%; top: {10 + Math.random() * 80}%; animation-delay: {Math.random() * 8}s; animation-duration: {5 + Math.random() * 5}s;"
			></div>
		{/each}
	</div>

	<!-- Header -->
	<header class="relative z-10 text-center pt-8 md:pt-12 pb-4">
		<h1 class="text-3xl md:text-4xl font-[family-name:var(--font-uncial)] text-gold-gradient">
			La Odisea
		</h1>
		<p class="text-[#D2CFA0]/40 font-[family-name:var(--font-cinzel)] text-xs tracking-[0.3em] uppercase mt-2">
			Una Historia de Amor
		</p>
	</header>

	<!-- Book Container -->
	<main class="relative z-10 flex-1 flex items-center justify-center px-4 py-6">
		<div class="w-full max-w-2xl">
			<!-- Book -->
			<div class="relative rounded-2xl overflow-hidden shadow-2xl" style="min-height: 450px;">
				<!-- Page Background -->
				<div class="absolute inset-0 parchment"></div>

				<!-- Candlelight Effect -->
				<div class="candlelight absolute inset-0 pointer-events-none"></div>

				<!-- Decorative Borders -->
				<div class="absolute inset-0 border-8 border-[#AC8400]/10 rounded-2xl pointer-events-none"></div>
				<div class="absolute inset-0 border border-[#AC8400]/5 rounded-2xl pointer-events-none"></div>

				<!-- NEXT PAGE (behind, always ready) -->
				{#if nextPageData}
					<div
						class="absolute inset-0 p-6 md:p-10 flex flex-col transition-opacity duration-300"
						style="z-index: 1; opacity: {isFlipping && flipDirection === 'next' ? 1 : 0};"
					>
						<div class="text-right mb-4">
							<span class="text-[#8B7355] text-sm font-[family-name:var(--font-cinzel)]">
								{currentPage + 2} / {pages.length}
							</span>
						</div>
						<div class="text-center mb-2">
							<span class="text-[#AC8400]/50 text-xs font-[family-name:var(--font-cinzel)] tracking-[0.4em] uppercase">
								Capítulo {nextPageData.pageNumber}
							</span>
						</div>
						<h2 class="text-2xl md:text-3xl font-[family-name:var(--font-uncial)] text-[#3A2818] mb-6 text-center leading-tight">
							{nextPageData.title}
						</h2>
						<div class="flex items-center justify-center gap-3 mb-6">
							<div class="w-12 h-px bg-gradient-to-r from-transparent to-[#8B7355]/50"></div>
							<span class="text-[#AC8400] text-sm">✦</span>
							<div class="w-12 h-px bg-gradient-to-l from-transparent to-[#8B7355]/50"></div>
						</div>
						{#if nextPageData.visualUrl}
							<div class="mb-6 rounded-lg overflow-hidden shadow-lg mx-auto max-w-md">
								<img src="{base}{nextPageData.visualUrl}" alt={nextPageData.title} class="w-full h-40 md:h-52 object-cover" loading="lazy" />
							</div>
						{:else}
							<div class="mb-6 h-40 md:h-52 bg-gradient-to-br from-[#AC8400]/10 to-[#8B0000]/10 rounded-lg flex items-center justify-center border border-[#AC8400]/10">
								<span class="text-5xl opacity-30">📖</span>
							</div>
						{/if}
						<div class="flex-1 flex items-center">
							<p class="text-[#2A1E12] font-[family-name:var(--font-cinzel)] text-base md:text-lg leading-relaxed md:leading-loose text-center italic">
								{nextPageData.narration}
							</p>
						</div>
					</div>
				{/if}

				<!-- CURRENT PAGE (on top) -->
				<div
					class="absolute inset-0 p-6 md:p-10 flex flex-col transition-all duration-500 ease-in-out"
					style="z-index: 2; {isFlipping ? (flipDirection === 'next' ? 'transform: perspective(1200px) rotateY(-90deg); opacity: 0;' : 'transform: perspective(1200px) rotateY(90deg); opacity: 0;') : 'transform: perspective(1200px) rotateY(0deg); opacity: 1;'}"
				>
					<div class="text-right mb-4">
						<span class="text-[#8B7355] text-sm font-[family-name:var(--font-cinzel)]">
							{currentPage + 1} / {pages.length}
						</span>
					</div>
					{#if currentPageData}
						<div class="text-center mb-2">
							<span class="text-[#AC8400]/50 text-xs font-[family-name:var(--font-cinzel)] tracking-[0.4em] uppercase">
								Capítulo {currentPageData.pageNumber}
							</span>
						</div>
						<h2 class="text-2xl md:text-3xl font-[family-name:var(--font-uncial)] text-[#3A2818] mb-6 text-center leading-tight">
							{currentPageData.title}
						</h2>
						<div class="flex items-center justify-center gap-3 mb-6">
							<div class="w-12 h-px bg-gradient-to-r from-transparent to-[#8B7355]/50"></div>
							<span class="text-[#AC8400] text-sm">✦</span>
							<div class="w-12 h-px bg-gradient-to-l from-transparent to-[#8B7355]/50"></div>
						</div>
						{#if currentPageData.visualUrl}
							<div class="mb-6 rounded-lg overflow-hidden shadow-lg mx-auto max-w-md">
								<img src="{base}{currentPageData.visualUrl}" alt={currentPageData.title} class="w-full h-40 md:h-52 object-cover" loading="lazy" />
							</div>
						{:else}
							<div class="mb-6 h-40 md:h-52 bg-gradient-to-br from-[#AC8400]/10 to-[#8B0000]/10 rounded-lg flex items-center justify-center border border-[#AC8400]/10">
								<span class="text-5xl opacity-30">📖</span>
							</div>
						{/if}
						<div class="flex-1 flex items-center">
							<p class="text-[#2A1E12] font-[family-name:var(--font-cinzel)] text-base md:text-lg leading-relaxed md:leading-loose text-center italic">
								{currentPageData.narration}
							</p>
						</div>
						<div class="mt-6 flex items-center justify-center gap-2">
							<div class="w-2 h-2 rounded-full bg-[#AC8400]/30"></div>
							<div class="w-1.5 h-1.5 rounded-full bg-[#AC8400]/20"></div>
							<div class="w-2 h-2 rounded-full bg-[#AC8400]/30"></div>
						</div>
					{/if}
				</div>

				<!-- Page Corner Fold -->
				<div class="absolute bottom-0 right-0 w-16 h-16 overflow-hidden" style="z-index: 3;">
					<div class="absolute bottom-0 right-0 w-0 h-0 border-l-[64px] border-l-transparent border-b-[64px] border-b-[#AC8400]/20"></div>
				</div>
			</div>

			<!-- Navigation Controls -->
			<div class="mt-6 md:mt-8 flex items-center justify-between gap-4">
				<button
					onclick={prevPage}
					disabled={isFirstPage || isFlipping}
					class="flex items-center gap-2 px-5 py-2.5 rounded-full font-[family-name:var(--font-cinzel)] text-sm transition-all duration-300
						{isFirstPage
							? 'bg-[#1a1a1a] text-gray-600 cursor-not-allowed border border-gray-800'
							: 'bg-[#AC8400] text-[#0a0a0a] hover:bg-[#E8C84A] hover:shadow-lg hover:shadow-[#AC8400]/20 active:scale-95'}"
				>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
					</svg>
					Anterior
				</button>

				<div class="flex items-center gap-2">
					{#each pages as _, index}
						<button
							onclick={() => {
								if (!isFlipping && index !== currentPage) {
									flipDirection = index > currentPage ? 'next' : 'prev';
									isFlipping = true;
									setTimeout(() => {
										currentPage = index;
										isFlipping = false;
									}, 400);
								}
							}}
							class="transition-all duration-300 rounded-full
								{currentPage === index
									? 'w-8 h-2 bg-[#AC8400]'
									: 'w-2 h-2 bg-[#AC8400]/30 hover:bg-[#AC8400]/50'}"
							aria-label="Ir a página {index + 1}"
						/>
					{/each}
				</div>

				<button
					onclick={nextPage}
					disabled={isLastPage || isFlipping}
					class="flex items-center gap-2 px-5 py-2.5 rounded-full font-[family-name:var(--font-cinzel)] text-sm transition-all duration-300
						{isLastPage
							? 'bg-[#1a1a1a] text-gray-600 cursor-not-allowed border border-gray-800'
							: 'bg-[#AC8400] text-[#0a0a0a] hover:bg-[#E8C84A] hover:shadow-lg hover:shadow-[#AC8400]/20 active:scale-95'}"
				>
					Siguiente
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</button>
			</div>

			<!-- Progress Bar -->
			<div class="mt-4 h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
				<div
					class="h-full bg-gradient-to-r from-[#AC8400] to-[#E8C84A] rounded-full transition-all duration-500"
					style="width: {progress}%"
				></div>
			</div>

			<div class="mt-4 text-center">
				<p class="text-[#D2CFA0]/30 text-xs font-[family-name:var(--font-legible)]">
					Usa las teclas ← → o desliza para navegar
				</p>
			</div>
		</div>
	</main>
</div>
