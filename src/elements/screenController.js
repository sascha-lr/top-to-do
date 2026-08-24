const allTasksContainer = document.querySelector('[data-label="task-container"]');
const emptyContent = document.querySelector('[data-label="empty-content"]');
const populatedContent = document.querySelector('[data-label="populated-content"]');
const projectSelectionContainer = document.querySelector('#project-selection-dialog>.project-container');
const projectMoveContainer = document.querySelector('#project-move-dialog>.project-container');

const checkIfTasks = () => {
    if (localStorage['all-tasks'] === '[]' && !localStorage[window.location.hash.split('#')[1]]) {
        emptyContent.classList.add('active');
        populatedContent.classList.remove('active');
    } else {
        emptyContent.classList.remove('active');
        populatedContent.classList.add('active');
    }
}

const createButtonHelper = (btn, className, action, ...svgPaths) => {
    btn.className = className;
    btn.dataset.action = action;
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

const createButton = (className, action, ...svgPaths) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    return createButtonHelper(btn, className, action, ...svgPaths);
}

const createLinkButton = (link, className, action, ...svgPaths) => {
    const btn = document.createElement('a');
    btn.href = link;
    return createButtonHelper(btn, className, action, ...svgPaths);
}

const toggleSelectionButton = () => {
    if (document.querySelector('[data-id]')) {
        document.querySelector('.btn[data-action="select-tasks"]').classList.remove('hidden');
    } else {
        document.querySelector('.btn[data-action="select-tasks"]').classList.add('hidden');
    }
}

const drawTasks = (tasks, isProjectActive) => {

    checkIfTasks();

    for (let taskArray of tasks) {
        const task = taskArray[1];

        const taskContainer = document.createElement('form');
        taskContainer.dataset.action = 'select-task';
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
        taskDesc.placeholder = 'This task has no description.';

        const taskDueDate = document.createElement('input');
        taskDueDate.classList.add('due-date');
        taskDueDate.type = 'datetime-local';
        taskDueDate.value = task.dueDate;
        taskDueDate.readOnly = true;
        taskDueDate.name = 'task-due-date';

        const select = document.createElement('select');
        select.className = 'small btn dropdown no-interact';
        select.name = 'task-priority';

        const opts = [
            {
                text: 'High',
                value: 'high',
            },
            {
                text: 'Medium',
                value: 'medium',
            },
            {
                text: 'Low',
                value: 'low',
            }
        ]

        for (let opt of opts) {
            const option = document.createElement('option');
            option.textContent = opt.text;
            option.value = opt.value;
            if (option.value === task.priority) option.selected = true;
            select.appendChild(option);
        }

        const btnContainer = document.createElement('div');
        btnContainer.classList.add('btn-container');

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.dataset.action = 'check';
        checkBox.checked = task.isDone;

        const deleteForeverBtn = createButton('small btn', 'delete-forever', 'm376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z');
        const taskEditBtn = createButton('small btn', 'toggle-editing', 'M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z', 'M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z');
        taskEditBtn.querySelector('svg:nth-child(1)').classList.add('pencil');
        taskEditBtn.querySelector('svg:nth-child(2)').classList.add('checkmark');

        btnContainer.appendChild(checkBox);
        btnContainer.appendChild(select);
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
    let selected = [];
    for (let task of tasks) {
        if (document.querySelector(`[data-id="${task[0]}"].selected`)) selected.push(task[0]);
    }
    wipeScreen();
    drawTasks(tasks, isProjectActive);
    for (let id of selected) {
        document.querySelector(`[data-id="${id}"]`).classList.add('selected');
    }
    checkIfTasks();
    toggleSelectionButton();
}

const toggleEditing = (target) => {
    const task = target.closest('[data-id]');
    const button = target.closest('[data-action="toggle-editing"]');
    button.classList.toggle('editing');
    if (button.classList.contains('editing')) {
        setTimeout(() => button.type = 'submit', 0);
        task.querySelectorAll('input:not([type="checkbox"])').forEach((input) => {
            input.readOnly = false;
            task.querySelector('select').classList.remove('no-interact');
        })
    } else {
        setTimeout(() => button.type = 'button', 0);
        task.querySelectorAll('input:not([type="checkbox"])').forEach((input) => {
            input.readOnly = true;
        })
        task.querySelector('select').classList.add('no-interact');
    }
}

const changeProjectName = (projectName) => {
    document.querySelector('[data-label="project-name"]').innerText = projectName;
}

const drawProjectsHelper = (projects) => {
    let nodes = [];
    projects.forEach((project) => {
        const projectLink = document.createElement('a');
        projectLink.href = `#${project.id}`;
        projectLink.innerText = project.name;
        projectLink.className = 'small btn option';
        nodes.push(projectLink);
    })
    return nodes;
}

const drawProjects = (nodes) => {

    for (let node of nodes) {
        const projectButtonContainer = document.createElement('div');
        projectButtonContainer.className = 'project';

        const deleteBtn = createLinkButton('#', 'small btn', 'delete', 'M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z');
        deleteBtn.dataset.action = 'delete-project';
        deleteBtn.href = '#';

        node.dataset.action = 'switch-project';

        projectButtonContainer.appendChild(node);
        projectButtonContainer.appendChild(deleteBtn);
        projectSelectionContainer.appendChild(projectButtonContainer);
    }
}

const drawTaskMoveProjects = (nodes) => {

    for (let node of nodes) {
        node.dataset.action = 'move-to-project';

        projectMoveContainer.appendChild(node);
    }
}

const wipeProjectScreen = () => {
    projectSelectionContainer.textContent = '';
}

const wipeTaskMoveScreen = () => {
    projectMoveContainer.textContent = '';
}

const updateProjectScreen = (projects) => {
    wipeProjectScreen();
    drawProjects(drawProjectsHelper(projects));
    toggleSelectionButton();
}

const updateTaskMoveScreen = (projects) => {
    wipeTaskMoveScreen();
    drawTaskMoveProjects(drawProjectsHelper(projects));
    toggleSelectionButton();
}

export { updateTaskScreen, updateProjectScreen, updateTaskMoveScreen, toggleEditing, changeProjectName };

