<script setup lang="ts">
import Setting from "./setting/index.vue";
import sidebar from "./sidebar.vue";
import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";
import { useGlobal } from "@pureadmin/utils";
import { toggleTheme } from "@pureadmin/theme/dist/browser-utils";
import { useAppStoreHook } from "@/store/modules/app";

const { $storage } = useGlobal<GlobalPropertiesApi>();

const { layoutTheme } = useDataThemeChange();

/* body添加layout属性，作用于src/style/sidebar.scss */
if (unref(layoutTheme)) {
  const layout = unref(layoutTheme).layout;
  const theme = unref(layoutTheme).theme;
  toggleTheme({
    scopeName: `layout-theme-${theme}`
  });
  setLayoutModel(layout);
}

/** 设置导航模式 */
function setLayoutModel(layout: string) {
  layoutTheme.value.layout = layout;
  window.document.body.setAttribute("layout", layout);
  $storage.layout = {
    layout,
    theme: layoutTheme.value.theme,
    darkMode: $storage.layout?.darkMode,
    sidebarStatus: $storage.layout?.sidebarStatus,
    epThemeColor: $storage.layout?.epThemeColor,
    themeColor: $storage.layout?.themeColor,
    overallStyle: $storage.layout?.overallStyle
  };
  useAppStoreHook().setLayout(layout);
}

defineOptions({
  name: "Layout"
});

onBeforeMount(() => {
  useDataThemeChange().dataThemeChange($storage.layout?.overallStyle);
});
</script>

<template>
  <div class="flex w-full">
    <sidebar />
    <div class="pure-container">
      <router-view />
    </div>
  </div>
  <setting />
</template>

<style lang="scss" scoped>
.pure-container {
  flex: 1;
  height: 100vh;
  min-height: 100%;
  margin-left: 210px;
  background-color: var(--el-bg-color);
}
</style>
