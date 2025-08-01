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
        <p id="disclaimer">
          This project is a non-commercial, educational reinterpretation of
          works by Sol LeWitt. All rights to the original artworks remain with
          their respective rights holders.
        </p>
      </div>
      <img src="../../public/sol_lewitt.jpeg" alt="" />
    </div>
    <div id="TOC" v-if="data">
      <RouterLink
        v-for="drawing in data"
        class="drawing_link"
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
  const url = "/wall_drawings/directory.json";
  await fetch(url)
    .then((res) => res.json())
    .then((jsonData) => {
      data.value = jsonData.wall_drawings;
      console.log(data);
    });
});
</script>

<style scoped>
img {
  width: 50%;
  height: auto;
  align-self: center;
}

#sidebar {
  padding: 2em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3em;
}

h1 {
  font-size: 14pt;
  background-color: black;
  color: white;
  padding: 0.25em 0.5em;
  width: min-content;
  white-space: nowrap;
}

#description p {
  margin-bottom: 1em;
}

#TOC {
  padding: 2em;
  margin-top: 2em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 2rem;
}
#disclaimer {
  font-style: italic;
  color: gray;
}

@media (min-width: 1024px) {
  * {
    overflow: hidden;
  }

  main {
    display: grid;
    grid-template-columns: 2fr 5fr;
  }

  #TOC {
    margin-top: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  #sidebar {
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1em;
  }
}
/* main {
  display: grid;
  grid-template-columns: 2fr 7fr;
}
#description p {
  margin-bottom: 1em;
}
#TOC {
  padding: 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem;
}
a {
  text-decoration: none;
}
img {
  width: 50%;
  height: auto;
  align-self: center;
}
.drawing_link {
  height: min-content;
  color: black;
  transition: 0.5s;
}
.drawing_link:hover {
  color: blue;
}
#disclaimer {
  font-style: italic;
  color: gray;
} */
</style>
