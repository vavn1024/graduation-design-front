<template>
  <Basic v-if="getToken()">
    <router-view></router-view>
  </Basic>
  <router-view v-else></router-view>
</template>

<script setup lang="ts">

import Basic from "@/views/layouts/basic.vue";
import { getToken } from '@/utils/auth';

</script>

<style scoped>

</style>
