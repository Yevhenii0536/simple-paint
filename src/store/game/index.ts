import { defineStore } from 'pinia'

interface GameStoreModel {
  x: number
  y: number
}

export const useGameStore = defineStore({
  id: 'auth',
  state: (): GameStoreModel => ({
    x: 0,
    y: 0,
  }),
  getters: {},
  actions: {},
})
