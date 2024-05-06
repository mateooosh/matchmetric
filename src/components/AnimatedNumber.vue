<template>
  {{ displayNumber }}
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'

const state = reactive({
  displayNumber: 1,
  interval: null
})

const props = defineProps({
  number: {
    default: 1,
    type: Number
  }
})

onMounted(() => {
  let change = (props.number - state.displayNumber) / 20
  state.interval = setInterval(() => {
    if (state.displayNumber < props.number) {
      state.displayNumber = (state.displayNumber + change) >= props.number ? props.number : state.displayNumber + change
    } else {
      state.displayNumber = props.number
      clearInterval(state.interval)
    }
  }, 20)
})

const displayNumber = computed(() => state.displayNumber.toFixed(1) === '10.0' ? '10' : state.displayNumber.toFixed(1))

</script>
