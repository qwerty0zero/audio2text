<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import type { ActionType } from '~/core/actions/types'
import { actionDispatcher } from '~/core/actions/dispatcher'

export interface IButton {
  label?: string
  class?: string
  to?: RouteLocationRaw | string
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  action?: ActionType
  ariaLabel?: string
  localScroll?: boolean
}

const props = defineProps<{
  data: IButton
}>()

const attrs = useAttrs()
const { scrollToAnchor } = useAnchorScroll()

const button = computed(() => ({
  ariaLabel: 'кнопка',
  localScroll: false,
  type: 'button' as const,
  class: '',
  ...props.data
}))

const isLocalAnchor = computed(() => button.value.localScroll && button.value.to)

const componentType = computed(() => {
  if (isLocalAnchor.value) return 'a'
  if (button.value.to) return 'NuxtLink'
  if (button.value.href) return 'a'
  return 'button'
})

const boundProps = computed(() => {
  const { to, href, disabled, type } = button.value

  if (isLocalAnchor.value) return { href: to as string }
  if (componentType.value === 'NuxtLink') return { to, disabled }
  if (componentType.value === 'a') return { href, disabled }

  return { type, disabled }
})

const computedClass = computed(() => {
  const configClass = button.value.class
  const attrClass = attrs.class

  const hasCustomClass = !!configClass || !!attrClass

  return ['base-btn', configClass]
})

const handleClick = (e: Event) => {
  if (isLocalAnchor.value) {
    e.preventDefault()
    if (typeof button.value.to === 'string') {
      scrollToAnchor(button.value.to)
    }
    return
  }

  if (button.value.action) {
    actionDispatcher.dispatch(button.value.action)
  }
}
</script>

<template>
  <component
      :is="componentType"
      v-bind="{ ...$attrs, ...boundProps }"
      :class="computedClass"
      :aria-label="button.ariaLabel"
      @click="handleClick"
  >
    <slot>
      {{ button.label }}
    </slot>
  </component>
</template>

<style scoped>
.base-btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-size-text);
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  background-color: transparent;
  font-weight: 700;
  border: 0.2rem solid transparent;
  text-align: center;
  text-decoration: none;
  transition: 0.3s;
  color: var(--text-color);
}

.base-btn.primary {
  background-color: var(--accent);
  border-color: var(--accent);
  color: var(--white);
}
.base-btn.brand-link{
  color: var(--white);
  justify-content: flex-start;
  padding: 0;
}

form .base-btn.primary {
  padding: 2rem 2.5rem;
}

.base-btn.secondary {
  background-color: var(--background-alt);
  border-color: var(--background-alt);
}

.base-btn.outline {
  border-color: var(--border-color-alt);
}

.base-btn.dark_blue {
  background-color: var(--dark-blue);
  border-color: var(--text-color-hero);
  color: var(--white);
}

.base-btn.primary:is(:hover, :focus, :active) {
  background-color: transparent;
  color: var(--accent);
}

.base-btn.secondary:is(:hover, :focus, :active) {
  background-color: transparent;
}

.base-btn.outline:is(:hover, :focus, :active) {
  background-color: var(--border-color-alt);
}

.base-btn.dark_blue:is(:hover, :focus, :active) {
  background-color: transparent;
  color: var(--text-color);
}

.full_width { width: 100%; }
.square { padding: 1rem !important; aspect-ratio: 1/1; height: 4rem; }
.social-button { border-color: var(--border-color-alt); padding: 2rem; }

.price_plan .base-btn.primary,
#trial_block .base-btn.primary {
  background-color: var(--white);
  border-color: var(--white);
  color: var(--accent);
}

.price_plan .full_width { padding: 2rem; margin-top: auto; }

.price_plan .base-btn.primary:is(:hover, :focus, :active),
#trial_block .base-btn.primary:is(:hover, :focus, :active) {
  background-color: transparent;
  color: var(--white);
}

#trial_block .base-btn.outline {
  border-color: var(--white);
  color: var(--white);
}

#trial_block .base-btn.outline:is(:hover, :focus, :active) {
  background-color: var(--white);
  color: var(--accent);
}

:deep(img) { height: var(--font-size-text); }
.social-button :deep(img), .social-button :deep(.apple_icon) {
  height: 3.2rem; width: 3.2rem; fill: var(--logo-fill);
}

@media screen and (max-width: 1200px) {
  .base-btn { padding: 1rem 1.5rem; }
}
</style>