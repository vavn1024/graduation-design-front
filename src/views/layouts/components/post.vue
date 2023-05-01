<template>
<Modal :visible="visible" @cancel="handleCancel" @ok="handlePublish" :content="formData.content">
  <a-textarea placeholder="请写下来吧" :max-length="3000" show-word-limit v-model="formData.content"/>
  <a-button
      :loading="loading"
      @click="handleSubmit"
      html-type="submit"
      type="primary"
  >发帖</a-button
  >
</Modal>
</template>

<script lang="ts" setup>
import Modal from "@/components/Modal/index.vue";
</script>

<style scoped>

</style>
