import { ActionContext, Store, createStore } from "vuex";
import { mount } from "@vue/test-utils";
import StopsView from "@/components/views/StopsView.vue";
import UIInput from "@/components/ui/UIInput.vue";
import { describe, it, expect, vi } from "vitest";

const mockStops = ["Wilanowska", "Nowowiejska", "Dworzec"];

// Typ pomocniczy do castowania
const fakeAction = vi.fn() as unknown as (ctx: ActionContext<any, any>, payload?: any) => any;

describe("StopsView.vue", () => {
  const store = createStore({
    modules: {
      bus: {
        namespaced: true,
        state: () => ({
          isLoading: false
        })
      },
      stops: {
        namespaced: true,
        state: () => ({
          sortAsc: true,
          searchTerm: ""
        }),
        getters: {
          filteredStops: () => mockStops
        },
        actions: {
          setSearchTerm: fakeAction,
          toggleSort: fakeAction
        }
      }
    }
  });

  it("renders search input and list of stops", () => {
    const wrapper = mount(StopsView, {
      global: {
        plugins: [store],
        stubs: {
          UIInput: true
        }
      }
    });

    expect(wrapper.findComponent(UIInput).exists()).toBe(true);
    expect(wrapper.findAll(".stops-list-item")).toHaveLength(mockStops.length);
  });

  it("clicking sort icon dispatches toggleSort", async () => {
    const wrapper = mount(StopsView, {
      global: {
        plugins: [store]
      }
    });

    await wrapper.find(".stops-sort").trigger("click");
    expect(fakeAction).toHaveBeenCalled();
  });

  it("shows loading spinner when isLoading is true", () => {
    const loadingStore = createStore({
      modules: {
        bus: {
          namespaced: true,
          state: () => ({
            isLoading: true
          })
        },
        stops: {
          namespaced: true,
          state: () => ({
            sortAsc: true,
            searchTerm: ""
          }),
          getters: {
            filteredStops: () => []
          },
          actions: {
            setSearchTerm: fakeAction,
            toggleSort: fakeAction
          }
        }
      }
    });

    const wrapper = mount(StopsView, {
      global: {
        plugins: [loadingStore]
      }
    });

    expect(wrapper.find(".is-loading").exists()).toBe(true);
  });
});
