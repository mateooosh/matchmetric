<template>
  <!--  https://www.svgrepo.com/svg/488103/soccer-arena?edit=true-->
  <svg :fill="props.color" :width="props.width" :height="props.height" version="1.1"
       xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"
       xml:space="preserve"><g stroke-width="0"></g>
    <g stroke-linecap="round" stroke-linejoin="round"></g>
    <g> <g> <g> <path
        d="M507.095,483.424l-84.905-84.905l-43.399,43.399c-3.27,3.27-7.553,4.905-11.835,4.905s-8.566-1.635-11.835-4.905 c-6.539-6.533-6.539-17.137,0-23.671l43.399-43.399l-47.35-47.35l-35.512,35.512c-3.27,3.27-7.553,4.905-11.835,4.905 c-4.282,0-8.566-1.635-11.835-4.905c-6.539-6.533-6.539-17.137,0-23.671l35.512-35.512l-47.348-47.348l-43.397,43.397 c-3.27,3.27-7.553,4.905-11.835,4.905c-4.282,0-8.566-1.635-11.835-4.905c-6.539-6.533-6.539-17.133,0-23.671l43.397-43.397 l-47.35-47.35l-35.509,35.509c-3.27,3.27-7.553,4.905-11.835,4.905c-4.282,0-8.566-1.635-11.835-4.905 c-6.539-6.533-6.539-17.133,0-23.671l35.509-35.509l-47.35-47.35l-43.403,43.403c-3.27,3.27-7.553,4.905-11.835,4.905 c-4.282,0-8.566-1.635-11.835-4.905c-6.539-6.533-6.539-17.132,0-23.671l43.403-43.403L28.575,4.906 c-4.784-4.79-11.988-6.224-18.244-3.629C4.076,3.865,0.001,9.968,0.001,16.741v478.52c0,9.247,7.498,16.74,16.74,16.74h478.52 c6.767,0,12.871-4.076,15.464-10.332C513.318,495.412,511.879,488.208,507.095,483.424z M268.25,401.23 c-2.594,6.255-8.697,10.332-15.464,10.332H117.179c-9.241,0-16.74-7.493-16.74-16.74V259.221c0-6.767,4.076-12.876,10.332-15.464 c6.256-2.588,13.449-1.166,18.244,3.629l135.606,135.602C269.405,387.771,270.843,394.975,268.25,401.23z"></path> </g> </g> </g></svg>
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
