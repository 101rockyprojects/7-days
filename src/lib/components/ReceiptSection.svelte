<script>
	import { onMount, onDestroy } from 'svelte';

	let { items = [] } = $props();

	let scrollProgress = $state(0);
	let viewportHeight = $state(800);
	let receiptHeight = $state(0);
	let receiptEl = $state(null);

	const PRINTER_BASE_TOP = 100;

	function formatDate(dateStr) {
		const d = new Date(dateStr);
		const day = String(d.getDate()).padStart(2, '0');
		const month = String(d.getMonth() + 1).padStart(2, '0');
		const year = String(d.getFullYear()).slice(-2);
		return `${day}-${month}-${year}`;
	}

	function truncatePrice(price) {
		if (!price) return '';
		const words = price.split(' ');
		return words.slice(0, 2).join(' ');
	}

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
		class="absolute left-1/2 -translate-x-1/2 w-80 max-w-[95dvw] overflow-hidden z-20"
		style="top: {PRINTER_BASE_TOP}px; height: {containerHeight}px;"
	>
		<!-- RECEIPT PAPER (scrolls inside container, starts above) -->
		<div 
			bind:this={receiptEl}
			class="absolute left-0 w-full"
			style="top: {receiptTop}px;"
		>
			<div class="relative bg-[#fff] shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
				<!-- Perforated edge -->
				<div class="h-4 w-full" style="background-image: radial-gradient(circle, #fff 3px, transparent 3.5px); background-size: 16px 16px; background-position: center;"></div>

				<!-- Header -->
				<div class="px-4 pt-4 pb-4 text-center border-b-2 border-dashed border-[#1A1410]/40">
					<p class="text-[14px] text-[#1A1410] font-pixel leading-loose">ROCKY AS A HUSBAND CO.</p>
					<p class="text-[10px] text-[#1A1410] font-pixel leading-tight">13600   ALCÁZAR DE SAN JUAN</p>
					<p class="text-[10px] text-[#1A1410] font-pixel leading-tight">TELÉFONO:      685 5O 80 13</p>
					<p class="text-[10px] text-[#1A1410] font-pixel leading-tight">01/07/2026  17:12  OP:06082003</p>
					<p class="text-[10px] text-[#1A1410] font-pixel leading-tight">FACTURA POR SERVICIOS AMOROSOS</p>
					<p class="text-[10px] text-[#1A1410] font-pixel leading-tight">NÚMERO DE CLIENTE: M1L4GR05</p>

					<!-- Barcode -->
					<div class="mt-3 h-10 w-full flex items-end justify-center gap-[1px]">
						{#each Array(10) as _, i}
							<div class="bg-[#3A3430]" style="width: {i % 3 === 0 ? '2px' : '1px'}; height: 100%;"></div>
							<div class="bg-[#3A3430]" style="width: {i % 5 === 0 ? '5px' : '2px'}; height: 100%;"></div>
							<div class="bg-[#3A3430]" style="width: {i % 2 === 0 ? '2px' : '3px'}; height: 100%;"></div>
						{/each}
						{#each Array(10) as _, i}
					<div class="bg-[#3A3430]" style="width: {i % 2 === 0 ? '2px' : '3px'}; height: 100%;"></div>
							<div class="bg-[#3A3430]" style="width: {i % 5 === 0 ? '5px' : '2px'}; height: 100%;"></div>
							<div class="bg-[#3A3430]" style="width: {i % 3 === 0 ? '2px' : '1px'}; height: 100%;"></div>
						{/each}
					</div>
				</div>

				<!-- Items (reversed) -->
				<div class="px-4 py-3">
					{#each reversedItems as item, index}
						<div class="py-5 border-b border-[#1A1410]/20 last:border-0">
							<div class="flex justify-between items-baseline mb-1">
								<p class="text-xs text-[#1A1410]/50 font-pixel">{formatDate(item.date)}</p>
								<p class="text-xs text-[#1A1410]/50 font-pixel">#{String(index + 1).padStart(4, '0')}</p>
							</div>
							<div class="flex justify-between items-baseline gap-2 mb-1">
								<span class="text-sm font-bold text-[#1A1410] font-pixel">{item.service}</span>
								<span class="text-sm font-bold text-[#1A1410] font-pixel whitespace-nowrap">$ {truncatePrice(item.price)}</span>
							</div>
							<p class="text-xs text-[#1A1410]/70 font-grid-single leading-relaxed">{item.description}</p>
						</div>
					{/each}
				</div>

				<!-- Footer -->
				<div class="px-4 py-4 border-t-2 border-dashed border-[#1A1410]/40">
					<div class="text-center">
						<p class="text-sm text-[#1A1410] font-pixel tracking-widest">TOTAL</p>
						<p class="text-base font-bold text-[#1A1410] font-pixel mt-0.5">Todo lo que soy</p>
					</div>
					<p class="text-center text-xs text-[#1A1410]/70 font-grid-single italic mt-3">¡Gracias por tu compra!</p>
				</div>

				<!-- Torn edge -->
				<div class="h-4 bg-[#1a1a1a]">
					<svg class="w-full h-4" viewBox="0 0 200 16" preserveAspectRatio="none">
						<path d="M0,0 L5,16 L10,0 L15,16 L20,0 L25,16 L30,0 L35,16 L40,0 L45,16 L50,0 L55,16 L60,0 L65,16 L70,0 L75,16 L80,0 L85,16 L90,0 L95,16 L100,0 L105,16 L110,0 L115,16 L120,0 L125,16 L130,0 L135,16 L140,0 L145,16 L150,0 L155,16 L160,0 L165,16 L170,0 L175,16 L180,0 L185,16 L190,0 L195,16 L200,0" fill="#fff"/>
					</svg>
				</div>
			</div>
		</div>
	</div>

	<!-- PRINTER BODY (z-30: receipt passes BEHIND this) -->
	<div class="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
		<div class="relative">
			<div class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-96 max-w-[97dvw] h-6 bg-black/40 rounded-full blur-xl"></div>
			<div class="relative w-96 max-w-[97dvw]">
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
		<div class="relative w-96 max-w-[97dvw]">
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
				<div class="w-5 h-8 border-2 border-[#AC8400]/40 rounded-full flex justify-center pt-1.5">
					<div class="w-1 h-1.5 bg-[#AC8400]/60 rounded-full animate-pulse"></div>
				</div>
				<span class="text-[#AC8400]/50 text-[10px] font-cinzel tracking-wider">Desplaza para imprimir</span>
			</div>
		</div>
	{/if}
</div>
