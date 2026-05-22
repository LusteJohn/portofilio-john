<template>
  <section class="relative min-h-screen flex flex-col items-center justify-center px-8 text-center overflow-hidden">
    
    <!-- Background Glow -->
    <div class="absolute inset-0 opacity-20 pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full"></div>
    </div>

    <div class="relative z-10 max-w-5xl">
      <span class="uppercase tracking-[0.2em] text-primary mb-6 block">
        {{ badge }}
      </span>

      <h1 class="text-6xl md:text-8xl font-extrabold mb-8 leading-[1.1]">
        {{ title }} <br />
        <span class="text-gradient">{{ highlight }}</span>
      </h1>

      <p class="text-xl max-w-2xl mx-auto mb-12">
        {{ description }}
      </p>

      <div class="flex flex-col md:flex-row gap-6 justify-center">
        <button class="btn-gradient px-10 py-4 rounded-full font-bold text-lg">
          {{ primaryBtn }}
        </button>

        <button class="border px-10 py-4 rounded-full font-bold text-lg">
          {{ secondaryBtn }}
        </button>
      </div>
    </div>

  </section>
</template>

<script setup>
defineProps({
  badge: String,
  title: String,
  highlight: String,
  description: String,
  primaryBtn: String,
  secondaryBtn: String
})
</script>