import { Task } from './constructors.js';
import { projectController } from './projectController.js';

export const taskController = (() => {

    const tasks = [];

    const addTask = (name, desc, dueDate, priority, isDone) => {
        const task = new Task(name, desc, dueDate, priority, isDone);
        tasks.push(task);
    }

    const findTask = (id) => {
        const index = tasks.findIndex((item) => item.id === id);
        return tasks[index];
    }

    const changeName = (id, name) => {
        const task = findTask(id);
        task.name = name;
    }

    const changeDesc = (id, desc) => {
        const task = findTask(id);
        task.desc = desc;
    }

    const changeDueDate = (id, date) => {
        const task = findTask(id);
        task.dueDate = date;
    }

    const changePriority = (id, priority) => {
        const task = findTask(id);
        task.priority = priority;
    }

    const checkTask = (id) => {
        const task = findTask(id);
        task.isDone = !task.isDone;
    }

    const deleteTask = (id) => {
        const index = tasks.findIndex((item) => item.id === id);
        tasks.splice(index, 1);
    }

    const getTasks = () => tasks;

    return { getTasks, checkTask, addTask };

})();
