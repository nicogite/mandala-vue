<template>
  <!--header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header-->

  <main>

    <div id="mainContainer">

      <MandalaGenerator v-model="mandalaName" ref="mandalaGenerator" @submit-mandala="generateMandala"/>

      <MandalaInterface v-model="mandalaName" ref="mandalaInterface" @page-refresh="pageRefresh"/>

    </div>
    
  </main>


  <OptionMenu />

</template>

<script setup>
import MandalaGenerator from './components/MandalaGenerator.vue'
import MandalaInterface from './components/MandalaInterface.vue'
import { ref, watch } from 'vue'

const mandalaName = ref('');
const mandalaInterface = ref(null)
const mandalaGenerator = ref(null)

function generateMandala(e) {
  mandalaInterface.value.launchMandalaInterface()
}

function pageRefresh(e) {
  console.log('pageRefresh')
  console.log(mandalaGenerator.value);
  mandalaName.value = ''
  mandalaGenerator.value.showGenerator(500)
}
/*watch(mandalaName, (newName, oldName) => {
  console.log('mandalaName in parent (app.vue)');
  console.log(newName);
});*/

</script>

<style>

  body {
      background: no-repeat center/100% url("./img/mandala-bkg.jpg") ;

  }

  ul {
      list-style-type: none;
  }

  #mainContainer {
      position:relative;
      text-align:center;
      width:100%;
      height:100%;
      display:flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }

.animate {
    fill-opacity:0;
}

.animate_0 {
    transition: fill-opacity 0.4s;
    /*transition: stroke-opacity 0.4s;*/
}

.animate_1 {
    transition: fill-opacity 0.8s;
    /*transition: stroke-opacity 0.8s;*/
}

.animate_1 {
    transition: fill-opacity 1.2s;
    /*transition: stroke-opacity 1.2s;*/
}

.animate_2 {
    transition: fill-opacity 1.6s;
    /*transition: stroke-opacity 1.6s;*/
}

.animate_3 {
    transition: fill-opacity 2.0s;
    /*transition: stroke-opacity 2.0s;*/
}
.animate_4 {
    transition: fill-opacity 2.4s;
    /*transition: stroke-opacity 2.4s;*/
}

.animate_5 {
    transition: fill-opacity 2.8s;
    /*transition: stroke-opacity 2.8s;*/
}

.animate_6 {
    transition: fill-opacity 3.2s;
    /*transition: stroke-opacity 3.2s;*/
}

.animate_7 {
    transition: fill-opacity 3.6s;
    /*transition: stroke-opacity 3.6s;*/
}
.animate_8 {
    transition: fill-opacity 4.0s;
    /*transition: stroke-opacity 4.0s;*/
}

.animate_9 {
    transition: fill-opacity 4.4s;
    /*transition: stroke-opacity 4.4s;*/
}

.animate_10 {
    transition: fill-opacity 5.0s;
    /*transition: stroke-opacity 5.0s;*/
}

.animate_11 {
    transition: fill-opacity 5.4s;
    /*transition: stroke-opacity 5.4s;*/
}










</style>