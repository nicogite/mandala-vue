<template>
  <svg id="mandala" ref="mandalaSvg" width="800" height="800"></svg>

  <div id="mandalaTitleContainer">
      <h2 id="mandalaTitle"></h2>
  </div>
 
  <font-awesome-icon :icon="['fas', 'wand-magic-sparkles']" />
  
  <div id="mandalaBtnContainer">
      <MandalaInterfaceButton :icon="fa-wand-magic-sparkles" />
      <MandalaInterfaceButton :icon="fa-rotate-right" />
      <MandalaInterfaceButton :icon="fa-arrow-down-long" />
      <!--a class="btn btn-primary btn-mandala magic-button" href="#">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
          <span class="sr-only">Share on Twitter</span>
      </a>
      <a class="btn btn-primary btn-mandala refresh-button" href="">
          <i class="fa-solid fa-rotate-right"></i>
          <span class="sr-only">Share on Twitter</span>
      </a>
      <a class="btn btn-primary btn-mandala download-button" href="#">
          <i class="fa-solid fa-arrow-down-long"></i>
          <span class="sr-only">Share on Twitter</span>
      </a-->
  </div>
</template>

<script setup>
/*defineProps({
  msg: {
    type: String,
    required: true
  }
})*/

import { ref, onMounted, computed } from 'vue'
import { sleep } from 'helpers/animation.js'
import { generateMandalaSvg } from 'helpers/mandala-draw.js'
import MandalaInterfaceButton from './MandalaInterfaceButton.vue';

const mandalaName = defineModel()

const mandalaSvg = ref(null)
let mandalaHeight = 0;
let mandalaWidth = 0;

onMounted(() => {
  setMandalaSize();
})

function setMandalaSize() {
  // Get the browser window size
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;

  if (windowWidth > windowHeight) {
      mandalaHeight = Math.floor(window.innerHeight * 80 / 100);
      mandalaWidth = mandalaHeight;
  } else {
      mandalaWidth = Math.floor(window.innerWidth * 80 / 100);
      mandalaHeight = mandalaWidth;
  }

  mandala.setAttribute('width', mandalaWidth);
  mandala.setAttribute('height', mandalaHeight);
}

const launchMandalaInterface = async () => {
  console.log('mandalaName in mandala interface', mandalaName.value);

  // Build SVG
  const mandalaOptions = {
    mandalaName : mandalaName.value,
    mandalaSvgIdentifier : 'mandala'
  }
  
  buildMandala(mandalaOptions)
  
  // Show SVG
  await showMandala(500)

}

async function showMandala(ms) {
  mandalaSvg.value.style.display="block"
  await sleep(500) // Time to mandala to be generated... otherwise transition doesn't work
  const mandalaFragCollection = document.getElementsByClassName('animate');

  for (let i = 0; i < mandalaFragCollection.length; i++) {
      mandalaFragCollection[i].style.fillOpacity=1;
      mandalaFragCollection[i].style.strokeOpacity=1;
  }
  return new Promise(resolve => setTimeout(resolve, ms));
}

function buildMandala(mandalaOptions) {
  generateMandalaSvg(mandalaOptions);
  //return new Promise(resolve => setTimeout(resolve, ms));
}

defineExpose({ launchMandalaInterface })

</script>

<style scoped>

#mandala {
  display:none;
  position:absolute;
  left: 50%;
  transform: translateX(-50%);
}

#mandalaTitleContainer {
  position:absolute;
  display:none;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height:10%;
  top:0;
}



</style>
