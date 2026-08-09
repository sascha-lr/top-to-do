import * as taskController from "./taskController.js";
import * as projectController from './projectController.js';
import * as screenController from "./screenController.js";

const renderTasks = (projectID) => {
    const tasks = localStorage[projectID] ? projectController.getProjectTasks(projectID) : taskController.getTasks();
    screenController.updateTaskScreen(tasks, projectController.getProject(projectID));
}

const renderProjects = (projects) => {
    projects.forEach(project => {
        screenController.updateProjectScreen(project);
    });
}

const makeTask = (projectID, taskName, taskDesc, taskDueDate, taskPriority, taskIsDone, taskID, taskCreatedDate) => {
    const task = taskController.addTask(taskName, taskDesc, taskDueDate, taskPriority, taskIsDone, taskID, taskCreatedDate);
    if (localStorage[projectID]) addTasksToProject(projectID, task.id);
    renderTasks(projectID);
}

const makeProject = (projectName, projectDesc, projectID, ...taskIDs) => {
    const project = projectController.addProject(projectName, projectDesc, projectID);
    if (taskIDs.length > 0) addTasksToProject(project.id, ...taskIDs);
    screenController.updateProjectScreen(project);
}

const eraseTasks = (projectID, ...taskIDs) => {
    taskController.deleteTasks(...taskIDs);
    const projects = projectController.getProjects();
    projects.forEach((project) => {
        const map = projectController.getProjectTasks(project.id);
        for (let taskID of taskIDs) {
            if (projectController.getProjectTask(project.id, taskID)) {
                map.delete(taskID);
                projectController.setProjectTasks(project.id, map);
            }
        }
    })
    renderTasks(projectID);
}

const addTasksToProject = (projectID, ...taskIDs) => {
    const map = projectController.getProjectTasks(projectID);
    for (let taskID of taskIDs) {
        const task = taskController.getTask(taskID);
        map.set(task.id, task)
    }
    projectController.setProjectTasks(projectID, map);
}

const removeTasksFromProject = (projectID, ...taskIDs) => {
    const map = projectController.getProjectTasks(projectID);
    for (let taskID of taskIDs) {
        map.delete(taskID);
    }
    projectController.setProjectTasks(projectID, map)
    renderTasks(projectID);
}

const moveTasksFromProject = (projectID1, projectID2, ...taskIDs) => {
    removeTasksFromProject(projectID1, ...taskIDs);
    addTasksToProject(projectID2, ...taskIDs);
}

const checkTask = (id) => {
    taskController.checkTask(id);
    screenController.checkTask(id);
}

const editTask = (taskID, taskName, taskDesc, taskDueDate, taskPriority) => {
    taskController.changeTask(taskID, taskName, taskDesc, taskDueDate, taskPriority);

    const task = taskController.getTask(taskID);
    const projects = projectController.getProjects();
    projects.forEach((project) => {
        const map = projectController.getProjectTasks(project.id);
        if (projectController.getProjectTask(project.id, taskID)) {
            map.set(task.id, task);
            projectController.setProjectTasks(project.id, map);
        }
    })
}

const toggleEditing = (target) => {
    screenController.toggleEditing(target);
}

const changeProjectName = (projectID) => {
    const projectName = localStorage[projectID] ? projectController.getProject(projectID).name : 'All Tasks';
    screenController.changeProjectName(projectName);
}

const switchProject = (projectID) => {
    renderTasks(projectID);
    changeProjectName(projectID);
}

const firstLoad = (() => {
    renderTasks(window.location.hash.split('#')[1]);
    changeProjectName(window.location.hash.split('#')[1]);
    renderProjects(projectController.getProjects());
})();

export { makeTask, editTask, toggleEditing, makeProject, eraseTasks, addTasksToProject, removeTasksFromProject, moveTasksFromProject, checkTask, changeProjectName, switchProject };
