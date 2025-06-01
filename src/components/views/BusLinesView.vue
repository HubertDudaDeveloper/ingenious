<template>
  <section class="bus-line-view">
    <template v-if="isLoading">
      <section class="is-loading">
        <span class="spinner-border text-primary" role="status"/>
      </section> 
    </template>
    
    <template v-else>
      <SelectBusLine />
      <div class="bus-line-details">
        <CardList
          v-for="card in cards"
          :key="card.title"
          v-bind="card"
        />
      </div>
    </template>
  </section>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { computed } from "vue";
import SelectBusLine from "@/components/busLines/SelectBusLine.vue";
import CardList from "@/components/busLines/CardList.vue";

const store = useStore();

const selectedLine = computed(() => store.state.bus.selectedLine);
const selectedStop = computed(() => store.state.bus.selectedStop);
const sortValue = computed(() => store.state.bus.sortAsc);
const isLoading = computed(() => store.state.bus.isLoading)

const stops = computed(() => store.getters["bus/stopsForSelectedLine"]);
const times = computed(() => store.getters["bus/timesForSelectedStop"]);

const cards = computed(() => [
  {
    title: "Bus Line:",
    label: "Bus Stops",
    placeholder: "Please select the bus line first",
    selectedValue: selectedLine.value,
    selectedChild: selectedStop.value,
    list: stops.value.map((stopItem) => stopItem.stop),
    sortValue: sortValue.value,
    isSelectable: true,
    isSortable: true,
    onSelectedItem: handleSelectedItem,
    onSort: handleSort
  },
  {
    title: "Bus Stop:",
    label: "Time",
    placeholder: selectedLine.value ? "Please select the bus line first" : "Please select the bus stop first",
    selectedValue: selectedStop.value,
    list: times.value,
    isSelectable: false,
    isSortable: false,
  }
])

const handleSelectedItem = (stop: string) => {
  store.dispatch("bus/selectStop", stop);
}

const handleSort = () => {
  store.dispatch("bus/toggleSort")
}
</script>

<style lang="scss" scoped>
.bus-line-view {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  
  .is-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    min-height: 50vh;
    width: 100%;
  }

  .bus-line-details {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
    width: 100%;
    align-items: stretch;
  }
}
</style>
