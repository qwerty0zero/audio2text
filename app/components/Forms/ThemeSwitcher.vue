<template>
  <label class="theme-toggle" title="Toggle theme">
    <input
        type="checkbox"
        v-model="isDark"
    />
    <div class="slider">
      <svg class="icon sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>

      <svg class="icon moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>

      <div class="ball"></div>
    </div>
  </label>
</template>

<script setup>
import { computed } from 'vue'

const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(newValue) {
    colorMode.preference = newValue ? 'dark' : 'light'
  }
})
</script>

<style scoped>
.theme-toggle {
  position: relative;
  display: inline-block;
  width: 6rem;
  height: 3rem;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.theme-toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cbd5e0;
  transition: .4s;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6px;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
  border: 1px solid #b1b9c5;
}

.icon {
  width: 1.6rem;
  height: 1.6rem;
  z-index: 1;
  transition: transform 0.4s ease;
}

.sun {
  color: var(--yellow);
}

.moon {
  color: var(--dark-blue);
}

.ball {
  position: absolute;
  height: 24px;
  width: 24px;
  left: 3px;
  bottom: 2px;
  background-color: white;
  transition: .4s cubic-bezier(0.25, 0.8, 0.25, 1);
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  z-index: 2;
}

input:checked + .slider {
  background-color: #2d3748;
  border-color: #1a202c;
}

input:checked + .slider .ball {
  transform: translateX(30px);
  background-color: #4a5568;
}

input:checked + .slider .sun {
  opacity: 0.5;
  transform: scale(0.8);
}

input:checked + .slider .moon {
  color: #a0aec0;
  opacity: 1;
}

.theme-toggle:hover .ball {
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
}
</style>