<template>
  <div class="button" @click="onClick">
    {{ props.label }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: String
})

const emit = defineEmits(['click'])
const onClick = () => {
  emit('click')
}
</script>

<style lang="scss" scoped>
.button {
  padding: $l $xl;
  background-color: var(--main);
  color: white;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  border-radius: $xl;
}
</style>
