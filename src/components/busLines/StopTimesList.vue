<template>
  <section v-if="selectedStop" class="stop-times-list">
    <h2 class="stop-times-list-title">
      Bus Stop: {{ selectedStop }}
    </h2>
    <div class="stop-times-list-wrapper">
      <span
        v-for="timeItem in times"
        :key="timeItem"
        class="stop-times-list-item"
      >
        {{ timeItem }}
      </span>
    </div>
  </section>
  <section v-else class="stop-times-placeholder">
    <p>Please select the bus line first</p>
  </section>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const selectedLine = computed(() => store.state.bus.selectedLine);
const selectedStop = computed(() => store.state.bus.selectedStop);

const times = computed(() => store.getters["bus/timesForSelectedStop"]);
</script>

<style lang="scss" scoped>
@use "@/assets/styles/__colors.scss" as *;
@use "@/assets/styles/__typography.scss" as *;

.stop-times-list {
  display: flex;
  flex-direction: column;
  padding: 24px;
  background-color: $color-white;
  border-radius: 4px;
  width: 100%;

  &-wrapper {
    display: flex;
    flex-direction: column;
    max-height: 388px;
    height: 100%;
    overflow: auto;
  }

  &-item {
    padding: 20px 0 19px 0;
  }
}

.stop-times-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 2px dashed $color-dashed-border;
}

</style>