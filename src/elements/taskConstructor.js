export class Task {

    #name;
    #desc = '';
    #dueDate = new Date().toISOString().split('T')[0] + 'T23:59';
    #createdDate = new Date().toISOString().slice(0, -8);
    #priority = 'medium';
    #isDone = false;
    #id = crypto.randomUUID();

    constructor(name, desc, dueDate, priority, isDone, id, createdDate) {
        this.name = name;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isDone = isDone;
        this.id = id;
        this.createdDate = createdDate;
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
        this.#desc = input;
    }

    get dueDate() {
        return this.#dueDate;
    }

    set dueDate(input) {
        const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):[0-5]\d$/;
        if (regex.test(input)) {
            this.#dueDate = input;
        } else {
            console.warn(`The due date of \n[Task Name: ${this.name}, \nTask ID: ${this.id}, \nCreated: ${this.created}] \nhas been provided in the wrong format or not at all. Therefore today's date at 23:59 will be set as the due date.`);
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

    get createdDate() {
        return this.#createdDate;
    }

    set createdDate(input) {
        const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):[0-5]\d$/;
        if (!input) return;
        if (regex.test(input)) {
            this.#createdDate = input;
        } else {
            throw new Error(`The creation date of \n[Task Name: ${this.name}, \nTask ID: ${this.id}]\nhas been provided in the wrong format or not at all.`);
        }
    }

    get id() {
        return this.#id;
    }

    set id(input) {
        const regex = /^[a-z,0-9,-]{36,36}$/;
        if (!input) return;
        if (regex.test(input)) {
            this.#id = input;
        } else {
            throw new Error(`Invalid UUID assignment to \n[Task Name: ${this.name}]!`);
        }
    }
}
