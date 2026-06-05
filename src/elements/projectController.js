import { Project } from './constructors.js';

export const projectController = (() => {

    const projects = [];

    const addProject = (name, desc) => {
        const project = new Project(name, desc);
        projects.push(project);
    }

    const getProject = (id) => {
        const index = projects.findIndex((project) => project.id === id);
        return projects[index];
    }

    const getProjects = () => projects;

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
            const index = projects.findIndex((project) => project.id === id);
            projects.splice(index, 1);
        }
    }


    return { addProject, getProject, getProjects, changeName, changeDesc, deleteProjects };

})();
