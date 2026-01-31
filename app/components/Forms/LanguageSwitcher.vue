<script setup lang="ts">
import { useI18n } from '#imports'
import BaseSelector from "~/components/Forms/BaseSelector.vue";

const { $t,$getLocales, $getLocale } = useI18n()
const currentLocale = ref($getLocale())

const locales = $getLocales()

const localesOptions = locales.map(({code, displayName}) => ({
  value: code,
  label: displayName
}))

</script>

<template>
  <BaseSelector id="languageSelector"
                :label="$t('selectors.languageLabel')"
                name="languageSelector"
                :options="localesOptions"
                v-model="currentLocale"/>
</template>

<style scoped>

</style>