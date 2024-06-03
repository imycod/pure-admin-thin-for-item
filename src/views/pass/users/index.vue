<script setup lang="ts">
import { openDraw } from "@/views/item/utils/draw";
import Setting from "@/views/item/layout/setting/setting.vue";
// @ts-nocheck
defineOptions({
  name: "UserList"
});
import { openDialog, closeDialog } from "@/views/item/utils/dialog";
import { ElButton } from "element-plus";
function showDialog() {
  openDialog({
    content: Setting,
    title: "title111"
    // footerRenderer({ index }) {
    //   return h("div", null, [
    //     h(
    //       ElButton,
    //       {
    //         onClick() {
    //           closeDialog({}, index);
    //         }
    //       },
    //       "cancel"
    //     ),
    //     h(
    //       ElButton,
    //       {
    //         type: "primary",
    //         onClick() {
    //           closeDialog({}, index);
    //         }
    //       },
    //       "confirm"
    //     )
    //   ]);
    // }
  });
}

const drawConifg = {
  title: "title111"
};
</script>

<template>
  <div>
    UserList
    <el-button @click="showDialog">openDialog</el-button>
    <el-button type="primary" @click="openDraw(drawConifg)">openDraw</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
