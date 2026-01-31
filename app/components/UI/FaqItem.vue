<script setup lang="ts">
const props = defineProps<{
  element: object
}>()
</script>

<template>
  <details open class="faq_block">
    <summary itemprop="name" v-if="element.title">{{ element.title }}</summary>
    <div
        itemscope
        itemprop="acceptedAnswer"
        itemtype="https://schema.org/Answer"
        v-if="element.description"
    >
      <p itemprop="text">{{ element.description }}</p>
    </div>
  </details>
</template>

<style scoped>
.faq_block {
  pointer-events: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  font-size: var(--font-size-text) ;
  padding: 2rem 1.5rem;
  background: var(--background-accent);
  border: 2px solid var(--border-color);
  border-radius: 1rem;
}

.faq_block summary {
  list-style: none;
  cursor: default;
  outline: none;
  font-size: var(--font-size-title-m);
  font-weight: 700;
}

.faq_block summary::-webkit-details-marker {
  display: none;
}

</style>