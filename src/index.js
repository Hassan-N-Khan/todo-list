import "./styles.css";
import "./dom.js";
import { dialogButtons, projects, setupAddProjectButton, setupEditProjectButtons } from "./buttons.js"
import Project from "./projects.js";
import { displayProjects } from "./dom.js";
import { setCurrentProject } from "./state.js";
import { loadProjectsFromLocalStorage } from "./localStorage.js";

document.addEventListener('DOMContentLoaded', () => {

  const savedProjects = loadProjectsFromLocalStorage();
  if (savedProjects.length > 0) {
    savedProjects.forEach(p => projects.push(p));
    setCurrentProject(projects[0]);
  } else {
    const newProject = new Project("Default Project");
    setCurrentProject(newProject);
    newProject.addTask("Sample Task", "This is a sample task description.", "2023-12-31", "Low");
    newProject.addTask("Another Task", "This is another task description.", "2024-01-15", "High");
    newProject.addTask("Third Task", "This is the third task description.", "2024-02-01", "Medium");
    projects.push(newProject); 
  }

  displayProjects();
  setupAddProjectButton();
  dialogButtons();
  setupEditProjectButtons();
});

