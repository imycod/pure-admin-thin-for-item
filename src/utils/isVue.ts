import { Component } from "vue";
import { isString, isFunction, isObject } from "@pureadmin/utils";

export function isVueComponent(obj: any): obj is Component {
  return obj && (obj.template || obj.render || obj.methods || obj.data);
}

export const serializeVnode = (value: any) => {
  if (isString(value)) {
    return () => h("div", value);
  }
  if (isFunction(value)) {
    const v = value();
    return serializeVnode(v);
  }
  if (isObject(value) && isVueComponent(value)) {
    return () => value;
  }
};
