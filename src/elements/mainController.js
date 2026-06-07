import { taskController } from "./taskController.js";
import { projectController } from "./projectController.js";
import { screenController } from "./screenController.js";

export const mainController = (() => {

    const renderTasks = (projectID) => {
        screenController.changeState(projectID);
        let tasks;
        projectID ? tasks = projectController.getProjectTasks(projectID) : tasks = taskController.getTasks();
        screenController.updateScreen(tasks);
    }

    const makeTask = ([taskName, taskDesc, taskDueDate, taskPriority, taskIsDone], [projectName, projectDesc] = '') => {
        const task = taskController.addTask(taskName, taskDesc, taskDueDate, taskPriority, taskIsDone);
        let projectID = screenController.checkState();
        if (projectName) {
            const project = projectController.addProject(projectName, projectDesc);
            projectID = project.id;
            addTasksToProject([task.id], projectID);
        }
        renderTasks(projectID);
    }

    const eraseTasks = ([...taskIDs]) => {
        for (let projectArray of projectController.getProjects()) {
            const projectID = projectArray[0];
            removeTasksFromProject([...taskIDs], projectID);
        }
        taskController.deleteTasks([...taskIDs]);
    }

    const addTasksToProject = ([...taskIDs], projectID) => {
        for (let taskID of taskIDs) {
            const task = taskController.getTask(taskID);
            const project = projectController.getProject(projectID);
            project.tasks.set(taskID, task);
        }
    }

    const removeTasksFromProject = ([...taskIDs], projectID) => {
        for (let taskID of taskIDs) {
            const project = projectController.getProject(projectID);
            project.tasks.delete(taskID);
        }
    }

    const moveTasksFromProject = ([...taskIDs], projectID1, projectID2) => {
        removeTasksFromProject(taskIDs, projectID1);
        addTasksToProject(taskIDs, projectID2);
    }

    return { makeTask, addTasksToProject, removeTasksFromProject, moveTasksFromProject }

})();
