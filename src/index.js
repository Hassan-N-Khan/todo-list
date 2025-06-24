import "./styles.css";
import "./dom.js";
import { dialogButtons, projects, setupAddProjectButton, setupEditProjectButtons } from "./buttons.js"
import Project from "./projects.js";
import { displayProjects } from "./dom.js";
import { setCurrentProject } from "./state.js";

document.addEventListener('DOMContentLoaded', () => {
  const newProject = new Project("Default Project");
  setCurrentProject(newProject);
  newProject.addTask("Sample Task", "This is a sample task description.", "2023-12-31", "Low");
  newProject.addTask("Another Task", "This is another task description.", "2024-01-15", "High");
  newProject.addTask("Third Task", "This is the third task description.", "2024-02-01", "Medium");
  projects.push(newProject); // Add the default project to the projects array
  displayProjects();
  setupAddProjectButton();
  dialogButtons();
  setupEditProjectButtons();
});

