import "./style.css";
import { mainController } from "./elements/mainController.js";

const contentContainer = document.querySelector('[data-label="content-container"]');
const emptyContent = document.querySelector('[data-label="empty-content"]');
const populatedContent = document.querySelector('[data-label="populated-content"]');

contentContainer.addEventListener('click', (e) => {
    if (e.target.closest('[data-action="add-task"]')) {
        emptyContent.classList.remove('active');
        populatedContent.classList.add('active');
        mainController.makeTask('Hello');
    }
})
