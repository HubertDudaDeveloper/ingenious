<template>
  <section class="list-placeholder">
    <p>{{ label }}</p>
  </section>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

interface IListPlaceholderProps {
  label: string;
}

const props = defineProps<IListPlaceholderProps>();
</script>

<style lang="scss" scoped>
@use "@/assets/styles/__colors.scss" as *;
@use "@/assets/styles/__typography.scss" as *;

.list-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 444px;
  min-width: fit-content;
  background: url("@/assets/image/DashedBorder.png") no-repeat;
  object-fit: contain;
  background-size: 100% 100%;
  padding: 64px;
  background-color: $color-white;
  font: 400 14px/24px $font-family;
  color: $color-placeholder-text;
  width: 100%;

  @media screen and (min-width: 768px) {
    width: calc(50% - 8px);
  }
}
</style>
