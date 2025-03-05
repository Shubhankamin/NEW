import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import { VCard } from "vuetify/components/VCard";
import { VBtn } from "vuetify/components/VBtn";
import { VChip } from "vuetify/components/VChip";
import { VRating } from "vuetify/components/VRating";
import { VToolbar } from "vuetify/components/VToolbar";
import { VDateInput } from "vuetify/labs/VDateInput";
//colors
const myTheme = {
  dark: false,
  colors: {
    primary: "#000000",
    secondary: "#ffffff",
    gold: "#D1A651",
    textColor: "#00FFF0",
    textGrey: "#D9D9D9",
  },
};
export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    components: {
      VCard,
      VRating,
      VToolbar,
      VBtn,
      VChip,
      VDateInput,
    },
    theme: {
      defaultTheme: "myTheme",
      themes: {
        myTheme,
      },
    },
  });
  app.vueApp.use(vuetify);
});
