<template>
  <h1 class="app-title">Timetable</h1>
  <MainNavigation />
  <router-view></router-view>
</template>

<script lang="ts" setup>
import MainNavigation from "@/components/navigation/MainNavigation.vue";
import { useStore } from "vuex";
import { onMounted } from "vue";

const store = useStore();

onMounted(() => {
  store.dispatch("bus/fetchStopsData");
});
</script>

<style lang="scss">
@use "@/assets/styles/__colors.scss" as *;
@use "@/assets/styles/__typography.scss" as *;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border: 0;
}

body {
  display: flex;
  justify-content: center;
  background-color: $color-app-background !important;
  padding: 40px 32px;
}

#app {
  display: flex;
  gap: 16px;
  max-width: 1376px;
  width: 100%;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
}

.app-title {
  font: 600 24px/32px $font-family;
  color: $color-heading-text;
  margin-bottom: 11px;
}
</style>
