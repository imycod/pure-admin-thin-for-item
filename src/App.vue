<template>
  <el-config-provider :locale="currentLocale">
    <router-view />
    <ReDialog />
    <ReDraw />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElConfigProvider } from "element-plus";
import { ReDialog } from "@/components/ReDialog";
import { ReDraw } from "@/components/ReDraw";
import zhCn from "element-plus/es/locale/lang/zh-cn";

export default defineComponent({
  name: "app",
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
    ReDialog,
    ReDraw
  },
  computed: {
    currentLocale() {
      return zhCn;
    }
  }
});
</script>

<style>
#app {
  background-color: var(--el-bg-color);
}
</style>
