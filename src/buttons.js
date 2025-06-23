import { displayProjects } from "./dom.js";
import Project from "./projects.js";
import { displayTasks } from "./dom.js";
import { getCurrentProject, setCurrentProject} from "./state.js";

export const projects = [];

export function setupAddProjectButton() {
    const addProjectButton = document.querySelector('.add-project-button');
    const projectInput = document.querySelector('.project-input');
    addProjectButton.addEventListener('click', () =>{
        if(projectInput!=null){
            const projectName = projectInput.value.trim();
            if (projectName) {
                const newProject = new Project(projectName); // Create a new project with the name
                projects.push(newProject); // assuming Project is a class that takes a name
                setCurrentProject(newProject); // ✅ set as current
                projectInput.value = '';
                console.log(`Project added: ${projectName}`);

                displayProjects();
            } else {
                console.log('Please enter a valid project name.');
            }
        }
    });
}

export function setupEditProjectButtons() {
    document.querySelectorAll('.edit-project-button').forEach((button) => {
        button.addEventListener('click', (event) => {
            const button = event.target.closest('button');
            const index = parseInt(button.id.replace('edit-button', ''), 10);
            if (!isNaN(index)) {
                const project = projects[index];
                const input = document.querySelector('#project-title-input');
                const dialogEditTitle = document.querySelector('#edit-title-dialog');
                input.value = project.getTitle();
                dialogEditTitle.showModal();

                const form = document.querySelector('#edit-title-form');
                form.onsubmit = (e) => {
                    e.preventDefault();
                    const newTitle = input.value.trim();
                    if (newTitle) {
                        project.setTitle(newTitle);
                        displayProjects(); // will re-attach listeners
                        dialogEditTitle.close();
                    } else {
                        console.log('Invalid title');
                    }
                };
            }
        });
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
            if (projects.length === 0) {
                setCurrentProject(null); // Clear current project if no projects left
                displayTasks(null); // Clear tasks display
            }
            console.log(`Project at index ${index} deleted.`);
        });
    });
}

export function dialogButtons() {
    const dialog = document.querySelector('#add-todo-dialog');
    const addTaskButton = document.querySelector('.add-todo-button');

    addTaskButton.addEventListener('click', () => {
        if (projects.length === 0) {
            alert("Please add a project first.");
            return;
        }
        dialog.showModal();
    });

    const closeDialogButton = document.querySelector('.close');
    closeDialogButton.addEventListener('click', () => {
        document.querySelector('#add-task-form').reset();
        dialog.close();
    });

    const form = document.querySelector('#add-task-form');
    form.onsubmit = (e) => {
        e.preventDefault();

        if (!form.checkValidity()) return;

        const taskTitle = document.querySelector('#todo-title').value;
        const taskDescription = document.querySelector('#todo-description').value;
        const taskDueDate = document.querySelector('#todo-date').value;
        const taskPriority = document.querySelector('#priority').value;

        getCurrentProject().addTask(taskTitle, taskDescription, taskDueDate, taskPriority);
        form.reset();
        dialog.close();
        displayTasks(getCurrentProject());

        console.log("Tasks:", getCurrentProject().getTasks());
    };
}
