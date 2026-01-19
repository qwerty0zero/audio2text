<template>
  <BaseHeader/>
  <NuxtPage />
  <BaseFooter/>
  <ModalRoot/>
  <NotificationContainer />
  <VueLenis root :options="lenisOptions"/>
</template>
<script setup lang="ts">
import ModalRoot from "~/components/Modals/ModalRoot.vue";
import { useCurrency } from '~/composables/useCurrency';
import {useLenis, VueLenis} from 'lenis/vue'
import NotificationContainer from "~/components/Notification/NotificationContainer.vue";

const { lenisOptions } = useLenis()
const { detectCurrency } = useCurrency();

onMounted(() => {
  detectCurrency();
});
</script>