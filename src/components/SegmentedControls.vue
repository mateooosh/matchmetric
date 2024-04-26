<template>
  <div class="segmented-controls">
    <div v-for="(segment, i) in props.segments" :key="i" class="segment" :style="getStylesForSegment(segment)"
         @click="onSegmentClick(segment)">
      {{ segment.value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import GameType from '../common/enums/GameType.ts'
import SegmentModel from '../models/SegmentModel.ts'
import CSSVars from '../models/CSSVars.ts'

const props = defineProps({
  segments: Array<SegmentModel>,
  modelValue: {
    default: GameType.OUTSIDE,
    type: String
  }
})

const emit = defineEmits(['update:modelValue'])

const onSegmentClick = (segment: SegmentModel) => {
  emit('update:modelValue', segment.value)
}

const getStylesForSegment = (segment: SegmentModel) => {
  const isActive = props.modelValue === segment.value

  const primaryCSS = CSSVars.getPrimary()
  const primaryColorCSS = CSSVars.getMain()

  return {
    backgroundColor: isActive ? segment.color : 'transparent',
    color: isActive ? 'white' : primaryCSS,
    borderColor: isActive ? segment.color : primaryColorCSS
  }
}
</script>

<style lang="scss" scoped>
.segmented-controls {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 18px;
  font-weight: 500;

  .segment {
    flex: 1;
    padding: 10px $m;
    border: 1px solid var(--main);
    transition: all .2s;
    user-select: none;

    &:nth-child(1) {
      border-bottom-left-radius: $m;
      border-top-left-radius: $m;
    }

    &:last-child {
      border-bottom-right-radius: $m;
      border-top-right-radius: $m;
      border-left: none;
    }
  }
}
</style>
