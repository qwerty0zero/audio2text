<script setup lang="ts">
import { useI18n } from '#imports'
import BaseButton from "~/components/UI/BaseButton.vue";

const { $t } = useI18n()
</script>

<template>
  <div class="nav_desktop_wrapper">
    <nav aria-label="Main navigation" itemscope itemtype="https://schema.org/SiteNavigationElement">
      <ul>
        <li v-for="(el, index) in $t('header.navigation')" :key="index">
          <BaseButton :data="el" itemprop="url"  >
            <span class="line_animation">{{el.title}}</span>
          </BaseButton>
        </li>
      </ul>
    </nav>

    <div class="header_buttons">
      <BaseButton
          v-for="(el, index) in $t('header.buttons')" :key="index"
          :data="el"
      >
        {{el.text}}
      </BaseButton>
    </div>
  </div>
</template>

<style scoped>
.nav_desktop_wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
}

nav {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  transition: top 0.3s;
}

ul {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  padding: 0;
  font-size: var(--font-size-text);
}

.header_buttons{
  transition: 0.3s;
}

span {
  padding: 1rem 1.5rem;
}

.line_animation {
  position: relative;
}

.line_animation:after {
  content: "";
  position: absolute;
  bottom: -0.2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0.2rem;
  background-color: var(--text-color);
  transition: 0.3s ease-in-out;
  max-width: calc(100% - 3rem);
}

.line_animation:hover:after,
.line_animation:focus:after,
.line_animation:active:after {
  width: 100%;
}

@media (max-width: 850px) {
  nav {
    top: calc(50% - 100px);
  }
  .header_buttons{
    top: -100px;
  }
}
</style>