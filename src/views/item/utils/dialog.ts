import { h } from "vue";
import { ElButton } from "element-plus";
import { addDialog, closeDialog } from "@/components/ReDialog/index";
import { isString, isFunction, isObject } from "@pureadmin/utils";

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
    let Vnode = null;
    const title = config.title;
    if (isFunction(title)) {
      Vnode = title();
    } else if (isObject(title)) {
      Vnode = title;
    } else if (isString(title)) {
      Vnode = h("div", title);
    } else {
      Vnode = h("div", "title is required");
    }
    return Vnode;
  };
  const contentRenderer = ({ options, index }) => {
    let Vnode = null;
    const content = config.content;
    if (isFunction(content)) {
      Vnode = content();
    } else if (isObject(content)) {
      Vnode = content;
    } else if (isString(content)) {
      Vnode = h("div", content);
    } else {
      Vnode = h("div", "content is required");
    }
    return Vnode;
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
