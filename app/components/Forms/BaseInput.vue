<template>
  <div class="form-group">
    <label v-if="label" :for="id">
      {{ label }}
      <span v-if="required" class="required-star">*</span>
    </label>

    <div class="input-wrapper">
      <input
          :id="id"
          ref="inputRef"
          :value="modelValue"
          :type="currentType"
          :placeholder="placeholder"
          class="form-input"
          :class="{
          'with-icon': type === 'password',
          'has-error': hasError
        }"
          @input="handleInput"
          @blur="handleBlur"
      />
      <button
          v-if="type === 'password'"
          :aria-label="$t('signup.showPassword')"
          type="button"
          class="eye-btn"
          @click="togglePassword"
      >
        <HidePasswordIcon v-if="!isPasswordVisible"/>
        <ShowPasswordIcon v-else/>

      </button>
    </div>

    <span v-if="hasError" class="error-text">
      {{ activeError }}
    </span>

    <slot name="footer" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import HidePasswordIcon from "~/assets/icons/input-icon/hidePassword.svg"
import ShowPasswordIcon from "~/assets/icons/input-icon/showPassword.svg"

type Validator = (val: string) => boolean | string;

const props = defineProps({
  modelValue: { type: String, default: '' },
  id: { type: String, required: true },
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  rules: { type: Array as PropType<Validator[]>, default: () => [] },
  externalError: { type: String, default: '' },
  forceShowError: { type: Boolean, default: false },

  required: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['update:modelValue', 'blur', 'update:valid']);
const isPasswordVisible = ref(false);
const isTouched = ref(false);
const internalError = ref<string | null>(null);

const currentType = computed(() => {
  if (props.type === 'password') {
    return isPasswordVisible.value ? 'text' : 'password';
  }
  return props.type;
});

const togglePassword = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const validate = (val: string) => {
  if (!props.rules || props.rules.length === 0) {
    internalError.value = null;
    return;
  }

  for (const rule of props.rules) {
    const result = rule(val);
    if (typeof result === 'string') {
      internalError.value = result;
      emit('update:valid', false);
      return;
    }
  }
  internalError.value = null;
  emit('update:valid', true);
};

const activeError = computed(() => props.externalError || internalError.value);
const hasError = computed(() => {
  return (isTouched.value || props.forceShowError) && !!activeError.value;
});

const handleInput = (event: Event) => {
  const val = (event.target as HTMLInputElement).value;
  emit('update:modelValue', val);
  if (isTouched.value) validate(val);
};

const handleBlur = () => {
  isTouched.value = true;
  validate(props.modelValue);
  emit('blur');
};

watch(() => props.forceShowError, (newVal) => {
  if (newVal) validate(props.modelValue);
});
</script>

<style scoped>

.input-wrapper { position: relative; width: 100%; }
.form-input.with-icon { padding-right: 4rem; }
.eye-btn { position: absolute; top: 50%; right: 1.5rem; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #9ca3af; padding: 0; display: flex; align-items: center; width: 1.6rem;}
.nuxt-icon--fill, .nuxt-icon--fill * {
  fill: unset;
}

</style>