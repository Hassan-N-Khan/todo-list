import { setupDeleteProjectButtons } from "./buttons.js";
import {projects} from "./buttons.js";
import deleteIcon from '../images/deleteButton.png';
import { dialogButtons } from "./buttons.js";
import { getCurrentProject, setCurrentProject } from "./state.js";

export function displayProjects() {
    const currentProject = getCurrentProject() || projects[projects.length - 1]; // Default to the last project
    const projectList = document.querySelector('.project-list');
    projectList.innerHTML = ""; // clear previous projects

    projects.forEach((element, index) => {
        const projectItem = document.createElement("div");
        projectItem.classList.add("project-item");

        projectItem.innerHTML = `<button id="project${index}" class="project-title-button"><span class="project-title">${element.getTitle()}</span></button>
                <button class="delete-project-button" id="button${index}"><img src="${deleteIcon}"></button>`;
        projectList.appendChild(projectItem);
    });

    document.querySelectorAll('.project-title-button').forEach((button) => {

        button.addEventListener('click', (element) => {
            const button = element.target.closest('button');
            const index = parseInt(button.id.replace('project', ''), 10);
            if (!isNaN(index)) {
                setCurrentProject(projects[index]);

                dialogButtons(getCurrentProject()); // Setup dialog buttons for adding tasks
                console.log("Current project:", getCurrentProject().getTitle());
            }
            displayTasks(getCurrentProject()); // Display tasks for the current project
        });
    });
    dialogButtons(currentProject); // Setup dialog buttons for adding tasks
    displayTasks(currentProject); // Display tasks for the current project
    setupDeleteProjectButtons();
}


export function displayTasks(currentProject) {
    const taskList = document.querySelector('.todo-list');
    taskList.innerHTML = ""; // clear previous tasks

    if (!getCurrentProject() || !getCurrentProject().getTasks()) {
        return; // No tasks to display
    }

    getCurrentProject().getTasks().forEach((task, index) => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");

        taskItem.innerHTML = `<ul class="task-card">
                        <div class="taskContainer" data-task-lists="">
                            <div>
                                <input type="checkbox" name="tasks" id="task-${index}" class="checkBoxAlignment">
                                <label for="task-${index}" style="text-decoration: none;">${task.getTitle()}</label>
                                <p id="taskDescription">${task.getDescription()}</p>
                            </div>

                            <div class="taskDatePriority">
                                <p id="taskDueDate">${task.getDueDate()}</p>
                                <p id="taskPriority">${task.getPriority()} Priority</p>
                                <button class="editTaskBtn" data-task-btn="${index}">edit</button>
                                <button class="taskDeleteBtn" data-task-btn="${index}"><img src="../images/deleteButton.png" style="height:20px; width:20px;"></button>
                            </div>
                        </div>
                        </ul>`;
        taskList.appendChild(taskItem);
    });
}