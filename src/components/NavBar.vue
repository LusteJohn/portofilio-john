<template>
  <nav class="site-navbar sticky top-0 w-full z-50 bg-[#131313]/60 backdrop-blur-md">
    <div class="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
      
      <div class="text-xl font-black tracking-tighter">
        {{ brand }}
      </div>

      <div class="hidden md:flex gap-10 font-bold">
        <a v-for="link in links" :key="link.label" :href="link.href">
          {{ link.label }}
        </a>
      </div>

      <button class="bg-[#2a2a2a] px-6 py-2 rounded-full font-bold">
        {{ buttonText }}
      </button>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  brand: String,
  links: Array,
  buttonText: String
})
</script>

<style scoped>
.site-navbar {
  position: sticky;
  top: 0;
  z-index: 50;
}
</style>