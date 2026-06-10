<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import profileImage from '../assets/assests/images/profile.png'
import ContactSection from '../components/ContactSection.vue'

const router = useRouter()
const isDarkMode = ref(true)

const experience = [
  {
    role: 'Software Engineer Intern',
    company: 'Thy Web Dev Inc.',
    period: 'Present',
    summary:
      'Designed and developed a server configuration dashboard using the Vultr API, automating DNS subdomain management and integrating Git-based deployment workflows to streamline server monitoring.',
    points: [
      'Architected and developed a web-based system to track internship documentation and compliance, utilizing PHP to improve administrative efficiency for student records.',
      'Designed a responsive school portal for School, enhancing institutional communication and accessibility for students and faculty.',
      'Developed a candidate and party-list information platform, prioritizing user experience and data accessibility to ensure transparent information dissemination for voters.'
    ]
  },
  {
    role: 'Freelance Developer',
    company: 'Freelance',
    period: '2023 – Present',
    summary:
      'Collaborated with clients to translate project requirements into comprehensive system designs, including database schema development and process mapping.',
    points: [
      'Engineered scalable local web-based systems for academic and client-specific requirements, focusing on intuitive interfaces and optimized database performance.',
      'Developed a centralized management system for academic records, automating grading processes and data retrieval to streamline school administrative tasks.',
      'Built an interactive Philippine Population Dashboard utilizing real-time datasets and scalable vector graphics (SVG) to provide accessible and engaging data insights.'
    ]
  }
]

const projects = [
  {
    title: 'School Portal System',
    icon: 'school',
    summary:
      'A comprehensive school management portal for Sherman Hill Integrated School, featuring student management, grading, and information systems.',
    tags: ['#PHP', '#Laravel', '#MySQL', '#Vue.js']
  },
  {
    title: 'VoteInfo Platform',
    icon: 'how_to_vote',
    summary:
      'A candidate and political partylist information platform designed to provide voters with comprehensive electoral information and candidates details.',
    tags: ['#JavaScript', '#HTML5', '#CSS3', '#Laravel']
  },
  {
    title: 'Philippine Population Dashboard',
    icon: 'dashboard',
    summary:
      'An interactive dashboard visualizing Philippine population data with datasets and SVG map, providing demographic insights and analytics.',
    tags: ['#React', '#SVG', '#JavaScript', '#Data Visualization']
  },
  {
    title: 'Git Configuration Manager',
    icon: 'deployed_code',
    summary:
      'A server configuration application for managing DNS subdomains with Git integration and automated deployment processes.',
    tags: ['#Git', '#Node.js', '#DevOps', '#Linux']
  }
]

const showResumeModal = ref(false)
const resumePdfUrl = new URL('../assets/assests/resume/John Mark Luste - Resume.pdf', import.meta.url).href

const openResumeModal = () => {
  showResumeModal.value = true
}

const closeResumeModal = () => {
  showResumeModal.value = false
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
            @click="openResumeModal"
          >
            <span class="material-symbols-outlined text-[14px]">visibility</span>
            <span>VIEW</span>
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
              <p class="font-medium tracking-wide text-primary">Entry Level Web & System Developer</p>
            </div>
            <p class="text-sm leading-relaxed text-on-surface-variant">
              Entry Level Web & System Developer with expertise in system design, school management systems,
              and interactive web applications. Proficient in PHP, Laravel, Vue.js, React, and modern web
              technologies. Passionate about creating scalable and user-centric solutions.
            </p>
          </section>

          <section class="space-y-4">
            <h3 class="text-xs font-label uppercase tracking-[0.2em] text-outline">Contact Details</h3>
            <ul class="space-y-3">
              <li class="flex items-center gap-4 text-sm text-on-surface-variant">
                <span class="material-symbols-outlined text-lg text-primary">mail</span>
                luste.johnmark19@gmail.com
              </li>
              <li class="flex items-center gap-4 text-sm text-on-surface-variant">
                <span class="material-symbols-outlined text-lg text-primary">public</span>
                Sagay City, Negros Occidental
              </li>
              <li class="flex items-center gap-4 text-sm text-on-surface-variant">
                <span class="material-symbols-outlined text-lg text-primary">call</span>
                +639507791280
              </li>
            </ul>
          </section>

          <section class="space-y-6">
            <h3 class="text-xs font-label uppercase tracking-[0.2em] text-outline">Technical Arsenal</h3>
            <div class="space-y-4">
              <div>
                <p class="text-xs font-bold uppercase tracking-widest text-primary mb-2">Programming</p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="skill in ['PHP', 'JavaScript', 'SQL']"
                    :key="skill"
                    class="rounded-lg border border-outline-variant/20 bg-surface-container-high px-3 py-1 text-xs font-medium text-primary"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
              <div>
                <p class="text-xs font-bold uppercase tracking-widest text-primary mb-2">Web Development</p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="skill in ['HTML5', 'CSS3', 'Bootstrap', 'AJAX']"
                    :key="skill"
                    class="rounded-lg border border-outline-variant/20 bg-surface-container-high px-3 py-1 text-xs font-medium text-primary"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
              <div>
                <p class="text-xs font-bold uppercase tracking-widest text-primary mb-2">Frameworks & Libraries</p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="skill in ['Laravel', 'React', 'Vue.js', 'Tailwind', 'Bootstrap']"
                    :key="skill"
                    class="rounded-lg border border-outline-variant/20 bg-surface-container-high px-3 py-1 text-xs font-medium text-primary"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
              <div>
                <p class="text-xs font-bold uppercase tracking-widest text-primary mb-2">Database Management</p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="skill in ['MySQL / MariaDB', 'Firebase']"
                    :key="skill"
                    class="rounded-lg border border-outline-variant/20 bg-surface-container-high px-3 py-1 text-xs font-medium text-primary"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
              <div>
                <p class="text-xs font-bold uppercase tracking-widest text-primary mb-2">Tools</p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="skill in ['Git/GitHub', 'Composer', 'XAMPP', 'VS Code']"
                    :key="skill"
                    class="rounded-lg border border-outline-variant/20 bg-surface-container-high px-3 py-1 text-xs font-medium text-primary"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section class="space-y-4 rounded-xl border border-outline-variant/10 bg-surface-container-low p-6">
            <h3 class="text-xs font-label uppercase tracking-[0.2em] text-outline">Education</h3>
            <div class="space-y-4">
              <div>
                <p class="text-sm font-bold text-on-surface">Bachelor of Science in Information Technology</p>
                <p class="text-xs text-on-surface-variant">State University of Northern Negros (SUNN) - Old Sagay Campus - Brgy. Old Sagay, Sagay City, Negros Occidental - 2026</p>
              </div>
              <div>
                <p class="text-sm font-bold text-on-surface">With Honors - High School Diploma</p>
                <p class="text-xs text-on-surface-variant">Bato National High School - Brgy. Bato, Sagay City, Negros Occidental - 2020</p>
              </div>
              <div>
                <p class="text-sm font-bold text-on-surface">With Honors - Elementary School Diploma</p>
                <p class="text-xs text-on-surface-variant">Sherman Hill Integrated School - Prk. Silica, Brgy. Baviera, Sagay City, Negros Occidental - 2017</p>
              </div>
            </div>
          </section>

          <section class="space-y-4 rounded-xl border border-outline-variant/10 bg-surface-container-low p-6">
            <h3 class="text-xs font-label uppercase tracking-[0.2em] text-outline">Additional Information</h3>
            <div class="space-y-4">
              <div>
                <p class="text-sm font-bold text-on-surface">Soft Skills</p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="skill in ['Communication Skills', 'Time Management', 'Creativity', 'Collaboration']"
                    :key="skill"
                    class="rounded-lg border border-outline-variant/20 bg-surface-container-high px-3 py-1 text-xs font-medium text-primary"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
              <div>
                <p class="text-sm font-bold text-on-surface">Language</p>
                <p class="text-xs text-on-surface-variant">English, Filipino</p>
              </div>
              <div>
                <p class="text-sm font-bold text-on-surface">Certification</p>
                <p class="text-xs text-on-surface-variant">University Week Technovation Pitch Exhibit and Competition, Educational Tour, and OJT Completion Certificate – Thy Web Development Inc.</p>
              </div>
              <div>
                <p class="text-sm font-bold text-on-surface">Awards/Activities</p>
                <p class="text-xs text-on-surface-variant">3rd Place Technovation Competition</p>
              </div>
            </div>
          </section>

          <ContactSection />
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

    <div
      v-if="showResumeModal"
      class="no-print fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 py-10"
      role="dialog"
      aria-modal="true"
      aria-label="Resume PDF preview"
      @click.self="closeResumeModal"
    >
      <div class="flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface shadow-2xl">
        <div class="flex items-center justify-between border-b border-outline-variant/20 px-6 py-4">
          <div class="space-y-1">
            <p class="text-xs font-label uppercase tracking-[0.2em] text-outline">Resume Preview</p>
            <h3 class="font-headline text-lg font-bold text-on-surface">John Mark Luste</h3>
          </div>
          <button
            class="header-action-btn border border-outline-variant/30 bg-surface-container-high text-[#e5e2e1]/75"
            type="button"
            @click="closeResumeModal"
          >
            CLOSE
          </button>
        </div>
        <div class="flex-1 bg-surface-container-high">
          <iframe class="h-full w-full" :src="resumePdfUrl" title="Resume PDF"></iframe>
        </div>
      </div>
    </div>

    <footer class="w-full border-t border-outline-variant/10 bg-surface-container-low px-4 py-12 md:px-8">
      <div class="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div class="text-sm font-medium uppercase tracking-wide text-on-surface-variant">&copy; 2024 Digital Architect. Built with precision.</div>
        <div class="flex gap-8">
          <a class="text-sm font-medium uppercase tracking-wide text-on-surface-variant transition-colors duration-200 hover:text-primary" href="https://portofilio-john-2i1q.vercel.app"
            >portofilio-john-2i1q.vercel.app</a
          >
        </div>
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
  color: #201d18;
}

.theme-light .header-action-btn.bg-gradient-to-br {
  background: linear-gradient(135deg, #5b46b6 0%, #2f6fa3 100%) !important;
  color: #f4f0ff !important;
}

.theme-light :deep(.material-symbols-outlined) {
  color: #6349c0 !important;
}

.theme-light h1 {
  color: #201d18 !important;
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
