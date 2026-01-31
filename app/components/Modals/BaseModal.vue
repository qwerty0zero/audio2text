<template>
  <div
      class="modal-base"
      @click.self="close"
  >
    <div class="modal_body">
      <button
          class="close_button"
          @click="close"
      >
        ✕
      </button>

      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const { isOpen, close } = useModal();
const handleEsc = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isOpen.value) close();
};
onMounted(() => window.addEventListener('keydown', handleEsc));
onUnmounted(() => window.removeEventListener('keydown', handleEsc));

</script>

<style>

.modal-base {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal_body{
  position: relative;
  background-color: var(--background-accent);
  color: var(--text-color);
  width: 90%;
  max-width: 60rem;
  padding: var(--modal-padding);
  border-radius: 1rem;
}
.close_button{
  position: absolute;
  background: transparent;
  cursor: pointer;
  background: var(--accent);
  color: var(--white);
  border-radius: 50%;
  font-size: 1.4rem;
  width: 5rem;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 700;

  right: 1rem;
  top: 1rem;
}

.modal-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

form {
  display: flex; flex-direction: column;
  gap: 1.25rem;
  font-size: var(--font-size-text);
  padding: 2rem 0;
}

.checkbox-label {font-size:var(--font-size-title-xs); cursor: pointer; }

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: var(--font-size-title-xs);
}
.form-checkbox {
  height: 2rem;
  width: 2rem;
  color: var(--accent);
  border-radius: 0.25rem;
  border: 1px solid var(--border-color);
  cursor: pointer;
  accent-color: var(--accent);
  padding: 0;
}
.form-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.forgot-link, .start_login {
  background: none;
  border: none;
  color: var(--accent);
  font-size: 1.2rem;
  cursor: pointer;
  font-weight: 500;
  padding: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>