<script setup lang="ts">
import { useI18n } from '#imports'
import BaseButton from "~/components/UI/BaseButton.vue";
import AppleIcon from "~/assets/icons/logo/apple.svg"
import {actionDispatcher} from "~/core/actions/dispatcher";
const { $t } = useI18n()

defineProps<{
  localisationRoot?: string
}>()


const handleSocialLogin = (provider: 'google' | 'apple') => {
  actionDispatcher.dispatch('socialLogin', provider)
};
</script>

<template>
<div class="authorization_via">
  <div class="divider">
    <div class="divider-line"/>
    <div class="divider-text">
      <span>{{ $t(`${localisationRoot}.title`) }}</span>
    </div>
  </div>

  <div class="social-buttons">
    <BaseButton :data="{type: 'button', class: 'social-button'}"
        @click="handleSocialLogin('google')">
      <span class="sr-only">{{ $t(`${localisationRoot}.google`) }}</span>
      <img src="/icons/logo/google.svg" alt="">
    </BaseButton>
    <BaseButton :data="{type: 'button', class: 'social-button'}"
        @click="handleSocialLogin('apple')">
      <span class="sr-only">{{ $t(`${localisationRoot}.apple`) }}</span>
      <AppleIcon class="apple_icon" />

    </BaseButton>

  </div>
</div>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
.nuxt-icon--fill, .nuxt-icon--fill * {
  fill: unset;
}
.divider { position: relative; margin: 1.5rem 0; text-align: center; }
.divider-line { position: absolute; top: 50%; width: 100%; border-top: 1px solid var(--border-color-alt); }
.divider-text span { background-color: var(--background-accent); padding: 0 0.5rem; position: relative; z-index: 10; font-size: 1.4rem; }
.social-buttons { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
</style>