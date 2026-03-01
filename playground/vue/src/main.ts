import { createApp } from "vue";
import { initMotion } from "viewmotion";
import "viewmotion/styles.css";
import "./styles.css";
import App from "./App.vue";

// Init Lenis smooth scroll (animations are handled by v-motion directive)
initMotion();

createApp(App).mount("#app");
