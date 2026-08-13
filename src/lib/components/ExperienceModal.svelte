<script>
  import { base } from '$app/paths';
  import { slide } from 'svelte/transition';
  import { onDestroy } from 'svelte';

  let { open = false, experience = {}, onclose } = $props();

  let currentImageIndex = $state(0);
  let imageTimer;
  let startX = 0;

  const images = $derived(experience.images || [experience.image].filter(Boolean));
  const funLevels = ['Alta', 'Increíble', 'Bastante'];
  const randomFunLevel = funLevels[Math.floor(Math.random() * funLevels.length)];
  const spendHours = Math.floor(Math.random() * 20) + 5;

  const achievementPool = [
    'Super competitivo', 'Adictivo', 'Muchas risas', 'Nos tomó mucho', 'Muy fácil',
    'Racha de jugadas', 'Perfeccionista', 'Exploradores unidos', 'Reyes de la zona',
    'Unidos', 'Coleccionistas', 'Joya oculta', 'Estresante pero cool'
  ];

  const achievements = $derived.by(() => {
    open; // re-randomize when modal opens
    const shuffled = [...achievementPool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.floor(Math.random()) + 4);
  });

  function stopImageRotation() {
    if (imageTimer) {
      clearInterval(imageTimer);
      imageTimer = null;
    }
  }

  function startImageRotation() {
    stopImageRotation();
    if (images.length > 1) {
      imageTimer = setInterval(() => {
        currentImageIndex = (prev => prev >= images.length - 1 ? prev : prev + 1)(currentImageIndex);
        if (currentImageIndex >= images.length - 1) {
          stopImageRotation();
        }
      }, 5000);
    }
  }

  function handleDragStart(e) {
    startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
  }

  function handleDragEnd(e) {
    const endX = e.type.includes('touch') ? e.changedTouches[0].clientX : e.clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        currentImageIndex = (currentImageIndex + 1) % images.length;
      } else {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
      }
      stopImageRotation();
    }
  }

  function handleCarouselClick(e) {
    if (e.target.closest('button')) return;
    currentImageIndex = (currentImageIndex + 1) % images.length;
    stopImageRotation();
  }

  function goToImage(index) {
    currentImageIndex = index;
    stopImageRotation();
  }

  $effect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  });

  $effect(() => {
    if (open && images.length > 0) {
      currentImageIndex = 0;
      startImageRotation();
    }
    return () => stopImageRotation();
  });

  onDestroy(() => stopImageRotation());
</script>

{#if open}
  <div class="fixed inset-0 z-50 flex items-end justify-center">
    <div class="absolute inset-0 bg-black/60" onclick={onclose}></div>

    <div
      transition:slide={{ duration: 400, axis: 'y' }}
      class="relative w-full max-w-3xl max-h-[85vh] bg-[#111] rounded-t-2xl overflow-hidden shadow-lg"
    >
      <!-- Header -->
      <div class="flex items-center gap-4 p-4 border-b border-white/5">
        <h3 class="text-2xl md:text-3xl text-[#E8C84A] font-[family-name:var(--font-slackey)]">
          {experience.title}
        </h3>
        <button class="ml-auto text-[#D2CFA0]/60 hover:text-[#E8C84A]" onclick={onclose} aria-label="Close">
          ✕
        </button>
      </div>

      <!-- Content -->
      <div class="p-4 overflow-auto overscroll-contain max-h-[calc(85vh-80px)] pb-4">
        <!-- Image carousel and info -->
        <div class="flex flex-col md:flex-row gap-4 mb-6">
          <!-- Image carousel -->
          <div
            class="w-full md:w-1/2 aspect-video bg-gradient-to-br from-[#1a0a0a] to-[#0a0a0a] rounded-xl overflow-hidden relative cursor-pointer"
            onmousedown={handleDragStart}
            onmouseup={handleDragEnd}
            ontouchstart={handleDragStart}
            ontouchend={handleDragEnd}
            onclick={handleCarouselClick}
          >
            {#each images as image, index}
              {#if index === currentImageIndex}
                <img
                  src="{base}{image}"
                  alt="{experience.title} - Image {index + 1}"
                  class="w-full h-full object-cover absolute inset-0"
                />
              {/if}
            {/each}
            {#if images.length > 1}
              <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                {#each images as _, index}
                  <button
                    class="h-2 rounded-full transition-all duration-300 {index === currentImageIndex ? 'w-5 bg-[#E8C84A]' : 'w-2 bg-white/30'}"
                    onclick={() => goToImage(index)}
                    aria-label="Go to image {index + 1}"
                  ></button>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Info -->
          <div class="w-full md:w-1/2 flex items-center justify-around">
            <div>
              <span class="text-[#D2CFA0]/60 text-sm">Horas invertidas:</span>
              <p class="text-xl text-[#E8C84A] font-bold">{spendHours}h</p>
            </div>
            <div>
              <span class="text-[#D2CFA0]/60 text-sm">Nivel de Diversión:</span>
              <p class="text-xl text-[#E8C84A] font-bold">{randomFunLevel}</p>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="mb-6">
          <h4 class="text-lg font-bold text-[#D2CFA0] mb-0">Descripción</h4>
          <p class="text-[#D2CFA0]/85 leading-tight">{experience.description}</p>
        </div>

        <!-- Achievements -->
        <div class="mb-6">
          <h4 class="text-lg font-bold text-[#D2CFA0] mb-2">Achievements</h4>
          <div class="flex flex-wrap gap-2">
            {#each achievements as achievement}
              <span class="px-3 py-1 bg-[#1d64cf]/20 border border-[#1d64cf]/30 rounded-full text-sm text-[#D2CFA0]">
                🏆 {achievement}
              </span>
            {/each}
          </div>
        </div>

        <!-- Play button -->
        <button class="w-full px-4 py-3 bg-[#1d64cf] text-white rounded-xl font-bold text-lg hover:bg-[#1550a8] transition-colors" onclick={onclose} style="margin-bottom: 10px;">
          ▶ Jugar juntos
        </button>
      </div>
    </div>
  </div>
{/if}
