import { taskController } from "./taskController.js";
import { projectController } from "./projectController.js";

export const logicCommunicator = (() => {

    const addTasksToProject = ([...taskIDs], projectID) => {
        for (let taskID of taskIDs) {
            const task = taskController.getTask(taskID);
            const project = projectController.getProject(projectID);
            project.tasks.push(task);
        }
    }

    const removeTasksFromProject = ([...taskIDs], projectID) => {
        for (let taskID of taskIDs) {
            const project = projectController.getProject(projectID);
            const taskIndex = project.tasks.findIndex((task) => task.id === taskID);
            project.tasks.splice(taskIndex, 1);
        }
    }

    const moveTasksFromProject = ([...taskIDs], projectID1, projectID2) => {
        removeTasksFromProject(taskIDs, projectID1);
        addTasksToProject(taskIDs, projectID2);
    }

    return { addTasksToProject, removeTasksFromProject, moveTasksFromProject }

})();
