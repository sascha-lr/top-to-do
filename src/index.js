import "./style.css";
import { mainController } from "./elements/mainController.js";

const body = document.querySelector('body');
const contentContainer = document.querySelector('[data-label="content-container"]');
const emptyContent = document.querySelector('[data-label="empty-content"]');
const populatedContent = document.querySelector('[data-label="populated-content"]');
const dateInput = document.querySelector('#task-creation-dialog input[type="datetime-local"]');
const taskCreationForm = document.querySelector('#task-creation-dialog form');
const projectCreationForm = document.querySelector('#project-creation-dialog form');

const currentProjectID = () => {
    return window.location.hash.split('#')[1];
};

const performAction = (action, func, event) => {
    if (event.target.closest(`[data-action="${action}"]`)) func();
}

body.addEventListener('click', (e) => {
    performAction('add-task', () => {
        dateInput.value = new Date().toISOString().split('T')[0] + 'T23:59';
    }, e)
    performAction('delete-forever', () => {
        mainController.eraseTasks(currentProjectID(), e.target.closest('[data-id]').dataset.id);
    }, e)
    performAction('delete', () => {
        mainController.removeTasksFromProject(currentProjectID(), e.target.closest('[data-id]').dataset.id);
    }, e)
    performAction('check', () => {
        mainController.checkTask(e.target.closest('[data-id]').dataset.id);
    }, e)
    performAction('edit-task', () => {
        mainController.toggleEditing(e.target);
    }, e)
    performAction('switch-project', () => {
        setTimeout(() => { mainController.switchProject(currentProjectID()) }, 1);
    }, e)
})

contentContainer.addEventListener('submit', (e) => {
    const taskID = e.target.dataset.id;
    const formData = new FormData(e.target);
    const taskName = formData.get('task-name');
    const taskDesc = formData.get('task-desc');
    const taskDueDate = formData.get('task-due-date');
    const taskPriority = formData.get('task-priority');
    mainController.editTask(taskID, taskName, taskDesc, taskDueDate, taskPriority);
})

taskCreationForm.addEventListener('submit', () => {
    const formData = new FormData(taskCreationForm);
    const taskName = formData.get('task-name');
    const taskDesc = formData.get('task-desc');
    const taskDueDate = formData.get('task-due-date');
    const taskPriority = formData.get('task-priority');

    if (emptyContent.classList.contains('active') && !populatedContent.classList.contains('active')) {
        emptyContent.classList.remove('active');
        populatedContent.classList.add('active');
    }

    mainController.makeTask(taskName, taskDesc, taskDueDate, taskPriority, currentProjectID());

    taskCreationForm.reset();
})

projectCreationForm.addEventListener('submit', () => {
    const formData = new FormData(projectCreationForm);
    const projectName = formData.get('project-name');
    const projectDesc = formData.get('project-desc');

    mainController.makeProject(projectName, projectDesc);
})
