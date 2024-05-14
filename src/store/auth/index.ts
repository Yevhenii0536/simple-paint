import { defineStore } from 'pinia'

interface AuthStoreModel {
  email: string
  password: string
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): AuthStoreModel => ({
    email: '',
    password: '',
  }),
  getters: {},
  actions: {},
})
