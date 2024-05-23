import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const baseTheme = {
  // Colors
  primary: "#FF0000",
  secondary: "#EBEBFF",
  accent: "#FFC0CB",
  error: "#DA4250",
  info: "#007EC7",
  success: "#2EA44F",
  warning: "#EEC138",
  grey: "#424242",
  naturalGrey: "#424242",
  lightPurple: "#EBEBFF",
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
