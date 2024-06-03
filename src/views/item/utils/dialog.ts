import { h } from "vue";
import { ElButton } from "element-plus";
import { addDialog, closeDialog } from "@/components/ReDialog/index";
import { isString, isFunction, isObject } from "@pureadmin/utils";
import { serializeVnode } from "@/utils/isVue.ts";

const initialConfig = {
  title: null,
  content: null,
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

function getVnode(value) {
  return value ? serializeVnode(value) : h("div", "title is required");
}

export const openDialog = (config = initialConfig) => {
  const headerRenderer = getVnode(config.title);
  const contentRenderer = getVnode(config.content);

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

  console.log("options----", options);

  // Object.keys(initialConfig).forEach(key => {
  //   if (!config[key]) {
  //     console.log(key);
  //     options[key] = initialConfig[key];
  //   }
  // });
  addDialog(options);
};

export { closeDialog } from "@/components/ReDialog/index";
