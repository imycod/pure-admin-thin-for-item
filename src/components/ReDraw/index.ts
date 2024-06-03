import { ref } from "vue";
import reDraw from "./index.vue";
import { withInstall } from "@pureadmin/utils";

const ReDraw = withInstall(reDraw);

const visible = ref(false);

interface initialState {
  title: String;
  contentRenderer: ({ options, index }) => Function;
}

const options = ref<initialState>({});
const addDraw = state => {
  visible.value = true;
  options.value.title = state.title;
  options.value.contentRenderer = state.content;
};

const closeDraw = () => {
  visible.value = false;
};

export { ReDraw, visible, options, addDraw, closeDraw };
