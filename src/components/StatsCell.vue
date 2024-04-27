<template>
  <div class="cell">
    <slot name="icon"/>
    <div>
      <div class="label">{{ props.label }}</div>
      <div class="value">
        <div>{{ props.value || '-' }}</div>
        <div v-if="props.value" class="unit">
          <slot name="unit" class="unit"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: String,
  value: [String, Number]
})

</script>

<style lang="scss" scoped>
.cell {
  display: flex;
  align-items: center;
  gap: $m;
  padding: $m 0;

  > div {
    display: flex;
    flex-direction: column;
    gap: $xs;
  }

  .label {
    color: var(--tertiary);
    font-weight: 400;
    //font-size: 16px;
  }

  .value {
    display: flex;
    align-items: center;
    gap: $s;
    color: var(--primary);
  }

  .unit {
    font-weight: 400;
    //font-size: 16px;
    color: var(--tertiary);
  }
}
</style>
