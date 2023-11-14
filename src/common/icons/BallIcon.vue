<template>
  <!--  https://www.svgrepo.com/svg/488103/soccer-arena?edit=true-->
  <svg class="ball-icon" :fill="props.color" :width="props.width" :height="props.height" version="1.1"
       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
       xml:space="preserve"><g stroke-width="0"></g>
    <g stroke-linecap="round" stroke-linejoin="round"></g>
    <g> <g> <g> <path
        d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M256,38.4 c26.959,0,52.768,4.916,76.595,13.88L256,119.3l-76.595-67.02C203.232,43.316,229.041,38.4,256,38.4z M38.637,265.979 c-0.15-3.309-0.237-6.634-0.237-9.979c0-50.898,17.48-97.711,46.757-134.772l39.918,93.195L38.637,265.979z M75.379,377.382 l99.706-9.048l22.112,97.219C146.847,451.452,103.873,419.7,75.379,377.382z M203.816,337.266v-0.001l-32.251-99.26L256,176.663 l84.435,61.343l-32.251,99.26H203.816z M314.803,465.553l22.112-97.219l99.706,9.048 C408.127,419.7,365.153,451.452,314.803,465.553z M386.925,214.423l39.918-93.195C456.12,158.289,473.6,205.101,473.6,256 c0,3.345-0.087,6.67-0.237,9.979L386.925,214.423z"></path> </g> </g> </g></svg>

</template>

<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: '#fff'
  },
  width: {
    type: String,
    default: '36px'
  },
  height: {
    type: String,
    default: '36px'
  }
})
</script>

<style scoped lang="scss">

</style>