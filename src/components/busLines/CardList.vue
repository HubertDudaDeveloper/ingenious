<template>
  <section v-if="selectedValue" class="card-list">
    <h2 class="card-list-title">{{ title }} {{ selectedValue }}</h2>
    <span class="card-list-label">
      {{ label }}
      <img
        v-if="isSortable"
        class="card-list-sort"
        :class="{ 'card-list-sort__desc': !sortValue }"
        src="@/assets/svg/arrow-bottom-rec.svg"
        @click="$emit('sort')"
      />
    </span>
    <div class="card-list-wrapper">
      <span
        v-for="item in list"
        :key="item"
        class="card-list-item"
        :class="{
          'card-list-item__active': isSelectable,
          'card-list-item__selected': isSelectable && item === selectedChild,
        }"
        @click="$emit('selectedItem', item)"
      >
        {{ item }}
      </span>
    </div>
  </section>
  <ListPlaceholder :label="placeholder" v-else />
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import ListPlaceholder from "@/components/busLines/ListPlaceholder.vue";

interface ICardListProps {
  title: string;
  label: string;
  placeholder: string;
  selectedValue: string | number | null;
  selectedChild?: string | number | null;
  list: string[];
  isSelectable: boolean;
  isSortable: boolean;
  sortValue?: boolean;
}

interface ICardListEmits {
  (e: "selectedItem", item: string): void;
  (e: "sort"): void;
}

const props = defineProps<ICardListProps>();
const emits = defineEmits<ICardListEmits>();
</script>

<style lang="scss" scoped>
@use "@/assets/styles/__colors.scss" as *;
@use "@/assets/styles/__typography.scss" as *;

.card-list {
  display: flex;
  flex-direction: column;
  padding: 24px 0 0 0;
  background-color: $color-white;
  border-radius: 4px;
  width: 100%;
  max-height: 444px;

  @media screen and (min-width: 768px) {
    width: calc(50% - 8px);
  }

  &-title {
    font: 600 14px/24px $font-family;
    padding-left: 24px;
  }

  &-label {
    font: 600 12px/16px $font-family;
    padding: 24px;
    border-bottom: 1px solid $color-border-label;
  }

  &-sort {
    transition-duration: 0.25s;
    cursor: pointer;

    &__desc {
      transform: rotate(-180deg);
    }
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

    &__active:hover {
      background-color: $color-time-select-hover;
      cursor: pointer;
    }

    &__selected {
      color: $color-button-active;
    }
  }

  &-item:not(:last-of-type) {
    border-bottom: 1px solid $color-border-list;
  }
}
</style>
