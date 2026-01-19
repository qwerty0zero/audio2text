<script setup lang="ts">
import { useI18n } from '#imports'
const { $t } = useI18n()

useHead({
  title: computed(() => $t('metaTags.title')),
  meta: [
    {
      name: 'description',
      content: computed(() => $t('metaTags.description'))
    }
  ]
})

</script>

<template>
<h1>hello</h1>
</template>

<style scoped>

</style>