<template>
  <section class="select-bus-line">
    <h2 class="select-bus-line-title">Select Bus Line</h2>
    <div class="select-bus-line-wrapper">
      <button
        v-for="line in lines"
        :key="line"
        class="select-bus-line-button"
        :class="{ 'select-bus-line-button__selected': selectedLine === line }"
        @click="handleClick(line)"
      >
        {{ line }}
      </button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const lines = computed(() => store.getters["bus/allLines"]);
const selectedLine = computed(() => store.state.bus.selectedLine);

const handleClick = (line: string) => {
  store.dispatch("bus/selectLine", line);
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/__colors.scss" as *;
@use "@/assets/styles/__typography.scss" as *;

.select-bus-line {
  background-color: $color-white;
  border-radius: 4px;
  padding: 24px;

  &-title {
    font: 600 14px/24px $font-family;
    color: $color-heading-text;
  }

  &-wrapper {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 8px;
    padding: 24px 0 0;
  }

  &-button {
    width: 54px;
    height: 32px;
    background-color: $color-button-active;
    color: $color-white;
    font: 500 12px/16px $font-family;
    border-radius: 4px;
    transition-duration: 0.25s;

    &:hover:not(&__selected) {
      background-color: $color-button-hover;
    }

    &__selected {
      background-color: $color-button-selected;
    }
  }
}
</style>
