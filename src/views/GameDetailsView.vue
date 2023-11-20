<template>
  <div class="game-details-view">
    Game details view
    {{game}}
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import useGamesStore from '../stores/gamesStore.ts'
import GameModel from '../models/GameModel.ts'

const route = useRoute()
const store = useGamesStore()

const game: GameModel = store.getGameByTimestamp(Number(route.params.id))
</script>

<style scoped lang="scss">

</style>