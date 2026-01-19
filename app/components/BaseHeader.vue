<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '#imports'
import HeaderNavDesktop from "~/components/header/HeaderNavDesktop.vue";
import BaseSideMenu from "~/components/UI/BaseSideMenu.vue";
import BaseButton from "~/components/UI/BaseButton.vue";
import BurgerButton from "~/components/Header/BurgerButton.vue";
import HeaderNavMobile from "~/components/Header/HeaderNavMobile.vue";

const { $t } = useI18n()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header itemscope itemtype="https://schema.org/WPHeader">
    <BaseButton :data="{to: 'hero',localScroll: true}">
      <div class="header_title">
        <span class="title_image">
          <img src="/icons/mic.svg" alt="Logo Icon">
        </span>
        <h1>{{$t('header.title')}}</h1>
      </div>
    </BaseButton>

    <div class="desktop_nav_container">
      <HeaderNavDesktop />
    </div>
    <BurgerButton :class="{ active: isMenuOpen }" @click="toggleMenu"/>
    <BaseSideMenu
        :is-open="isMenuOpen"
        @close="isMenuOpen = false">
      <HeaderNavMobile/>
    </BaseSideMenu>

  </header>
</template>

<style scoped>
header {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  padding: var(--header-padding);
  background: var(--background-accent);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  box-shadow: 1px 5px 20px -20px rgba(0, 0, 0, 1);
  z-index: 99;
}

.header_title {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--text-color-hero);
}
header>a{
  min-width: fit-content;
}
.desktop_nav_container {
  display: flex;
  flex-grow: 1;
  padding-left: 2rem;
  opacity: 1;
  transition: 0.3s;
}
h1 {
  font-size: var(--font-size-logo);
}

.title_image {
  background-color: var(--accent);
  padding: 1rem;
  border-radius: 0.5rem;
}

.title_image img {
  height: 2rem;
}
:deep(.burger-wrapper) {
  opacity: 0;
  transform: translateY(-20px);
  transition: 0.3s;
}

:deep(.header_buttons) {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  font-size: var(--font-size-text);
  z-index: 2;
  position: relative;
  transition: top 0.3s;
  top: 0;

}
@media (max-width: 850px) {
  .desktop_nav_container {
    opacity: 0;
  }
  :deep(.burger-wrapper) {
    opacity: 1;
    transform: translateY(0);
  }
}


</style>