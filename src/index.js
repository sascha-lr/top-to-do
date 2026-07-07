import "./style.css";
import { mainController } from "./elements/mainController.js";

const contentContainer = document.querySelector('[data-label="content-container"]');
const emptyContent = document.querySelector('[data-label="empty-content"]');
const populatedContent = document.querySelector('[data-label="populated-content"]');
const dateInput = document.querySelector('#task-creation-dialog input[type="datetime-local"]');

contentContainer.addEventListener('click', (e) => {
    if (e.target.closest('[data-action="add-task"]')) {
        emptyContent.classList.remove('active');
        populatedContent.classList.add('active');
        dateInput.value = new Date().toISOString().split('T')[0] + 'T23:59';
    }
})
