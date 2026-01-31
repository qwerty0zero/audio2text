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
import { computed } from 'vue';
import { useModal } from '~/composables/useModal';

import LoginModal from './LoginModal.vue';
import SignupModal from './SignupModal.vue';
import ContactUsModal from "./ContactUsModal.vue";

const { currentModal, isOpen } = useModal();

const modalsMap = {
  login: LoginModal,
  signup: SignupModal,
  contact: ContactUsModal,
};

const activeComponent = computed(() => {
  return currentModal.value ? modalsMap[currentModal.value] : null;
});
</script>