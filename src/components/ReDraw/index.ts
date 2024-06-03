import reDraw from "./index.vue";
import { withInstall } from "@pureadmin/utils";

const ReDraw = withInstall(reDraw);

const visible = ref(false);

const initialState = {
  title: null,
  content: null
};

const drawStore = ref({});

const addDraw = (state = initialState) => {
  visible.value = true;
  Object.keys(initialState).forEach(key => {
    drawStore.value[key] = state[key] || initialState[key];
  });
  console.log("state------", state);
};

const closeDraw = () => {
  visible.value = false;
};

export { ReDraw, visible, drawStore, addDraw, closeDraw };
