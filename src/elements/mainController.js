import { taskController } from "./taskController.js";
import { projectController } from "./projectController.js";
import { screenController } from "./screenController.js";

export const mainController = (() => {

    const renderTasks = (projectID) => {
        const tasks = projectController.getProject(projectID) ? projectController.getProjectTasks(projectID) : taskController.getTasks();
        screenController.updateTaskScreen(tasks, projectController.getProject(projectID));
    }

    const makeTask = (taskName, taskDesc, taskDueDate, taskPriority, projectID) => {
        const task = taskController.addTask(taskName, taskDesc, taskDueDate, taskPriority);
        if (projectController.getProject(projectID)) addTasksToProject(projectID, task.id);
        renderTasks(projectID);
    }

    const makeProject = (projectName, projectDesc, ...taskIDs) => {
        const project = projectController.addProject(projectName, projectDesc);
        if (taskIDs.length > 0) addTasksToProject(project.id, ...taskIDs);
        screenController.updateProjectScreen(project);
    }

    const eraseTasks = (projectID, ...taskIDs) => {
        for (let projectArray of projectController.getProjects()) {
            const projectID = projectArray[0];
            removeTasksFromProject(projectID, ...taskIDs);
        }
        taskController.deleteTasks(...taskIDs);
        renderTasks(projectID);
    }

    const addTasksToProject = (projectID, ...taskIDs) => {
        for (let taskID of taskIDs) {
            const task = taskController.getTask(taskID);
            const project = projectController.getProject(projectID);
            project.tasks.set(taskID, task);
        }
    }

    const removeTasksFromProject = (projectID, ...taskIDs) => {
        for (let taskID of taskIDs) {
            const project = projectController.getProject(projectID);
            if (project) project.tasks.delete(taskID);
        }
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
        taskController.changeName(taskID, taskName);
        taskController.changeDesc(taskID, taskDesc);
        taskController.changeDueDate(taskID, taskDueDate);
        taskController.changePriority(taskID, taskPriority);
    }

    const toggleEditing = (target) => {
        screenController.toggleEditing(target);
    }

    const changeProjectName = (projectID) => {
        const projectName = projectID ? projectController.getProject(projectID).name : 'All Tasks';
        screenController.changeProjectName(projectName);
    }

    const switchProject = (projectID) => {
        renderTasks(projectID);
        changeProjectName(projectID);
    }

    const firstLoad = (() => {
        renderTasks(window.location.hash.split('#')[1]);
    })();

    return { makeTask, editTask, toggleEditing, makeProject, eraseTasks, addTasksToProject, removeTasksFromProject, moveTasksFromProject, checkTask, changeProjectName, switchProject }

})();
