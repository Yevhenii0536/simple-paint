<script setup lang="ts">
import { computed } from 'vue'
import { required, email } from '@vuelidate/validators'
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";

const authStore = useAuthStore()
const router = useRouter()
const isDataCorrect = computed(() => {
  const isEmailValid = email.$validator(authStore.email, 0, 0)
  const isPasswordInputted = required.$validator(authStore.password, 0, 0)

  return isEmailValid && isPasswordInputted
})

function login() {
  if (isDataCorrect.value) {
    router.push('/game')
  }
}
</script>

<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="authStore.email"
                :rules="[email.$validator]"
                label="Email"
                required
              />
              <v-text-field
                v-model="authStore.password"
                :rules="[required.$validator]"
                label="Password"
                type="password"
                required
              />
              <v-btn :disabled="!isDataCorrect" type="submit" color="primary">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
