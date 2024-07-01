import type { Config } from "tailwindcss";

import colors_plus from "./Figma_Variables/output1.json";
import tailwind_classes from "./Figma_Variables/output2.json";
import css_variables from "./Figma_Variables/output3.json";
import primary_offsets from "./Figma_Variables/theme_color_offsets.json";

const { black, white, gray, ...colors } = colors_plus;
const { light_offset, dark_offset } = primary_offsets;
const { darkMode: dark_mode_css, lightMode: light_mode_css } = css_variables;

const prime = "purple";
export default {
  darkMode: "class",
  corePlugins: {
    preflight: false
  },
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "500px",
      sm: "768px",
      md: "992px",
      lg: "1200px",
      xl: "1920px"
    },
    extend: {
      borderRadius: {
        "radius-xs": "var(--rounded-xs, 4px)", // 4px
        "radius-sm": "var(--rounded-sm, 8px)", // 8px
        "radius-md": "var(--rounded-md, 12px)", // 12-16
        "radius-lg": "var(--rounded-lg, 16px)", // 16-24
        "radius-xl": "var(--rounded-xl, 20px)", // 20-32
        "radius-full": "var(--rounded-full)"
      },
      colors: {
        ...tailwind_classes,
        ...colors,
        black: {
          DEFAULT: "var(--black)",
          ...black
        },
        white: {
          DEFAULT: "var(--white)",
          ...white
        },
        gray: {
          DEFAULT: "var(--gray)",
          ...gray
        },
        primary: {
          DEFAULT: "var(--el-color-primary)",
          1: "var( --unis-primary-1)",
          2: "var( --unis-primary-2)",
          3: "var( --unis-primary-3)"
        },
        secondary: {
          1: "var( --unis-secondary-1)",
          2: "var( --unis-secondary-2)",
          3: "var( --unis-secondary-3)"
        },
        tertiary: {
          1: "var( --unis-tertiary-1)"
        },
        "black-50": "var(--black-50)",
        "black-100": "var(--black-100)",
        "black-200": "var(--black-200)",
        "black-300": "var(--black-300)",
        "black-400": "var(--black-400)",
        "black-500": "var(--black-500)",
        "purple-50": "var(--purple-50)",
        "purple-100": "var(--purple-100)",
        "purple-200": "var(--purple-200)",
        "purple-300": "var(--purple-300)",
        "purple-400": "var(--purple-400)",
        "purple-500": "var(--purple-500)",
        "purple-600": "var(--purple-600)",
        "purple-700": "var(--purple-700)",
        "purple-800": "var(--purple-800)",
        "purple-900": "var(--purple-900)",
        // reversed because mock is in Dark Mode already!
        "gray-50": "var(--gray-900)",
        "gray-100": "var(--gray-800)",
        "gray-200": "var(--gray-700)",
        "gray-300": "var(--gray-600)",
        "gray-400": "var(--gray-500)",
        "gray-500": "var(--gray-400)",
        "gray-600": "var(--gray-300)",
        "gray-700": "var(--gray-200)",
        "gray-800": "var(--gray-100)",
        "gray-900": "var(--gray-50)"
        // bg_color: "var(--el-bg-color)"
        // primary: "var(--el-color-primary)",
        // text_color_primary: "var(--el-text-color-primary)",
        // text_color_regular: "var(--el-text-color-regular)"
      },
      boxShadow: {
        "elevation-01": "var(--elevation-01)",
        "elevation-02": "var(--elevation-02)",
        "elevation-03": "var(--elevation-03)",
        "elevation-04": "var(--elevation-04)",
        "elevation-05": "var(--elevation-05)",
        "depth-01": "var(--depth-01)",
        "depth-02": "var(--depth-02)",
        "depth-03": "var(--depth-03)",
        "depth-04": "var(--depth-04)",
        "depth-05": "var(--depth-05)"
      },
      maxWidth: {
        lg: "33rem",
        "2xl": "40rem",
        "3xl": "50rem",
        "5xl": "66rem"
      },
      opacity: {
        1: "0.01",
        2.5: "0.025",
        7.5: "0.075",
        15: "0.15"
      },
      fontFamily: {
        lato: ["Lato"],
        helvetica: ["Helvetica"],
        now: ["HelveticaNow"]
      },
      spacing: {
        "3xs": "var(--spacing-3xs, 4px)", // 4px
        "2xs": "var(--spacing-2xs, 8px)", // 8px
        xs: "var(--spacing-xs, 12px)", // 12px
        sm: "var(--spacing-sm, 16px)", // 16px
        md: "var(--spacing-md, 20px)", // 20px
        lg: "var(--spacing-lg, 24px)", // 24px
        xl: "var(--spacing-xl, 28px)", // 28-32
        "2xl": "var(--spacing-2xl, 32px)", // 32-48
        "3xl": "var(--spacing-3xl, 36px)" // 36-60
        // '1%': '1%',
        // '2%': '2%',
        // '3%': '3%',
        // '4%': '4%',
        // '5%': '5%',
        // '10%': '10%',
        // '15%': '15%',
        // '20%': '20%',
        // '25%': '25%',
        // '45%': '45%',
        // '48%': '48%',
        // '98%': '98%',
        // '97%': '97%',
        // '96%': '96%',
        // '95%': '95%',
        // '94%': '94%',
        // '93%': '93%',
        // '92%': '92%',
        // '91%': '91%',
        // '90%': '90%',
      }
    }
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        ".el-button": {
          "background-color": "var(--el-button-bg-color,var(--el-color-white))"
        }
      });
      addBase({
        "@media (min-width: 1280px)": {
          ":root": {
            // Desktop
            "--spacing-3xs": "4px",
            "--spacing-2xs": "8px",
            "--spacing-xs": "12px",
            "--spacing-sm": "16px",
            "--spacing-md": "20px",
            "--spacing-lg": "24px",
            "--spacing-xl": "32px",
            "--spacing-2xl": "48px",
            "--spacing-3xl": "60px",
            "--rounded-xs": "4px",
            "--rounded-sm": "8px",
            "--rounded-md": "16px",
            "--rounded-lg": "24px",
            "--rounded-xl": "32px",
            "--rounded-full": "9999px"
          }
        },
        "@media (max-width: 767px)": {
          ":root": {
            // Mobile
            "--spacing-3xs": "4px",
            "--spacing-2xs": "8px",
            "--spacing-xs": "12px",
            "--spacing-sm": "16px",
            "--spacing-md": "20px",
            "--spacing-lg": "24px",
            "--spacing-xl": "28px", // increases
            "--spacing-2xl": "32px", // increases
            "--spacing-3xl": "36px", // increases
            "--rounded-xs": "4px",
            "--rounded-sm": "8px",
            "--rounded-md": "12px", // increases
            "--rounded-lg": "16px", // increases
            "--rounded-xl": "20px", // increases
            "--rounded-full": "9999px"
          }
        },
        "@media (min-width: 768px) and (max-width: 1279px)": {
          ":root": {
            // In Between
            "--spacing-3xs": "4px",
            "--spacing-2xs": "8px",
            "--spacing-xs": "12px",
            "--spacing-sm": "16px",
            "--spacing-md": "20px",
            "--spacing-lg": "24px",
            "--spacing-xl": "32px",
            "--spacing-2xl": "40px",
            "--spacing-3xl": "48px",
            "--rounded-xs": "4px",
            "--rounded-sm": "8px",
            "--rounded-md": "16px",
            "--rounded-lg": "20px",
            "--rounded-xl": "24px",
            "--rounded-full": "9999px"
          }
        },
        ":root:not(.dark)": {
          ...light_mode_css,
          "--unis-secondary-1": colors[prime]["50"],
          "--unis-secondary-2": colors[prime]["100"],
          "--unis-secondary-3": colors[prime]["200"],
          "--unis-primary-1": colors[prime][light_offset[prime][0]],
          "--unis-primary-2": colors[prime][light_offset[prime][1]],
          "--unis-primary-3": colors[prime][light_offset[prime][2]],
          "--unis-tertiary-1": colors[prime]["900"],
          "--black-50": "#E1BDC9", // all are made up values, since light mode never specified
          "--black-100": "#E9E5D5",
          "--black-200": "#F1EFE1",
          "--black-300": "#F3F2E5",
          "--black-400": "#F9F8EDC",
          "--black-500": "#FFFFFF",
          "--purple-50": "#5D0BC1",
          "--purple-100": "#700DE7",
          "--purple-200": "#7A18F2",
          "--purple-300": "#852BF3",
          "--purple-400": "#9B51F5",
          "--purple-500": "#B178F7",
          "--purple-600": "#BC8BF8",
          "--purple-700": "#C89FF9",
          "--purple-800": "#D3B2FA",
          "--purple-900": "#E9D9FD",
          "--white": "#000000",
          "--black": "#FFFFFF"
        },
        ":root.dark": {
          ...dark_mode_css,
          "--unis-secondary-1": colors[prime]["900"],
          "--unis-secondary-2": colors[prime]["800"],
          "--unis-secondary-3": colors[prime]["700"],
          "--unis-primary-1": colors[prime][dark_offset[prime][0]],
          "--unis-primary-2": colors[prime][dark_offset[prime][1]],
          "--unis-primary-3": colors[prime][dark_offset[prime][2]],
          "--unis-tertiary-1": colors[prime]["50"],
          "--black-50": "#333847",
          "--black-100": "#2B2F3B",
          "--black-200": "#23262F",
          "--black-300": "#21232B",
          "--black-400": "#1B1C23",
          "--black-500": "#121217",
          "--purple-50": "#E9D9FD",
          "--purple-100": "#D3B2FA",
          "--purple-200": "#C89FF9",
          "--purple-300": "#BC8BF8",
          "--purple-400": "#B178F7",
          "--purple-500": "#9B51F5",
          "--purple-600": "#852BF3",
          "--purple-700": "#7A18F2",
          "--purple-800": "#700DE7",
          "--purple-900": "#5D0BC1",
          "--white": "#FFFFFF",
          "--black": "#000000"
        }
      });
    }
  ]
} satisfies Config;
