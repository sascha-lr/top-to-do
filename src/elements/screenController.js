export const screenController = (() => {

    const getActive = () => {
        if (document.querySelector('nav .project.active')) return document.querySelector('nav .project.active').dataset.id;
        return false;
    }

    const changeActive = (projectID) => {
        if (document.querySelector('nav .project.active')) document.querySelector('nav .project.active').classList.remove('active');
        if (projectID) document.querySelector(`nav .project[data-id="${projectID}"]`).classList.add('active');
    }

    const allTasksContainer = document.querySelector('[data-label="task-container"]');

    const createButton = (className, action, ...svgPaths) => {
        const btn = document.createElement('button');
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

    const drawTasks = (tasks) => {
        for (let taskArray of tasks) {
            const task = taskArray[1];

            const taskContainer = document.createElement('form');
            taskContainer.method = 'dialog';
            taskContainer.classList.add('task');
            taskContainer.dataset.id = task.id;
            taskContainer.dataset.priority = task.priority;
            taskContainer.classList.add(task.priority);

            const taskNameContainer = document.createElement('div');
            taskNameContainer.classList.add('name');
            taskNameContainer.dataset.label = 'name';

            const taskName = document.createElement('input');
            taskName.value = task.name;
            taskName.dataset.name = task.name;
            taskName.readOnly = true;
            taskName.name = 'task-name';
            taskNameContainer.appendChild(taskName);

            const taskDescContainer = document.createElement('div');
            taskDescContainer.classList.add('desc');
            taskDescContainer.dataset.label = 'desc';

            const taskDesc = document.createElement('input');
            taskDesc.value = task.desc;
            taskDesc.dataset.desc = task.desc;
            taskDesc.readOnly = true;
            taskDesc.name = 'task-desc';
            taskDescContainer.appendChild(taskDesc);

            const taskDueDate = document.createElement('input');
            taskDueDate.classList.add('due-date');
            taskDueDate.type = 'datetime-local';
            taskDueDate.value = task.dueDate;
            taskDueDate.readOnly = true;
            taskDueDate.name = 'task-due-date';
            taskDueDate.dataset.dueDate = task.dueDate;

            const btnContainer = document.createElement('div');
            btnContainer.classList.add('btn-container');

            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.dataset.action = 'check';
            checkBox.checked = task.isDone;

            const deleteBtn = createButton('small btn', 'delete', 'M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z');
            const deleteForeverBtn = createButton('small btn', 'delete-forever', 'm376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z');
            const taskEditBtn = createButton('small btn', 'edit-task', 'M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z', 'M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z');
            taskEditBtn.querySelector('svg:nth-child(1)').classList.add('pencil');
            taskEditBtn.querySelector('svg:nth-child(2)').classList.add('checkmark');

            btnContainer.appendChild(checkBox);
            btnContainer.appendChild(taskEditBtn);
            btnContainer.appendChild(deleteBtn);
            btnContainer.appendChild(deleteForeverBtn);

            taskContainer.appendChild(taskNameContainer);
            taskContainer.appendChild(taskDescContainer);
            taskContainer.appendChild(taskDueDate);
            taskContainer.appendChild(btnContainer);

            allTasksContainer.appendChild(taskContainer);
        }
    }

    const wipeScreen = () => {
        allTasksContainer.textContent = '';
    }

    const updateScreen = (tasks) => {
        wipeScreen();
        drawTasks(tasks); //Not a real update
    }

    const checkTask = (id) => {
        document.querySelector(`[data-id="${id}"]`).classList.toggle('checked');
    }

    // const updateNav = () => {
    // }

    return { drawTasks, wipeScreen, updateScreen, getActive, changeActive, checkTask };

})();
