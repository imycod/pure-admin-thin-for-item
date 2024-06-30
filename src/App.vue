<template>
  <el-config-provider :locale="currentLocale">
    <router-view />
    <ReDialog />
    <ReDraw />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from "vue";
import { ElConfigProvider } from "element-plus";
import { ReDialog } from "@/components/ReDialog";
import { ReDraw } from "@/components/ReDraw";
import zhCn from "element-plus/es/locale/lang/zh-cn";

// import autofit from "autofit.js";
export default defineComponent({
  name: "app",
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
    ReDialog,
    ReDraw
  },
  setup() {
    onMounted(() => {
      console.log("app mounted");
    });
    onUnmounted(() => {
      console.log("app unmounted");
    });

    return {};
  },
  computed: {
    currentLocale() {
      return zhCn;
    }
  }
});
</script>

<style lang="scss" scoped>
/* #app {
  background-color: var(--el-bg-color);
  width: 1920px;
  margin: auto;
  border: 2px solid black;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
} */
</style>
