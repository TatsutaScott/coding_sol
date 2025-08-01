<template>
  <main>
    <div id="sidebar">
      <h1>coding sol</h1>
      <div id="description">
        <p>
          Sol LeWitt was a pioneering figure in conceptual and minimalist art,
          best known for his wall drawings and structures based on simple
          geometric rules. Rather than focusing on the physical act of creation,
          LeWitt emphasized the primacy of the idea—often providing written
          instructions for others to carry out, making the execution secondary
          to the concept itself.
        </p>
        <p>
          This project reimagines LeWitt’s approach through code, translating
          his rule-based instructions into generative algorithms. Each piece is
          procedurally drawn in the browser, echoing the systematic beauty of
          LeWitt’s originals while exploring how his ideas resonate in digital
          space. The result is a body of work where the machine becomes the
          drafter, and the artwork lives in the logic.
        </p>
      </div>
      <img src="../../public/sol_lewitt.jpeg" alt="" />
    </div>
    <div id="TOC" v-if="data">
      <RouterLink
        v-for="drawing in data"
        :to="`/wall-drawing/${drawing.number}`"
        >wall drawing #{{ drawing.number }}</RouterLink
      >
    </div>

    <!-- <RouterLink to="/wall-drawing" /> -->
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";

import { RouterLink } from "vue-router";
const data = ref();
onMounted(async () => {
  //fetch directory data
  const url = "/src/wall_drawings/directory.json";
  await fetch(url)
    .then((res) => res.json())
    .then((jsonData) => {
      data.value = jsonData.wall_drawings;
      console.log(data);
    });
});
</script>

<style scoped>
main {
  display: grid;
  grid-template-columns: 1fr 3fr;
}
#sidebar {
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#description p {
  margin-bottom: 1em;
}
#TOC {
  padding: 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
a {
  text-decoration: none;
}
img {
  width: 50%;
  height: auto;
  align-self: center;
}
</style>
