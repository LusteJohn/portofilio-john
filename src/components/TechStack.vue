<script setup>
import { onMounted, ref } from 'vue'

const techStackInView = ref(false)
const hoveredCategory = ref(null)
let collapseTimeout = null

const handleCategoryEnter = (categoryIdx) => {
  if (collapseTimeout) {
    clearTimeout(collapseTimeout)
  }
  hoveredCategory.value = categoryIdx
}

const handleSectionLeave = () => {
  collapseTimeout = setTimeout(() => {
    hoveredCategory.value = null
  }, 300)
}

const toolCategories = [
  {
    title: 'Design + Testing',
    tools: [
      {
        name: 'Figma',
        mark: 'F',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
        score: 70,
        focus: 'UI Systems',
        accent: '#f97316',
        accentSoft: 'rgba(249, 115, 22, 0.22)'
      },
      {
        name: 'Sketch',
        mark: 'S',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sketch/sketch-line.svg',
        score: 90,
        focus: 'Wireframing',
        accent: '#f59e0b',
        accentSoft: 'rgba(245, 158, 11, 0.22)'
      },

      {
        name: 'Postman',
        mark: 'P',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg',
        score: 85,
        focus: 'API Testing',
        accent: '#f59e0b',
        accentSoft: 'rgba(245, 158, 11, 0.22)'
      },
    ]
  },
  {
    title: 'Frontend Stack',
    tools: [
      {
        name: 'Vue.js',
        mark: 'V',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg',
        score: 80,
        focus: 'Component Architecture',
        accent: '#10b981',
        accentSoft: 'rgba(16, 185, 129, 0.22)'
      },
      {
        name: 'Tailwind',
        mark: 'Tw',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
        score: 80,
        focus: 'Design Systems',
        accent: '#06b6d4',
        accentSoft: 'rgba(6, 182, 212, 0.22)'
      },
      {
        name: 'React',
        mark: 'R',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
        score: 80,
        focus: 'Type Safety',
        accent: '#2563eb',
        accentSoft: 'rgba(37, 99, 235, 0.22)'
      },
      {
        name: 'Storybook',
        mark: 'Sb',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/storybook/storybook-original.svg',
        score: 90,
        focus: 'Component Docs',
        accent: '#ec4899',
        accentSoft: 'rgba(236, 72, 153, 0.2)'
      }
    ]
  },
  {
    title: 'Backend + Workflow',
    tools: [
      {
        name: 'Laravel',
        mark: 'Lr',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg',
        score: 90,
        focus: 'API + Services',
        accent: '#ef4444',
        accentSoft: 'rgba(239, 68, 68, 0.22)'
      },
      {
        name: 'PostgreSQL',
        mark: 'Pg',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
        score: 87,
        focus: 'Data Modeling',
        accent: '#1d4ed8',
        accentSoft: 'rgba(29, 78, 216, 0.22)'
      },
      {
        name: 'Docker',
        mark: 'Dk',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
        score: 80,
        focus: 'Container Workflow',
        accent: '#0ea5e9',
        accentSoft: 'rgba(14, 165, 233, 0.22)'
      },
      {
        name: 'SQL',
        mark: 'Sq',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg',
        score: 90,
        focus: 'Query Optimization',
        accent: '#2563eb',
        accentSoft: 'rgba(37, 99, 235, 0.22)'
      },
      {
        name: 'PHP',
        mark: 'Ph',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
        score: 90,
        focus: 'Server-Side Development',
        accent: '#777bb4',
        accentSoft: 'rgba(119, 123, 180, 0.22)'
      }
    ]
  }
]

onMounted(() => {
  const techStackSection = document.getElementById('stack')
  if (techStackSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            techStackInView.value = true
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )
    observer.observe(techStackSection)
  }
})
</script>

<template>
  <div id="stack" class="tool-shell rounded-3xl border border-outline-variant/10 bg-surface-container-low/50 p-6 lg:col-span-12 lg:p-10">
    <div class="mx-auto max-w-5xl text-center">
      <p class="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-on-surface-variant">My Favorite Tools</p>
      <h3 class="font-headline text-3xl font-black leading-tight text-on-surface">
        <span class="text-primary">Exploring the Tools</span>
        <br />
        Behind My Designs
      </h3>
    </div>

    <div class="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
      <section 
        v-for="(category, categoryIdx) in toolCategories" 
        :key="category.title" 
        class="tool-section"
        @mouseenter="handleCategoryEnter(categoryIdx)"
        @mouseleave="handleSectionLeave"
      >
        <div 
          class="mb-4 flex items-center gap-3 cursor-pointer transition-all duration-300"
        >
          <span 
            :class="['h-2.5 w-2.5 rounded-full bg-primary transition-all duration-300', {
              'scale-150': hoveredCategory === categoryIdx
            }]"
          ></span>
          <h4 
            :class="['text-sm font-bold uppercase tracking-[0.16em] text-on-surface transition-all duration-300', {
              'text-primary': hoveredCategory === categoryIdx
            }]"
          >
            {{ category.title }}
          </h4>
        </div>

        <div 
          v-if="hoveredCategory === categoryIdx"
          class="tools-grid grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-2 animate-fadeIn"
        >
          <article
            v-for="(tool, itemIdx) in category.tools"
            :key="tool.name"
            :class="{ 'tech-item-animate': techStackInView }"
            :style="{
              '--tool-accent': tool.accent,
              '--tool-accent-soft': tool.accentSoft,
              animationDelay: `${itemIdx * 0.06}s`
            }"
            class="tool-card rounded-3xl border border-outline-variant/10 bg-surface-container-high p-4 text-center"
          >
            <div class="tool-orb mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full">
              <img
                v-if="tool.icon"
                :src="tool.icon"
                :alt="`${tool.name} icon`"
                class="tool-icon"
                loading="lazy"
              />
              <span v-else class="tool-mark text-sm font-black">{{ tool.mark }}</span>
            </div>
            <p class="tool-score font-headline text-lg font-black text-on-surface">{{ tool.score }}%</p>
            <p class="mt-2 text-xs font-bold uppercase tracking-[0.09em] text-on-surface">{{ tool.name }}</p>
            <p class="mt-1 text-[11px] text-on-surface-variant">{{ tool.focus }}</p>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
@keyframes zoom-in {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}

.tech-item-animate {
  animation: zoom-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.tech-item-animate:nth-child(1) {
  animation-delay: 0.1s;
}

.tech-item-animate:nth-child(2) {
  animation-delay: 0.2s;
}

.tech-item-animate:nth-child(3) {
  animation-delay: 0.3s;
}

.tech-item-animate:nth-child(4) {
  animation-delay: 0.4s;
}

.tool-shell {
  position: relative;
  overflow: hidden;
}

.tool-shell::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(circle at 10% 20%, rgba(203, 190, 255, 0.12), transparent 34%),
    radial-gradient(circle at 90% 15%, rgba(59, 130, 246, 0.08), transparent 30%);
}

.tools-grid {
  position: relative;
  z-index: 1;
}

.tool-card {
  transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
  box-shadow: 0 8px 24px -22px rgba(0, 0, 0, 0.65);
}

.tool-section {
  position: relative;
  z-index: 1;
}

.tool-card:hover {
  transform: translateY(-5px);
  border-color: color-mix(in srgb, var(--tool-accent) 48%, transparent);
  box-shadow: 0 20px 42px -28px var(--tool-accent-soft);
}

.tool-orb {
  background: color-mix(in srgb, var(--tool-accent) 22%, transparent);
  border: 1px solid color-mix(in srgb, var(--tool-accent) 40%, transparent);
  color: var(--tool-accent);
}

.tool-mark {
  letter-spacing: 0.02em;
}

.tool-icon {
  height: 1.55rem;
  width: 1.55rem;
  object-fit: contain;
}

.tool-score {
  line-height: 1;
}

:global(.theme-light) .tool-shell {
  background: rgba(255, 255, 255, 0.74);
}

:global(.theme-light) .tool-card {
  background: rgba(249, 247, 243, 0.95);
  border-color: rgba(91, 85, 76, 0.14);
}

@media (max-width: 640px) {
  .tool-card {
    border-radius: 1.05rem;
  }
}
</style>
