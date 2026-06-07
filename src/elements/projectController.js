import { Project } from "./projectConstructor.js";

export const projectController = (() => {

    const projects = new Map();

    const addProject = (name, desc) => {
        const project = new Project(name, desc);
        projects.set(project.id, project);
        return project;
    }

    const getProject = (id) => {
        return projects.get(id);
    }

    const getProjects = () => projects;

    const getProjectTask = (projectID, taskID) => {
        const project = getProject(projectID);
        return project.tasks.get(taskID);
    }

    const getProjectTasks = (id) => {
        const project = getProject(id);
        return project.tasks;
    }

    const changeName = (id, name) => {
        const project = getProject(id);
        project.name = name;
    }

    const changeDesc = (id, desc) => {
        const project = getProject(id);
        project.desc = desc;
    }

    const deleteProjects = ([...ids]) => {
        for (let id of ids) {
            projects.delete(id);
        }
    }

    return { addProject, getProject, getProjects, getProjectTask, getProjectTasks, changeName, changeDesc, deleteProjects };

})();
