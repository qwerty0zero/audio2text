<template>
  <BaseModal>
    <div class="modal-container">
      <div class="welcome_block">
        <p class="title">{{ $t('login.title') }}</p>
        <p class="subtitle">{{ $t('login.subTitle') }}</p>
      </div>

      <form class="login-form" @submit.prevent="submit">

        <BaseInput
            id="email"
            v-model="form.email"
            type="email"
            :label="$t('login.emailInput')"
            :placeholder="$t('login.emailInput')"
            :force-show-error="isSubmitted"
            :rules="[
             validators.required($t('errors.requiredEmail')),
             validators.emailFormat($t('errors.emailFormat'))
          ]"
            v-model:valid="formValidity.email"
        />

        <BaseInput
            id="password"
            v-model="form.password"
            type="password"
            :label="$t('login.passwordInput')"
            :placeholder="$t('login.passwordInput')"
            :force-show-error="isSubmitted"
            v-model:valid="formValidity.password"
            :rules="[validators.required($t('errors.requiredPassword'))]"
        />

        <div class="form-actions">
          <div class="checkbox-wrapper">
            <input
                id="remember-me"
                v-model="form.rememberMe"
                name="remember-me"
                type="checkbox"
                class="form-checkbox"
            >
            <label for="remember-me" class="checkbox-label">
              {{ $t('login.rememberCheckOut') }}
            </label>
          </div>

          <button type="button" class="forgot-link" @click="handleForgotPassword">
            {{ $t('login.forgotPassword')  }}
          </button>
        </div>

          <BaseButton
              :data="{type: 'submit', class: 'primary full_width'}">
            {{ $t('login.button') }}
          </BaseButton>

      </form>

      <AutrorizationVia localisation-root="logInWith"/>

    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from '#imports'
import BaseModal from "~/components/Modals/BaseModal.vue";
import BaseInput from "~/components/Forms/BaseInput.vue";
import AutrorizationVia from "~/components/Forms/AutrorizationVia.vue";
import * as validators from "~/utils/validators";
import BaseButton from "~/components/UI/BaseButton.vue";
import {actionDispatcher} from "~/core/actions/dispatcher";
const { $t } = useI18n()

const form = reactive({
  email: '',
  password: '',
  rememberMe: false
});

const formValidity = reactive({
  email: false,
  password: false
});

const isSubmitted = ref(false);

const submit = () => {
  isSubmitted.value = true;

  if (!form.email || !form.password) return;

  if (!formValidity.email || !formValidity.password) return;

  actionDispatcher.dispatch('loginSubmit', {...form})

};

const handleForgotPassword = () => {
  console.log('Forgot password clicked');
};
</script>

<style scoped>


</style>