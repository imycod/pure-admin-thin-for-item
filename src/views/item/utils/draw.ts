import { serializeVnode } from "@/utils/isVue.ts";
import { addDraw } from "@/components/ReDraw/index.ts";

export function openDraw(config) {
  const content = config.content;
  content ? (config.content = serializeVnode(content)) : null;
  addDraw(config);
}

export { closeDraw } from "@/components/ReDraw/index.ts";
