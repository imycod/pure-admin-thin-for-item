<script setup lang="ts">
import { openDraw } from "@itemspace/utils/draw.ts";
import Setting from "@itemspace/pass/layout/setting/setting.vue";
// @ts-nocheck
defineOptions({
  name: "UserList"
});
import { openDialog, closeDialog } from "@itemspace/utils/dialog.ts";
import { ElButton } from "element-plus";
function showDialog() {
  openDialog({
    content: 111,
    title: () => 111,
    hideFooter: true,
    footerRenderer({ index }) {
      return h("div", null, [
        h(
          ElButton,
          {
            onClick() {
              closeDialog({}, index);
            }
          },
          "cancel111"
        ),
        h(
          ElButton,
          {
            type: "primary",
            onClick() {
              closeDialog({}, index);
            }
          },
          "confirm22"
        )
      ]);
    }
  });
}

const drawConifg = {
  title: "title111"
};
</script>

<template>
  <div>
    <el-button @click="showDialog">openDialog</el-button>
    <el-button type="primary" @click="openDraw">openDraw</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
