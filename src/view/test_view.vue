<template>
  <main>
    <div id="container" ref="container"></div>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

import Canvas from "../../public/utils/Canvas";
const container = ref();
let cnv, draw;

onMounted(async () => {
  //find the number of the current wall drawing from the url
  const drawing_number = 160; // <--wall drawing to test

  //import drawing function
  const wall_drawing_module = await import(
    `/wall_drawings/wall_drawing_${drawing_number}.js`
  );
  draw = wall_drawing_module.draw;

  //setup canvas and draw initial drawing
  const width = window.innerWidth;
  const height = window.innerHeight;

  cnv = new Canvas(container.value, width, height);
  draw(cnv);

  //add eventlistener for redrawing
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});

function handleKeydown(e) {
  if (e.code === "Space") {
    draw(cnv);
  }
}
</script>

<style scoped>
main {
  width: 100vw;
  height: 100vh;
}

#container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
}
</style>
