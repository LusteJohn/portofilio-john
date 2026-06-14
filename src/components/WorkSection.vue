<script setup>
import { ref } from 'vue'

const experiences = [
  {
    id: 1,
    year: 'PRESENT',
    title: 'Software Engineer Intern',
    company: 'Thy Web Dev Inc.',
    description: 'Designed and developed a server configuration dashboard using the Vultr API, automating DNS subdomain management and integrating Git-based deployment workflows to streamline server monitoring. Architected and developed a web-based system to track internship documentation and compliance, utilizing PHP to improve administrative efficiency for student records. Designed a responsive school portal for School, enhancing institutional communication and accessibility for students and faculty. Developed a candidate and party-list information platform, prioritizing user experience and data accessibility to ensure transparent information dissemination for voters.',
    isActive: true
  },
  {
    id: 2,
    year: '2023 – PRESENT',
    title: 'Freelance Developer',
    company: 'Freelance',
    description: 'Collaborated with clients to translate project requirements into comprehensive system designs, including database schema development and process mapping. Engineered scalable local web-based systems for academic and client-specific requirements, focusing on intuitive interfaces and optimized database performance. Developed a centralized management system for academic records, automating grading processes and data retrieval to streamline school administrative tasks. Built an interactive Philippine Population Dashboard utilizing real-time datasets and scalable vector graphics (SVG) to provide accessible and engaging data insights.',
    isActive: false
  }
]

const activeExperienceId = ref(experiences[0].id)
</script>

<template>
  <section class="work-shell bg-surface-container-lowest px-4 py-24 md:px-8">
    <div class="mx-auto max-w-4xl">
      <h2 class="mb-16 text-center text-sm font-bold uppercase tracking-[0.18em] text-primary">Professional Journey</h2>
      <div class="relative ml-4 border-l border-outline-variant/20 md:left-1/2 md:ml-0">
        <div
          v-for="(exp, index) in experiences"
          :key="exp.id"
          class="group/timeline relative mb-20"
          @mouseenter="activeExperienceId = exp.id"
        >
          <div
            :class="[
              'timeline-dot absolute -left-[9px] top-0 h-4 w-4 cursor-pointer rounded-full transition-all duration-300 group-hover/timeline:scale-125',
              exp.id === activeExperienceId
                ? 'bg-primary shadow-[0_0_15px_rgba(203,190,255,0.5)] group-hover/timeline:shadow-[0_0_25px_rgba(203,190,255,0.8)]'
                : 'bg-outline-variant group-hover/timeline:bg-primary group-hover/timeline:shadow-[0_0_25px_rgba(203,190,255,0.75)]'
            ]"
          ></div>
          <div
            :class="[
              'timeline-card rounded-2xl border border-transparent px-5 py-5 transition-all duration-300 group-hover/timeline:border-primary/25 group-hover/timeline:bg-surface-container-low/80',
              exp.id === activeExperienceId ? 'border-primary/30 bg-surface-container-low/70 shadow-[0_20px_45px_-35px_rgba(203,190,255,0.65)]' : '',
              index % 2 === 0 && index !== 0
                ? 'md:ml-16 md:w-1/2'
                : 'md:ml-0 md:w-1/2 md:-translate-x-[calc(100%+1.5rem)] md:pr-16 md:text-right'
            ]"
          >
            <span class="mb-2 inline-flex rounded-full border border-primary/25 px-3 py-1 text-xs font-headline font-bold tracking-wider text-primary">{{ exp.year }}</span>
            <h3 class="text-2xl font-headline font-bold text-primary">{{ exp.title }}</h3>
            <p class="mb-4 font-medium text-secondary">{{ exp.company }}</p>
            <p class="text-on-surface-variant">{{ exp.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.work-shell {
  position: relative;
}

.work-shell::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(circle at 10% 25%, rgba(203, 190, 255, 0.08), transparent 32%);
}

.timeline-card {
  backdrop-filter: blur(4px);
}

:global(.theme-light) .work-shell {
  background-color: #e8dccb !important;
}

:global(.theme-light) .work-shell::before {
  background: radial-gradient(circle at 12% 20%, rgba(171, 127, 80, 0.2), transparent 36%),
    radial-gradient(circle at 88% 25%, rgba(120, 95, 66, 0.14), transparent 35%);
}

:global(.theme-light) .timeline-card {
  background: rgba(255, 249, 241, 0.8);
  border-color: rgba(140, 110, 76, 0.16);
}

:global(.theme-light) .timeline-dot {
  box-shadow: 0 0 0 4px rgba(91, 70, 182, 0.08);
}
</style>
