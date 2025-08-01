<template>
  <main>
    <nav_component
      v-if="data"
      :year="data[index].year"
      :number="data[index].number"
      :instructions="data[index].instructions"
      :prev="prev"
      :next="next"
    />
    <div id="container" ref="container"></div>
  </main>
</template>

<script setup>
import nav_component from "@/components/nav.vue";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute } from "vue-router";

import Canvas from "@/utils/Canvas";
// :next="data[index + 1].number || -1"
//     :prev="data[index - 1].number || -1"
const route = useRoute();
const data = ref();
const index = ref();
const container = ref();
let cnv, draw;
const next = computed(() =>
  data.value[index.value + 1] ? data.value[index.value + 1].number : -1
);
const prev = computed(() =>
  data.value[index.value - 1] ? data.value[index.value - 1].number : -1
);

onMounted(async () => {
  //find the number of the current wall drawing from the url
  const drawing_number = route.path.match(/^\/wall-drawing\/(\d+)$/)[1];

  //fetch directory data
  const url = "/src/wall_drawings/directory.json";
  await fetch(url)
    .then((res) => res.json())
    .then((jsonData) => {
      data.value = jsonData.wall_drawings;
      index.value = 1;
      index.value = jsonData.wall_drawings.findIndex(
        (a) => a.number == drawing_number
      );
    });

  //import drawing function
  const wall_drawing_module = await import(
    `/src/wall_drawings/wall_drawing_${drawing_number}`
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

function get_prev() {
  if (data[index - 1]) {
    return data[index - 1].number;
  } else {
    return -1;
  }
}
function get_next() {
  if (data[index + 1]) {
    return data[index + 1].number;
  } else {
    return -1;
  }
}
function handleKeydown(e) {
  if (e.code === "Space") {
    draw(cnv);
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-size: 10pt;
  font-family: monospace;
  font-weight: 100;
  text-align: justify;
  overflow: hidden;
}

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
