import { mount } from "@vue/test-utils";
import ListPlaceholder from "@/components/busLines/ListPlaceholder.vue";
import { describe, it, expect } from "vitest";

describe("ListPlaceholder.vue", () => {
  it("renders the label text", () => {
    const wrapper = mount(ListPlaceholder, {
      props: {
        label: "No stops available",
      },
    });

    expect(wrapper.text()).toContain("No stops available");
  });
});
