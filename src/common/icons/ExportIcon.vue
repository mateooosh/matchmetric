<template>
  <!--  https://www.svgrepo.com/svg/488103/soccer-arena?edit=true-->
  <svg :fill="props.color" :width="props.width" :height="props.height" viewBox="0 0 35 35" data-name="Layer 2"
       xmlns="http://www.w3.org/2000/svg">
    <g stroke-width="0"></g>
    <g stroke-linecap="round" stroke-linejoin="round"></g>
    <g>
      <path
          d="M17.5,23.1a1.25,1.25,0,0,1-1.25-1.25V3.154a1.25,1.25,0,0,1,2.5,0V21.848A1.25,1.25,0,0,1,17.5,23.1Z"></path>
      <path
          d="M9.371,11.163a1.251,1.251,0,0,1-.884-2.134l6.751-6.751a3.2,3.2,0,0,1,4.524,0l6.752,6.751A1.25,1.25,0,0,1,24.746,10.8L18,4.046a.7.7,0,0,0-.99,0L10.254,10.8A1.243,1.243,0,0,1,9.371,11.163Z"></path>
      <path
          d="M31.436,34.466H3.564A3.317,3.317,0,0,1,.25,31.153V22.415a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.813H31.436a.815.815,0,0,0,.814-.813V22.415a1.25,1.25,0,0,1,2.5,0v8.738A3.317,3.317,0,0,1,31.436,34.466Z"></path>
    </g>
  </svg>
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
