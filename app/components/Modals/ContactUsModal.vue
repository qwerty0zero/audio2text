<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from '#imports'
import BaseModal from "~/components/Modals/BaseModal.vue";
import BaseInput from "~/components/Forms/BaseInput.vue";
import BaseTextArea from "~/components/Forms/BaseTextArea.vue";
import * as validators from "~/utils/validators";
import BaseButton from "~/components/UI/BaseButton.vue";
import {actionDispatcher} from "~/core/actions/dispatcher";

const { $t } = useI18n()

const form = reactive({
  name: '',
  email: '',
  message: ''
});

const formValidity = reactive({
  name: false,
  email: false,
  message: false
});

const isSubmitted = ref(false);

const submit = () => {
  isSubmitted.value = true;

  if (!form.name || !form.email || !form.message) return;

  if (!formValidity.name || !formValidity.email || !formValidity.message) return;

  actionDispatcher.dispatch('sendMessage', {...form})
};
</script>

<template>
  <BaseModal>
    <div class="modal-container">
      <div class="welcome_block">
        <p class="title">{{ $t('contactUs.title') }}</p>
        <p class="subtitle">{{ $t('contactUs.subTitle') }}</p>
      </div>

      <form class="contact-form" @submit.prevent="submit">
        <BaseInput
            id="name"
            v-model="form.name"
            v-model:valid="formValidity.name"
            style="grid-area: 1 / 1 / 2 / 2"
            :label="$t('signup.nameInput')"
            :placeholder="$t('signup.nameInput')"
            :force-show-error="isSubmitted"
            :required="false"
            :rules="[
              validators.nameFormat('Только буквы')
            ]"
        />

        <BaseInput
            id="email"
            v-model="form.email"
            v-model:valid="formValidity.email"
            type="email"
            style="grid-area: 1 / 2 / 2 / 3"
            :label="$t('login.emailInput')"
            :placeholder="$t('login.emailInput')"
            :force-show-error="isSubmitted"
            :rules="[
               validators.required($t('errors.requiredEmail')),
               validators.emailFormat($t('errors.emailFormat'))
            ]"
        />

        <BaseTextArea
            id="message"
            v-model="form.message"
            v-model:valid="formValidity.message"
            style="grid-area: 2 / 1 / 3 / 3"
            label="Сообщение"
            placeholder="Опишите ваш вопрос..."
            :force-show-error="isSubmitted"
            :rules="[
               validators.required('Сообщение не может быть пустым')
            ]"
        />

        <div class="submit-wrapper">
          <BaseButton :data="{type: 'submit', class: 'primary full_width'}">
            {{ $t('contactUs.buttonText')  }}
          </BaseButton>

        </div>
      </form>
    </div>
  </BaseModal>
</template>

<style scoped>
.submit-wrapper {
  grid-area: 3 / 1 / 4 / 3;
}
</style>