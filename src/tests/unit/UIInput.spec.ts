import { mount } from "@vue/test-utils";
import UIInput from "@/components/ui/UIInput.vue";
import { describe, expect, it } from "vitest";

describe("UIInput.vue", () => {
  const baseProps = {
    name: "email",
    label: "Email address",
    placeholder: "Enter email",
    icon: "/icon.svg",
    modelValue: "",
    isError: false,
    errorMessage: "",
  };

  it("renders label, placeholder and icon", () => {
    const wrapper = mount(UIInput, {
      props: baseProps,
    });

    const label = wrapper.find("label");
    const input = wrapper.find("input");
    const icon = wrapper.find("img");

    expect(label.text()).toBe(baseProps.label);
    expect(input.attributes("placeholder")).toBe(baseProps.placeholder);
    expect(icon.attributes("src")).toBe(baseProps.icon);
  });

  it("emits update:modelValue on input", async () => {
    const wrapper = mount(UIInput, {
      props: baseProps,
    });

    const input = wrapper.find("input");
    await input.setValue("test@example.com");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")![0]).toEqual([
      "test@example.com",
    ]);
  });

  it("shows error state when isError is true", () => {
    const wrapper = mount(UIInput, {
      props: {
        ...baseProps,
        isError: true,
        errorMessage: "This field is required",
      },
    });

    expect(wrapper.find(".ui-input__error").exists()).toBe(true);
    expect(wrapper.find(".ui-input-error-message").text()).toBe(
      "This field is required"
    );
  });
});
