import { Task } from "./taskConstructor.js";

export const taskController = (() => {

    if (!localStorage['all-tasks']) localStorage['all-tasks'] = '[]';

    const addTask = (name, desc, dueDate, priority, isDone, id, createdDate) => {
        const task = new Task(name, desc, dueDate, priority, isDone, id, createdDate);
        const map = getTasks();

        const taskCopy = {
            name: task.name,
            desc: task.desc,
            dueDate: task.dueDate,
            priority: task.priority,
            isDone: task.isDone,
            id: task.id,
            createdDate: task.createdDate
        }

        map.set(task.id, taskCopy);
        setTasks(map);

        return task;
    }

    const getTask = (id) => {
        return getTasks().get(id);
    }

    const getTasks = () => new Map(JSON.parse(localStorage['all-tasks']));

    const setTasks = (input) => localStorage['all-tasks'] = JSON.stringify(Array.from(input));

    const changeTask = (id, name, desc, dueDate, priority) => {
        const map = getTasks();
        const task = map.get(id);
        new Task(name, desc, dueDate, priority);
        task.name = name;
        task.desc = desc;
        task.dueDate = dueDate;
        task.priority = priority;
        setTasks(map);
    }

    const checkTask = (id) => {
        const map = getTasks();
        const task = map.get(id);
        task.isDone = !task.isDone;
        setTasks(map);
    }

    const deleteTasks = (...ids) => {
        const map = getTasks();
        for (let id of ids) {
            map.delete(id);
        }
        setTasks(map);
    }

    return { addTask, getTask, getTasks, changeTask, checkTask, deleteTasks };

})();
