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
    <el-button @click="openDialog">dialog</el-button>
    <el-button type="primary" @click="openSetting">setting</el-button>
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
  emitter.emit("openSetting");
}
</script>
