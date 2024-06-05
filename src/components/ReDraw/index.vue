<script setup lang="ts">
import { visible, options } from "./index";

defineOptions({
  name: "ReDraw"
});
</script>

<template>
  <el-drawer v-model="visible" class="pure-drawer" :title="options.title">
    <component
      v-bind="options?.props"
      :is="options.contentRenderer({ options, index })"
    />
  </el-drawer>
</template>

<style lang="scss" scoped></style>
