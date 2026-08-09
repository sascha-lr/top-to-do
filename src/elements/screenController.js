const allTasksContainer = document.querySelector('[data-label="task-container"]');
const emptyContent = document.querySelector('[data-label="empty-content"]');
const populatedContent = document.querySelector('[data-label="populated-content"]');

const createButton = (className, action, ...svgPaths) => {
    const btn = document.createElement('button');
    btn.className = className;
    btn.dataset.action = action;
    btn.type = 'button';

    for (let svgPath of svgPaths) {
        const svgNameSpace = 'http://www.w3.org/2000/svg';

        const svg = document.createElementNS(svgNameSpace, 'svg');
        svg.setAttribute('width', '24px');
        svg.setAttribute('height', '24px');
        svg.setAttribute('viewBox', '0 -960 960 960');

        const path = document.createElementNS(svgNameSpace, 'path');
        path.setAttribute('d', svgPath);

        svg.appendChild(path);
        btn.appendChild(svg);
    }
    return btn;
}

const drawTasks = (tasks, isProjectActive) => {

    if (tasks.size > 0 && emptyContent.classList.contains('active') && !populatedContent.classList.contains('active')) {
        emptyContent.classList.remove('active');
        populatedContent.classList.add('active');
    }

    for (let taskArray of tasks) {
        const task = taskArray[1];

        const taskContainer = document.createElement('form');
        taskContainer.method = 'dialog';
        taskContainer.classList.add('task');
        taskContainer.dataset.id = task.id;
        taskContainer.dataset.priority = task.priority;
        taskContainer.classList.add(task.priority);

        const taskName = document.createElement('input');
        taskName.value = task.name;
        taskName.readOnly = true;
        taskName.name = 'task-name';

        const taskDesc = document.createElement('input');
        taskDesc.value = task.desc;
        taskDesc.readOnly = true;
        taskDesc.name = 'task-desc';

        const taskDueDate = document.createElement('input');
        taskDueDate.classList.add('due-date');
        taskDueDate.type = 'datetime-local';
        taskDueDate.value = task.dueDate;
        taskDueDate.readOnly = true;
        taskDueDate.name = 'task-due-date';

        const btnContainer = document.createElement('div');
        btnContainer.classList.add('btn-container');

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.dataset.action = 'check';
        checkBox.checked = task.isDone;

        const deleteForeverBtn = createButton('small btn', 'delete-forever', 'm376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z');
        const taskEditBtn = createButton('small btn', 'edit-task', 'M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z', 'M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z');
        taskEditBtn.querySelector('svg:nth-child(1)').classList.add('pencil');
        taskEditBtn.querySelector('svg:nth-child(2)').classList.add('checkmark');

        btnContainer.appendChild(checkBox);
        btnContainer.appendChild(taskEditBtn);

        if (isProjectActive) {
            const deleteBtn = createButton('small btn', 'delete', 'M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z');
            btnContainer.appendChild(deleteBtn);
        }

        btnContainer.appendChild(deleteForeverBtn);

        taskContainer.appendChild(taskName);
        taskContainer.appendChild(taskDesc);
        taskContainer.appendChild(taskDueDate);
        taskContainer.appendChild(btnContainer);

        allTasksContainer.appendChild(taskContainer);
    }
}

const wipeScreen = () => {
    allTasksContainer.textContent = '';
}

const updateTaskScreen = (tasks, isProjectActive) => {
    wipeScreen();
    drawTasks(tasks, isProjectActive); //Not a real update
}

const checkTask = (id) => {
    document.querySelector(`[data-id="${id}"]`).classList.toggle('checked');
}

const toggleEditing = (target) => {
    const task = target.closest('[data-id]');
    const button = target.closest('[data-action="edit-task"]');
    button.classList.toggle('editing');
    if (button.classList.contains('editing')) {
        setTimeout(() => { button.type = 'submit' }, 0);
        task.querySelectorAll('input:not([type="checkbox"])').forEach((input) => {
            input.readOnly = false;
        })
    } else {
        setTimeout(() => { button.type = 'button' }, 0);
        task.querySelectorAll('input:not([type="checkbox"])').forEach((input) => {
            input.readOnly = true;
        })
    }
}

const changeProjectName = (projectName) => {
    document.querySelector('[data-label="project-name"]').innerText = projectName;
}

const updateProjectScreen = (project) => {
    const projectSelectionDialog = document.querySelector('#project-selection-dialog');

    const link = document.createElement('a');
    link.href = `#${project.id}`;
    link.innerText = project.name;
    link.className = 'small btn option';
    link.dataset.action = 'switch-project';

    projectSelectionDialog.insertBefore(link, projectSelectionDialog.querySelector('button[data-action="add-project"]'));
}

export { drawTasks, wipeScreen, updateTaskScreen, updateProjectScreen, checkTask, toggleEditing, changeProjectName };

