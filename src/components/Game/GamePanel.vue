<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useGameStore } from "../../store/game";

const gameStore = useGameStore()
const grid = ref<Array<Array<string>>>([]);

onMounted(() => initializeGrid())
watch(() => [gameStore.x, gameStore.y], () => initializeGrid())

function drawGrid() {
  const currentSizeX = grid.value[0] ? grid.value[0].length : 0
  const currentSizeY = grid.value.length

  if (gameStore.x !== currentSizeX || gameStore.y !== currentSizeY) {
    grid.value = Array.from({ length: gameStore.y }, (_, rowIndex) => {
      if (rowIndex < currentSizeY) {
        return grid.value[rowIndex]
          .concat(Array.from({ length: gameStore.x - currentSizeX }, () => 'white'));
      } else {
        return Array.from({ length: gameStore.x }, () => 'white')
      }
    })
  }
}

function initializeGrid() {
  grid.value = Array.from({ length: gameStore.y }, () =>
    Array.from({ length: gameStore.x }, () => 'white')
  )
}

function toggleSquareColor(rowIndex: number, colIndex: number) {
  grid.value[rowIndex] = grid.value[rowIndex].map((value, index) =>
    index === colIndex ? (value === 'white' ? 'blue' : 'white') : value
  )
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-text-field v-model="gameStore.x" label="Size X" type="number" @input="drawGrid" />
      </v-col>
      <v-col cols="6">
        <v-text-field v-model="gameStore.y" label="Size Y" type="number" @input="drawGrid" />
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="(row, rowIndex) in grid" :key="rowIndex" class="pa-0" cols="auto">
        <v-row v-for="(col, colIndex) in row" :key="colIndex" no-gutters>
          <v-col cols="auto">
            <v-tooltip left>
              <template v-slot:activator="{ attrs }">
                <div
                  class="grid-cell ma-1"
                  :class="{ 'blue': col === 'blue' }"
                  v-bind="attrs"
                  @mouseover="toggleSquareColor(rowIndex, colIndex)"
                ></div>
              </template>
              <span>{{ col === 'white' ? 'Белый' : 'Синий' }}</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.grid-cell {
  width: 36px;
  height: 36px;
  background-color: #fff;
  border: 1px solid #000;
}

.blue {
  background-color: blue;
}
</style>
