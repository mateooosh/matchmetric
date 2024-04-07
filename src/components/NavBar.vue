<template>
  <div class="navbar">
    <StadiumIcon width="50px" height="50px"/>
    <div data-cy="header-title">MATCHMETRIC</div>
  </div>
</template>

<script setup lang="ts">
import StadiumIcon from '../common/icons/StadiumIcon.vue'
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $l;
  width: 100%;
  background-color: var(--main);
  color: $white;
  font-size: $xl;
  font-weight: 700;
  font-style: italic;
  letter-spacing: 1px;
  padding: $xl 0;
}
</style>
