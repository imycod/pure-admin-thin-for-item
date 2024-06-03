<script setup lang="ts">
// import LaySetting from "@/layout/components/lay-setting/index.vue";
import Setting from "./setting/index.vue";
import sidebar from "./sidebar.vue";
import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";
import {
  useDark,
  useGlobal,
  deviceDetection,
  useResizeObserver
} from "@pureadmin/utils";
import { toggleTheme } from "@pureadmin/theme/dist/browser-utils";
import { useAppStoreHook } from "@/store/modules/app";

const { $storage } = useGlobal<GlobalPropertiesApi>();

const {
  dataTheme,
  overallStyle,
  layoutTheme,
  themeColors,
  toggleClass,
  dataThemeChange,
  setLayoutThemeColor
} = useDataThemeChange();

// const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

// /** 根据操作系统主题设置平台整体风格 */
// function updateTheme() {
//   if (overallStyle.value !== "system") return;
//   if (mediaQueryList.matches) {
//     dataTheme.value = true;
//   } else {
//     dataTheme.value = false;
//   }
//   dataThemeChange(overallStyle.value);
// }

// function removeMatchMedia() {
//   mediaQueryList.removeEventListener("change", updateTheme);
// }

// /** 监听操作系统主题改变 */
// function watchSystemThemeChange() {
//   updateTheme();
//   removeMatchMedia();
//   mediaQueryList.addEventListener("change", updateTheme);
// }

// const settings = reactive({
//   greyVal: $storage.configure.grey,
//   weakVal: $storage.configure.weak,
//   tabsVal: $storage.configure.hideTabs,
//   showLogo: $storage.configure.showLogo,
//   showModel: $storage.configure.showModel,
//   hideFooter: $storage.configure.hideFooter,
//   multiTagsCache: $storage.configure.multiTagsCache,
//   stretch: $storage.configure.stretch
// });

// onBeforeMount(() => {
//   /* 初始化系统配置 */
//   nextTick(() => {
//     watchSystemThemeChange();
//     settings.greyVal &&
//       document.querySelector("html")?.classList.add("html-grey");
//     settings.weakVal &&
//       document.querySelector("html")?.classList.add("html-weakness");
//   });
// });
// onUnmounted(() => removeMatchMedia);

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
  <div class="flex">
    <sidebar></sidebar>
    <div class="container">
      <router-view />
    </div>
  </div>
  <!-- <lay-setting></lay-setting> -->
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
