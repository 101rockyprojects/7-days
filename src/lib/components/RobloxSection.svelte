<script>
	/**
	 * RobloxSection → Time Machine
	 * Live counter of days together since 2022-02-17
	 */

	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import FloatingStickers from './FloatingStickers.svelte';
	import ExperienceModal from './ExperienceModal.svelte';

	let { data = { experiences: [], achievements: [], profile: {} } } = $props();

	const stickers = [
		{ image: '/images/red-angel.webp', side: 'left', sideMargin: -0.75, bottom: '52%', rotate: -5, size: 'medium' },
		{ image: '/images/chibi-mili.webp', side: 'left', sideMargin: 0, bottom: '32%', rotate: 8, size: 'medium' },
		{ image: '/images/snowman.webp', side: 'left', sideMargin: 4, bottom: '14%', rotate: 4, size: 'medium' },
		{ image: '/images/cute-hug.webp', side: 'left', sideMargin: 12, bottom: '0%', rotate: -8, size: 'large' },
		{ image: '/images/mili-roblox.webp', side: 'right', sideMargin: 0, bottom: '-8%', rotate: -2, size: 'extralarge' },
		{ image: '/images/cherries.webp', side: 'right', sideMargin: 0.25, bottom: '68%', rotate: 10, size: 'medium' },
		{ image: '/images/happy-valentine-cat.webp', side: 'right', sideMargin: -10, bottom: '32%', rotate: 13, size: 'large' },
		{ image: '/images/needlework-letter-M.webp', side: 'right', sideMargin: 5.1, bottom: '16%', rotate: 10, size: 'tiny' },
	];

	const START_DATE = new Date('2022-02-17T00:00:00');

	let now = $state(Date.now());
	let elapsed = $derived(now - START_DATE.getTime());

	let days = $derived(Math.floor(elapsed / 86400000));
	let hours = $derived(Math.floor((elapsed % 86400000) / 3600000));
	let minutes = $derived(Math.floor((elapsed % 3600000) / 60000));
	let seconds = $derived(Math.floor((elapsed % 60000) / 1000));

	let timer;

	onMount(() => {
		timer = setInterval(() => { now = Date.now(); }, 1000);
		return () => clearInterval(timer);
	});

	// Modal state
	let modalOpen = $state(false);
	let modalExperience = $state(null);

	function openModal(exp) {
		modalExperience = exp;
	 	modalOpen = true;
	}

	function closeModal() {
	 	modalOpen = false;
	 	modalExperience = null;
	}

	function pad(n) {
		return n.toString().padStart(2, '0');
	}
</script>

<div class="min-h-screen bg-[#0a0a0a] pb-24">
	<FloatingStickers stickers={stickers || []} />
	<main class="max-w-5xl mx-auto px-4 py-12 md:py-20">

		<!-- Experiences Grid -->
		<section class="mb-20 md:mb-24">
			<h1 class="text-3xl sm:text-4xl font-[family-name:var(--font-slackey)] text-pachment mb-8 text-center">
				Experiencias Destacadas
			</h1>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
				{#each data.experiences as experience}
					<div role="button" tabindex="0" onclick={() => openModal(experience)} onkeydown={(event) => event.key === 'Enter' && openModal(experience)} class="cursor-pointer group relative bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-[#AC8400]/20 transition-all duration-300">
						<!-- Thumbnail -->
						<div class="aspect-video bg-gradient-to-br from-[#1a0a0a] to-[#111] relative overflow-hidden">
							{#if experience.icon}
								<img
									src="{base}{experience.icon}"
									alt={experience.title}
									class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
									loading="lazy"
								/>
							{:else}
								<div class="w-full h-full flex items-center justify-center">
									<span class="text-4xl opacity-30 group-hover:opacity-50 transition-opacity duration-300">📸</span>
								</div>
							{/if}
						</div>
						<!-- Footer -->
						<div class="flex items-center justify-between px-4 py-3 bg-gradient-to-t">
							<span class="text-2xl font-bold text-cream font-[family-name:var(--font-slackey)]">{experience.title}</span>
							<span class="text-xl text-[#D2CFA0]">
								{'❤️'} {Math.floor(Math.random() * 9) + 91}%
							</span>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Hero Counter -->
		<section class="text-center mt-8 mb-12">
			<h1 class="text-3xl sm:text-4xl font-[family-name:var(--font-slackey)] text-pachment mb-8 text-center">
				Logros de la Relación
			</h1>
			<p class="text-[#D2CFA0] text-xs font-[family-name:var(--font-cinzel)] tracking-[0.25em] uppercase mb-4">
				Juntos desde el 17 de Febrero de 2022
			</p>

			<div class="relative inline-block z-20">
				<!-- Glow ring -->
				<div class="absolute -inset-6 bg-[#AC8400]/5 rounded-full blur-2xl"></div>

				<div class="relative bg-[#111] border border-[#AC8400]/10 rounded-3xl px-8 py-10 md:px-14 md:py-12">
					<!-- Days -->
					<div class="mb-6">
						<span class="text-7xl md:text-8xl lg:text-9xl font-[family-name:var(--font-felipa)] text-[#E8C84A] leading-none tabular-nums">
							{days.toLocaleString()}
						</span>
						<span class="block text-[#D2CFA0]/80 text-xs font-[family-name:var(--font-cinzel)] tracking-[0.2em] uppercase mt-2">
							Días
						</span>
					</div>

					<!-- Time breakdown -->
					<div class="flex items-center justify-center gap-3 md:gap-5 text-[#D2CFA0]/60 font-[family-name:var(--font-cinzel)]">
						<div class="text-center w-10">
							<span class="block text-2xl md:text-3xl text-[#E8C84A]/80 tabular-nums">{pad(hours)}</span>
							<span class="text-[10px] tracking-[0.15em] uppercase">Horas</span>
						</div>
						<span class="text-[#AC8400] text-2xl mb-7">:</span>
						<div class="text-center w-10">
							<span class="block text-2xl md:text-3xl text-[#E8C84A]/80 tabular-nums">{pad(minutes)}</span>
							<span class="text-[10px] tracking-[0.15em] uppercase">Min</span>
						</div>
						<span class="text-[#AC8400] text-2xl mb-7">:</span>
						<div class="text-center w-10">
							<span class="block text-2xl md:text-3xl text-[#E8C84A]/80 tabular-nums">{pad(seconds)}</span>
							<span class="text-[10px] tracking-[0.15em] uppercase">Seg</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Stats Grid -->
		<section class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 sm:mb-24 md:mb-40">
			<div class="bg-[#111] border border-white/5 rounded-2xl p-5 text-center">
				<div class="text-2xl sm:text-3xl font-bold text-[#E8C84A] font-[family-name:var(--font-legible)] tabular-nums">
					+{days.toLocaleString()}
				</div>
				<div class="text-[10px] text-[#D2CFA0]/80 font-[family-name:var(--font-cinzel)] tracking-[0.15em] uppercase mt-1">
					Días Juntos
				</div>
			</div>

			<div class="bg-[#111] border border-white/5 rounded-2xl p-5 text-center">
				<div class="text-2xl sm:text-3xl font-bold text-[#E8C84A] font-[family-name:var(--font-legible)] tabular-nums">
					+{((data.profile.stats?.hoursTalked || 0) + Math.floor(elapsed / 3600000)).toLocaleString()}
				</div>
				<div class="text-[10px] text-[#D2CFA0]/80 font-[family-name:var(--font-cinzel)] tracking-[0.15em] uppercase mt-1">
					Horas Habladas
				</div>
			</div>

			<div class="bg-[#111] border border-white/5 rounded-2xl p-5 text-center">
				<div class="text-2xl sm:text-3xl font-bold text-[#E8C84A] font-[family-name:var(--font-legible)] tabular-nums">
					+{(data.profile.stats?.messagesSent || 0).toLocaleString()}
				</div>
				<div class="text-[10px] text-[#D2CFA0]/80 font-[family-name:var(--font-cinzel)] tracking-[0.15em] uppercase mt-1">
					Mensajes
				</div>
			</div>

			<div class="bg-[#111] border border-white/5 rounded-2xl p-5 text-center">
				<div class="text-2xl sm:text-3xl font-bold text-[#E8C84A] font-[family-name:var(--font-legible)] tabular-nums">
					+{data.profile.stats?.virtualDates || 0}
				</div>
				<div class="text-[10px] text-[#D2CFA0]/80 font-[family-name:var(--font-cinzel)] tracking-[0.15em] uppercase mt-1">
					Citas Virtuales
				</div>
			</div>
		</section>

	</main>

	<!-- Experience modal -->
	<ExperienceModal open={modalOpen} experience={modalExperience} onclose={closeModal} />
</div>
