<script>
	import { onMount, onDestroy } from 'svelte';

	let { items = [] } = $props();

	let scrollProgress = $state(0);
	let viewportHeight = $state(800);
	let receiptHeight = $state(0);
	let receiptEl = $state(null);

	const PRINTER_BASE_TOP = 100;

	let reversedItems = $derived([...items].reverse());
	let containerHeight = $derived(viewportHeight - PRINTER_BASE_TOP);
	let maxScroll = $derived(receiptHeight);
	let receiptTop = $derived(scrollProgress - receiptHeight);

	onMount(() => {
		viewportHeight = window.innerHeight;
		if (receiptEl) receiptHeight = receiptEl.offsetHeight;

		function onResize() {
			viewportHeight = window.innerHeight;
		}

		function onWheel(e) {
			e.preventDefault();
			scrollProgress = Math.min(Math.max(scrollProgress + e.deltaY * 0.8, 0), maxScroll);
		}

		let touchY = 0;
		function onTouchStart(e) {
			touchY = e.touches[0].clientY;
		}
		function onTouchMove(e) {
			e.preventDefault();
			const newY = e.touches[0].clientY;
			const delta = touchY - newY;
			touchY = newY;
			scrollProgress = Math.min(Math.max(scrollProgress + delta * 2, 0), maxScroll);
		}

		function onKey(e) {
			if (e.key === 'ArrowDown' || e.key === ' ') {
				e.preventDefault();
				scrollProgress = Math.min(scrollProgress + 80, maxScroll);
			} else if (e.key === 'ArrowUp') {
				e.preventDefault();
				scrollProgress = Math.max(scrollProgress - 80, 0);
			}
		}

		window.addEventListener('resize', onResize);
		window.addEventListener('wheel', onWheel, { passive: false });
		window.addEventListener('touchstart', onTouchStart, { passive: true });
		window.addEventListener('touchmove', onTouchMove, { passive: false });
		window.addEventListener('keydown', onKey);

		return () => {
			window.removeEventListener('resize', onResize);
			window.removeEventListener('wheel', onWheel);
			window.removeEventListener('touchstart', onTouchStart);
			window.removeEventListener('touchmove', onTouchMove);
			window.removeEventListener('keydown', onKey);
		};
	});
</script>

<div class="fixed inset-0 bg-[#1a1a1a] overflow-hidden z-40">
	<!-- Background dots -->
	<div class="absolute inset-0 opacity-[0.03] pointer-events-none"
		style="background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0); background-size: 32px 32px;">
	</div>

	<!-- RECEIPT CONTAINER (positioned at printer base, overflow hidden at top) -->
	<div 
		class="absolute left-1/2 -translate-x-1/2 w-56 md:w-64 overflow-hidden z-20"
		style="top: {PRINTER_BASE_TOP}px; height: {containerHeight}px;"
	>
		<!-- RECEIPT PAPER (scrolls inside container, starts above) -->
		<div 
			bind:this={receiptEl}
			class="absolute left-0 w-full"
			style="top: {receiptTop}px;"
		>
			<div class="relative bg-[#fdfdfd] shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
				<!-- Paper texture -->
				<div class="absolute inset-0 opacity-[0.02] pointer-events-none"
					style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E');">
				</div>

				<!-- Header -->
				<div class="px-4 pt-5 pb-4 text-center border-b border-dashed border-gray-200">
					<div class="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-[#991111] to-[#cc0000] rounded-full flex items-center justify-center shadow-md">
						<span class="text-base">❤️</span>
					</div>
					<h2 class="text-sm font-[var(--font-slackey)] text-[#1a1a1a] tracking-wide">RECIBO DE AMOR</h2>
					<p class="text-[8px] text-gray-400 font-mono tracking-widest mt-0.5">AMOR & CÍA. · EST. 2021</p>
					<div class="mt-3 flex items-center justify-center gap-1">
						<div class="w-5 h-px bg-gray-200"></div>
						<span class="text-[7px] text-gray-300">✦</span>
						<div class="w-5 h-px bg-gray-200"></div>
					</div>
				</div>

				<!-- Items (reversed) -->
				<div class="px-4 py-3">
					{#each reversedItems as item, index}
						<div class="py-3 border-b border-gray-100 last:border-0">
							<p class="text-[7px] text-gray-400 font-mono uppercase tracking-widest mb-1">{item.date}</p>
							<div class="flex justify-between items-baseline gap-2 mb-1">
								<span class="text-[11px] font-bold text-[#1a1a1a] font-[var(--font-slackey)]">{item.service}</span>
								<span class="text-[10px] font-bold text-[#8B0000] font-mono whitespace-nowrap">{item.price}</span>
							</div>
							<p class="text-[10px] text-gray-500 font-[var(--font-cormorant)] italic leading-relaxed">{item.description}</p>
							<p class="mt-1.5 text-[7px] text-gray-400 font-mono">CLI: #{item.clientNumber}</p>
						</div>
					{/each}
				</div>

				<!-- Footer -->
				<div class="px-4 py-4 border-t border-dashed border-gray-200">
					<div class="flex items-center justify-center gap-1 mb-3">
						<div class="w-5 h-px bg-gray-200"></div>
						<span class="text-[7px] text-gray-300">✦</span>
						<div class="w-5 h-px bg-gray-200"></div>
					</div>
					<div class="text-center">
						<p class="text-[7px] text-gray-400 font-mono tracking-widest">TOTAL</p>
						<p class="text-base font-bold text-[#8B0000] font-[var(--font-slackey)] mt-0.5">AMOR INFINITO</p>
					</div>
					<p class="text-center text-[8px] text-gray-400 font-mono mt-3">¡Gracias por tu fidelidad!</p>
					<p class="text-center text-lg mt-2">❤️</p>
					<div class="mt-3 pt-3 border-t border-gray-100">
						<div class="flex justify-center gap-px">
							{#each Array(20) as _}
								<div class="bg-gray-800" style="width: 1px; height: {8 + Math.random() * 5}px;"></div>
							{/each}
						</div>
						<p class="text-center text-[6px] text-gray-300 font-mono mt-1 tracking-widest">20210815♥20240807</p>
					</div>
				</div>

				<!-- Torn edge -->
				<div class="h-4 bg-[#1a1a1a]">
					<svg class="w-full h-4" viewBox="0 0 200 16" preserveAspectRatio="none">
						<path d="M0,0 L5,16 L10,0 L15,16 L20,0 L25,16 L30,0 L35,16 L40,0 L45,16 L50,0 L55,16 L60,0 L65,16 L70,0 L75,16 L80,0 L85,16 L90,0 L95,16 L100,0 L105,16 L110,0 L115,16 L120,0 L125,16 L130,0 L135,16 L140,0 L145,16 L150,0 L155,16 L160,0 L165,16 L170,0 L175,16 L180,0 L185,16 L190,0 L195,16 L200,0" fill="#fdfdfd"/>
					</svg>
				</div>
			</div>
		</div>
	</div>

	<!-- PRINTER BODY (z-30: receipt passes BEHIND this) -->
	<div class="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
		<div class="relative">
			<div class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-72 h-6 bg-black/40 rounded-full blur-xl"></div>
			<div class="relative w-72 md:w-80">
				<!-- Top -->
				<div class="relative h-5 bg-gradient-to-b from-[#4a4a4a] to-[#3a3a3a] rounded-t-xl border-t-2 border-x-2 border-[#555]">
					<div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 md:w-44">
						<div class="h-[3px] bg-[#0a0a0a] rounded-t-sm shadow-inner"></div>
					</div>
				</div>
				<!-- Body -->
				<div class="relative bg-gradient-to-b from-[#353535] to-[#2a2a2a] px-4 py-3 border-x-2 border-[#444] shadow-2xl">
					<div class="flex items-center justify-between gap-3">
						<div class="flex items-center gap-2">
							<div class="w-7 h-7 bg-gradient-to-br from-[#ff4444] to-[#cc0000] rounded-lg flex items-center justify-center shadow-md">
								<span class="text-xs">💌</span>
							</div>
							<div class="leading-none">
								<p class="text-[7px] text-gray-500 font-mono tracking-wider">LOVE</p>
								<p class="text-[9px] text-gray-300 font-mono font-bold tracking-wider">PRINTER</p>
							</div>
						</div>
						<div class="flex items-center gap-2">
							<div class="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]"></div>
							<div class="w-1.5 h-1.5 rounded-full {scrollProgress > 0 ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.7)]' : 'bg-gray-600'}"></div>
						</div>
					</div>
					<div class="mt-2.5 flex items-center justify-center gap-1">
						{#each Array(15) as _}
							<div class="w-4 h-[2px] bg-[#111] rounded-full"></div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- PRINTER BASE (z-10: receipt passes OVER this) -->
	<div class="absolute left-1/2 -translate-x-1/2 z-10 pointer-events-none" style="top: {PRINTER_BASE_TOP - 4}px;">
		<div class="relative w-72 md:w-80">
			<!-- Slot opening -->
			<div class="w-full h-[3px] bg-[#0a0a0a] shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)]"></div>
			<!-- Base plate -->
			<div class="relative h-4 bg-gradient-to-b from-[#2d2d2d] to-[#222] rounded-b-xl border-2 border-[#444] border-t-0">
				<div class="absolute -bottom-1.5 left-6 w-4 h-1.5 bg-[#333] rounded-b-sm shadow-md"></div>
				<div class="absolute -bottom-1.5 right-6 w-4 h-1.5 bg-[#333] rounded-b-sm shadow-md"></div>
			</div>
		</div>
	</div>

	<!-- Scroll Hint -->
	{#if scrollProgress < 100}
		<div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
			<div class="flex flex-col items-center gap-2 animate-bounce">
				<div class="w-5 h-8 border-2 border-[#D4AF37]/40 rounded-full flex justify-center pt-1.5">
					<div class="w-1 h-1.5 bg-[#D4AF37]/60 rounded-full animate-pulse"></div>
				</div>
				<span class="text-[#D4AF37]/50 text-[10px] font-[var(--font-cinzel)] tracking-wider">Desplaza para imprimir</span>
			</div>
		</div>
	{/if}
</div>
