import { taskController } from "./taskController.js";
import { projectController } from "./projectController.js";

export const logicCommunicator = (() => {

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

    return { addTasksToProject, removeTasksFromProject, moveTasksFromProject }

})();
