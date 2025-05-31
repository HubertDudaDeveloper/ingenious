<template>
  <nav class="main-navigation">
    <TabItem
      v-for="route in routes"
      :key="route.name"
      :label="route.name"
      :path="route.path"
    />
  </nav>
</template>

<script setup lang="ts">
import TabItem from "@/components/navigation/TabItem.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const { routes } = router.options;
</script>

<style lang="scss" scoped>
@use "@/assets/styles/__colors.scss" as *;

.main-navigation {
  display: flex;
  flex-direction: row;
  padding: 0 24px;
  border-radius: 4px;
  background-color: $color-white;
  min-height: 64px;
}
</style>
