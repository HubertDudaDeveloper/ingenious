<template>
  <section v-if="selectedLine" class="bus-stops-list">
    <h2 class="bus-stops-list-title">
      Bus Line: {{ selectedLine }}
    </h2>
    <div class="bus-stops-list-wrapper">
      <span
        v-for="stopItem in stops"
        :key="stopItem.stop"
        class="bus-stops-list-item"
        :class="{ 'bus-stops-list-item__active': stopItem.stop === selectedStop }"
        @click="handleClick(stopItem.stop)"
      >
        {{ stopItem.stop }}
      </span>
    </div>
  </section>
  <section v-else class="bus-stops-placeholder">
    <p>Please select the bus line first</p>
  </section>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const selectedLine = computed(() => store.state.bus.selectedLine);
const selectedStop = computed(() => store.state.bus.selectedStop);

const stops = computed(() => store.getters["bus/stopsForSelectedLine"]);

const handleClick = (stop: string) => {
  store.dispatch("bus/selectStop", stop);
}

</script>

<style lang="scss" scoped>
@use "@/assets/styles/__colors.scss" as *;
@use "@/assets/styles/__typography.scss" as *;

.bus-stops-list {
  display: flex;
  flex-direction: column;
  padding: 24px 24px 24px 0;
  background-color: $color-white;
  border-radius: 4px;
  width: 100%;

  &-title {
    padding-left: 24px;
  }

  &-wrapper {
    display: flex;
    flex-direction: column;
    max-height: 388px;
    height: 100%;
    overflow: auto;
  }

  &-item {
    padding: 20px 0 19px 0;
    font: 400 12px/16px $font-family;
    padding-left: 24px;
    transition-duration: 0.25s;
    cursor: pointer;

    &:hover {
      background-color: $color-time-select-hover;
    }

    &__active {
      color: $color-button-active;
    }
  }

  &-item:not(:last-of-type) {
    border-bottom: 1px solid $color-border-list;
  }
}

.bus-stops-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 2px dashed $color-dashed-border;
}

</style>