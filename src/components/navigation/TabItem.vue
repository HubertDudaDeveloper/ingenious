<template>
  <router-link
    class="tab-item"
    :class="{ 'tab-item__active': isTabActive }"
    :to="path"
  >
    {{ label }}
  </router-link>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

interface ITabItem {
  label: string;
  path: string;
}

const props = defineProps<ITabItem>();

const isTabActive = computed(() => props.label === props.activeTab);
</script>

<style lang="scss" scoped>
@use "@/assets/styles/__colors.scss" as *;
@use "@/assets/styles/__typography.scss" as *;

.tab-item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  font: 500 14px/24px $font-family;
  color: $color-tab-text-inactive;
  text-decoration: none;
  transition-duration: 0.25s;

  &.router-link-active {
    color: $color-tab-text-active;
    box-shadow: inset 0 -2px $color-tab-border-active;
  }
}
</style>
