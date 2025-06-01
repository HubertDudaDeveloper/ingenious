import { Module } from 'vuex'
import { RootState } from '@/store/index'
import { StopsState } from '@/types/stops'

export const stops: Module<StopsState, RootState> = {
  namespaced: true,

  state: () => ({
    searchTerm: '',
    sortAsc: true
  }),

  getters: {
    filteredStops: (state, _getters, rootState): string[] => {
      const allStops = rootState.bus.stopsData.map(s => s.stop)
      const uniqueStops = [...new Set(allStops)]

      const filtered = uniqueStops.filter(stop =>
        stop.toLowerCase().includes(state.searchTerm.toLowerCase())
      )

      return filtered.sort((a, b) =>
        state.sortAsc ? a.localeCompare(b) : b.localeCompare(a)
      )
    }
  },

  mutations: {
    SET_SEARCH_TERM(state, term: string) {
      state.searchTerm = term
    },
    TOGGLE_SORT_ORDER(state) {
      state.sortAsc = !state.sortAsc
    }
  },

  actions: {
    setSearchTerm({ commit }, term: string) {
      commit('SET_SEARCH_TERM', term)
    },
    toggleSort({ commit }) {
      commit('TOGGLE_SORT_ORDER')
    }
  }
}
