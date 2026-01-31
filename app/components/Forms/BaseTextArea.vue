<template>
  <div class="form-group">
    <label v-if="label" :for="id" >
      {{ label }}
      <span v-if="required" class="required-star">*</span>
    </label>

    <textarea
        :id="id"
        :value="modelValue"
        :placeholder="placeholder"
        class="base-textarea"
        :class="{ 'has-error': errorMessage }"
        @input="handleInput"
        @blur="validate"
    />

    <span v-if="errorMessage" class="error-text">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  modelValue: string;
  id: string;
  label?: string;
  placeholder?: string;
  rules?: Array<(val: string) => string | boolean>;
  forceShowError?: boolean;
  valid?: boolean;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  rules: () => [],
  forceShowError: false,
  valid: true,
  required: true
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'update:valid', value: boolean): void;
}>();

const errorMessage = ref<string>('');

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);

  if (errorMessage.value) {
    validate(target.value);
  }
};

const validate = (val?: string | Event) => {
  const valueToCheck = typeof val === 'string' ? val : props.modelValue;

  errorMessage.value = '';

  if (!props.rules || props.rules.length === 0) {
    emit('update:valid', true);
    return;
  }

  for (const rule of props.rules) {
    const result = rule(valueToCheck);
    if (typeof result === 'string') {
      errorMessage.value = result;
      emit('update:valid', false);
      return;
    }
  }

  emit('update:valid', true);
};

watch(() => props.forceShowError, (newVal) => {
  if (newVal) {
    validate();
  }
});
</script>

<style scoped>

</style>