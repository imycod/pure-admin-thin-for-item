import { serializeVnode } from "@/utils/isVue.ts";
import { addDraw } from "@/components/ReDraw/index.ts";

export function openDraw(config) {
  const content = config.content;
  config.content = serializeVnode(content);
  addDraw(config);
}

export { closeDraw } from "@/components/ReDraw/index.ts";
