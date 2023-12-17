<template>
  <div class="segmented-controls">
    <div v-for="(segment, i) in props.segments" :key="i" :class="getClassesForControl(segment)" @click="onSegmentClick(segment)">
      {{ segment }}
    </div>
  </div>
</template>

<script setup lang="ts">
import GAME_TYPE from '../common/enums/GAME_TYPE.ts'

const props = defineProps({
  segments: Array<string>,
  modelValue: {
    default: GAME_TYPE.OUTSIDE,
    type: String
  }
})

const emit = defineEmits(['update:modelValue'])

const onSegmentClick = (segment: string) => {
  emit('update:modelValue', segment)
}

const getClassesForControl = (segment: string): Array<string> => {
  const classes = ['segment']

  if (props.modelValue === segment) {
    classes.push('active')
  }

  return classes
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
    padding: $m $m;
    border: 1px solid $bc;
    transition: background-color .2s;

    &.active {
      background-color: $bc;
      color: $white;
    }

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
