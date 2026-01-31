<script setup lang="ts">
defineProps<{
  isOpen: boolean;
  avatarSrc?: string;
  userName?: string;
}>()

const emit = defineEmits(['close'])
</script>

<template>
  <div class="side_menu_overlay" :class="{ 'is-open': isOpen }" @click.self="emit('close')">
    <aside class="side_menu_content">
      <div class="menu_slot">
        <slot />
      </div>
    </aside>
  </div>
</template>

<style scoped>
.side_menu_overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  font-size: var(--font-size-text);
}

.side_menu_overlay.is-open {
  opacity: 1;
  visibility: visible;
}

.side_menu_content {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  min-height: 100dvh;
  background: var(--background-accent);
  transform: translateX(100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 2rem;
  box-shadow: -5px 0 15px rgba(0,0,0,0.1);
}

.side_menu_overlay.is-open .side_menu_content {
  transform: translateX(0);
}


</style>