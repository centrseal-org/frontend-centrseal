import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const baseTheme = {
  indigo: "#413DFF",
  slateBlue: "#7A78F7",
  electricBlue: "#1B16FF",
  lavender: "#EBEBFF",
  offWhite: "#F1F1F8",
  warning: "#DA6A63",
  warningLight: "#ECC8C6",
  success: "#A0D9A2",
  successLight: "#E2F5E3",
  pending: "#E1E1E1",
  pendingLight: "#F1F1F1",
  info: "#D4D9A0",
  infoLight: "#F1F5E2",
  white: "#ffffff",
  textWhite: "#ffffff",
  lightGray: "#C7C7C7",
  gray: "#949494",
  gradientText1: "#701B41",
  gradientText2: "#343290",
  verified: "#0B8710",
  highlight: "#ebff0066",
  blackText: "#111111",
  error: "#FF1640",
};

export default createVuetify({
  directives,
  components,
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          ...baseTheme,
        },
      },
      dark: {
        dark: true,
        colors: {
          ...baseTheme,
        },
      },
    },
  },
});
