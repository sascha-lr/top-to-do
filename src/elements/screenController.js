export const screenController = (() => {

    const checkState = () => {
        const activeProject = document.querySelector('nav .project.active');
        if (activeProject) return activeProject.dataset.id;
        return false;
    }

    const changeState = (projectID) => {
        const activeProject = document.querySelector('nav .project.active');
        if (activeProject) activeProject.classList.remove('active');
        if (projectID) document.querySelector(`nav .project[data-id="${projectID}"]`).classList.add('active');
    }

    const allTasksContainer = document.querySelector('#all-tasks-container');

    const drawScreen = (tasks) => {
        for (let taskArray of tasks) {
            const task = taskArray[1];

            const taskContainer = document.createElement('div');
            taskContainer.classList.add('task');
            const taskName = document.createElement('h2');
            taskName.classList.add('name');
            taskName.textContent = task.name;
            const taskDesc = document.createElement('h3');
            taskDesc.classList.add('desc');
            taskDesc.textContent = task.desc;

            taskContainer.appendChild(taskName);
            taskContainer.appendChild(taskDesc);

            allTasksContainer.appendChild(taskContainer);
        }
    }

    const wipeScreen = () => {
        allTasksContainer.textContent = '';
    }

    const updateScreen = (tasks) => {
        wipeScreen();
        drawScreen(tasks);
    }

    return { drawScreen, wipeScreen, updateScreen, checkState, changeState };

})();
