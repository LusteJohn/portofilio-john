<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import profileImage from '../assets/assests/images/profile.png'

const router = useRouter()
const isDarkMode = ref(true)

const skills = ['Rust', 'TypeScript', 'Kubernetes', 'Go', 'Next.js', 'PostgreSQL', 'GraphQL', 'Tailwind CSS']

const experience = [
  {
    role: 'Principal Software Architect',
    company: 'Nebula Systems Inc.',
    period: '2021 - Present',
    summary:
      'Spearheaded the transition to a decentralized microservices architecture serving 2M+ active users and developed a high-performance Rust-based API gateway that reduced latency by 45%.',
    points: [
      'Architected a real-time data ingestion pipeline processing 10TB daily using Kafka and Go.',
      'Mentored a team of 12 senior developers on cloud-native best practices and domain-driven design.'
    ]
  },
  {
    role: 'Lead Full Stack Developer',
    company: 'Prism Creative Labs',
    period: '2018 - 2021',
    summary:
      'Built and scaled a SaaS platform for creative agencies and standardized a robust GraphQL API interface across products.',
    points: [
      'Reduced AWS infrastructure costs by 30% through strategic container orchestration.',
      'Integrated enterprise billing and authentication systems including Stripe and Auth0.'
    ]
  }
]

const projects = [
  {
    title: 'Aether Engine',
    icon: 'deployed_code',
    summary:
      'A high-concurrency event processing engine built in Rust, capable of handling millions of signals with microsecond latency.',
    tags: ['#Rust', '#Tokio', '#Wasm']
  },
  {
    title: 'Void Framework',
    icon: 'schema',
    summary:
      'A lightweight TypeScript framework for building type-safe edge functions optimized for Vercel and Cloudflare Workers.',
    tags: ['#TypeScript', '#Zod', '#Node']
  }
]

const printResume = () => {
  window.print()
}

const goHome = () => {
  router.push('/')
}

const applyTheme = (mode) => {
  isDarkMode.value = mode === 'dark'
  localStorage.setItem('theme-mode', mode)

  const htmlElement = document.documentElement
  if (isDarkMode.value) {
    htmlElement.classList.remove('theme-light')
    htmlElement.classList.add('dark')
  } else {
    htmlElement.classList.remove('dark')
    htmlElement.classList.add('theme-light')
  }
}

const toggleTheme = () => {
  applyTheme(isDarkMode.value ? 'light' : 'dark')
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme-mode')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : prefersDark ? 'dark' : 'light')
})
</script>

<template>
  <div
    :class="{ 'theme-light': !isDarkMode }"
    class="resume-page bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container"
  >
    <header class="no-print fixed top-0 z-50 w-full bg-[#131313]/80 backdrop-blur-xl shadow-[0_40px_60px_-10px_rgba(108,99,255,0.05)]">
      <div class="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-3 md:flex-row md:items-center md:justify-between md:px-8">
        <button class="flex items-center gap-3" type="button" @click="goHome">
          <span class="material-symbols-outlined text-[#cbbeff]">terminal</span>
          <h1 class="font-headline text-xl font-extrabold tracking-tighter text-[#e5e2e1]">SoftArchitect.dev</h1>
        </button>

        <div class="grid w-full grid-cols-4 gap-2 md:w-auto md:min-w-[31rem]">
          <button
            class="header-action-btn border border-outline-variant/30 bg-surface-container-high text-[#e5e2e1]/75"
            type="button"
            @click="goHome"
          >
            PORTFOLIO
          </button>
          <button class="header-action-btn border border-primary/40 bg-surface-container-high text-[#cbbeff]" type="button">
            RESUME
          </button>
          <button
            class="header-action-btn gap-1.5 bg-gradient-to-br from-primary to-primary-container text-on-primary"
            type="button"
            @click="printResume"
          >
            <span class="material-symbols-outlined text-[14px]">download</span>
            <span>DOWNLOAD</span>
          </button>
          <button
            :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
            :title="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
            class="header-action-btn border border-outline-variant/30 bg-surface-container-high text-[#e5e2e1]/75"
            type="button"
            @click="toggleTheme"
          >
            <span class="material-symbols-outlined text-[14px]">{{ isDarkMode ? 'dark_mode' : 'light_mode' }}</span>
            <span>{{ isDarkMode ? 'DARK' : 'LIGHT' }}</span>
          </button>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-7xl px-6 pb-24 pt-44 md:px-8 md:pt-32">
      <div class="flex flex-col gap-12 lg:flex-row lg:gap-20">
        <aside class="space-y-12 lg:w-1/3">
          <section class="space-y-6">
            <div class="relative h-48 w-48 overflow-hidden rounded-full border-2 border-outline-variant/20">
              <img
                alt="Professional portrait"
                class="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                :src="profileImage"
              />
            </div>
            <div class="space-y-2">
              <h2 class="font-headline text-4xl font-extrabold tracking-tight text-on-surface">John Mark Luste</h2>
              <p class="font-medium tracking-wide text-primary">Software Developer and Architect</p>
            </div>
            <p class="text-sm leading-relaxed text-on-surface-variant">
              Specializing in distributed systems and cloud-native architectures. Bridging the gap between aesthetic
              precision and technical excellence through etheric syntax.
            </p>
          </section>

          <section class="space-y-4">
            <h3 class="text-xs font-label uppercase tracking-[0.2em] text-outline">Contact Details</h3>
            <ul class="space-y-3">
              <li class="flex items-center gap-4 text-sm text-on-surface-variant">
                <span class="material-symbols-outlined text-lg text-primary">mail</span>
                architect@void.dev
              </li>
              <li class="flex items-center gap-4 text-sm text-on-surface-variant">
                <span class="material-symbols-outlined text-lg text-primary">public</span>
                san francisco, ca
              </li>
              <li class="flex items-center gap-4 text-sm text-on-surface-variant">
                <span class="material-symbols-outlined text-lg text-primary">link</span>
                github.com/void-architect
              </li>
            </ul>
          </section>

          <section class="space-y-6">
            <h3 class="text-xs font-label uppercase tracking-[0.2em] text-outline">Technical Arsenal</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in skills"
                :key="skill"
                class="rounded-lg border border-outline-variant/20 bg-surface-container-high px-3 py-1 text-xs font-medium text-primary"
              >
                {{ skill }}
              </span>
            </div>
          </section>

          <section class="space-y-4 rounded-xl border border-outline-variant/10 bg-surface-container-low p-6">
            <h3 class="text-xs font-label uppercase tracking-[0.2em] text-outline">Education</h3>
            <div class="space-y-4">
              <div>
                <p class="text-sm font-bold text-on-surface">M.S. Computer Science</p>
                <p class="text-xs text-on-surface-variant">Stanford University - 2018</p>
              </div>
              <div>
                <p class="text-sm font-bold text-on-surface">B.S. Software Engineering</p>
                <p class="text-xs text-on-surface-variant">MIT - 2016</p>
              </div>
            </div>
          </section>
        </aside>

        <div class="space-y-16 lg:w-2/3">
          <section class="space-y-8">
            <div class="flex items-center gap-4">
              <h2 class="font-headline text-2xl font-bold text-on-surface">Professional Trajectory</h2>
              <div class="h-px flex-grow bg-outline-variant/20"></div>
            </div>

            <article v-for="item in experience" :key="item.role" class="group relative pl-8">
              <div class="absolute bottom-0 left-0 top-0 w-[2px] bg-outline-variant/20 transition-colors group-hover:bg-primary/40"></div>
              <div class="absolute left-[-4px] top-2 h-2 w-2 rounded-sm bg-primary shadow-[0_0_10px_rgba(203,190,255,0.5)]"></div>
              <div class="space-y-4">
                <div class="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h4 class="text-xl font-bold text-on-surface">{{ item.role }}</h4>
                    <p class="font-medium text-primary">{{ item.company }}</p>
                  </div>
                  <span class="rounded-full bg-surface-container px-3 py-1 text-xs font-label uppercase tracking-widest text-outline">
                    {{ item.period }}
                  </span>
                </div>
                <p class="leading-relaxed text-on-surface-variant">{{ item.summary }}</p>
                <ul class="space-y-2">
                  <li v-for="point in item.points" :key="point" class="flex items-start gap-3 text-sm text-on-surface-variant">
                    <span class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-sm bg-secondary"></span>
                    {{ point }}
                  </li>
                </ul>
              </div>
            </article>
          </section>

          <section class="space-y-8">
            <div class="flex items-center gap-4">
              <h2 class="font-headline text-2xl font-bold text-on-surface">Artifacts & Open Source</h2>
              <div class="h-px flex-grow bg-outline-variant/20"></div>
            </div>

            <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <article
                v-for="item in projects"
                :key="item.title"
                class="group rounded-xl border border-outline-variant/10 bg-surface-container-high p-8 transition-all duration-300 hover:bg-surface-container-highest"
              >
                <div class="mb-6 flex items-start justify-between">
                  <span class="material-symbols-outlined text-3xl text-primary">{{ item.icon }}</span>
                  <span class="material-symbols-outlined cursor-pointer text-outline transition-colors group-hover:text-primary">open_in_new</span>
                </div>
                <h5 class="mb-2 text-lg font-bold text-on-surface">{{ item.title }}</h5>
                <p class="mb-6 text-sm leading-relaxed text-on-surface-variant">{{ item.summary }}</p>
                <div class="flex gap-4">
                  <span v-for="tag in item.tags" :key="tag" class="text-[10px] font-label uppercase tracking-widest text-primary/70">{{ tag }}</span>
                </div>
              </article>
            </div>
          </section>

          <section class="philosophy-panel relative overflow-hidden rounded-2xl border border-outline-variant/10 bg-gradient-to-br from-surface-container-low to-surface-container-high p-10">
            <div class="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
            <div class="relative z-10 space-y-6">
              <h3 class="font-headline text-xl font-bold text-on-surface">Engineering Philosophy</h3>
              <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div class="space-y-2">
                  <p class="text-sm font-bold uppercase tracking-tighter text-primary">Radical Simplicity</p>
                  <p class="text-xs leading-relaxed text-on-surface-variant">
                    Code is a liability. I strive for the most minimal solution that solves complexity without adding debt.
                  </p>
                </div>
                <div class="space-y-2">
                  <p class="text-sm font-bold uppercase tracking-tighter text-primary">Observability First</p>
                  <p class="text-xs leading-relaxed text-on-surface-variant">
                    If it is not measured, it does not exist. Architectures are built with deep introspection at every layer.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>

    <footer class="resume-footer no-print w-full border-t border-[#464555]/20 bg-[#1c1b1b] py-16">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 md:flex-row md:px-8">
        <div class="resume-footer-brand font-headline font-bold tracking-tighter text-[#e5e2e1]">ARCHITECT.</div>
        <div class="flex gap-8">
          <a class="resume-footer-link text-[0.75rem] font-label uppercase tracking-widest text-[#e5e2e1]/40 transition-colors hover:text-[#cbbeff]" href="#">SOURCE</a>
          <a class="resume-footer-link text-[0.75rem] font-label uppercase tracking-widest text-[#e5e2e1]/40 transition-colors hover:text-[#cbbeff]" href="#">LINKEDIN</a>
          <a class="resume-footer-link text-[0.75rem] font-label uppercase tracking-widest text-[#e5e2e1]/40 transition-colors hover:text-[#cbbeff]" href="#">SITEMAP</a>
        </div>
        <div class="resume-footer-meta text-[0.75rem] font-label uppercase tracking-widest text-[#e5e2e1]/40">© 2024 THE DIGITAL ARCHITECT. CODED IN THE VOID.</div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@media print {
  .no-print {
    display: none !important;
  }

  .resume-page {
    background: white !important;
    color: black !important;
  }
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.header-action-btn {
  display: inline-flex;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-family: Inter, sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  transition: transform 220ms ease, opacity 220ms ease;
}

.header-action-btn:hover {
  transform: translateY(-1px);
}

.theme-light.resume-page {
  background: #f7f3ec;
  color: #201d18;
}

.theme-light :deep(.bg-surface) {
  background-color: #f7f3ec !important;
}

.theme-light :deep(.bg-surface-container-low),
.theme-light :deep(.bg-surface-container-high) {
  background-color: #eee6da !important;
}

.theme-light :deep(.text-on-surface) {
  color: #201d18 !important;
}

.theme-light :deep(.text-on-surface-variant) {
  color: #5b554c !important;
}

.theme-light :deep(.text-primary) {
  color: #6349c0 !important;
}

.theme-light :deep(.text-primary\/70) {
  color: #5b46b6 !important;
}

.theme-light :deep(.text-outline) {
  color: #6e675c !important;
}

.theme-light .header-action-btn {
  color: #4a2c8a;
}

.theme-light .header-action-btn.bg-gradient-to-br {
  background: linear-gradient(135deg, #5b46b6 0%, #2f6fa3 100%) !important;
  color: #f4f0ff !important;
}

.theme-light .no-print {
  background: rgba(247, 243, 236, 0.9) !important;
}

.theme-light .philosophy-panel {
  background: linear-gradient(135deg, #eee6da 0%, #e6ddd0 100%) !important;
  border-color: rgba(120, 104, 84, 0.2);
}

.theme-light .resume-footer {
  background: #ebe4d8 !important;
  border-top-color: rgba(120, 104, 84, 0.2) !important;
}

.theme-light .resume-footer-brand {
  color: #51493f !important;
}

.theme-light .resume-footer-link,
.theme-light .resume-footer-meta {
  color: rgba(81, 73, 63, 0.75) !important;
}

.theme-light .resume-footer-link:hover {
  color: #6349c0 !important;
}
</style>
