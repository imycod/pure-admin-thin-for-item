<script setup lang="ts">
import { emitter } from "@/utils/mitt";
import { openDraw } from "@itemspace/utils/draw";
import Setting from "./setting.vue";

onMounted(() => {
  emitter.on("openSetting", () => {
    openDraw({
      title: "系统设置",
      content: Setting
    });
  });
});

onBeforeUnmount(() => {
  emitter.off("openSetting");
});

defineOptions({
  name: "SettingPannel"
});
</script>
