<template>
  <div class="settings-view">
    <van-dialog v-model:show="state.showDeleteDialog"
                @confirm="onDeleteDataConfirm"
                title="Delete saved games and settings?"
                message="The games and settings will be permanently deleted and you won't be able to revert it."
                confirm-button-text="Delete"
                confirm-button-color="red"
                close-on-click-overlay
                show-cancel-button/>
    <van-nav-bar
        title="Settings"
        left-arrow
        @click-left="onClickLeft"/>
    <div class="content">
      <van-cell-group inset>
        <van-collapse v-model="state.selectedCollapseItem">
          <van-collapse-item title="Attributes" :name="1">
            <van-cell title="Goals">
              <template #icon>
                <BallIcon color="#333" height="24px" width="24px"/>
              </template>
              <template #right-icon>
                <van-switch :model-value="true" active-color="#5DB075" size="30px" disabled/>
              </template>
            </van-cell>

            <van-cell title="Assists">
              <template #icon>
                <AssistIcon color="#333" height="24px" width="24px"/>
              </template>
              <template #right-icon>
                <van-switch :model-value="true" active-color="#5DB075" size="30px" disabled/>
              </template>
            </van-cell>

            <van-cell title="Distance">
              <template #icon>
                <MeasureIcon color="green" height="24px" width="24px"/>
              </template>
              <template #right-icon>
                <van-switch v-model="settingsStore.settings.showDistance" active-color="#5DB075" size="30px"/>
              </template>
            </van-cell>

            <van-cell title="Duration">
              <template #icon>
                <TimerIcon color="green" height="24px" width="24px"/>
              </template>
              <template #right-icon>
                <van-switch v-model="settingsStore.settings.showDuration" active-color="#5DB075" size="30px"/>
              </template>
            </van-cell>

            <van-cell title="Calories">
              <template #icon>
                <FireIcon color="#F29D38" height="24px" width="24px"/>
              </template>
              <template #right-icon>
                <van-switch v-model="settingsStore.settings.showCalories" active-color="#5DB075" size="30px"/>
              </template>
            </van-cell>
          </van-collapse-item>
        </van-collapse>
      </van-cell-group>

      <van-cell-group inset>
        <van-cell title="Performance" @click="router.push({ name: 'performance' })" is-link/>
      </van-cell-group>

      <van-cell-group inset>
        <van-cell @click="deleteData" title="Delete data" label="Delete saved games and settings">
          <template #right-icon>
            <TrashIcon color="#969799" height="24px" width="24px"/>
          </template>
        </van-cell>
        <van-cell @click="exportData" title="Export data" label="Export saved games and settings">
          <template #right-icon>
            <ExportIcon color="#969799" height="24px" width="24px"/>
          </template>
        </van-cell>
        <van-cell @click="importData" title="Import data" label="Import games and settings">
          <template #right-icon>
            <ImportIcon color="#969799" height="24px" width="24px"/>
            <input @change="onImportedFileChange" type="file" ref="importInput" style="display: none;"/>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { reactive, ref, watch } from 'vue'
import useSettingsStore from '../stores/settingsStore.ts'
import BallIcon from '../common/icons/BallIcon.vue'
import AssistIcon from '../common/icons/AssistIcon.vue'
import MeasureIcon from '../common/icons/MeasureIcon.vue'
import TimerIcon from '../common/icons/TimerIcon.vue'
import FireIcon from '../common/icons/FireIcon.vue'
import ExportIcon from '../common/icons/ExportIcon.vue'
import ImportIcon from '../common/icons/ImportIcon.vue'
import useGamesStore from '../stores/gamesStore.ts'
import GameModel from '../models/GameModel.ts'
import * as _ from 'lodash'
import { showNotify } from 'vant'
import TrashIcon from '../common/icons/TrashIcon.vue'

const router = useRouter()
const settingsStore = useSettingsStore()
const gamesStore = useGamesStore()

const importInput = ref()

const state = reactive({
  selectedCollapseItem: [],
  showDeleteDialog: false
})

watch(settingsStore.settings, () => {
  settingsStore.setSettingsIsLocalStorage()
})

const onClickLeft = () => {
  router.push({ name: 'home' })
}

const deleteData = () => {
  state.showDeleteDialog = true
}

const onDeleteDataConfirm = () => {
  gamesStore.clear()
  settingsStore.clear()
  showNotify({ type: 'success', message: 'Games and settings has been deleted', position: 'bottom' })
}

const exportData = () => {
  const object = {
    games: gamesStore.games,
    settings: settingsStore.settings
  }

  exportToJSON(object)
}

const importData = () => {
  importInput.value.click()
}

const exportToJSON = (json: object) => {
  const dataStr = JSON.stringify(json)
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
  const exportFileDefaultName = 'matchmetric.json'
  const linkElement = document.createElement('a')

  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', exportFileDefaultName)
  linkElement.click()
}

const onImportedFileChange = (event: Event) => {
  const file = event.target.files[0]
  event.target.value = null

  const fr = new FileReader()

  fr.onload = event => {
    try {
      let { games, settings } = JSON.parse(event.target.result)
      games = _.map(games, game => GameModel.fromJSON(game))

      gamesStore.concatGames(games)
      settingsStore.assignSettings(settings)

      showNotify({ type: 'success', message: 'Imported successfully', position: 'bottom' })

      router.push({ name: 'home' })
    } catch {
      showNotify({ type: 'danger', message: 'Something went wrong', position: 'bottom' })
    }
  }

  fr.readAsText(file)
}

</script>

<style scoped lang="scss">
.settings-view {
  --van-nav-bar-height: 60px;
  --van-nav-bar-background: #5DB075;
  --van-nav-bar-title-text-color: white;
  --van-nav-bar-arrow-size: 32px;
  --van-nav-bar-icon-color: white;
  --van-collapse-item-content-padding: 0 0 0 16px;

  --van-cell-font-size: 18px;
  --van-cell-vertical-padding: 16px;

  --van-cell-group-inset-padding: 16px;

  display: flex;
  flex-direction: column;
  background-color: #eff2f5;

  > .content {
    flex: 1;
    overflow: auto;
  }

  .van-cell {
    align-items: center;
    gap: $m;
  }
}
</style>