<template>
  <div class="ui-input">
    <div
      class="ui-input-wrapper"
      :class="{'ui-input__error': isError}"
    >
      <label :for="name" class="ui-input-label">{{ label }}</label>
      <input
        :id="name"
        class="ui-input-element"
        :value="modelValue"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <img 
        class="ui-input-icon"
      :src="icon"
      />
    </div>
    <p v-if="isError" class="ui-input-error-message">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

interface IUIInputProps {
  name: string;
  label: string;
  placeholder: string;
  icon: string;
  isError?: boolean;
  errorMessage: string;
  modelValue: string;
}

interface IUIInputEmits {
  (e: 'update:modelValue', value: string)
}

const props = defineProps<IUIInputProps>();
const emits = defineEmits<IUIInputEmits>();

</script>

<style lang="scss" scoped>
@use "@/assets/styles/__colors.scss" as *;
@use "@/assets/styles/__typography.scss" as *;

.ui-input {
  &-wrapper {
    position: relative;
    width: 100%;
    max-width: 288px;
    height: 40px;
  }
  
  &-label {
    display: flex;
    align-items: center;
    pointer-events: none;
    z-index: 103;
    position: absolute;
    height: 100%;
    margin-left: 16px;
    transition-duration: 0.25s;
    user-select: none;
    color: $color-placeholder-text;
    opacity: 0;
  }

  &-element {
    padding-left: 16px;
    z-index: 100;
    width: 100%;
    height: 100%;
    position: absolute;
    border: 1px solid $color-border-label;
    border-radius: 4px;
    font: 400 12px/16px $font-family;

    &:focus {
      outline: none;
      border-color: $color-button-active;
    }
  }

  &-icon {
    pointer-events: none;
    z-index: 103;
    position: absolute;
    right: 16px;
    top: 12px;
    transition-duration: 0.25s;
  }

  &-element:not(:placeholder-shown) + &-icon {
    opacity: 0;
  }

  &-label:has(+ .ui-input-element:not(:placeholder-shown)) {
    font: 400 10px/16px $font-family;
    transform: translate(-4px, -7px) ;
    background-color: $color-white;
    height: 16px;
    padding: 0 4px;
    opacity: 1;
  }

  &__error {
    .ui-input-element {
      border-color: $color-error;
    }
  }

  &-error-message {
    font: 400 12px/16px $font-family;
    color: $color-error;
    padding: 4px 0 0 16px;
  }
}

</style>
