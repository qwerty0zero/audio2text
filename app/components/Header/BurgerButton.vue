<script setup lang="ts">

</script>

<template>
  <button
      type="button"
      class="burger-wrapper"

      aria-label="Toggle menu"
  >
    <span class="hamburger"/>
  </button>
</template>

<style scoped>
.burger-wrapper {
  --s: 0.32rem;

  background: none;
  padding: 0;
  cursor: pointer;

  width: calc(var(--s) * 10);
  height: calc(var(--s) * 10);

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  right: 1.5rem;
  z-index: 101;
}

.hamburger {
  background: var(--logo-fill);
  width: calc(var(--s) * 10);
  height: var(--s);
  position: relative;

  transition: background 10ms 300ms ease;
}

.hamburger:before,
.hamburger:after {
  content: '';
  position: absolute;
  background: var(--logo-fill);
  width: 100%;
  height: var(--s);
  left: 0;

  transition:
      top 300ms 350ms ease,
      transform 300ms 50ms ease;
}

.hamburger:before {
  top: calc(var(--s) * -3);
}

.hamburger:after {
  top: calc(var(--s) * 3);
}

.burger-wrapper.active .hamburger {
  background: transparent;
}

.burger-wrapper.active .hamburger:before,
.burger-wrapper.active .hamburger:after {
  top: 0;

  transition:
      top 300ms 50ms ease,
      transform 300ms 350ms ease;
}

.burger-wrapper.active .hamburger:before {
  transform: rotate(45deg);
}

.burger-wrapper.active .hamburger:after {
  transform: rotate(-45deg);
}
</style>