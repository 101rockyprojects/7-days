<script>
	/**
	 * RobloxSection → Time Machine
	 * Live counter of days together since 2022-02-17
	 */

	import { onMount } from 'svelte';
	import { base } from '$app/paths';

	let { data = { experiences: [], achievements: [], profile: {} } } = $props();

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

	function pad(n) {
		return n.toString().padStart(2, '0');
	}

	const milestones = [
		{ icon: '💬', title: 'Primer Mensaje', date: '17 Feb 2022' },
		{ icon: '📞', title: 'Primera Llamada', date: 'Marzo 2022' },
		{ icon: '💯', title: '100 Días Juntos', date: 'Mayo 2022' },
		{ icon: '🌙', title: 'Noche sin Dormir', date: '2022' },
		{ icon: '✈️', title: 'Destructor de Distancias', date: '2023' },
		{ icon: '❤️', title: 'Sanador de Corazones', date: '2023' }
	];
</script>

<div class="min-h-screen bg-[#0a0a0a] pb-24">
	<main class="max-w-5xl mx-auto px-4 py-12 md:py-20">

		<!-- Hero Counter -->
		<section class="text-center mb-16 md:mb-24">
			<p class="text-[#D2CFA0]/40 text-xs font-[family-name:var(--font-cinzel)] tracking-[0.25em] uppercase mb-4">
				Juntos desde el 17 de Febrero de 2022
			</p>

			<div class="relative inline-block">
				<!-- Glow ring -->
				<div class="absolute -inset-6 bg-[#AC8400]/5 rounded-full blur-2xl"></div>

				<div class="relative bg-[#111] border border-[#AC8400]/10 rounded-3xl px-8 py-10 md:px-14 md:py-12">
					<!-- Days -->
					<div class="mb-6">
						<span class="text-7xl md:text-8xl lg:text-9xl font-[family-name:var(--font-felipa)] text-[#E8C84A] leading-none tabular-nums">
							{days.toLocaleString()}
						</span>
						<span class="block text-[#D2CFA0]/40 text-xs font-[family-name:var(--font-cinzel)] tracking-[0.2em] uppercase mt-2">
							Días
						</span>
					</div>

					<!-- Time breakdown -->
					<div class="flex items-center justify-center gap-3 md:gap-5 text-[#D2CFA0]/60 font-[family-name:var(--font-cinzel)]">
						<div class="text-center">
							<span class="block text-2xl md:text-3xl text-[#E8C84A]/80 tabular-nums">{pad(hours)}</span>
							<span class="text-[10px] tracking-[0.15em] uppercase">Horas</span>
						</div>
						<span class="text-[#AC8400]/30 text-lg">:</span>
						<div class="text-center">
							<span class="block text-2xl md:text-3xl text-[#E8C84A]/80 tabular-nums">{pad(minutes)}</span>
							<span class="text-[10px] tracking-[0.15em] uppercase">Min</span>
						</div>
						<span class="text-[#AC8400]/30 text-lg">:</span>
						<div class="text-center">
							<span class="block text-2xl md:text-3xl text-[#E8C84A]/80 tabular-nums">{pad(seconds)}</span>
							<span class="text-[10px] tracking-[0.15em] uppercase">Seg</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Stats Grid -->
		<section class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-16 md:mb-24">
			<div class="bg-[#111] border border-white/5 rounded-2xl p-5 text-center">
				<div class="text-3xl md:text-4xl font-bold text-[#E8C84A] font-[family-name:var(--font-legible)] tabular-nums">
					{days.toLocaleString()}
				</div>
				<div class="text-[10px] text-[#D2CFA0]/30 font-[family-name:var(--font-cinzel)] tracking-[0.15em] uppercase mt-1">
					Días Juntos
				</div>
			</div>

			<div class="bg-[#111] border border-white/5 rounded-2xl p-5 text-center">
				<div class="text-3xl md:text-4xl font-bold text-[#E8C84A] font-[family-name:var(--font-legible)] tabular-nums">
					{((data.profile.stats?.hoursTalked || 0) + Math.floor(elapsed / 3600000)).toLocaleString()}
				</div>
				<div class="text-[10px] text-[#D2CFA0]/30 font-[family-name:var(--font-cinzel)] tracking-[0.15em] uppercase mt-1">
					Horas Habladas
				</div>
			</div>

			<div class="bg-[#111] border border-white/5 rounded-2xl p-5 text-center">
				<div class="text-3xl md:text-4xl font-bold text-[#E8C84A] font-[family-name:var(--font-legible)] tabular-nums">
					{(data.profile.stats?.messagesSent || 0).toLocaleString()}
				</div>
				<div class="text-[10px] text-[#D2CFA0]/30 font-[family-name:var(--font-cinzel)] tracking-[0.15em] uppercase mt-1">
					Mensajes
				</div>
			</div>

			<div class="bg-[#111] border border-white/5 rounded-2xl p-5 text-center">
				<div class="text-3xl md:text-4xl font-bold text-[#E8C84A] font-[family-name:var(--font-legible)] tabular-nums">
					{data.profile.stats?.virtualDates || 0}
				</div>
				<div class="text-[10px] text-[#D2CFA0]/30 font-[family-name:var(--font-cinzel)] tracking-[0.15em] uppercase mt-1">
					Citas Virtuales
				</div>
			</div>
		</section>

		<!-- Milestones Timeline -->
		<section class="mb-16 md:mb-24">
			<h2 class="text-xl md:text-2xl font-[family-name:var(--font-slackey)] text-[#AC8400] mb-8 text-center">
				Momentos que nos definieron
			</h2>

			<div class="relative max-w-lg mx-auto">
				<!-- Vertical line -->
				<div class="absolute left-5 md:left-6 top-0 bottom-0 w-px bg-[#AC8400]/15"></div>

				<div class="space-y-6">
					{#each milestones as milestone, i}
						<div class="relative flex items-start gap-4 md:gap-5 pl-12 md:pl-14">
							<!-- Dot -->
							<div class="absolute left-3 md:left-4 top-1 w-4 h-4 rounded-full bg-[#1a1a1a] border-2 border-[#AC8400]/40"></div>

							<div>
								<div class="flex items-center gap-2 mb-0.5">
									<span class="text-lg">{milestone.icon}</span>
									<span class="text-[#D2CFA0] font-[family-name:var(--font-slackey)] text-sm">
										{milestone.title}
									</span>
								</div>
								<span class="text-[#D2CFA0]/30 text-xs font-[family-name:var(--font-cinzel)] tracking-wider">
									{milestone.date}
								</span>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- Experiences Grid -->
		<section>
			<h2 class="text-xl md:text-2xl font-[family-name:var(--font-slackey)] text-[#AC8400] mb-8 text-center">
				Nuestras Aventuras
			</h2>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
				{#each data.experiences as experience}
					<div class="group relative bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-[#AC8400]/20 transition-all duration-300">
						<!-- Thumbnail -->
						<div class="aspect-video bg-gradient-to-br from-[#1a0a0a] to-[#111] relative overflow-hidden">
							{#if experience.image}
								<img
									src="{base}{experience.image}"
									alt={experience.title}
									class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
									loading="lazy"
								/>
							{:else}
								<div class="w-full h-full flex items-center justify-center">
									<span class="text-4xl opacity-30 group-hover:opacity-50 transition-opacity duration-300">📸</span>
								</div>
							{/if}
							<div class="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent"></div>
						</div>

						<!-- Info -->
						<div class="p-4">
							<h3 class="text-[#D2CFA0] font-[family-name:var(--font-slackey)] text-sm mb-1 group-hover:text-[#E8C84A] transition-colors duration-200">
								{experience.title}
							</h3>
							<p class="text-[#D2CFA0]/40 text-xs font-[family-name:var(--font-legible)] line-clamp-2">
								{experience.description}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</section>

	</main>
</div>
