import "./projects.js";
import "./tasks.js";
import { setupDeleteProjectButtons } from "./buttons.js";
import {projects} from "./buttons.js";
import deleteIcon from '../images/deleteButton.png';


export function displayProjects() {
    const projectList = document.querySelector('.project-list');
    projectList.innerHTML = ""; // clear previous projects

    projects.forEach((element, index) => {
        const projectItem = document.createElement("div");
        projectItem.classList.add("project-item");

        projectItem.innerHTML = `<button data-list-id="${Math.floor(Math.random() * (9999999 - 1) + 9999999)}"><span class="project-title">${element.getTitle()}</span></button>
                <button class="delete-project-button" id="button${index}"><img src="${deleteIcon}"></button>`;
        projectList.appendChild(projectItem);
    });

    setupDeleteProjectButtons();
}
