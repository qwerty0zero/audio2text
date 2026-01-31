<template>
  <div class="form-group">
      <select
          class="select"
          :value="modelValue"
          :id="id"
          :name="id"
          @change="onChange"
      >
        <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            :selected="option.value === modelValue"
        >
          {{  optionLabelMultiply ?
            option.value + " " + option.label :
            option.label }}
        </option>
      </select>

  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number, Boolean, Object, null],
    default: null
  },
  options: {
    type: Array,
    required: true,
    default: () => []
  },
  placeholder: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  optionLabelMultiply: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

function onChange(event) {
  emit('update:modelValue', event.target.value)
}

</script>

<style scoped>
.form-group{
  width: fit-content;
  flex-direction: row;
  align-items: center;
  gap: 1rem ;
}

.select {
  width: 100%;

}
</style>