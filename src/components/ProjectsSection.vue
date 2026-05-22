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
                <button
                  class="w-full rounded-lg bg-primary/90 py-2.5 font-headline text-sm font-bold text-on-primary transition-all hover:bg-primary active:scale-95 flex items-center justify-center gap-2"
                  type="button"
                  @click="openModal(project)"
                >
                  Check Project Image Preview
                </button>
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

    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-shell" role="dialog" aria-modal="true">
        <div class="modal-header">
          <div>
            <p class="text-xs uppercase tracking-[0.22em] text-primary">Project Preview</p>
            <h3 class="font-headline text-2xl font-bold text-on-surface">
              {{ selectedProject?.title }}
            </h3>
          </div>
          <button class="modal-close" type="button" @click="closeModal" aria-label="Close project preview">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <div class="modal-grid">
          <div class="modal-media">
            <div class="modal-image-frame">
              <img v-if="selectedImage" :src="selectedImage" :alt="selectedProject?.title" />
            </div>
            <div class="modal-thumbs" v-if="activeImages.length">
              <button
                v-for="(img, idx) in activeImages"
                :key="img + idx"
                class="modal-thumb"
                :class="{ 'is-active': img === selectedImage }"
                type="button"
                @click="selectImage(img)"
              >
                <img :src="img" :alt="`${selectedProject?.title} preview ${idx + 1}`" />
              </button>
            </div>
          </div>

          <div class="modal-content">
            <div>
              <p class="text-xs uppercase tracking-[0.22em] text-on-surface-variant">Description</p>
              <p class="mt-3 text-base leading-relaxed text-on-surface-variant">
                {{ selectedProject?.description }}
              </p>
            </div>

            <div class="mt-6">
              <p class="text-xs uppercase tracking-[0.22em] text-on-surface-variant">Tools Used</p>
              <div class="mt-4 flex flex-wrap gap-2">
                <span
                  v-for="tool in selectedProject?.stack || []"
                  :key="tool"
                  class="tool-pill"
                >
                  <img v-if="getStackIcon(tool)" :src="getStackIcon(tool)" :alt="tool" />
                  {{ tool }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
const isModalOpen = ref(false)
const selectedProject = ref(null)
const selectedImage = ref('')

const activeImages = computed(() => {
  if (!selectedProject.value) {
    return []
  }

  const previews = selectedProject.value.previewImages || []
  if (previews.length) {
    return previews
  }

  return selectedProject.value.image ? [selectedProject.value.image] : []
})

const getStackIcon = (stackItem) => props.stackIcons?.[stackItem] || ''

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

const openModal = (project) => {
  selectedProject.value = project
  selectedImage.value = (project.previewImages && project.previewImages[0]) || project.image || ''
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = ''
}

const selectImage = (img) => {
  selectedImage.value = img
}

const handleKeydown = (event) => {
  if (event.key === 'Escape' && isModalOpen.value) {
    closeModal()
  }
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
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
  }
  window.removeEventListener('resize', updateItemsPerView)
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(12, 10, 20, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  z-index: 60;
  backdrop-filter: blur(8px);
}

.modal-shell {
  width: min(980px, 100%);
  max-height: 90vh;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid rgba(203, 190, 255, 0.2);
  background: rgba(22, 20, 30, 0.96);
  box-shadow: 0 40px 80px -40px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.5rem 1.8rem 0;
}

.modal-close {
  border: 0;
  background: rgba(203, 190, 255, 0.12);
  color: #cbbeff;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 200ms ease, background 200ms ease;
}

.modal-close:hover {
  transform: scale(1.05);
  background: rgba(203, 190, 255, 0.22);
}

.modal-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: 1.5rem;
  padding: 1.5rem 1.8rem 2rem;
  overflow: auto;
}

.modal-media {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-image-frame {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(203, 190, 255, 0.18);
  background: rgba(14, 12, 20, 0.85);
}

.modal-image-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-thumbs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(72px, 1fr));
  gap: 0.75rem;
}

.modal-thumb {
  border: 1px solid rgba(203, 190, 255, 0.2);
  border-radius: 14px;
  overflow: hidden;
  padding: 0;
  background: transparent;
  transition: transform 200ms ease, border-color 200ms ease;
}

.modal-thumb img {
  width: 100%;
  height: 72px;
  object-fit: cover;
  display: block;
}

.modal-thumb.is-active {
  border-color: rgba(203, 190, 255, 0.6);
  transform: translateY(-2px);
}

.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
}

.tool-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.4rem 0.7rem;
  border-radius: 9999px;
  border: 1px solid rgba(203, 190, 255, 0.2);
  background: rgba(203, 190, 255, 0.08);
  font-size: 0.8rem;
  font-weight: 600;
  color: #cbbeff;
}

.tool-pill img {
  width: 0.9rem;
  height: 0.9rem;
  object-fit: contain;
}

@media (max-width: 900px) {
  .modal-grid {
    grid-template-columns: 1fr;
  }
}
</style>