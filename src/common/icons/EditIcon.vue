<template>
  <!--  https://www.svgrepo.com/svg/488103/soccer-arena?edit=true-->
  <!--  <svg viewBox="0 0 24 24" :fill="props.color" :width="props.width" :height="props.height"-->
  <!--       xmlns="http://www.w3.org/2000/svg">-->
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" :fill="props.color" :width="props.width" :height="props.height">
    <g stroke-width="0"></g>
    <g stroke-linecap="round" stroke-linejoin="round"></g>
    <g><title></title>
      <g>
        <g>
          <g>
            <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" :stroke="props.color"
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
            <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" :stroke="props.color"
                     stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon>
          </g>
        </g>
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: 'none'
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
