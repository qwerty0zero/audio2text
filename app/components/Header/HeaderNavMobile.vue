<script setup lang="ts">

import BaseButton from "~/components/UI/BaseButton.vue";
</script>

<template>
  <nav class="mobile_nav">
    <ul>
      <li v-for="(el, index) in $t('header.navigation')" :key="index">
        <BaseButton :data="el" @click="isMenuOpen = false">
          {{el.title}}
        </BaseButton>
      </li>
    </ul>
    <div class="header_buttons">
      <BaseButton
          v-for="(el, index) in $t('header.buttons')" :key="index"
          :data="el">
        {{el.text}}
      </BaseButton>
    </div>

  </nav>
</template>

<style scoped>
.mobile_nav, .mobile_nav ul{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: var(--font-size-text);
}
.mobile_nav ul {
  margin-top: 6rem;
}
.header_buttons{
  margin-top: auto;
}
</style>