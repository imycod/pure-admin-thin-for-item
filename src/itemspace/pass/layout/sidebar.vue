<script setup lang="ts">
import { routes } from "@itemspace/pass/routes/index";

defineOptions({
  name: "Sidebar"
});

const isShow = ref(false);
const loading = computed(() => (routes.length === 0 ? true : false));
</script>

<template>
  <div
    v-loading="loading"
    :class="['sidebar-container', 'no-logo']"
    @mouseenter.prevent="isShow = true"
    @mouseleave.prevent="isShow = false"
  >
    <el-scrollbar wrap-class="scrollbar-wrapper" :class="['pc']">
      <el-menu
        unique-opened
        mode="vertical"
        popper-class="pure-scrollbar"
        class="outer-most select-none"
        :collapse-transition="false"
        router
      >
        <template v-for="(route, index) in routes">
          <template v-if="route.children">
            <el-sub-menu :index="route.path">
              <template #title>{{ route.name }}</template>
              <el-menu-item
                v-for="(croute, cindex) in route.children"
                :index="croute.path"
                >{{ croute.name }}</el-menu-item
              >
            </el-sub-menu>
          </template>
          <template v-else>
            <el-menu-item :index="route.path">{{ route.name }}</el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped></style>
