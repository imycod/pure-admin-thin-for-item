import reDraw from "./index.vue";
import { withInstall } from "@pureadmin/utils";

const ReDraw = withInstall(reDraw);

const visible = ref(false);
const options = ref({});

const addDraw = () => {
  visible.value = true;
};

const closeDraw = () => {
  visible.value = false;
};

export { ReDraw, addDraw, closeDraw };
