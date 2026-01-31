<script setup lang="ts">
import { useI18n } from '#imports'

const props = defineProps<{
  titleKey: string
  subtitleKey: string
}>()

const { $t } = useI18n()
</script>

<template>
  <div class="welcome_block">
    <p class="title">{{ $t(titleKey) }}</p>
    <p class="subtitle">{{ $t(subtitleKey) }}</p>
  </div>
</template>

<style scoped>
.welcome_block {
  margin-bottom: 1.5rem;
}
.title {
  font-size: var(--font-size-title-m-l);
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.subtitle {
  font-size: var(--font-size-text);
}
</style>

