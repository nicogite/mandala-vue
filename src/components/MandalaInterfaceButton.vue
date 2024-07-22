<template>
    <a class="btn btn-primary btn-mandala" href="#">
        <font-awesome-icon :icon="['fas', symbol]" />
    </a>
</template>

<script setup>
    import { defineProps } from 'vue'
    defineProps(['symbol'])


</script>

<style scoped>

.btn-mandala {
    border-radius:50%;
    display:inline-flex;
    flex-direction:column;
    justify-content:center;
    height:3rem;
    padding:0;
    position:relative;
    text-align:center;
    transform-origin:center;
    transition:all 0.25s;
    width:3rem;
    margin:0 10px;
     
  }

 .btn-mandala:hover {
    transform:scale(1.2);
}  

  @keyframes pop {
    0% {
      clip-path:circle(5%);
      transform:scale(0.5);
    }
    100% {
      clip-path:circle(50%);
      transform:scale(1);
    }
  }

  .refresh-button,
  .download-button,
  .magic-button {
    color: #015C7B;
    background-color: #fff;
    border-color: #015C7B;
  }

  .btn {
    font-weight: 400;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid;
    font-size: 1rem;
    line-height: 1.5;
  }

  .btn-social:not(.btn-hexagon).inview {
    -webkit-animation: pop 0.5s ease-in-out;
    animation: pop 0.5s ease-in-out;
  }

  .fab {
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    line-height: 1;
  }

  .fab {
    font-family: "Font Awesome 5 Brands";
  }



</style>