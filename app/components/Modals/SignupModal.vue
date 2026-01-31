<template>
  <BaseModal>
    <div class="modal-container">
      <ModalHeader title-key="signup.title" subtitle-key="signup.subTitle" />

      <form class="login-form" @submit.prevent="submit">
        <BaseInput
            id="name"
            v-model="form.name"
            v-model:valid="formValidity.name"
            :label="$t('signup.nameInput')"
            :placeholder="$t('signup.nameInput')"
            :force-show-error="isSubmitted"
            :rules="[
            validators.required('Введите имя'),
            validators.nameFormat('Только буквы, без пробелов')
          ]"
        />
        <BaseInput
            id="email"
            v-model="form.email"
            v-model:valid="formValidity.email"
            type="email"
            :label="$t('signup.emailInput')"
            :placeholder="$t('signup.emailInput')"
            :force-show-error="isSubmitted"
            :rules="[
            validators.required('Введите email'),
            validators.emailFormat('Некорректный формат email')
          ]"
        />
        <BaseInput
            id="password"
            v-model="form.password"
            v-model:valid="formValidity.password"
            type="password"
            :label="$t('signup.passwordInput')"
            :placeholder="$t('signup.passwordInput')"
            :force-show-error="isSubmitted"
            :rules="[validators.required('Введите пароль')]"
        >
          <template #footer>
            <div v-if="form.password || isSubmitted" class="validation-info">
              <p class="validation-rule" :class="{ 'valid': passwordRules.length }">
                <span class="dot">●</span> Минимум 8 символов
              </p>
              <p class="validation-rule" :class="{ 'valid': passwordRules.uppercase }">
                <span class="dot">●</span> Заглавная буква (A-Z)
              </p>
              <p class="validation-rule" :class="{ 'valid': passwordRules.digit }">
                <span class="dot">●</span> Цифра (0-9)
              </p>
            </div>
          </template>
        </BaseInput>
        <BaseInput
            id="confirmPassword"
            v-model="form.confirmPassword"
            type="password"
            :label="$t('signup.confirmPasswordInput')"
            :placeholder="$t('signup.confirmPasswordInput')"
            :force-show-error="isSubmitted"
            :external-error="confirmPasswordError"
        />
        
        <div class="form-actions">
          <div class="checkbox-wrapper">
            <input
                id="terms"
                v-model="form.agreeTerms"
                name="terms"
                type="checkbox"
                class="form-checkbox"
            >
            <label for="terms" class="checkbox-label">
              {{ $t('signup.agreeTerms')}}
            </label>
          </div>
          <div class="haveAccount">
            {{$t('signup.haveAccount')}}
            <button class="start_login" @click="switchToLogin"> {{$t('signup.loginLink')}}</button>
          </div>
        </div>
        <BaseButton
            :data="{type: 'submit', class: 'primary full_width'}">
          {{ $t('signup.button') }}
        </BaseButton>
      </form>

      <AutrorizationVia localisation-root="signUpWith"/>
      
  </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { useI18n } from '#imports'
import { actionDispatcher } from "~/core/actions/dispatcher";
import BaseModal from "~/components/Modals/BaseModal.vue";
import BaseButton from "~/components/UI/BaseButton.vue";
import BaseInput from "~/components/Forms/BaseInput.vue";
import * as validators from "~/utils/validators";


import AutrorizationVia from "~/components/Forms/AutrorizationVia.vue";
import ModalHeader from "~/components/Modals/ModalHeader.vue";

const { $t } = useI18n();

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
});

const formValidity = reactive({
  name: false,
  email: false,
  password: false
});

const isSubmitted = ref(false);

const passwordRules = computed(() => {
  const p = form.password;
  return {
    length: p.length >= 8,
    uppercase: /[A-Z]/.test(p),
    digit: /[0-9]/.test(p)
  };
});

const isPasswordStrong = computed(() => {
  return passwordRules.value.length &&
      passwordRules.value.uppercase &&
      passwordRules.value.digit;
});

const confirmPasswordError = computed(() => {
  if (form.password !== form.confirmPassword) {
    return $t('signup.passwordMismatch') || 'Пароли не совпадают';
  }
  return '';
});

const submit = () => {
  isSubmitted.value = true;

  if (!formValidity.name) return;
  if (!formValidity.email) return;
  if (!isPasswordStrong.value) return alert('Пароль слабый');
  if (confirmPasswordError.value) return;
  if (!form.agreeTerms) return alert('Примите условия');

  actionDispatcher.dispatch('register', { ...form });
};

const switchToLogin = () => {
  actionDispatcher.dispatch('logIn');
};
</script>

<style scoped>
.validation-info { margin-top: 0.5rem; font-size: var(--font-size-title-xs); color: #6b7280; }
.validation-rule { display: flex; align-items: center; gap: 0.5rem; transition: color 0.3s ease; }
.validation-rule.valid { color: #10b981; font-weight: 500; }

.haveAccount{
  font-size: var(--font-size-title-xs);
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
</style>