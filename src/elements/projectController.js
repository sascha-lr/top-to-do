import { Project } from "./projectConstructor.js";

if (!localStorage['all-projects']) localStorage['all-projects'] = '[]';

const addProject = (name, desc, id) => {
    const project = new Project(name, desc, id);
    const map = getProjects();

    const projectCopy = {
        name: project.name,
        desc: project.desc,
        id: project.id,
    }

    map.set(project.id, projectCopy);
    setProjects(map);

    return project;
}

const getProject = (id) => {
    return getProjects().get(id);
}

const getProjects = () => new Map(JSON.parse(localStorage['all-projects']));

const setProjects = (input) => localStorage['all-projects'] = JSON.stringify(Array.from(input));

const getProjectTask = (projectID, taskID) => getProjectTasks(projectID).get(taskID);

const getProjectTasks = (projectID) => new Map(JSON.parse(localStorage[projectID]));

const setProjectTasks = (projectID, input) => localStorage[projectID] = JSON.stringify(Array.from(input));

const changeProject = (id, name, desc) => {
    const map = getProjects();
    const project = map.get(id);
    const newProject = new Project(name, desc);
    project.name = newProject.name;
    project.desc = newProject.desc;
    setProjects(map);
}

const deleteProjects = (...ids) => {
    const map = getProjects();
    for (let id of ids) {
        localStorage.removeItem(id);
        map.delete(id);
    }
    setProjects(map);
}

export { addProject, getProject, getProjects, getProjectTask, getProjectTasks, setProjectTasks, changeProject, deleteProjects };
