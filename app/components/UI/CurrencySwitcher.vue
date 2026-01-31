<script setup lang="ts">
import { useCurrency } from '~/composables/useCurrency';
import BaseSelector from "~/components/Forms/BaseSelector.vue";
import {useI18n} from "#imports";

const {$t} = useI18n();
const { currency, allCurrencies, setCurrency } = useCurrency();

const options = allCurrencies.map(({ code, symbol }) => ({
  value: code,
  label: symbol
}));
const selected = computed({
  get() {
    return currency.value;
  },
  set(newValue) {
    setCurrency(newValue);
  }
});
</script>

<template>
  <BaseSelector
      id="currencySwitcher"
      name="currency"
      :label="$t('selectors.currencyLabel')"
      v-model="selected"
      :optionLabelMultiply="true"
      :options="options"
      placeholder="Выберите значение"
  />
</template>

<style scoped>

</style>