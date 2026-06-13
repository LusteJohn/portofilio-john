<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitStatus = ref(null)
const submitMessage = ref('')

const submitForm = async () => {
  isSubmitting.value = true
  submitStatus.value = null
  submitMessage.value = ''

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })

    const result = await response.json()
    if (result.success) {
      submitStatus.value = 'success'
      submitMessage.value = 'Message sent successfully!'
      form.value = { name: '', email: '', subject: '', message: '' }
    } else {
      submitStatus.value = 'error'
      submitMessage.value = result.error || 'Failed to send. Please try again.'
    }
  } catch (error) {
    submitStatus.value = 'error'
    submitMessage.value = error.message || 'Failed to send. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="space-y-6">
    <h3 class="text-xs font-label uppercase tracking-[0.2em] text-outline">Send a Message</h3>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          v-model="form.name"
          type="text"
          placeholder="Name"
          required
          class="w-full rounded-lg border border-outline-variant/20 bg-surface-container-high px-4 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <input
          v-model="form.email"
          type="email"
          placeholder="Email"
          required
          class="w-full rounded-lg border border-outline-variant/20 bg-surface-container-high px-4 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>
      <input
        v-model="form.subject"
        type="text"
        placeholder="Subject"
        required
        class="w-full rounded-lg border border-outline-variant/20 bg-surface-container-high px-4 py-2 text-sm text-on-surface placeholder:text-on-surface/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
      <textarea
        v-model="form.message"
        placeholder="Message"
        rows="4"
        required
        class="w-full rounded-lg border border-outline-variant/20 bg-surface-container-high px-4 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
      <button
        type="submit"
        :disabled="isSubmitting"
        class="header-action-btn gap-1.5 bg-gradient-to-br from-primary to-primary-container text-on-primary disabled:opacity-50"
      >
        <span class="material-symbols-outlined text-[14px]">{{ isSubmitting ? 'send' : 'send' }}</span>
        <span>{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
      </button>
      <p v-if="submitStatus === 'success'" class="text-xs text-primary">{{ submitMessage }}</p>
      <p v-if="submitStatus === 'error'" class="text-xs text-error">{{ submitMessage }}</p>
    </form>
  </section>
</template>

<style scoped>
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
</style>