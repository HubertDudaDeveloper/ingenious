import { mount } from "@vue/test-utils";
import SelectBusLine from "@/components/busLines/SelectBusLine.vue";
import { createStore, type Action } from "vuex";
import { vi, describe, it, expect } from "vitest";

const mockLines = [102, 103, 104];
const selected = 103;

describe("SelectBusLine.vue", () => {
  it("renders buttons for each bus line", () => {
    const store = createStore({
      modules: {
        bus: {
          namespaced: true,
          getters: {
            allLines: () => mockLines,
          },
          state: () => ({
            selectedLine: selected,
          }),
          actions: {
            selectLine: vi.fn() as Action<any, any>,
          },
        },
      },
    });

    const wrapper = mount(SelectBusLine, {
      global: {
        plugins: [store],
      },
    });

    const buttons = wrapper.findAll(".select-bus-line-button");
    expect(buttons).toHaveLength(mockLines.length);
    expect(buttons[1].text()).toBe("103");
  });

  it("highlights the selected line", () => {
    const store = createStore({
      modules: {
        bus: {
          namespaced: true,
          getters: {
            allLines: () => mockLines,
          },
          state: () => ({
            selectedLine: selected,
          }),
          actions: {
            selectLine: vi.fn() as Action<any, any>,
          },
        },
      },
    });

    const wrapper = mount(SelectBusLine, {
      global: {
        plugins: [store],
      },
    });

    const selectedBtn = wrapper.find(".select-bus-line-button__selected");
    expect(selectedBtn.exists()).toBe(true);
    expect(selectedBtn.text()).toBe(selected.toString());
  });

  it("dispatches selectLine on click", async () => {
    const selectLine = vi.fn() as Action<any, any>;

    const store = createStore({
      modules: {
        bus: {
          namespaced: true,
          getters: {
            allLines: () => mockLines,
          },
          state: () => ({
            selectedLine: null,
          }),
          actions: {
            selectLine,
          },
        },
      },
    });

    const wrapper = mount(SelectBusLine, {
      global: {
        plugins: [store],
      },
    });

    const buttons = wrapper.findAll("button");
    await buttons[0].trigger("click");

    expect(selectLine).toHaveBeenCalledWith(expect.any(Object), 102);
  });
});
