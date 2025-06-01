import { mount } from "@vue/test-utils";
import CardList from "@/components/busLines/CardList.vue";
import ListPlaceholder from "@/components/busLines/ListPlaceholder.vue";
import { describe, it, expect } from "vitest";

const baseProps = {
  title: "Stops for",
  label: "Stop List",
  placeholder: "No selection",
  selectedValue: "102",
  selectedChild: "Wilanowska",
  list: ["Wilanowska", "Nowowiejska", "Dworzec"],
  isSelectable: true,
  isSortable: true,
  sortValue: true,
};

describe("CardList.vue", () => {
  it("renders correctly when selectedValue exists", () => {
    const wrapper = mount(CardList, {
      props: baseProps,
    });

    expect(wrapper.find(".card-list-title").text()).toContain("Stops for 102");
    expect(wrapper.findAll(".card-list-item")).toHaveLength(
      baseProps.list.length
    );
  });

  it("emits sort event when sort icon is clicked", async () => {
    const wrapper = mount(CardList, {
      props: baseProps,
    });

    await wrapper.find(".card-list-sort").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("sort");
  });

  it("emits selectedItem when item is clicked", async () => {
    const wrapper = mount(CardList, {
      props: baseProps,
    });

    const items = wrapper.findAll(".card-list-item");
    await items[0].trigger("click");

    expect(wrapper.emitted()).toHaveProperty("selectedItem");
    expect(wrapper.emitted("selectedItem")![0]).toEqual(["Wilanowska"]);
  });

  it("shows ListPlaceholder when no selectedValue", () => {
    const wrapper = mount(CardList, {
      props: {
        ...baseProps,
        selectedValue: null,
      },
      global: {
        stubs: { ListPlaceholder: true },
      },
    });

    expect(wrapper.findComponent(ListPlaceholder).exists()).toBe(true);
  });
});
