<template>
  <div id="mandalaTitleContainer" ref="mandalaTitleContainer">
    <h3>The Mandala Project</h3>
    <h2 id="mandalaTitle">{{ mandalaName }}</h2>
  </div>

  <svg id="mandala" ref="mandalaSvg" width="800" height="800"></svg>

  
  
  <div id="mandalaBtnContainer" ref="mandalaBtnContainer">
      <MandalaInterfaceButton ref="magicButton" symbol="fa-wand-magic-sparkles" class="magic-button"/>
      <MandalaInterfaceButton ref="refreshButton" symbol="fa-rotate-right"  class="refresh-button" @click="reset"/>
      <MandalaInterfaceButton ref="downloadButton" symbol="fa-arrow-down-long"  class="download-button"/>
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
const emit = defineEmits(['pageRefresh'])
const mandalaSvg = ref(null)
const magicButton = ref(null)
const refreshButton = ref(null)
const downloadButton = ref(null)
const mandalaBtnContainer = ref(null)
const mandalaTitleContainer = ref(null)
let mandalaHeight = 0;
let mandalaWidth = 0;
const mandalaFragmentDelay = 0.15;

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
    mandalaSvgIdentifier : 'mandala',
    fillOpacityDelay: mandalaFragmentDelay
  }
  
  buildMandala(mandalaOptions)
  
  // Show SVG
  await showMandala(500)

  showMandalaButtons();
  showTitle();

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

async function reset() {
  hideTitle();
  await hideMandala(12 * mandalaFragmentDelay + 1000)
  await hideMandalaButtons(500);
  mandalaSvg.value.style.display="none"
  emit('pageRefresh')

}

function showMandalaButtons() {
  mandalaBtnContainer.value.style.display = 'block';
}

function showTitle() {
  mandalaTitleContainer.value.style.display = 'block';
  mandalaTitleContainer.value.style.opacity = 1;
}

async function hideTitle() {
  mandalaTitleContainer.value.style.opacity = 0;
  await sleep(500);
  mandalaTitleContainer.value.style.display = 'none';
}

async function hideMandalaButtons(ms) {
  mandalaBtnContainer.value.style.display = 'none';
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function hideMandala(ms) {
  const mandalaFragCollection = document.getElementsByClassName('animate');

  for (let i = 0; i < mandalaFragCollection.length; i++) {
      mandalaFragCollection[i].style.fillOpacity=0;
      mandalaFragCollection[i].style.strokeOpacity=0;
  }
  return new Promise(resolve => setTimeout(resolve, ms));
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



#mandalaBtnContainer {
  position: absolute;
  bottom:0px;
  display:none;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height:10%;
  
}

#mandalaTitleContainer {
  position:absolute;
  display:none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height:10%;
  top:0;
  transition: opacity 0.5s ease;
  opacity:0
}

#mandalaTitleContainer h3,
#mandalaTitleContainer h2
{
  color: #277696; 
}

#mandalaTitleContainer h3 {
  font-size: medium;
  font-weight:700;
  margin-top:10px;
}

#mandalaTitleContainer h2 {
  font-size: xx-large;
  font-weight:700;
  margin-top:10px;
}

</style>
