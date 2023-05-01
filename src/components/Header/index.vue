<template>
  <a-layout-header>
    <a-menu
        :defaultSelectedKeys="['0_1']"
        @menuItemClick="onClickMenuItem"
        mode="horizontal"
    >
      <slot></slot>
    </a-menu>
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {

  },
  emits: ["itemClick"],
  setup(_, { emit }) {
    const onClickMenuItem = (key:any) => {
      emit("itemClick",key);
    }

    return {
      onClickMenuItem,
    };
  },
});
</script>
