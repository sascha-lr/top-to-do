import "./style.css";
import { mainController } from "./elements/mainController.js";

const contentContainer = document.querySelector('[data-label="content-container"]');
const emptyContent = document.querySelector('[data-label="empty-content"]');
const populatedContent = document.querySelector('[data-label="populated-content"]');
const dateInput = document.querySelector('#task-creation-dialog input[type="datetime-local"]');
const form = document.querySelector('#task-creation-dialog form');

contentContainer.addEventListener('click', (e) => {
    if (e.target.closest('[data-action="add-task"]')) {
        dateInput.value = new Date().toISOString().split('T')[0] + 'T23:59';
    }
})

form.addEventListener('submit', () => {
    const formData = new FormData(form);
    const taskName = formData.get('task-name');
    const taskDesc = formData.get('task-desc');
    const taskDueDate = formData.get('task-due-date');
    const taskPriority = formData.get('task-priority');

    emptyContent.classList.remove('active');
    populatedContent.classList.add('active');
    mainController.makeTask(taskName, taskDesc, taskDueDate, taskPriority);

    form.reset();
})
