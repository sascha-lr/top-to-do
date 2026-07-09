import "./style.css";
import { mainController } from "./elements/mainController.js";

const contentContainer = document.querySelector('[data-label="content-container"]');
const emptyContent = document.querySelector('[data-label="empty-content"]');
const populatedContent = document.querySelector('[data-label="populated-content"]');
const dateInput = document.querySelector('#task-creation-dialog input[type="datetime-local"]');
const form = document.querySelector('#task-creation-dialog form');

const performAction = (action, func, event) => {
    if (event.target.closest(`[data-action="${action}"]`)) func();
}

contentContainer.addEventListener('click', (e) => {
    performAction('add-task', () => {
        dateInput.value = new Date().toISOString().split('T')[0] + 'T23:59';
    }, e)
    performAction('delete-forever', () => {
        mainController.eraseTasks(document.querySelector('.project .active'), e.target.closest('[data-id]').dataset.id); //Placeholder querySelector
    }, e)
    performAction('delete', () => {
        mainController.removeTasksFromProject(document.querySelector('.project .active'), e.target.closest('[data-id]').dataset.id); //Placeholder querySelector
    }, e)
    performAction('check', () => {
        mainController.checkTask(e.target.closest('[data-id]').dataset.id);
    }, e)
    performAction('edit-task', () => {
        const task = e.target.closest('[data-id]');
        const button = e.target.closest('[data-action="edit-task"]');
        const id = task.dataset.id;
        button.classList.toggle('editing');
        if (button.classList.contains('editing')) {
            button.type = 'button';
            task.querySelectorAll('input:not([type="checkbox"])').forEach((input) => {
                input.readOnly = false;
            })
        } else {
            button.type = 'submit';
            task.querySelectorAll('input:not([type="checkbox"])').forEach((input) => {
                input.readOnly = true;
            })
        }
    }, e)
})

contentContainer.addEventListener('submit', (e) => {
    const id = e.target.dataset.id;
    const formData = new FormData(e.target);
    const name = formData.get('task-name');
    const desc = formData.get('task-desc');
    const dueDate = formData.get('task-due-date');
    const priority = formData.get('task-priority');
    mainController.editTask(id, name, desc, dueDate, priority);
})

form.addEventListener('submit', () => {
    const formData = new FormData(form);
    const taskName = formData.get('task-name');
    const taskDesc = formData.get('task-desc');
    const taskDueDate = formData.get('task-due-date');
    const taskPriority = formData.get('task-priority');

    if (emptyContent.classList.contains('active') && !populatedContent.classList.contains('active')) {
        emptyContent.classList.remove('active');
        populatedContent.classList.add('active');
    }

    mainController.makeTask(taskName, taskDesc, taskDueDate, taskPriority);

    form.reset();
})
