<script setup lang="ts">
import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";
import { useDark, useGlobal, debounce, isNumber } from "@pureadmin/utils";
import Segmented, { type OptionsType } from "@/components/ReSegmented";

import Check from "@iconify-icons/ep/check";
import DayIcon from "@/assets/svg/day.svg?component";
import DarkIcon from "@/assets/svg/dark.svg?component";
import SystemIcon from "@/assets/svg/system.svg?component";

const {
  dataTheme,
  overallStyle,
  layoutTheme,
  themeColors,
  toggleClass,
  dataThemeChange,
  setLayoutThemeColor
} = useDataThemeChange();

const { isDark } = useDark();

// ----------------------------------------------------- 整体风格
const pClass = computed(() => {
  return ["mb-[12px]", "font-medium", "text-sm", "dark:text-white"];
});

const themeOptions = computed<Array<OptionsType>>(() => {
  return [
    {
      label: "浅色",
      icon: DayIcon,
      theme: "light",
      tip: "清新启航，点亮舒适的工作界面",
      iconAttrs: { fill: isDark.value ? "#fff" : "#000" }
    },
    {
      label: "深色",
      icon: DarkIcon,
      theme: "dark",
      tip: "月光序曲，沉醉于夜的静谧雅致",
      iconAttrs: { fill: isDark.value ? "#fff" : "#000" }
    },
    {
      label: "自动",
      icon: SystemIcon,
      theme: "system",
      tip: "同步时光，界面随晨昏自然呼应",
      iconAttrs: { fill: isDark.value ? "#fff" : "#000" }
    }
  ];
});

const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

/** 监听操作系统主题改变 */
function watchSystemThemeChange() {
  updateTheme();
  removeMatchMedia();
  mediaQueryList.addEventListener("change", updateTheme);
}

/** 根据操作系统主题设置平台整体风格 */
function updateTheme() {
  if (overallStyle.value !== "system") return;
  if (mediaQueryList.matches) {
    dataTheme.value = true;
  } else {
    dataTheme.value = false;
  }
  dataThemeChange(overallStyle.value);
}

function removeMatchMedia() {
  mediaQueryList.removeEventListener("change", updateTheme);
}
// ----------------------------------------------------- 主题色
/** 主题色 激活选择项 */
const getThemeColor = computed(() => {
  return current => {
    if (
      current === layoutTheme.value.theme &&
      layoutTheme.value.theme !== "light"
    ) {
      return "#fff";
    } else if (
      current === layoutTheme.value.theme &&
      layoutTheme.value.theme === "light"
    ) {
      return "#1d2b45";
    } else {
      return "transparent";
    }
  };
});
/** 当网页整体为暗色风格时不显示亮白色主题配色切换选项 */
const showThemeColors = computed(() => {
  return themeColor => {
    return themeColor === "light" && isDark.value ? false : true;
  };
});
const getThemeColorStyle = computed(() => {
  return color => {
    return { background: color };
  };
});

defineOptions({
  name: "Setting"
});
</script>

<template>
  <div>
    <p :class="pClass">整体风格</p>
    <Segmented
      resize
      class="select-none"
      :modelValue="overallStyle === 'system' ? 2 : dataTheme ? 1 : 0"
      :options="themeOptions"
      @change="
        theme => {
          theme.index === 1 && theme.index !== 2
            ? (dataTheme = true)
            : (dataTheme = false);
          overallStyle = theme.option.theme;
          dataThemeChange(theme.option.theme);
          theme.index === 2 && watchSystemThemeChange();
        }
      "
    />

    <p :class="['mt-5', pClass]">主题色</p>
    <ul class="theme-color">
      <li
        v-for="(item, index) in themeColors"
        v-show="showThemeColors(item.themeColor)"
        :key="index"
        :style="getThemeColorStyle(item.color)"
        @click="setLayoutThemeColor(item.themeColor)"
      >
        <el-icon
          style="margin: 0.1em 0.1em 0 0"
          :size="17"
          :color="getThemeColor(item.themeColor)"
        >
          <IconifyIconOffline :icon="Check" />
        </el-icon>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.theme-color {
  height: 20px;

  li {
    float: left;
    height: 20px;
    margin-right: 8px;
    cursor: pointer;
    border-radius: 4px;

    &:nth-child(1) {
      border: 1px solid #ddd;
    }
  }
}
</style>
