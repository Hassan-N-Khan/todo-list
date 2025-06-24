import Project from "./projects.js";

export function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

export function populateLocalStorage(projects) {
  if (storageAvailable("localStorage")) {
    localStorage.setItem("projects", JSON.stringify(projects));
  } else {
    console.error("Local storage is not available.");
  }
}

export function loadProjectsFromLocalStorage() {
  const saved = localStorage.getItem("projects");
  if (!saved) return [];

  const parsed = JSON.parse(saved);
  return parsed.map(projectData => {
    const project = new Project(projectData.title); // or projectData.name depending on your class
    projectData.tasks.forEach(task => {
      project.addTask(task.title, task.description, task.dueDate, task.priority);
    });
    return project;
  });
}
