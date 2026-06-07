export class Task {

    #name;
    #desc = '';
    #dueDate = new Date();
    #created = new Date();
    #priority = 'medium';
    #isDone = false;
    #id = crypto.randomUUID();

    constructor(name, desc, dueDate, priority, isDone) {
        this.name = name;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isDone = isDone;
    }

    get name() {
        return this.#name;
    }

    set name(input) {
        if (input.length < 3 || input.length > 20) {
            throw new Error(`The task's name \n[Task ID: ${this.id}, \nCreated: ${this.created}] \nneeds to be between 3 and 20 characters long.`);
        } else {
            this.#name = input;
        }
    }

    get desc() {
        return this.#desc;
    }

    set desc(input) {
        if (input) this.#desc = input;
    }

    get dueDate() {
        return this.#dueDate;
    }

    set dueDate(input) {
        if (input instanceof Date) {
            this.#dueDate = input;
        } else {
            console.warn(`The due date of \n[Task Name: ${this.name}, \nTask ID: ${this.id}, \nCreated: ${this.created}] \nhas been provided in the wrong format or not at all. Therefore today's date will be set as the due date.`);
        }
    }

    get priority() {
        return this.#priority;
    }

    set priority(input) {
        const validInputs = ['low', 'medium', 'high'];

        if (validInputs.includes(input)) {
            this.#priority = input;
        } else {
            console.warn(`The priority of \n[Task Name: ${this.name}, \nTask ID: ${this.id}, \nCreated: ${this.created}] \nhas been provided in the wrong format or not at all. Therefore it is set to 'Medium'.`);
        }
    }

    get isDone() {
        return this.#isDone;
    }

    set isDone(input) {
        if (input === true || input === false) this.#isDone = input;
    }

    get created() {
        return this.#created;
    }

    set created(input) {
        throw new Error('You cannot change the date when the task was created.');
    }

    get id() {
        return this.#id;
    }

    set id(input) {
        throw new Error('You cannot change the ID of the task manually.');
    }
}
