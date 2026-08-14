import "./style.css";
import * as mainController from "./elements/mainController.js";

const body = document.querySelector('body');
const contentContainer = document.querySelector('[data-label="content-container"]');
const dateInput = document.querySelector('#task-creation-dialog input[type="datetime-local"]');
const taskCreationForm = document.querySelector('#task-creation-dialog form');
const projectCreationForm = document.querySelector('#project-creation-dialog form');
const selectionButton = document.querySelector('.btn[data-action="select-tasks"]');
const projectSelectionDialog = document.querySelector('#project-selection-dialog');
const projectMoveDialog = document.querySelector('#project-move-dialog');

const currentProjectID = () => {
    return window.location.hash.split('#')[1];
};

const performAction = (action, func, event) => {
    if (event.target.closest(`[data-action="${action}"]`)) func();
}

let selection = [];

const toggleSelection = () => {
    for (let taskID of selection) {
        if (document.querySelector(`.task[data-id="${taskID}"]`)) document.querySelector(`.task[data-id="${taskID}"]`).classList.remove('selected');
    }
    selection = [];
    contentContainer.classList.toggle('selection');
    contentContainer.classList.contains('selection') ? selectionButton.textContent = 'Stop Selecting' : selectionButton.textContent = 'Select Tasks';
    if (localStorage[currentProjectID()] && contentContainer.classList.contains('selection')) {
        document.querySelector('.content-container.selection>.populated.content>.btn-container>.btn[data-action="delete"]').classList.remove('hidden');
    } else {
        document.querySelector('.content-container>.populated.content>.btn-container>.btn[data-action="delete"]').classList.add('hidden');
    }
}

const doWithSelection = (func, event, projectIDNeeded) => {
    if (contentContainer.classList.contains('selection') && selection.length > 0) {
        projectIDNeeded ? func(currentProjectID(), ...selection) : func(...selection);
        toggleSelection();
    } else {
        projectIDNeeded ? func(currentProjectID(), event.target.closest('[data-id]').dataset.id) : func(event.target.closest('[data-id]').dataset.id);
    }
}

const switchProject = () => {
    setTimeout(() => { mainController.switchProject(currentProjectID()) }, 1);
    if (document.querySelector('[data-label="content-container"].selection')) toggleSelection();
    selection = [];
    projectSelectionDialog.close();
    projectMoveDialog.close();
}

body.addEventListener('click', (e) => {
    performAction('add-task', () => {
        dateInput.value = new Date().toISOString().split('T')[0] + 'T23:59';
    }, e)
    performAction('delete-forever', () => {
        doWithSelection(mainController.eraseTasks, e, true);
    }, e)
    performAction('delete', () => {
        doWithSelection(mainController.removeTasksFromProject, e, true);
    }, e)
    performAction('check', () => {
        doWithSelection(mainController.checkTasks, e);
    }, e)
    performAction('edit-task', () => {
        mainController.toggleEditing(e.target);
    }, e)
    performAction('switch-project', () => {
        switchProject();
    }, e)
    performAction('delete-project', () => {
        mainController.eraseProject(e.target.closest('[href]').hash.split('#')[1]);
    }, e)
    performAction('select-tasks', () => {
        toggleSelection();
    }, e)
    performAction('move', () => {
        mainController.renderProjects();
    }, e)
    performAction('move-to-project', () => {
        if (contentContainer.classList.contains('selection') && selection.length > 0) {
            mainController.moveTasksFromProject(currentProjectID(), e.target.closest('[href]').hash.split('#')[1], ...selection);
            switchProject();
        }
    }, e)
    if (contentContainer.classList.contains('selection')) {
        performAction('select-task', () => {
            e.target.closest('[data-id]').classList.toggle('selected');
            e.target.closest('[data-id]').classList.contains('selected') ? selection.push(e.target.closest('[data-id]').dataset.id) : selection = selection.filter(ele => ele !== e.target.closest('[data-id]').dataset.id);
        }, e)
    }
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

    mainController.makeTask(currentProjectID(), taskName, taskDesc, taskDueDate, taskPriority);

    taskCreationForm.reset();
})

projectCreationForm.addEventListener('submit', () => {
    const formData = new FormData(projectCreationForm);
    const projectName = formData.get('project-name');
    const projectDesc = formData.get('project-desc');

    mainController.makeProject(projectName, projectDesc);
})
