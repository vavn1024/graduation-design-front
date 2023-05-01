<template>
  <a-progress :percent="percent" :color="color" :track-color="trackColor" :show-text="false">
  </a-progress>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    color: {
      type: String,
      default: "",
    },
    trackColor: {
      type: String,
      default: "#0000004D",
    },
    percent: {
      type: Number,
      default: 0.5,
    },
  },

  setup(_) {
  },
});
</script>

<style scoped>

</style>
