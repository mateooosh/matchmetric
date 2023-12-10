<template>
  <div class="navbar">
    <StadiumIcon width="50px" height="50px"/>
    <div data-cy="header-title">Matchmetric</div>
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
  gap: $m;
  width: 100%;
  background-color: $bc;
  color: $white;
  font-size: $xxl;
  font-weight: 500;
  padding: $xl 0;
}
</style>
