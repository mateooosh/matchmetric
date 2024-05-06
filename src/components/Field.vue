<template>
  <van-field class="field" v-model="state.innerValue" @update:model-value="onValueChange">
    <template #label>
      <div class="label">
        <span>{{ props.label }}</span>
      </div>
    </template>
    <template v-if="hasInputSlot" #input>
      <slot name="input"/>
    </template>
    <template v-if="hasRightIconSlot" #right-icon>
      <slot name="right-icon"/>
    </template>
  </van-field>
</template>

<script setup lang="ts">
import { computed, reactive, useSlots, watch } from 'vue'

const slots = useSlots()

const props = defineProps({
  modelValue: {
    default: null,
    type: [String, Number]
  },
  label: {
    default: '',
    type: String
  }
})

const state = reactive({
  innerValue: props.modelValue
})

const emit = defineEmits(['update:modelValue'])

const onValueChange = (value: string) => {
  emit('update:modelValue', value)
}

watch(props, (newProps) => {
  state.innerValue = newProps.modelValue
})

const hasInputSlot = computed((): boolean => {
  return !!slots['input']
})

const hasRightIconSlot = computed((): boolean => {
  return !!slots['right-icon']
})

</script>

<style lang="scss" scoped>
.field {
  .label {
    font-size: 18px;
    height: 100%;
    display: flex;
    align-items: center
  }
}
</style>
