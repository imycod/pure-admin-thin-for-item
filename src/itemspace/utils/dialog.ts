import { h } from "vue";
import { ElButton } from "element-plus";
import { addDialog, closeDialog } from "@/components/ReDialog/index";
import { isString, isFunction, isObject } from "@pureadmin/utils";
import { serializeVnode } from "@/utils/isVue.ts";

type initialConfigType = {
  title: string | number | Function;
  content: string | number | Function;
  beforeCancel?: Function;
  beforeSure?: Function;
  closeCallBack?: Function;
  open?: Function;
  close?: Function;
  footerRenderer?: Function;
  hideFooter?: boolean;
};

const initialConfig: initialConfigType = {
  title: "",
  content: "",
  beforeCancel: function (done, { options, index }) {
    done();
  },
  beforeSure: function (done, { options, index }) {
    done();
  },
  closeCallBack: function (args) {},
  open: function () {},
  close: function () {},
  footerRenderer: function ({ index }) {
    return h("div", [
      h(
        ElButton,
        {
          onClick() {
            closeDialog({}, index);
          }
        },
        "cancel"
      ),
      h(
        ElButton,
        {
          type: "primary",
          onClick() {
            closeDialog({}, index);
          }
        },
        "confirm"
      )
    ]);
  }
};

function getVnode(value: any, type: string) {
  return value ? serializeVnode(value) : () => h("div", `${type} is required`);
}

export function openDialog(config = initialConfig) {
  const headerRenderer = getVnode(config.title, "title");
  const contentRenderer = getVnode(config.content, "content");

  const beforeCancel = config.beforeCancel || initialConfig.beforeCancel;
  const beforeSure = config.beforeSure || initialConfig.beforeSure;

  const closeCallBack = config.closeCallBack || initialConfig.closeCallBack;
  const open = config.open || initialConfig.open;
  const close = config.close || initialConfig.close;
  const footerRenderer = config.footerRenderer || initialConfig.footerRenderer;

  const options = {
    open,
    close,
    closeCallBack,
    headerRenderer,
    contentRenderer,
    beforeCancel,
    beforeSure,
    footerRenderer
  };

  // Object.keys(initialConfig).forEach(key => {
  //   if (!config[key]) {
  //     console.log(key);
  //     options[key] = initialConfig[key];
  //   }
  // });

  addDialog(Object.assign({}, options, config));
}

export { closeDialog } from "@/components/ReDialog/index";
