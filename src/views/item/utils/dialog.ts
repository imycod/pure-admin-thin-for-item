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

export const openDialog = (config = initialConfig) => {
  const headerRenderer = () => {
    const title = config.title;
    return title ? serializeVnode(title) : h("div", "title is required");
  };
  const contentRenderer = ({ options, index }) => {
    const content = config.content;
    return content ? serializeVnode(content) : h("div", "content is required");
  };

  const beforeCancel = config.beforeCancel;
  const beforeSure = config.beforeSure;

  const closeCallBack = config.closeCallBack;
  const open = config.open;
  const close = config.close;
  const footerRenderer = config.footerRenderer;

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

  Object.keys(initialConfig).forEach(key => {
    if (!config[key]) {
      options[key] = initialConfig[key];
    }
  });
  addDialog(options);
};

export { closeDialog } from "@/components/ReDialog/index";
