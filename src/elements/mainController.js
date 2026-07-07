import { taskController } from "./taskController.js";
import { projectController } from "./projectController.js";
import { screenController } from "./screenController.js";

export const mainController = (() => {

    const renderTasks = (projectID) => {
        screenController.changeActive(projectID);
        const tasks = projectID ? projectController.getProjectTasks(projectID) : taskController.getTasks();
        screenController.updateScreen(tasks);
    }

    const makeTask = (taskName, taskDesc, taskDueDate, taskPriority, taskIsDone, projectID) => {
        const task = taskController.addTask(taskName, taskDesc, taskDueDate, taskPriority, taskIsDone);
        if (projectID) addTasksToProject(projectID, task.id);
        renderTasks(projectID);
    }

    // Project Creation Logic
    // let projectID = screenController.checkIfActive();
    // if (projectName) {
    //     const project = projectController.addProject(projectName, projectDesc);
    //     projectID = project.id;
    //     addTasksToProject([task.id], projectID);
    // }

    const makeProject = (projectName, projectDesc, ...taskIDs) => {
        const project = projectController.addProject(projectName, projectDesc);
        if (taskIDs.length > 0) addTasksToProject(project.id, ...taskIDs);
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
            project.tasks.delete(taskID);
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

    return { makeTask, makeProject, eraseTasks, addTasksToProject, removeTasksFromProject, moveTasksFromProject, checkTask }

})();
