import "./styles.css";
import "./dom.js";
import { setupAddProjectButton } from "./buttons.js"
import { dialogButtons } from "./buttons.js";
import Project from "./projects.js";

document.addEventListener('DOMContentLoaded', () => {
  setupAddProjectButton();

  const project1 = new Project("Default Project");
  project1.addTask("Sample Task", "This is a sample task description", "2023-10-01", "High");
  project1.addTask("Another Task", "This is another task description", "2023-10-02", "Medium");
  project1.addTask("Third Task", "This is the third task description", "2023-10-03", "Low");

  console.log("Default project created with sample tasks. " + project1.getTitle());
  console.log("Tasks in the default project:", project1.getTasks());

  displayTasks(project1);
  console.log("displayTasks called for the last project " + project1.getTitle());
});

