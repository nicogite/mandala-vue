<template>
    <div id="blueDisc" ref="mandalaGeneratorBackground">

      <div id="blueBackground">
        
      </div>
  
      <div id="backgroundShadow"></div>

      <div id="discContent">
          <h1>The Mandala Project</h1>
  
          <p></p>
          
          <input  
            id="checkbox"
            class="c-checkbox"
            type="checkbox">
          <div class="c-formContainer">
              <form class="c-form" @submit.prevent="onSubmit">
                  <input
                    id="mandala_name_input"
                    ref="mandalaNameInput"
                    class="c-form__input"
                    placeholder="Entrer votre mot"
                    type="name"
                    v-model="mandalaName"
                    @keydown.enter="submitMandalaName"
                    required>

                  <label class="c-form__buttonLabel">

                      <button id="mandala_generator_button"
                              ref="mandalaGeneratorButton"
                              class="c-form__button"
                              type="button"
                              @click="submitMandalaName">
                          
                        <img src="/img/BlueButton.png" />

                      </button>

                  </label>
                  
                  <label
                    id="introLabel"
                    class="c-form__toggle"
                    for="checkbox"
                    data-title="C'est parti !"
                    @click="focusOnInput">
                  </label>
              </form>
          </div>
  
      </div>
  
      <img id="settingsButton" src="/img/Settings.png" />
  
    </div>
  </template>

<script setup>

import { ref, onMounted } from 'vue'
import { sleep } from 'helpers/animation.js'

const mandalaName = defineModel()

const emit = defineEmits(['submitMandala'])

const mandalaNameInput = ref(null)
const mandalaGeneratorButton = ref(null)
const mandalaGeneratorBackground = ref(null)

const delay = 500
const delayInSecond = '0.5s'

onMounted(() => {
  mandalaGeneratorButton.value.style.transition=('transform '+delay)
  mandalaGeneratorBackground.value.style.transition = 'opacity '+delayInSecond
})

async function submitMandalaName (e) {

    await rotateGeneratorButton(delay)
    await hideGenerator(delay)
    await rotateGeneratorButton(delay, true)
    emit('submitMandala')
}

async function focusOnInput() {
  await sleep(400)
  console.log('focus')
  mandalaNameInput.value.focus()
}

function rotateGeneratorButton(ms, resetButton = false) {
  const rotation = resetButton? 1:-1;
  mandalaGeneratorButton.value.style.transform=`rotate(${rotation * 360}deg)`
  return new Promise(resolve => setTimeout(resolve, ms));
}

function hideGenerator(ms) {

  mandalaGeneratorBackground.value.style.opacity=0
  return new Promise(resolve => setTimeout(resolve, ms));
}

function showGenerator(ms) {
  mandalaGeneratorBackground.value.style.opacity=1
  return new Promise(resolve => setTimeout(resolve, ms));
}


defineExpose({ showGenerator })




</script>



<style scoped>

#blueDisc {
  width:100%;
  height:100%;
  background: no-repeat url("../img/BlueDisc.png");
  background-position:center;
  margin-left:auto;
  margin-right:auto;
  opacity:100;
}

#backgroundShadow {
  position:absolute;
  width:771px;
  height: 771px;
  left: 50%;
  top:50%;
  transform: translate(-50%, -50%);
  z-index:-1;
  border-radius:50%;
  box-shadow:0 0.250em 0.6300em rgba(0, 0, 0, 0.4)
}

#blueBackground {
  border-radius:50%;
  width:0;
  height:0;
  transition: width 2s;
  transition: height 2s;
  z-index:0;
  background-color: #005B7A;
  
}

#discContent {
  position:relative;
  height:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  text-align:center;
  color:#fff;
  font-size: xx-large;
  font-weight:700;
  margin: 21px 0 41px 0;
}

#introLabel::before {
  font-weight:700;
}

#settingsButton {
  position:absolute;
  bottom:12%;
  left: 50%;
  transform: translateX(-50%);
  cursor:pointer;
}




/* Mandala Input Style */
body {
  font-size: 10px;
  font-family: Roboto, sans-serif;
  /*background-color: #ff7b73;*/
  margin: 0;
  display: grid;
  height: 100vh;
  place-items: center;
}

.c-checkbox {
  display: none;
}
.c-checkbox:checked + .c-formContainer .c-form {
  width: 37.5em;
}
.c-checkbox:checked + .c-formContainer .c-form__toggle {
  visibility: hidden;
  opacity: 0;
  transform: scale(0.7);
}
.c-checkbox:checked + .c-formContainer .c-form__input,
.c-checkbox:checked + .c-formContainer .c-form__buttonLabel {
  transition: 0.2s 0.1s;
  visibility: visible;
  opacity: 1;
  transform: scale(1);
}

.c-formContainer,
.c-form,
.c-form__toggle {
  width: 20em;
  height: 6.25em;
}

.c-formContainer {
  position: relative;
  font-weight: 700;
}

.c-form,
.c-form__toggle {
  position: absolute;
  border-radius: 6.25em;
  background-color: #ffffff;
  transition: 0.2s;
}

.c-form {
  left: 50%;
  transform: translateX(-50%);
  padding: 0.625em;
  box-sizing: border-box;
  box-shadow: 0 0.125em 0.3125em rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
}

.c-form__toggle {
  /*color: #ff7b73;*/
  color:#277696;
  top: 0;
  cursor: pointer;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.c-form__toggle::before {
  font-size: 1.75em;
  content: attr(data-title);
}

.c-form__input,
.c-form__button {
  font: inherit;
  border: 0;
  outline: 0;
  border-radius: 5em;
  box-sizing: border-box;
}

.c-form__input,
.c-form__buttonLabel {
  font-size: 1.75em;
  opacity: 0;
  visibility: hidden;
  transform: scale(0.7);
  transition: 0s;
}

.c-form__input {
  /*color: #ffcccc;*/
  color:#4287A6;
  height: 100%;
  width: 100%;
  padding: 0 0.714em;
}
.c-form__input::placeholder {
  color: currentColor;
}
.c-form__input:required:valid {
  /*color: #ff7b73;*/
  color: #277696;
  font-weight:700;
}
.c-form__input:required:valid + .c-form__buttonLabel {
  color: #ffffff;
}

.c-form__buttonLabel {
  color: #ffaea9;
  height: 100%;
  width: auto;
}
.c-form__buttonLabel::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.c-form__button {
  color: inherit;
  padding: 0;
  height: 100%;
  /*width: 5em;*/
  /*background-color: #ff7b73;*/
  /*background-color:#277696;*/
  cursor:pointer;
  transition:1s;
}


</style>
