export class Project {

    #tasks = new Map();
    #desc = '';
    #id = crypto.randomUUID();

    constructor(name, desc) {
        this.name = name;
        this.desc = desc;
    }

    get tasks() {
        return this.#tasks;
    }

    set tasks(input) {
        throw new Error(`You cannot reassign the tasks variable.\n[Project Name: ${this.name}, \nProject ID: ${this.id}]`);
    }

    get desc() {
        return this.#desc;
    }

    set desc(input) {
        if (input) this.#desc = input;
    }

    get id() {
        return this.#id;
    }

    set id(input) {
        throw new Error(`You cannot change ID of the project manually.\n[Project Name: ${this.name}, \nProject ID:${this.id}]`);
    }
}
