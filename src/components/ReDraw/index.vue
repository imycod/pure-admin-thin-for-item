<script setup lang="ts">
import { visible, drawStore } from "./index";

defineOptions({
  name: "ReDraw"
});
</script>

<template>
  <el-drawer v-model="visible" :title="drawStore.title">
    <span>{{ drawStore.content }}</span>
  </el-drawer>
</template>

<style lang="scss" scoped></style>
