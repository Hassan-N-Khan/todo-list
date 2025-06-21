import { displayProjects } from "./dom.js";
import Project from "./projects.js";
import addTaskToProject from "./tasks.js";

export const projects = [];

export function setupAddProjectButton() {
    const addProjectButton = document.querySelector('.add-project-button');
    const projectInput = document.querySelector('.project-input');
    addProjectButton.addEventListener('click', () =>{
        if(projectInput!=null){
            const projectName = projectInput.value.trim();
            if (projectName) {
                
                projects.push(new Project(projectName)); // assuming Project is a class that takes a name
                projectInput.value = '';
                console.log(`Project added: ${projectName}`);
            } else {
                console.log('Please enter a valid project name.');
            }
        }
        displayProjects();
    });
}

export function setupDeleteProjectButtons() {
    document.querySelectorAll('.delete-project-button').forEach((button) => {
        button.addEventListener('click', (element) => {
            const button = element.target.closest('button');
            const index = parseInt(button.id.replace('button', ''), 10);
            if (!isNaN(index)) {
                projects.splice(index, 1);
                displayProjects();
            }
        });
    });
}

export function dialogButtons() {
    const addTaskButton = document.querySelector('.add-todo-button');
    const dialog = document.querySelector("dialog");
    addTaskButton.addEventListener('click', () => {
        dialog.showModal();
    });

    const form = document.querySelector("form");
    const closeDialogButton = document.querySelector('.close');
    closeDialogButton.addEventListener('click', () => {
        form.reset(); // Reset the form fields
        dialog.close();
    });

    const submitButton = document.querySelector('.submit');
    submitButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the default form submission
        if (!form.checkValidity()) {
            return; // Stop here if the form is invalid
        }
        const taskTitle = document.querySelector('#todo-title').value;
        const taskDescription = document.querySelector('#todo-description').value;
        const taskDueDate = document.querySelector('#todo-date').value;
        const taskPriority = document.querySelector('.todo-priority-input').value;

        // Assuming you have a function to handle adding tasks
        new addTaskToProject(taskTitle, taskDescription, taskDueDate, taskPriority);
        form.reset();
        dialog.close();
    });
}