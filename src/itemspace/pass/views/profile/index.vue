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
    <el-button type="primary">测试</el-button>

    <div
      class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
      v-show="false"
    >
      <div class="md:flex">
        <div class="md:shrink-0">
          <img
            class="h-48 w-full object-cover md:h-full md:w-48"
            src="@/assets/user.jpg"
            alt="Modern building architecture"
          />
        </div>
        <div class="p-8">
          <div
            class="uppercase tracking-wide text-sm text-indigo-500 font-semibold"
          >
            Company retreats
          </div>
          <a
            href="#"
            class="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
            >Incredible accommodation for your team</a
          >
          <p class="mt-2 text-slate-500">
            Looking to take your team away on a retreat to enjoy awesome food
            and take in some sunshine? We have a list of places to do just that.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { emitter } from "@/utils/mitt";
import { openDialog, closeDialog } from "@itemspace/utils/dialog";
import { openDraw } from "@itemspace/utils/draw";
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
