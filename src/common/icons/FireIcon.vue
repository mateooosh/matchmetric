<template>
  <!--  https://www.svgrepo.com/svg/488103/soccer-arena?edit=true-->
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
       viewBox="0 0 1200 1200" enable-background="new 0 0 1200 1200" xml:space="preserve" :fill="props.color" :width="props.width" :height="props.height"><g stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier"> <sodipodi:namedview inkscape:cy="580.6024" inkscape:cx="312.39671"
                                                     inkscape:zoom="0.37249375" showgrid="false" id="namedview30"
                                                     guidetolerance="10" gridtolerance="10" objecttolerance="10"
                                                     borderopacity="1" bordercolor="#666666" pagecolor="#ffffff"
                                                     inkscape:current-layer="svg2" inkscape:window-maximized="1"
                                                     inkscape:window-y="24" inkscape:window-height="876"
                                                     inkscape:window-width="1535" inkscape:pageshadow="2"
                                                     inkscape:pageopacity="0"
                                                     inkscape:window-x="65"> </sodipodi:namedview>
      <path inkscape:connector-curvature="0"
            d="M381.64,1200C135.779,1061.434,71.049,930.278,108.057,751.148 c27.321-132.271,116.782-239.886,125.36-371.903c38.215,69.544,54.183,119.691,58.453,192.364 C413.413,422.695,493.731,216.546,498.487,0c0,0,316.575,186.01,337.348,466.98c27.253-57.913,40.972-149.892,13.719-209.504 c81.757,59.615,560.293,588.838-64.818,942.524c117.527-228.838,30.32-537.611-173.739-680.218 c13.628,61.319-10.265,290.021-100.542,390.515c25.014-167.916-23.8-238.918-23.8-238.918s-16.754,94.054-81.758,189.065 C345.537,947.206,304.407,1039.291,381.64,1200L381.64,1200z"></path> </g></svg>
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
