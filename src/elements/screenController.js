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

    const drawTasks = (tasks) => {
        for (let taskArray of tasks) {
            const task = taskArray[1];

            const taskContainer = document.createElement('div');
            taskContainer.classList.add('task');
            taskContainer.dataset.id = task.id;
            taskContainer.dataset.priority = task.priority;
            taskContainer.classList.add(task.priority);

            const taskNameContainer = document.createElement('div');
            taskNameContainer.classList.add('name');

            const taskName = document.createElement('h2');
            taskName.innerText = task.name;
            taskName.dataset.name = task.name;
            taskNameContainer.appendChild(taskName);

            const taskDescContainer = document.createElement('div');
            taskDescContainer.classList.add('desc');

            const taskDesc = document.createElement('h3');
            taskDesc.innerText = task.desc;
            taskDesc.dataset.desc = task.desc;
            taskDescContainer.appendChild(taskDesc);

            const taskTextEditBtn = document.querySelector('[data-label="hidden-icons"] button[data-action="edit-text"]');
            const taskNameEditBtn = taskTextEditBtn.cloneNode(true);
            taskNameEditBtn.dataset.action = 'edit-name';
            const taskDescEditBtn = taskTextEditBtn.cloneNode(true);
            taskDescEditBtn.dataset.action = 'edit-desc';

            taskNameContainer.appendChild(taskNameEditBtn);
            taskDescContainer.appendChild(taskDescEditBtn);

            const taskDueDate = document.createElement('input');
            taskDueDate.classList.add('due-date');
            taskDueDate.type = 'datetime-local';
            taskDueDate.value = task.dueDate;
            taskDueDate.dataset.dueDate = task.dueDate;

            const btnContainer = document.createElement('div');
            btnContainer.classList.add('btn-container');

            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.dataset.action = 'check';
            checkBox.checked = task.isDone;

            const deleteBtn = document.querySelector('[data-label="hidden-icons"] button[data-action="delete"]').cloneNode(true);
            const deleteForeverBtn = document.querySelector('[data-label="hidden-icons"] button[data-action="delete-forever"]').cloneNode(true);

            btnContainer.appendChild(checkBox);
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
