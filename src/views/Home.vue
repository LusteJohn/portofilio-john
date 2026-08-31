<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import WorkSection from '../components/WorkSection.vue'
import TechStack from '../components/TechStack.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import ContactSection from '../components/ContactSection.vue'
import profileImage from '../assets/assests/images/profile.png'

const heroRoles = [
  {
    title: 'Entry Level Full Stack Developer',
    description: 'Crafting high-performance digital ecosystems with architectural precision and editorial elegance.'
  },
  {
    title: 'Systems Strategist',
    description: 'Designing scalable platforms that align technical decisions with long-term business outcomes.'
  },
  {
    title: 'Laravel + Vue Specialist',
    description: 'Building maintainable product foundations with clean architecture, robust APIs, and refined UX.'
  }
]

const techFocusCategories = [
  {
    title: 'API Architecture',
    icon: 'api',
    items: [
      { name: 'RESTful Design', description: 'Building robust REST layers that bridge diverse data sources with ironclad security protocols.' },
    ]
  },
  {
    title: 'Database Design',
    icon: 'database',
    items: [
      { name: 'Complex Queries', description: 'Engineering sophisticated management interfaces that handle complex data relations without compromising on performance.' },
      { name: 'Data Optimization', description: 'Advanced indexing and query optimization for high-performance database operations.' }
    ]
  },
  {
    title: 'System Architecture',
    icon: 'architecture',
    items: [
      { name: 'Scalability', description: 'Designing systems that grow with your business needs and handle increasing loads efficiently.' },
      { name: 'Clean Code', description: 'Implementing best practices and design patterns for maintainable, production-ready solutions.' }
    ]
  }
]

const heroStats = [
  { label: 'Years Building', value: '2+' },
  { label: 'Systems, Web Applications, and Websites', value: '10+' },
  { label: 'Avg. Performance Gain', value: '30%' }
]

const buildPreviewImages = (folder, files) =>
  files.map((file) => new URL(`../assets/assests/project-image/${folder}/${file}`, import.meta.url).href)

const projectPreviewImages = {
  agriLearnSchool: buildPreviewImages('AgriSchoolLearn', [
    'p5-1.png',
    'p5-2.png',
    'p5-3.png',
    'p5-4.png',
    'p5-5.png',
    'p5-6.png',
    'p5-7.png',
    'p5-8.png',
    'p5-9.png'
  ]),
  disasterRiskPlatform: buildPreviewImages('DRDTS', ['p2-1.png', 'p2-2.png', 'p2-3.png', 'p2-4.png']),
  internTrack: buildPreviewImages('InternTrack', ['p6-1.png', 'p6-2.png', 'p6-3.png', 'p6-4.png', 'p6-5.png']),
  schoolPortal: buildPreviewImages('school-portal', [
    'p4-1.png',
    'p4-2.png',
    'p4-3.png',
    'p4-4.png',
    'p4-5.png',
    'p4-6.png'
  ]),
  sgms: buildPreviewImages('SGMS', [
    'p1-1.png',
    'p1-2.png',
    'p1-3.png'
  ]),
  svpmfs: buildPreviewImages('SVPMFS', [
    'p3-1.png',
    'p3-2.png',
    'p3-3.png',
    'p3-4.png',
    'p3-5.png',
    'p3-6.png'
  ]),
  simplesarisari: buildPreviewImages('simplesarisari', [
    'p8-1.png',
    'p8-2.png',
    'p8-3.png',
    'p8-4.png'
  ]),
  simplebloglaravel: buildPreviewImages('simplebloglaravel', [
    'p7-1.png',
    'p7-2.png',
    'p7-3.png',
    'p7-4.png'
  ]),
  organicagricultureapp: buildPreviewImages('organicagricultureapp', [
    'pic1.jpg',
    'pic2.jpg',
    'pic3.jpg',
    'pic4.jpg',
    'pic5.jpg',
  ])
}

const projectHighlights = [
  {
    title: 'AgriLearnSchool',
    type: 'Student Learning Platform',
    description:
      'AgriLearnSchool is an educational platform designed for students to learn the fundamentals and advanced concepts of agriculture. It provides interactive lessons, practical guides, and learning resources that cover crop production, soil management, livestock care, and modern farming techniques. The platform aims to help students develop agricultural knowledge and skills that are useful for sustainable farming and agri-related careers.',
    stack: ['React', 'PostgreSQL', 'SQLite', 'Javascript'],
    icon: 'qr_code_2',
      image: new URL('../assets/assests/project-image/AgriSchoolLearn/p5-1.png', import.meta.url).href,
    previewImages: projectPreviewImages.agriLearnSchool,
    author: 'John Mark',
    role: 'Entry Level Web & System Developer',
    link: 'https://github.com',
    github: 'https://github.com/yourusername/agrilearn-school'
  },
  {
    title: 'Disaster Relief Distribution Tracking System',
    type: 'Barangay Management Platform',
    description:
      'A web-based platform designed to monitor, manage, and track the distribution of relief goods and assistance during disasters. The system helps ensure accurate allocation, real-time tracking, and efficient delivery of aid to affected communities while improving transparency and coordination among responders.',
    stack: ['Tailwind', 'Laravel', 'PostgreSQL'],
    icon: 'dashboard_customize',
    image: new URL('../assets/assests/project-image/DRDTS/p2-1.png', import.meta.url).href,
    previewImages: projectPreviewImages.disasterRiskPlatform,
    author: 'John Mark',
    role: 'Entry Level Web & System Developer',
    link: 'https://github.com',
    github: 'https://github.com/yourusername/disaster-relief-tracking'
  },
  {
    title: 'InternTrack',
    type: 'Student Internship Management System',
    description:
      'Advanced analytics dashboard with real-time data streaming, custom report generation, and predictive insights powered by ML.',
    stack: ['PHP', 'JQuery', 'MySQL', 'Tailwind'],
    icon: 'trending_up',
    image: new URL('../assets/assests/project-image/InternTrack/p6-1.png', import.meta.url).href,
    previewImages: projectPreviewImages.internTrack,
    author: 'John Mark',
    role: 'Entry Level Web & System Developer',
    link: 'https://github.com',
    github: 'https://github.com/yourusername/interntrack'
  },
  {
    title: 'School Portal',
    type: 'Educational Institution Website',
    description:
      'This project involves the development of a dynamic School Portal designed to streamline institutional communications and information dissemination. The system empowers administrators to manage website content, publish real-time news and announcements, and maintain an accurate, up-to-date catalog of academic courses.',
    stack: ['Laravel', 'Tailwind', 'PostgreSQL'],
    icon: 'shopping_cart',
    image: new URL('../assets/assests/project-image/school-portal/p4-1.png', import.meta.url).href,
    previewImages: projectPreviewImages.schoolPortal,
    author: 'John Mark',
    role: 'Entry Level Web & System Developer',
    link: 'https://github.com',
    github: 'https://github.com/yourusername/school-portal'
  },
  {
    title: 'SVPMFS',
    type: 'Economic Platform System',
    description:
      'web‑based platform designed to streamline vendor product management and enhance decision‑making through predictive analytics.',
    stack: ['Laravel', 'Tailwind', 'PostgreSQL', 'Python'],
    icon: 'shopping_cart',
    image: new URL('../assets/assests/project-image/SVPMFS/p3-1.png', import.meta.url).href,
    previewImages: projectPreviewImages.svpmfs,
    author: 'John Mark',
    role: 'Entry Level Web & System Developer',
    link: 'https://github.com',
    github: 'https://github.com/yourusername/svpmfs'
  },
  {
    title: 'Simple Sari-Sari Store Mini System',
    type: 'Economic Platform System',
    description:
      'This project is a streamlined Sari-Sari Store Management System engineered to digitalize small-scale retail operations. It simplifies the tracking of product inventory, "pabili" (point-of-sale) transactions, and "utang" (credit) management. Built with a focus on ease-of-use and reliability, this system helps store owners maintain better financial records and inventory control.',
    stack: ['Laravel', 'MySQL', 'Tailwind'],
    icon: 'shopping_cart',
    image: new URL('../assets/assests/project-image/simplesarisari/p8-1.png', import.meta.url).href,
    previewImages: projectPreviewImages.simplesarisari,
    author: 'John Mark',
    role: 'Entry Level Web & System Developer',
    link: 'https://github.com',
    github: 'https://github.com/yourusername/sari-sari-store'
  },
  {
    title: 'Simple Blog Platform',
    type: 'Economic Platform System',
    description:
      'Simple Blog Platform built with Laravel and Tailwind CSS.',
    stack: ['Laravel', 'MySQL', 'Tailwind'],
    icon: 'shopping_cart',
    image: new URL('../assets/assests/project-image/simplebloglaravel/p7-1.png', import.meta.url).href,
    previewImages: projectPreviewImages.simplebloglaravel,
    author: 'John Mark',
    role: 'Entry Level Web & System Developer',
    link: 'https://github.com',
    github: 'https://github.com/yourusername/simple-blog-laravel'
  },
  {
    title: 'Student Grade Management System',
    type: 'Educational Platform System',
    description:
      'A simple student grade management system built with Laravel and Tailwind CSS.',
    stack: ['Laravel', 'MySQL', 'Tailwind'],
    icon: 'shopping_cart',
    image: new URL('../assets/assests/project-image/SGMS/p1-2.png', import.meta.url).href,
    previewImages: projectPreviewImages.sgms,
    author: 'John Mark',
    role: 'Entry Level Web & System Developer',
    link: 'https://github.com',
    github: 'https://github.com/yourusername/simple-blog-laravel'
  },
  {
    title: 'Organic Agriculture App',
    type: 'Educational Platform System',
    description:
      'Developed an offline-first Android learning app for Organic Agriculture Production using React Native, Expo, and TypeScript. Implemented SQLite local storage for offline access to lessons, quizzes, and educational content.',
    stack: ['React Native', 'Expo', 'TypeScript', 'SQLite'],
    icon: 'shopping_cart',
    image: new URL('../assets/assests/project-image/organicagricultureapp/pic1.jpg', import.meta.url).href,
    previewImages: projectPreviewImages.organicagricultureapp,
    author: 'John Mark',
    role: 'Entry Level Web & System Developer',
    link: 'https://github.com',
    github: 'https://github.com/yourusername/simple-blog-laravel'
  }
]

const stackIcons = {
  Laravel: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg',
  'Vue 3': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg',
  WebSockets: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg',
  Tailwind: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  'Inertia.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  PostgreSQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  MongoDB: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
  Stripe: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  Javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  SQLite: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg',
  MySQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
  React: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  PHP: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
  JQuery: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-original.svg',
  Python: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  github: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
  'React Native': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  Expo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',

}

const getStackIcon = (stackItem) => stackIcons[stackItem] || ''

const typedRole = ref('')
const activeRoleIndex = ref(0)
const isDarkMode = ref(true)
const currentSection = ref('home')
const hoveredTechFocus = ref(null)
const router = useRouter()

let isDeleting = false
let charIndex = 0
let typingTimer = null
let sectionObserver = null
let techFocusCollapseTimeout = null
let revealObserver = null

const handleTechFocusEnter = (categoryIdx) => {
  if (techFocusCollapseTimeout) {
    clearTimeout(techFocusCollapseTimeout)
  }
  hoveredTechFocus.value = categoryIdx
}

const handleTechFocusLeave = () => {
  techFocusCollapseTimeout = setTimeout(() => {
    hoveredTechFocus.value = null
  }, 300)
}

const heroDescription = computed(() => heroRoles[activeRoleIndex.value].description)

const TYPE_SPEED = 85
const DELETE_SPEED = 50
const HOLD_SPEED = 1400

const applyTheme = (mode) => {
  isDarkMode.value = mode === 'dark'
  localStorage.setItem('theme-mode', mode)
  
  // Apply theme to document
  const htmlElement = document.documentElement
  if (isDarkMode.value) {
    htmlElement.classList.remove('theme-light')
    htmlElement.classList.add('dark')
  } else {
    htmlElement.classList.remove('dark')
    htmlElement.classList.add('theme-light')
  }
  
  // Apply color scheme
  if (typeof window.applyThemeColors === 'function') {
    window.applyThemeColors(isDarkMode.value)
  }
}

const toggleTheme = () => {
  applyTheme(isDarkMode.value ? 'light' : 'dark')
}

const goToResume = () => {
  router.push('/resume')
}

const scrollToSection = (id) => {
  const target = document.getElementById(id)
  if (target) {
    currentSection.value = id
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const initSectionObserver = () => {
  const sectionIds = ['home', 'bio', 'stack', 'tech-focus', 'projects-list', 'contact']
  const sectionElements = sectionIds
    .map((id) => document.getElementById(id))
    .filter((element) => Boolean(element))

  if (!sectionElements.length) {
    return
  }

  sectionObserver = new IntersectionObserver(
    (entries) => {
      let mostVisibleEntry = null
      let maxRatio = 0

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio
          mostVisibleEntry = entry
        }
      })

      if (mostVisibleEntry) {
        currentSection.value = mostVisibleEntry.target.id
      }
    },
    {
      threshold: [0.1, 0.25, 0.5, 0.75, 1]
    }
  )

  sectionElements.forEach((element) => {
    sectionObserver.observe(element)
  })
}

const runTyping = () => {
  const currentRole = heroRoles[activeRoleIndex.value].title

  if (!isDeleting) {
    charIndex += 1
    typedRole.value = currentRole.slice(0, charIndex)

    if (charIndex === currentRole.length) {
      isDeleting = true
      typingTimer = setTimeout(runTyping, HOLD_SPEED)
      return
    }
  } else {
    charIndex -= 1
    typedRole.value = currentRole.slice(0, charIndex)

    if (charIndex === 0) {
      isDeleting = false
      activeRoleIndex.value = (activeRoleIndex.value + 1) % heroRoles.length
    }
  }

  typingTimer = setTimeout(runTyping, isDeleting ? DELETE_SPEED : TYPE_SPEED)
}

const initRevealObserver = () => {
  const root = document.querySelector('.home-shell')
  if (!root) {
    return
  }

  const revealTargets = root.querySelectorAll(
    'img, h1, h2, h3, h4, h5, h6, p, li, a, button, span'
  )

  if (!revealTargets.length) {
    return
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
          revealObserver?.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px'
    }
  )

  revealTargets.forEach((element) => {
    if (element.classList.contains('material-symbols-outlined')) {
      return
    }

    if (
      element.tagName === 'SPAN' &&
      element.closest('h1, h2, h3, h4, h5, h6, p, li, a, button')
    ) {
      return
    }

    if (element.closest('.home-navbar')) {
      return
    }

    if (element.closest('.modal-overlay')) {
      return
    }

    if (element.dataset.noReveal === 'true') {
      return
    }

    element.classList.add('scroll-reveal')
    revealObserver.observe(element)
  })
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme-mode')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : prefersDark ? 'dark' : 'light')
  initSectionObserver()
  initRevealObserver()
  runTyping()
})

onUnmounted(() => {
  if (typingTimer) {
    clearTimeout(typingTimer)
  }

  if (sectionObserver) {
    sectionObserver.disconnect()
  }

  if (revealObserver) {
    revealObserver.disconnect()
  }
})
</script>

<template>
  <div
    :class="[{ 'theme-light': !isDarkMode }, `section-${currentSection}`]"
    class="home-shell bg-background text-on-background font-body selection:bg-primary/30"
  >
    <nav
      class="home-navbar z-50 w-full transition-all duration-300 ease-in-out"
      :style="{
        backgroundColor: isDarkMode ? 'rgba(19, 19, 19, 0.6)' : 'rgba(255, 251, 254, 0.6)',
        backdropFilter: 'blur(12px)',
        boxShadow: isDarkMode 
          ? '0 40px 60px -10px rgba(203, 190, 255, 0.05)' 
          : '0 40px 60px -10px rgba(99, 73, 192, 0.08)'
      }"
    >
      <div class="mx-auto flex max-w-7xl items-center justify-between px-3 py-2 md:px-8 md:py-4">
        <div class="flex items-center gap-2 font-headline text-lg md:text-xl font-black tracking-tighter text-on-background">
          <span class="material-symbols-outlined text-sm md:text-base text-[#cbbeff]">terminal</span>
          <span class="text-sm md:text-base">SoftArchitect.dev</span>
        </div>
        <div class="hidden gap-10 font-headline font-bold tracking-tight md:flex">
          <a 
            :class="['nav-link', { 'nav-link-active': currentSection === 'home' }]" 
            href="#home" 
            @click.prevent="scrollToSection('home')"
          >
            Home
          </a>
          <a 
            :class="['nav-link', { 'nav-link-active': currentSection === 'bio' }]" 
            href="#bio" 
            @click.prevent="scrollToSection('bio')"
          >
            Bio
          </a>
          <a 
            :class="['nav-link', { 'nav-link-active': currentSection === 'stack' }]" 
            href="#stack" 
            @click.prevent="scrollToSection('stack')"
          >
            Stack
          </a>
          <a 
            :class="['nav-link', { 'nav-link-active': currentSection === 'projects-list' }]" 
            href="#projects-list" 
            @click.prevent="scrollToSection('projects-list')"
          >
            Projects
          </a>
          <a 
            :class="['nav-link', { 'nav-link-active': currentSection === 'contact' }]" 
            href="#contact" 
            @click.prevent="scrollToSection('contact')"
          >
            Contact
          </a>
        </div>
        <div class="flex items-center gap-2 md:gap-3">
          <button
            class="btn-soft rounded-full bg-surface-container-high px-4 md:px-6 py-1.5 md:py-2 font-headline text-xs md:text-sm font-bold text-primary transition-all duration-300 ease-in-out active:opacity-80"
            type="button"
            @click="goToResume"
          >
            Resume
          </button>
          <button
            :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
            :title="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
            :aria-pressed="isDarkMode"
            class="theme-toggle"
            type="button"
            @click="toggleTheme"
          >
            <span class="theme-toggle-track" aria-hidden="true">
              <span :class="['theme-toggle-thumb', { 'is-dark': isDarkMode }]"></span>
              <span class="theme-toggle-icon sun material-symbols-outlined">light_mode</span>
              <span class="theme-toggle-icon moon material-symbols-outlined">dark_mode</span>
            </span>
          </button>
        </div>
      </div>
    </nav>

    <main class="home-main">
      <section id="home" class="hero-section relative flex min-h-[921px] flex-col items-center justify-center overflow-hidden px-4 text-center md:px-8">
        <div class="hero-grain"></div>
        <div class="pointer-events-none absolute inset-0 z-0 opacity-20">
          <div class="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[120px]"></div>
          <div class="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-[120px]"></div>
        </div>
        <div class="relative z-10 max-w-5xl">
          <span class="hero-badge label-md mb-6 block font-label uppercase tracking-[0.2em] text-primary"
            >Available for select projects</span
          >
          <h1
            class="mb-8 font-headline text-5xl font-extrabold leading-[1.1] tracking-tight text-on-background md:text-8xl"
          >
            Software Developer &amp; <br />
            <span class="text-gradient"
              >{{ typedRole }}<span class="typing-cursor" aria-hidden="true"></span
            ></span>
          </h1>
          <p class="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-on-surface-variant">
            {{ heroDescription }}
          </p>
          <div class="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
            <button
              class="btn-gradient pulse-glow rounded-full px-10 py-4 font-headline text-lg font-bold text-on-surface transition-transform hover:scale-105 dark:text-on-primary"
              type="button"
              @click="scrollToSection('work')"
            >
              View Projects
            </button>
            <button
              class="rounded-full border border-outline-variant/30 px-10 py-4 font-headline text-lg font-bold text-primary transition-all duration-300 hover:border-primary/60 hover:bg-primary/10"
              type="button"
              @click="scrollToSection('contact')"
            >
              Contact Me
            </button>
          </div>
          <div class="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div
              v-for="(stat, idx) in heroStats"
              :key="idx"
              class="hero-stat-card rounded-2xl border border-outline-variant/10 bg-surface-container-low/50 px-6 py-4 backdrop-blur"
            >
              <p class="text-3xl font-headline font-black text-primary">{{ stat.value }}</p>
              <p class="text-xs uppercase tracking-[0.14em] text-on-surface-variant">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="bio" class="bg-surface-container-low px-4 py-24 md:px-8">
        <div class="mx-auto grid max-w-7xl grid-cols-1 items-start gap-16 lg:grid-cols-12">
          <div class="lg:col-span-12">
            <div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
              <div class="relative">
                <img
                  alt="Modern high-contrast portrait of a professional male software architect"
                  class="portrait-frame h-[500px] w-full rounded-xl object-cover grayscale transition-all duration-700 hover:grayscale-0"
                  :src="profileImage"
                />
                <div class="absolute -bottom-6 -right-6 -z-10 h-48 w-48 rounded-xl border-2 border-primary/20"></div>
              </div>

              <div>
                <p class="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-primary">JOHN MARK LUSTE</p>
                <h2 class="mb-6 font-headline text-4xl font-bold">The SoftArchDev behind the pixels.</h2>
                <div class="space-y-6 text-lg leading-relaxed text-on-surface-variant">
                  <p>
                    I bridge the gap between complex technical infrastructure and seamless user experiences. With over
                    2 years in the industry, my focus has shifted from writing code to designing scalable systems that
                    endure.
                  </p>
                  <p>
                    Currently based in a digital-first environment, I specialize in Laravel ecosystems and modern
                    React/Vue architectures, ensuring every line of code serves a strategic business purpose.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="stack" class="bg-surface-container-low px-4 py-24 md:px-8">
        <div class="mx-auto max-w-7xl">
          <TechStack />
        </div>
      </section>

      <section id="tech-focus" class="border-y border-outline-variant/10 px-4 py-32 md:px-8">
        <div class="mx-auto max-w-7xl">
          <section class="space-y-8">
            <div>
              <span class="mb-4 block text-sm font-bold uppercase tracking-widest text-primary">Specialized Expertise</span>
              <h2 class="mb-6 font-headline text-5xl font-extrabold">Tech Focus</h2>
              <p class="max-w-4xl text-lg leading-relaxed text-on-surface-variant">
                My core expertise lies in the powerful synergy between
                <span class="font-bold text-primary">Laravel</span> and
                <span class="font-bold text-primary">Vue.js</span>. I architect systems where these technologies
                don't just coexist but thrive, creating enterprise-grade applications with a focus on maintainability
                and precision.
              </p>
            </div>
            <div class="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
              <div 
                v-for="(category, categoryIdx) in techFocusCategories" 
                :key="category.title" 
                class="tech-focus-section"
                @mouseenter="handleTechFocusEnter(categoryIdx)"
                @mouseleave="handleTechFocusLeave"
              >
                <div 
                  class="mb-4 flex items-center gap-3 cursor-pointer transition-all duration-300"
                >
                  <span 
                    :class="['h-2.5 w-2.5 rounded-full bg-primary transition-all duration-300', {
                      'scale-150': hoveredTechFocus === categoryIdx
                    }]"
                  ></span>
                  <h4 
                    :class="['text-sm font-bold uppercase tracking-[0.16em] text-on-surface transition-all duration-300', {
                      'text-primary': hoveredTechFocus === categoryIdx
                    }]"
                  >
                    {{ category.title }}
                  </h4>
                </div>

                <Transition name="fade-collapse">
                  <div 
                    v-if="hoveredTechFocus === categoryIdx"
                    class="tech-focus-items grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-2 animate-fadeIn"
                  >
                    <article
                      v-for="(item, itemIdx) in category.items"
                      :key="item.name"
                      :style="{ animationDelay: `${itemIdx * 0.06}s` }"
                      class="tech-focus-card rounded-2xl border border-outline-variant/10 bg-surface-container-high p-4"
                    >
                      <div class="flex items-start gap-3 mb-3">
                        <span class="material-symbols-outlined text-lg text-primary flex-shrink-0">{{ category.icon }}</span>
                        <div>
                          <p class="text-xs font-bold uppercase tracking-[0.09em] text-on-surface">{{ item.name }}</p>
                          <p class="text-[11px] text-on-surface-variant mt-1">{{ item.description }}</p>
                        </div>
                      </div>
                    </article>
                  </div>
                </Transition>
              </div>
            </div>
          </section>

          <section id="projects-list" class="mt-14">
            <div class="mb-8">
              <span class="mb-4 block text-sm font-bold uppercase tracking-widest text-primary">Featured Projects</span>
              <h3 class="font-headline text-4xl font-bold">Project Carousel</h3>
            </div>
            <ProjectsSection :projects="projectHighlights" :stackIcons="stackIcons" />
          </section>
        </div>
      </section>

      <section id="work" class="h-0 overflow-hidden" aria-hidden="true"></section>

      <WorkSection />

      <section id="contact" class="px-4 py-32 md:px-8">
        <div class="mx-auto max-w-3xl">
          <h2 class="mb-6 font-headline text-5xl font-extrabold">Let's build the future.</h2>
          <p class="mb-12 text-lg text-on-surface-variant">
            Currently accepting new projects and architectural consultations for Q3 2024.
          </p>
          <ContactSection />
        </div>
      </section>
    </main>

    <footer class="w-full border-t border-outline-variant/10 bg-surface-container-low px-4 py-12 md:px-8">
      <div class="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div class="text-sm font-medium uppercase tracking-wide text-on-surface-variant">&copy; 2024 Digital Architect. Built with precision.</div>
        <div class="flex gap-8">
          <a class="text-sm font-medium uppercase tracking-wide text-on-surface-variant transition-colors duration-200 hover:text-primary" href="#"
            >Github</a
          >
          <a class="text-sm font-medium uppercase tracking-wide text-on-surface-variant transition-colors duration-200 hover:text-primary" href="#"
            >LinkedIn</a
          >
          <a class="text-sm font-medium uppercase tracking-wide text-on-surface-variant transition-colors duration-200 hover:text-primary" href="#"
            >Twitter</a
          >
          <a class="text-sm font-medium uppercase tracking-wide text-on-surface-variant transition-colors duration-200 hover:text-primary" href="#"
            >Layers</a
          >
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.home-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 50;
}

.home-main {
  padding-top: 3.5rem;
}

.home-shell {
  position: relative;
  isolation: isolate;
  --ambient-a: rgba(203, 190, 255, 0.08);
  --ambient-b: rgba(95, 170, 242, 0.08);
  --ambient-c: rgba(151, 126, 247, 0.05);
}

.home-shell::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 15% 20%, var(--ambient-a), transparent 30%),
    radial-gradient(circle at 85% 15%, var(--ambient-b), transparent 28%),
    radial-gradient(circle at 50% 80%, var(--ambient-c), transparent 34%);
  pointer-events: none;
  z-index: -1;
}

.hero-section {
  position: relative;
}

.hero-grain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.12;
  background-image: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.08) 45%, transparent 100%);
  animation: sweep 8s linear infinite;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.95rem;
  border: 1px solid rgba(203, 190, 255, 0.25);
  border-radius: 9999px;
  background: rgba(203, 190, 255, 0.09);
}

.hero-stat-card {
  transform: translateY(0);
  transition: transform 280ms ease, border-color 280ms ease;
}

.hero-stat-card:hover {
  transform: translateY(-5px);
  border-color: rgba(203, 190, 255, 0.4);
}

.nav-link {
  position: relative;
  color: inherit;
  opacity: 0.8;
  transition: opacity 220ms ease;
}

.nav-link:hover {
  opacity: 1;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -0.35rem;
  width: 100%;
  height: 2px;
  border-radius: 9999px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 220ms ease;
  background: linear-gradient(90deg, #cbbeff, #8a76f0);
}

.nav-link:hover::after,
.nav-link-active::after {
  transform: scaleX(1);
}

.btn-soft {
  border: 1px solid rgba(203, 190, 255, 0.2);
}

.btn-soft:hover {
  transform: translateY(-2px);
  border-color: rgba(203, 190, 255, 0.45);
}

.portrait-frame {
  box-shadow: 0 26px 48px -26px rgba(0, 0, 0, 0.45);
}

.feature-card {
  transition: border-color 220ms ease, transform 220ms ease, background-color 220ms ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: rgba(203, 190, 255, 0.35);
  background-color: rgba(203, 190, 255, 0.06);
}

.tech-focus-section {
  position: relative;
}

.tech-focus-card {
  transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
  box-shadow: 0 8px 24px -22px rgba(0, 0, 0, 0.65);
  animation: zoom-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.tech-focus-card:hover {
  transform: translateY(-5px);
  border-color: rgba(203, 190, 255, 0.48);
  box-shadow: 0 20px 42px -28px rgba(203, 190, 255, 0.65);
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.fade-collapse-enter-active {
  animation: fadeIn 0.3s ease-in-out;
}

.fade-collapse-leave-active {
  animation: fadeOut 0.3s ease-in-out;
}

.contact-shell {
  box-shadow: 0 20px 45px -35px rgba(203, 190, 255, 0.65);
}

.social-pill {
  transition: transform 220ms ease, border-color 220ms ease;
}

.social-pill:hover {
  transform: translateY(-2px);
  border-color: rgba(203, 190, 255, 0.45);
}

.stack-chip {
  border: 1px solid rgba(91, 85, 76, 0.14);
  transition: transform 220ms ease, border-color 220ms ease, background-color 220ms ease, box-shadow 220ms ease;
}

.stack-chip:hover {
  transform: translateY(-2px);
  border-color: rgba(99, 73, 192, 0.48);
  background-color: rgba(99, 73, 192, 0.12);
  box-shadow: 0 10px 22px -16px rgba(99, 73, 192, 0.8);
}

.stack-chip-icon {
  width: 0.75rem;
  height: 0.75rem;
  object-fit: contain;
  transition: transform 220ms ease;
}

.stack-chip:hover .stack-chip-icon {
  transform: scale(1.12) rotate(4deg);
}

.theme-light .stack-chip:hover {
  border-color: rgba(99, 73, 192, 0.5);
  background-color: rgba(99, 73, 192, 0.1);
}

.theme-toggle {
  border: 0;
  padding: 0;
  background: transparent;
}

.theme-toggle-track {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 4.75rem;
  height: 2.1rem;
  padding: 0 0.45rem;
  border-radius: 9999px;
  border: 1px solid rgba(203, 190, 255, 0.36);
  background: rgba(22, 22, 30, 0.7);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
  transition: border-color 220ms ease, background-color 220ms ease;
}

.theme-toggle:hover .theme-toggle-track {
  border-color: rgba(203, 190, 255, 0.58);
}

.theme-toggle-icon {
  position: relative;
  z-index: 2;
  font-size: 1rem;
  line-height: 1;
  transition: opacity 220ms ease, transform 220ms ease;
}

.theme-toggle-icon.sun {
  color: #f8cf77;
  opacity: 0.45;
}

.theme-toggle-icon.moon {
  color: #aeb4ff;
  opacity: 0.95;
}

.theme-toggle-thumb {
  position: absolute;
  top: 50%;
  left: 0.18rem;
  width: 1.62rem;
  height: 1.62rem;
  border-radius: 9999px;
  background: linear-gradient(145deg, #f8cf77 0%, #f0b562 100%);
  transform: translate(0, -50%);
  box-shadow: 0 10px 18px -12px rgba(248, 207, 119, 0.85);
  transition: transform 240ms ease, background 240ms ease, box-shadow 240ms ease;
}

.theme-toggle-thumb.is-dark {
  transform: translate(2.62rem, -50%);
  background: linear-gradient(145deg, #8c89ff 0%, #6762d9 100%);
  box-shadow: 0 10px 18px -12px rgba(103, 98, 217, 0.85);
}

.theme-toggle-thumb.is-dark ~ .theme-toggle-icon.sun {
  opacity: 0.35;
  transform: scale(0.95);
}

.theme-toggle-thumb.is-dark ~ .theme-toggle-icon.moon {
  opacity: 1;
  transform: scale(1.05);
}

.theme-toggle-thumb:not(.is-dark) ~ .theme-toggle-icon.sun {
  opacity: 1;
  transform: scale(1.05);
}

.theme-toggle-thumb:not(.is-dark) ~ .theme-toggle-icon.moon {
  opacity: 0.4;
  transform: scale(0.95);
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.text-gradient {
  background: linear-gradient(135deg, #cbbeff 0%, #967ef7 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.typing-cursor {
  display: inline-block;
  margin-left: 0.08em;
  font-weight: 700;
  color: #cbbeff;
  -webkit-text-fill-color: #cbbeff;
  animation: cursor-blink 1s steps(1, end) infinite;
}

.typing-cursor::before {
  content: '|';
}

@keyframes cursor-blink {
  0%,
  49% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}

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

.btn-gradient {
  background: linear-gradient(135deg, #cbbeff 0%, #967ef7 100%);
}

.pulse-glow {
  animation: pulse-glow 2.7s ease-in-out infinite;
}

.code-glow {
  text-shadow: 0 0 20px rgba(203, 190, 255, 0.4);
}

.theme-light {
  color-scheme: light;
}

.theme-light.section-home.home-shell {
  --ambient-a: rgba(91, 70, 182, 0.12);
  --ambient-b: rgba(47, 111, 163, 0.1);
  --ambient-c: rgba(151, 126, 247, 0.08);
}

.theme-light.section-bio.home-shell {
  --ambient-a: rgba(214, 161, 104, 0.12);
  --ambient-b: rgba(153, 115, 82, 0.08);
  --ambient-c: rgba(91, 70, 182, 0.05);
}

.theme-light.section-stack.home-shell {
  --ambient-a: rgba(46, 145, 138, 0.12);
  --ambient-b: rgba(43, 122, 203, 0.1);
  --ambient-c: rgba(86, 159, 143, 0.08);
}

.theme-light.section-tech-focus.home-shell {
  --ambient-a: rgba(99, 73, 192, 0.13);
  --ambient-b: rgba(171, 127, 80, 0.08);
  --ambient-c: rgba(47, 111, 163, 0.08);
}

.theme-light.section-projects-list.home-shell {
  --ambient-a: rgba(58, 132, 196, 0.12);
  --ambient-b: rgba(67, 164, 128, 0.09);
  --ambient-c: rgba(91, 70, 182, 0.06);
}

.theme-light.section-contact.home-shell {
  --ambient-a: rgba(198, 121, 143, 0.1);
  --ambient-b: rgba(91, 70, 182, 0.1);
  --ambient-c: rgba(47, 111, 163, 0.08);
}

.theme-light .home-navbar {
  background: rgba(247, 243, 236, 0.85);
  box-shadow: 0 20px 40px -18px rgba(40, 35, 28, 0.18);
  border-bottom: 1px solid rgba(90, 85, 77, 0.12);
}

.theme-light .typing-cursor {
  color: #5b46b6;
  -webkit-text-fill-color: #5b46b6;
}

.theme-light .text-gradient {
  background: linear-gradient(135deg, #5b46b6 0%, #2f6fa3 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.theme-light .btn-gradient {
  background: linear-gradient(135deg, #5b46b6 0%, #2f6fa3 100%);
}

.theme-light .hero-badge {
  border-color: rgba(91, 70, 182, 0.28);
  background: rgba(91, 70, 182, 0.08);
}

.theme-light .hero-stat-card {
  background: rgba(255, 255, 255, 0.72);
}

.theme-light .feature-card:hover {
  border-color: rgba(91, 70, 182, 0.34);
  background-color: rgba(91, 70, 182, 0.08);
}

.theme-light .tech-focus-card {
  background: rgba(249, 247, 243, 0.95);
  border-color: rgba(91, 85, 76, 0.14);
}

.theme-light .tech-focus-card:hover {
  border-color: rgba(91, 70, 182, 0.48);
  box-shadow: 0 20px 42px -28px rgba(91, 70, 182, 0.65);
}

.theme-light .social-pill:hover {
  border-color: rgba(91, 70, 182, 0.5);
}

.theme-light :deep(.bg-background) {
  background-color: #f7f3ec !important;
}

.theme-light :deep(.bg-surface-container-lowest) {
  background-color: #fffdfa !important;
}

.theme-light :deep(.bg-surface-container-low) {
  background-color: #efebe4 !important;
}

.theme-light :deep(.bg-surface-container) {
  background-color: #e7e1d8 !important;
}

.theme-light :deep(.bg-surface-container-high) {
  background-color: #ddd5c9 !important;
}

.theme-light :deep(.text-on-background),
.theme-light :deep(.text-on-surface) {
  color: #201d18 !important;
}

.theme-light :deep(.text-on-surface-variant) {
  color: #5b554c !important;
}

.theme-light :deep(.text-primary),
.theme-light :deep(.hover\:text-primary:hover) {
  color: #6349c0 !important;
}

.theme-light button {
  color: #6349c0 !important;
}

.theme-light button:hover {
  color: #4a2c8a !important;
  transition: all 0.3s ease;
}

/* Resume button specific styling */
.theme-light :deep([type="button"]:has(+ .theme-toggle)),
.theme-light :deep(.rounded-full.bg-surface-container-high:not(.theme-toggle)) {
  color: #6349c0 !important;
}

/* Hover effects for buttons with borders */
.theme-light :deep(.border.border-outline-variant):hover {
  background-color: rgba(99, 73, 192, 0.1) !important;
  border-color: rgba(99, 73, 192, 0.6) !important;
}

.theme-light .theme-toggle {
  color: inherit !important;
}

.theme-light .theme-toggle-track {
  border-color: rgba(99, 73, 192, 0.34);
  background: rgba(255, 249, 241, 0.92);
  box-shadow: inset 0 0 0 1px rgba(99, 73, 192, 0.1);
}

.theme-light .theme-toggle:hover .theme-toggle-track {
  border-color: rgba(99, 73, 192, 0.58);
}

.theme-light .theme-toggle-icon.sun {
  color: #b56f2f;
}

.theme-light .theme-toggle-icon.moon {
  color: #5b46b6;
}

.theme-light :deep(.text-secondary) {
  color: #2f6fa3 !important;
}

.theme-light :deep(.text-secondary-fixed\/50) {
  color: #6a6257 !important;
}

.theme-light :deep(.text-outline) {
  color: #7a7267 !important;
}

.theme-light :deep(.border-outline-variant\/10),
.theme-light :deep(.border-outline-variant\/20),
.theme-light :deep(.border-outline-variant\/30) {
  border-color: rgba(91, 85, 76, 0.2) !important;
}

.theme-light :deep(.hover\:bg-surface-container-high:hover) {
  background-color: #d7cebf !important;
}

@keyframes pulse-glow {
  0%,
  100% {
    box-shadow: 0 10px 30px -18px rgba(203, 190, 255, 0.85);
  }
  50% {
    box-shadow: 0 18px 42px -18px rgba(151, 126, 247, 0.95);
  }
}

@keyframes sweep {
  0% {
    transform: translateX(-25%);
  }
  100% {
    transform: translateX(25%);
  }
}

@media (max-width: 768px) {
  .home-main {
    padding-top: 3rem;
  }

  .hero-stat-card {
    text-align: left;
  }
}
</style>