<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <component
          :is="activeComponent"
          v-if="isOpen && activeComponent"
      />
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { useModal } from '~/composables/useModal';

const modalsMap = {
  login: defineAsyncComponent(() => import('./LoginModal.vue')),
  signup: defineAsyncComponent(() => import('./SignupModal.vue')),
  contact: defineAsyncComponent(() => import('./ContactUsModal.vue')),
} as const;

const { currentModal, isOpen } = useModal();

const activeComponent = computed(() => {
  return currentModal.value ? modalsMap[currentModal.value] : null;
});
</script>