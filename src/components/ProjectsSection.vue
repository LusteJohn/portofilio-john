<template>
  <div class="relative w-full">
    <!-- Carousel Container -->
    <div class="relative overflow-hidden rounded-2xl">
      <!-- Slides Container -->
      <div class="relative">
        <div
          class="flex transition-transform duration-700 ease-in-out"
          :style="{ transform: `translateX(calc(-${currentIndex * (100 / itemsPerView)}%))` }"
        >
          <!-- Duplicate projects for infinite loop effect -->
          <div
            v-for="(project, idx) in [...projects, ...projects]"
            :key="idx"
            class="w-full flex-shrink-0"
            :style="{ width: `calc(100% / ${itemsPerView})` }"
          >
            <div class="mx-2 overflow-hidden rounded-2xl border border-outline-variant/10 bg-surface-container-low transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
              <!-- Image -->
              <div class="relative h-48 w-full overflow-hidden bg-gradient-to-b from-transparent to-background">
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              <!-- Content -->
              <div class="flex flex-col justify-between p-4">
                <div>
                  <div class="mb-3 flex items-center gap-2">
                    <span class="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                      <span class="material-symbols-outlined text-xs">{{ project.icon }}</span>
                      {{ project.type }}
                    </span>
                    <span class="text-[10px] uppercase tracking-tighter text-on-surface-variant">Design</span>
                  </div>

                  <h3 class="mb-3 line-clamp-2 font-headline text-base font-bold leading-snug text-on-surface">
                    {{ project.title }}
                  </h3>

                  <!-- Author Info -->
                  <div class="mb-3 flex items-center gap-2">
                    <div class="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center">
                      <span class="text-xs font-bold text-primary">{{ project.author.charAt(0) }}</span>
                    </div>
                    <div class="flex-1 text-sm">
                      <p class="font-semibold text-on-surface">{{ project.author }}</p>
                      <p class="text-xs text-on-surface-variant">{{ project.role }}</p>
                    </div>
                  </div>

                  <!-- Rating -->
                  <div class="mb-3 flex items-center gap-1">
                    <div class="flex gap-0.5">
                      <span v-for="i in 5" :key="i" class="material-symbols-outlined text-xs text-yellow-400">
                        star
                      </span>
                    </div>
                    <span class="text-xs text-on-surface-variant">5.0</span>
                  </div>
                </div>

                <!-- CTA Button -->
                <a 
                  :href="project.link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="w-full rounded-lg bg-primary/90 py-2.5 font-headline text-sm font-bold text-on-primary transition-all hover:bg-primary active:scale-95 flex items-center justify-center gap-2 no-underline"
                >
                  <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Check Project on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Indicator Dots -->
    <div class="mt-6 flex justify-center gap-2">
      <button
        v-for="(_, idx) in projects"
        :key="idx"
        @click="goToSlide(idx)"
        :class="[
          'rounded-full transition-all',
          idx === currentIndex
            ? 'h-2.5 w-8 bg-primary'
            : 'h-2 w-2 bg-on-surface-variant/30 hover:bg-on-surface-variant/60'
        ]"
        :aria-label="`Go to project ${idx + 1}`"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  projects: {
    type: Array,
    required: true,
    default: () => []
  },
  stackIcons: {
    type: Object,
    required: true
  }
})

const currentIndex = ref(0)
let autoSlideInterval = null
const AUTO_SLIDE_DURATION = 4000 // 4 seconds
const itemsPerView = ref(3)

// Adjust items per view based on screen size
const updateItemsPerView = () => {
  if (window.innerWidth < 768) {
    itemsPerView.value = 1
  } else if (window.innerWidth < 1024) {
    itemsPerView.value = 2
  } else {
    itemsPerView.value = 3
  }
}

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.projects.length
}

const goToSlide = (index) => {
  currentIndex.value = index
  resetAutoSlide()
}

const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => {
    nextSlide()
  }, AUTO_SLIDE_DURATION)
}

const resetAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
  }
  startAutoSlide()
}

onMounted(() => {
  updateItemsPerView()
  window.addEventListener('resize', updateItemsPerView)
  startAutoSlide()
})

onUnmounted(() => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
  }
  window.removeEventListener('resize', updateItemsPerView)
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>