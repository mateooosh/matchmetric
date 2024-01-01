<template>
  <div class="segmented-controls">
    <div v-for="(segment, i) in props.segments" :key="i" class="segment" :style="getStylesForSegment(segment)"
         @click="onSegmentClick(segment)">
      {{ segment.value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import GAME_TYPE from '../common/enums/GAME_TYPE.ts'
import SegmentModel from '../models/SegmentModel.ts'

const props = defineProps({
  segments: Array<SegmentModel>,
  modelValue: {
    default: GAME_TYPE.OUTSIDE,
    type: String
  }
})

const emit = defineEmits(['update:modelValue'])

const onSegmentClick = (segment: SegmentModel) => {
  emit('update:modelValue', segment.value)
}

const getStylesForSegment = (segment: SegmentModel) => {
  const isActive = props.modelValue === segment.value
  return {
    backgroundColor: isActive ? segment.color : 'transparent',
    color: isActive ? 'white' : '#323233',
    borderColor: isActive ? segment.color : '#5DB075'
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
    padding: 12px $m;
    border: 1px solid $bc;
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
