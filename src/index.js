import "./styles.css";
import "./dom.js";
import { dialogButtons, setupAddProjectButton } from "./buttons.js"
import { projects } from "./buttons.js";

document.addEventListener('DOMContentLoaded', () => {
  setupAddProjectButton();
  dialogButtons();
  setupEditProjectButtons();
  console.log("projects length:", projects.length);
});

