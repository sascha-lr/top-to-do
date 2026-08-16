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

const selectionController = (() => {

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

    const execute = (func, event, projectIDNeeded) => {
        if (contentContainer.classList.contains('selection') && selection.length > 0) {
            projectIDNeeded ? func(currentProjectID(), ...selection) : func(...selection);
            toggleSelection();
        } else if (event.target.closest('[data-id]')) {
            projectIDNeeded ? func(currentProjectID(), event.target.closest('[data-id]').dataset.id) : func(event.target.closest('[data-id]').dataset.id);
        }
    }

    const selectTask = (event) => {
        event.target.closest('[data-id]').classList.toggle('selected');
        event.target.closest('[data-id]').classList.contains('selected') ? selection.push(event.target.closest('[data-id]').dataset.id) : selection = selection.filter(ele => ele !== event.target.closest('[data-id]').dataset.id);
    }

    const clearSelection = () => {
        selection = [];
    }

    const moveProjects = (event) => {
        if (contentContainer.classList.contains('selection') && selection.length > 0) {
            mainController.moveTasksFromProject(currentProjectID(), event.target.closest('[href]').hash.split('#')[1], ...selection);
            setTimeout(() => switchProject(), 1);
        }
    }

    return { toggleSelection, execute, selectTask, clearSelection, moveProjects }
})();


const switchProject = () => {
    mainController.switchProject(currentProjectID());
    if (document.querySelector('[data-label="content-container"].selection')) selectionController.toggleSelection();
    selectionController.clearSelection();
    projectSelectionDialog.close();
    projectMoveDialog.close();
}

body.addEventListener('click', (e) => {
    performAction('open-add-task-dialog', () => {
        dateInput.value = new Date().toISOString().split('T')[0] + 'T23:59';
    }, e)
    performAction('delete-forever', () => {
        selectionController.execute(mainController.eraseTasks, e, true);
    }, e)
    performAction('delete', () => {
        selectionController.execute(mainController.removeTasksFromProject, e, true);
    }, e)
    performAction('check', () => {
        selectionController.execute(mainController.checkTasks, e);
    }, e)
    performAction('toggle-editing', () => {
        mainController.toggleEditing(e.target);
    }, e)
    performAction('switch-project', () => {
        setTimeout(() => switchProject(), 1);
    }, e)
    performAction('delete-project', () => {
        mainController.eraseProject(e.target.closest('[href]').hash.split('#')[1]);
    }, e)
    performAction('select-tasks', () => {
        selectionController.toggleSelection();
    }, e)
    performAction('open-move-dialog', () => {
        mainController.renderProjects(currentProjectID());
    }, e)
    performAction('move-to-project', () => {
        selectionController.moveProjects(e);
    }, e)
    if (contentContainer.classList.contains('selection')) {
        performAction('select-task', () => {
            selectionController.selectTask(e);
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
    mainController.editTask(taskID, taskName, taskDesc, taskDueDate, taskPriority, currentProjectID());
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
