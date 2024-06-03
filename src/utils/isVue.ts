import { Component, isVNode } from "vue";
import { isString, isFunction, isObject, isNumber } from "@pureadmin/utils";

export function isVueComponent(obj: any): obj is Component {
  return obj && (obj.template || obj.render || obj.methods || obj.data);
}

export const serializeVnode = (value: any) => {
  if (isVNode(value)) {
    return () => value;
  }
  if (isString(value) || isNumber(value)) {
    return () => h("div", value);
  }
  if (isFunction(value)) {
    const v = value();
    if (v === undefined) {
      return () => null;
    }
    return serializeVnode(v);
  }
  if (isObject(value) && isVueComponent(value)) {
    return () => value;
  }
};
