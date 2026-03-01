import { initMotion } from "viewmotion";
import "viewmotion/styles.css";
import "./styles.css";
import App from "./App.svelte";
import { mount } from "svelte";

// Init Lenis smooth scroll (animations are handled by use:motion action)
initMotion();

mount(App, { target: document.getElementById("app")! });
