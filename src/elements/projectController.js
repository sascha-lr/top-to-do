import { Project } from './constructors.js';

export const projectController = (() => {

    const projects = [];

    const addProject = (name, task) => {
        const project = new Project(name, task);
        projects.push(project);
    }

    const getProjects = () => projects;

    return { getProjects, addProject };

})();
