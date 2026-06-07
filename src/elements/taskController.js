import { Task } from "./taskConstructor.js";

export const taskController = (() => {

    const tasks = new Map();

    const addTask = (name, desc, dueDate, priority, isDone) => {
        const task = new Task(name, desc, dueDate, priority, isDone);
        tasks.set(task.id, task);
        return task;
    }

    const getTask = (id) => {
        return tasks.get(id);
    }

    const getTasks = () => tasks;

    const changeName = (id, name) => {
        const task = getTask(id);
        task.name = name;
    }

    const changeDesc = (id, desc) => {
        const task = getTask(id);
        task.desc = desc;
    }

    const changeDueDate = (id, date) => {
        const task = getTask(id);
        task.dueDate = date;
    }

    const changePriority = (id, priority) => {
        const task = getTask(id);
        task.priority = priority;
    }

    const checkTask = (id) => {
        const task = getTask(id);
        task.isDone = !task.isDone;
    }

    const deleteTasks = ([...ids]) => {
        for (let id of ids) {
            tasks.delete(id);
        }
    }

    return { addTask, getTask, getTasks, changeName, changeDesc, changeDueDate, changePriority, checkTask, deleteTasks };

})();
