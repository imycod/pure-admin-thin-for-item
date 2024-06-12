import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import * as parserVue from "vue-eslint-parser";
import configPrettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";
import { defineFlatConfig } from "eslint-define-config";
import * as parserTypeScript from "@typescript-eslint/parser";
import pluginTypeScript from "@typescript-eslint/eslint-plugin";

export default defineFlatConfig([
  {
    ...js.configs.recommended,
    // 忽略特定文件和文件夹。
    ignores: [
      "**/.*",
      "dist/*",
      "*.d.ts",
      "public/*",
      "src/assets/**",
      "src/**/iconfont/**"
    ],
    languageOptions: {
      // 定义一些全局变量为只读，防止在代码中无意修改它们
      globals: {
        // index.d.ts
        RefType: "readonly",
        EmitType: "readonly",
        TargetContext: "readonly",
        ComponentRef: "readonly",
        ElRef: "readonly",
        ForDataType: "readonly",
        AnyFunction: "readonly",
        PropType: "readonly",
        Writable: "readonly",
        Nullable: "readonly",
        NonNullable: "readonly",
        Recordable: "readonly",
        ReadonlyRecordable: "readonly",
        Indexable: "readonly",
        DeepPartial: "readonly",
        Without: "readonly",
        Exclusive: "readonly",
        TimeoutHandle: "readonly",
        IntervalHandle: "readonly",
        Effect: "readonly",
        ChangeEvent: "readonly",
        WheelEvent: "readonly",
        ImportMetaEnv: "readonly",
        Fn: "readonly",
        PromiseFn: "readonly",
        ComponentElRef: "readonly",
        parseInt: "readonly",
        parseFloat: "readonly"
      }
    },
    plugins: {
      // 启用 Prettier 插件及其规则。
      prettier: pluginPrettier
    },
    rules: {
      ...configPrettier.rules,
      ...pluginPrettier.configs.recommended.rules,
      // 例如关闭调试器检查和配置未使用变量的检查。
      "no-debugger": "off",
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto"
        }
      ]
    }
  },
  // TypeScript 文件配置
  {
    files: ["**/*.?([cm])ts", "**/*.?([cm])tsx"],
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": pluginTypeScript
    },
    // 禁用类型注释、显式 any 类型等。
    rules: {
      ...pluginTypeScript.configs.strict.rules,
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-redeclare": "error",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/prefer-as-const": "warn",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { disallowTypeAnnotations: false, fixStyle: "inline-type-imports" }
      ],
      "@typescript-eslint/prefer-literal-enum-member": [
        "error",
        { allowBitwiseExpressions: true }
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ]
    }
  },
  // 声明文件配置
  {
    files: ["**/*.d.ts"],
    // 禁用一些规则，如对 ESLint 注释的限制和未使用变量的检查。
    rules: {
      "eslint-comments/no-unlimited-disable": "off",
      "import/no-duplicates": "off",
      "unused-imports/no-unused-vars": "off"
    }
  },
  // JavaScript 文件配置
  {
    files: ["**/*.?([cm])js"],
    // 允许使用 require 导入语句。
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off"
    }
  },
  // Vue 文件配置
  {
    files: ["**/*.vue"],
    languageOptions: {
      // 定义一些 Vue 特有的全局变量为只读。
      globals: {
        $: "readonly",
        $$: "readonly",
        $computed: "readonly",
        $customRef: "readonly",
        $ref: "readonly",
        $shallowRef: "readonly",
        $toRef: "readonly"
      },
      // 使用 vue-eslint-parser 解析器和 eslint-plugin-vue 插件。
      parser: parserVue,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        extraFileExtensions: [".vue"],
        parser: "@typescript-eslint/parser",
        sourceType: "module"
      }
    },
    plugins: {
      vue: pluginVue
    },
    processor: pluginVue.processors[".vue"],
    // 启用 Vue3 推荐的规则配置，并对一些规则进行调整，如禁用 v-html 检查、默认 prop 和多词组件名的检查等。
    rules: {
      ...pluginVue.configs.base.rules,
      ...pluginVue.configs["vue3-essential"].rules,
      ...pluginVue.configs["vue3-recommended"].rules,
      "no-undef": "off",
      "no-unused-vars": "off",
      "vue/no-v-html": "off",
      "vue/require-default-prop": "off",
      "vue/require-explicit-emits": "off",
      "vue/multi-word-component-names": "off",
      "vue/no-setup-props-reactivity-loss": "off",
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "always",
            normal: "always",
            component: "always"
          },
          svg: "always",
          math: "always"
        }
      ]
    }
  }
]);
