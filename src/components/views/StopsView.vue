<template>
  <section class="stops-view">
    <UIInput
      class="stops-search"
      name="search"
      placeholder="Search..."
      label="Search"
      :modelValue="search"
      :icon="searchIcon"
      v-model="search"
    />
  
    <div class="stops-label">
      <h2 class="stops-title">
        Bus Stops
      </h2>
      <img
        src="@/assets/svg/arrow-bottom-rec.svg"
        class="stops-sort"
        :class="{ 'stops-sort__desc': !sortAsc }"
        @click="toggleSort"
      />
    </div>

    <template v-if="isLoading">
      <section class="is-loading">
        <span class="spinner-border text-primary" role="status"/>
      </section> 
    </template>
    
    <div v-else class="stops-list-wrapper">
      <span v-for="stop in filteredStops" :key="stop" class="stops-list-item">
        {{ stop }}
      </span>
    </div>
  
  </section>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { computed } from "vue";
import UIInput from '@/components/ui/UIInput.vue'
import searchIcon from '@/assets/svg/search.svg'

const store = useStore()

const isLoading = computed(() => store.state.bus.isLoading)
const sortAsc = computed(() => store.state.stops.sortAsc)

const search = computed({
  get: () => store.state.stops.searchTerm,
  set: (val: string) => store.dispatch('stops/setSearchTerm', val)
})

const filteredStops = computed(() => store.getters['stops/filteredStops'])

const toggleSort = () => store.dispatch('stops/toggleSort')

</script>

<style lang="scss" scoped>
@use "@/assets/styles/__colors.scss" as *;
@use "@/assets/styles/__typography.scss" as *;

  .stops {
    &-view{
      display: flex;
      flex-direction: column;
      width: 100%;
      background: $color-white;
      border-radius: 4px;

      .is-loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        min-height: 50vh;
        width: 100%;
      }
    }
    
    &-search {
      margin: 8px;
    }

    &-label {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 4px;
      padding: 24px;
      border-bottom: 1px solid $color-border-label;
    }

    &-title {
      font: 600 12px/16px $font-family;
      margin-bottom: 0;
    }

    &-sort {
      cursor: pointer;
      transition-duration: 0.25s;

      &__desc {
        transform: rotate(-180deg);
      }
    }

    &-list {
      &-wrapper {
        display: flex;
        flex-direction: column;
      }

      &-item {
        padding: 20px 24px 19px 24px;
        font: 400 12px/16px $font-family;
        border-bottom: 1px solid $color-border-list;
      }
    }
  }
</style>