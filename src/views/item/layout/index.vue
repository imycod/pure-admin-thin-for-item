<script setup lang="ts">
import LaySetting from "@/layout/components/lay-setting/index.vue";
import Setting from "./setting/index.vue";
import sidebar from "./sidebar.vue";
import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";
import {
  useDark,
  useGlobal,
  deviceDetection,
  useResizeObserver
} from "@pureadmin/utils";
const { $storage } = useGlobal<GlobalPropertiesApi>();

defineOptions({
  name: "Layout"
});

onBeforeMount(() => {
  useDataThemeChange().dataThemeChange($storage.layout?.overallStyle);
});
</script>

<template>
  <div class="flex">
    <sidebar></sidebar>
    <div class="container">
      <router-view />
    </div>
  </div>
  <lay-setting></lay-setting>
  <setting></setting>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  height: 100vh;
  min-height: 100%;
  width: 100%;
  margin-left: 210px;
}
</style>
