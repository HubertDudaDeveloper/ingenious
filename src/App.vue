<template>
  <h1>Timetable</h1>
  <MainNavigation />
  <router-view></router-view>
</template>

<script lang="ts" setup>
import MainNavigation from "@/components/navigation/MainNavigation.vue";
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'

const store = useStore()

const lines = computed(() => store.getters['bus/allLines'])
const stops = computed(() => store.getters['bus/stopsForSelectedLine'])
const times = computed(() => store.getters['bus/timesForSelectedStop'])

onMounted(() => {
  store.dispatch('bus/fetchStopsData')
})

</script>

<style lang="scss">
@use '@/assets/styles/__colors.scss' as *;

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
}

#app {
    display: flex;
    gap: 16px;
    max-width: 1376px;
    width: 100%;
    flex-direction: column;
    min-height: 100vh;
    height: 100%;
    padding: 40px 32px;
}


</style>
