<template>
  <nav :class="{ hidden: hide }">
    <div id="info">
      <div id="title">
        <span>wall drawing #{{ props.number }}</span>
        <span> {{ props.year }}</span>
        <span>sol lewitt</span>
      </div>
      <p>{{ props.instructions }}</p>
    </div>

    <div id="navigation">
      <RouterLink
        :to="`/wall-drawing/${props.prev}`"
        :class="{ disabled: prevSketch }"
        >←</RouterLink
      >
      <RouterLink to="/">🏠︎</RouterLink>
      <RouterLink
        :to="`/wall-drawing/${props.next}`"
        :class="{ disabled: nextSketch }"
        >→</RouterLink
      >
    </div>
  </nav>
</template>

<script setup>
import { defineProps, ref, onMounted, computed } from "vue";
import { RouterLink } from "vue-router";
const props = defineProps(["number", "year", "instructions", "next", "prev"]);
const hide = ref(true);

const nextSketch = computed(() => props.next <= 0);
const prevSketch = computed(() => props.prev <= 0);

onMounted(() => {
  window.addEventListener("mousemove", () => {
    hide.value = false;
    setTimeout(() => (hide.value = true), 10000);
  });
});
</script>

<style scoped>
.disabled {
  color: rgb(125, 125, 125);
  pointer-events: none;
}

nav {
  opacity: 1;
  transition: 1s;
}
.hidden {
  opacity: 0;
}
a {
  text-decoration: none;
  font-size: 14pt;
  color: black;
}

#info {
  padding: 0.5em;
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  transition: 5s;
}

#title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

#navigation {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem;
  background-color: white;
}
</style>
