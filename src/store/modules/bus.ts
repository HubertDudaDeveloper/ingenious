import { Module } from "vuex";
import { RootState } from "../index";
import axios from "axios";
import { BusState, BusStop, StopRecord } from "@/types/bus";

export const bus: Module<BusState, RootState> = {
  namespaced: true,

  state: () => ({
    stopsData: [],
    selectedLine: null,
    selectedStop: null,
    isLoading: false,
    error: null,
    sortAsc: true,
  }),

  getters: {
    allLines(state): number[] {
      const lines = [...new Set(state.stopsData.map((s) => s.line))];
      return lines.sort((a, b) => a - b);
    },

    stopsForSelectedLine(state): BusStop[] {
      if (!state.selectedLine) return [];

      const rawStops = state.stopsData
        .filter((s) => s.line === state.selectedLine)
        .reduce((acc: Record<string, BusStop>, curr) => {
          if (!acc[curr.stop]) {
            acc[curr.stop] = { stop: curr.stop, order: curr.order };
          }
          return acc;
        }, {});

      const stops = Object.values(rawStops);

      return stops.sort((a, b) =>
        state.sortAsc ? a.order - b.order : b.order - a.order
      );
    },

    timesForSelectedStop(state): string[] {
      if (!state.selectedLine || !state.selectedStop) return [];

      return state.stopsData
        .filter(
          (s) => s.line === state.selectedLine && s.stop === state.selectedStop
        )
        .map((s) => s.time)
        .sort();
    },

    allUniqueStops(state): string[] {
      const stopNames = [...new Set(state.stopsData.map((s) => s.stop))];
      return stopNames.sort((a, b) => a.localeCompare(b));
    },
  },

  mutations: {
    SET_STOPS_DATA(state, data: StopRecord[]) {
      state.stopsData = data;
    },
    SET_SELECTED_LINE(state, line: number | null) {
      state.selectedLine = line;
      state.selectedStop = null; // reset stop on line change
    },
    SET_SELECTED_STOP(state, stop: string | null) {
      state.selectedStop = stop;
    },
    TOGGLE_SORT_ORDER(state) {
      state.sortAsc = !state.sortAsc;
    },
    SET_LOADING(state, val: boolean) {
      state.isLoading = val;
    },
    SET_ERROR(state, msg: string | null) {
      state.error = msg;
    },
  },

  actions: {
    async fetchStopsData({ commit }) {
      commit("SET_LOADING", true);
      try {
        const res = await axios.get<StopRecord[]>(
          "http://localhost:3000/stops"
        );
        commit("SET_STOPS_DATA", res.data);
      } catch (e) {
        commit("SET_ERROR", "Failed to fetch stop data");
      } finally {
        commit("SET_LOADING", false);
      }
    },

    selectLine({ commit }, line: number) {
      commit("SET_SELECTED_LINE", line);
    },

    selectStop({ commit }, stop: string) {
      commit("SET_SELECTED_STOP", stop);
    },

    toggleSort({ commit }) {
      commit("TOGGLE_SORT_ORDER");
    },
  },
};
