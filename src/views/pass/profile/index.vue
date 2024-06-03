<template>
  <div>
    <!-- <el-row :gutter="24" justify="space-around">
      <re-col
        :md="12"
        :sm="12"
        :xs="24"
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 80
          }
        }"
      >
      </re-col>

      <re-col
        :md="12"
        :sm="12"
        :xs="24"
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 80
          }
        }"
      >
      </re-col>
    </el-row> -->
    <el-button type="primary" @click="openSetting('common')"
      >common setting</el-button
    >
    <el-button type="primary" @click="openDialog">button dialog</el-button>
    <el-button type="primary" @click="openDraw">button draw</el-button>
    <el-button type="primary" @click="openSetting('single')"
      >single setting</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { emitter } from "@/utils/mitt";
import { openDialog, closeDialog } from "@/views/item/utils/dialog";
import { openDraw } from "@/views/item/utils/draw";
import { ElButton } from "element-plus";
import { h } from "vue";

const dialogConfig = {
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
        "confirm111"
      )
    ]);
  }
};

function openSetting(type) {
  switch (type) {
    case "common":
      emitter.emit("openPanel");
      break;
    case "single":
      emitter.emit("openSetting", {
        title: "single setting",
        content: "single setting content"
      });
      break;
    default:
      break;
  }
}
</script>
