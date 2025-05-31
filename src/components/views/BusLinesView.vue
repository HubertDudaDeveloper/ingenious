<template>
  <section class="bus-line-view">
    <SelectBusLine />
    <div class="bus-line-details">
      <BusStopsList />
      <StopTimesList />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { computed } from "vue";
import SelectBusLine from "@/components/busLines/SelectBusLine.vue";
import BusStopsList from "@/components/busLines/BusStopsList.vue";
import StopTimesList from "@/components/busLines/StopTimesList.vue";


const store = useStore();

const lines = computed(() => store.getters["bus/allLines"]);
const stops = computed(() => store.getters["bus/stopsForSelectedLine"]);
</script>

<style lang="scss" scoped>
.bus-line-view {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .bus-line-details {
    display: flex;
    flex-direction: row;
    gap: 16px;
    width: 100%;
    align-items: stretch;
  }
}

</style>
