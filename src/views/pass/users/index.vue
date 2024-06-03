<script setup lang="ts">
import { openDraw } from "@/views/item/utils/draw";
// @ts-nocheck
defineOptions({
  name: "UserList"
});
import { openDialog, closeDialog } from "@/views/item/utils/dialog";
import { ElButton } from "element-plus";
function showDialog() {
  openDialog({
    content: h("div", null, [h("div", null, "content111")]),
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
</script>

<template>
  <div>
    UserList
    <el-button @click="showDialog">openDialog</el-button>
    <el-button type="primary" @click="openDraw">openDraw</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
